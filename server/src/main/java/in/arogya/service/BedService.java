package in.arogya.service;

import in.arogya.common.exception.ResourceNotFoundException;
import in.arogya.entity.Bed;
import in.arogya.entity.Patient;
import in.arogya.repository.BedRepository;
import in.arogya.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BedService {
    private final BedRepository bedRepository;
    private final PatientRepository patientRepository;

    public List<Bed> getAllBeds(String hospitalId) {
        return bedRepository.findByRoomWardHospitalId(hospitalId);
    }

    public Bed assignPatientToBed(String bedId, String patientId) {
        Bed bed = bedRepository.findById(bedId)
                .orElseThrow(() -> new ResourceNotFoundException("Bed not found with id: " + bedId));
        
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + patientId));

        bed.setStatus("OCCUPIED");
        bed.setCurrentPatient(patient);
        return bedRepository.save(bed);
    }
    
    public Bed vacateBed(String bedId) {
        Bed bed = bedRepository.findById(bedId)
                .orElseThrow(() -> new ResourceNotFoundException("Bed not found with id: " + bedId));
        
        bed.setStatus("AVAILABLE");
        bed.setCurrentPatient(null);
        return bedRepository.save(bed);
    }
}
