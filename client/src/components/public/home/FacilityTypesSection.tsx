"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Stethoscope,
  HeartPulse,
  FlaskConical,
  Sun,
  Hospital,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface FacilityType {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  tag: string;
  desc: string;
  highlights: string[];
  image: string;
  badgeColor: string;
}

const facilityTypes: FacilityType[] = [
  {
    num: "01",
    icon: Stethoscope,
    label: "Private Clinic",
    sub: "Solo or Group Practice",
    tag: "1 - 5 Consulting Rooms",
    desc: "Purpose-built for independent doctors: automated OPD token calling, fast UHID generation, and rapid E-prescriptions.",
    highlights: [
      "OPD Token Queue & Hall Displays",
      "Fast E-Rx with Formulary Lookup",
      "Instant Billing & UPI QR Receipts",
    ],
    image: "/assets/reception-lobby.jpg",
    badgeColor: "badge-teal",
  },
  {
    num: "02",
    icon: Building2,
    label: "Polyclinic",
    sub: "Multi-Specialty OPD",
    tag: "5 - 15 Specialist Doctors",
    desc: "Multi-consultant appointment roster scheduling, shared diagnostic sample collection, and central pharmacy integration.",
    highlights: [
      "Multi-Specialty Roster Matrix",
      "Shared Diagnostic Sample Desk",
      "Central Pharmacy POS Dispense",
    ],
    image: "/assets/medical-team.jpg",
    badgeColor: "badge-amber",
  },
  {
    num: "03",
    icon: HeartPulse,
    label: "Nursing Home",
    sub: "Inpatient & Ward Care",
    tag: "10 - 50 Inpatient Beds",
    desc: "Real-time visual bed matrix, nurse station vital charts, doctor round notes, and one-click discharge clearance checklist.",
    highlights: [
      "Real-Time Ward & Bed Matrix",
      "Nurse Station MAR Vital Charts",
      "Consolidated IPD Discharge Billing",
    ],
    image: "/assets/patient-care.jpg",
    badgeColor: "badge-teal",
  },
  {
    num: "04",
    icon: Hospital,
    label: "Multispecialty Hospital",
    sub: "Tertiary Healthcare Center",
    tag: "50 - 500+ Beds",
    desc: "28 clinical departments, 24/7 ICU telemetry, OT slot scheduling, NABH compliance audit trails, and multi-tenant security.",
    highlights: [
      "28 Clinical Department Workflows",
      "ICU Telemetry & OT Slot Matrix",
      "NABH & ABDM M1-M3 Certified",
    ],
    image: "/assets/hero-banner.jpg",
    badgeColor: "badge-coral",
  },
  {
    num: "05",
    icon: FlaskConical,
    label: "Diagnostic Centre",
    sub: "Pathology & Radiology",
    tag: "LIS & RIS Hub",
    desc: "Barcoded sample accessioning, bidirectional analyzer interfacing, zero-footprint web DICOM viewer, and automated report dispatch.",
    highlights: [
      "Bidirectional Lab Analyzer Sync",
      "Web DICOM Viewer for X-Ray/CT",
      "Automated WhatsApp & SMS Reports",
    ],
    image: "/assets/doctor-female.jpg",
    badgeColor: "badge-teal",
  },
  {
    num: "06",
    icon: Sun,
    label: "Day Care Centre",
    sub: "Same-Day Surgical Unit",
    tag: "Short-Stay & Minor OT",
    desc: "Rapid day-care admission, pre-op clearance checks, hourly recovery bed billing, and fast-track discharge protocols.",
    highlights: [
      "Fast-Track Day-Care Admission",
      "Hourly Recovery Bed Allocation",
      "Same-Day Discharge Summary",
    ],
    image: "/assets/reception-lobby.jpg",
    badgeColor: "badge-amber",
  },
];

