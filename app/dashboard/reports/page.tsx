import { FileText, ShieldCheck } from "lucide-react";
import { AgentJsonPanel } from "@/components/dashboard/agent-json-panel";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { reports } from "@/lib/mock/reports";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted">Reports</p>
        <h1 className="mt-2 font-display text-3xl font-black">Audit-ready guardian output</h1>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Report History</CardTitle>
            <Badge tone="neutral">Demo data</Badge>
          </CardHeader>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="rounded-lg border border-border bg-surface-soft p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <div>
                      <h2 className="font-bold">{report.title}</h2>
                      <p className="mt-1 text-xs text-muted">{report.createdAt}</p>
                    </div>
                  </div>
                  <Badge tone={report.type === "incident" ? "warn" : "good"}>{report.type}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{report.summary}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Human-readable Incident Report</CardTitle>
            <Badge tone="warn">Simulation-only</Badge>
          </CardHeader>
          <div className="space-y-3 text-sm leading-6 text-muted">
            <p><b className="text-main">Finding:</b> TSLA.x exposure is 37.8%, above the configured 25% policy limit.</p>
            <p><b className="text-main">Security:</b> USDC has an unlimited approval to unknown spender 0x9ab...991.</p>
            <p><b className="text-main">Recommendation:</b> Reduce TSLA.x, increase USDC and Treasury/RWA allocation, and revoke the approval.</p>
            <p className="flex items-center gap-2 rounded-lg border border-border bg-surface-soft p-3 text-main"><ShieldCheck className="h-4 w-4 text-primary" /> Execution remains simulated until a verified wallet adapter is configured.</p>
          </div>
        </Card>
      </div>
      <AgentJsonPanel />
    </div>
  );
}
