import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Arogya HMS",
  description: "Get in touch with the Arogya HMS team for demo, pricing, or support.",
};

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in touch</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions about Arogya HMS? Our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
            <div className="flex flex-col gap-6">
              {[
                { icon: Mail,  label: "Email",  value: "support@arogya.in" },
                { icon: Phone, label: "Phone",  value: "+91 98765 43210" },
                { icon: MapPin,label: "Address",value: "Pune, Maharashtra — 411001" },
                { icon: Clock, label: "Hours",  value: "Mon-Sat, 9 AM – 7 PM IST" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="font-medium text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form placeholder */}
          <div className="p-8 rounded-2xl bg-white dark:bg-card border border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">Send us a message</h2>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                  <input type="text" placeholder="Dr. Sharma" className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                  <input type="tel" placeholder="98765 43210" className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Hospital Name</label>
                <input type="text" placeholder="City General Hospital" className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input type="email" placeholder="doctor@hospital.com" className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea rows={4} placeholder="I want to see a demo of Arogya HMS for our 50-bed nursing home..." className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              </div>
              <button type="submit" className="px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-600 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
