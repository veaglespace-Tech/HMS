package in.arogya.entity;

import in.arogya.common.entity.TenantAwareEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "beds")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bed extends TenantAwareEntity {
@Column(nullable = false)
    private String bedNumber;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    private String status; // e.g., Available, Occupied, Maintenance

    private Double dailyCharge;
}
