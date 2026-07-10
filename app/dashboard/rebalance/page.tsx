import { RebalanceCard } from "@/components/dashboard/rebalance-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { holdings } from "@/lib/mock/holdings";
import { simulateRebalance } from "@/lib/rebalance/simulator";

export default function RebalancePage() {
  const simulation = simulateRebalance({ holdings, strategy: "defensive" });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black">Rebalancing</h1>
        <p className="mt-2 text-muted">Compare before/after allocation, risk, health, fees, slippage, and policy checks.</p>
      </div>
      <RebalanceCard />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Before Allocation</CardTitle></CardHeader>
          {Object.entries(simulation.beforeAllocation).map(([asset, pct]) => <p key={asset} className="flex justify-between border-b border-border py-2 text-sm"><span>{asset}</span><b>{pct}%</b></p>)}
        </Card>
        <Card>
          <CardHeader><CardTitle>After Allocation</CardTitle><Badge tone="good">{simulation.policyResult}</Badge></CardHeader>
          {Object.entries(simulation.afterAllocation).map(([asset, pct]) => <p key={asset} className="flex justify-between border-b border-border py-2 text-sm"><span>{asset}</span><b>{pct}%</b></p>)}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-surface-soft p-3">Fees <b className="block">${simulation.estimatedFeesUsd}</b></div>
            <div className="rounded-lg bg-surface-soft p-3">Slippage <b className="block">{simulation.estimatedSlippagePct}%</b></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
