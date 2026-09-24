package in.arogya.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "lab_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LabResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private LabOrder labOrder;

    @Lob
    private String findings; // The detailed result string/JSON

    private String referenceRange;

    private LocalDateTime resultDate;

    @ManyToOne
    @JoinColumn(name = "technician_id")
    private Employee labTechnician;
}
