package in.arogya.common.audit;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    Optional<AuditLog> findTopByOrderByIdDesc();

    Page<AuditLog> findByHospitalIdOrderByIdDesc(String hospitalId, Pageable pageable);

    Page<AuditLog> findByEntityAndEntityIdOrderByIdDesc(String entity, String entityId, Pageable pageable);

    @Query("SELECT a FROM AuditLog a WHERE a.id = (SELECT MAX(a2.id) FROM AuditLog a2)")
    Optional<AuditLog> findLatest();
}
