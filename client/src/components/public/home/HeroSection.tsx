"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/shared/MagneticButton";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="section-container">
        <div className="max-w-3xl flex flex-col items-start text-left">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-foreground"
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
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-base sm:text-lg text-ink-soft dark:text-cream-soft leading-relaxed max-w-2xl"
          >
            Arogya HMS powers paperless clinical workflows, real-time bed telemetry,
            central pharmacy POS, pathology LIS, and GST billing — purpose-built for
            clinics, nursing homes, and multispecialty hospitals across India.
          </motion.p>

          {/* Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex items-center"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
