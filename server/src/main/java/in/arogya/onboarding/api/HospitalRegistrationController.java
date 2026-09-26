package in.arogya.onboarding.api;

import in.arogya.common.dto.ApiResponse;
import in.arogya.onboarding.entity.SubscriptionPlan;
import in.arogya.onboarding.dto.HospitalRegistrationRequest;
import in.arogya.onboarding.dto.HospitalRegistrationResponse;
import in.arogya.onboarding.service.HospitalRegistrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/public")
@RequiredArgsConstructor
@Tag(name = "Hospital Registration", description = "Public APIs for hospital self-registration")
public class HospitalRegistrationController {

    private final HospitalRegistrationService registrationService;

    @PostMapping("/hospital-registrations")
    @Operation(summary = "Register a new hospital", description = "Creates a new hospital registration with status PENDING_APPROVAL")
    public ResponseEntity<ApiResponse<HospitalRegistrationResponse>> register(
            @Valid @RequestBody HospitalRegistrationRequest request,
            HttpServletRequest httpRequest) {

        String clientIp = getClientIp(httpRequest);
        HospitalRegistrationResponse response = registrationService.register(request, clientIp);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(response, "Registration submitted successfully"));
    }

    @PostMapping("/hospital-registrations/{id}/verify-email")
    @Operation(summary = "Send email verification OTP")
    public ResponseEntity<ApiResponse<Void>> sendVerificationEmail(@PathVariable String id) {
        registrationService.sendVerificationEmail(id);
        return ResponseEntity.ok(ApiResponse.accepted("Verification OTP sent to registered email"));
    }

    @PostMapping("/hospital-registrations/{id}/verify-otp")
    @Operation(summary = "Verify email OTP")
    public ResponseEntity<ApiResponse<Void>> verifyOtp(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {

        String otp = body.get("otp");
        if (otp == null || otp.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.accepted("OTP is required"));
        }
        registrationService.verifyOtp(id, otp);
        return ResponseEntity.ok(ApiResponse.accepted("Email verified successfully"));
    }

    @GetMapping("/subscription-plans")
    @Operation(summary = "Get all active subscription plans")
    public ResponseEntity<ApiResponse<List<SubscriptionPlan>>> getPlans() {
        return ResponseEntity.ok(ApiResponse.ok(registrationService.getActivePlans()));
    }

    @GetMapping("/hospital-registrations/check-slug")
    @Operation(summary = "Check if a slug is available")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkSlug(@RequestParam String slug) {
        boolean available = registrationService.isSlugAvailable(slug);
        return ResponseEntity.ok(ApiResponse.ok(Map.of(
            "slug", slug,
            "available", available,
            "message", available ? "Slug is available" : "Slug is already taken"
        )));
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
