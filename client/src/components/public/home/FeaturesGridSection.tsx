"use client";

import { motion } from "framer-motion";
import {
  Users, ClipboardList, BedDouble, FlaskConical, Pill, Receipt,
  FileText, Shield, BarChart3, Bell, Truck, Activity
} from "lucide-react";

const features = [
  { icon: Users,         title: "Patient Registry",       desc: "One global patient record. ABHA-linked optionally. Duplicate detection built-in." },
  { icon: ClipboardList, title: "OPD & Triage",           desc: "Digital queue, vitals entry, ICD-10 diagnosis, doctor assignment." },
  { icon: BedDouble,     title: "IPD & Bed Management",   desc: "Admit, ward/bed assignment, transfer, discharge with deposit tracking." },
  { icon: FlaskConical,  title: "Lab & Diagnostics",      desc: "Order tests, upload results, attach reports. Integrated with billing." },
  { icon: Activity,      title: "Radiology",               desc: "X-ray and imaging orders, digital report upload, radiologist notes." },
  { icon: Pill,          title: "Pharmacy",                desc: "Prescription-linked dispensing, inventory management, expiry alerts." },
  { icon: Receipt,       title: "Billing & Payments",      desc: "Itemized bills, deposits, advance, insurance tagging, payment receipts." },
  { icon: FileText,      title: "Discharge & MRD",         desc: "Discharge summary, death certificate, medical records archive." },
  { icon: Shield,        title: "MLC / Accident Cases",    desc: "Auto-create MLC record with FIR number, police station, injury mode." },
  { icon: BarChart3,     title: "Reports & Analytics",     desc: "Daily census, revenue reports, department-wise stats, export to Excel/PDF." },
  { icon: Bell,          title: "Notifications",           desc: "WhatsApp and email notifications for appointments, reports, discharge." },
  { icon: Truck,         title: "Ambulance",               desc: "Dispatch tracking, patient handover records, EMT notes." },
];

export function FeaturesGridSection() {
  return (
    <section className="py-24 bg-white dark:bg-card/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Everything You Need
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            All departments, one system
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            No more disconnected software for each department. Arogya HMS connects
            every workflow from the front desk to the pharmacy to the billing counter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group p-6 rounded-xl bg-canvas dark:bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
