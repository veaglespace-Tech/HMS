"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Calendar, AlertTriangle, Loader2, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { MagneticButton } from "@/components/shared/MagneticButton";

export function ButtonsShowcaseSection() {
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Action completed successfully!");
    }, 1500);
  };

  return (
    <section id="buttons" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <span className="badge badge-coral">02 — Buttons & Micro-Interactions</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-foreground">
          Tactile button system
        </h2>
        <p className="mt-3 text-ink-soft dark:text-cream-soft">
          Every button variant serves a deliberate clinical priority with tuned hover and active feedback.
        </p>
      </motion.div>

      {/* Buttons Grid */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Primary */}
        <div className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
              Primary — Glow Lift
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              High confidence primary action
            </p>
          </div>
          <MagneticButton strength={10}>
            <button
              onClick={() => toast("Hospital admission confirmed")}
              className="btn btn-primary btn-lg w-full"
            >
              Confirm Admission
            </button>
          </MagneticButton>
        </div>

        {/* Coral */}
        <div className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
              Coral — Pulse Ring
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Urgent, critical care or emergency actions
            </p>
          </div>
          <MagneticButton strength={10}>
            <button
              onClick={() => toast.error("Emergency triage alert triggered!")}
              className="btn btn-coral btn-lg w-full"
            >
              Emergency Triage
            </button>
          </MagneticButton>
        </div>

        {/* Outline */}
        <div className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
              Outline — Fill Sweep
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Secondary administrative queries
            </p>
          </div>
          <MagneticButton strength={10}>
            <button
              onClick={() => toast("Diagnostic report downloaded")}
              className="btn btn-outline btn-lg w-full"
            >
              View Lab Reports
            </button>
          </MagneticButton>
        </div>

        {/* Ghost */}
        <div className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
              Ghost — Soft Hover
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Low priority navigation & dismissals
            </p>
          </div>
          <button
            onClick={() => toast("Skipped step")}
            className="btn btn-ghost btn-lg w-full"
          >
            Skip for now
          </button>
        </div>

        {/* Gradient */}
        <div className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
              Gradient — Shine Pass
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Enterprise features & subscription upgrades
            </p>
          </div>
          <button
            onClick={() => toast.success("Enterprise plan selected")}
            className="btn btn-gradient btn-lg w-full"
          >
            <Sparkles className="w-4 h-4 mr-1" /> Enterprise Plan
          </button>
        </div>

        {/* 3D Press */}
        <div className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
              3D Press — Tactile Bevel
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Satisfying physical print / export press
            </p>
          </div>
          <button
            onClick={() => toast("GST invoice sent to thermal printer")}
            className="btn btn-3d btn-lg w-full"
          >
            Print Tax Invoice
          </button>
        </div>

        {/* Icon Cluster */}
        <div className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
              Icon Micro-Buttons
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Compact actions for quick patient records
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toast("Calling Doctor on duty...")}
              className="btn btn-primary btn-icon flex-1"
              aria-label="Call Doctor"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => toast("Opening shift schedule...")}
              className="btn btn-outline btn-icon flex-1"
              aria-label="Shift Schedule"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              onClick={() => toast.warning("Code Blue emergency broadcast sent")}
              className="btn btn-coral btn-icon flex-1"
              aria-label="Code Blue alert"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        <div className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
              Loading State — Spinner
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Zero stutter during async state updates
            </p>
          </div>
          <button
            onClick={simulateLoading}
            disabled={isLoading}
            className="btn btn-primary btn-lg w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
                Syncing EHR Data…
              </>
            ) : (
              "Click to Test Loading"
            )}
          </button>
        </div>

        {/* Pill */}
        <div className="p-5 rounded-2xl bg-white dark:bg-card border border-line dark:border-line-dark shadow-soft flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
              Pill — Soft Geometry
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Floating quick patient onboarding
            </p>
          </div>
          <button
            onClick={() => toast.info("Quick Admit modal opened")}
            className="btn btn-coral btn-lg btn-pill w-full"
          >
            + Quick Admit Patient
          </button>
        </div>
      </div>
    </section>
  );
}
