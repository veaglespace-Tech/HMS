package in.arogya.repository;

import in.arogya.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, String> {
    List<Medicine> findByStockQuantityLessThanEqual(Integer reorderLevel);
}
