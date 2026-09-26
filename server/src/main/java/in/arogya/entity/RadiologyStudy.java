package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "radiology_studies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RadiologyStudy extends TenantAwareEntity {
@Column(nullable = false, unique = true)
    private String name; // e.g., Chest X-Ray, Brain MRI

    private String studyType; // e.g., X-Ray, MRI, CT Scan

    private Double cost;
}
