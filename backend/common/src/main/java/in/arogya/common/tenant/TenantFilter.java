package in.arogya.common.tenant;

import in.arogya.common.security.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Extracts JWT from Authorization header, validates it, and populates TenantContext.
 * Must run BEFORE Spring Security's authentication filter so that TenantContext
 * is available during @Filter activation.
 *
 * SUPER_ADMIN tokens have isPlatformUser=true and no hospitalId claim.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class TenantFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        try {
            String token = extractToken(request);
            if (StringUtils.hasText(token) && jwtService.isTokenValid(token)) {
                String userId = jwtService.extractUserId(token);
                String hospitalId = jwtService.extractHospitalId(token);
                boolean isPlatformUser = jwtService.extractIsPlatformUser(token);

                TenantContext.setUserId(userId);
                TenantContext.setPlatformUser(isPlatformUser);

                if (!isPlatformUser && StringUtils.hasText(hospitalId)) {
                    TenantContext.setHospitalId(hospitalId);
                    log.debug("TenantFilter: hospitalId={}, userId={}", hospitalId, userId);
                } else if (isPlatformUser) {
                    // SUPER_ADMIN / PLATFORM roles — no hospitalId set
                    // They bypass Hibernate @Filter by not enabling it
                    log.debug("TenantFilter: platform user={}", userId);
                }
            }
            filterChain.doFilter(request, response);
        } finally {
            // CRITICAL: always clear to prevent ThreadLocal leaks
            TenantContext.clear();
        }
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // Skip filter for public endpoints — JWT is optional there
        String path = request.getRequestURI();
        return path.startsWith("/api/v1/public/")
                || path.startsWith("/swagger-ui")
                || path.startsWith("/v3/api-docs")
                || path.startsWith("/actuator");
    }
}
