import type { Alert } from "@/types";

export const alerts: Alert[] = [
  {
    id: "alt_exposure_spike",
    title: "Exposure Spike",
    severity: "high",
    status: "open",
    description: "TSLA.x allocation reached 37.8%, exceeding the 25% policy limit.",
    recommendedAction: "Reduce TSLA.x below 25% and rotate into USDC/RWA defensive allocation.",
    createdAt: new Date(Date.now() - 14 * 60_000).toISOString(),
    source: "risk"
  },
  {
    id: "alt_risky_approval",
    title: "Risky Approval",
    severity: "critical",
    status: "open",
    description: "Unlimited USDC approval granted to unknown spender 0x9ab...991.",
    recommendedAction: "Revoke approval before allowing further autonomous execution.",
    createdAt: new Date(Date.now() - 9 * 60_000).toISOString(),
    source: "approval"
  },
  {
    id: "alt_liquidity_shift",
    title: "Liquidity Shift Detected",
    severity: "medium",
    status: "monitoring",
    description: "TSLA.x liquidity confidence moved from high to medium during elevated volatility.",
    recommendedAction: "Use stricter slippage limits for any TSLA.x route.",
    createdAt: new Date(Date.now() - 38 * 60_000).toISOString(),
    source: "risk"
  },
  {
    id: "alt_rebalance",
    title: "Rebalance Suggested",
    severity: "medium",
    status: "monitoring",
    description: "A defensive rebalance lowers modeled risk from 74 to 49.",
    recommendedAction: "Run deep analysis, then execute with guardrails after approval.",
    createdAt: new Date(Date.now() - 52 * 60_000).toISOString(),
    source: "rebalance"
  },
  {
    id: "alt_secured",
    title: "Position Secured",
    severity: "low",
    status: "resolved",
    description: "AAPL.x route passed policy and liquidity checks.",
    recommendedAction: "No action required.",
    createdAt: new Date(Date.now() - 3 * 60 * 60_000).toISOString(),
    source: "system"
  }
];
