package in.arogya.common.audit;

/**
 * Immutable audit event record passed to AuditService.
 */
public record AuditEvent(
    String entity,
    String entityId,
    String action,
    String oldJson,
    String newJson,
    String userId,
    String hospitalId,
    String ip,
    String userAgent
) {
    public static AuditEvent of(String entity, String entityId, String action) {
        return new AuditEvent(entity, entityId, action, null, null, null, null, null, null);
    }

    public static AuditEvent of(String entity, String entityId, String action,
                                 String oldJson, String newJson) {
        return new AuditEvent(entity, entityId, action, oldJson, newJson, null, null, null, null);
    }
}
