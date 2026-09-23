-- ============================================================
-- Arogya HMS — V2 Seed Data
-- Platform roles, hospital roles, permissions, SUPER_ADMIN user
-- ============================================================

SET NAMES utf8mb4;

-- ─── SUBSCRIPTION PLANS ───────────────────────────────────────────────────────
INSERT INTO subscription_plan (id, name, code, max_users, max_beds, features_json, monthly_price, annual_price, is_active, sort_order) VALUES
('plan-starter-001', 'Starter', 'STARTER', 10, 30,
 '{"opd":true,"ipd":false,"lab":false,"pharmacy":false,"billing":true}',
 999.00, 9990.00, 1, 1),
('plan-growth-001', 'Growth', 'GROWTH', 50, 150,
 '{"opd":true,"ipd":true,"lab":true,"pharmacy":true,"billing":true,"radiology":false}',
 2999.00, 29990.00, 1, 2),
('plan-enterprise-001', 'Enterprise', 'ENTERPRISE', 500, 9999,
 '{"opd":true,"ipd":true,"lab":true,"pharmacy":true,"billing":true,"radiology":true,"mrd":true,"reports":true}',
 7999.00, 79990.00, 1, 3);

-- ─── PLATFORM ROLES ──────────────────────────────────────────────────────────
INSERT INTO role (id, code, name, description, scope, is_system) VALUES
('role-superadmin', 'SUPER_ADMIN', 'Super Admin',
 'Full platform access. Sees all hospitals, users, patients. Approves/rejects hospitals.', 'PLATFORM', 1),
('role-plat-support', 'PLATFORM_SUPPORT', 'Platform Support',
 'Read-only view of all hospitals for customer support.', 'PLATFORM', 1),
('role-plat-finance', 'PLATFORM_FINANCE', 'Platform Finance',
 'Manages subscriptions and billing across the platform.', 'PLATFORM', 1);

-- ─── HOSPITAL ROLES ──────────────────────────────────────────────────────────
INSERT INTO role (id, code, name, description, scope, is_system) VALUES
('role-hosp-admin',      'HOSPITAL_ADMIN',           'Hospital Admin',           'Full access within their hospital.',                                   'HOSPITAL', 1),
('role-doctor',          'DOCTOR',                   'Doctor',                   'OPD consultation, prescriptions, lab orders, discharge.',              'HOSPITAL', 1),
('role-sr-doctor',       'SENIOR_DOCTOR',            'Senior Doctor',            'All doctor permissions + approve procedures.',                         'HOSPITAL', 1),
('role-nurse',           'NURSE',                    'Nurse',                    'Vitals entry, nursing notes, care plan execution.',                    'HOSPITAL', 1),
('role-head-nurse',      'HEAD_NURSE',               'Head Nurse',               'All nurse permissions + ward management.',                             'HOSPITAL', 1),
('role-receptionist',    'RECEPTIONIST',             'Receptionist',             'Patient registration, OPD queue, appointment scheduling.',             'HOSPITAL', 1),
('role-billing-clerk',   'BILLING_CLERK',            'Billing Clerk',            'Create bills, record payments, generate receipts.',                    'HOSPITAL', 1),
('role-billing-mgr',     'BILLING_MANAGER',          'Billing Manager',          'All billing permissions + approve discounts and write-offs.',          'HOSPITAL', 1),
('role-pharmacist',      'PHARMACIST',               'Pharmacist',               'Dispense medicines against prescriptions.',                            'HOSPITAL', 1),
('role-lab-tech',        'LAB_TECHNICIAN',           'Lab Technician',           'Process lab orders, upload results.',                                  'HOSPITAL', 1),
('role-radiology-tech',  'RADIOLOGY_TECH',           'Radiology Technician',     'Process X-ray/imaging orders, upload reports.',                       'HOSPITAL', 1),
('role-mrd',             'MRD_CLERK',                'MRD Clerk',                'Medical records, discharge summary finalization, file management.',    'HOSPITAL', 1),
('role-ward-boy',        'WARD_BOY',                 'Ward Boy',                 'Assist with patient transport and basic ward tasks.',                  'HOSPITAL', 1),
('role-dietician',       'DIETICIAN',                'Dietician',                'Diet plans and nutritional records for patients.',                     'HOSPITAL', 1),
('role-physio',          'PHYSIOTHERAPIST',          'Physiotherapist',          'Physiotherapy session records and progress notes.',                    'HOSPITAL', 1),
('role-ot-coord',        'OT_COORDINATOR',           'OT Coordinator',           'Operation theatre scheduling and checklist management.',              'HOSPITAL', 1),
('role-blood-bank',      'BLOOD_BANK_TECH',          'Blood Bank Technician',    'Blood group, cross-match, issue and return records.',                  'HOSPITAL', 1),
('role-store-mgr',       'STORE_MANAGER',            'Store Manager',            'Inventory and consumable stock management.',                           'HOSPITAL', 1),
('role-it-admin',        'IT_ADMIN',                 'IT Admin',                 'Hospital-level user management and system configuration.',             'HOSPITAL', 1),
('role-report-viewer',   'REPORT_VIEWER',            'Report Viewer',            'View and export reports only.',                                        'HOSPITAL', 1),
('role-security',        'SECURITY',                 'Security',                 'Visitor management and entry/exit logs.',                              'HOSPITAL', 1),
('role-ambulance',       'AMBULANCE_COORDINATOR',    'Ambulance Coordinator',    'Ambulance dispatch, tracking, and handover records.',                  'HOSPITAL', 1),
('role-housekeeping',    'HOUSEKEEPING_SUPERVISOR',  'Housekeeping Supervisor',  'Cleaning schedule and ward hygiene management.',                       'HOSPITAL', 1);

