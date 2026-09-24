package in.arogya.common.exception;

public class TenantAccessException extends RuntimeException {
    public TenantAccessException(String message) {
        super(message);
    }

    public static TenantAccessException crossTenantAttempt(String requestedHospitalId, String currentHospitalId) {
        return new TenantAccessException(
            String.format("Cross-tenant access attempt: requested=%s, current=%s",
                requestedHospitalId, currentHospitalId)
        );
    }
}
