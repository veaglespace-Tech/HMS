package in.arogya.repository;

import in.arogya.entity.SubscriptionPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlan, String> {
    List<SubscriptionPlan> findByActiveOrderBySortOrderAsc(boolean active);
}
