import type { AgentResponse } from "./responses";
import type { AgentQueryInput } from "./schema";
import { alerts } from "@/lib/mock/alerts";
import { holdings, riskyApprovals } from "@/lib/mock/holdings";
import { reports } from "@/lib/mock/reports";
import { buildRiskScan } from "@/lib/risk/scoring";
import { simulateRebalance } from "@/lib/rebalance/simulator";
import { paymentRequiredResponse } from "./responses";
import { issueRiskAttestation } from "@/lib/attestations/service";
import { clamp } from "@/lib/utils";

interface RouterContext {
  privateKeyPem?: string;
  issuer?: string;
  now?: Date;
}

function normalizedAsset(value?: string) {
  return value?.toLowerCase().replace(/[^a-z0-9]/g, "") ?? "";
}

function safeObservedAt(value: string | undefined, fallback: Date) {
  if (!value || !Number.isFinite(Date.parse(value))) return new Date(fallback.getTime() - 90_000).toISOString();
  return new Date(value).toISOString();
}

export function routeAgentIntent(input: AgentQueryInput, context: RouterContext = {}): AgentResponse {
  const now = context.now ?? new Date();
  const requestId = `req_${crypto.randomUUID()}`;
  const snapshot = input.portfolioSnapshot;
  const activeHoldings = snapshot?.holdings ?? holdings;
  const activeApprovals = snapshot?.approvals ?? riskyApprovals;
  const observedAt = safeObservedAt(snapshot?.observedAt, now);
  const evidence = {
    mode: snapshot ? ("caller-supplied" as const) : ("demo" as const),
    source: snapshot?.source ?? "phylax-demo-fixture",
    sourceUrl: snapshot?.sourceUrl,
    observedAt,
    independentlyVerified: false
  };
  const baseMeta = {
    timestamp: now.toISOString(),
    dataFreshness: observedAt,
    simulationOnly: true,
    evidence
  };
  const scan = buildRiskScan(activeHoldings, activeApprovals);
  const policy = {
    maxSingleAssetExposurePct: input.policy?.maxSingleAssetExposurePct ?? 30,
    minStablecoinPct: input.policy?.minStablecoinPct ?? 20,
    maxSlippagePct: input.policy?.maxSlippagePct ?? 0.5,
    blockedAssets: input.policy?.blockedAssets ?? [],
    maxActionUsd: input.policy?.maxActionUsd,
    attestationTtlSeconds: input.policy?.attestationTtlSeconds ?? 300,
    blockStaleData: input.policy?.blockStaleData ?? true,
    blockLowConfidence: input.policy?.blockLowConfidence ?? false
  };

  if (input.intent === "risk.deep_analysis" && !input.paymentSessionId) {
    return paymentRequiredResponse(input.intent);
  }

  if (input.intent === "execution.preflight") {
    const blockers: string[] = [];
    const action = input.proposedAction;
    const amountUsd = input.proposedAction?.amountUsd ?? 0;
    const target = normalizedAsset(action?.to);
    const targetHolding = activeHoldings.find((holding) => normalizedAsset(holding.symbol) === target);
    const totalValueUsd = activeHoldings.reduce((sum, holding) => sum + holding.valueUsd, 0);
    const currentExposure = targetHolding?.allocationPct ?? 0;
    const proposedExposure = target && totalValueUsd > 0 ? currentExposure + (amountUsd / totalValueUsd) * 100 : currentExposure;
    const blockedAssets = new Set(policy.blockedAssets.map(normalizedAsset));
    const actionAssets = [action?.from, action?.to].map(normalizedAsset).filter(Boolean);
    const observedAgeMs = now.getTime() - Date.parse(observedAt);

    if (!action) blockers.push("A proposed action is required for execution preflight.");
    if (actionAssets.some((asset) => blockedAssets.has(asset))) blockers.push("Proposed action contains a policy-blocked asset.");
    if (policy.maxActionUsd !== undefined && amountUsd > policy.maxActionUsd) {
      blockers.push(`Proposed action value $${amountUsd.toFixed(2)} exceeds the $${policy.maxActionUsd.toFixed(2)} policy cap.`);
    }
    if ((action?.slippagePct ?? 0) > policy.maxSlippagePct) {
      blockers.push(`Proposed slippage ${(action?.slippagePct ?? 0).toFixed(2)}% exceeds the ${policy.maxSlippagePct.toFixed(2)}% policy limit.`);
    }
    if (target && proposedExposure > policy.maxSingleAssetExposurePct) {
      blockers.push(`Proposed trade would increase ${action?.to} allocation to ${proposedExposure.toFixed(1)}%.`);
    }
    if (policy.blockStaleData && (observedAgeMs < 0 || observedAgeMs > 5 * 60_000)) blockers.push("Portfolio evidence is stale or future-dated.");
    if (policy.blockLowConfidence && scan.confidence === "low") blockers.push("Portfolio evidence confidence is below policy minimum.");

    const blocked = blockers.length > 0;
    const riskDelta = target ? Math.max(0, proposedExposure - policy.maxSingleAssetExposurePct) * 1.5 : 0;
    const riskScoreAfter = Math.round(clamp(scan.riskScore + (blocked ? Math.max(8, riskDelta) : -2)));
    const decision = blocked ? ("blocked" as const) : ("approved" as const);
    const response: AgentResponse = {
      requestId,
      ...baseMeta,
      intent: input.intent,
      decision,
      riskScoreBefore: scan.riskScore,
      riskScoreAfter,
      confidence: scan.confidence,
      paymentRequired: false,
      blockers,
      alerts: blocked ? alerts.slice(0, 2) : [],
      recommendations: blocked
        ? ["Do not execute until all policy blockers are resolved.", "Run a defensive rebalance simulation."]
        : ["Proceed only through the wallet's normal confirmation and simulation controls."],
      policyCheck: blocked ? "failed" : "passed",
      machineReadableSummary: {
        decision,
        reason: blocked ? blockers.join(" ") : "Proposed action is within the supplied policy.",
        evidenceMode: evidence.mode,
        evidenceVerified: evidence.independentlyVerified,
        targetExposureBeforePct: currentExposure,
        targetExposureAfterPct: Number(proposedExposure.toFixed(2))
      },
      nextActions: blocked ? ["rebalance.simulate", "approval.scan"] : ["execute_with_guardrails"]
    };

    const attestation = issueRiskAttestation(
      {
        walletAddress: input.walletAddress,
        requestingAgentId: input.requestingAgentId,
        decision,
        confidence: scan.confidence,
        riskScoreBefore: scan.riskScore,
        riskScoreAfter,
        policyCheck: blocked ? "failed" : "passed",
        proposedAction: action ?? null,
        policy,
        evidenceSnapshot: snapshot ?? { holdings: activeHoldings, approvals: activeApprovals, observedAt, source: evidence.source },
        evidence: { ...evidence, simulationOnly: true },
        ttlSeconds: policy.attestationTtlSeconds
      },
      context
    );
    response.attestationStatus = attestation ? "signed" : "unavailable";
    if (attestation) response.attestation = attestation;
    response.machineReadableSummary.attestationStatus = response.attestationStatus;
    return response;
  }

  if (input.intent === "rebalance.simulate") {
    const simulation = simulateRebalance({ holdings: activeHoldings, strategy: "defensive", policy });
    return {
      requestId,
      ...baseMeta,
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
        "Increase USDC and Treasury/RWA allocation",
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
          "Increase USDC and Treasury/RWA allocation",
          "Revoke unlimited USDC approval for 0x9ab...991"
        ]
      },
      nextActions: ["create_payment_session", "execute_with_guardrails"]
    };
  }

  return {
    requestId,
    ...baseMeta,
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
    approvals: activeApprovals.length,
    evidenceMode: evidence.mode
    },
    nextActions: ["rebalance.simulate", "approval.revoke"]
  };
}
