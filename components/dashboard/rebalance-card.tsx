"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { holdings } from "@/lib/mock/holdings";
import { simulateRebalance } from "@/lib/rebalance/simulator";
import type { RebalanceStrategy } from "@/types";

export function RebalanceCard({ compact = false }: { compact?: boolean }) {
  const [strategy, setStrategy] = useState<RebalanceStrategy>("defensive");
  const simulation = useMemo(() => simulateRebalance({ holdings, strategy }), [strategy]);
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display font-bold">Rebalance Simulator</h3>
          <p className="mt-1 text-sm text-muted">Simulated execution, policy-controlled.</p>
        </div>
        <select
          value={strategy}
          onChange={(event) => setStrategy(event.target.value as RebalanceStrategy)}
          className="focus-ring rounded-lg border border-border bg-surface-soft px-3 py-2 text-sm"
        >
          <option value="defensive">Defensive</option>
          <option value="balanced">Balanced</option>
          <option value="momentum">Momentum</option>
          <option value="mean-reversion">Mean Reversion</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-surface-soft p-4">
          <p className="text-xs text-muted">Risk</p>
          <div className="mt-2 flex items-center gap-2 font-display text-xl font-black">
            {simulation.riskBefore} <ArrowRight className="h-4 w-4 text-muted" /> <span className="text-primary">{simulation.riskAfter}</span>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface-soft p-4">
          <p className="text-xs text-muted">Health</p>
          <div className="mt-2 flex items-center gap-2 font-display text-xl font-black">
            {simulation.healthBefore}% <ArrowRight className="h-4 w-4 text-muted" /> <span className="text-primary">{simulation.healthAfter}%</span>
          </div>
        </div>
      </div>
      {!compact && (
        <div className="mt-4 space-y-2">
          {simulation.actions.slice(0, 3).map((action) => (
            <div key={`${action.type}-${action.asset}`} className="flex items-center justify-between gap-3 rounded-lg bg-surface-soft p-3 text-sm">
              <span>{action.rationale}</span>
              <Badge tone={action.type === "sell" ? "warn" : "good"}>{action.asset}</Badge>
            </div>
          ))}
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <Button><Play className="h-4 w-4" /> Run Simulation</Button>
        <Button variant="secondary" disabled><ShieldCheck className="h-4 w-4" /> Execute with Guardrails</Button>
      </div>
      <p className="mt-3 text-xs text-muted">Execution is simulated in MVP. Phylax provides risk analysis, not financial advice.</p>
    </Card>
  );
}
