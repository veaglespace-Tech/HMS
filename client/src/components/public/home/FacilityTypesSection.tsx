"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
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
  Sparkles,
} from "lucide-react";

interface FacilityType {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  desc: string;
  highlight: string;
  image: string;
}

const facilityTypes: FacilityType[] = [
  {
    num: "01",
    icon: Stethoscope,
    label: "Private Clinic",
    sub: "Solo & Group Practice",
    desc: "Solo or group practice with OPD queues, fast UHID generation, and rapid E-prescriptions.",
    highlight: "OPD Token Queue & Fast E-Rx",
    image: "/assets/facilities/clinic.jpg",
  },
  {
    num: "02",
    icon: Building2,
    label: "Polyclinic",
    sub: "Multi-Specialty OPD",
    desc: "Multi-consultant appointment roster scheduling, shared diagnostic sample desk, and central pharmacy.",
    highlight: "Specialist Roster Matrix",
    image: "/assets/facilities/polyclinic.jpg",
  },
  {
    num: "03",
    icon: HeartPulse,
    label: "Nursing Home",
    sub: "Inpatient Ward Care",
    desc: "IPD + OPD with ward & bed management, nurse station MAR charts, and discharge summaries.",
    highlight: "Live Ward & Bed Matrix",
    image: "/assets/facilities/nursing-home.jpg",
  },
  {
    num: "04",
    icon: Hospital,
    label: "Multispecialty Hospital",
    sub: "Full-Scale Tertiary Facility",
    desc: "Full-scale hospital with 28 departments, 24/7 ICU telemetry, and OT slot scheduling.",
    highlight: "28 Clinical Departments",
    image: "/assets/facilities/multispecialty.jpg",
  },
  {
    num: "05",
    icon: FlaskConical,
    label: "Diagnostic Centre",
    sub: "Pathology & Radiology",
    desc: "Pathology and radiology reporting, bidirectional analyzer sync, and automated report dispatch.",
    highlight: "Automated Analyzer Sync",
    image: "/assets/facilities/diagnostic.jpg",
  },
  {
    num: "06",
    icon: Sun,
    label: "Day Care Centre",
    sub: "Same-Day Surgical Unit",
    desc: "Short-stay procedures & same-day discharges, hourly recovery bed billing, and fast discharge.",
    highlight: "Fast-Track Day-Care",
    image: "/assets/facilities/daycare.jpg",
  },
];

export function FacilityTypesSection() {
  const viewportRef = useRef<HTMLOListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = useCallback(() => {
    if (!viewportRef.current) return;
    const { scrollLeft, clientWidth } = viewportRef.current;
    const slideWidth = clientWidth * 0.33;
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

      {/* ─── 3D Cylinder Curved Carousel (Exact Code Specification) ─── */}
      <section
        className="carousel-cylinder"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <ol
          ref={viewportRef}
          className="carousel-viewport"
          tabIndex={1}
        >
          {facilityTypes.map((type, i) => {
            const Icon = type.icon;
            const isCenter = activeIndex === i;

            return (
              <li key={type.label} className="carousel-slide">
                <div
                  className={`carousel-snapper transition-all duration-400 ${
                    isCenter ? "ring-2 ring-teal/50 scale-[1.02]" : "opacity-95"
                  }`}
                >
                  {/* Dedicated Distinct Photographic Background */}
                  <Image
                    src={type.image}
                    alt={type.label}
                    fill
                    className="object-cover"
                  />

                  {/* Dark Frosted Glass Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-slate-900/50" />

                  {/* Centered Safe Content */}
                  <div className="relative z-10 p-6 flex flex-col items-center justify-center text-center h-full">
                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-2xl bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-teal-300 flex items-center justify-center mb-3 shadow-lg shadow-teal-500/10">
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Number & Subtitle */}
                    <span className="text-[11px] font-mono font-bold text-teal-300 uppercase tracking-widest mb-1.5">
                      {type.num} · {type.sub}
                    </span>

                    {/* Facility Title */}
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                      {type.label}
                    </h3>

                    {/* Clean Description */}
                    <p className="text-xs sm:text-[13px] text-slate-200/90 leading-relaxed mt-2.5 max-w-[260px] mx-auto">
                      {type.desc}
                    </p>

                    {/* Key Capability Tag Pill */}
                    <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] text-teal-200 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                      <span>{type.highlight}</span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

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
