package in.arogya.common.audit;

import in.arogya.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * Append-only audit log entry with SHA-256 hash chaining.
 * curr_hash = SHA256(prev_hash + entity + entityId + action + payload + timestamp)
 *
 * This table NEVER has hard deletes or updates.
 * Any tamper attempt breaks the hash chain and is detected by /api/v1/audit/verify.
 */
@Entity
@Table(name = "audit_log",
       indexes = {
           @Index(name = "idx_audit_hospital", columnList = "hospital_id"),
           @Index(name = "idx_audit_entity", columnList = "entity, entity_id"),
           @Index(name = "idx_audit_user", columnList = "user_id"),
           @Index(name = "idx_audit_curr_hash", columnList = "curr_hash")
       })
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entity", nullable = false, length = 100)
    private String entity;

    @Column(name = "entity_id", length = 36)
    private String entityId;

    @Column(name = "action", nullable = false, length = 50)
    private String action;

    @Column(name = "old_json", columnDefinition = "TEXT")
    private String oldJson;

    @Column(name = "new_json", columnDefinition = "TEXT")
    private String newJson;

    @Column(name = "user_id", length = 36)
    private String userId;

    @Column(name = "hospital_id", length = 36)
    private String hospitalId;

    @Column(name = "ip", length = 45)
    private String ip;

    @Column(name = "user_agent", length = 500)
    private String userAgent;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "prev_hash", length = 64)
    private String prevHash;

    @Column(name = "curr_hash", nullable = false, length = 64)
    private String currHash;
}
