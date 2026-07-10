import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoldingsTable } from "@/components/dashboard/holdings-table";
import { holdings } from "@/lib/mock/holdings";
import { categoryBreakdown } from "@/lib/mock/portfolio";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black">Portfolio</h1>
        <p className="mt-2 text-muted">Asset allocation, category exposure, and asset-level risk.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle>Holdings</CardTitle><Badge tone="good">Fresh 90s ago</Badge></CardHeader>
          <HoldingsTable holdings={holdings} />
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Allocation</CardTitle></CardHeader>
            <div className="space-y-3">
              {holdings.map((holding) => (
                <div key={holding.symbol}>
                  <div className="mb-1 flex justify-between text-sm"><span>{holding.symbol}</span><span>{holding.allocationPct}%</span></div>
                  <div className="h-2 rounded-full bg-surface-soft"><div className="h-2 rounded-full bg-primary" style={{ width: `${holding.allocationPct}%` }} /></div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader><CardTitle>Category Breakdown</CardTitle><Badge>Confidence: medium</Badge></CardHeader>
            <div className="space-y-3">
              {Object.entries(categoryBreakdown).map(([category, pct]) => (
                <div key={category} className="flex items-center justify-between rounded-lg bg-surface-soft p-3 text-sm">
                  <span>{category}</span><b>{pct.toFixed(1)}%</b>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
