import { z } from "zod";
import { holdings, riskyApprovals } from "@/lib/mock/holdings";
import { buildRiskScan } from "@/lib/risk/scoring";
import { fail, ok } from "@/lib/api";

export const dynamic = "force-static";

const riskScanSchema = z.object({
  walletAddress: z.string().min(6),
  depth: z.enum(["basic", "deep"]).default("basic"),
  includeApprovals: z.boolean().default(true)
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail({ request, status: 400, code: "invalid_json", message: "Request body must be valid JSON." });
  }
  const parsed = riskScanSchema.safeParse(body);
  if (!parsed.success) {
    return fail({ request, status: 400, code: "invalid_request", message: "Risk scan request failed validation.", details: parsed.error.flatten() });
  }
  const result = buildRiskScan(holdings, parsed.data.includeApprovals ? riskyApprovals : []);
  return ok({
    ...result,
    depth: parsed.data.depth,
    walletAddress: parsed.data.walletAddress,
    demoAdapter: true
  }, request);
}
