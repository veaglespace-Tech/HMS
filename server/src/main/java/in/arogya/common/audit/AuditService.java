package in.arogya.common.audit;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.arogya.common.tenant.TenantContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

/**
 * Writes audit log entries asynchronously with SHA-256 hash chain.
 * Uses REQUIRES_NEW so it commits independently of the calling transaction.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;
    private final HashChainService hashChainService;
    private final ObjectMapper objectMapper;

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void write(AuditEvent event) {
        try {
            String prevHash = auditLogRepository.findLatest()
                    .map(AuditLog::getCurrHash)
                    .orElse("GENESIS");

            Instant now = Instant.now();
            String payload = buildPayload(event, now);
            String currHash = hashChainService.computeHash(prevHash, payload);

            AuditLog log = AuditLog.builder()
                    .entity(event.entity())
                    .entityId(event.entityId())
                    .action(event.action())
                    .oldJson(event.oldJson())
                    .newJson(event.newJson())
                    .userId(event.userId() != null ? event.userId() : TenantContext.getUserId())
                    .hospitalId(event.hospitalId() != null ? event.hospitalId() : TenantContext.getHospitalId())
                    .ip(event.ip())
                    .userAgent(event.userAgent())
                    .createdAt(now)
                    .prevHash(prevHash)
                    .currHash(currHash)
                    .build();

            auditLogRepository.save(log);
        } catch (Exception e) {
            // Audit failure must never break the main transaction
            log.error("Failed to write audit log for entity={} action={}: {}",
                    event.entity(), event.action(), e.getMessage(), e);
        }
    }

    private String buildPayload(AuditEvent event, Instant timestamp) {
        try {
            return objectMapper.writeValueAsString(new Object() {
                public final String entity = event.entity();
                public final String entityId = event.entityId();
                public final String action = event.action();
                public final String ts = timestamp.toString();
            });
        } catch (Exception e) {
            return event.entity() + ":" + event.entityId() + ":" + event.action();
        }
    }

    /**
     * Verifies the hash chain integrity.
     * Returns false if any record has been tampered with.
     */
    @Transactional(readOnly = true)
    public boolean verifyChain() {
        String prevHash = "GENESIS";
        for (AuditLog entry : auditLogRepository.findAll()) {
            String expectedHash = hashChainService.computeHash(
                prevHash,
                entry.getEntity() + entry.getEntityId() + entry.getAction() + entry.getCreatedAt()
            );
            if (!expectedHash.equals(entry.getCurrHash())) {
                log.error("Hash chain broken at audit_log id={}", entry.getId());
                return false;
            }
            prevHash = entry.getCurrHash();
        }
        return true;
    }
}
