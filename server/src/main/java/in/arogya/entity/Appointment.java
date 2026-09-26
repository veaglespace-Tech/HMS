package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Appointment extends TenantAwareEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(nullable = false)
    private LocalDateTime appointmentDate;

    private String appointmentType; // e.g., WALK_IN, ONLINE, FOLLOW_UP

    private String status; // e.g., SCHEDULED, CHECKED_IN, CANCELLED, COMPLETED, NO_SHOW

    private String tokenNumber; // For OPD queue management

    private String notes;
}
