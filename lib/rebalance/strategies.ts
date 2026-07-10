import type { RebalanceStrategy } from "@/types";

export const strategyDescriptions: Record<RebalanceStrategy, string> = {
  defensive: "Reduce high-risk concentration and increase stablecoin/RWA allocation.",
  balanced: "Bring the portfolio closer to diversified policy targets.",
  momentum: "Favor positive performance while enforcing max exposure limits.",
  "mean-reversion": "Trim outperformers and rotate into underweighted assets.",
  custom: "Use supplied target allocations while respecting guardrails."
};
