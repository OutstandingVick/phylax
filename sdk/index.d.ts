export type PhylaxDecision = "approved" | "blocked" | "recommended" | "requires_payment";

export interface ProposedAction {
  type: string;
  from?: string;
  to?: string;
  amountUsd?: number;
  recipient?: string;
  chainId?: number;
  slippagePct?: number;
  transactionDataHash?: string;
}

export interface PhylaxPolicy {
  maxSingleAssetExposurePct?: number;
  maxSlippagePct?: number;
  minStablecoinPct?: number;
  blockedAssets?: string[];
  maxActionUsd?: number;
  attestationTtlSeconds?: number;
  blockStaleData?: boolean;
  blockLowConfidence?: boolean;
}

export interface PreflightInput {
  requestingAgentId: string;
  walletAddress: string;
  proposedAction: ProposedAction;
  policy?: PhylaxPolicy;
  portfolioSnapshot?: Record<string, unknown>;
}

export interface SignedAttestation {
  payload: Record<string, unknown>;
  signature: { algorithm: "Ed25519"; keyId: string; value: string };
}

export interface PreflightResponse {
  requestId: string;
  decision: PhylaxDecision;
  blockers: string[];
  policyCheck: "passed" | "failed" | "requires_approval";
  attestationStatus?: "signed" | "unavailable";
  attestation?: SignedAttestation;
  [key: string]: unknown;
}

export class PhylaxClient {
  constructor(options?: { baseUrl?: string; apiKey?: string });
  preflight(input: PreflightInput): Promise<PreflightResponse>;
  verifyAttestation(attestation: SignedAttestation, expected?: Record<string, unknown>): Promise<Record<string, unknown>>;
  publicKey(): Promise<Record<string, unknown>>;
  evidence(): Promise<Record<string, unknown>>;
}

export function createPhylaxClient(options?: { baseUrl?: string; apiKey?: string }): PhylaxClient;
