package in.arogya.repository;

import in.arogya.entity.Encounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EncounterRepository extends JpaRepository<Encounter, String> {
    List<Encounter> findByPatientId(String patientId);
    List<Encounter> findByStatus(String status);
}
