import type { Alert, Approval, Holding, PolicyConstraints, RiskFactors, RiskLevel, RiskScanResult } from "@/types";
import { clamp } from "@/lib/utils";
import { alerts as demoAlerts } from "@/lib/mock/alerts";

const weights: Record<keyof RiskFactors, number> = {
  marketRisk: 0.15,
  liquidityRisk: 0.15,
  concentrationRisk: 0.2,
  counterpartyRisk: 0.15,
  approvalRisk: 0.15,
  volatilityRisk: 0.1,
  executionRisk: 0.05,
  dataConfidence: 0.05
};

export function calculateRiskScore(factors: RiskFactors) {
  const weighted = Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + factors[key as keyof RiskFactors] * weight;
  }, 0);
  const confidencePenalty = factors.dataConfidence < 65 ? (65 - factors.dataConfidence) * 0.18 : 0;
  return Math.round(clamp(weighted + confidencePenalty));
}

export function getRiskLevel(score: number): RiskLevel {
  if (score <= 30) return "low";
  if (score <= 60) return "medium";
  if (score <= 80) return "high";
  return "critical";
}

export function calculateHealthScore(riskScore: number, alerts: Alert[], dataConfidence: number) {
  const alertPenalty = alerts.reduce((sum, alert) => {
    if (alert.status === "resolved") return sum;
    return sum + ({ low: 2, medium: 5, high: 9, critical: 14 }[alert.severity] ?? 0);
  }, 0);
  const confidenceBoost = Math.max(0, dataConfidence - 70) * 0.12;
  return Math.round(clamp(100 - riskScore * 0.58 - alertPenalty + confidenceBoost));
}

export function calculatePortfolioAllocation(holdings: Holding[]) {
  return holdings.reduce<Record<string, number>>((acc, holding) => {
    acc[holding.symbol] = Number(holding.allocationPct.toFixed(2));
    return acc;
  }, {});
}

export function detectConcentrationRisk(holdings: Holding[], policy: Pick<PolicyConstraints, "maxSingleAssetExposurePct">) {
  const breaches = holdings.filter((holding) => holding.allocationPct > policy.maxSingleAssetExposurePct);
  const highest = Math.max(...holdings.map((holding) => holding.allocationPct));
  return {
    score: Math.round(clamp(highest * 2.1 + breaches.length * 12)),
    breaches,
    message: breaches.length
      ? `${breaches.map((holding) => holding.symbol).join(", ")} exceeds max exposure.`
      : "No single-asset concentration breach detected."
  };
}

export function detectApprovalRisk(approvals: Approval[]) {
  const score = approvals.reduce((max, approval) => {
    const severity = { low: 20, medium: 48, high: 72, critical: 92 }[approval.riskLevel];
    const unlimitedPenalty = approval.allowance === "unlimited" ? 8 : 0;
    return Math.max(max, severity + unlimitedPenalty);
  }, 0);
  return { score: Math.round(clamp(score)), riskyApprovals: approvals.filter((approval) => approval.riskLevel !== "low") };
}

export function generateRiskAlerts(result: Pick<RiskScanResult, "riskScore" | "factors">): Alert[] {
  const generated = [...demoAlerts];
  if (result.factors.concentrationRisk > 70 && !generated.some((alert) => alert.id === "generated_concentration")) {
    generated.unshift({
      id: "generated_concentration",
      title: "Concentration limit breached",
      severity: "high",
      status: "open",
      description: "Single asset exposure is above policy constraints.",
      recommendedAction: "Run a defensive rebalance simulation.",
      createdAt: new Date().toISOString(),
      source: "risk"
    });
  }
  return generated;
}

export function buildRiskScan(holdings: Holding[], approvals: Approval[]): RiskScanResult {
  const concentration = detectConcentrationRisk(holdings, { maxSingleAssetExposurePct: 25 });
  const approval = detectApprovalRisk(approvals);
  const avgVolatility = holdings.reduce((sum, holding) => sum + holding.volatilityScore * holding.allocationPct, 0) / 100;
  const avgLiquidityRisk = holdings.reduce((sum, holding) => sum + (100 - holding.liquidityScore) * holding.allocationPct, 0) / 100;
  const factors: RiskFactors = {
    marketRisk: 68,
    liquidityRisk: Math.round(clamp(avgLiquidityRisk + 35)),
    concentrationRisk: Math.max(86, concentration.score),
    counterpartyRisk: 61,
    approvalRisk: Math.max(79, approval.score),
    volatilityRisk: Math.round(clamp(avgVolatility + 20)),
    executionRisk: 55,
    dataConfidence: 62
  };
  const riskScore = calculateRiskScore(factors);
  return {
    riskScore,
    level: getRiskLevel(riskScore),
    confidence: "medium",
    factors,
    alerts: generateRiskAlerts({ riskScore, factors })
  };
}
