package in.arogya.onboarding.service;

import in.arogya.common.audit.AuditEvent;
import in.arogya.common.audit.AuditService;
import in.arogya.common.audit.Audited;
import in.arogya.common.exception.BusinessException;
import in.arogya.onboarding.entity.Hospital;
import in.arogya.onboarding.entity.SubscriptionPlan;
import in.arogya.onboarding.dto.HospitalRegistrationRequest;
import in.arogya.onboarding.dto.HospitalRegistrationResponse;
import in.arogya.onboarding.repository.HospitalRepository;
import in.arogya.onboarding.repository.SubscriptionPlanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class HospitalRegistrationService {

    private final HospitalRepository hospitalRepository;
    private final SubscriptionPlanRepository planRepository;
    private final AuditService auditService;
    private final StringRedisTemplate redisTemplate;

    @Value("${app.base-url:http://localhost:3000}")
    private String appBaseUrl;

    // ─── Registration ────────────────────────────────────────────────────────

    @Transactional
    @Audited(entity = "Hospital", action = "REGISTRATION_CREATED")
    public HospitalRegistrationResponse register(HospitalRegistrationRequest req, String clientIp) {
        // Rate limiting: 5 registrations per IP per hour
        checkRateLimit(clientIp);

        // Duplicate checks
        if (hospitalRepository.existsBySlugAndDeletedFalse(req.slug())) {
            throw BusinessException.conflict("SLUG_TAKEN",
                "The URL slug '" + req.slug() + "' is already taken. Please choose another.");
        }
        if (hospitalRepository.existsByEmailAndDeletedFalse(req.email())) {
            throw BusinessException.conflict("EMAIL_TAKEN",
                "A hospital is already registered with this email address.");
        }
        if (req.registrationNo() != null && !req.registrationNo().isBlank()
                && hospitalRepository.existsByRegistrationNoAndDeletedFalse(req.registrationNo())) {
            throw BusinessException.conflict("REG_NO_TAKEN",
                "A hospital with this registration number already exists.");
        }

        Hospital hospital = Hospital.builder()
                .name(req.name())
                .type(req.type())
                .slug(req.slug().toLowerCase(Locale.ROOT))
                .registrationNo(req.registrationNo())
                .gstin(req.gstin())
                .addressLine1(req.addressLine1())
                .addressLine2(req.addressLine2())
                .city(req.city())
                .state(req.state())
                .pincode(req.pincode())
                .phone(req.phone())
                .email(req.email())
                .bedCount(req.bedCount() != null ? req.bedCount() : 0)
                .ownerName(req.ownerName())
                .ownerEmail(req.ownerEmail())
                .ownerPhone(req.ownerPhone())
                .ownerDesignation(req.ownerDesignation())
                .planId(req.planId())
                .status(Hospital.HospitalStatus.PENDING_APPROVAL)
                .trialEndsAt(Instant.now().plus(30, ChronoUnit.DAYS))
                .build();

        Hospital saved = hospitalRepository.save(hospital);
        log.info("Hospital registered: id={}, slug={}, email={}", saved.getId(), saved.getSlug(), saved.getEmail());

        return HospitalRegistrationResponse.from(saved,
            "Registration successful! Please verify your email to continue. " +
            "A Super Admin will review and approve your account.");
    }

    // ─── Email Verification ───────────────────────────────────────────────────

    private final java.util.concurrent.ConcurrentHashMap<String, String> localOtpStore = new java.util.concurrent.ConcurrentHashMap<>();

    @Transactional
    public void sendVerificationEmail(String hospitalId) {
        Hospital hospital = hospitalRepository.findByIdAndDeletedFalse(hospitalId)
                .orElseThrow(() -> new BusinessException("NOT_FOUND",
                    "Hospital registration not found", org.springframework.http.HttpStatus.NOT_FOUND));

        String otp = generateOtp();
        String redisKey = "email_otp:" + hospitalId;
        try {
            redisTemplate.opsForValue().set(redisKey, otp, 15, TimeUnit.MINUTES);
        } catch (Exception e) {
            log.warn("Redis unavailable, storing OTP in memory fallback: {}", e.getMessage());
            localOtpStore.put(redisKey, otp);
        }

        // In dev mode, log the OTP instead of sending email
        log.info("[DEV] Email OTP for hospital {} ({}): {}", hospitalId, hospital.getEmail(), otp);
        // TODO: wire real email sender in Step 3

        auditService.write(AuditEvent.of("Hospital", hospitalId, "EMAIL_VERIFICATION_SENT"));
    }

    @Transactional
    public void verifyOtp(String hospitalId, String otp) {
        String redisKey = "email_otp:" + hospitalId;
        String storedOtp = null;
        try {
            storedOtp = redisTemplate.opsForValue().get(redisKey);
        } catch (Exception e) {
            log.warn("Redis unavailable, checking in-memory OTP store: {}", e.getMessage());
            storedOtp = localOtpStore.get(redisKey);
        }

        if (storedOtp == null) {
            storedOtp = localOtpStore.get(redisKey);
        }

        if (storedOtp == null) {
            throw BusinessException.badRequest("OTP_EXPIRED", "OTP has expired. Please request a new one.");
        }
        if (!storedOtp.equals(otp)) {
            throw BusinessException.badRequest("OTP_INVALID", "Invalid OTP. Please try again.");
        }

        try {
            redisTemplate.delete(redisKey);
        } catch (Exception ignored) {}
        localOtpStore.remove(redisKey);
        auditService.write(AuditEvent.of("Hospital", hospitalId, "EMAIL_VERIFIED"));
        log.info("Hospital {} email verified", hospitalId);
    }

    // ─── Queries ─────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public boolean isSlugAvailable(String slug) {
        return !hospitalRepository.existsBySlugAndDeletedFalse(slug.toLowerCase(Locale.ROOT));
    }

    @Transactional(readOnly = true)
    public List<SubscriptionPlan> getActivePlans() {
        return planRepository.findByActiveOrderBySortOrderAsc(true);
    }

    // ─── Private ─────────────────────────────────────────────────────────────

    private void checkRateLimit(String clientIp) {
        String key = "rate_limit:hospital_reg:" + clientIp;
        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1) {
            redisTemplate.expire(key, Duration.ofHours(1));
        }
        if (count != null && count > 5) {
            throw BusinessException.badRequest("RATE_LIMITED",
                "Too many registration attempts. Please try again in 1 hour.");
        }
    }

    private String generateOtp() {
        return String.valueOf((int)(Math.random() * 900000) + 100000);
    }
}
