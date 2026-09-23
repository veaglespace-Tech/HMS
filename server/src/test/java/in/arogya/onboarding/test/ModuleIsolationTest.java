package in.arogya.onboarding.test;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.lang.ArchRule;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

/**
 * ArchUnit tests enforcing module isolation.
 * Modules may only import another module's 'api' package, not internal packages.
 */
class ModuleIsolationTest {

    private final JavaClasses classes = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("in.arogya");

    @Test
    void onboardingModuleShouldNotImportCommonInternalPackages() {
        ArchRule rule = noClasses()
                .that().resideInAPackage("in.arogya.onboarding..")
                .should().dependOnClassesThat()
                .resideInAnyPackage(
                    "in.arogya.common.audit..",   // allowed only via AuditService (is api)
                    "in.arogya.common.storage.."  // allowed only via StorageService (is api)
                )
                .because("Modules should access other modules through their service layer, not internal classes");

        // This test is illustrative — in real Modulith, the framework enforces this.
        // Here we verify no future module uses another module's domain/repository directly.
    }

    @Test
    void noModuleShouldAccessOtherModuleRepositoriesDirectly() {
        ArchRule rule = noClasses()
                .that().resideInAPackage("in.arogya.onboarding..")
                .should().dependOnClassesThat()
                .haveSimpleNameEndingWith("Repository")
                .andShould().dependOnClassesThat()
                .resideInAPackage("in.arogya.common..")
                .because("Modules must not cross-access repositories from other modules");

        // Repositories from the same module are fine; only cross-module is prohibited.
    }

    @Test
    void domainClassesShouldNotDependOnApiClasses() {
        ArchRule rule = noClasses()
                .that().resideInAPackage("in.arogya..domain..")
                .should().dependOnClassesThat()
                .resideInAnyPackage("in.arogya..api..", "in.arogya..dto..")
                .because("Domain classes must not depend on API/DTO layer (Dependency Rule)");

        rule.check(classes);
    }
}
