package in.arogya.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "pharmacy_sales")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PharmacySale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id") // Can be null for walk-in customers
    private Patient patient;

    private String walkInCustomerName;

    private LocalDateTime saleDate;

    private Double totalAmount;

    private String paymentStatus; // e.g., PAID, UNPAID
}
