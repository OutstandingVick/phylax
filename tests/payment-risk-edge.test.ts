import assert from "node:assert/strict";
import { createUptoSession } from "@/lib/payments/upto-demo";
import { createX402Session } from "@/lib/payments/x402-demo";
import { calculateRiskScore, detectApprovalRisk, detectConcentrationRisk, getRiskLevel } from "@/lib/risk/scoring";
import { healthyHoldings, riskyApprovals } from "@/lib/mock/holdings";

assert.equal(getRiskLevel(0), "low");
assert.equal(getRiskLevel(30), "low");
assert.equal(getRiskLevel(31), "medium");
assert.equal(getRiskLevel(60), "medium");
assert.equal(getRiskLevel(61), "high");
assert.equal(getRiskLevel(80), "high");
assert.equal(getRiskLevel(81), "critical");
assert.equal(getRiskLevel(100), "critical");

assert.equal(detectConcentrationRisk(healthyHoldings, { maxSingleAssetExposurePct: 30 }).breaches.length, 0);
assert.equal(detectApprovalRisk([]).score, 0);
assert.equal(detectApprovalRisk(riskyApprovals).score >= 90, true);
assert.equal(calculateRiskScore({ marketRisk: 0, liquidityRisk: 0, concentrationRisk: 0, counterpartyRisk: 0, approvalRisk: 0, volatilityRisk: 0, executionRisk: 0, dataConfidence: 100 }), 5);

const input = { purpose: "risk.deep_analysis", walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", maxAmount: "3.00", currency: "USDC" };
const upto = createUptoSession(input);
const x402 = createX402Session(input);
assert.equal(upto.type, "upto");
assert.equal(x402.type, "x402");
assert.equal(upto.status, "requires_approval");
assert.equal(x402.status, "requires_approval");
assert.equal(upto.demoPayment, true);
assert.equal(x402.demoPayment, true);
assert.match(upto.paymentSessionId, /^pay_/);
assert.match(x402.paymentSessionId, /^pay_/);

console.log("payment and risk edge tests passed");
