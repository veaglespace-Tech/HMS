package in.arogya.repository;

import in.arogya.entity.ClinicalNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClinicalNoteRepository extends JpaRepository<ClinicalNote, String> {
    List<ClinicalNote> findByEncounterIdOrderByCreatedAtDesc(String encounterId);
}
