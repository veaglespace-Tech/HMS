import type { Metadata } from "next";
import { HeroSection } from "@/components/public/home/HeroSection";
import { ClinicalModulesSection } from "@/components/public/home/ClinicalModulesSection";
import { AboutStripSection } from "@/components/public/home/AboutStripSection";
import { AbdmComplianceSection } from "@/components/public/home/AbdmComplianceSection";
import { FacilityTypesSection } from "@/components/public/home/FacilityTypesSection";
import { PricingTeaserSection } from "@/components/public/home/PricingTeaserSection";
import { CtaSection } from "@/components/public/home/CtaSection";

export const metadata: Metadata = {
  title: "Arogya HMS — Enterprise Healthcare Management & ABDM Ready Operating System",
  description:
    "Ayushman Bharat ABDM ready, NABH compliant multi-tenant hospital management platform. Integrated OPD, IPD, EHR, Pharmacy POS, Pathology LIS, Radiology PACS, and GST Billing.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClinicalModulesSection />
      <AboutStripSection />
      <AbdmComplianceSection />
      <FacilityTypesSection />
      <PricingTeaserSection />
      <CtaSection />
    </>
  );
}
