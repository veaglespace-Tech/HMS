"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle, ChevronRight, ChevronLeft, Building2, User, CreditCard, FileText, Mail } from "lucide-react";
import { apiFetch, slugify } from "@/lib/utils";
import { Step1HospitalDetails } from "./Step1HospitalDetails";
import { Step2OwnerDetails } from "./Step2OwnerDetails";
import { Step3PlanSelection } from "./Step3PlanSelection";
import { Step4Documents } from "./Step4Documents";
import { Step5VerifyEmail } from "./Step5VerifyEmail";
import { SuccessScreen } from "./SuccessScreen";

// ─── Zod schemas per step ──────────────────────────────────────────────────────
const step1Schema = z.object({
  name:           z.string().min(3, "Name must be at least 3 characters"),
  type:           z.enum(["CLINIC","POLYCLINIC","NURSING_HOME","MULTISPECIALTY","SUPERSPECIALTY","TRUST","DIAGNOSTIC_CENTRE","DAY_CARE","GOVERNMENT"]),
  slug:           z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
  registrationNo: z.string().optional(),
  gstin:          z.string().optional(),
  addressLine1:   z.string().optional(),
  city:           z.string().min(2, "City is required"),
  state:          z.string().min(2, "State is required"),
  pincode:        z.string().regex(/^[1-9][0-9]{5}$/, "Invalid pincode"),
  phone:          z.string().regex(/^[6-9][0-9]{9}$/, "Invalid mobile number"),
  email:          z.string().email("Invalid email address"),
  bedCount:       z.number().min(0).optional(),
});

const step2Schema = z.object({
  ownerName:        z.string().min(2, "Name is required"),
  ownerEmail:       z.string().email("Invalid email"),
  ownerPhone:       z.string().regex(/^[6-9][0-9]{9}$/, "Invalid mobile number"),
  ownerDesignation: z.string().optional(),
});

const step3Schema = z.object({
  planId: z.string().min(1, "Please select a plan"),
});

export type FormData = z.infer<typeof step1Schema> & z.infer<typeof step2Schema> & z.infer<typeof step3Schema>;

const STEPS = [
  { label: "Hospital",  icon: Building2 },
  { label: "Owner",     icon: User },
  { label: "Plan",      icon: CreditCard },
  { label: "Documents", icon: FileText },
  { label: "Verify",    icon: Mail },
];

const STORAGE_KEY = "arogya_reg_draft";

function loadDraft(): Partial<FormData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveDraft(data: Partial<FormData>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export function HospitalRegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>(loadDraft);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...data };
      saveDraft(updated);
      return updated;
    });
  }, []);

  const handleNext = useCallback(async (stepData: Partial<FormData>) => {
    updateFormData(stepData);

    if (currentStep === 2) {
      // After step 3 (plan), submit to API
      const allData = { ...formData, ...stepData };
      setIsSubmitting(true);
      try {
        const res = await apiFetch<{ id: string }>("/api/v1/public/hospital-registrations", {
          method: "POST",
          body: JSON.stringify(allData),
        });
        setRegistrationId(res.id);
        // Send verification email
        await apiFetch(`/api/v1/public/hospital-registrations/${res.id}/verify-email`, {
          method: "POST",
        });
        setCurrentStep(3); // jump to documents
      } catch (error: any) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      } finally {
        setIsSubmitting(false);
      }
    } else if (currentStep < 4) {
      setCurrentStep((s) => s + 1);
    } else {
      // Step 5 complete
      setIsComplete(true);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentStep, formData, updateFormData]);

  const handleBack = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
  }, []);

  if (isComplete) {
    return <SuccessScreen hospitalName={formData.name || "Your Hospital"} email={formData.email || ""} />;
  }

  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
      {/* Step indicator */}
      <div className="p-6 border-b border-border bg-canvas dark:bg-background">
        <div className="flex items-center justify-between">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            return (
              <div key={step.label} className="flex items-center gap-2">
                <div className={`flex flex-col items-center gap-1 ${i > 0 ? "" : ""}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isDone ? "bg-success text-white"
                    : isActive ? "bg-primary text-white shadow-glow"
                    : "bg-muted text-muted-foreground"
                  }`}>
                    {isDone ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${isActive ? "text-primary" : isDone ? "text-success" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${i < currentStep ? "bg-success" : "bg-border"}`} style={{ minWidth: "24px" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            {currentStep === 0 && (
              <Step1HospitalDetails
                defaultValues={formData}
                onNext={handleNext}
              />
            )}
            {currentStep === 1 && (
              <Step2OwnerDetails
                defaultValues={formData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 2 && (
              <Step3PlanSelection
                defaultValues={formData}
                onNext={handleNext}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            )}
            {currentStep === 3 && (
              <Step4Documents
                hospitalId={registrationId}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 4 && (
              <Step5VerifyEmail
                hospitalId={registrationId}
                email={formData.email || ""}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
