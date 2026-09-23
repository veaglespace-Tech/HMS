"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "01",
    label: "Registration",
    desc: "Patient walks in. Receptionist registers them (or they self-register via kiosk). UHID generated.",
    color: "bg-primary",
  },
  {
    step: "02",
    label: "Triage & OPD",
    desc: "Vitals recorded. Doctor assigned. Consultation notes and ICD-10 diagnosis entered.",
    color: "bg-info",
  },
  {
    step: "03",
    label: "Lab & Radiology",
    desc: "Doctor orders tests. Lab tech uploads results. Radiology uploads X-ray reports.",
    color: "bg-accent",
  },
  {
    step: "04",
    label: "Prescription",
    desc: "Doctor writes digital prescription. Pharmacist dispenses against it. Stock updated.",
    color: "bg-warning",
  },
  {
    step: "05",
    label: "Admission & Ward",
    desc: "Patient admitted to a bed. Deposit collected. Daily charges tracked automatically.",
    color: "bg-primary",
  },
  {
    step: "06",
    label: "Discharge & Bill",
    desc: "Final bill generated. Payment collected. Discharge summary printed. MRD archived.",
    color: "bg-success",
  },
];

export function PatientJourneySection() {
  return (
    <section className="py-24 bg-canvas dark:bg-background overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            End-to-End Patient Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Every step, captured digitally
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From the moment a patient walks in to the moment they are discharged —
            every data point is recorded, searchable, and audited.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-border" style={{ top: "2rem" }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div className={cn(
                  "relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-medium",
                  step.color
                )}>
                  <span className="text-white font-bold text-sm">{step.step}</span>
                </div>
                <h3 className="font-semibold text-base text-foreground mb-2">{step.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
