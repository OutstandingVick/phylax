import type { PortfolioOverview } from "@/types";
import { demoChainId, demoWalletAddress, holdings } from "./holdings";

export const portfolioOverview: PortfolioOverview = {
  walletAddress: demoWalletAddress,
  chainId: demoChainId,
  totalValueUsd: 245680.35,
  pnl24hUsd: 10072.45,
  pnl24hPct: 4.28,
  riskScore: 74,
  healthScore: 61,
  lastScannedAt: new Date(Date.now() - 90_000).toISOString()
};

export const healthyOverview: PortfolioOverview = {
  ...portfolioOverview,
  riskScore: 18,
  healthScore: 98,
  lastScannedAt: new Date(Date.now() - 45_000).toISOString()
};

export const performanceData = [
  { date: "Jun 10", value: 219000, risk: 28 },
  { date: "Jun 15", value: 224800, risk: 31 },
  { date: "Jun 20", value: 231400, risk: 35 },
  { date: "Jun 25", value: 235200, risk: 41 },
  { date: "Jun 30", value: 239900, risk: 48 },
  { date: "Jul 05", value: 235600, risk: 69 },
  { date: "Jul 09", value: portfolioOverview.totalValueUsd, risk: portfolioOverview.riskScore }
];

export const categoryBreakdown = holdings.reduce<Record<string, number>>((acc, holding) => {
  acc[holding.category] = (acc[holding.category] ?? 0) + holding.allocationPct;
  return acc;
}, {});

export const activity = [
  "Agent preflight blocked TSLA.x concentration increase",
  "Risky USDC approval detected for 0x9ab...991",
  "Defensive rebalance simulation generated",
  "Portfolio health moved to watch status",
  "Webhook delivered to agent_portfolio_manager_01"
];
