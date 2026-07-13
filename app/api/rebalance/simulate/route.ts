import { z } from "zod";
import { holdings } from "@/lib/mock/holdings";
import { simulateRebalance } from "@/lib/rebalance/simulator";
import { fail, ok } from "@/lib/api";

const schema = z.object({
  walletAddress: z.string().min(6),
  strategy: z.enum(["defensive", "balanced", "momentum", "mean-reversion", "custom"]).default("defensive"),
  constraints: z.object({
    maxSingleAssetExposurePct: z.number().positive().max(100),
    minStablecoinPct: z.number().min(0).max(100),
    maxSlippagePct: z.number().positive().max(10)
  }),
  targetAllocation: z.object({}).optional()
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail({ request, status: 400, code: "invalid_json", message: "Request body must be valid JSON." });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return fail({ request, status: 400, code: "invalid_request", message: "Rebalance simulation request failed validation.", details: parsed.error.flatten() });
  }
  return ok(
    simulateRebalance({
      holdings,
      strategy: parsed.data.strategy,
      policy: parsed.data.constraints
    }),
    request
  );
}
