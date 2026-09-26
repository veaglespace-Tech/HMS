package in.arogya.api;

import in.arogya.entity.Medicine;
import in.arogya.entity.PharmacySale;
import in.arogya.service.PharmacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pharmacy")
@RequiredArgsConstructor
public class PharmacyController {
    private final PharmacyService pharmacyService;

    @PostMapping("/medicines")
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        return ResponseEntity.ok(pharmacyService.addMedicine(medicine));
    }

    @GetMapping("/medicines")
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        return ResponseEntity.ok(pharmacyService.getAllMedicines());
    }

    @PostMapping("/sales")
    public ResponseEntity<PharmacySale> processSale(@RequestBody PharmacySale sale) {
        return ResponseEntity.ok(pharmacyService.processSale(sale));
    }
}
