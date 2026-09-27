package in.arogya.api;

import in.arogya.common.tenant.TenantContext;
import in.arogya.entity.Bed;
import in.arogya.service.BedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/beds")
@RequiredArgsConstructor
public class BedController {

    private final BedService bedService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST')")
    public ResponseEntity<List<Bed>> getAllBeds() {
        return ResponseEntity.ok(bedService.getAllBeds(TenantContext.getHospitalId()));
    }

    @PostMapping("/{bedId}/assign/{patientId}")
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'NURSE', 'RECEPTIONIST')")
    public ResponseEntity<Bed> assignPatient(@PathVariable String bedId, @PathVariable String patientId) {
        return ResponseEntity.ok(bedService.assignPatientToBed(bedId, patientId));
    }
    
    @PostMapping("/{bedId}/vacate")
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'NURSE', 'RECEPTIONIST')")
    public ResponseEntity<Bed> vacateBed(@PathVariable String bedId) {
        return ResponseEntity.ok(bedService.vacateBed(bedId));
    }
}
