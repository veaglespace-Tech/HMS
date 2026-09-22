import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "26 Modules — Arogya HMS",
  description: "All 26 hospital management modules across 4 phases. From OPD to MRD, billing to blood bank.",
};

const phases = [
  {
    phase: "Phase 1", title: "Foundation", status: "available", color: "bg-primary",
    modules: [
      { name: "Hospital Onboarding",  desc: "Self-registration, multi-branch, subscription management" },
      { name: "Auth & RBAC",          desc: "26 roles, granular permissions, MFA, audit trail" },
      { name: "Patient Registry",     desc: "UHID, demographics, ABHA optional, history" },
      { name: "OPD Management",       desc: "Queue, vitals, consultation, ICD-10, referral" },
      { name: "IPD / Admission",      desc: "Admit, ward/bed, deposit, census" },
      { name: "Bed Management",       desc: "Real-time availability, category, transfer" },
    ],
  },
  {
    phase: "Phase 2", title: "Clinical", status: "available", color: "bg-info",
    modules: [
      { name: "Lab Management",      desc: "Orders, catalogue, results, report upload" },
      { name: "Radiology",           desc: "X-ray, CT, MRI orders, DICOM-compatible reports" },
      { name: "Pharmacy",            desc: "Prescription dispensing, stock, expiry, billing" },
      { name: "Nursing",             desc: "Vitals charting, nursing notes, care plan" },
      { name: "Vitals Monitoring",   desc: "Continuous charting with trend graphs" },
      { name: "MLC / Accident",      desc: "FIR number, police station, medico-legal workflow" },
    ],
  },
  {
    phase: "Phase 3", title: "Revenue Cycle", status: "coming-soon", color: "bg-accent",
    modules: [
      { name: "Billing & Invoices", desc: "Itemized, GST-compliant, discount workflow" },
      { name: "Payments",           desc: "Cash, UPI, card, advance, deposit" },
      { name: "Discharge & Summary",desc: "Digital discharge summary, instructions" },
      { name: "MRD",                desc: "Records archive, access control, digitization" },
      { name: "Insurance / TPA",    desc: "Claim tagging, pre-auth, settlement tracking" },
      { name: "Reports & Analytics",desc: "Census, revenue, department, custom exports" },
    ],
  },
  {
    phase: "Phase 4", title: "Advanced", status: "coming-soon", color: "bg-neutral",
    modules: [
      { name: "OT Management",       desc: "Scheduling, checklist, anesthesia notes" },
      { name: "Blood Bank",          desc: "Group, cross-match, issue, return, camp" },
      { name: "Dietetics",           desc: "Diet plans, nutritional tracking, kitchen orders" },
      { name: "Physiotherapy",       desc: "Session notes, progress, exercise plans" },
      { name: "Ambulance",           desc: "Dispatch, GPS tracking, handover records" },
      { name: "Inventory & Store",   desc: "Consumables, PPE, indents, vendors" },
      { name: "Housekeeping",        desc: "Cleaning schedule, ward hygiene, task management" },
      { name: "Security & Visitors", desc: "Visitor log, entry/exit, badge" },
    ],
  },
];

const statusLabel: Record<string, string> = {
  available:    "Available",
  "coming-soon": "Coming Soon",
};
const statusStyle: Record<string, string> = {
  available:    "bg-success/10 text-success border-success/20",
  "coming-soon": "bg-muted text-muted-foreground border-border",
};

export default function ModulesPage() {
  return (
    <div className="py-20">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Modules</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">26 Modules. One System.</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Unlock modules by phase as your hospital grows. All data is shared across modules — no silos.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {phases.map((phase) => (
            <div key={phase.phase}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`px-4 py-2 rounded-lg ${phase.color} text-white font-bold text-sm`}>
                  {phase.phase}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{phase.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyle[phase.status]}`}>
                  {statusLabel[phase.status]}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {phase.modules.map((mod) => (
                  <div key={mod.name} className="p-5 rounded-xl bg-white dark:bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all">
                    <h3 className="font-semibold text-foreground mb-1">{mod.name}</h3>
                    <p className="text-sm text-muted-foreground">{mod.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
