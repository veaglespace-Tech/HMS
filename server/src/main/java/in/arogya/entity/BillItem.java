package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "bill_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillItem extends TenantAwareEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bill_id", nullable = false)
    private Bill bill;

    private String category; // CONSULTATION, ROOM, NURSING, LAB, PHARMACY, PROCEDURE, MISC
    private String description;
    
    private Integer quantity;
    private BigDecimal unitPrice = BigDecimal.ZERO;
    private BigDecimal totalAmount = BigDecimal.ZERO;

    // Optional linking to specific orders
    private String referenceId; // e.g. PharmacySale ID or LabOrder ID
}
