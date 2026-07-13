import { ok } from "@/lib/api";

export async function POST(request: Request) {
  return ok({
    status: "pending_signature",
    policyCheck: "passed",
    simulationOnly: true,
    message: "Execution is simulated in MVP. Real execution requires Agentic Wallet integration."
  }, request);
}
