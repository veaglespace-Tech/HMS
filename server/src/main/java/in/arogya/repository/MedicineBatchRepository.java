package in.arogya.repository;

import in.arogya.entity.MedicineBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineBatchRepository extends JpaRepository<MedicineBatch, String> {
    List<MedicineBatch> findByMedicineIdAndQuantityGreaterThanOrderByExpiryDateAsc(String medicineId, Integer quantity);
}
