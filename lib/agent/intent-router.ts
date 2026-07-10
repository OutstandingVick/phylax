import type { AgentResponse } from "./responses";
import type { AgentQueryInput } from "./schema";
import { alerts } from "@/lib/mock/alerts";
import { holdings, riskyApprovals } from "@/lib/mock/holdings";
import { reports } from "@/lib/mock/reports";
import { buildRiskScan } from "@/lib/risk/scoring";
import { simulateRebalance } from "@/lib/rebalance/simulator";
import { paymentRequiredResponse } from "./responses";

export function routeAgentIntent(input: AgentQueryInput): AgentResponse {
  const requestId = `req_${crypto.randomUUID()}`;
  const scan = buildRiskScan(holdings, riskyApprovals);
  const policy = {
    maxSingleAssetExposurePct: input.policy?.maxSingleAssetExposurePct ?? 30,
    minStablecoinPct: input.policy?.minStablecoinPct ?? 20,
    maxSlippagePct: input.policy?.maxSlippagePct ?? 0.5
  };

  if (input.intent === "risk.deep_analysis" && !input.paymentSessionId) {
    return paymentRequiredResponse(input.intent);
  }

  if (input.intent === "execution.preflight") {
    const wouldBuyTsla = input.proposedAction?.to?.toLowerCase().includes("tsla");
    const amountUsd = input.proposedAction?.amountUsd ?? 0;
    const proposedExposure = wouldBuyTsla ? 37.8 + (amountUsd / 245680.35) * 100 : 37.8;
    const blocked = proposedExposure > policy.maxSingleAssetExposurePct;
    return {
      requestId,
      intent: input.intent,
      decision: blocked ? "blocked" : "approved",
      riskScoreBefore: 74,
      riskScoreAfter: blocked ? 89 : 70,
      confidence: "high",
      paymentRequired: false,
      blockers: blocked ? [`Proposed trade would increase TSLA.x allocation to ${proposedExposure.toFixed(1)}%.`] : [],
      alerts: blocked ? alerts.slice(0, 2) : [],
      recommendations: blocked
        ? ["Maintain current exposure or reduce TSLA.x allocation.", "Run defensive rebalance simulation."]
        : ["Proceed with slippage guardrails."],
      policyCheck: blocked ? "failed" : "passed",
      machineReadableSummary: {
        decision: blocked ? "blocked" : "approved",
        reason: blocked
          ? `Proposed trade would increase TSLAx allocation to ${proposedExposure.toFixed(1)}%, exceeding policy limit.`
          : "Proposed action is within current policy."
      },
      nextActions: blocked ? ["rebalance.simulate", "approval.scan"] : ["execute_with_guardrails"]
    };
  }

  if (input.intent === "rebalance.simulate") {
    const simulation = simulateRebalance({ holdings, strategy: "defensive", policy });
    return {
      requestId,
      intent: input.intent,
      decision: "recommended",
      riskScoreBefore: simulation.riskBefore,
      riskScoreAfter: simulation.riskAfter,
      confidence: "high",
      paymentRequired: false,
      blockers: [],
      alerts: alerts.slice(0, 3),
      recommendations: [
        "Reduce TSLA.x allocation below 25%",
        "Increase USDC/RWA defensive allocation",
        "Revoke unlimited USDC approval for 0x9ab...991"
      ],
      policyCheck: simulation.policyResult,
      report: simulation,
      machineReadableSummary: {
        decision: "recommended",
        executionAllowed: simulation.executionAllowed,
        policyCheck: simulation.policyResult,
        riskScoreBefore: 74,
        riskScoreAfter: 49,
        healthBefore: 61,
        healthAfter: 78,
        recommendations: [
          "Reduce TSLA.x allocation below 25%",
          "Increase USDC/RWA defensive allocation",
          "Revoke unlimited USDC approval for 0x9ab...991"
        ]
      },
      nextActions: ["create_payment_session", "execute_with_guardrails"]
    };
  }

  return {
    requestId,
    intent: input.intent,
    decision: input.intent === "approval.scan" || input.intent === "portfolio.scan" ? "recommended" : "approved",
    riskScoreBefore: scan.riskScore,
    riskScoreAfter: input.intent === "report.generate" ? 49 : scan.riskScore,
    confidence: scan.confidence,
    paymentRequired: false,
    blockers: input.intent === "approval.scan" ? ["Unlimited USDC approval to unknown spender."] : [],
    alerts: scan.alerts,
    recommendations: [
      "Reduce TSLA.x allocation below 25%",
      "Increase USDC/RWA defensive allocation",
      "Revoke unlimited USDC approval for 0x9ab...991"
    ],
    policyCheck: "passed",
    report: input.intent === "report.generate" ? reports[0] : scan,
    machineReadableSummary: {
      riskScore: scan.riskScore,
      level: scan.level,
      approvals: riskyApprovals.length
    },
    nextActions: ["rebalance.simulate", "approval.revoke"]
  };
}