-- ─── PERMISSIONS ─────────────────────────────────────────────────────────────
INSERT INTO permission (id, code, module, action, description) VALUES
-- Patient
('perm-pat-create',     'patient:create',       'PATIENT',      'CREATE',   'Register a new patient'),
('perm-pat-view',       'patient:view',         'PATIENT',      'VIEW',     'View patient details'),
('perm-pat-update',     'patient:update',       'PATIENT',      'UPDATE',   'Update patient demographics'),
('perm-pat-delete',     'patient:delete',       'PATIENT',      'DELETE',   'Soft-delete a patient record'),
-- OPD
('perm-opd-create',     'opd:create',           'OPD',          'CREATE',   'Create OPD visit / add to queue'),
('perm-opd-view',       'opd:view',             'OPD',          'VIEW',     'View OPD queue and visit details'),
('perm-opd-consult',    'opd:consult',          'OPD',          'CONSULT',  'Record consultation notes and diagnosis'),
-- IPD
('perm-ipd-admit',      'ipd:admit',            'IPD',          'ADMIT',    'Admit a patient to a ward/bed'),
('perm-ipd-view',       'ipd:view',             'IPD',          'VIEW',     'View IPD records'),
('perm-ipd-discharge',  'ipd:discharge',        'IPD',          'DISCHARGE','Discharge a patient'),
('perm-ipd-transfer',   'ipd:transfer',         'IPD',          'TRANSFER', 'Transfer between wards or beds'),
-- Billing
('perm-bill-create',    'billing:create',       'BILLING',      'CREATE',   'Create a bill or invoice'),
('perm-bill-view',      'billing:view',         'BILLING',      'VIEW',     'View bills and invoices'),
('perm-bill-approve',   'billing:approve',      'BILLING',      'APPROVE',  'Approve discounts and write-offs'),
('perm-bill-payment',   'billing:payment',      'BILLING',      'PAYMENT',  'Record payments and deposits'),
('perm-bill-refund',    'billing:refund',       'BILLING',      'REFUND',   'Issue refunds'),
-- Lab
('perm-lab-order',      'lab:order',            'LAB',          'ORDER',    'Order lab tests'),
('perm-lab-result',     'lab:result',           'LAB',          'RESULT',   'Upload and view lab results'),
-- Radiology
('perm-rad-order',      'radiology:order',      'RADIOLOGY',    'ORDER',    'Order X-ray or imaging'),
('perm-rad-report',     'radiology:report',     'RADIOLOGY',    'REPORT',   'Upload and view radiology reports'),
-- Pharmacy
('perm-pharm-prescribe','pharmacy:prescribe',   'PHARMACY',     'PRESCRIBE','Write prescriptions'),
('perm-pharm-dispense', 'pharmacy:dispense',    'PHARMACY',     'DISPENSE', 'Dispense medicines'),
('perm-pharm-stock',    'pharmacy:stock',       'PHARMACY',     'STOCK',    'Manage pharmacy inventory'),
-- Nursing
('perm-nurs-vitals',    'nursing:vitals',       'NURSING',      'VITALS',   'Record patient vitals'),
('perm-nurs-notes',     'nursing:notes',        'NURSING',      'NOTES',    'Write nursing notes'),
-- User management
('perm-user-invite',    'user:invite',          'USER',         'INVITE',   'Invite new users'),
('perm-user-manage',    'user:manage',          'USER',         'MANAGE',   'Activate/deactivate users'),
('perm-role-assign',    'role:assign',          'ROLE',         'ASSIGN',   'Assign roles to users'),
-- Reports
('perm-report-view',    'report:view',          'REPORT',       'VIEW',     'View reports and dashboards'),
('perm-report-export',  'report:export',        'REPORT',       'EXPORT',   'Export reports to PDF/Excel'),
-- Audit
('perm-audit-view',     'audit:view',           'AUDIT',        'VIEW',     'View audit logs'),
-- Hospital management
('perm-hosp-manage',    'hospital:manage',      'HOSPITAL',     'MANAGE',   'Manage hospital settings'),
('perm-hosp-approve',   'hospital:approve',     'HOSPITAL',     'APPROVE',  'Approve or reject hospital registrations (PLATFORM only)');

