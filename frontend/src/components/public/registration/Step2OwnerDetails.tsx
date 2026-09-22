"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, ChevronRight } from "lucide-react";

const schema = z.object({
  ownerName:        z.string().min(2, "Name is required"),
  ownerEmail:       z.string().email("Invalid email"),
  ownerPhone:       z.string().regex(/^[6-9][0-9]{9}$/, "Invalid mobile number"),
  ownerDesignation: z.string().optional(),
});

type Step2Data = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<Step2Data>;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export function Step2OwnerDetails({ defaultValues, onNext, onBack }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as Step2Data,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Owner / Admin Details</h2>
        <p className="text-sm text-muted-foreground">The primary contact for this hospital account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
          <input {...register("ownerName")} placeholder="Dr. Priya Sharma"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          {errors.ownerName && <p className="text-critical text-xs mt-1">{errors.ownerName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
          <input {...register("ownerEmail")} type="email" placeholder="priya@cityhospital.com"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          {errors.ownerEmail && <p className="text-critical text-xs mt-1">{errors.ownerEmail.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Mobile *</label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-muted text-muted-foreground text-sm">+91</span>
            <input {...register("ownerPhone")} placeholder="9876543210"
              className="flex-1 px-4 py-3 rounded-r-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          {errors.ownerPhone && <p className="text-critical text-xs mt-1">{errors.ownerPhone.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1.5">Designation <span className="text-muted-foreground text-xs">(optional)</span></label>
          <input {...register("ownerDesignation")} placeholder="Managing Director / Chief Medical Officer"
            className="w-full px-4 py-3 rounded-xl border border-border bg-canvas dark:bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-600 transition-all">
          Next: Select Plan <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
