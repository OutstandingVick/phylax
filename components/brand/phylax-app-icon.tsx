import { cn } from "@/lib/utils";
import { PhylaxMark } from "./phylax-mark";

export function PhylaxAppIcon({ className }: { className?: string }) {
  return (
    <div className={cn("grid h-10 w-10 place-items-center rounded-xl border border-border bg-background shadow-panel", className)}>
      <PhylaxMark compact className="h-7 w-7" />
    </div>
  );
}
