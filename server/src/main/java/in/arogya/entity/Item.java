package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item extends TenantAwareEntity {
@Column(nullable = false)
    private String name; // e.g., PPE Kit, Syringe

    private String category;

    private Integer stockQuantity;

    private Integer reorderLevel;
}
