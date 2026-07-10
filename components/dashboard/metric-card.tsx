import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function MetricCard({
  title,
  value,
  detail,
  icon: Icon,
  tone = "neutral"
}: {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: "neutral" | "good" | "warn" | "bad";
}) {
  return (
    <Card className="min-h-36">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-3 font-display text-2xl font-black text-main font-tabular">{value}</p>
        </div>
        <div
          className={cn(
            "grid h-10 w-10 place-items-center rounded-lg border",
            tone === "bad" ? "border-accent/40 bg-accent/10" : tone === "warn" ? "border-warning/40 bg-warning/10" : "border-primary/30 bg-primary/10"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <Badge tone={tone === "neutral" ? "good" : tone} className="mt-4">
        {detail}
      </Badge>
    </Card>
  );
}
