# Arogya HMS

Multi-tenant Hospital Management SaaS for any healthcare facility — private clinic, polyclinic, nursing home, multispecialty hospital, trust hospital, diagnostic centre, day-care centre, and government facilities.

---

## Quick Start (Local Dev — No Docker)

### Prerequisites
- Java 21 (JDK)
- Node.js 20+
- MySQL 8.0 running locally
- Redis running locally (or skip and disable rate-limiting in dev)
- Maven 3.9+ OR use `./mvnw` in the `backend/` folder

### 1. Clone & configure

```bash
git clone <repo-url>
cd arogya-hms
cp .env.example .env
# Edit .env — set your MySQL password, etc.
```

### 2. Start Server (Backend)

```bash
cd server
# Copy .env values to your shell OR export them manually:
set SPRING_DATASOURCE_PASSWORD=Root   # (Windows)
export SPRING_DATASOURCE_PASSWORD=Root   # (Mac/Linux)

mvn spring-boot:run
```

Server starts at **http://localhost:8080**
API Docs: **http://localhost:8080/swagger-ui.html**

### 3. Start Client (Frontend)

```bash
cd client
npm install
npm run dev
```

Client starts at **http://localhost:3000**

---

## Quick Start (Docker — Recommended)

```bash
cp .env.example .env
docker compose up --build
```

| Service | URL |
|---|---|
| Client | http://localhost:3000 |
| Server API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| MinIO Console | http://localhost:9001 |

---

## Default SUPER_ADMIN Credentials

> [!IMPORTANT]
> Change the password immediately after first login. You will be forced to do so.

| Field | Value |
|---|---|
| Email | `superadmin@arogya.in` |
| Temporary Password | `Arogya@2026!` |
| Role | SUPER_ADMIN (Platform level — sees all hospitals) |

---

## Architecture Overview

### Server — Spring Boot 3.3 (Java 21)

```
server/
├── pom.xml
└── src/
    ├── main/
    │   ├── java/in/arogya/
    │   │   ├── app/                 # Spring Boot entry point
    │   │   ├── common/              # Shared foundation (tenant isolation, audit hash chaining, JWT, storage)
    │   │   └── onboarding/          # Hospital self-registration & subscription plans
    │   └── resources/
    │       ├── application.yml
    │       └── db/migration/        # Flyway V1 schema & V2 seed data
    └── test/
```

**Key principles:**
- Single consolidated `src/` tree with clean package isolation
- Shared MySQL DB with `hospital_id` discriminator on every tenant table
- Row-level tenant isolation via `TenantFilter` (JWT → TenantContext → Hibernate @Filter)
- SUPER_ADMIN bypasses tenant filter with an audited platform scope
- No hard deletes — soft delete with `deleted_at / deleted_by / reason`
- Append-only audit log with SHA-256 hash chaining
- Optimistic locking (`@Version`) on all hot entities

### Client — Next.js 14 App Router + Redux Toolkit (RTK)

```
client/src/
├── app/          # Pages & layouts (public marketing & onboarding wizard)
├── components/   # UI & step components
├── redux/        # Redux Toolkit store, typed hooks, slices & RTK Query
│   ├── store.ts
│   ├── hooks.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── tenantSlice.ts
│   │   └── registrationSlice.ts
│   └── services/
│       └── arogyaApi.ts
```

---

## Roles

### Platform Roles
| Role | Description |
|---|---|
| SUPER_ADMIN | Full access to all hospitals, users, patients across the platform |
| PLATFORM_SUPPORT | Read-only view of all hospitals for support |
| PLATFORM_FINANCE | Subscription and billing management |

### Hospital Roles (26 total)
HOSPITAL_ADMIN, DOCTOR, SENIOR_DOCTOR, NURSE, HEAD_NURSE, RECEPTIONIST, BILLING_CLERK, BILLING_MANAGER, PHARMACIST, LAB_TECHNICIAN, RADIOLOGY_TECH, MRD_CLERK, WARD_BOY, DIETICIAN, PHYSIOTHERAPIST, OT_COORDINATOR, BLOOD_BANK_TECH, STORE_MANAGER, IT_ADMIN, REPORT_VIEWER, SECURITY, AMBULANCE_COORDINATOR, HOUSEKEEPING_SUPERVISOR

---

## Public API Endpoints (Step 1)

```
POST   /api/v1/public/hospital-registrations           Register a new hospital
POST   /api/v1/public/hospital-registrations/{id}/verify-email   Trigger email OTP
POST   /api/v1/public/hospital-registrations/{id}/verify-otp     Confirm OTP
GET    /api/v1/public/subscription-plans               List all plans
GET    /api/v1/public/hospital-registrations/check-slug?slug=   Check slug availability
```

---

## Running Tests

```bash
# Server
cd server
mvn test

# Client
cd client
npm run lint
npm run typecheck
```

---

## Environment Variables

See [.env.example](.env.example) for all variables with descriptions.
