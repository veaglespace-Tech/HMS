package in.arogya.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = { UserDetailsServiceAutoConfiguration.class })
@ComponentScan(basePackages = "in.arogya")
@EnableJpaRepositories(basePackages = "in.arogya")
@EntityScan(basePackages = "in.arogya")
@ConfigurationPropertiesScan(basePackages = "in.arogya")
@EnableAsync
@EnableScheduling
public class ArogyaHmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArogyaHmsApplication.class, args);
    }
}
