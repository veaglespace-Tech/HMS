"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, Bed, ShieldCheck, HeartPulse } from "lucide-react";
import { toast } from "sonner";
import { TiltCard } from "@/components/shared/TiltCard";

export function CardsTiltSection() {
  return (
    <section id="cards" className="border-t border-line dark:border-line-dark bg-white/50 dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="badge badge-teal">03 — Interactive 3D Cards</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-foreground">
            Card components with 3D tilt
          </h2>
          <p className="mt-3 text-ink-soft dark:text-cream-soft">
            Hover and move your mouse over any card — each component responds with physics-tuned depth and perspective.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Card 1: Doctor Female */}
          <TiltCard className="h-card overflow-hidden">
            <div className="h-card-img aspect-[4/3]">
              <img
                src="/assets/doctor-female.jpg"
                alt="Dr. Meera Kulkarni"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Dr. Meera Kulkarni
                </h3>
                <span className="badge badge-teal">Cardiology</span>
              </div>
              <p className="text-ink-soft dark:text-cream-soft text-xs mt-1">
                MBBS, MD (Cardio) · 14 yrs clinical experience
              </p>
              <div className="flex items-center gap-1 mt-2.5 text-amber">
                <div className="flex text-amber">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-amber" />
                  ))}
                </div>
                <span className="text-ink-soft dark:text-cream-soft text-xs ml-1 font-medium">
                  4.9 (312 patient reviews)
                </span>
              </div>
              <button
                onClick={() => toast.info("Opening Dr. Meera Kulkarni duty roster")}
                className="btn btn-primary w-full mt-4"
              >
                View Doctor Schedule
              </button>
            </div>
          </TiltCard>

          {/* Card 2: Senior Specialist */}
          <TiltCard className="h-card overflow-hidden">
            <div className="h-card-img aspect-[4/3]">
              <img
                src="/assets/medical-team.jpg"
                alt="Dr. Rohan Sharma"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Dr. Rohan Sharma
                </h3>
                <span className="badge badge-coral">Orthopedics</span>
              </div>
              <p className="text-ink-soft dark:text-cream-soft text-xs mt-1">
                MS (Ortho), DNB · Chief Trauma Surgeon
              </p>
              <div className="flex items-center gap-1 mt-2.5 text-amber">
                <div className="flex text-amber">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-amber" />
                  ))}
                  <Star className="w-3.5 h-3.5 text-amber/40" />
                </div>
                <span className="text-ink-soft dark:text-cream-soft text-xs ml-1 font-medium">
                  4.8 (246 surgeries)
                </span>
              </div>
              <button
                onClick={() => toast.info("Opening Dr. Rohan Sharma OT schedule")}
                className="btn btn-outline w-full mt-4"
              >
                View OT Roster
              </button>
            </div>
          </TiltCard>

          {/* Card 3: Live OPD Statistics */}
          <TiltCard className="h-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
                  Live OPD Inflow
                </p>
                <span className="badge badge-teal">
                  <TrendingUp className="w-3 h-3 mr-0.5 inline" /> ▲ 12%
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-3">
                <span className="font-display text-5xl font-semibold text-foreground">
                  142
                </span>
                <span className="text-xs text-ink-soft dark:text-cream-soft">
                  Registered Today
                </span>
              </div>

              {/* Sparkline Graph */}
              <div className="sparkline mt-6" aria-hidden="true">
                <span style={{ "--h": "35%" } as any} title="8 AM: 12" />
                <span style={{ "--h": "55%" } as any} title="9 AM: 24" />
                <span style={{ "--h": "40%" } as any} title="10 AM: 18" />
                <span style={{ "--h": "85%" } as any} title="11 AM: 36 (Peak)" />
                <span style={{ "--h": "60%" } as any} title="12 PM: 22" />
                <span style={{ "--h": "70%" } as any} title="1 PM: 28" />
                <span style={{ "--h": "95%" } as any} title="2 PM: 38" />
              </div>
            </div>

            <div className="pt-4 border-t border-line dark:border-line-dark mt-4 flex items-center justify-between text-xs text-ink-soft dark:text-cream-soft">
              <span>vs 127 yesterday</span>
              <span className="font-semibold text-teal dark:text-teal-bright">
                Avg Wait: 14 mins
              </span>
            </div>
          </TiltCard>

          {/* Card 4: Patient Admit / Observation Card */}
          <TiltCard className="h-card p-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-teal/30 shrink-0">
                <img
                  src="/assets/patient-care.jpg"
                  alt="Aarav Patil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-base text-foreground">
                  Aarav Patil, 7 yrs
                </h3>
                <p className="text-xs text-ink-soft dark:text-cream-soft">
                  Pediatrics · Observation Ward 4B
                </p>
              </div>
            </div>

            <div className="mt-5 p-3.5 rounded-xl bg-cream dark:bg-ink-500/30 border border-line dark:border-line-dark flex items-center justify-between text-xs">
              <span className="badge badge-amber">Bed #12 · Stable</span>
              <span className="font-mono font-medium text-foreground">
                Token #A-12
              </span>
            </div>

            <div className="mt-5 flex gap-2.5">
              <button
                onClick={() => toast.success("Vitals sheet: Temp 98.6°F, SpO2 99%")}
                className="btn btn-primary btn-sm flex-1"
              >
                Vitals Chart
              </button>
              <button
                onClick={() => toast.info("Discharge summary draft loaded")}
                className="btn btn-outline btn-sm flex-1"
              >
                Discharge
              </button>
            </div>
          </TiltCard>

          {/* Card 5: Bed Availability Live Bars */}
          <TiltCard className="h-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-ink-soft dark:text-cream-soft uppercase tracking-wider">
                  Live Bed Tracking
                </p>
                <span className="badge badge-teal">Live Sync</span>
              </div>
              <h3 className="font-display text-xl font-semibold mt-2 text-foreground">
                Real-Time Ward Occupancy
              </h3>

              <div className="mt-5 space-y-3.5">
                <div className="bed-row">
                  <span className="w-24 text-ink-soft dark:text-cream-soft font-medium">
                    General Ward
                  </span>
                  <div className="bed-bar">
                    <i style={{ "--w": "72%" } as any} />
                  </div>
                  <b className="w-10 text-right text-foreground">72%</b>
                </div>
                <div className="bed-row">
                  <span className="w-24 text-ink-soft dark:text-cream-soft font-medium">
                    ICU & CCU
                  </span>
                  <div className="bed-bar">
                    <i style={{ "--w": "45%" } as any} />
                  </div>
                  <b className="w-10 text-right text-foreground">45%</b>
                </div>
                <div className="bed-row">
                  <span className="w-24 text-ink-soft dark:text-cream-soft font-medium">
                    Private Rooms
                  </span>
                  <div className="bed-bar">
                    <i style={{ "--w": "88%" } as any} />
                  </div>
                  <b className="w-10 text-right text-foreground">88%</b>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-line dark:border-line-dark flex items-center justify-between text-xs text-ink-soft dark:text-cream-soft">
              <span>Total Capacity: 240 Beds</span>
              <span className="text-teal font-semibold">48 Vacant</span>
            </div>
          </TiltCard>

          {/* Card 6: Infrastructure / Facility Card */}
          <TiltCard className="h-card overflow-hidden">
            <div className="h-card-img aspect-video">
              <img
                src="/assets/reception-lobby.jpg"
                alt="Hospital Lobby and Reception"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <span className="badge badge-teal">Facility Infrastructure</span>
              <h3 className="font-display text-lg font-semibold mt-2 text-foreground">
                Smart Check-in Lounge
              </h3>
              <p className="text-ink-soft dark:text-cream-soft text-xs mt-1.5 leading-relaxed">
                Integrated with 6 self-service ABHA kiosks for paperless admission in under 90 seconds.
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
