package in.arogya.common.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * JWT generation and validation using HS256.
 * Claims:
 *   sub         = userId (UUID)
 *   hospitalId  = hospital UUID (absent for platform users)
 *   roles       = list of role codes
 *   platform    = true if SUPER_ADMIN / PLATFORM role
 *   iat, exp
 */
@Slf4j
@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiry-ms:86400000}")
    private long jwtExpiryMs;

    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String userId, String hospitalId,
                                List<String> roles, boolean isPlatformUser) {
        return Jwts.builder()
                .subject(userId)
                .claim("hospitalId", hospitalId)
                .claim("roles", roles)
                .claim("platform", isPlatformUser)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpiryMs))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean isTokenValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("Invalid JWT: {}", e.getMessage());
            return false;
        }
    }

    public String extractUserId(String token) {
        return getClaims(token).getSubject();
    }

    public String extractHospitalId(String token) {
        return getClaims(token).get("hospitalId", String.class);
    }

    public boolean extractIsPlatformUser(String token) {
        Boolean platform = getClaims(token).get("platform", Boolean.class);
        return Boolean.TRUE.equals(platform);
    }

    @SuppressWarnings("unchecked")
    public List<String> extractRoles(String token) {
        return (List<String>) getClaims(token).get("roles", List.class);
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
