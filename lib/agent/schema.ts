import { z } from "zod";

export const proposedActionSchema = z.object({
  type: z.string(),
  from: z.string().optional(),
  to: z.string().optional(),
  amountUsd: z.number().positive().optional(),
  recipient: z.string().optional(),
  chainId: z.number().positive().optional(),
  slippagePct: z.number().min(0).max(10).optional(),
  transactionDataHash: z.string().optional()
});

const holdingSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(["xStock", "RWA", "Stablecoin", "Cash"]),
  valueUsd: z.number().min(0),
  allocationPct: z.number().min(0).max(100),
  pnl24hPct: z.number(),
  liquidityScore: z.number().min(0).max(100),
  volatilityScore: z.number().min(0).max(100),
  riskScore: z.number().min(0).max(100),
  confidence: z.enum(["low", "medium", "high"])
});

const approvalSchema = z.object({
  asset: z.string().min(1),
  spender: z.string().min(3),
  allowance: z.string().min(1),
  riskLevel: z.enum(["low", "medium", "high", "critical"]),
  reason: z.string().min(1),
  recommendedActions: z.array(z.string())
});

const portfolioSnapshotSchema = z.object({
  holdings: z.array(holdingSchema).min(1),
  approvals: z.array(approvalSchema).optional(),
  observedAt: z.string().min(10),
  source: z.string().min(2),
  sourceUrl: z.string().url().optional(),
  chainId: z.number().positive().optional()
});

export const agentQuerySchema = z.object({
  requestingAgentId: z.string().min(3),
  intent: z.enum([
    "portfolio.scan",
    "approval.scan",
    "risk.deep_analysis",
    "rebalance.simulate",
    "execution.preflight",
    "report.generate"
  ]),
  walletAddress: z.string().min(6),
  proposedAction: proposedActionSchema.optional(),
  policy: z
    .object({
      maxSingleAssetExposurePct: z.number().positive().max(100).default(30),
      maxSlippagePct: z.number().positive().max(10).default(0.5),
      minStablecoinPct: z.number().min(0).max(100).optional(),
      blockedAssets: z.array(z.string()).optional(),
      maxActionUsd: z.number().positive().optional(),
      attestationTtlSeconds: z.number().min(30).max(900).optional(),
      blockStaleData: z.boolean().optional(),
      blockLowConfidence: z.boolean().optional()
    })
    .optional(),
  paymentSessionId: z.string().optional(),
  portfolioSnapshot: portfolioSnapshotSchema.optional()
});

export interface AgentQueryInput {
  requestingAgentId: string;
  intent:
    | "portfolio.scan"
    | "approval.scan"
    | "risk.deep_analysis"
    | "rebalance.simulate"
    | "execution.preflight"
    | "report.generate";
  walletAddress: string;
  proposedAction?: {
    type: string;
    from?: string;
    to?: string;
    amountUsd?: number;
    recipient?: string;
    chainId?: number;
    slippagePct?: number;
    transactionDataHash?: string;
  };
  policy?: {
    maxSingleAssetExposurePct: number;
    maxSlippagePct: number;
    minStablecoinPct?: number;
    blockedAssets?: string[];
    maxActionUsd?: number;
    attestationTtlSeconds?: number;
    blockStaleData?: boolean;
    blockLowConfidence?: boolean;
  };
  paymentSessionId?: string;
  portfolioSnapshot?: import("@/types").PortfolioEvidenceSnapshot;
}
