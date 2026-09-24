package in.arogya.onboarding.entity;

import in.arogya.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "hospital",
       indexes = {
           @Index(name = "idx_hospital_slug", columnList = "slug"),
           @Index(name = "idx_hospital_status", columnList = "status, is_deleted")
       })
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Hospital extends BaseEntity {

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 50)
    private HospitalType type;

    @Column(name = "hospital_code", length = 50, unique = true)
    private String hospitalCode;

    @Column(name = "slug", nullable = false, unique = true, length = 100)
    private String slug;

    @Column(name = "registration_no", length = 100)
    private String registrationNo;

    @Column(name = "gstin", length = 15)
    private String gstin;

    @Column(name = "address_line1", length = 255)
    private String addressLine1;

    @Column(name = "address_line2", length = 255)
    private String addressLine2;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Column(name = "state", nullable = false, length = 100)
    private String state;

    @Column(name = "pincode", nullable = false, length = 10)
    private String pincode;

    @Column(name = "phone", nullable = false, length = 15)
    private String phone;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(name = "bed_count")
    @Builder.Default
    private Integer bedCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    @Builder.Default
    private HospitalStatus status = HospitalStatus.PENDING_APPROVAL;

    @Column(name = "plan_id", length = 36)
    private String planId;

    @Column(name = "trial_ends_at")
    private Instant trialEndsAt;

    @Column(name = "approved_at")
    private Instant approvedAt;

    @Column(name = "approved_by", length = 36)
    private String approvedBy;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "owner_name", length = 255)
    private String ownerName;

    @Column(name = "owner_email", length = 255)
    private String ownerEmail;

    @Column(name = "owner_phone", length = 15)
    private String ownerPhone;

    @Column(name = "owner_designation", length = 100)
    private String ownerDesignation;

    public enum HospitalType {
        CLINIC, POLYCLINIC, NURSING_HOME, MULTISPECIALTY,
        SUPERSPECIALTY, TRUST, DIAGNOSTIC_CENTRE, DAY_CARE, GOVERNMENT
    }

    public enum HospitalStatus {
        PENDING_APPROVAL, APPROVED, REJECTED, SUSPENDED
    }
}
