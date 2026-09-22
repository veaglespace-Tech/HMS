import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy — Arogya HMS" };
export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: September 2026</p>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <p>We collect information that hospitals provide during registration (hospital name, address, contact details) and information about patients that hospital staff enters into the system (patient demographics, medical records). We do not collect payment card details directly — payments are processed by PCI-DSS compliant gateways.</p>
          <h2>2. How We Use Information</h2>
          <p>Hospital information is used to operate the platform and provide support. Patient information is processed solely on behalf of the hospital (the data controller) and is not used for any other purpose.</p>
          <h2>3. Data Residency</h2>
          <p>All data is stored on servers located in India, complying with the Digital Personal Data Protection Act (DPDPA) 2023.</p>
          <h2>4. Data Security</h2>
          <p>We implement industry-standard security measures including TLS 1.3 in transit, AES-256 at rest, role-based access control, and immutable audit logging.</p>
          <h2>5. Data Retention</h2>
          <p>Patient data is retained as long as the hospital's subscription is active. After termination, data is available in read-only export mode for 90 days, then permanently deleted.</p>
          <h2>6. Contact</h2>
          <p>For privacy concerns, contact our DPO at privacy@arogya.in</p>
        </div>
      </div>
    </div>
  );
}
