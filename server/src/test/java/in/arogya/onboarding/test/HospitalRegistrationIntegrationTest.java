package in.arogya.onboarding.test;

import in.arogya.onboarding.domain.Hospital;
import in.arogya.onboarding.dto.HospitalRegistrationRequest;
import in.arogya.onboarding.repository.HospitalRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration test for hospital registration using Testcontainers MySQL.
 */
@Testcontainers
@DataJpaTest
class HospitalRegistrationIntegrationTest {

    @Container
    static MySQLContainer<?> mysql = new MySQLContainer<>("mysql:8.0")
            .withDatabaseName("arogya_test")
            .withUsername("arogya")
            .withPassword("arogya_test");

    @DynamicPropertySource
    static void mysqlProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mysql::getJdbcUrl);
        registry.add("spring.datasource.username", mysql::getUsername);
        registry.add("spring.datasource.password", mysql::getPassword);
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
        registry.add("spring.flyway.enabled", () -> "false");
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
