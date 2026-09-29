package in.arogya.api;

import in.arogya.entity.Doctor;
import in.arogya.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN')")
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(doctorService.createDoctor(doctor));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST')")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'PATIENT')")
    public ResponseEntity<Doctor> getDoctor(@PathVariable String id) {
        return doctorService.getDoctorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
