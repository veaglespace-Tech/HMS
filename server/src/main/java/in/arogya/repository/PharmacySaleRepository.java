package in.arogya.repository;

import in.arogya.entity.PharmacySale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmacySaleRepository extends JpaRepository<PharmacySale, String> {
}
