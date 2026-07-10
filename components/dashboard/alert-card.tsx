import { AlertTriangle, CheckCircle2, CircleDot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Alert } from "@/types";

export function AlertCard({ alert }: { alert: Alert }) {
  const tone = alert.severity === "critical" || alert.severity === "high" ? "bad" : alert.severity === "medium" ? "warn" : "good";
  const Icon = alert.status === "resolved" ? CheckCircle2 : alert.severity === "critical" ? AlertTriangle : CircleDot;
  return (
    <Card className="shadow-none">
      <div className="flex gap-3">
        <Icon className="mt-1 h-5 w-5 text-accent" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-sm font-bold">{alert.title}</h3>
            <Badge tone={tone}>{alert.severity}</Badge>
            <Badge>{alert.status}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted">{alert.description}</p>
          <p className="mt-3 text-sm font-semibold text-main">{alert.recommendedAction}</p>
        </div>
      </div>
    </Card>
  );
}
