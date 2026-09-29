"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  ChevronDown,
  Sparkles,
} from "lucide-react";

interface CapabilityItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  badgeColor: string;
  image: string;
  accent: string;
  description: string;
  features: string[];
}

const capabilities: CapabilityItem[] = [
  {
    id: "opd",
    num: "01",
    title: "OPD Care & Token Queue",
    tagline: "Reduce outpatient waiting times by over 40%",
    icon: Users,
    badge: "Clinical Care",
    badgeColor: "badge-teal",
    image: "/assets/reception-lobby.jpg",
    accent: "from-teal-950/95 via-slate-950/90 to-slate-950/60",
    description:
      "Automated patient token allocation, digital waiting hall queue screens, fast UHID generation, and comprehensive outpatient triage vitals recording.",
    features: [
      "Token queue display & multi-counter calling system",
      "Auto UHID allocation & ABHA verification",
      "Triage vitals recording (BP, SpO2, Pulse, Temp, BMI)",
      "Daily doctor OPD consultation schedule",
    ],
  },
  {
    id: "ipd",
    num: "02",
    title: "IPD Wards & Live Bed Tracking",
    tagline: "Live visual bed matrix across all wards",
    icon: Bed,
    badge: "Inpatient Care",
    badgeColor: "badge-amber",
    image: "/assets/patient-care.jpg",
    accent: "from-sky-950/95 via-slate-950/90 to-slate-950/60",
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
    num: "03",
    title: "Electronic Health Records (EHR)",
    tagline: "Fast doctor consultation desk with E-Rx",
    icon: FileText,
    badge: "Clinical Care",
    badgeColor: "badge-teal",
    image: "/assets/medical-team.jpg",
    accent: "from-emerald-950/95 via-slate-950/90 to-slate-950/60",
    description:
      "Purpose-built for clinicians: ICD-10 coded diagnosis lookup, one-click electronic prescriptions with drug-to-drug allergy cross-checks, and historical timeline.",
    features: [
      "Structured clinical notes & chief complaints",
      "ICD-10 disease coding & standardized diagnosis",
      "Smart E-Prescriptions with formulary brand lookup",
      "ABDM compliant patient health summary sync",
    ],
  },
  {
    id: "pharmacy",
    num: "04",
    title: "Central Pharmacy & Formulary POS",
    tagline: "Zero stock leakage and automated re-ordering",
    icon: Pill,
    badge: "Supply Chain & POS",
    badgeColor: "badge-coral",
    image: "/assets/doctor-female.jpg",
    accent: "from-rose-950/95 via-slate-950/90 to-slate-950/60",
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
    num: "05",
    title: "Diagnostic Pathology (LIS)",
    tagline: "Barcoded samples to verified digital reports",
    icon: Microscope,
    badge: "Diagnostics",
    badgeColor: "badge-teal",
    image: "/assets/hero-banner.jpg",
    accent: "from-indigo-950/95 via-slate-950/90 to-slate-950/60",
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
    num: "06",
    title: "Radiology Information System (RIS)",
    tagline: "Seamless DICOM viewing & diagnostic reporting",
    icon: Scan,
    badge: "Diagnostics",
    badgeColor: "badge-teal",
    image: "/assets/patient-care.jpg",
    accent: "from-cyan-950/95 via-slate-950/90 to-slate-950/60",
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
    num: "07",
    title: "Billing, Cashier & Insurance (TPA)",
    tagline: "Consolidated invoicing with zero revenue leakage",
    icon: Receipt,
    badge: "Finance & Accounts",
    badgeColor: "badge-amber",
    image: "/assets/reception-lobby.jpg",
    accent: "from-amber-950/95 via-slate-950/90 to-slate-950/60",
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
    num: "08",
    title: "Emergency & Ambulance Fleet",
    tagline: "24/7 Red-triage admission & fleet tracking",
    icon: Ambulance,
    badge: "Emergency Services",
    badgeColor: "badge-coral",
    image: "/assets/hero-banner.jpg",
    accent: "from-red-950/95 via-slate-950/90 to-slate-950/60",
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

export function HospitalCapabilitiesSection() {
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState<string>("opd");

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "Clinical Care", label: "Clinical Care" },
    { id: "Diagnostics", label: "Diagnostics & Labs" },
    { id: "Supply Chain & POS", label: "Pharmacy & Billing" },
    { id: "Emergency Services", label: "Emergency & Fleet" },
  ];

  const filteredCapabilities =
    filter === "all"
      ? capabilities
      : capabilities.filter((c) =>
          filter === "Supply Chain & POS"
            ? c.badge === "Supply Chain & POS" || c.badge === "Finance & Accounts"
            : c.badge === filter || (filter === "Clinical Care" && c.badge === "Inpatient Care")
        );

  // If the active card isn't in the current filter, reset to first filtered item
  const currentActive =
    filteredCapabilities.find((c) => c.id === activeId) || filteredCapabilities[0];

  const handleFilterChange = (categoryId: string) => {
    setFilter(categoryId);
    const newFiltered =
      categoryId === "all"
        ? capabilities
        : capabilities.filter((c) =>
            categoryId === "Supply Chain & POS"
              ? c.badge === "Supply Chain & POS" || c.badge === "Finance & Accounts"
              : c.badge === categoryId ||
                (categoryId === "Clinical Care" && c.badge === "Inpatient Care")
          );
    if (newFiltered.length > 0) {
      setActiveId(newFiltered[0].id);
    }
  };

  return (
    <section
      id="capabilities"
      className="py-20 sm:py-28 bg-white/50 dark:bg-white/[0.02] border-t border-line dark:border-line-dark relative overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="badge badge-teal">
            <Sparkles className="w-3.5 h-3.5 text-teal" />
            Hospital Operating Capabilities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mt-4 text-foreground">
            Unified hospital operations &amp; clinical workflows.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft dark:text-cream-soft leading-relaxed">
            Every clinical department, nursing station, diagnostic lab, and cashier counter
            connected in real time. Hover or click across the cards below to explore each capability.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-7">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  filter === cat.id
                    ? "bg-teal text-white shadow-sm ring-2 ring-teal/30"
                    : "bg-white dark:bg-card border border-border text-ink-soft dark:text-cream-soft hover:text-foreground hover:border-teal/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Desktop & Tablet Expanding Horizontal Accordion Deck ─── */}
        <div className="hidden md:flex flex-row items-stretch gap-2.5 lg:gap-3.5 h-[560px] w-full transition-all duration-500 ease-out select-none">
          {filteredCapabilities.map((cap) => {
            const Icon = cap.icon;
            const isActive = currentActive?.id === cap.id;

            return (
              <div
                key={cap.id}
                onMouseEnter={() => setActiveId(cap.id)}
                onClick={() => setActiveId(cap.id)}
                className={`relative overflow-hidden rounded-[26px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive
                    ? "flex-[3.8] lg:flex-[4.2] min-w-[360px] lg:min-w-[460px] shadow-2xl ring-2 ring-teal/50 dark:ring-teal/60 cursor-default"
                    : "flex-[0.75] lg:flex-[0.85] min-w-[68px] lg:min-w-[80px] max-w-[105px] opacity-80 hover:opacity-100 cursor-pointer border border-border/70 dark:border-white/10 hover:border-teal/40"
                }`}
              >
                {/* Background Photographic Image */}
                <Image
                  src={cap.image}
                  alt={cap.title}
                  fill
                  priority={isActive}
                  className={`object-cover transition-all duration-700 ease-out ${
                    isActive
                      ? "scale-105 filter-none brightness-90 saturate-110"
                      : "scale-100 filter grayscale-[40%] brightness-[0.35] group-hover:brightness-[0.5]"
                  }`}
                />

                {/* Deep Cinematic Gradient Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t ${cap.accent} ${
                    isActive ? "opacity-95" : "opacity-90 bg-slate-950/85"
                  }`}
                />

                {/* ─── EXPANDED CARD CONTENT ─── */}
                {isActive ? (
                  <div className="relative z-10 p-6 lg:p-8 flex flex-col justify-between h-full animate-fadeIn">
                    {/* Top Bar: Icon, Badge, Capability Number */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="w-12 h-12 rounded-2xl bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-teal-300 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20">
                            <Icon className="w-6 h-6" />
                          </span>
                          <span className={`badge ${cap.badgeColor} text-[11px]`}>
                            {cap.badge}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-white/70 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          {cap.num} / 08
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-teal-300 mt-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                        {cap.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed mt-3 max-w-xl">
                        {cap.description}
                      </p>
                    </div>

                    {/* Middle: Feature Checklist Box */}
                    <div className="bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-4 my-auto">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-teal-300/90 mb-2.5">
                        Key Capabilities Included
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-2 text-xs text-white/95">
                        {cap.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-2 flex items-center justify-between border-t border-white/15">
                      <Link
                        href="/register-hospital"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-semibold shadow-md transition-all group"
                      >
                        <span>Deploy for your hospital</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <span className="text-[11px] text-white/60 font-medium hidden sm:inline">
                        ABDM &amp; NABH Ready
                      </span>
                    </div>
                  </div>
                ) : (
                  /* ─── COLLAPSED CARD CONTENT (Vertical Orientation) ─── */
                  <div className="relative z-10 py-6 px-2 flex flex-col items-center justify-between h-full select-none">
                    {/* Top: Number & Icon */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white/60 tracking-wider">
                        {cap.num}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-teal-300 shadow-sm transition-transform duration-300 hover:scale-110">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Center: Vertical Rotated Title */}
                    <div className="my-auto py-2 flex items-center justify-center">
                      <span className="accordion-vertical-text font-display font-semibold text-sm lg:text-base text-white/80 hover:text-white tracking-wide whitespace-nowrap transition-colors">
                        {cap.title}
                      </span>
                    </div>

                    {/* Bottom: Subtle Expand Arrow Icon */}
                    <div className="w-7 h-7 rounded-full bg-white/10 hover:bg-teal hover:text-white text-white/60 flex items-center justify-center text-xs transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ─── Mobile Accordion (< md / screens under 768px) ─── */}
        <div className="flex md:hidden flex-col gap-3">
          {filteredCapabilities.map((cap) => {
            const Icon = cap.icon;
            const isOpen = currentActive?.id === cap.id;

            return (
              <div
                key={cap.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-teal/50 bg-card shadow-lg ring-1 ring-teal/30"
                    : "border-border bg-white dark:bg-card"
                }`}
              >
                {/* Mobile Header Button */}
                <button
                  onClick={() => setActiveId(isOpen ? "" : cap.id)}
                  className="w-full p-4 flex items-center justify-between text-left gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-teal/10 dark:bg-teal/20 text-teal dark:text-teal-bright flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-teal font-bold">
                          {cap.num}
                        </span>
                        <h3 className="font-display text-base font-semibold text-foreground">
                          {cap.title}
                        </h3>
                      </div>
                      <p className="text-xs text-ink-soft dark:text-cream-soft mt-0.5">
                        {cap.tagline}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-ink-soft transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-teal" : ""
                    }`}
                  />
                </button>

                {/* Mobile Expanded Drawer */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-border/50 text-xs text-foreground/90 space-y-3 animate-fadeIn">
                    <p className="text-ink-soft dark:text-cream-soft leading-relaxed">
                      {cap.description}
                    </p>
                    <div className="bg-muted/40 dark:bg-white/[0.03] rounded-xl p-3 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-teal">
                        Features Included
                      </div>
                      {cap.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2">
                      <Link
                        href="/register-hospital"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal dark:text-teal-bright hover:underline"
                      >
                        <span>Deploy for your hospital</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
