import { NextResponse } from "next/server";
import { agentQuerySchema } from "@/lib/agent/schema";
import { routeAgentIntent } from "@/lib/agent/intent-router";
import { fail } from "@/lib/api";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail({ request, status: 400, code: "invalid_json", message: "Request body must be valid JSON." });
  }
  const parsed = agentQuerySchema.safeParse(body);
  if (!parsed.success) {
    return fail({ request, status: 400, code: "invalid_request", message: "Agent request failed validation.", details: parsed.error.flatten() });
  }
  const response = routeAgentIntent(parsed.data);
  const status = "status" in response && typeof response.status === "number" ? response.status : 200;
  return NextResponse.json(response, { status });
}
