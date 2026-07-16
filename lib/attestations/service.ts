import {
  createPrivateKey,
  createPublicKey,
  sign as signBytes,
  verify as verifyBytes,
  type KeyObject
} from "node:crypto";
import { canonicalJson, sha256Digest } from "./canonical-json";

export interface RiskAttestationPayload {
  version: "1";
  attestationId: string;
  issuer: string;
  subject: {
    walletAddress: string;
    requestingAgentId: string;
  };
  intent: "execution.preflight";
  decision: "approved" | "blocked";
  confidence: "low" | "medium" | "high";
  riskScoreBefore: number;
  riskScoreAfter: number;
  policyCheck: "passed" | "failed";
  actionHash: string;
  policyHash: string;
  evidenceHash: string;
  evidence: {
    mode: "demo" | "caller-supplied";
    source: string;
    observedAt: string;
    independentlyVerified: boolean;
    simulationOnly: boolean;
  };
  issuedAt: string;
  expiresAt: string;
  nonce: string;
}

export interface SignedRiskAttestation {
  payload: RiskAttestationPayload;
  signature: {
    algorithm: "Ed25519";
    keyId: string;
    value: string;
  };
}

interface IssueInput {
  walletAddress: string;
  requestingAgentId: string;
  decision: "approved" | "blocked";
  confidence: "low" | "medium" | "high";
  riskScoreBefore: number;
  riskScoreAfter: number;
  policyCheck: "passed" | "failed";
  proposedAction: unknown;
  policy: unknown;
  evidenceSnapshot: unknown;
  evidence: RiskAttestationPayload["evidence"];
  ttlSeconds?: number;
}

interface SigningOptions {
  privateKeyPem?: string;
  issuer?: string;
  now?: Date;
  nonce?: string;
}

function normalizePem(value: string) {
  return value.includes("\\n") ? value.replaceAll("\\n", "\n") : value;
}

function privateKeyFrom(options?: SigningOptions) {
  const pem = options?.privateKeyPem ?? process.env.PHYLAX_ATTESTATION_PRIVATE_KEY;
  if (!pem) return null;
  return createPrivateKey(normalizePem(pem));
}

function keyId(publicKey: KeyObject) {
  const der = publicKey.export({ type: "spki", format: "der" });
  return `phylax_${sha256Digest(der.toString("base64")).slice(0, 16)}`;
}

export function getAttestationPublicKey(options?: SigningOptions) {
  const privateKey = privateKeyFrom(options);
  if (!privateKey) return null;
  const publicKey = createPublicKey(privateKey);
  return {
    keyId: keyId(publicKey),
    algorithm: "Ed25519" as const,
    pem: publicKey.export({ type: "spki", format: "pem" }).toString(),
    jwk: publicKey.export({ format: "jwk" })
  };
}

export function issueRiskAttestation(input: IssueInput, options?: SigningOptions): SignedRiskAttestation | null {
  const privateKey = privateKeyFrom(options);
  if (!privateKey) return null;

  const now = options?.now ?? new Date();
  const ttlSeconds = Math.min(Math.max(input.ttlSeconds ?? 300, 30), 900);
  const publicKey = createPublicKey(privateKey);
  const payload: RiskAttestationPayload = {
    version: "1",
    attestationId: `att_${crypto.randomUUID()}`,
    issuer: options?.issuer ?? process.env.PHYLAX_ISSUER_URL ?? "https://phylax-ivory.vercel.app",
    subject: {
      walletAddress: input.walletAddress,
      requestingAgentId: input.requestingAgentId
    },
    intent: "execution.preflight",
    decision: input.decision,
    confidence: input.confidence,
    riskScoreBefore: input.riskScoreBefore,
    riskScoreAfter: input.riskScoreAfter,
    policyCheck: input.policyCheck,
    actionHash: sha256Digest(input.proposedAction),
    policyHash: sha256Digest(input.policy),
    evidenceHash: sha256Digest(input.evidenceSnapshot),
    evidence: input.evidence,
    issuedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + ttlSeconds * 1000).toISOString(),
    nonce: options?.nonce ?? crypto.randomUUID()
  };
  const signature = signBytes(null, Buffer.from(canonicalJson(payload)), privateKey).toString("base64url");
  return {
    payload,
    signature: {
      algorithm: "Ed25519",
      keyId: keyId(publicKey),
      value: signature
    }
  };
}

export function verifyRiskAttestation(
  attestation: SignedRiskAttestation,
  publicKeyPem: string,
  options?: { now?: Date; expectedAction?: unknown; expectedPolicy?: unknown; expectedEvidence?: unknown }
) {
  const reasons: string[] = [];
  if (attestation?.signature?.algorithm !== "Ed25519") reasons.push("unsupported_algorithm");

  const expiresAt = Date.parse(attestation?.payload?.expiresAt ?? "");
  if (!Number.isFinite(expiresAt) || expiresAt <= (options?.now ?? new Date()).getTime()) reasons.push("expired");
  if (options?.expectedAction !== undefined && sha256Digest(options.expectedAction) !== attestation.payload.actionHash) reasons.push("action_mismatch");
  if (options?.expectedPolicy !== undefined && sha256Digest(options.expectedPolicy) !== attestation.payload.policyHash) reasons.push("policy_mismatch");
  if (options?.expectedEvidence !== undefined && sha256Digest(options.expectedEvidence) !== attestation.payload.evidenceHash) reasons.push("evidence_mismatch");

  try {
    const publicKey = createPublicKey(normalizePem(publicKeyPem));
    const validSignature = verifyBytes(
      null,
      Buffer.from(canonicalJson(attestation.payload)),
      publicKey,
      Buffer.from(attestation.signature.value, "base64url")
    );
    if (!validSignature) reasons.push("invalid_signature");
    if (attestation.signature.keyId !== keyId(publicKey)) reasons.push("key_id_mismatch");
  } catch {
    reasons.push("invalid_key_or_attestation");
  }

  return { valid: reasons.length === 0, reasons };
}
