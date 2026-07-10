import { z } from "zod";

export const proposedActionSchema = z.object({
  type: z.string(),
  from: z.string().optional(),
  to: z.string().optional(),
  amountUsd: z.number().positive().optional()
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
      minStablecoinPct: z.number().min(0).max(100).optional()
    })
    .optional(),
  paymentSessionId: z.string().optional()
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
  };
  policy?: {
    maxSingleAssetExposurePct: number;
    maxSlippagePct: number;
    minStablecoinPct?: number;
  };
  paymentSessionId?: string;
}
