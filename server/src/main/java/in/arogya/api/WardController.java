package in.arogya.api;

import in.arogya.common.tenant.TenantContext;
import in.arogya.entity.Ward;
import in.arogya.service.WardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wards")
@RequiredArgsConstructor
public class WardController {

    private final WardService wardService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST')")
    public ResponseEntity<List<Ward>> getAllWards() {
        return ResponseEntity.ok(wardService.getAllWards(TenantContext.getHospitalId()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'DOCTOR', 'NURSE')")
    public ResponseEntity<Ward> getWardById(@PathVariable String id) {
        return ResponseEntity.ok(wardService.getWardById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN')")
    public ResponseEntity<Ward> createWard(@RequestBody Ward ward) {
        return ResponseEntity.ok(wardService.createWard(ward));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN')")
    public ResponseEntity<Ward> updateWard(@PathVariable String id, @RequestBody Ward ward) {
        return ResponseEntity.ok(wardService.updateWard(id, ward));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN')")
    public ResponseEntity<Void> deleteWard(@PathVariable String id) {
        wardService.deleteWard(id);
        return ResponseEntity.noContent().build();
    }
}
