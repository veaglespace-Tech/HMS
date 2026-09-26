package in.arogya.service;

import in.arogya.entity.Bill;
import in.arogya.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BillService {
    private final BillRepository billRepository;

    public Bill generateBill(Bill bill) {
        if (bill.getBillDate() == null) {
            bill.setBillDate(LocalDateTime.now());
        }
        if (bill.getStatus() == null) {
            bill.setStatus("UNPAID");
        }
        
        // Simple logic for net amount
        if (bill.getTotalAmount() != null) {
            BigDecimal discount = bill.getDiscount() != null ? bill.getDiscount() : BigDecimal.ZERO;
            bill.setNetAmount(bill.getTotalAmount().subtract(discount));
            bill.setOutstanding(bill.getNetAmount().subtract(bill.getAmountPaid() != null ? bill.getAmountPaid() : BigDecimal.ZERO));
        }
        
        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Optional<Bill> getBillById(String id) {
        return billRepository.findById(id);
    }
}
