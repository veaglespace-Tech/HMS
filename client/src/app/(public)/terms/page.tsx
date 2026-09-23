import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service — Arogya HMS" };
export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: September 2026</p>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>By registering and using Arogya HMS, you agree to these Terms of Service. If you do not agree, do not use the platform.</p>
          <h2>2. Subscription & Payment</h2>
          <p>Plans are billed monthly or annually. The 30-day trial is free with no credit card required. After the trial, a paid plan is required to continue using the system. Cancellation can be made at any time. Refunds are not provided for partial periods.</p>
          <h2>3. Acceptable Use</h2>
          <p>You may use Arogya HMS only for lawful healthcare management purposes. You may not use the system to enter false patient information, circumvent access controls, or reverse-engineer the platform.</p>
          <h2>4. Data Ownership</h2>
          <p>All patient data entered by your hospital belongs to your hospital. Arogya HMS is a data processor. We do not sell, share, or use patient data for any purpose other than providing the service.</p>
          <h2>5. Service Availability</h2>
          <p>We target 99.9% monthly uptime, excluding scheduled maintenance. Planned maintenance windows are communicated 48 hours in advance.</p>
          <h2>6. Limitation of Liability</h2>
          <p>Arogya HMS is a software tool. Clinical decisions remain the responsibility of qualified healthcare professionals. We are not liable for clinical outcomes.</p>
          <h2>7. Governing Law</h2>
          <p>These terms are governed by the laws of India. Disputes shall be resolved in the courts of Pune, Maharashtra.</p>
        </div>
      </div>
    </div>
  );
}
