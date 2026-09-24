package in.arogya.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "ambulance_trips")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AmbulanceTrip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ambulance_id", nullable = false)
    private Ambulance ambulance;

    @ManyToOne
    @JoinColumn(name = "patient_id") // Can be null if it's an emergency pickup for an unregistered patient
    private Patient patient;

    private String pickupLocation;
    private String destination;

    private LocalDateTime tripStartTime;
    private LocalDateTime tripEndTime;

    private Double distance;
    private Double totalCharge;
}
