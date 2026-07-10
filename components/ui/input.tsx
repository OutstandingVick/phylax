import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "focus-ring min-h-10 w-full rounded-lg border border-border bg-surface-soft px-3 text-sm text-main placeholder:text-muted",
        className
      )}
      {...props}
    />
  );
}
