package in.arogya.service;

import in.arogya.entity.Medicine;
import in.arogya.entity.PharmacySale;
import in.arogya.repository.MedicineRepository;
import in.arogya.repository.PharmacySaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PharmacyService {
    private final MedicineRepository medicineRepository;
    private final PharmacySaleRepository pharmacySaleRepository;

    public Medicine addMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public Optional<Medicine> getMedicine(String id) {
        return medicineRepository.findById(id);
    }

    public PharmacySale processSale(PharmacySale sale) {
        // Additional stock deduction logic would go here
        return pharmacySaleRepository.save(sale);
    }
}
