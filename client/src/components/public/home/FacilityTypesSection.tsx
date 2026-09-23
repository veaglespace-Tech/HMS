"use client";

import { motion } from "framer-motion";
import { Building2, Stethoscope, HeartPulse, FlaskConical, Sun, Hospital } from "lucide-react";

const facilityTypes = [
  { icon: Stethoscope, label: "Private Clinic",         desc: "Solo or group practice with OPD management" },
  { icon: Building2,   label: "Polyclinic",             desc: "Multi-specialty outpatient facility" },
  { icon: HeartPulse,  label: "Nursing Home",           desc: "IPD + OPD with beds and ward management" },
  { icon: Hospital,    label: "Multispecialty Hospital", desc: "Full-service hospital with all departments" },
  { icon: FlaskConical,label: "Diagnostic Centre",      desc: "Lab and radiology with report management" },
  { icon: Sun,         label: "Day Care Centre",        desc: "Short-stay procedures and day surgeries" },
];

export function FacilityTypesSection() {
  return (
    <section className="py-20 bg-canvas dark:bg-background border-b border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Built For Every Healthcare Facility
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            One platform, any facility type
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Whether you run a 2-doctor clinic or a 500-bed hospital, Arogya HMS
            scales to fit your needs perfectly.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {facilityTypes.map((type, i) => (
            <motion.div
              key={type.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-card border border-border hover:border-primary/40 hover:shadow-medium transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <type.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1">{type.label}</h3>
              <p className="text-xs text-muted-foreground leading-snug">{type.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
