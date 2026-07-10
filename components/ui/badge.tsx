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
    good: "border-primary/40 bg-primary/15 text-primary-soft",
    warn: "border-warning/40 bg-warning/15 text-warning",
    bad: "border-accent/40 bg-accent/15 text-accent"
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
