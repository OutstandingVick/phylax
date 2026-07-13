import type { PolicyConstraints } from "@/types";

export function evaluateRebalancePolicy(input: {
  afterAllocation: Record<string, number>;
  estimatedSlippagePct: number;
  policy: PolicyConstraints;
}) {
  const blockers = [
    input.estimatedSlippagePct > input.policy.maxSlippagePct ? "Estimated slippage exceeds policy maximum." : null,
    Object.entries(input.afterAllocation).some(([symbol, pct]) => symbol !== "USDC" && pct > input.policy.maxSingleAssetExposurePct)
      ? "Target allocation exceeds max single-asset exposure."
      : null,
    (input.afterAllocation.USDC ?? 0) < input.policy.minStablecoinPct ? "Stablecoin allocation is below minimum policy." : null
  ].filter((item): item is string => Boolean(item));

  return {
    policyCheck: blockers.length === 0 ? ("passed" as const) : ("failed" as const),
    executionAllowed: blockers.length === 0,
    blockers
  };
}
