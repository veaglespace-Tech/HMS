package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "medicine_batches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicineBatch extends TenantAwareEntity {
@ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    @Column(nullable = false)
    private String batchNumber;

    @Column(nullable = false)
    private LocalDate expiryDate;

    private Integer quantity;

    private Double purchasePrice;
    private Double sellingPrice;
}
