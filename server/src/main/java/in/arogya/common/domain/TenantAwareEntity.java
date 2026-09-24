package in.arogya.common.domain;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

/**
 * Base entity for ALL tenant-scoped tables.
 * Every table that belongs to a hospital extends this.
 *
 * Hibernate @Filter ensures queries automatically include
 * WHERE hospital_id = :hospitalId when the filter is active.
 * The filter is activated per-request by HibernateTenantFilterAspect.
 */
@Getter
@Setter
@MappedSuperclass
@FilterDef(
    name = "tenantFilter",
    parameters = @ParamDef(name = "hospitalId", type = String.class)
)
@Filter(name = "tenantFilter", condition = "hospital_id = :hospitalId")
public abstract class TenantAwareEntity extends BaseEntity {

    @Column(name = "hospital_id", nullable = false, length = 36, updatable = false)
    private String hospitalId;
}
