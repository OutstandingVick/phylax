import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const variants: Record<Variant, string> = {
    primary: "border border-primary/40 bg-primary text-background shadow-glow hover:translate-y-[-1px] hover:opacity-95",
    secondary: "border border-border bg-surface text-main hover:bg-surface-soft",
    ghost: "text-muted hover:bg-surface-soft hover:text-main",
    danger: "border border-accent/40 bg-accent text-background hover:translate-y-[-1px] hover:opacity-95"
  };
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
