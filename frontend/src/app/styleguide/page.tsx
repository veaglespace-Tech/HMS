"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Users,
  Bed,
  CreditCard,
  Building2,
  Calendar,
  AlertCircle,
  FileCheck,
  Shield,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/shared/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { FormField } from "@/components/shared/FormField";
import { FileUpload } from "@/components/shared/FileUpload";
import { PhoneInput } from "@/components/shared/PhoneInput";
import { Stepper } from "@/components/shared/Stepper";
import { Skeleton, SkeletonCard, SkeletonTableRow } from "@/components/shared/Skeleton";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface SamplePatient {
  id: string;
  uhid: string;
  name: string;
  ageGender: string;
  doctor: string;
  department: string;
  status: "Admitted" | "Discharged" | "Waiting" | "Triage";
  billAmount: number;
}

const SAMPLE_PATIENTS: SamplePatient[] = [
  { id: "1", uhid: "UHID-2026-00101", name: "Ramesh Sharma", ageGender: "45 / M", doctor: "Dr. Arvind Kulkarni", department: "Cardiology", status: "Admitted", billAmount: 42500 },
  { id: "2", uhid: "UHID-2026-00102", name: "Pooja Patil", ageGender: "32 / F", doctor: "Dr. Sunita Deshmukh", department: "Gynecology", status: "Waiting", billAmount: 850 },
  { id: "3", uhid: "UHID-2026-00103", name: "Anand Gupta", ageGender: "58 / M", doctor: "Dr. Vikram Joshi", department: "General Medicine", status: "Triage", billAmount: 2200 },
  { id: "4", uhid: "UHID-2026-00104", name: "Sneha Jadhav", ageGender: "26 / F", doctor: "Dr. Sunita Deshmukh", department: "Orthopedics", status: "Discharged", billAmount: 18400 },
  { id: "5", uhid: "UHID-2026-00105", name: "Mohammed Shaikh", ageGender: "61 / M", doctor: "Dr. Arvind Kulkarni", department: "Cardiology", status: "Admitted", billAmount: 64200 },
];

const COLUMNS: ColumnDef<SamplePatient>[] = [
  {
    accessorKey: "uhid",
    header: "UHID",
    cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary">{row.original.uhid}</span>,
  },
  {
    accessorKey: "name",
    header: "Patient Name",
    cell: ({ row }) => (
      <div>
        <div className="font-semibold text-foreground">{row.original.name}</div>
        <div className="text-xs text-muted-foreground">{row.original.ageGender}</div>
      </div>
    ),
  },
  {
    accessorKey: "doctor",
    header: "Consultant / Dept",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-foreground">{row.original.doctor}</div>
        <div className="text-xs text-muted-foreground">{row.original.department}</div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.original.status;
      const variant =
        s === "Admitted" ? "info" : s === "Waiting" ? "warning" : s === "Triage" ? "destructive" : "success";
      return <Badge variant={variant as any}>{s}</Badge>;
    },
  },
  {
    accessorKey: "billAmount",
    header: "Outstanding",
    cell: ({ row }) => (
      <span className="font-semibold text-foreground">
        ₹{row.original.billAmount.toLocaleString("en-IN")}
      </span>
    ),
  },
];

