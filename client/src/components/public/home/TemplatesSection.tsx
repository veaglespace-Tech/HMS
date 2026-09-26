"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Eye, X, Layout, Layers, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { TiltCard } from "@/components/shared/TiltCard";

interface TemplateItem {
  id: string;
  key: "a" | "b" | "c";
  title: string;
  description: string;
  codeSnippet: string;
}

const templates: TemplateItem[] = [
  {
    id: "tpl-a",
    key: "a",
    title: "A · Hero + Clinical Overview",
    description:
      "Warm public landing with photography hero, trust statistics, doctor roster, and facility showcase. Best for single multi-specialty hospitals.",
    codeSnippet: `<!-- Template A: Hero + Clinical Overview -->
<section class="hospital-hero">
  <div class="hero-content">
    <span class="badge">Trusted Healthcare</span>
    <h1>Compassionate Care, Advanced Medicine</h1>
    <p>NABH-accredited emergency, inpatient and outpatient hospital services.</p>
    <a href="/register" class="btn btn-primary">Admissions Portal</a>
  </div>
</section>
<section class="hospital-stats">
  <div class="stat"><b>120+</b> Doctors</div>
  <div class="stat"><b>250+</b> Beds</div>
  <div class="stat"><b>24/7</b> Emergency</div>
</section>
<section class="doctor-grid">
  <!-- Dynamic Doctor Profiles -->
</section>`,
  },
  {
    id: "tpl-b",
    key: "b",
    title: "B · Clinical Operations Dashboard",
    description:
      "Sidebar navigation + live occupancy counters + active inpatient table + triage queues. Tuned for admin, nursing stations and reception desks.",
    codeSnippet: `<!-- Template B: Clinical Operations Dashboard -->
<div class="app-layout">
  <aside class="sidebar-nav">
    <nav>OPD Queue · Inpatients · Bed Manager · Pharmacy · Billing</nav>
  </aside>
  <main class="dashboard-body">
    <div class="kpi-row">
      <div class="stat-card">Active OPD: 142</div>
      <div class="stat-card">ICU Occupancy: 88%</div>
      <div class="stat-card">Pending Discharges: 8</div>
    </div>
    <table class="clinical-table">
      <!-- Live Admission & Vitals Monitor -->
    </table>
  </main>
</div>`,
  },
  {
    id: "tpl-c",
    key: "c",
    title: "C · Fast Hospital Onboarding Funnel",
    description:
      "Minimalist multi-step wizard focused entirely on hospital self-registration, license verification, owner KYC, and tier activation.",
    codeSnippet: `<!-- Template C: Hospital Onboarding Funnel -->
<div class="registration-wizard">
  <div class="step-indicator">
    <step num="1" title="Facility Details" active />
    <step num="2" title="Owner Verification" />
    <step num="3" title="Subscription Plan" />
  </div>
  <form class="onboarding-form">
    <!-- Auto-validating form with live slug check & GST verification -->
  </form>
</div>`,
  },
];

