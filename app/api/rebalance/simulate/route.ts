import { NextResponse } from "next/server";
import { z } from "zod";
import { holdings } from "@/lib/mock/holdings";
import { simulateRebalance } from "@/lib/rebalance/simulator";

const schema = z.object({
  walletAddress: z.string().min(6),
  strategy: z.enum(["defensive", "balanced", "momentum", "mean-reversion", "custom"]).default("defensive"),
  constraints: z.object({
    maxSingleAssetExposurePct: z.number().positive().max(100),
    minStablecoinPct: z.number().min(0).max(100),
    maxSlippagePct: z.number().positive().max(10)
  })
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request", issues: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json(
    simulateRebalance({
      holdings,
      strategy: parsed.data.strategy,
      policy: parsed.data.constraints
    })
  );
}
