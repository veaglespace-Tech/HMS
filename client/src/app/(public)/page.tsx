import type { Metadata } from "next";
import { HeroSection } from "@/components/public/home/HeroSection";
import { FacilityTypesSection } from "@/components/public/home/FacilityTypesSection";
import { FeaturesGridSection } from "@/components/public/home/FeaturesGridSection";
import { PatientJourneySection } from "@/components/public/home/PatientJourneySection";
import { ModulesShowcaseSection } from "@/components/public/home/ModulesShowcaseSection";
import { PricingTeaserSection } from "@/components/public/home/PricingTeaserSection";
import { CtaSection } from "@/components/public/home/CtaSection";

export const metadata: Metadata = {
  title: "Arogya HMS — Complete Hospital Management System for Any Healthcare Facility",
  description:
    "Manage your entire hospital digitally. From patient registration to discharge, billing to lab reports — all in one place. For clinics, nursing homes, multispecialty hospitals, and more.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FacilityTypesSection />
      <FeaturesGridSection />
      <PatientJourneySection />
      <ModulesShowcaseSection />
      <PricingTeaserSection />
      <CtaSection />
    </>
  );
}
