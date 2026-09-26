"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Bed,
  FileText,
  Pill,
  Microscope,
  Scan,
  Receipt,
  Ambulance,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/shared/TiltCard";

const modules = [
  {
    id: "opd",
    title: "OPD & Token Management",
    tagline: "Cut outpatient waiting times by over 40%",
    icon: Users,
    badge: "Clinical Care",
    badgeColor: "badge-teal",
    description:
      "Automated patient token allocation, digital waiting room queue displays, fast UHID generation, and comprehensive outpatient triage vitals recording.",
    features: [
      "Token queue display & multi-counter call system",
      "Auto UHID allocation & ABHA verification",
      "Triage vitals (BP, SpO2, Pulse, Temp, BMI)",
      "Daily doctor OPD appointment schedule",
    ],
  },
  {
    id: "ipd",
    title: "IPD, Wards & Bed Tracking",
    tagline: "Live visual bed matrix across all wards",
    icon: Bed,
    badge: "Inpatient Operations",
    badgeColor: "badge-amber",
    description:
      "Interactive ward visualization covering ICU, CCU, NICU, General, and Private rooms with instant admissions, bed transfers, and nurse handover charts.",
    features: [
      "Real-time bed occupancy & housekeeping status",
      "Nurse station vital charting & medication schedules",
      "Doctor round notes & clinical observation log",
      "One-click discharge summary with clearance checklist",
    ],
  },
  {
    id: "ehr",
    title: "Electronic Health Records (EHR)",
    tagline: "Fast doctor consultation desk with E-Rx",
    icon: FileText,
    badge: "Clinical Care",
    badgeColor: "badge-teal",
    description:
      "Purpose-built for busy doctors: ICD-10 coded diagnosis search, one-click electronic prescriptions with drug-to-drug allergy cross-checks, and historical timeline.",
    features: [
      "Structured clinical notes & chief complaints",
      "ICD-10 disease coding & standardized diagnosis",
      "Smart E-Prescriptions with formulary brand lookup",
      "ABDM compliant patient health summary sync",
    ],
  },
  {
    id: "pharmacy",
    title: "Pharmacy & Central Formulary",
    tagline: "Zero stock leakage and automated re-ordering",
    icon: Pill,
    badge: "Supply Chain & POS",
    badgeColor: "badge-coral",
    description:
      "Integrated pharmacy POS billing counter, batch-level inventory management with near-expiry alerts, automated minimum stock replenishment, and GST Schedule H compliance.",
    features: [
      "Barcode scanning for rapid prescription dispensing",
      "Batch & expiry date tracking with early warnings",
      "Automated supplier purchase orders & GRN receipt",
      "GST Schedule H/H1 prescription sales register",
    ],
  },
  {
    id: "lab",
    title: "Diagnostic Pathology (LIS)",
    tagline: "Barcoded samples to verified digital reports",
    icon: Microscope,
    badge: "Diagnostics",
    badgeColor: "badge-teal",
    description:
      "End-to-end laboratory automation: test master catalogs with age/gender reference ranges, barcoded sample accessioning, bidirectional analyzer sync, and digital sign-off.",
    features: [
      "Biochemistry, Hematology, Microbiology catalogs",
      "Barcoded sample tracking & accessioning",
      "Pathologist digital verification & electronic signature",
      "Automated SMS & WhatsApp PDF report delivery",
    ],
  },
  {
    id: "radiology",
    title: "Radiology Information System (RIS)",
    tagline: "Seamless DICOM viewing & diagnostic reporting",
    icon: Scan,
    badge: "Diagnostics",
    badgeColor: "badge-teal",
    description:
      "Order management for X-Ray, CT, MRI, and Ultrasound with integrated zero-footprint web DICOM viewer, structured radiologist templates, and tele-radiology support.",
    features: [
      "Modality worklist integration (MWL / DICOM)",
      "Zero-footprint high-performance web viewer",
      "Standardized radiologist reporting templates",
      "Prior imaging study comparison timeline",
    ],
  },
  {
    id: "billing",
    title: "Billing, Cashier & Insurance (TPA)",
    tagline: "Consolidated invoicing with zero revenue leakage",
    icon: Receipt,
    badge: "Finance & Accounts",
    badgeColor: "badge-amber",
    description:
      "Unified billing engine combining OPD consultations, IPD bed charges, pharmacy bills, and lab tests into clean, GST-compliant invoices with cashless insurance tracking.",
    features: [
      "Consolidated patient folio & discharge billing",
      "Cashless insurance & TPA pre-auth claim tracking",
      "Multi-mode receipts (Cash, UPI, Cards, Bank NEFT)",
      "Automated tariff packages and doctor commission split",
    ],
  },
  {
    id: "emergency",
    title: "Emergency & Ambulance Fleet",
    tagline: "24/7 Red-triage admission & fleet tracking",
    icon: Ambulance,
    badge: "Emergency Services",
    badgeColor: "badge-coral",
    description:
      "Rapid emergency room intake bypassing standard queues, GPS-tracked ambulance vehicle dispatch, paramedic en-route telemetry transmission, and MLC documentation.",
    features: [
      "Fast-track red triage admission protocol",
      "Real-time GPS ambulance fleet tracking & driver logs",
      "En-route vitals transmitted directly to ER trauma desk",
      "Medico-Legal Case (MLC) register & legal compliance",
    ],
  },
];

