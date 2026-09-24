package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medicines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Medicine extends TenantAwareEntity {
@Column(nullable = false)
    private String genericName;

    private String brandName;

    private String category; // e.g., Tablet, Syrup, Injection

    private Integer reorderLevel;

    private String manufacturer;
}
