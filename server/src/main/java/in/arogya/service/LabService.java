package in.arogya.service;

import in.arogya.entity.LabOrder;
import in.arogya.repository.LabOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LabService {
    private final LabOrderRepository labOrderRepository;

    public LabOrder createLabOrder(LabOrder order) {
        if (order.getStatus() == null) {
            order.setStatus("PENDING");
        }
        return labOrderRepository.save(order);
    }

    public List<LabOrder> getAllOrders() {
        return labOrderRepository.findAll();
    }
}
