package in.arogya.repository;

import in.arogya.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, String> {
    List<Appointment> findByDoctorIdAndAppointmentDateBetween(String doctorId, LocalDateTime start, LocalDateTime end);
    List<Appointment> findByPatientId(String patientId);
}
