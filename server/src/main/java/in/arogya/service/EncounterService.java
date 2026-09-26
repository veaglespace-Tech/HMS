package in.arogya.service;

import in.arogya.entity.Encounter;
import in.arogya.repository.EncounterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EncounterService {
    private final EncounterRepository encounterRepository;

    public Encounter createEncounter(Encounter encounter) {
        if (encounter.getStartTime() == null) {
            encounter.setStartTime(LocalDateTime.now());
        }
        if (encounter.getStatus() == null) {
            encounter.setStatus("ACTIVE");
        }
        return encounterRepository.save(encounter);
    }

    public List<Encounter> getAllEncounters() {
        return encounterRepository.findAll();
    }

    public Optional<Encounter> getEncounterById(String id) {
        return encounterRepository.findById(id);
    }
}
