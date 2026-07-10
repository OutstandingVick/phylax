import Link from "next/link";
import { cn } from "@/lib/utils";
import { PhylaxMark } from "./phylax-mark";

export function PhylaxLogo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("focus-ring inline-flex items-center gap-3 rounded-md", className)}>
      <PhylaxMark className="h-10 w-9" />
      <span className="brand-wordmark text-[1.05rem] text-main">
        PHYL<span className="brand-wordmark-a">A</span>X
      </span>
    </Link>
  );
}
