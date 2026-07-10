import { AlertCard } from "@/components/dashboard/alert-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { alerts } from "@/lib/mock/alerts";

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black">Alert Center</h1>
        <p className="mt-2 text-muted">Filter by severity, inspect recommended actions, and track resolution status.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {["all", "critical", "high", "medium", "low"].map((filter) => <Badge key={filter} tone={filter === "critical" || filter === "high" ? "bad" : filter === "medium" ? "warn" : "neutral"}>{filter}</Badge>)}
      </div>
      <Card>
        <CardHeader><CardTitle>Risky Approval Incident</CardTitle><Badge tone="bad">critical</Badge></CardHeader>
        <p className="text-lg font-bold">Unlimited USDC approval granted to unknown spender 0x9ab...991</p>
        <p className="mt-3 text-muted">Recommended action: revoke approval before allowing further autonomous portfolio execution.</p>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        {alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)}
      </div>
    </div>
  );
}