export function ClinicalModulesSection() {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "All 8 Modules" },
    { id: "Clinical Care", label: "Clinical Care" },
    { id: "Diagnostics", label: "Diagnostics & Labs" },
    { id: "Supply Chain & POS", label: "Pharmacy & Billing" },
    { id: "Emergency Services", label: "Emergency & Fleet" },
  ];

  const filteredModules =
    filter === "all"
      ? modules
      : modules.filter((m) =>
          filter === "Supply Chain & POS"
            ? m.badge === "Supply Chain & POS" || m.badge === "Finance & Accounts"
            : m.badge === filter || (filter === "Clinical Care" && m.badge === "Inpatient Operations")
        );

  return (
    <section id="modules" className="py-20 sm:py-28 bg-white/50 dark:bg-white/[0.02] border-t border-line dark:border-line-dark">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="badge badge-teal">
            ● Enterprise Hospital Operating Suite
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mt-4 text-foreground">
            Complete clinical &amp; administrative modules.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft dark:text-cream-soft leading-relaxed">
            Every clinical department, administrative desk, and support service
            connected in real time. Eliminate silos and paperwork across your entire facility.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  filter === cat.id
                    ? "bg-teal text-white shadow-sm"
                    : "bg-white dark:bg-card border border-border text-ink-soft dark:text-cream-soft hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredModules.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <TiltCard key={mod.id} maxTilt={6} className="h-full">
                <article className="h-full flex flex-col p-6 rounded-2xl bg-white dark:bg-card border border-border hover:border-teal/40 dark:hover:border-teal/40 shadow-soft hover:shadow-medium transition-all duration-300">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-xl bg-teal/10 dark:bg-teal/20 text-teal dark:text-teal-bright flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className={`badge ${mod.badgeColor} text-[11px]`}>
                      {mod.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display text-xl font-semibold text-foreground tracking-tight">
                    {mod.title}
                  </h3>
                  <p className="text-xs font-medium text-teal dark:text-teal-bright mt-1">
                    {mod.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-ink-soft dark:text-cream-soft mt-3 leading-relaxed">
                    {mod.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="mt-5 pt-5 border-t border-line/60 dark:border-line-dark/60 flex-1">
                    <ul className="space-y-2">
                      {mod.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs text-foreground/85">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Module Footer Link */}
                  <div className="mt-6 pt-3">
                    <Link
                      href="/register-hospital"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal dark:text-teal-bright hover:underline group"
                    >
                      <span>Deploy for your hospital</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
