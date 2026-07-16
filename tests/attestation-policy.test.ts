import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { canonicalJson, sha256Digest } from "@/lib/attestations/canonical-json";
import { getAttestationPublicKey, issueRiskAttestation, verifyRiskAttestation } from "@/lib/attestations/service";
import { routeAgentIntent } from "@/lib/agent/intent-router";
import { holdings, riskyApprovals } from "@/lib/mock/holdings";

const { privateKey } = generateKeyPairSync("ed25519");
const privateKeyPem = privateKey.export({ type: "pkcs8", format: "pem" }).toString();
const publicKey = getAttestationPublicKey({ privateKeyPem });
assert.ok(publicKey);

const now = new Date("2026-07-16T12:00:00.000Z");
const action = { type: "swap", from: "USDC", to: "TSLA.x", amountUsd: 10000, slippagePct: 0.21 };
const policy = { maxSingleAssetExposurePct: 30, maxSlippagePct: 0.5 };
const evidenceSnapshot = { holdings, approvals: riskyApprovals, observedAt: now.toISOString(), source: "test" };

const signed = issueRiskAttestation(
  {
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    requestingAgentId: "test_agent",
    decision: "blocked",
    confidence: "high",
    riskScoreBefore: 74,
    riskScoreAfter: 89,
    policyCheck: "failed",
    proposedAction: action,
    policy,
    evidenceSnapshot,
    evidence: {
      mode: "caller-supplied",
      source: "test",
      observedAt: now.toISOString(),
      independentlyVerified: false,
      simulationOnly: true
    },
    ttlSeconds: 300
  },
  { privateKeyPem, issuer: "https://test.phylax.dev", now, nonce: "test-nonce" }
);

assert.ok(signed);
assert.equal(verifyRiskAttestation(signed, publicKey.pem, { now, expectedAction: action, expectedPolicy: policy, expectedEvidence: evidenceSnapshot }).valid, true);
assert.deepEqual(verifyRiskAttestation(signed, publicKey.pem, { now: new Date("2026-07-16T12:06:00.000Z") }).reasons, ["expired"]);
assert.deepEqual(verifyRiskAttestation(signed, publicKey.pem, { now, expectedAction: { ...action, amountUsd: 1 } }).reasons, ["action_mismatch"]);

const tampered = structuredClone(signed);
tampered.payload.decision = "approved";
assert.equal(verifyRiskAttestation(tampered, publicKey.pem, { now }).reasons.includes("invalid_signature"), true);

assert.equal(canonicalJson({ z: 1, a: { y: 2, x: 3 } }), canonicalJson({ a: { x: 3, y: 2 }, z: 1 }));
assert.equal(sha256Digest({ b: 2, a: 1 }), sha256Digest({ a: 1, b: 2 }));

const baseRequest = {
  requestingAgentId: "test_agent",
  intent: "execution.preflight" as const,
  walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  proposedAction: { type: "swap", from: "USDC", to: "USDC", amountUsd: 1000, slippagePct: 0.1 },
  policy: { maxSingleAssetExposurePct: 30, maxSlippagePct: 0.5, maxActionUsd: 5000 },
  portfolioSnapshot: evidenceSnapshot
};

const approved = routeAgentIntent(baseRequest, { privateKeyPem, now });
assert.equal(approved.decision, "approved");
assert.equal(approved.attestationStatus, "signed");
assert.ok(approved.attestation);
assert.equal(approved.evidence?.mode, "caller-supplied");

const overCap = routeAgentIntent({ ...baseRequest, proposedAction: { ...baseRequest.proposedAction, amountUsd: 6000 } }, { privateKeyPem, now });
assert.equal(overCap.decision, "blocked");
assert.equal(overCap.blockers.some((blocker) => blocker.includes("policy cap")), true);

const blockedAsset = routeAgentIntent({ ...baseRequest, policy: { ...baseRequest.policy, blockedAssets: ["USDC"] } }, { privateKeyPem, now });
assert.equal(blockedAsset.blockers.some((blocker) => blocker.includes("policy-blocked")), true);

const highSlippage = routeAgentIntent({ ...baseRequest, proposedAction: { ...baseRequest.proposedAction, slippagePct: 2 } }, { privateKeyPem, now });
assert.equal(highSlippage.blockers.some((blocker) => blocker.includes("slippage")), true);

const stale = routeAgentIntent(
  { ...baseRequest, portfolioSnapshot: { ...evidenceSnapshot, observedAt: "2026-07-16T11:00:00.000Z" } },
  { privateKeyPem, now }
);
assert.equal(stale.blockers.some((blocker) => blocker.includes("stale")), true);

const missingAction = routeAgentIntent({ ...baseRequest, proposedAction: undefined }, { privateKeyPem, now });
assert.equal(missingAction.decision, "blocked");
assert.equal(missingAction.blockers[0], "A proposed action is required for execution preflight.");

console.log("attestation and policy tests passed");
