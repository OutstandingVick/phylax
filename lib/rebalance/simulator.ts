import type { Holding, PolicyConstraints, RebalanceSimulation, RebalanceStrategy } from "@/types";
import { calculateHealthScore, calculatePortfolioAllocation } from "@/lib/risk/scoring";
import { alerts } from "@/lib/mock/alerts";

const defaultPolicy: PolicyConstraints = {
  maxSingleAssetExposurePct: 25,
  minStablecoinPct: 20,
  maxSlippagePct: 0.5,
  blockedAssets: [],
  blockStaleData: true,
  blockLowConfidence: true
};

export function simulateRebalance({
  holdings,
  strategy,
  policy = defaultPolicy,
  riskBefore = 74,
  healthBefore = 61
}: {
  holdings: Holding[];
  strategy: RebalanceStrategy;
  policy?: PolicyConstraints;
  riskBefore?: number;
  healthBefore?: number;
}): RebalanceSimulation {
  const afterAllocation = calculatePortfolioAllocation(holdings);
  const tsla = holdings.find((holding) => holding.symbol === "TSLA.x");
  const usdc = holdings.find((holding) => holding.symbol === "USDC");
  const treasury = holdings.find((holding) => holding.symbol === "USTB-3M");

  if (strategy === "defensive" || strategy === "balanced" || strategy === "custom") {
    afterAllocation["TSLA.x"] = Math.min(policy.maxSingleAssetExposurePct, 24.8);
    afterAllocation.USDC = Math.max(policy.minStablecoinPct, 20.4);
    afterAllocation["USTB-3M"] = 15.2;
    afterAllocation["AAPL.x"] = 24.9;
    afterAllocation["NVDA.x"] = 9.7;
    afterAllocation["PRE-RWA"] = 5;
  } else if (strategy === "momentum") {
    afterAllocation["TSLA.x"] = Math.min(policy.maxSingleAssetExposurePct, 25);
    afterAllocation["NVDA.x"] = 16.5;
    afterAllocation.USDC = Math.max(policy.minStablecoinPct, 20);
  } else {
    afterAllocation["TSLA.x"] = 22.5;
    afterAllocation.USDC = 21.3;
    afterAllocation["USTB-3M"] = 16;
  }

  const estimatedSlippagePct = strategy === "momentum" ? 0.28 : 0.21;
  const riskAfter = strategy === "defensive" ? 49 : strategy === "balanced" ? 52 : 56;
  const healthAfter = Math.max(78, calculateHealthScore(riskAfter, alerts, 76));
  const blockedAssets = new Set(policy.blockedAssets ?? []);
  const blockers = [
    estimatedSlippagePct > policy.maxSlippagePct ? "Estimated slippage exceeds policy maximum." : null,
    afterAllocation["TSLA.x"] > policy.maxSingleAssetExposurePct ? "TSLA.x remains above max single-asset exposure." : null,
    holdings.some((holding) => blockedAssets.has(holding.symbol)) ? "Simulation includes a blocked asset." : null,
    policy.blockLowConfidence && holdings.some((holding) => holding.confidence === "low") ? "Low-confidence data blocks execution." : null
  ].filter((item): item is string => Boolean(item));
  const executionAllowed = blockers.length === 0;

  return {
    simulationId: `sim_${strategy.replace(/[^a-z]/g, "_")}_incident_001`,
    strategy,
    beforeAllocation: calculatePortfolioAllocation(holdings),
    afterAllocation,
    riskBefore,
    riskAfter,
    healthBefore,
    healthAfter,
    estimatedFeesUsd: 18.42,
    estimatedSlippagePct,
    actions: [
      {
        type: "sell",
        asset: "TSLA.x",
        amountUsd: tsla ? Math.round(tsla.valueUsd * 0.34) : 31500,
        fromAllocationPct: tsla?.allocationPct,
        toAllocationPct: afterAllocation["TSLA.x"],
        rationale: "Reduce single-asset concentration below the portfolio policy limit."
      },
      {
        type: "buy",
        asset: "USDC",
        amountUsd: usdc ? Math.round(usdc.valueUsd * 1.38) : 28750,
        fromAllocationPct: usdc?.allocationPct,
        toAllocationPct: afterAllocation.USDC,
        rationale: "Increase defensive liquidity for autonomous execution safety."
      },
      {
        type: "buy",
        asset: "USTB-3M",
        amountUsd: treasury ? Math.round(treasury.valueUsd * 0.55) : 13250,
        fromAllocationPct: treasury?.allocationPct,
        toAllocationPct: afterAllocation["USTB-3M"],
        rationale: "Increase lower-volatility RWA basket exposure."
      },
      {
        type: "revoke_approval",
        asset: "USDC",
        rationale: "Remove unlimited approval for unknown spender 0x9ab...991."
      }
    ],
    executionAllowed,
    policyResult: executionAllowed ? "passed" : "failed",
    confidence: "high",
    blockers,
    explanation: "Defensive guardrails lower modeled risk while preserving enough liquidity for future agent actions."
  };
}
