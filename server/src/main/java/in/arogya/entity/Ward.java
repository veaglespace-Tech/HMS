package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "wards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ward extends TenantAwareEntity {
@Column(unique = true, nullable = false)
    private String name; // e.g., General Ward, ICU, VIP

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}