-- ─── ROLE PERMISSIONS — SUPER_ADMIN gets all perms ───────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-superadmin', id FROM permission;

-- ─── ROLE PERMISSIONS — HOSPITAL_ADMIN gets all hospital perms ───────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-hosp-admin', id FROM permission WHERE code != 'hospital:approve';

-- ─── ROLE PERMISSIONS — DOCTOR ───────────────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-doctor', id FROM permission
WHERE code IN ('patient:view','patient:update','opd:view','opd:consult','ipd:view','ipd:discharge',
               'lab:order','radiology:order','pharmacy:prescribe','nursing:vitals','report:view');

-- ─── ROLE PERMISSIONS — SENIOR DOCTOR ────────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-sr-doctor', id FROM permission
WHERE code IN ('patient:view','patient:update','opd:view','opd:consult','ipd:view','ipd:admit',
               'ipd:discharge','ipd:transfer','lab:order','lab:result','radiology:order',
               'radiology:report','pharmacy:prescribe','nursing:vitals','nursing:notes',
               'billing:view','report:view','report:export');

-- ─── ROLE PERMISSIONS — NURSE ────────────────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-nurse', id FROM permission
WHERE code IN ('patient:view','opd:view','ipd:view','nursing:vitals','nursing:notes',
               'lab:result','pharmacy:dispense');

-- ─── ROLE PERMISSIONS — RECEPTIONIST ─────────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-receptionist', id FROM permission
WHERE code IN ('patient:create','patient:view','patient:update','opd:create','opd:view',
               'billing:view','billing:payment');

-- ─── ROLE PERMISSIONS — BILLING CLERK ────────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-billing-clerk', id FROM permission
WHERE code IN ('patient:view','billing:create','billing:view','billing:payment','report:view');

-- ─── ROLE PERMISSIONS — BILLING MANAGER ──────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-billing-mgr', id FROM permission
WHERE code IN ('patient:view','billing:create','billing:view','billing:approve',
               'billing:payment','billing:refund','report:view','report:export');

-- ─── ROLE PERMISSIONS — PHARMACIST ───────────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-pharmacist', id FROM permission
WHERE code IN ('patient:view','pharmacy:dispense','pharmacy:stock','lab:result');

-- ─── ROLE PERMISSIONS — LAB TECH ─────────────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-lab-tech', id FROM permission
WHERE code IN ('patient:view','lab:order','lab:result');

-- ─── ROLE PERMISSIONS — RADIOLOGY TECH ───────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-radiology-tech', id FROM permission
WHERE code IN ('patient:view','radiology:order','radiology:report');

-- ─── ROLE PERMISSIONS — MRD CLERK ────────────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-mrd', id FROM permission
WHERE code IN ('patient:view','ipd:view','report:view','report:export','audit:view');

-- ─── ROLE PERMISSIONS — REPORT VIEWER ────────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-report-viewer', id FROM permission
WHERE code IN ('report:view','report:export');

-- ─── ROLE PERMISSIONS — IT ADMIN ─────────────────────────────────────────────
INSERT INTO role_permission (role_id, permission_id)
SELECT 'role-it-admin', id FROM permission
WHERE code IN ('user:invite','user:manage','role:assign','hospital:manage','audit:view',
               'report:view');

-- ─── SUPER_ADMIN USER ────────────────────────────────────────────────────────
-- Password: Arogya@2026! (BCrypt hash, cost 12)
-- MUST change password on first login (force_password_change = 1)
INSERT INTO app_user (id, email, first_name, last_name, password_hash, status, is_platform_user, force_password_change, created_at, updated_at, version)
VALUES (
    'user-superadmin-001',
    'superadmin@arogya.in',
    'Super',
    'Admin',
    '$2a$12$LjfD7HxTJGFKKxOl5JOLku4KJqxAHDPx4JlJBxGi8BO.XHNlsPpwq',
    'ACTIVE',
    1,
    1,
    NOW(6),
    NOW(6),
    0
);

-- Assign SUPER_ADMIN role to the seed user
INSERT INTO user_hospital_role (id, user_id, hospital_id, role_id, assigned_at, assigned_by, is_active)
VALUES ('uhr-superadmin-001', 'user-superadmin-001', NULL, 'role-superadmin', NOW(6), 'SYSTEM', 1);

-- Initial audit log genesis entry
INSERT INTO audit_log (entity, entity_id, action, new_json, user_id, hospital_id, created_at, prev_hash, curr_hash)
VALUES ('SYSTEM', 'GENESIS', 'SEEDED',
        '{"message":"Arogya HMS database initialized","version":"1.0.0"}',
        'user-superadmin-001', NULL, NOW(6),
        'GENESIS',
        SHA2(CONCAT('GENESIS', 'SYSTEM', 'GENESIS', 'SEEDED', NOW(6)), 256));
