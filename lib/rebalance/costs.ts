export function estimateRebalanceCosts(amountUsd: number, slippagePct = 0.21) {
  const venueFeeUsd = amountUsd * 0.0005;
  const gasUsd = 0.82;
  return {
    estimatedFeesUsd: Number((venueFeeUsd + gasUsd).toFixed(2)),
    estimatedSlippagePct: slippagePct
  };
}
