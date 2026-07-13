export type RiskLevel = "low" | "medium" | "high" | "critical";
export type AlertSeverity = "low" | "medium" | "high" | "critical";
export type AlertStatus = "open" | "monitoring" | "resolved";
export type HoldingCategory = "xStock" | "RWA" | "Stablecoin" | "Cash";
export type RebalanceStrategy = "defensive" | "balanced" | "momentum" | "mean-reversion" | "custom";
export type AgentIntent =
  | "portfolio.scan"
  | "approval.scan"
  | "risk.deep_analysis"
  | "rebalance.simulate"
  | "execution.preflight"
  | "report.generate";

export interface Holding {
  symbol: string;
  name: string;
  category: HoldingCategory;
  valueUsd: number;
  allocationPct: number;
  pnl24hPct: number;
  liquidityScore: number;
  volatilityScore: number;
  riskScore: number;
  confidence: "low" | "medium" | "high";
}

export interface PortfolioOverview {
  walletAddress: string;
  chainId: number;
  totalValueUsd: number;
  pnl24hUsd: number;
  pnl24hPct: number;
  riskScore: number;
  healthScore: number;
  lastScannedAt: string;
}

export interface Approval {
  asset: string;
  spender: string;
  allowance: string;
  riskLevel: RiskLevel;
  reason: string;
  recommendedActions: string[];
}

export interface Alert {
  id: string;
  title: string;
  severity: AlertSeverity;
  status: AlertStatus;
  description: string;
  recommendedAction: string;
  createdAt: string;
  source: "risk" | "approval" | "rebalance" | "system";
}

export interface RiskFactors {
  marketRisk: number;
  liquidityRisk: number;
  concentrationRisk: number;
  counterpartyRisk: number;
  approvalRisk: number;
  volatilityRisk: number;
  executionRisk: number;
  dataConfidence: number;
}

export interface RiskScanResult {
  riskScore: number;
  level: RiskLevel;
  confidence: "low" | "medium" | "high";
  factors: RiskFactors;
  alerts: Alert[];
}

export interface PolicyConstraints {
  maxSingleAssetExposurePct: number;
  minStablecoinPct: number;
  maxSlippagePct: number;
  blockedAssets?: string[];
  blockStaleData?: boolean;
  blockLowConfidence?: boolean;
}

export interface RebalanceAction {
  type: "buy" | "sell" | "hold" | "revoke_approval";
  asset: string;
  amountUsd?: number;
  fromAllocationPct?: number;
  toAllocationPct?: number;
  rationale: string;
}

export interface RebalanceSimulation {
  simulationId: string;
  strategy: RebalanceStrategy;
  beforeAllocation: Record<string, number>;
  afterAllocation: Record<string, number>;
  riskBefore: number;
  riskAfter: number;
  healthBefore: number;
  healthAfter: number;
  estimatedFeesUsd: number;
  estimatedSlippagePct: number;
  actions: RebalanceAction[];
  executionAllowed: boolean;
  policyResult: "passed" | "failed" | "requires_approval";
  confidence?: "low" | "medium" | "high";
  blockers?: string[];
  explanation: string;
}
