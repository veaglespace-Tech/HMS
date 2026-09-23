"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    period: "/month",
    desc: "Perfect for solo clinics and small practices",
    features: ["Up to 10 staff users", "30 beds", "OPD management", "Basic billing", "Email support"],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹2,999",
    period: "/month",
    desc: "For nursing homes and growing hospitals",
    features: ["Up to 50 staff users", "150 beds", "OPD + IPD", "Lab & Pharmacy", "Priority support"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "₹7,999",
    period: "/month",
    desc: "For large multispecialty hospitals",
    features: ["Unlimited users", "Unlimited beds", "All 26 modules", "Radiology + MRD", "Dedicated support"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingTeaserSection() {
  return (
    <section className="py-24 bg-canvas dark:bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Simple, Transparent Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Start free. Scale as you grow.
          </h2>
          <p className="mt-4 text-muted-foreground">
            30-day free trial on all plans. No credit card required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? "border-primary bg-primary text-white shadow-strong"
                  : "border-border bg-white dark:bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-accent text-white text-xs font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? "text-white/70" : "text-muted-foreground"}`}>
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? "text-white/60" : "text-muted-foreground"}>
                    {plan.period}
                  </span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-white/80" : "text-primary"}`} />
                    <span className={plan.highlighted ? "text-white/80" : "text-muted-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register-hospital"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? "bg-white text-primary hover:bg-white/90"
                    : "bg-primary text-white hover:bg-primary-600"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/pricing" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm">
            Compare all features <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
