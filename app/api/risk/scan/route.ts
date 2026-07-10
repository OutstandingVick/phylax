import { NextResponse } from "next/server";
import { z } from "zod";
import { holdings, riskyApprovals } from "@/lib/mock/holdings";
import { buildRiskScan } from "@/lib/risk/scoring";

const riskScanSchema = z.object({
  walletAddress: z.string().min(6),
  depth: z.enum(["basic", "deep"]).default("basic"),
  includeApprovals: z.boolean().default(true)
});

export async function POST(request: Request) {
  const parsed = riskScanSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request", issues: parsed.error.flatten() }, { status: 400 });
  }
  const result = buildRiskScan(holdings, parsed.data.includeApprovals ? riskyApprovals : []);
  return NextResponse.json({
    ...result,
    depth: parsed.data.depth,
    walletAddress: parsed.data.walletAddress
  });
}
