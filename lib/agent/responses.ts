import type { AgentIntent, Alert } from "@/types";

export interface AgentResponse {
  requestId: string;
  intent: AgentIntent;
  decision: "approved" | "blocked" | "recommended" | "requires_payment";
  riskScoreBefore?: number;
  riskScoreAfter?: number;
  confidence: "low" | "medium" | "high";
  paymentRequired: boolean;
  blockers: string[];
  alerts: Alert[];
  recommendations: string[];
  policyCheck: "passed" | "failed" | "requires_approval";
  report?: unknown;
  machineReadableSummary: Record<string, unknown>;
  nextActions: string[];
  timestamp?: string;
  dataFreshness?: string;
  simulationOnly?: boolean;
}

export function paymentRequiredResponse(intent: AgentIntent): AgentResponse & {
  error: "payment_required";
  status: 402;
  payment: { type: "upto"; purpose: string; maxAmount: string; currency: "USDC" };
} {
  return {
    error: "payment_required",
    status: 402,
    requestId: `req_${crypto.randomUUID()}`,
    timestamp: new Date().toISOString(),
    intent,
    decision: "requires_payment",
    confidence: "high",
    paymentRequired: true,
    blockers: ["Deep analysis requires an approved x402/Upto payment session."],
    alerts: [],
    recommendations: ["Create a payment session and retry with paymentSessionId."],
    policyCheck: "requires_approval",
    machineReadableSummary: { payment: "required" },
    nextActions: ["POST /api/payments/session"],
    payment: {
      type: "upto",
      purpose: "risk.deep_analysis",
      maxAmount: "3.00",
      currency: "USDC"
    }
  };
}
