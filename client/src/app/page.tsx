import Link from "next/link";
import { ArrowRight, Shield, Clock, Users, Activity } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-24 pb-32">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Next-Generation Healthcare Management
            </div>
            
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">
              Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Patient Care</span> Through Digital Innovation
            </h1>
            
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              VeagleHMS integrates every aspect of hospital operations—from patient registration and electronic health records to billing and pharmacy—into one seamless, intelligent platform.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 h-14 text-base shadow-xl shadow-primary/20 transition-all hover:scale-105")}>
                Patient Portal <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/login" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full px-8 h-14 text-base backdrop-blur-sm transition-all hover:bg-primary/5")}>
                Staff Login
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Integrated Healthcare Solutions</h2>
              <p className="mt-4 text-muted-foreground">Everything you need to manage a modern medical facility.</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Patient Management",
                  desc: "Streamlined registration, appointments, and electronic health records with secure access."
                },
                {
                  icon: <Activity className="h-10 w-10 text-primary" />,
                  title: "Clinical Excellence",
                  desc: "Advanced tools for doctors and nurses to monitor vitals, prescribe medication, and track history."
                },
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Secure & Compliant",
                  desc: "Role-based access control and comprehensive audit trails ensuring patient data privacy."
                }
              ].map((feature, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl border bg-card p-8 transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
