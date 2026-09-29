package in.arogya.common.config;

import in.arogya.common.tenant.TenantContext;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        String userId = TenantContext.getUserId();
        if (userId != null && !userId.isBlank()) {
            return Optional.of(userId);
        }
        return Optional.of("SYSTEM");
    }
}
