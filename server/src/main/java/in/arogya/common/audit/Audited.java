package in.arogya.common.audit;

import java.lang.annotation.*;

/**
 * Mark a service method with @Audited to automatically write an audit log entry.
 * Processed by AuditAspect.
 *
 * Usage:
 *   @Audited(entity = "Hospital", action = "REGISTRATION_CREATED")
 *   public HospitalRegistrationResponse register(HospitalRegistrationRequest req) { ... }
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Audited {
    /** Entity name, e.g. "Hospital", "Patient", "Invoice" */
    String entity();

    /** Action code, e.g. "CREATED", "UPDATED", "DELETED", "APPROVED" */
    String action();

    /** SpEL expression to extract the entity ID from the return value. Default: return value's id field */
    String entityIdExpression() default "#result?.id";
}
