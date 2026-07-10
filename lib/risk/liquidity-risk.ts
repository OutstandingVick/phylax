import type { Holding } from "@/types";
import { clamp } from "@/lib/utils";

export function calculateLiquidityRisk(holdings: Holding[]) {
  const weighted = holdings.reduce((sum, holding) => sum + (100 - holding.liquidityScore) * holding.allocationPct, 0) / 100;
  return Math.round(clamp(weighted));
}
