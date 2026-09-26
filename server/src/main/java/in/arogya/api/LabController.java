package in.arogya.api;

import in.arogya.entity.LabOrder;
import in.arogya.service.LabService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/labs")
@RequiredArgsConstructor
public class LabController {
    private final LabService labService;

    @PostMapping("/orders")
    public ResponseEntity<LabOrder> createLabOrder(@RequestBody LabOrder order) {
        return ResponseEntity.ok(labService.createLabOrder(order));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<LabOrder>> getAllOrders() {
        return ResponseEntity.ok(labService.getAllOrders());
    }
}
