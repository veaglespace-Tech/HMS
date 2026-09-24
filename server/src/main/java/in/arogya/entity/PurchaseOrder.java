package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "purchase_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrder extends TenantAwareEntity {
@ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    private LocalDate orderDate;
    private LocalDate expectedDeliveryDate;

    private Double totalAmount;

    private String status; // e.g., PENDING, RECEIVED, CANCELLED
}
