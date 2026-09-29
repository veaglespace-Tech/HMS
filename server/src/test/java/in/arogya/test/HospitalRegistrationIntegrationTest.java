package in.arogya.test;

import in.arogya.common.entity.BaseEntity;
import in.arogya.entity.Hospital;
import in.arogya.repository.HospitalRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration test for hospital repository operations using in-memory H2 database.
 */
@DataJpaTest
@ContextConfiguration(classes = HospitalRegistrationIntegrationTest.TestConfig.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@TestPropertySource(properties = {
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.flyway.enabled=false"
})
class HospitalRegistrationIntegrationTest {

    @SpringBootConfiguration
    @EnableAutoConfiguration
    @EnableJpaAuditing(auditorAwareRef = "testAuditor")
    @EntityScan(basePackageClasses = {Hospital.class, BaseEntity.class})
    @EnableJpaRepositories(basePackageClasses = HospitalRepository.class)
    static class TestConfig {
        @Bean
        public AuditorAware<String> testAuditor() {
            return () -> Optional.of("TEST_AUDITOR");
        }
    }

    @Autowired
    HospitalRepository hospitalRepository;

    @Test
    void shouldSaveAndRetrieveHospital() {
        Hospital hospital = Hospital.builder()
                .name("Test Clinic")
                .type(Hospital.HospitalType.CLINIC)
                .slug("test-clinic-001")
                .email("test@clinic.com")
                .phone("9876543210")
                .city("Pune")
                .state("Maharashtra")
                .pincode("411001")
                .ownerName("Dr. Test")
                .ownerEmail("owner@test.com")
                .ownerPhone("9876543210")
                .status(Hospital.HospitalStatus.PENDING_APPROVAL)
                .build();

        Hospital saved = hospitalRepository.save(hospital);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getSlug()).isEqualTo("test-clinic-001");
        assertThat(saved.getStatus()).isEqualTo(Hospital.HospitalStatus.PENDING_APPROVAL);
        assertThat(saved.isDeleted()).isFalse();
    }

    @Test
    void shouldDetectDuplicateSlug() {
        Hospital h1 = Hospital.builder()
                .name("Clinic A")
                .type(Hospital.HospitalType.CLINIC)
                .slug("duplicate-slug")
                .email("a@clinic.com")
                .phone("9876543210")
                .city("Mumbai").state("Maharashtra").pincode("400001")
                .ownerName("Owner A").ownerEmail("a@owner.com").ownerPhone("9876543210")
                .status(Hospital.HospitalStatus.PENDING_APPROVAL)
                .build();

        hospitalRepository.save(h1);

        boolean exists = hospitalRepository.existsBySlugAndDeletedFalse("duplicate-slug");
        assertThat(exists).isTrue();
    }

    @Test
    void shouldNotReturnSoftDeletedHospitals() {
        Hospital hospital = Hospital.builder()
                .name("Deleted Clinic")
                .type(Hospital.HospitalType.CLINIC)
                .slug("deleted-clinic")
                .email("deleted@clinic.com")
                .phone("9876543210")
                .city("Nagpur").state("Maharashtra").pincode("440001")
                .ownerName("Owner").ownerEmail("o@owner.com").ownerPhone("9876543210")
                .status(Hospital.HospitalStatus.PENDING_APPROVAL)
                .build();
        hospital.softDelete("system", "Test deletion");

        hospitalRepository.save(hospital);

        boolean exists = hospitalRepository.existsBySlugAndDeletedFalse("deleted-clinic");
        assertThat(exists).isFalse();
    }
}
