import type { Metadata } from "next";
import { HospitalRegistrationWizard } from "@/components/public/registration/HospitalRegistrationWizard";

export const metadata: Metadata = {
  title: "Register Your Hospital — Arogya HMS",
  description: "Register your hospital or clinic on Arogya HMS. 5-step guided setup. Free 30-day trial.",
};

export default function RegisterHospitalPage() {
  return (
    <div className="py-12 bg-canvas dark:bg-background min-h-screen">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Join Arogya HMS
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Register Your Hospital
          </h1>
          <p className="text-muted-foreground">
            Complete the 5-step form below. Your account will be reviewed and approved within 1 business day.
          </p>
        </div>
        <HospitalRegistrationWizard />
      </div>
    </div>
  );
}
