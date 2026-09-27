package in.arogya.common.tenant;

import jakarta.persistence.EntityManager;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.hibernate.Session;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class HibernateTenantFilterAspect {

    @Before("execution(* org.springframework.data.repository.Repository+.*(..))")
    public void enableTenantFilter(org.aspectj.lang.JoinPoint joinPoint) {
        Object target = joinPoint.getTarget();
        if (target instanceof org.springframework.data.jpa.repository.support.SimpleJpaRepository) {
            org.springframework.data.jpa.repository.support.SimpleJpaRepository<?, ?> repository =
                    (org.springframework.data.jpa.repository.support.SimpleJpaRepository<?, ?>) target;
            
            try {
                // We use reflection to get the EntityManager from SimpleJpaRepository
                java.lang.reflect.Field emField = org.springframework.data.jpa.repository.support.SimpleJpaRepository.class.getDeclaredField("entityManager");
                emField.setAccessible(true);
                EntityManager em = (EntityManager) emField.get(repository);
                Session session = em.unwrap(Session.class);

                // Enable filter if it's not a platform user and hospitalId is present
                if (!TenantContext.isPlatformUser() && TenantContext.getHospitalId() != null) {
                    session.enableFilter("tenantFilter").setParameter("hospitalId", TenantContext.getHospitalId());
                } else {
                    session.disableFilter("tenantFilter");
                }
            } catch (Exception e) {
                // Ignore if we can't access it, but this is a critical security layer.
                throw new RuntimeException("Failed to apply tenant filter", e);
            }
        }
    }
}
