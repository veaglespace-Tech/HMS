package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "radiology_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RadiologyReport extends TenantAwareEntity {
@ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false) // Doctor who ordered it
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "study_id", nullable = false)
    private RadiologyStudy study;

    @Lob
    private String findings;

    private String imagePath; // Path/URL to the PACS system or S3 bucket

    private LocalDateTime reportDate;
}
