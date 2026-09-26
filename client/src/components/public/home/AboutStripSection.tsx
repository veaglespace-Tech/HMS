"use client";

import { motion } from "framer-motion";
import { TiltCard } from "@/components/shared/TiltCard";

export function AboutStripSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* 3D Tilt Photo Card */}
        <TiltCard maxTilt={6} scale={1.01} className="w-full">
          <div className="relative rounded-2xl overflow-hidden border border-line dark:border-line-dark shadow-medium">
            <img
              src="/assets/medical-team.jpg"
              alt="Medical team discussing patient charts"
              className="w-full aspect-[3/2] object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
              <span className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                Staff Rounds · St. Jude Hospital
              </span>
              <span className="bg-teal/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-semibold">
                Live System
              </span>
            </div>
          </div>
        </TiltCard>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge-coral">Why Arogya HMS</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-foreground">
            Built for real wards, real people.
          </h2>
          <p className="mt-4 text-ink-soft dark:text-cream-soft leading-relaxed">
            Every screen is co-designed with nurses, receptionists, billing officers and
            doctors — big tap targets, readable editorial typography, zero clutter.
            It works as hard at 3 AM in the emergency room as it does during morning OPD rush.
          </p>

          <ul className="mt-6 space-y-3.5">
            <li className="check-item">
              26 Role-based portals tailored for admin, doctors, nurses, billing & reception
            </li>
            <li className="check-item">
              Offline-friendly resilient patient record cache with automatic background sync
            </li>
            <li className="check-item">
              One-click discharge summaries, automated e-prescriptions & GST-compliant billing
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
