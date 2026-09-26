package in.arogya.repository;

import in.arogya.entity.LabOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabOrderRepository extends JpaRepository<LabOrder, String> {
    List<LabOrder> findByPatientId(String patientId);
}
