import { ok } from "@/lib/api";
import { getAttestationPublicKey } from "@/lib/attestations/service";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const issuer = process.env.PHYLAX_ISSUER_URL ?? "https://phylax-ivory.vercel.app";
  const key = getAttestationPublicKey();
  return ok(
    {
      product: "Phylax",
      aspId: 6127,
      issuer,
      proofFlow: [
        "Submit an execution.preflight request with an action, policy, and optional portfolio snapshot.",
        "Phylax evaluates concentration, blocked assets, action caps, slippage, freshness, and confidence.",
        "Phylax signs the exact action, policy, evidence hash, decision, and expiry with Ed25519.",
        "Any client verifies the signature through the public key or verification endpoint."
      ],
      endpoints: {
        preflight: `${issuer}/api/agent/query`,
        publicKey: `${issuer}/api/attestations/public-key`,
        verify: `${issuer}/api/attestations/verify`,
        openapi: "https://github.com/outstandingvick/phylax/blob/main/docs/openapi.yaml"
      },
      attestationSigningAvailable: Boolean(key),
      keyId: key?.keyId,
      implemented: [
        "Action-bound and policy-bound signed decisions",
        "Short-lived attestations with explicit evidence provenance",
        "Caller-supplied portfolio and approval snapshots",
        "Deterministic risk and policy evaluation",
        "Machine-readable allow or block decisions"
      ],
      limitations: [
        "Caller-supplied evidence is not independently verified by Phylax.",
        "Execution and payment settlement remain simulation-only in the MVP.",
        "Attestations are purpose-bound and expiring, but one-time consumption requires a durable nonce registry."
      ]
    },
    request
  );
}
