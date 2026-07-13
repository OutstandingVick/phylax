import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  tone = "neutral",
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "good" | "warn" | "bad" }) {
  const tones = {
    neutral: "border-border bg-surface-soft text-muted",
    good: "border-primary/30 bg-primary/10 text-primary",
    warn: "border-warning/35 bg-warning/10 text-warning",
    bad: "border-accent/35 bg-accent/10 text-accent"
  };
  const dots = {
    neutral: "bg-muted",
    good: "bg-primary",
    warn: "bg-warning",
    bad: "bg-accent"
  };
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-bold", tones[tone], className)} {...props}>
      <span className={cn("h-2 w-2 rounded-full", dots[tone])} aria-hidden="true" />
      {children}
    </span>
  );
}
