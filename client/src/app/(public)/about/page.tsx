import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Arogya HMS",
  description: "Learn about Arogya HMS — our mission, values, and the team building India's best hospital management system.",
};

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for India's healthcare future
          </h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Our Mission</h2>
          <p>
            Arogya HMS was built with one goal: to eliminate paperwork from Indian hospitals. We believe
            that every healthcare worker's time should be spent on patients, not on registers, files, and
            Excel sheets. From a 2-doctor clinic in a small town to a 500-bed hospital in a metro city —
            every facility deserves great software.
          </p>

          <h2>Why We Built This</h2>
          <p>
            After working with dozens of hospitals across Maharashtra, we found the same problems everywhere:
            patient data was on paper and couldn't be searched, billing was in Excel, lab reports were
            photocopied, and there was no visibility into bed availability. We built Arogya HMS to solve
            all of these problems in one unified platform.
          </p>

          <h2>Our Principles</h2>
          <ul>
            <li><strong>Privacy first:</strong> Patient data belongs to the patient. We follow DPDPA guidelines strictly.</li>
            <li><strong>No lock-in:</strong> Export your data anytime. We earn your trust every month.</li>
            <li><strong>India-specific:</strong> GST-compliant billing, Aadhaar integration optional, ICD-10 in regional languages.</li>
            <li><strong>Always on:</strong> 99.9% uptime SLA. Works on basic broadband connections.</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Have questions? <Link href="/contact" className="text-primary">Contact our team</Link> or{" "}
            <Link href="/register-hospital" className="text-primary">register your hospital</Link> to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
