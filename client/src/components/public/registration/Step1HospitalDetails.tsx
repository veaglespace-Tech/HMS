"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useEffect, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { apiFetch, slugify } from "@/lib/utils";
import { toast } from "sonner";

const schema = z.object({
  name:           z.string().min(3, "Name must be at least 3 characters"),
  type:           z.enum(["CLINIC","POLYCLINIC","NURSING_HOME","MULTISPECIALTY","SUPERSPECIALTY","TRUST","DIAGNOSTIC_CENTRE","DAY_CARE","GOVERNMENT"]),
  slug:           z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, hyphens"),
  registrationNo: z.string().optional(),
  gstin:          z.string().optional(),
  addressLine1:   z.string().optional(),
  city:           z.string().min(2, "City is required"),
  state:          z.string().min(2, "State is required"),
  pincode:        z.string().regex(/^[1-9][0-9]{5}$/, "Invalid pincode"),
  phone:          z.string().regex(/^[6-9][0-9]{9}$/, "Invalid mobile number"),
  email:          z.string().email("Invalid email"),
  bedCount:       z.coerce.number().min(0).optional(),
});

type Step1Data = z.infer<typeof schema>;

const FACILITY_TYPES = [
  { value: "CLINIC",           label: "Clinic" },
  { value: "POLYCLINIC",       label: "Polyclinic" },
  { value: "NURSING_HOME",     label: "Nursing Home" },
  { value: "MULTISPECIALTY",   label: "Multispecialty Hospital" },
  { value: "SUPERSPECIALTY",   label: "Superspecialty Hospital" },
  { value: "TRUST",            label: "Trust / NGO Hospital" },
  { value: "DIAGNOSTIC_CENTRE",label: "Diagnostic Centre" },
  { value: "DAY_CARE",         label: "Day Care Centre" },
  { value: "GOVERNMENT",       label: "Government Facility" },
];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh",
  "Dadra and Nagar Haveli","Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

interface Props {
  defaultValues?: Partial<Step1Data>;
  onNext: (data: Partial<Step1Data>) => void;
}

export function Step1HospitalDetails({ defaultValues, onNext }: Props) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as Step1Data,
  });

  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const name = watch("name");
  const slug = watch("slug");

  // Auto-generate slug from name
  useEffect(() => {
    if (name && name.length >= 3) {
      const auto = slugify(name);
      setValue("slug", auto);
    }
  }, [name, setValue]);

  // Live slug availability check (debounced)
  useEffect(() => {
    if (!slug || slug.length < 3) { setSlugStatus("idle"); return; }
    setSlugStatus("checking");
    const timer = setTimeout(async () => {
      try {
        const res = await apiFetch<{ available: boolean }>(`/api/v1/public/hospital-registrations/check-slug?slug=${slug}`);
        setSlugStatus(res.available ? "available" : "taken");
      } catch {
        setSlugStatus("idle");
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [slug]);

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Hospital Details</h2>
        <p className="text-sm text-muted-foreground">Basic information about your facility</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1.5">Hospital / Clinic Name *</label>
          <input {...register("name")} placeholder="City General Hospital"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          {errors.name && <p className="text-critical text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Facility Type *</label>
          <select {...register("type")}
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">Select type...</option>
            {FACILITY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          {errors.type && <p className="text-critical text-xs mt-1">{errors.type.message}</p>}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            URL Slug *
            <span className="ml-2 text-xs text-muted-foreground font-normal">arogya.in/<strong>{slug || "..."}</strong></span>
          </label>
          <div className="relative">
            <input {...register("slug")} placeholder="city-general-hospital"
              className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 pr-24" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium">
              {slugStatus === "checking" && <span className="text-muted-foreground">Checking…</span>}
              {slugStatus === "available" && <span className="text-success">✓ Available</span>}
              {slugStatus === "taken" && <span className="text-critical">✗ Taken</span>}
            </span>
          </div>
          {errors.slug && <p className="text-critical text-xs mt-1">{errors.slug.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Hospital Email *</label>
          <input {...register("email")} type="email" placeholder="admin@cityhospital.com"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          {errors.email && <p className="text-critical text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Hospital Phone *</label>
          <input {...register("phone")} placeholder="9876543210"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          {errors.phone && <p className="text-critical text-xs mt-1">{errors.phone.message}</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
          <input {...register("addressLine1")} placeholder="Street, Locality"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">City *</label>
          <input {...register("city")} placeholder="Pune"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          {errors.city && <p className="text-critical text-xs mt-1">{errors.city.message}</p>}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">State *</label>
          <select {...register("state")}
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">Select state...</option>
            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <p className="text-critical text-xs mt-1">{errors.state.message}</p>}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Pincode *</label>
          <input {...register("pincode")} placeholder="411001"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          {errors.pincode && <p className="text-critical text-xs mt-1">{errors.pincode.message}</p>}
        </div>

        {/* Bed count */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Number of Beds</label>
          <input {...register("bedCount")} type="number" placeholder="50"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        {/* Registration No (optional) */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Registration No <span className="text-muted-foreground text-xs">(optional)</span></label>
          <input {...register("registrationNo")} placeholder="MH/HOS/2024/12345"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        {/* GSTIN (optional) */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">GSTIN <span className="text-muted-foreground text-xs">(optional)</span></label>
          <input {...register("gstin")} placeholder="27AABCU9603R1ZM"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          {errors.gstin && <p className="text-critical text-xs mt-1">{errors.gstin.message}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={slugStatus === "taken"}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          Next: Owner Details <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
