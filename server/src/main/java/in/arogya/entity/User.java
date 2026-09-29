package in.arogya.entity;

import in.arogya.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "app_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
    
    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    @Column(name = "password_hash")
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(nullable = false)
    private String status = "ACTIVE";

    @Column(name = "is_platform_user", nullable = false)
    private boolean platformUser;

    @Column(name = "mfa_enabled", nullable = false)
    private boolean mfaEnabled;

    @Column(name = "force_password_change", nullable = false)
    private boolean forcePasswordChange;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    public boolean isActive() {
        return "ACTIVE".equals(status);
    }
}
