package in.arogya.repository;

import in.arogya.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WardRepository extends JpaRepository<Ward, String> {
    List<Ward> findByHospitalId(String hospitalId);
}
