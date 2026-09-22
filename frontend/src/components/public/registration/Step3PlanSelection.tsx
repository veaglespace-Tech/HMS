"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Loader2, Check } from "lucide-react";
import { apiFetch } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Plan { id: string; name: string; code: string; monthlyPrice: number; annualPrice: number; featuresJson: string; maxUsers: number; maxBeds: number; }

interface Props {
  defaultValues?: { planId?: string };
  onNext: (data: { planId: string }) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function Step3PlanSelection({ defaultValues, onNext, onBack, isSubmitting }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<string>(defaultValues?.planId || "");
  const [billingAnnual, setBillingAnnual] = useState(false);
  const [error, setError] = useState("");

  const { data: plans = [], isLoading } = useQuery<Plan[]>({
    queryKey: ["subscription-plans"],
    queryFn: () => apiFetch("/api/v1/public/subscription-plans"),
  });

  const handleNext = () => {
    if (!selectedPlan) { setError("Please select a plan to continue"); return; }
    onNext({ planId: selectedPlan });
  };

  const parseFeatures = (json: string) => {
    try { return Object.entries(JSON.parse(json)).filter(([,v]) => v).map(([k]) => k.replace(/_/g," ")); }
    catch { return []; }
  };

  const POPULAR = "GROWTH";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Choose Your Plan</h2>
        <p className="text-sm text-muted-foreground">Start with a 30-day free trial. No credit card required.</p>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={`text-sm font-medium ${!billingAnnual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
        <button
          type="button"
          onClick={() => setBillingAnnual((v) => !v)}
          className={cn("relative w-12 h-6 rounded-full transition-colors", billingAnnual ? "bg-primary" : "bg-muted")}
        >
          <span className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-transform", billingAnnual ? "left-7" : "left-1")} />
        </button>
        <span className={`text-sm font-medium ${billingAnnual ? "text-foreground" : "text-muted-foreground"}`}>
          Annual <span className="text-success text-xs font-semibold ml-1">Save 17%</span>
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const price = billingAnnual ? plan.annualPrice / 12 : plan.monthlyPrice;
            const isSelected = selectedPlan === plan.id;
            const isPopular = plan.code === POPULAR;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => { setSelectedPlan(plan.id); setError(""); }}
                className={cn(
                  "relative text-left p-5 rounded-xl border-2 transition-all",
                  isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 bg-white dark:bg-card"
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-0.5 rounded-full bg-accent text-white text-xs font-bold">POPULAR</span>
                  </div>
                )}
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
                <div className="font-bold text-foreground mb-1">{plan.name}</div>
                <div className="text-2xl font-bold text-primary mb-3">
                  ₹{Math.round(price).toLocaleString("en-IN")}
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                </div>
                <div className="text-xs text-muted-foreground mb-3">
                  Up to {plan.maxUsers} users · {plan.maxBeds} beds
                </div>
                <ul className="flex flex-col gap-1.5">
                  {parseFeatures(plan.featuresJson).slice(0,4).map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-success" /> {f}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="text-critical text-sm">{error}</p>}

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button type="button" onClick={handleNext} disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-600 transition-all disabled:opacity-50">
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <>Submit & Continue <ChevronRight className="w-4 h-4" /></>}
        </button>
      </div>
    </div>
  );
}
