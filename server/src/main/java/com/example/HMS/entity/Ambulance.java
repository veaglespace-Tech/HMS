package com.example.HMS.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ambulances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ambulance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String vehicleNumber;

    private String vehicleType; // e.g., Basic, Advanced Life Support (ALS)

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Employee driver;

    private String status; // e.g., AVAILABLE, ON_TRIP, MAINTENANCE
}
