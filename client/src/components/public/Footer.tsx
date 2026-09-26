import Link from "next/link";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Features", href: "/features" },
    { label: "UI Showcase", href: "/#cards" },
    { label: "Subscription Plans", href: "/pricing" },
    { label: "Register Hospital", href: "/register-hospital" },
  ],
  Organization: [
    { label: "About Us", href: "/about" },
    { label: "Contact Support", href: "/contact" },
    { label: "Frequently Asked Questions", href: "/faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-line dark:border-line-dark bg-cream dark:bg-ink text-foreground">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <span className="logo-mark">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path
                    d="M12 21s-7.5-4.6-9.5-9.2C1 8.2 3.4 5 6.6 5c2 0 3.6 1.1 4.4 2.7L12 9l1-1.3C13.8 6.1 15.4 5 17.4 5 20.6 5 23 8.2 21.5 11.8 19.5 16.4 12 21 12 21Z"
                    fill="currentColor"
                  />
                  <path
                    d="M7 12h3l1.5-3 2 5L15 12h2"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                Arogya <span className="text-teal">HMS</span>
              </span>
            </Link>
            <p className="text-ink-soft dark:text-cream-soft text-sm leading-relaxed mb-6 max-w-xs">
              Calm, human-centric Hospital Management System for healthcare facilities across India.
              From private clinics to multispecialty hospitals — paperless, efficient, compliant.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-ink-soft dark:text-cream-soft">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal" />
                <span>support@arogya.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal" />
                <span>Pune, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-foreground mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-ink-soft dark:text-cream-soft hover:text-teal dark:hover:text-teal-bright transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-line dark:border-line-dark mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft dark:text-cream-soft">
          <p>
            © {new Date().getFullYear()} Arogya HMS · Calm Clinic Theme · All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Engineered with <Heart className="w-3.5 h-3.5 text-coral fill-current" /> for Indian Healthcare
          </p>
        </div>
      </div>
    </footer>
  );
}
