import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── Arogya Design Tokens ───────────────────────────────────────────
        primary: {
          DEFAULT: "#0E7C66",
          50:  "#E6F4F1",
          100: "#C2E4DD",
          200: "#9AD3C8",
          300: "#6EBFB0",
          400: "#3DAD9A",
          500: "#0E7C66",
          600: "#0B6655",
          700: "#084F43",
          800: "#053930",
          900: "#02221D",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F0A202",
          50:  "#FEF7E6",
          100: "#FCEAC1",
          200: "#F9D88A",
          300: "#F6C653",
          400: "#F3B426",
          500: "#F0A202",
          600: "#C88202",
          700: "#A06201",
          800: "#784201",
          900: "#502200",
          foreground: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#0B1A2A",
          50:  "#E8ECF0",
          500: "#0B1A2A",
        },
        canvas: {
          DEFAULT: "#F7F9FB",
        },
        critical: { DEFAULT: "#DC2626", foreground: "#FFFFFF" },
        warning:  { DEFAULT: "#EA580C", foreground: "#FFFFFF" },
        success:  { DEFAULT: "#16A34A", foreground: "#FFFFFF" },
        info:     { DEFAULT: "#2563EB", foreground: "#FFFFFF" },
        neutral:  { DEFAULT: "#475569" },

        // ─── shadcn/ui semantic tokens ────────────────────────────────────
        background:   "hsl(var(--background))",
        foreground:   "hsl(var(--foreground))",
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border:   "hsl(var(--border))",
        input:    "hsl(var(--input))",
        ring:     "hsl(var(--ring))",
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      spacing: {
        // 8px grid
        "0.5": "4px",
        "1":   "8px",
        "1.5": "12px",
        "2":   "16px",
        "2.5": "20px",
        "3":   "24px",
        "4":   "32px",
        "5":   "40px",
        "6":   "48px",
        "8":   "64px",
        "10":  "80px",
        "12":  "96px",
      },
      borderRadius: {
        DEFAULT: "12px",
        sm:   "8px",
        md:   "12px",
        lg:   "16px",
        xl:   "20px",
        "2xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        soft:   "0 1px 3px rgba(11,26,42,0.06), 0 4px 16px rgba(11,26,42,0.06)",
        medium: "0 4px 12px rgba(11,26,42,0.08), 0 16px 40px rgba(11,26,42,0.08)",
        strong: "0 8px 24px rgba(11,26,42,0.12), 0 32px 64px rgba(11,26,42,0.12)",
        glow:   "0 0 0 3px rgba(14,124,102,0.3)",
      },
      animation: {
        "fade-in":    "fadeIn 0.3s ease-out",
        "slide-up":   "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in":   "scaleIn 0.2s ease-out",
        "spin-slow":  "spin 3s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp:   { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        slideDown: { from: { opacity: "0", transform: "translateY(-8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scaleIn:   { from: { opacity: "0", transform: "scale(0.95)" }, to: { opacity: "1", transform: "scale(1)" } },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
