package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pharmacy_sale_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PharmacySaleItem extends TenantAwareEntity {
    
    @ManyToOne
    @JoinColumn(name = "pharmacy_sale_id", nullable = false)
    private PharmacySale pharmacySale;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    private Integer quantity;

    private Double unitPrice;
    private Double totalPrice;
}
