package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "encounters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Encounter extends TenantAwareEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor primaryDoctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bed_id")
    private Bed bed; // For IPD/Emergency admissions

    @Column(nullable = false)
    private String type; // OPD, IPD, EMERGENCY

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String status; // ACTIVE, DISCHARGED, CANCELLED

    private String chiefComplaint;
    private String diagnosis;
    
    // For Emergency
    private String triagePriority; // CRITICAL, HIGH, MEDIUM, LOW
}
