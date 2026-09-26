package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "nursing_tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NursingTask extends TenantAwareEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "encounter_id", nullable = false)
    private Encounter encounter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_nurse_id")
    private Employee assignedNurse;

    private String taskType; // MEDICATION, VITALS, IV_FLUID, INTAKE_OUTPUT, GENERAL
    
    private String description;

    private LocalDateTime scheduledTime;
    private LocalDateTime completedTime;

    private String status; // PENDING, COMPLETED, CANCELLED, OVERDUE
}
