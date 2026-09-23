import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaPositive?: boolean;
  icon: LucideIcon;
  subtext?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  delta,
  deltaPositive = true,
  icon: Icon,
  subtext,
  className,
}: StatCardProps) {
  return (
    <div className={cn("p-6 rounded-2xl border border-border bg-card shadow-subtle flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-1.5">
          {value}
        </div>
        {(delta || subtext) && (
          <div className="flex items-center gap-2 text-xs">
            {delta && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-semibold",
                  deltaPositive
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-400"
                )}
              >
                {deltaPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {delta}
              </span>
            )}
            {subtext && <span className="text-muted-foreground">{subtext}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
