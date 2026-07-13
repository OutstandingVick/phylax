# Agent Integration

Primary endpoint: `POST /api/agent/query`

Supported intents:

- `portfolio.scan`
- `approval.scan`
- `risk.deep_analysis`
- `rebalance.simulate`
- `execution.preflight`
- `report.generate`

## Payment Required

`risk.deep_analysis` returns HTTP 402 unless `paymentSessionId` is supplied. Use `POST /api/payments/session`, then `POST /api/payments/approve`. This is a demo payment lifecycle and does not perform onchain settlement.

## Example

```ts
const response = await fetch("/api/agent/query", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    requestingAgentId: "agent_portfolio_manager_01",
    intent: "execution.preflight",
    walletAddress: "0x742d...44e",
    proposedAction: { type: "swap", from: "USDC", to: "TSLAx", amountUsd: 10000 },
    policy: { maxSingleAssetExposurePct: 30, maxSlippagePct: 0.5 }
  })
});
```

Unsafe actions return `decision: "blocked"` with policy blockers and recommended alternatives. Simulation output is labelled `simulationOnly: true`.
