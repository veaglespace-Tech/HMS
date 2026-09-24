package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Room extends TenantAwareEntity {
@Column(nullable = false)
    private String roomNumber;

    @ManyToOne
    @JoinColumn(name = "ward_id", nullable = false)
    private Ward ward;

    private String roomType; // e.g., AC, Non-AC
}
