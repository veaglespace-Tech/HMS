package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "prescription_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionItem extends TenantAwareEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", nullable = false)
    private Prescription prescription;

    // We can link to a Medicine entity, but often prescriptions contain free text for external meds
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id")
    private Medicine medicine; 

    private String medicineName; // Fallback or free text if no mapped medicine

    private String dosage; // e.g., 500mg, 1 tablet
    private String route; // e.g., Oral, IV
    private String frequency; // e.g., 1-0-1, TDS
    private String duration; // e.g., 5 days
    private String instructions; // e.g., After meals
    private Integer quantity; // e.g., 10

    private String status; // DRAFT, ISSUED, PARTIALLY_DISPENSED, DISPENSED, CANCELLED
}