export default function StyleguidePage() {
  const [currentStep, setCurrentStep] = useState(2);
  const [phone, setPhone] = useState("9823412345");

  return (
    <div className="min-h-screen bg-canvas dark:bg-background py-10">
      <div className="section-container max-w-6xl space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="warning">Dev Gallery</Badge>
              <span className="text-xs text-muted-foreground">Internal Design System</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Arogya HMS Component Styleguide
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Live interactive preview of all base primitives, shared components, and design tokens.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild size="sm" variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>

        {/* Section 1: Color Tokens */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">1. Design System Color Tokens</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-primary text-primary-foreground shadow-subtle">
              <div className="font-bold text-sm">Primary</div>
              <div className="text-xs opacity-80">Teal 600 (#008B8B)</div>
            </div>
            <div className="p-4 rounded-xl bg-secondary text-secondary-foreground shadow-subtle">
              <div className="font-bold text-sm">Secondary</div>
              <div className="text-xs opacity-80">Slate (#1E293B)</div>
            </div>
            <div className="p-4 rounded-xl bg-accent text-white shadow-subtle">
              <div className="font-bold text-sm">Accent</div>
              <div className="text-xs opacity-80">Amber (#F59E0B)</div>
            </div>
            <div className="p-4 rounded-xl bg-card text-card-foreground border border-border shadow-subtle">
              <div className="font-bold text-sm">Card / Surface</div>
              <div className="text-xs text-muted-foreground">Neutral White/Dark</div>
            </div>
            <div className="p-4 rounded-xl bg-muted text-muted-foreground border border-border">
              <div className="font-bold text-sm">Muted</div>
              <div className="text-xs">Background elements</div>
            </div>
            <div className="p-4 rounded-xl bg-destructive text-destructive-foreground shadow-subtle">
              <div className="font-bold text-sm">Destructive</div>
              <div className="text-xs opacity-80">Rose Red</div>
            </div>
          </div>
        </section>

        {/* Section 2: Buttons & Badges */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">2. Buttons & Badges</h2>
          <div className="flex flex-wrap items-center gap-3 p-6 rounded-2xl border border-border bg-card">
            <Button variant="default">Primary Button</Button>
            <Button variant="accent">Accent Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small Size</Button>
            <Button size="lg">Large CTA</Button>
            <Button disabled>Disabled</Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-6 rounded-2xl border border-border bg-card">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success / Discharged</Badge>
            <Badge variant="warning">Warning / Pending</Badge>
            <Badge variant="info">Info / Admitted</Badge>
            <Badge variant="destructive">Critical / Emergency</Badge>
          </div>
        </section>

        {/* Section 3: Stat Cards */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">3. Stat Cards & Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Active Inpatients"
              value="128"
              delta="+12% today"
              deltaPositive={true}
              icon={Bed}
              subtext="85% occupancy"
            />
            <StatCard
              label="OPD Registrations"
              value="342"
              delta="+5.4% vs last week"
              deltaPositive={true}
              icon={Users}
              subtext="Average wait: 14m"
            />
            <StatCard
              label="Today's Collection"
              value="₹3,48,200"
              delta="+18.2%"
              deltaPositive={true}
              icon={CreditCard}
              subtext="Cash & UPI"
            />
            <StatCard
              label="Emergency Cases"
              value="14"
              delta="-2 cases"
              deltaPositive={false}
              icon={Activity}
              subtext="3 in ICU triage"
            />
          </div>
        </section>

        {/* Section 4: Stepper & Wizard Preview */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">4. Stepper Component</h2>
          <div className="p-8 rounded-2xl border border-border bg-card">
            <Stepper
              steps={[
                { id: 1, label: "Hospital Details" },
                { id: 2, label: "Admin Account" },
                { id: 3, label: "Select Plan" },
                { id: 4, label: "Documents" },
                { id: 5, label: "Verify Email" },
              ]}
              currentStep={currentStep}
              onStepClick={(step) => setCurrentStep(step)}
            />
            <div className="mt-8 flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                disabled={currentStep === 1}
              >
                Previous Step
              </Button>
              <Button
                size="sm"
                onClick={() => setCurrentStep((s) => Math.min(5, s + 1))}
                disabled={currentStep === 5}
              >
                Next Step
              </Button>
            </div>
          </div>
        </section>

        {/* Section 5: Form Elements */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">5. Form Elements & Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border border-border bg-card">
            <FormField label="Hospital Name" required hint="Legal entity name as registered">
              <Input placeholder="e.g. Sanjeevani Multi-Specialty Hospital" />
            </FormField>

            <FormField label="Contact Mobile" required>
              <PhoneInput value={phone} onChange={setPhone} />
            </FormField>

            <div className="md:col-span-2">
              <FormField label="Upload Hospital Registration Certificate (Form B / C)">
                <FileUpload onFileSelect={(file) => console.log("Selected file:", file.name)} />
              </FormField>
            </div>
          </div>
        </section>

        {/* Section 6: Data Table */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">6. TanStack Data Table (OPD/IPD Demo)</h2>
            <Badge variant="info">5 Records</Badge>
          </div>
          <DataTable columns={COLUMNS} data={SAMPLE_PATIENTS} pageSize={3} />
        </section>

        {/* Section 7: Empty State & Loading Skeletons */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">7. Empty State & Skeletons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmptyState
              icon={FileCheck}
              title="No Pending Approvals"
              description="All submitted hospital registrations for today have been reviewed by Super Admin."
              actionLabel="Refresh List"
              onAction={() => alert("Refreshed")}
            />
            <div className="space-y-4">
              <SkeletonCard />
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <SkeletonTableRow />
                <SkeletonTableRow />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
