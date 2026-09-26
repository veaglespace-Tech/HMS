import type { Metadata } from "next";
import { HeroSection } from "@/components/public/home/HeroSection";
import { AboutStripSection } from "@/components/public/home/AboutStripSection";
import { ThemePaletteSection } from "@/components/public/home/ThemePaletteSection";
import { ButtonsShowcaseSection } from "@/components/public/home/ButtonsShowcaseSection";
import { CardsTiltSection } from "@/components/public/home/CardsTiltSection";
import { TemplatesSection } from "@/components/public/home/TemplatesSection";
import { FacilityTypesSection } from "@/components/public/home/FacilityTypesSection";
import { PricingTeaserSection } from "@/components/public/home/PricingTeaserSection";
import { CtaSection } from "@/components/public/home/CtaSection";

export const metadata: Metadata = {
  title: "Arogya HMS — Calm Clinic UI Kit & Healthcare Management Platform",
  description:
    "Care that feels human, managed like clockwork. Complete hospital management platform for clinics, nursing homes, and multispecialty hospitals across India.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutStripSection />
      <ThemePaletteSection />
      <ButtonsShowcaseSection />
      <CardsTiltSection />
      <TemplatesSection />
      <FacilityTypesSection />
      <PricingTeaserSection />
      <CtaSection />
    </>
  );
}
