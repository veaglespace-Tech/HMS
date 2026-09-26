package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment extends TenantAwareEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bill_id", nullable = false)
    private Bill bill;

    private LocalDateTime paymentDate;
    
    private BigDecimal amount = BigDecimal.ZERO;
    
    private String paymentMode; // CASH, UPI, CARD, BANK_TRANSFER, INSURANCE
    private String transactionRef; // e.g. UPI transaction ID

    private String status; // SUCCESS, FAILED, REFUNDED
}
