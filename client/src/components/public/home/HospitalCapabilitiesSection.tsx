"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Mousewheel, Autoplay, Navigation } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  ChevronLeft,
  ChevronRight,
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
  const swiperRef = useRef<SwiperType | null>(null);
  const [, setActiveIndex] = useState(0);

  return (
    <section
      id="capabilities"
      className="w-full relative overflow-hidden bg-[#0c1017] border-t border-line dark:border-line-dark transition-colors"
    >
      {/* ─── Creative Showcase Slider: Full Edge-to-Edge & Vertically Expanded ─── */}
      <div className="w-full relative">
        <div className="creative-showcase--slider w-full">
          <div className="banner-horizental relative">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              speed={750}
              parallax={true}
              mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
              loop={true}
              pagination={{
                el: ".creative-showcase--slider .swiper-pagination",
                clickable: true,
              }}
              modules={[Parallax, Pagination, Mousewheel, Autoplay, Navigation]}
              className="w-full h-full"
            >
              {capabilities.map((cap) => {
                const Icon = cap.icon;

                return (
                  <SwiperSlide key={cap.id} className="swiper-slide">
                    {/* Full Horizontal & Vertical Background */}
                    <div
                      className="slide-bg"
                      style={{ backgroundImage: `url(${cap.image})` }}
                      data-swiper-parallax="-20%"
                    />
                    <div className="slide-container">
                      <div className="slide-row">
                        <div className="slider-content max-w-3xl">
                          {/* Category Badge & Index Pill with Parallax */}
                          <div
                            data-swiper-parallax="-350"
                            className="flex items-center gap-3 mb-4"
                          >
                            <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal-500/25 backdrop-blur-md border border-teal-400/40 text-teal-300 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20">
                              <Icon className="w-6 h-6" />
                            </span>
                            <span className="badge badge-teal text-xs py-1 px-3 uppercase tracking-wider font-semibold">
                              {cap.badge}
                            </span>
                            <span className="font-mono text-xs font-bold text-white/80 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                              {cap.num} / 08
                            </span>
                          </div>

                          {/* Heading with Parallax */}
                          <h2
                            data-swiper-parallax="-250"
                            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-3 drop-shadow-md"
                          >
                            {cap.title}
                          </h2>

                          {/* Tagline with Parallax */}
                          <h3
                            data-swiper-parallax="-180"
                            className="text-base sm:text-lg font-semibold text-teal-300 flex items-center gap-2 mb-4"
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse shrink-0" />
                            <span>{cap.tagline}</span>
                          </h3>

                          {/* Clinical Description with Parallax */}
                          <p
                            data-swiper-parallax="-120"
                            className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-2xl mb-6"
                          >
                            {cap.description}
                          </p>

                          {/* Key Capabilities Checklist Box with Parallax */}
                          <div
                            data-swiper-parallax="-60"
                            className="bg-slate-950/60 dark:bg-black/60 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 max-w-2xl mb-8 shadow-xl"
                          >
                            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-300/90 mb-3 flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                              <span>Key Capabilities Included</span>
                            </div>
                            <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5 text-xs sm:text-[13px] text-white/95">
                              {cap.features.map((feat) => (
                                <li key={feat} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                                  <span className="leading-snug">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Bottom Action Footer with Parallax */}
                          <div
                            data-swiper-parallax="0"
                            className="flex flex-wrap items-center gap-4"
                          >
                            <Link
                              href="/register-hospital"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs sm:text-sm font-semibold shadow-lg shadow-teal-500/25 transition-all hover:scale-105 group"
                            >
                              <span>Deploy for your hospital</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <span className="text-xs text-white/70 font-medium px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                              ABDM &amp; NABH Ready
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Direct Slider Navigation Arrows on Slider Edges */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous capability"
              className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-teal text-white/90 hover:text-white backdrop-blur-md border border-white/20 items-center justify-center transition-all shadow-xl hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next capability"
              className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-teal text-white/90 hover:text-white backdrop-blur-md border border-white/20 items-center justify-center transition-all shadow-xl hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Swiper Pagination Bullets */}
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
