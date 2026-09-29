package in.arogya.service;

import in.arogya.common.exception.ResourceNotFoundException;
import in.arogya.entity.Ward;
import in.arogya.repository.WardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WardService {
    
    private final WardRepository wardRepository;

    public List<Ward> getAllWards(String hospitalId) {
        return wardRepository.findByHospitalId(hospitalId);
    }

    public Ward getWardById(String id) {
        return wardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ward not found with id: " + id));
    }

    public Ward createWard(Ward ward) {
        return wardRepository.save(ward);
    }

    public Ward updateWard(String id, Ward updatedWard) {
        Ward existing = getWardById(id);
        existing.setName(updatedWard.getName());
        existing.setDepartment(updatedWard.getDepartment());
        return wardRepository.save(existing);
    }

    public void deleteWard(String id) {
        Ward ward = getWardById(id);
        wardRepository.delete(ward);
    }
}
