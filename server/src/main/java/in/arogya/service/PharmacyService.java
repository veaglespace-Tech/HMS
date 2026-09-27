package in.arogya.service;

import in.arogya.entity.Medicine;
import in.arogya.entity.MedicineBatch;
import in.arogya.entity.PharmacySale;
import in.arogya.entity.PharmacySaleItem;
import in.arogya.repository.MedicineBatchRepository;
import in.arogya.repository.MedicineRepository;
import in.arogya.repository.PharmacySaleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PharmacyService {
    private final MedicineRepository medicineRepository;
    private final MedicineBatchRepository medicineBatchRepository;
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

    @Transactional
    public PharmacySale processSale(PharmacySale sale) {
        if (sale.getItems() != null) {
            for (PharmacySaleItem item : sale.getItems()) {
                Medicine medicine = medicineRepository.findById(item.getMedicine().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Medicine not found"));
                
                int remainingToDeduct = item.getQuantity();
                
                // 1. Deduct from total stock first
                if (medicine.getStockQuantity() == null || medicine.getStockQuantity() < remainingToDeduct) {
                    throw new IllegalArgumentException("Not enough stock for " + medicine.getGenericName());
                }
                medicine.setStockQuantity(medicine.getStockQuantity() - remainingToDeduct);
                
                // 2. Deduct from batches (FIFO based on expiry date)
                List<MedicineBatch> batches = medicineBatchRepository
                        .findByMedicineIdAndQuantityGreaterThanOrderByExpiryDateAsc(medicine.getId(), 0);
                
                for (MedicineBatch batch : batches) {
                    if (remainingToDeduct <= 0) break;
                    
                    if (batch.getQuantity() >= remainingToDeduct) {
                        batch.setQuantity(batch.getQuantity() - remainingToDeduct);
                        remainingToDeduct = 0;
                    } else {
                        remainingToDeduct -= batch.getQuantity();
                        batch.setQuantity(0);
                    }
                    medicineBatchRepository.save(batch);
                }
                
                if (remainingToDeduct > 0) {
                     throw new IllegalArgumentException("Stock mismatch. Not enough batch inventory for " + medicine.getGenericName());
                }

                // 3. Low Stock Alert (Reorder Level Check)
                if (medicine.getReorderLevel() != null && medicine.getStockQuantity() <= medicine.getReorderLevel()) {
                    log.warn("LOW STOCK ALERT: Medicine '{}' has fallen below reorder level (Current: {}, Reorder Level: {})", 
                            medicine.getGenericName(), medicine.getStockQuantity(), medicine.getReorderLevel());
                }
                
                medicineRepository.save(medicine);
                
                // 4. Link item to the sale parent entity
                item.setPharmacySale(sale);
            }
        }
        return pharmacySaleRepository.save(sale);
    }
}
