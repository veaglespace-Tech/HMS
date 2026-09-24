package in.arogya.onboarding.entity;

import in.arogya.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "subscription_plan")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionPlan extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "code", nullable = false, unique = true, length = 50)
    private String code;

    @Column(name = "max_users")
    private Integer maxUsers;

    @Column(name = "max_beds")
    private Integer maxBeds;

    @Column(name = "features_json", columnDefinition = "JSON")
    private String featuresJson;

    @Column(name = "monthly_price", precision = 10, scale = 2)
    private java.math.BigDecimal monthlyPrice;

    @Column(name = "annual_price", precision = 10, scale = 2)
    private java.math.BigDecimal annualPrice;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private boolean active = true;

    @Column(name = "sort_order")
    @Builder.Default
    private Integer sortOrder = 0;
}
