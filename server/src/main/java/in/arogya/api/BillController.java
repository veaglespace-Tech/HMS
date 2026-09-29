package in.arogya.api;

import in.arogya.entity.Bill;
import in.arogya.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bills")
@RequiredArgsConstructor
public class BillController {
    private final BillService billService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'BILLING_MANAGER')")
    public ResponseEntity<Bill> generateBill(@RequestBody Bill bill) {
        return ResponseEntity.ok(billService.generateBill(bill));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'BILLING_MANAGER')")
    public ResponseEntity<List<Bill>> getAllBills() {
        return ResponseEntity.ok(billService.getAllBills());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'BILLING_MANAGER', 'PATIENT')")
    public ResponseEntity<Bill> getBill(@PathVariable String id) {
        return billService.getBillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/pdf")
    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN', 'HOSPITAL_ADMIN', 'BILLING_MANAGER', 'PATIENT')")
    public ResponseEntity<byte[]> downloadInvoicePdf(
            @PathVariable String id,
            @org.springframework.beans.factory.annotation.Autowired in.arogya.service.PdfInvoiceService pdfInvoiceService) {
        
        Bill bill = billService.getBillById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bill not found"));
                
        byte[] pdfBytes = pdfInvoiceService.generateInvoicePdf(bill);
        
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "invoice-" + id + ".pdf");
        
        return new ResponseEntity<>(pdfBytes, headers, org.springframework.http.HttpStatus.OK);
    }
}
