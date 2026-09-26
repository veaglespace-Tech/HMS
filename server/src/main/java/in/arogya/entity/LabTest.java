package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "lab_tests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LabTest extends TenantAwareEntity {
@Column(nullable = false, unique = true)
    private String testName; // e.g., Complete Blood Count

    private String description;
    
    private Double price;
}
