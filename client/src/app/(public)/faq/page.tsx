import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Arogya HMS",
  description: "Frequently asked questions about Arogya HMS.",
};

const faqs = [
  {
    q: "Is Arogya HMS only for government hospitals?",
    a: "No. Arogya HMS is built for any healthcare facility — private clinics, polyclinics, nursing homes, multispecialty hospitals, diagnostic centres, and day-care centres. Government facilities can also use it. There is no government affiliation requirement.",
  },
  {
    q: "Is ABHA (Ayushman Bharat) integration mandatory?",
    a: "No. ABHA integration is completely optional. If a patient has their ABHA number or documents, you can link them. If not, the system works perfectly fine without it.",
  },
  {
    q: "How do we get started?",
    a: "Register your hospital through the Register Hospital page. Fill in the 5-step wizard and verify your email. A Super Admin will review and approve your account within 1 business day. You'll receive login credentials to start using the system.",
  },
  {
    q: "Can we use Arogya HMS for multiple branches?",
    a: "Yes. The Growth and Enterprise plans support multi-branch setup. Each branch has its own staff and data, but a single Hospital Admin can view all branches from one account.",
  },
  {
    q: "Is patient data secure?",
    a: "Yes. All data is encrypted at rest and in transit (TLS 1.3). Role-based access ensures staff can only see what they are authorized to see. Every action is logged in an immutable audit trail. We follow DPDPA (Digital Personal Data Protection Act) guidelines.",
  },
  {
    q: "Does it work on low-speed internet?",
    a: "Arogya HMS is designed to be lightweight. Core workflows like OPD registration, vitals entry, and billing work well on standard broadband or 4G connections. We don't require high-speed fiber.",
  },
  {
    q: "What happens after the 30-day trial ends?",
    a: "You'll receive an email reminder before the trial ends. If you choose a paid plan, your data continues seamlessly. If you don't upgrade, your account goes into read-only mode for 30 more days so you can export your data.",
  },
  {
    q: "Can we import our existing patient data?",
    a: "Yes. We provide an Excel/CSV import template for patient demographics. For larger data migrations, our support team assists with the process at no extra cost (Enterprise plan).",
  },
];

export default function FaqPage() {
  return (
    <div className="py-20">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">FAQ</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Common Questions</h1>
        </div>
        <div className="flex flex-col gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-xl bg-white dark:bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-3">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Link href="/contact" className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-600 transition-colors inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
