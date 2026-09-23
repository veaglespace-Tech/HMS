"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, HelpCircle, Shield, Zap, Sparkles, Building2, ChevronDown } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number; // monthly equivalent when paid annually
  users: string;
  beds: string;
  highlighted?: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter Clinic",
    description: "Designed for solo clinics, polyclinics, and small outpatient centres.",
    monthlyPrice: 999,
    annualPrice: 799,
    users: "Up to 10 staff",
    beds: "Up to 30 beds",
    features: [
      "OPD Patient Registration & Queue",
      "Digital Vitals & Prescriptions",
      "Quick OPD Billing & Invoicing",
      "WhatsApp & SMS Appointment Alerts",
      "Basic Patient Medical History",
      "Standard Daily Cash/Collection Reports",
      "Single Facility Location",
      "Email & Community Support",
    ],
  },
  {
    id: "growth",
    name: "Growth Hospital",
    badge: "MOST POPULAR",
    description: "Ideal for nursing homes, medium hospitals, and growing healthcare facilities.",
    monthlyPrice: 2999,
    annualPrice: 2399,
    users: "Up to 50 staff",
    beds: "Up to 150 beds",
    highlighted: true,
    features: [
      "Everything in Starter, plus:",
      "Complete IPD & Bed Management",
      "Emergency & Casualty Triage Entry",
      "Doctor & Nurse Clinical Charts",
      "In-House Pharmacy Inventory & POS",
      "Lab Orders, Tests & Report Generation",
      "Advance Deposit & Discharge Billing",
      "Multi-Role Access Control (23 Roles)",
      "Audit Trail with Tamper Detection",
      "Priority WhatsApp & Phone Support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Multi-Specialty",
    description: "Full suite for large hospitals, medical institutes, and hospital chains.",
    monthlyPrice: 7999,
    annualPrice: 6399,
    users: "Unlimited staff",
    beds: "Unlimited beds",
    features: [
      "Everything in Growth, plus:",
      "Radiology & DICOM / PACS Integration",
      "Operation Theatre (OT) Scheduling",
      "Blood Bank & Component Inventory",
      "Dietary, Physiotherapy & Dialysis",
      "MRD (Medical Record Department) Archive",
      "Centralized Multi-Branch Dashboard",
      "Custom Government / Ayushman Scheme Mapping",
      "Full API Access & Custom Integrations",
      "Dedicated Account Manager (24/7 SLA)",
    ],
  },
];

const COMPARISON_ROWS = [
  { category: "Capacity & Scale", items: [
    { name: "Staff Users", starter: "10 users", growth: "50 users", enterprise: "Unlimited" },
    { name: "Inpatient Bed Capacity", starter: "30 beds", growth: "150 beds", enterprise: "Unlimited" },
    { name: "Multi-branch Management", starter: false, growth: false, enterprise: true },
    { name: "Data Storage (MinIO)", starter: "10 GB", growth: "100 GB", enterprise: "Unlimited" },
  ]},
  { category: "Clinical Modules", items: [
    { name: "OPD Registration & Token Queue", starter: true, growth: true, enterprise: true },
    { name: "Doctor Clinical Desk & E-Rx", starter: true, growth: true, enterprise: true },
    { name: "IPD Admission, Ward & Bed Grid", starter: false, growth: true, enterprise: true },
    { name: "Emergency / Accident Triage Entry", starter: false, growth: true, enterprise: true },
    { name: "Nursing Vitals & Medication Charting", starter: false, growth: true, enterprise: true },
    { name: "OT Scheduling & Pre-Op Notes", starter: false, growth: false, enterprise: true },
    { name: "Discharge Summary Builder", starter: "Basic", growth: "Full", enterprise: "Custom Templates" },
  ]},
  { category: "Diagnostics & Pharmacy", items: [
    { name: "In-house Pharmacy Billing & Stock", starter: false, growth: true, enterprise: true },
    { name: "Batch Expiry & Reorder Alerts", starter: false, growth: true, enterprise: true },
    { name: "Pathology Lab Order & Reports", starter: false, growth: true, enterprise: true },
    { name: "Radiology / X-Ray / CT Reports", starter: false, growth: false, enterprise: true },
    { name: "Blood Bank Management", starter: false, growth: false, enterprise: true },
  ]},
  { category: "Billing & Finance", items: [
    { name: "Itemized Billing & GST Receipts", starter: true, growth: true, enterprise: true },
    { name: "Advance Deposit Handling", starter: false, growth: true, enterprise: true },
    { name: "Corporate / TPA / Insurance Tracking", starter: false, growth: true, enterprise: true },
    { name: "Doctor Revenue Share Accounting", starter: false, growth: true, enterprise: true },
  ]},
  { category: "Security & Governance", items: [
    { name: "Cryptographic SHA-256 Audit Chain", starter: true, growth: true, enterprise: true },
    { name: "Role-Based Access Control (23 Roles)", starter: "Basic (3 roles)", growth: true, enterprise: true },
    { name: "Daily Automated Encrypted Backup", starter: true, growth: true, enterprise: true },
    { name: "Dedicated Account SLA", starter: false, growth: false, enterprise: "1-hour SLA" },
  ]},
];

