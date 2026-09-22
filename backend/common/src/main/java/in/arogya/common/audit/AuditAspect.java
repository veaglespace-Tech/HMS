package in.arogya.common.audit;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.stereotype.Component;

/**
 * AOP aspect that intercepts methods annotated with @Audited
 * and writes an AuditLog entry for every invocation.
 */
@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class AuditAspect {

    private final AuditService auditService;
    private final ObjectMapper objectMapper;
    private final ExpressionParser spelParser = new SpelExpressionParser();

    @Around("@annotation(audited)")
    public Object audit(ProceedingJoinPoint pjp, Audited audited) throws Throwable {
        Object result = pjp.proceed();

        try {
            String entityId = extractEntityId(audited.entityIdExpression(), result);
            String newJson = safeSerialize(result);

            auditService.write(AuditEvent.of(
                    audited.entity(),
                    entityId,
                    audited.action(),
                    null,
                    newJson
            ));
        } catch (Exception e) {
            log.warn("AuditAspect failed to write audit for {}.{}: {}",
                    pjp.getTarget().getClass().getSimpleName(),
                    ((MethodSignature) pjp.getSignature()).getMethod().getName(),
                    e.getMessage());
        }

        return result;
    }

    private String extractEntityId(String expression, Object result) {
        if (result == null || expression.isBlank()) return null;
        try {
            StandardEvaluationContext ctx = new StandardEvaluationContext();
            ctx.setVariable("result", result);
            Object id = spelParser.parseExpression(expression).getValue(ctx);
            return id != null ? id.toString() : null;
        } catch (Exception e) {
            return null;
        }
    }

    private String safeSerialize(Object obj) {
        if (obj == null) return null;
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return obj.toString();
        }
    }
}
