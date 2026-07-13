import { ok } from "@/lib/api";

export const dynamic = "force-static";

export async function POST(request: Request) {
  return ok({
    status: "pending_signature",
    policyCheck: "passed",
    simulationOnly: true,
    message: "Execution is simulated in MVP. Real execution requires Agentic Wallet integration."
  }, request);
}
