"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Moon,
  Sun,
  ShieldCheck,
  Building2,
  Layers,
  Sparkles,
  Phone,
  Info,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Modules", href: "/#modules" },
  { label: "Facilities", href: "/#facilities" },
  { label: "Compliance", href: "/#compliance" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-cream/90 dark:bg-ink/90 backdrop-blur-md border-b border-line dark:border-line-dark shadow-soft"
          : "bg-cream/60 dark:bg-ink/60 backdrop-blur-xs border-b border-line/40 dark:border-line-dark/40"
      )}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
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
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold tracking-tight text-foreground leading-tight">
                Arogya <span className="text-teal dark:text-teal-bright">HMS</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-ink-soft dark:text-cream-soft hidden sm:block">
                Healthcare Operating System
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] font-medium text-ink-soft dark:text-cream-soft">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-teal dark:hover:text-teal-bright py-1",
                  pathname === link.href
                    ? "text-teal dark:text-teal-bright font-semibold border-b-2 border-teal"
                    : "text-foreground/80 dark:text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="btn btn-ghost btn-icon w-9 h-9"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber" />
                ) : (
                  <Moon className="w-4 h-4 text-ink-soft" />
                )}
              </button>
            )}

            <Link
              href="/login"
              className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-foreground/80 hover:text-foreground transition-colors"
            >
              Staff Login
            </Link>

            <Link
              href="/register-hospital"
              className="btn btn-primary btn-sm text-xs font-semibold shadow-sm"
            >
              Register Hospital
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden btn btn-ghost btn-icon w-9 h-9"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-cream dark:bg-ink border-b border-line dark:border-line-dark shadow-medium"
          >
            <div className="section-container py-5 flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between",
                    pathname === link.href
                      ? "bg-teal/10 text-teal dark:text-teal-bright font-semibold"
                      : "text-foreground/85 hover:bg-muted"
                  )}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-soft dark:text-cream-soft opacity-60" />
                </Link>
              ))}

              <div className="border-t border-line dark:border-line-dark mt-3 pt-4 flex flex-col gap-2.5">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-outline w-full justify-center text-sm py-2.5"
                >
                  Staff Portal Login
                </Link>
                <Link
                  href="/register-hospital"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary w-full justify-center text-sm py-2.5"
                >
                  Register Hospital (30-Day Free Trial)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
