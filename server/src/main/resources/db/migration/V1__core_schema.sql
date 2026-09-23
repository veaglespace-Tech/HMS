-- ============================================================
-- Arogya HMS — V1 Core Schema
-- ============================================================
-- Conventions:
--   • All PKs are VARCHAR(36) UUID
--   • Every table has: created_at, created_by, updated_at, updated_by, version, is_deleted, deleted_at, deleted_by, deleted_reason
--   • Every tenant table has: hospital_id VARCHAR(36)
--   • No hard deletes anywhere
-- ============================================================

SET NAMES utf8mb4;
SET time_zone = '+05:30';

-- ─── SUBSCRIPTION PLANS ───────────────────────────────────────────────────────
CREATE TABLE subscription_plan (
    id              VARCHAR(36)     NOT NULL PRIMARY KEY,
    name            VARCHAR(100)    NOT NULL,
    code            VARCHAR(50)     NOT NULL UNIQUE,
    max_users       INT             NOT NULL DEFAULT 10,
    max_beds        INT             NOT NULL DEFAULT 50,
    features_json   JSON,
    monthly_price   DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    annual_price    DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    sort_order      INT             NOT NULL DEFAULT 0,
    created_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    created_by      VARCHAR(36),
    updated_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    updated_by      VARCHAR(36),
    version         BIGINT          NOT NULL DEFAULT 0,
    is_deleted      TINYINT(1)      NOT NULL DEFAULT 0,
    deleted_at      DATETIME(6),
    deleted_by      VARCHAR(36),
    deleted_reason  VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── HOSPITALS ────────────────────────────────────────────────────────────────
CREATE TABLE hospital (
    id                  VARCHAR(36)     NOT NULL PRIMARY KEY,
    name                VARCHAR(255)    NOT NULL,
    type                ENUM('CLINIC','POLYCLINIC','NURSING_HOME','MULTISPECIALTY',
                             'SUPERSPECIALTY','TRUST','DIAGNOSTIC_CENTRE',
                             'DAY_CARE','GOVERNMENT')
                                        NOT NULL DEFAULT 'CLINIC',
    hospital_code       VARCHAR(50)     UNIQUE,
    slug                VARCHAR(100)    NOT NULL UNIQUE,
    registration_no     VARCHAR(100),
    gstin               VARCHAR(15),
    address_line1       VARCHAR(255),
    address_line2       VARCHAR(255),
    city                VARCHAR(100)    NOT NULL,
    state               VARCHAR(100)    NOT NULL,
    pincode             VARCHAR(10)     NOT NULL,
    phone               VARCHAR(15)     NOT NULL,
    email               VARCHAR(255)    NOT NULL,
    logo_url            VARCHAR(500),
    bed_count           INT             NOT NULL DEFAULT 0,
    status              ENUM('PENDING_APPROVAL','APPROVED','REJECTED','SUSPENDED')
                                        NOT NULL DEFAULT 'PENDING_APPROVAL',
    plan_id             VARCHAR(36),
    trial_ends_at       DATETIME(6),
    approved_at         DATETIME(6),
    approved_by         VARCHAR(36),
    rejection_reason    TEXT,
    owner_name          VARCHAR(255),
    owner_email         VARCHAR(255),
    owner_phone         VARCHAR(15),
    owner_designation   VARCHAR(100),
    -- base fields
    created_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    created_by      VARCHAR(36),
    updated_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    updated_by      VARCHAR(36),
    version         BIGINT          NOT NULL DEFAULT 0,
    is_deleted      TINYINT(1)      NOT NULL DEFAULT 0,
    deleted_at      DATETIME(6),
    deleted_by      VARCHAR(36),
    deleted_reason  VARCHAR(500),
    CONSTRAINT fk_hospital_plan FOREIGN KEY (plan_id) REFERENCES subscription_plan(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_hospital_status ON hospital(status, is_deleted);
CREATE INDEX idx_hospital_slug ON hospital(slug);
CREATE INDEX idx_hospital_email ON hospital(email);

-- ─── HOSPITAL DOCUMENTS ───────────────────────────────────────────────────────
CREATE TABLE hospital_document (
    id              VARCHAR(36)     NOT NULL PRIMARY KEY,
    hospital_id     VARCHAR(36)     NOT NULL,
    type            VARCHAR(100)    NOT NULL,
    file_url        VARCHAR(500)    NOT NULL,
    file_name       VARCHAR(255),
    verified        TINYINT(1)      NOT NULL DEFAULT 0,
    verified_at     DATETIME(6),
    verified_by     VARCHAR(36),
    created_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    created_by      VARCHAR(36),
    updated_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    updated_by      VARCHAR(36),
    version         BIGINT          NOT NULL DEFAULT 0,
    is_deleted      TINYINT(1)      NOT NULL DEFAULT 0,
    deleted_at      DATETIME(6),
    deleted_by      VARCHAR(36),
    deleted_reason  VARCHAR(500),
    CONSTRAINT fk_hosdoc_hospital FOREIGN KEY (hospital_id) REFERENCES hospital(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_hosdoc_hospital ON hospital_document(hospital_id, is_deleted);

-- ─── HOSPITAL SUBSCRIPTIONS ───────────────────────────────────────────────────
CREATE TABLE hospital_subscription (
    id              VARCHAR(36)     NOT NULL PRIMARY KEY,
    hospital_id     VARCHAR(36)     NOT NULL,
    plan_id         VARCHAR(36)     NOT NULL,
    starts_at       DATETIME(6)     NOT NULL,
    ends_at         DATETIME(6)     NOT NULL,
    status          ENUM('ACTIVE','EXPIRED','CANCELLED') NOT NULL DEFAULT 'ACTIVE',
    amount_paid     DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    payment_ref     VARCHAR(100),
    created_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    created_by      VARCHAR(36),
    updated_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    updated_by      VARCHAR(36),
    version         BIGINT          NOT NULL DEFAULT 0,
    is_deleted      TINYINT(1)      NOT NULL DEFAULT 0,
    deleted_at      DATETIME(6),
    deleted_by      VARCHAR(36),
    deleted_reason  VARCHAR(500),
    CONSTRAINT fk_sub_hospital FOREIGN KEY (hospital_id) REFERENCES hospital(id),
    CONSTRAINT fk_sub_plan FOREIGN KEY (plan_id) REFERENCES subscription_plan(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── USERS ────────────────────────────────────────────────────────────────────
CREATE TABLE app_user (
    id                  VARCHAR(36)     NOT NULL PRIMARY KEY,
    email               VARCHAR(255)    NOT NULL UNIQUE,
    phone               VARCHAR(15),
    password_hash       VARCHAR(255),
    first_name          VARCHAR(100),
    last_name           VARCHAR(100),
    avatar_url          VARCHAR(500),
    status              ENUM('INVITED','ACTIVE','LOCKED','DISABLED')
                                        NOT NULL DEFAULT 'INVITED',
    is_platform_user    TINYINT(1)      NOT NULL DEFAULT 0,
    mfa_enabled         TINYINT(1)      NOT NULL DEFAULT 0,
    force_password_change TINYINT(1)    NOT NULL DEFAULT 0,
    last_login_at       DATETIME(6),
    created_at          DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    created_by          VARCHAR(36),
    updated_at          DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    updated_by          VARCHAR(36),
    version             BIGINT          NOT NULL DEFAULT 0,
    is_deleted          TINYINT(1)      NOT NULL DEFAULT 0,
    deleted_at          DATETIME(6),
    deleted_by          VARCHAR(36),
    deleted_reason      VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_user_email ON app_user(email, is_deleted);
CREATE INDEX idx_user_platform ON app_user(is_platform_user, is_deleted);

-- ─── ROLES ────────────────────────────────────────────────────────────────────
CREATE TABLE role (
    id              VARCHAR(36)     NOT NULL PRIMARY KEY,
    code            VARCHAR(100)    NOT NULL UNIQUE,
    name            VARCHAR(150)    NOT NULL,
    description     VARCHAR(500),
    scope           ENUM('PLATFORM','HOSPITAL') NOT NULL DEFAULT 'HOSPITAL',
    is_system       TINYINT(1)      NOT NULL DEFAULT 0,
    hospital_id     VARCHAR(36),          -- NULL for system roles
    created_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    is_deleted      TINYINT(1)      NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── PERMISSIONS ─────────────────────────────────────────────────────────────
CREATE TABLE permission (
    id              VARCHAR(36)     NOT NULL PRIMARY KEY,
    code            VARCHAR(100)    NOT NULL UNIQUE,
    module          VARCHAR(100)    NOT NULL,
    action          VARCHAR(100)    NOT NULL,
    description     VARCHAR(300)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── ROLE PERMISSIONS ────────────────────────────────────────────────────────
CREATE TABLE role_permission (
    role_id         VARCHAR(36)     NOT NULL,
    permission_id   VARCHAR(36)     NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    CONSTRAINT fk_rp_role FOREIGN KEY (role_id) REFERENCES role(id),
    CONSTRAINT fk_rp_perm FOREIGN KEY (permission_id) REFERENCES permission(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── USER HOSPITAL ROLES ─────────────────────────────────────────────────────
CREATE TABLE user_hospital_role (
    id              VARCHAR(36)     NOT NULL PRIMARY KEY,
    user_id         VARCHAR(36)     NOT NULL,
    hospital_id     VARCHAR(36),          -- NULL for platform roles
    role_id         VARCHAR(36)     NOT NULL,
    assigned_at     DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    assigned_by     VARCHAR(36),
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    CONSTRAINT fk_uhr_user FOREIGN KEY (user_id) REFERENCES app_user(id),
    CONSTRAINT fk_uhr_role FOREIGN KEY (role_id) REFERENCES role(id),
    UNIQUE KEY uk_user_hospital_role (user_id, hospital_id, role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_uhr_hospital ON user_hospital_role(hospital_id, is_active);

-- ─── AUDIT LOG ────────────────────────────────────────────────────────────────
CREATE TABLE audit_log (
    id              BIGINT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    entity          VARCHAR(100)    NOT NULL,
    entity_id       VARCHAR(36),
    action          VARCHAR(50)     NOT NULL,
    old_json        TEXT,
    new_json        TEXT,
    user_id         VARCHAR(36),
    hospital_id     VARCHAR(36),
    ip              VARCHAR(45),
    user_agent      VARCHAR(500),
    created_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    prev_hash       VARCHAR(64),
    curr_hash       VARCHAR(64)     NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_audit_hospital ON audit_log(hospital_id);
CREATE INDEX idx_audit_entity ON audit_log(entity, entity_id);
CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_curr_hash ON audit_log(curr_hash);

-- ─── NUMBER SERIES ────────────────────────────────────────────────────────────
CREATE TABLE number_series (
    id              VARCHAR(36)     NOT NULL PRIMARY KEY,
    hospital_id     VARCHAR(36)     NOT NULL,
    series_key      VARCHAR(50)     NOT NULL,
    prefix          VARCHAR(20)     NOT NULL,
    next_value      BIGINT          NOT NULL DEFAULT 1,
    padding         INT             NOT NULL DEFAULT 6,
    reset_yearly    TINYINT(1)      NOT NULL DEFAULT 1,
    UNIQUE KEY uk_series (hospital_id, series_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── EMAIL VERIFICATION TOKENS ───────────────────────────────────────────────
CREATE TABLE email_verification_token (
    id              VARCHAR(36)     NOT NULL PRIMARY KEY,
    hospital_id     VARCHAR(36)     NOT NULL,
    email           VARCHAR(255)    NOT NULL,
    token_hash      VARCHAR(64)     NOT NULL UNIQUE,
    expires_at      DATETIME(6)     NOT NULL,
    verified_at     DATETIME(6),
    created_at      DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    CONSTRAINT fk_evt_hospital FOREIGN KEY (hospital_id) REFERENCES hospital(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
