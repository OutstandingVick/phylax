import type { Approval, Holding } from "@/types";

export const demoWalletAddress = "0x742d...44e";
export const demoChainId = 196;

export const holdings: Holding[] = [
  {
    symbol: "AAPL.x",
    name: "Apple xStock",
    category: "xStock",
    valueUsd: 62942.77,
    allocationPct: 25.6,
    pnl24hPct: 1.8,
    liquidityScore: 84,
    volatilityScore: 32,
    riskScore: 24,
    confidence: "high"
  },
  {
    symbol: "TSLA.x",
    name: "Tesla xStock",
    category: "xStock",
    valueUsd: 92867.17,
    allocationPct: 37.8,
    pnl24hPct: 8.9,
    liquidityScore: 68,
    volatilityScore: 74,
    riskScore: 78,
    confidence: "medium"
  },
  {
    symbol: "NVDA.x",
    name: "NVIDIA xStock",
    category: "xStock",
    valueUsd: 30218.69,
    allocationPct: 12.3,
    pnl24hPct: 3.1,
    liquidityScore: 79,
    volatilityScore: 58,
    riskScore: 47,
    confidence: "high"
  },
  {
    symbol: "USTB-3M",
    name: "US Treasury 3M",
    category: "RWA",
    valueUsd: 24076.67,
    allocationPct: 9.8,
    pnl24hPct: 0.1,
    liquidityScore: 72,
    volatilityScore: 8,
    riskScore: 14,
    confidence: "high"
  },
  {
    symbol: "PRE-RWA",
    name: "Prime Real Estate",
    category: "RWA",
    valueUsd: 14740.82,
    allocationPct: 6,
    pnl24hPct: 0.4,
    liquidityScore: 45,
    volatilityScore: 18,
    riskScore: 34,
    confidence: "medium"
  },
  {
    symbol: "USDC",
    name: "USD Cash",
    category: "Stablecoin",
    valueUsd: 20834.23,
    allocationPct: 8.5,
    pnl24hPct: 0,
    liquidityScore: 94,
    volatilityScore: 4,
    riskScore: 12,
    confidence: "high"
  }
];

export const healthyHoldings: Holding[] = holdings.map((holding) =>
  holding.symbol === "TSLA.x"
    ? { ...holding, valueUsd: 42125.25, allocationPct: 17.15, riskScore: 38 }
    : holding.symbol === "USDC"
      ? { ...holding, valueUsd: 51438.86, allocationPct: 20.94 }
      : holding
);

export const riskyApprovals: Approval[] = [
  {
    asset: "USDC",
    spender: "0x9ab...991",
    allowance: "unlimited",
    riskLevel: "critical",
    reason: "Unlimited USDC approval granted to an unknown spender with no verified execution policy.",
    recommendedActions: ["Revoke approval", "Rotate to allowlisted spender", "Run deep approval analysis"]
  },
  {
    asset: "TSLA.x",
    spender: "0x4f2...19c",
    allowance: "$18,500",
    riskLevel: "medium",
    reason: "Allowance is near the daily execution cap and should be monitored.",
    recommendedActions: ["Lower allowance", "Require approval for trades above $10,000"]
  }
];
