import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "pending_signature",
    policyCheck: "passed",
    simulationOnly: true,
    message: "Execution is simulated in MVP. Real execution requires Agentic Wallet integration."
  });
}