export function TemplatesSection() {
  const [activeModal, setActiveModal] = useState<TemplateItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (tpl: TemplateItem) => {
    navigator.clipboard.writeText(tpl.codeSnippet);
    setCopiedId(tpl.id);
    toast.success(`${tpl.title} structure copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="templates" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <span className="badge badge-teal">04 — Architectural Templates</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mt-4 text-foreground">
          Pre-built hospital UI layouts
        </h2>
        <p className="mt-3 text-ink-soft dark:text-cream-soft">
          Three proven layout directions optimized for healthcare workflows. Click “Copy structure” to copy the template skeleton into your clipboard.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {templates.map((tpl) => (
          <TiltCard key={tpl.id} className="h-card p-6 flex flex-col justify-between">
            <div>
              {/* Miniature Wireframe Preview */}
              <div
                className={`w-full h-32 rounded-xl p-3 flex flex-col justify-between border border-line dark:border-line-dark shadow-inner transition-all ${
                  tpl.key === "a"
                    ? "bg-gradient-to-br from-cream to-teal/10 dark:from-ink dark:to-teal/20"
                    : tpl.key === "b"
                    ? "bg-gradient-to-br from-white to-coral/10 dark:from-ink dark:to-coral/20"
                    : "bg-gradient-to-br from-cream to-amber/10 dark:from-ink dark:to-amber/20"
                }`}
              >
                {tpl.key === "a" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-2.5 rounded bg-teal/50" />
                      <div className="flex gap-1">
                        <div className="w-5 h-2 rounded bg-muted-foreground/30" />
                        <div className="w-5 h-2 rounded bg-muted-foreground/30" />
                      </div>
                    </div>
                    <div className="w-3/4 h-5 rounded bg-teal/70" />
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="h-6 rounded bg-white/70 dark:bg-white/10" />
                      <div className="h-6 rounded bg-white/70 dark:bg-white/10" />
                      <div className="h-6 rounded bg-white/70 dark:bg-white/10" />
                    </div>
                  </>
                )}

                {tpl.key === "b" && (
                  <div className="flex gap-2 h-full">
                    <div className="w-1/4 h-full rounded bg-teal/30 flex flex-col gap-1 p-1">
                      <div className="w-full h-2 rounded bg-teal/50" />
                      <div className="w-3/4 h-1.5 rounded bg-muted-foreground/30" />
                      <div className="w-3/4 h-1.5 rounded bg-muted-foreground/30" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="h-5 rounded bg-coral/30" />
                        <div className="h-5 rounded bg-amber/30" />
                      </div>
                      <div className="h-14 rounded bg-white/70 dark:bg-white/10 border border-black/5" />
                    </div>
                  </div>
                )}

                {tpl.key === "c" && (
                  <div className="flex flex-col justify-between h-full py-1">
                    <div className="flex justify-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-teal text-white flex items-center justify-center text-[10px] font-bold">1</div>
                      <div className="w-5 h-5 rounded-full bg-muted-foreground/30 text-white flex items-center justify-center text-[10px]">2</div>
                      <div className="w-5 h-5 rounded-full bg-muted-foreground/30 text-white flex items-center justify-center text-[10px]">3</div>
                    </div>
                    <div className="space-y-1.5 px-2">
                      <div className="w-full h-4 rounded bg-white/80 dark:bg-white/10" />
                      <div className="w-full h-4 rounded bg-white/80 dark:bg-white/10" />
                    </div>
                    <div className="w-1/2 mx-auto h-4 rounded bg-teal" />
                  </div>
                )}
              </div>

              <h3 className="font-display text-lg font-semibold mt-4 text-foreground">
                {tpl.title}
              </h3>
              <p className="text-xs text-ink-soft dark:text-cream-soft mt-1.5 leading-relaxed">
                {tpl.description}
              </p>
            </div>

            <div className="flex gap-2.5 mt-6 pt-4 border-t border-line dark:border-line-dark">
              <button
                onClick={() => handleCopy(tpl)}
                className="btn btn-primary btn-sm flex-1"
              >
                {copiedId === tpl.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" /> Copy Structure
                  </>
                )}
              </button>
              <button
                onClick={() => setActiveModal(tpl)}
                className="btn btn-outline btn-sm flex-1"
              >
                <Eye className="w-3.5 h-3.5 mr-1" /> Preview
              </button>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Code Preview Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-card border border-line dark:border-line-dark w-full max-w-2xl rounded-2xl p-6 shadow-strong overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-line dark:border-line-dark">
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {activeModal.title}
                  </h3>
                  <p className="text-xs text-ink-soft dark:text-cream-soft mt-0.5">
                    Production HTML / Component Skeleton
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="btn btn-ghost btn-icon"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <pre className="mt-4 p-4 rounded-xl bg-ink text-cream text-xs font-mono overflow-x-auto max-h-80 custom-scrollbar leading-relaxed">
                <code>{activeModal.codeSnippet}</code>
              </pre>

              <div className="mt-5 flex justify-end gap-2.5">
                <button
                  onClick={() => setActiveModal(null)}
                  className="btn btn-ghost btn-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleCopy(activeModal);
                    setActiveModal(null);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy Code
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
