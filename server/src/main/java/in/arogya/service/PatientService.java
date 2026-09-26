package in.arogya.service;

import in.arogya.entity.Patient;
import in.arogya.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;

    public Patient createPatient(Patient patient) {
        if (patient.getUhid() == null || patient.getUhid().isEmpty()) {
            patient.setUhid("UHID-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(String id) {
        return patientRepository.findById(id);
    }
}
