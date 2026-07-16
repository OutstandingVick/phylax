import { getAttestationPublicKey } from "@/lib/attestations/service";
import { ok } from "@/lib/api";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const key = getAttestationPublicKey();
  return ok(
    key
      ? {
          available: true,
          ...key,
          purpose: "Verify short-lived Phylax execution-preflight attestations."
        }
      : {
          available: false,
          purpose: "Attestation signing is disabled until PHYLAX_ATTESTATION_PRIVATE_KEY is configured."
        },
    request,
    { status: key ? 200 : 503 }
  );
}
