"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { TiltCard } from "@/components/shared/TiltCard";

const plans = [
  {
    name: "Starter Clinic",
    price: "₹999",
    period: "/month",
    desc: "Perfect for solo practices & small outpatient clinics",
    features: [
      "Up to 10 staff members",
      "30 observation beds",
      "OPD registration & queue",
      "Digital prescriptions",
      "Standard email support",
    ],
    cta: "Start 30-Day Free Trial",
    highlighted: false,
  },
  {
    name: "Growth Hospital",
    price: "₹2,999",
    period: "/month",
    desc: "For nursing homes and mid-sized multispecialty hospitals",
    features: [
      "Up to 50 staff users",
      "150 beds & live ICU tracker",
      "Complete OPD + IPD workflows",
      "Pharmacy & Lab management",
      "Priority WhatsApp & phone support",
    ],
    cta: "Start 30-Day Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise Multi-Branch",
    price: "₹7,999",
    period: "/month",
    desc: "For large hospitals & multi-location hospital networks",
    features: [
      "Unlimited staff accounts",
      "Unlimited beds & branches",
      "Complete 26 department modules",
      "RIS/PACS & ABDM milestone sync",
      "24/7 dedicated account manager",
    ],
    cta: "Contact Enterprise Desk",
    highlighted: false,
  },
];

export function PricingTeaserSection() {
  return (
    <section id="pricing" className="py-24 bg-white/40 dark:bg-white/[0.02] border-t border-line dark:border-line-dark">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge badge-coral mb-3">Subscription Plans</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-2">
            Simple, honest pricing for healthcare
          </h2>
          <p className="mt-3 text-ink-soft dark:text-cream-soft text-sm">
            Start with a 30-day free trial on all plans. No credit card required. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <TiltCard
              key={plan.name}
              maxTilt={6}
              scale={plan.highlighted ? 1.03 : 1.01}
              className={`relative rounded-2xl border p-8 flex flex-col justify-between transition-all ${
                plan.highlighted
                  ? "border-teal bg-teal text-white shadow-strong"
                  : "border-line dark:border-line-dark bg-white dark:bg-card text-foreground"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full bg-coral text-white text-[11px] font-bold tracking-wider shadow-sm">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div>
                <h3
                  className={`font-display text-xl font-semibold mb-1 ${
                    plan.highlighted ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-xs mb-5 ${
                    plan.highlighted ? "text-white/80" : "text-ink-soft dark:text-cream-soft"
                  }`}
                >
                  {plan.desc}
                </p>

                <div className="flex items-baseline gap-1 pb-6 border-b border-white/20 dark:border-line-dark">
                  <span
                    className={`font-display text-4xl font-bold ${
                      plan.highlighted ? "text-white" : "text-foreground"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-white/70" : "text-ink-soft dark:text-cream-soft"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-3 my-6 text-xs">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Check
                        className={`w-4 h-4 shrink-0 ${
                          plan.highlighted ? "text-white" : "text-teal dark:text-teal-bright"
                        }`}
                      />
                      <span className={plan.highlighted ? "text-white/90" : "text-foreground/90"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/register-hospital"
                className={`btn btn-lg w-full text-sm font-semibold justify-center ${
                  plan.highlighted
                    ? "bg-white text-teal hover:bg-cream-soft active:bg-white"
                    : "btn-primary"
                }`}
              >
                {plan.cta}
              </Link>
            </TiltCard>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal dark:text-teal-bright hover:underline"
          >
            Compare complete feature breakdown & SLA <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
