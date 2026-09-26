"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  FileKey,
  BadgeCheck,
  CheckCircle2,
  Database,
  Building,
  KeyRound,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/shared/TiltCard";

const compliancePillars = [
  {
    icon: ShieldCheck,
    title: "ABDM Milestone M1, M2 & M3 Ready",
    badge: "Government of India",
    badgeColor: "badge-teal",
    description:
      "Fully compliant with National Health Authority (NHA) protocols. Enables rapid ABHA number generation, verification, and longitudinal health records exchange.",
    points: [
      "14-digit ABHA creation via Aadhaar & Mobile OTP",
      "Health Facility Registry (HFR) integration",
      "Healthcare Professional Registry (HPR) linking",
      "Consent-driven health record push & pull via PHR app",
    ],
  },
  {
    icon: BadgeCheck,
    title: "NABH Digital Quality Architecture",
    badge: "Quality Accreditation",
    badgeColor: "badge-coral",
    description:
      "Pre-configured clinical workflows designed to fulfill National Accreditation Board for Hospitals (NABH) digital record-keeping and audit guidelines.",
    points: [
      "Mandatory clinical quality indicators tracking",
      "Standardized discharge summaries & clinical notes",
      "Informed digital consent capture with timestamps",
      "Adverse drug reaction (ADR) and incident reporting",
    ],
  },
  {
    icon: FileKey,
    title: "Tamper-Evident SHA-256 Audit Trail",
    badge: "Forensic Integrity",
    badgeColor: "badge-amber",
    description:
      "Every clinical diagnosis, prescription edit, bill adjustment, and bed movement is recorded in an append-only cryptographic hash chain.",
    points: [
      "Immutable SHA-256 hash chaining on all actions",
      "Zero hard deletes — complete forensic compliance",
      "IP address, user ID, and timestamp recorded per event",
      "One-click audit trail export for legal and regulatory review",
    ],
  },
  {
    icon: Lock,
    title: "Data Sovereignty & 26 RBAC Scopes",
    badge: "Enterprise Security",
    badgeColor: "badge-teal",
    description:
      "Enterprise multi-tenant architecture with strict row-level hospital data isolation, encryption at rest, and granular role permissions.",
    points: [
      "Tenant separation with automated Hibernate filters",
      "AES-256 encryption at rest, TLS 1.3 in transit",
      "26 granular role scopes (Doctor, Nurse, Pharmacist, Admin)",
      "Automated daily encrypted offsite backups",
    ],
  },
];

export function AbdmComplianceSection() {
  return (
    <section id="compliance" className="py-20 sm:py-28 bg-white/70 dark:bg-white/[0.02] border-t border-line dark:border-line-dark">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="badge badge-coral">
            ● Regulatory Compliance &amp; Standards
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mt-4 text-foreground">
            Engineered for Indian government &amp; accreditation standards.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft dark:text-cream-soft leading-relaxed">
            Arogya HMS adheres to the highest national healthcare mandates — including
            the Ayushman Bharat Digital Mission (ABDM), NABH digital benchmarks, and strict data privacy regulations.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {compliancePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <TiltCard key={pillar.title} maxTilt={5} className="h-full">
                <article className="h-full p-7 sm:p-8 rounded-2xl bg-white dark:bg-card border border-border shadow-soft hover:shadow-medium hover:border-teal/40 dark:hover:border-teal/40 transition-all duration-300 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-xl bg-teal/10 dark:bg-teal/20 text-teal dark:text-teal-bright flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className={`badge ${pillar.badgeColor} text-[11px]`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-ink-soft dark:text-cream-soft mt-3 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-line/60 dark:border-line-dark/60 flex-1">
                    <ul className="space-y-2.5">
                      {pillar.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                          <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </TiltCard>
            );
          })}
        </div>

        {/* Government Standards Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-teal/10 via-teal/5 to-transparent border border-teal/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-xl bg-teal text-white flex items-center justify-center shrink-0 shadow-sm">
              <Building className="w-6 h-6" />
            </span>
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground">
                Qualify for ABDM Digital Health Incentives (DHIS)
              </h4>
              <p className="text-xs sm:text-sm text-ink-soft dark:text-cream-soft mt-0.5">
                Eligible hospitals and diagnostic centers can claim government financial incentives under NHA guidelines using Arogya HMS.
              </p>
            </div>
          </div>

          <Link
            href="/register-hospital"
            className="btn btn-primary whitespace-nowrap shrink-0"
          >
            Start ABDM Registration
          </Link>
        </div>
      </div>
    </section>
  );
}
