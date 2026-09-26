package in.arogya.onboarding.dto;

import in.arogya.onboarding.entity.Hospital;
import jakarta.validation.constraints.*;
import lombok.Builder;

@Builder
public record HospitalRegistrationRequest(

    // Step 1: Hospital Details
    @NotBlank(message = "Hospital name is required")
    @Size(min = 3, max = 255, message = "Name must be between 3-255 characters")
    String name,

    @NotNull(message = "Hospital type is required")
    Hospital.HospitalType type,

    @NotBlank(message = "Slug is required")
    @Pattern(regexp = "^[a-z0-9-]{3,100}$",
             message = "Slug must be lowercase letters, numbers and hyphens only (3-100 chars)")
    String slug,

    @Size(max = 100, message = "Registration number too long")
    String registrationNo,

    @Pattern(regexp = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
             message = "Invalid GSTIN format")
    String gstin,

    @NotBlank(message = "City is required")
    String city,

    @NotBlank(message = "State is required")
    String state,

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "^[1-9][0-9]{5}$", message = "Invalid pincode")
    String pincode,

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid Indian mobile number")
    String phone,

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    String email,

    String addressLine1,
    String addressLine2,

    @Min(value = 0, message = "Bed count cannot be negative")
    Integer bedCount,

    // Step 2: Owner Details
    @NotBlank(message = "Owner name is required")
    String ownerName,

    @NotBlank(message = "Owner email is required")
    @Email(message = "Invalid owner email")
    String ownerEmail,

    @NotBlank(message = "Owner phone is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Invalid owner mobile number")
    String ownerPhone,

    String ownerDesignation,

    // Step 3: Plan
    String planId
) {}
