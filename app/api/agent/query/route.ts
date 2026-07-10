import { NextResponse } from "next/server";
import { agentQuerySchema } from "@/lib/agent/schema";
import { routeAgentIntent } from "@/lib/agent/intent-router";

export async function POST(request: Request) {
  const parsed = agentQuerySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request", issues: parsed.error.flatten() }, { status: 400 });
  }
  const response = routeAgentIntent(parsed.data);
  const status = "status" in response && typeof response.status === "number" ? response.status : 200;
  return NextResponse.json(response, { status });
}
