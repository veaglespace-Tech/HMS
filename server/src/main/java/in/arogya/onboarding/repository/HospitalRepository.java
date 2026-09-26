package in.arogya.onboarding.repository;

import in.arogya.onboarding.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital, String> {

    boolean existsBySlugAndDeletedFalse(String slug);

    boolean existsByEmailAndDeletedFalse(String email);

    boolean existsByRegistrationNoAndDeletedFalse(String registrationNo);

    Optional<Hospital> findBySlugAndDeletedFalse(String slug);

    Optional<Hospital> findByIdAndDeletedFalse(String id);

    @Query("SELECT COUNT(h) > 0 FROM Hospital h WHERE h.email = :email AND h.deleted = false AND h.id != :excludeId")
    boolean existsByEmailAndDeletedFalseAndIdNot(String email, String excludeId);
}
