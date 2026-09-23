package in.arogya.onboarding.dto;

import in.arogya.onboarding.domain.Hospital;
import lombok.Builder;

import java.time.Instant;

@Builder
public record HospitalRegistrationResponse(
    String id,
    String name,
    String slug,
    String hospitalCode,
    Hospital.HospitalStatus status,
    String email,
    String message,
    Instant createdAt
) {
    public static HospitalRegistrationResponse from(Hospital hospital, String message) {
        return HospitalRegistrationResponse.builder()
                .id(hospital.getId())
                .name(hospital.getName())
                .slug(hospital.getSlug())
                .hospitalCode(hospital.getHospitalCode())
                .status(hospital.getStatus())
                .email(hospital.getEmail())
                .message(message)
                .createdAt(hospital.getCreatedAt())
                .build();
    }
}