const FAQS = [
  {
    q: "Is there any setup fee or hardware required?",
    a: "None. Arogya HMS is 100% cloud-based. You can start with any existing computer, tablet, or mobile phone with a standard web browser and internet connection.",
  },
  {
    q: "How does the 30-day free trial work?",
    a: "Every newly registered hospital receives 30 days of full access to all features on their chosen plan. No credit card is required to register. You only pay after your trial concludes.",
  },
  {
    q: "Can I upgrade or downgrade my plan later?",
    a: "Yes. You can switch plans seamlessly at any time from your Hospital Admin Billing settings. Any prorated amount will be calculated automatically.",
  },
  {
    q: "Is our patient health data secure and isolated?",
    a: "Absolutely. Every hospital has strict logical tenant isolation enforced at the database level with Hibernate tenant filters. All critical medical events are appended to a SHA-256 tamper-evident hash-chain audit log.",
  },
  {
    q: "Are government schemes or insurance mandatory?",
    a: "Not at all. Scheme fields (like ABHA, Ayushman Bharat, RGJAY, or private TPA) are completely optional and only appear if the patient presents those documents.",
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-canvas dark:bg-background min-h-screen py-16">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Transparent Healthcare Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Zero Hidden Fees. Predictable Pricing for Every Facility.
          </h1>
          <p className="text-lg text-muted-foreground">
            From single-doctor clinics to 500-bed multi-specialty hospitals. All plans include 30-day free trial, full onboarding support, and regular updates.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white dark:bg-card border border-border p-1.5 rounded-2xl shadow-subtle">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                !isAnnual
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                isAnnual
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`relative flex flex-col rounded-3xl p-8 border ${
                  plan.highlighted
                    ? "border-primary bg-primary text-white shadow-strong ring-4 ring-primary/10"
                    : "border-border bg-white dark:bg-card text-foreground shadow-subtle"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className={`text-2xl font-bold ${plan.highlighted ? "text-white" : "text-foreground"}`}>
                      {plan.name}
                    </h3>
                  </div>
                  <p className={`text-sm min-h-[40px] ${plan.highlighted ? "text-white/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? "text-white/70" : "text-muted-foreground"}`}>
                    /month {isAnnual && "(billed annually)"}
                  </span>
                </div>

                <div className={`flex items-center gap-4 py-3 px-4 rounded-xl mb-6 text-xs font-semibold ${
                  plan.highlighted ? "bg-white/10 text-white" : "bg-canvas dark:bg-muted text-foreground"
                }`}>
                  <div>{plan.users}</div>
                  <span className="opacity-40">•</span>
                  <div>{plan.beds}</div>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? "text-white" : "text-primary"
                      }`} />
                      <span className={plan.highlighted ? "text-white/90" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/register-hospital?plan=${plan.id}`}
                  className={`inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all text-center ${
                    plan.highlighted
                      ? "bg-white text-primary hover:bg-white/95 shadow-md"
                      : "bg-primary text-white hover:bg-primary-600 shadow-sm"
                  }`}
                >
                  Start 30-Day Free Trial
                </Link>
                <p className={`text-center text-xs mt-3 ${plan.highlighted ? "text-white/60" : "text-muted-foreground"}`}>
                  No credit card required
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Detailed Feature Comparison
            </h2>
            <p className="text-muted-foreground text-sm">
              See exact module availability and limits across all tiers.
            </p>
          </div>

          <div className="bg-white dark:bg-card rounded-2xl border border-border overflow-hidden shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-canvas/60 dark:bg-muted/40">
                    <th className="p-4 md:p-5 font-semibold text-foreground w-2/5">Feature / Capability</th>
                    <th className="p-4 md:p-5 font-semibold text-foreground text-center w-1/5">Starter</th>
                    <th className="p-4 md:p-5 font-semibold text-primary text-center w-1/5">Growth</th>
                    <th className="p-4 md:p-5 font-semibold text-foreground text-center w-1/5">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((group, gIdx) => (
                    <>
                      <tr key={`group-${gIdx}`} className="bg-muted/30 border-t border-b border-border">
                        <td colSpan={4} className="p-3 px-5 font-bold text-xs uppercase tracking-wider text-muted-foreground">
                          {group.category}
                        </td>
                      </tr>
                      {group.items.map((row, rIdx) => (
                        <tr key={`row-${gIdx}-${rIdx}`} className="border-b border-border/50 hover:bg-canvas/50 dark:hover:bg-muted/20 transition-colors">
                          <td className="p-4 md:px-5 font-medium text-foreground">{row.name}</td>
                          <td className="p-4 text-center">
                            {typeof row.starter === "boolean" ? (
                              row.starter ? (
                                <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                              ) : (
                                <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                              )
                            ) : (
                              <span className="text-muted-foreground font-medium text-xs md:text-sm">{row.starter}</span>
                            )}
                          </td>
                          <td className="p-4 text-center bg-primary/5 dark:bg-primary/10">
                            {typeof row.growth === "boolean" ? (
                              row.growth ? (
                                <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                              ) : (
                                <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                              )
                            ) : (
                              <span className="text-primary font-bold text-xs md:text-sm">{row.growth}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof row.enterprise === "boolean" ? (
                              row.enterprise ? (
                                <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                              ) : (
                                <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                              )
                            ) : (
                              <span className="text-foreground font-semibold text-xs md:text-sm">{row.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm">
              Everything you need to know about pricing, billing, and onboarding.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-card border border-border rounded-xl overflow-hidden shadow-subtle transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border/40 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-primary-900 via-primary to-primary-700 text-white p-8 md:p-12 text-center relative overflow-hidden shadow-strong">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Need custom terms for a large hospital network or trust?
            </h3>
            <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base mb-6">
              We offer dedicated deployments, custom EHR integrations, legacy data migration, and on-site staff training.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-all"
              >
                Talk to Enterprise Sales
              </Link>
              <Link
                href="/register-hospital"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
              >
                Register Online
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
