package com.example.HMS.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "radiology_studies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RadiologyStudy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // e.g., Chest X-Ray, Brain MRI

    private String studyType; // e.g., X-Ray, MRI, CT Scan

    private Double cost;
}
