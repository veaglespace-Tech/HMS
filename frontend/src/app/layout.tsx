import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Arogya HMS — Hospital Management System",
    template: "%s | Arogya HMS",
  },
  description:
    "Multi-tenant Hospital Management SaaS for any healthcare facility. " +
    "Clinic, nursing home, multispecialty hospital, diagnostic centre — manage your entire hospital digitally.",
  keywords: ["hospital management", "HMS", "clinic software", "healthcare software", "hospital software India"],
  authors: [{ name: "Arogya HMS" }],
  creator: "Arogya HMS",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Arogya HMS",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
