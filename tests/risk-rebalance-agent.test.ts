import assert from "node:assert/strict";
import { holdings, riskyApprovals } from "@/lib/mock/holdings";
import { agentQuerySchema } from "@/lib/agent/schema";
import { routeAgentIntent } from "@/lib/agent/intent-router";
import { simulateRebalance } from "@/lib/rebalance/simulator";
import { buildRiskScan, calculateRiskScore, detectConcentrationRisk, getRiskLevel } from "@/lib/risk/scoring";

const score = calculateRiskScore({
  marketRisk: 68,
  liquidityRisk: 72,
  concentrationRisk: 86,
  counterpartyRisk: 61,
  approvalRisk: 79,
  volatilityRisk: 63,
  executionRisk: 55,
  dataConfidence: 62
});
assert.equal(getRiskLevel(18), "low");
assert.equal(getRiskLevel(74), "high");
assert.ok(score >= 60 && score <= 80);

const concentration = detectConcentrationRisk(holdings, { maxSingleAssetExposurePct: 25 });
assert.equal(concentration.breaches.some((holding) => holding.symbol === "TSLA.x"), true);

const scan = buildRiskScan(holdings, riskyApprovals);
assert.equal(scan.level, "high");

const simulation = simulateRebalance({ holdings, strategy: "defensive" });
assert.equal(simulation.executionAllowed, true);
assert.equal(simulation.riskAfter < simulation.riskBefore, true);

const parsed = agentQuerySchema.parse({
  requestingAgentId: "agent_portfolio_manager_01",
  intent: "execution.preflight",
  walletAddress: "0x742d...44e",
  proposedAction: { type: "swap", from: "USDC", to: "TSLAx", amountUsd: 10000 },
  policy: { maxSingleAssetExposurePct: 30, maxSlippagePct: 0.5 }
});
const response = routeAgentIntent(parsed);
assert.equal(response.decision, "blocked");

console.log("risk, rebalance, and agent schema smoke tests passed");
