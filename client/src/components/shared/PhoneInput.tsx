import React from "react";
import { cn } from "@/lib/utils";

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  error,
  className,
  placeholder = "98765 43210",
  ...props
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and format
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange(cleaned);
  };

  return (
    <div
      className={cn(
        "flex h-11 w-full rounded-xl border bg-background overflow-hidden transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        error ? "border-destructive" : "border-input",
        className
      )}
    >
      <div className="flex items-center gap-1.5 px-3.5 bg-muted border-r border-input text-xs font-semibold text-muted-foreground select-none">
        <span>🇮🇳</span>
        <span>+91</span>
      </div>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
    </div>
  );
}
