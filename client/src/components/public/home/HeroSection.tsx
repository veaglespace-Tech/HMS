"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Building2, Users, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

const stats = [
  { value: "120+", label: "Hospitals & Clinics" },
  { value: "48K+", label: "Patients / mo" },
  { value: "99.9%", label: "Platform Uptime" },
];

const marqueeItems = [
  "OPD / IPD Management",
  "NABH & ABDM Ready",
  "Live ICU & Bed Tracking",
  "Multi-Specialty Billing",
  "Pharmacy & Inventory",
  "Lab & RIS/PACS Reports",
  "E-Prescriptions",
  "26 RBAC Staff Roles",
];

export function HeroSection() {
  return (
    <section id="landing" className="relative overflow-hidden pt-6 sm:pt-10">
      {/* Background hero image with overlay */}
      <div className="hero-bg" aria-hidden="true">
        <img
          src="/assets/hero-banner.jpg"
          alt="Healthcare staff and patient"
          className="hero-img"
        />
        <div className="hero-overlay" />
      </div>

      {/* Floating 3D Shapes */}
      <div className="shape shape-cross" data-depth="0.6" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="currentColor" className="w-full h-full">
          <rect x="22" y="6" width="16" height="48" rx="6" />
          <rect x="6" y="22" width="48" height="16" rx="6" />
        </svg>
      </div>
      <div className="shape shape-ring" data-depth="1.1" aria-hidden="true" />
      <div className="shape shape-pill" data-depth="0.9" aria-hidden="true" />
      <div className="shape shape-dot" data-depth="1.4" aria-hidden="true" />

      {/* Hero content container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="badge badge-teal">
              ● Trusted by 120+ Healthcare Facilities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight mt-5 text-foreground"
          >
            Care that feels{" "}
            <em className="text-teal dark:text-teal-bright not-italic font-display italic">
              human
            </em>
            ,<br className="hidden sm:block" />
            managed like{" "}
            <span className="text-coral">clockwork</span>.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-ink-soft dark:text-cream-soft leading-relaxed"
          >
            Arogya HMS brings OPD, IPD, NABH compliance, billing, ICU beds and
            lab reports into one calm, beautiful dashboard — so your staff spends
            time with patients, not paperwork.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <MagneticButton strength={14}>
              <Link
                href="/register-hospital"
                className="btn btn-primary btn-lg"
              >
                Register Your Hospital
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={12}>
              <a href="#cards" className="btn btn-outline btn-lg">
                Explore UI Kit & Showcase
              </a>
            </MagneticButton>
          </motion.div>

          {/* Live Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-md pt-6 border-t border-line dark:border-line-dark"
          >
            {stats.map((st) => (
              <div key={st.label} className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-semibold text-teal dark:text-teal-bright">
                  {st.value}
                </span>
                <span className="text-xs text-ink-soft dark:text-cream-soft mt-0.5">
                  {st.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Continuous Marquee Strip */}
      <div className="marquee border-y border-line dark:border-line-dark bg-white/60 dark:bg-white/5 backdrop-blur-sm">
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
