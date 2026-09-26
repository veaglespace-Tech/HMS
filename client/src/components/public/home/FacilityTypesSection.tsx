"use client";

import { motion } from "framer-motion";
import { Building2, Stethoscope, HeartPulse, FlaskConical, Sun, Hospital } from "lucide-react";
import { TiltCard } from "@/components/shared/TiltCard";

const facilityTypes = [
  { icon: Stethoscope, label: "Private Clinic", desc: "Solo or group practice with OPD queues" },
  { icon: Building2, label: "Polyclinic", desc: "Multi-specialty outpatient consulting" },
  { icon: HeartPulse, label: "Nursing Home", desc: "IPD + OPD with ward & bed management" },
  { icon: Hospital, label: "Multispecialty", desc: "Full-scale hospital with 26 departments" },
  { icon: FlaskConical, label: "Diagnostic Centre", desc: "Pathology and radiology reporting" },
  { icon: Sun, label: "Day Care Centre", desc: "Short-stay procedures & same-day discharges" },
];

export function FacilityTypesSection() {
  return (
    <section id="facilities" className="py-20 bg-cream/50 dark:bg-ink/50 border-b border-line dark:border-line-dark">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="badge badge-teal mb-3">Facility Compatibility</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-2">
            One platform, any facility type
          </h2>
          <p className="mt-3 text-ink-soft dark:text-cream-soft max-w-xl mx-auto text-sm">
            Whether you run a 2-doctor clinic or a 500-bed hospital, Arogya HMS
            scales effortlessly to match your capacity and workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facilityTypes.map((type, i) => (
            <TiltCard
              key={type.label}
              maxTilt={8}
              scale={1.03}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-teal/10 dark:bg-teal/20 flex items-center justify-center mb-3 text-teal dark:text-teal-bright transition-transform duration-300 group-hover:scale-110">
                <type.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-xs sm:text-sm text-foreground mb-1">
                {type.label}
              </h3>
              <p className="text-[11px] text-ink-soft dark:text-cream-soft leading-snug">
                {type.desc}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
