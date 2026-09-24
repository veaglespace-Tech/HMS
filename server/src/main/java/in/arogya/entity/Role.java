package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role extends TenantAwareEntity {
@Column(unique = true, nullable = false)
    private String name; // e.g., SUPER_ADMIN, DOCTOR, NURSE, RECEPTIONIST
}
