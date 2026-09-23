import type { Metadata } from "next";
import { Check, Zap, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Features — Complete Hospital Management Features",
  description: "Explore all features of Arogya HMS — from patient registration to discharge, lab to pharmacy, billing to MRD.",
};

const featureGroups = [
  {
    title: "Patient Management",
    icon: "👤",
    features: [
      "Unique UHID generation per hospital",
      "ABHA linkage (optional)",
      "Duplicate detection via name + DOB + mobile",
      "Complete patient history across visits",
      "Document uploads (Aadhaar, insurance, etc.)",
      "Emergency / walk-in fast registration",
    ],
  },
  {
    title: "OPD & Consultation",
    icon: "🩺",
    features: [
      "Token-based digital queue management",
      "Digital vitals entry (BP, temp, SpO2, weight, height)",
      "ICD-10 diagnosis with search",
      "SOAP notes with templates",
      "Doctor-to-doctor referral",
      "Follow-up scheduling",
    ],
  },
  {
    title: "IPD & Ward Management",
    icon: "🛏️",
    features: [
      "Real-time bed availability map",
      "Ward / room / bed hierarchy",
      "Admission with deposit collection",
      "Daily ward round notes",
      "Patient transfer between wards",
      "Discharge planning workflow",
    ],
  },
  {
    title: "Lab & Radiology",
    icon: "🔬",
    features: [
      "Lab order creation from OPD / IPD",
      "Test catalogue management",
      "Result entry and report upload (PDF)",
      "X-ray and imaging orders",
      "Radiology report with findings",
      "Auto-billing on result submission",
    ],
  },
  {
    title: "Pharmacy",
    icon: "💊",
    features: [
      "Prescription-linked dispensing",
      "Drug catalogue with generics",
      "Stock management and reorder alerts",
      "Expiry date tracking",
      "Return and wastage recording",
      "Pharmacy billing integration",
    ],
  },
  {
    title: "Billing & Finance",
    icon: "🧾",
    features: [
      "Itemized bill generation",
      "Advance / deposit management",
      "Multiple payment modes (cash, card, UPI)",
      "Insurance claim tagging",
      "Discount with approval workflow",
      "GST-compliant invoices",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="py-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Features</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything a modern hospital needs
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Arogya HMS covers every department and every workflow. Built for
            Indian healthcare facilities with compliance and usability in mind.
          </p>
        </div>

        {/* Value props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Zap,    title: "Fast to deploy",     desc: "Up and running in hours, not weeks. No IT team needed." },
            { icon: Shield, title: "Secure by design",   desc: "Role-based access, audit logs, data encryption at rest." },
            { icon: Clock,  title: "Works offline*",     desc: "Core features work on low-bandwidth connections." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-xl bg-primary/5 border border-primary/20 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureGroups.map((group) => (
            <div key={group.title} className="p-8 rounded-2xl bg-white dark:bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{group.icon}</span>
                <h2 className="text-xl font-bold text-foreground">{group.title}</h2>
              </div>
              <ul className="grid grid-cols-1 gap-3">
                {group.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
