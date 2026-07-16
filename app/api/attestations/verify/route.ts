import { fail, ok } from "@/lib/api";
import { getAttestationPublicKey, verifyRiskAttestation, type SignedRiskAttestation } from "@/lib/attestations/service";

export const dynamic = "force-static";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail({ request, status: 400, code: "invalid_json", message: "Request body must be valid JSON." });
  }
  if (!body || typeof body !== "object" || !("attestation" in body)) {
    return fail({ request, status: 400, code: "invalid_request", message: "A signed attestation is required." });
  }

  const key = getAttestationPublicKey();
  if (!key) {
    return fail({ request, status: 503, code: "signing_unavailable", message: "The attestation verification key is not configured." });
  }

  const input = body as {
    attestation: SignedRiskAttestation;
    expectedAction?: unknown;
    expectedPolicy?: unknown;
    expectedEvidence?: unknown;
  };
  const result = verifyRiskAttestation(input.attestation, key.pem, {
    expectedAction: input.expectedAction,
    expectedPolicy: input.expectedPolicy,
    expectedEvidence: input.expectedEvidence
  });
  return ok(
    {
      ...result,
      keyId: key.keyId,
      decision: input.attestation?.payload?.decision,
      attestationId: input.attestation?.payload?.attestationId,
      expiresAt: input.attestation?.payload?.expiresAt,
      warning: "A valid signature proves what Phylax evaluated; evidence trust is described inside the attestation."
    },
    request,
    { status: result.valid ? 200 : 422 }
  );
}