export function FacilityTypesSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Update active slide indicator based on scroll position
  const handleScroll = useCallback(() => {
    if (!viewportRef.current) return;
    const { scrollLeft, clientWidth } = viewportRef.current;
    const slideWidth = clientWidth * 0.35;
    const index = Math.round(scrollLeft / (slideWidth || 1));
    setActiveIndex(Math.min(Math.max(index, 0), facilityTypes.length - 1));
  }, []);

  const scrollToSlide = (index: number) => {
    if (!viewportRef.current) return;
    const slides = viewportRef.current.children;
    if (slides[index]) {
      (slides[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const nextIndex = Math.max(0, activeIndex - 1);
    scrollToSlide(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(facilityTypes.length - 1, activeIndex + 1);
    scrollToSlide(nextIndex);
  };

  // Mouse Drag-to-Scroll support
  const onMouseDown = (e: React.MouseEvent) => {
    if (!viewportRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - viewportRef.current.offsetLeft);
    setScrollLeft(viewportRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !viewportRef.current) return;
    e.preventDefault();
    const x = e.pageX - viewportRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    viewportRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    vp.addEventListener("scroll", handleScroll, { passive: true });
    return () => vp.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      id="facilities"
      style={
        {
          "--carousel-bg": "#fafaf8",
          "--carousel-bg-dark": "#0c1017",
        } as React.CSSProperties
      }
      className="py-20 sm:py-28 bg-[#fafaf8] dark:bg-[#0c1017] border-b border-line dark:border-line-dark relative overflow-hidden transition-colors"
    >
      <div className="section-container">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <span className="badge badge-teal mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal" />
              Facility Compatibility
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              One platform, engineered for any facility type.
            </h2>
            <p className="mt-3 text-base text-ink-soft dark:text-cream-soft leading-relaxed">
              Whether you run a 2-doctor clinic, a diagnostic hub, or a 500-bed multispecialty hospital —
              Arogya HMS scales seamlessly to match your bed capacity, departments, and clinical protocols.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2.5 self-start md:self-end shrink-0">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous facility"
              className="w-11 h-11 rounded-full bg-white dark:bg-card border border-border shadow-soft flex items-center justify-center text-foreground hover:bg-teal hover:text-white dark:hover:bg-teal dark:hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === facilityTypes.length - 1}
              aria-label="Next facility"
              className="w-11 h-11 rounded-full bg-white dark:bg-card border border-border shadow-soft flex items-center justify-center text-foreground hover:bg-teal hover:text-white dark:hover:bg-teal dark:hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Modern Facility Carousel ─── */}
      <div
        className="cylinder-carousel"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <div
          ref={viewportRef}
          className="cylinder-viewport max-w-7xl mx-auto"
        >
          {facilityTypes.map((type, i) => {
            const Icon = type.icon;
            const isCenter = activeIndex === i;

            return (
              <div key={type.label} className="cylinder-slide px-2.5 sm:px-3">
                <div
                  className={`h-[510px] rounded-[24px] overflow-hidden relative border transition-all duration-400 flex flex-col justify-between p-4 sm:p-5 bg-white dark:bg-card shadow-soft group select-none ${
                    isCenter
                      ? "border-teal/50 shadow-2xl ring-2 ring-teal/30 scale-[1.01]"
                      : "border-border/80 dark:border-white/10 hover:border-teal/40 hover:shadow-medium"
                  }`}
                >
                  <div>
                    {/* Visual Banner Header with Photographic Backdrop */}
                    <div className="relative h-36 sm:h-40 w-full rounded-2xl overflow-hidden mb-3.5 border border-border/40 dark:border-white/10 shadow-sm shrink-0 bg-slate-900">
                      <Image
                        src={type.image}
                        alt={type.label}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      />
                      {/* Gradient Vignette over Banner */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-black/20" />

                      {/* Floating Badges inside Banner */}
                      <div className="absolute inset-0 p-3 flex flex-col justify-between z-10">
                        <div className="flex items-center justify-between">
                          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-md">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
                            {type.tag}
                          </span>
                        </div>

                        <div>
                          <span className="font-mono text-[10px] font-bold text-teal-300 uppercase tracking-wider block">
                            {type.num} · {type.sub}
                          </span>
                          <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                            {type.label}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-ink-soft dark:text-cream-soft leading-relaxed line-clamp-2 px-0.5">
                      {type.desc}
                    </p>

                    {/* Pre-Configured Setup Features Box */}
                    <div className="bg-muted/40 dark:bg-white/[0.03] border border-border/60 dark:border-white/10 rounded-xl p-3 mt-3 space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-teal dark:text-teal-bright">
                        Pre-Configured Setup
                      </div>
                      {type.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-foreground/90 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3 border-t border-border/60 dark:border-white/10 flex items-center justify-between shrink-0">
                    <Link
                      href="/register-hospital"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal dark:text-teal-bright hover:underline group/link"
                    >
                      <span>Configure this setup</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                    <span className="font-mono text-[11px] text-ink-soft dark:text-cream-soft">
                      {type.num} / 06
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Pagination Dots Indicator ─── */}
      <div className="section-container mt-6">
        <div className="flex items-center justify-center gap-2">
          {facilityTypes.map((type, i) => (
            <button
              key={type.label}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to ${type.label}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-8 bg-teal"
                  : "w-2 bg-border hover:bg-ink-soft/40 dark:hover:bg-cream-soft/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
