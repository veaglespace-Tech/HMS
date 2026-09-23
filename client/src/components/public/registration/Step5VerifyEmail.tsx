"use client";

import { useState } from "react";
import { ChevronLeft, Loader2, RefreshCw, Mail } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/utils";

interface Props {
  hospitalId: string | null;
  email: string;
  onNext: (data: {}) => void;
  onBack: () => void;
}

export function Step5VerifyEmail({ hospitalId, email, onNext, onBack }: Props) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) { setError("Please enter the 6-digit OTP"); return; }
    if (!hospitalId) { setError("Registration ID not found"); return; }
    setIsVerifying(true);
    setError("");
    try {
      await apiFetch(`/api/v1/public/hospital-registrations/${hospitalId}/verify-otp`, {
        method: "POST",
        body: JSON.stringify({ otp }),
      });
      toast.success("Email verified successfully!");
      onNext({});
    } catch (err: any) {
      setError(err.message || "OTP verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!hospitalId) return;
    setIsResending(true);
    try {
      await apiFetch(`/api/v1/public/hospital-registrations/${hospitalId}/verify-email`, {
        method: "POST",
      });
      toast.success("New OTP sent to your email");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Verify Your Email</h2>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit verification code to <strong className="text-foreground">{email}</strong>
        </p>
      </div>

      <div className="max-w-xs mx-auto w-full">
        <label className="block text-sm font-medium text-foreground mb-1.5 text-center">Enter OTP</label>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setError(""); }}
          placeholder="123456"
          className="w-full px-4 py-4 rounded-xl border border-border bg-canvas dark:bg-background text-foreground text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {error && <p className="text-critical text-sm mt-2 text-center">{error}</p>}
      </div>

      <div className="text-center">
        <button type="button" onClick={handleResend} disabled={isResending}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          {isResending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Resend OTP
        </button>
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button type="button" onClick={handleVerify} disabled={isVerifying || otp.length !== 6}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-600 transition-all disabled:opacity-50">
          {isVerifying ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</> : "Verify & Complete"}
        </button>
      </div>
    </div>
  );
}
