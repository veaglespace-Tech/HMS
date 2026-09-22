"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const phases = [
  {
    phase: "Phase 1",
    label: "Foundation",
    color: "bg-primary text-white",
    modules: ["Hospital Onboarding", "Auth & RBAC", "Patient Registry", "OPD / Triage", "IPD / Admission", "Bed Management"],
  },
  {
    phase: "Phase 2",
    label: "Clinical",
    color: "bg-info text-white",
    modules: ["Lab Orders & Results", "Radiology / X-Ray", "Pharmacy", "Nursing Notes", "Vitals Monitoring", "MLC / Accident Cases"],
  },
  {
    phase: "Phase 3",
    label: "Revenue",
    color: "bg-accent text-white",
    modules: ["Billing & Invoicing", "Payments & Deposits", "Discharge Summary", "MRD & Records", "Insurance Tagging", "Daily Census Reports"],
  },
  {
    phase: "Phase 4",
    label: "Advanced",
    color: "bg-neutral text-white",
    modules: ["OT Management", "Blood Bank", "Dietetics", "Physiotherapy", "Ambulance", "Inventory & Store"],
  },
];

export function ModulesShowcaseSection() {
  return (
    <section className="py-24 bg-white dark:bg-card/20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            26 Modules Across 4 Phases
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            A complete hospital OS
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Start with Phase 1 and unlock more capabilities as your facility grows.
            All modules work together — no data silos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-border overflow-hidden hover:shadow-medium transition-all"
            >
              <div className={`px-5 py-4 ${phase.color}`}>
                <div className="text-xs font-semibold opacity-80 mb-0.5">{phase.phase}</div>
                <div className="text-lg font-bold">{phase.label}</div>
              </div>
              <div className="p-5 bg-canvas dark:bg-card">
                <ul className="flex flex-col gap-2">
                  {phase.modules.map((mod) => (
                    <li key={mod} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {mod}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/modules"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View all 26 modules <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
