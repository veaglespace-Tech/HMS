"use client";

import { ChevronLeft, ChevronRight, Upload, FileText } from "lucide-react";

interface Props {
  hospitalId: string | null;
  onNext: (data: {}) => void;
  onBack: () => void;
}

const DOC_TYPES = [
  { key: "registration_cert", label: "Hospital Registration Certificate", required: true },
  { key: "gst_cert",          label: "GST Certificate",                   required: false },
  { key: "owner_id",          label: "Owner ID Proof (Aadhaar/PAN)",      required: false },
];

export function Step4Documents({ hospitalId, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Upload Documents</h2>
        <p className="text-sm text-muted-foreground">
          Upload supporting documents for verification. Documents speed up the approval process.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-info/5 p-4 text-sm text-info">
        ℹ️ Your registration has been submitted (ID: {hospitalId}). Document upload is optional — you can also upload them later from your dashboard after approval.
      </div>

      <div className="flex flex-col gap-4">
        {DOC_TYPES.map((doc) => (
          <div key={doc.key} className="p-5 rounded-xl border border-border bg-canvas dark:bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{doc.label}</p>
                {!doc.required && <p className="text-xs text-muted-foreground">Optional</p>}
              </div>
            </div>
            <label className="flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload PDF or Image</span>
              <input type="file" accept="image/*,.pdf" className="hidden" />
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button type="button" onClick={() => onNext({})}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-600 transition-all">
          Continue to Verify Email <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
