"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Activity,
  Bed,
  CheckCircle2,
  Sparkles,
  FileCheck2,
} from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

const stats = [
  { value: "120+", label: "Hospitals & Facilities" },
  { value: "48,000+", label: "Monthly Patients" },
  { value: "99.98%", label: "Uptime SLA" },
  { value: "26", label: "Staff Role Scopes" },
];

const marqueeItems = [
  "ABDM Milestone M1, M2, M3 Ready",
  "NABH Digital Quality Compliance",
  "Outpatient (OPD) & Token Queue",
  "Inpatient (IPD) & Bed Tracking",
  "Electronic Health Records (EHR & E-Rx)",
  "Centralized Pharmacy & Formulary POS",
  "Diagnostic Laboratory & LIS Interfacing",
  "Radiology & DICOM PACS Integration",
  "GST & Cashless TPA Insurance Billing",
  "24/7 Ambulance Fleet Dispatch",
];

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* National Healthcare Standards Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal/10 dark:bg-teal/20 border border-teal/25 text-teal dark:text-teal-bright text-xs font-semibold tracking-wide"
            >
              <ShieldCheck className="w-4 h-4 text-teal dark:text-teal-bright" />
              <span>Ayushman Bharat ABDM Ready • NABH Digital Architecture</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight mt-5 text-foreground"
            >
              The unified operating system for{" "}
              <span className="text-teal dark:text-teal-bright font-display italic">
                modern healthcare
              </span>
              .
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-ink-soft dark:text-cream-soft leading-relaxed max-w-2xl"
            >
              Arogya HMS powers paperless clinical workflows, real-time bed telemetry,
              central pharmacy POS, pathology LIS, and GST billing — purpose-built for
              clinics, nursing homes, and multispecialty hospitals across India.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <MagneticButton strength={12}>
                <Link
                  href="/register-hospital"
                  className="btn btn-primary btn-lg shadow-sm hover:shadow-glow group"
                >
                  <span>Register Your Hospital</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>

              <MagneticButton strength={10}>
                <a
                  href="#modules"
                  className="btn btn-outline btn-lg"
                >
                  Explore Clinical Modules
                </a>
              </MagneticButton>

              <Link
                href="/login"
                className="btn btn-ghost btn-lg text-xs sm:text-sm font-medium"
              >
                Staff Portal Sign In
              </Link>
            </motion.div>

            {/* Key Clinical & Facility Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full pt-8 border-t border-line dark:border-line-dark"
            >
              {stats.map((st) => (
                <div key={st.label} className="flex flex-col">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-teal dark:text-teal-bright">
                    {st.value}
                  </span>
                  <span className="text-xs font-medium text-ink-soft dark:text-cream-soft mt-1">
                    {st.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Crystal Clear Hero Banner Visual with Live Clinical Overlays */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Crisp Framed Showcase Card */}
            <div className="relative rounded-3xl overflow-hidden border border-line dark:border-line-dark bg-white dark:bg-card shadow-2xl">
              {/* High-Definition Hero Banner Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src="/assets/hero-banner.jpg"
                  alt="Doctor with patient in modern hospital corridor"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold tracking-wide uppercase opacity-90">
                    City Care Multispecialty Facility
                  </p>
                  <p className="font-display text-base sm:text-lg font-medium">
                    Integrated Clinical Ward & Patient Care
                  </p>
                </div>
              </div>

              {/* Live Telemetry Summary Cards */}
              <div className="p-4 sm:p-5 bg-white dark:bg-card border-t border-line dark:border-line-dark flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/60 border border-line dark:border-line-dark">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-teal/10 dark:bg-teal/20 text-teal dark:text-teal-bright flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-foreground">OPD Patient Queue</p>
                      <p className="text-[11px] text-ink-soft dark:text-cream-soft">Token #A-142 · Cardiology Desk</p>
                    </div>
                  </div>
                  <span className="badge badge-teal text-[11px]">Serving Now</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/60 border border-line dark:border-line-dark">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber/15 text-amber-dark dark:text-amber flex items-center justify-center shrink-0">
                      <Bed className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Ward & ICU Capacity</p>
                      <p className="text-[11px] text-ink-soft dark:text-cream-soft">78% Occupied · 14 Beds Available</p>
                    </div>
                  </div>
                  <span className="badge badge-amber text-[11px]">Real-Time</span>
                </div>

                <div className="flex items-center justify-between pt-2 px-1 text-xs text-ink-soft dark:text-cream-soft">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal" />
                    ABHA M1/M2/M3 Synced
                  </span>
                  <span className="text-[11px] text-teal dark:text-teal-bright font-semibold">
                    100% Paperless Audit Trail
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Endless Continuous Clinical Marquee */}
      <div className="marquee border-y border-line dark:border-line-dark bg-white/70 dark:bg-white/5 backdrop-blur-sm mt-12 sm:mt-16">
        <div className="marquee-track">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <span key={idx} className="inline-flex items-center">
              <span>{item}</span>
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
