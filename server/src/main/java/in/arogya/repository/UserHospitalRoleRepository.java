package in.arogya.repository;

import in.arogya.entity.UserHospitalRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserHospitalRoleRepository extends JpaRepository<UserHospitalRole, String> {
    List<UserHospitalRole> findByUserIdAndActiveTrue(String userId);
}
