"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal to-teal-dark p-10 md:p-16 text-center text-white shadow-strong"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-4 backdrop-blur-sm border border-white/20">
              <HeartHandshake className="w-3.5 h-3.5 text-coral" /> Ready for Paperless Operations
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white leading-tight mb-4">
              Modernize your hospital in minutes, not months.
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
              Join 120+ leading healthcare facilities across India. Register your facility today and get instant access to the 30-day all-inclusive free trial.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <MagneticButton strength={12}>
                <Link
                  href="/register-hospital"
                  className="btn btn-lg bg-white text-teal hover:bg-cream active:bg-white text-base font-bold shadow-soft"
                >
                  Register Your Hospital Free
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </MagneticButton>

              <MagneticButton strength={10}>
                <Link
                  href="/contact"
                  className="btn btn-lg border-2 border-white/30 text-white hover:bg-white/10 text-base"
                >
                  Schedule Live Walkthrough
                </Link>
              </MagneticButton>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap justify-center items-center gap-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-white" /> ISO 27001 & DPDPA Compliant
              </span>
              <span>•</span>
              <span>No credit card required</span>
              <span>•</span>
              <span>Free migration assistance</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
