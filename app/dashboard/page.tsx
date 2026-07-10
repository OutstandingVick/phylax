import { AlertTriangle, DollarSign, HeartPulse, ShieldAlert } from "lucide-react";
import { AgentJsonPanel } from "@/components/dashboard/agent-json-panel";
import { AlertCard } from "@/components/dashboard/alert-card";
import { BillingCard } from "@/components/dashboard/billing-card";
import { HoldingsTable } from "@/components/dashboard/holdings-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { RebalanceCard } from "@/components/dashboard/rebalance-card";
import { RiskRadar } from "@/components/dashboard/risk-radar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { alerts } from "@/lib/mock/alerts";
import { activity, portfolioOverview } from "@/lib/mock/portfolio";
import { holdings } from "@/lib/mock/holdings";
import { formatPct, formatUsd } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted">Autonomous Guardrail Console</p>
          <h1 className="mt-2 font-display text-3xl font-black">Portfolio Guardian Overview</h1>
        </div>
        <p className="text-sm text-muted">Last scanned {new Date(portfolioOverview.lastScannedAt).toLocaleTimeString()}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Portfolio Value" value={formatUsd(portfolioOverview.totalValueUsd)} detail="X Layer wallet monitored" icon={DollarSign} />
        <MetricCard title="24H PnL" value={formatUsd(portfolioOverview.pnl24hUsd)} detail={formatPct(portfolioOverview.pnl24hPct)} icon={HeartPulse} tone="good" />
        <MetricCard title="Risk Score" value={`${portfolioOverview.riskScore}/100`} detail="High incident mode" icon={ShieldAlert} tone="bad" />
        <MetricCard title="Health Status" value={`${portfolioOverview.healthScore}%`} detail="Watch" icon={AlertTriangle} tone="warn" />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <Card><CardHeader><CardTitle>Portfolio Performance</CardTitle></CardHeader><PortfolioChart /></Card>
        <Card><CardHeader><CardTitle>Guardian Insights</CardTitle></CardHeader><RiskRadar /></Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader><CardTitle>Alert Summary</CardTitle></CardHeader>
          <div className="space-y-3">{alerts.slice(0, 3).map((alert) => <AlertCard key={alert.id} alert={alert} />)}</div>
        </Card>
        <Card>
          <CardHeader><CardTitle>Portfolio Holdings</CardTitle></CardHeader>
          <HoldingsTable holdings={holdings} />
        </Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <RebalanceCard compact />
        <BillingCard />
        <Card>
          <CardHeader><CardTitle>Latest Activity</CardTitle></CardHeader>
          <div className="space-y-3">
            {activity.map((item) => (
              <div key={item} className="rounded-lg border border-border bg-surface-soft p-3 text-sm">{item}</div>
            ))}
          </div>
        </Card>
      </div>
      <AgentJsonPanel />
    </div>
  );
}
