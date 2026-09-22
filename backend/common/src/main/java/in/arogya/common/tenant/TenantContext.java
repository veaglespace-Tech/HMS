package in.arogya.common.tenant;

/**
 * Thread-local holder for the current request's tenant context.
 * Set by TenantFilter, cleared after every request.
 *
 * SUPER_ADMIN requests: hospitalId = null, platformUser = true.
 * Hospital requests: hospitalId = UUID of the hospital, platformUser = false.
 */
public final class TenantContext {

    private static final ThreadLocal<String> HOSPITAL_ID = new ThreadLocal<>();
    private static final ThreadLocal<String> USER_ID = new ThreadLocal<>();
    private static final ThreadLocal<Boolean> PLATFORM_USER = new ThreadLocal<>();

    private TenantContext() {}

    public static void setHospitalId(String hospitalId) {
        HOSPITAL_ID.set(hospitalId);
    }

    public static String getHospitalId() {
        return HOSPITAL_ID.get();
    }

    public static void setUserId(String userId) {
        USER_ID.set(userId);
    }

    public static String getUserId() {
        return USER_ID.get();
    }

    public static void setPlatformUser(boolean isPlatformUser) {
        PLATFORM_USER.set(isPlatformUser);
    }

    public static boolean isPlatformUser() {
        return Boolean.TRUE.equals(PLATFORM_USER.get());
    }

    /**
     * MUST be called at the end of every request (in a finally block)
     * to prevent ThreadLocal leaks in thread-pool environments.
     */
    public static void clear() {
        HOSPITAL_ID.remove();
        USER_ID.remove();
        PLATFORM_USER.remove();
    }
}
