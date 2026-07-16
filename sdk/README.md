# `@phylax/sdk`

Zero-dependency client and CLI for Phylax execution preflights and signed risk attestations.

## Client

```js
import { createPhylaxClient } from "@phylax/sdk";

const phylax = createPhylaxClient();
const result = await phylax.preflight({
  requestingAgentId: "portfolio_agent_01",
  walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  proposedAction: {
    type: "swap",
    from: "USDC",
    to: "TSLA.x",
    amountUsd: 10000,
    slippagePct: 0.21,
    chainId: 196
  },
  policy: {
    maxSingleAssetExposurePct: 30,
    maxSlippagePct: 0.5
  }
});

if (result.attestation) {
  await phylax.verifyAttestation(result.attestation);
}
```

## CLI

```bash
node cli.mjs preflight \
  --wallet 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb \
  --from USDC \
  --to TSLA.x \
  --amount 10000
```

The CLI exits with status `2` when Phylax blocks an action, making it suitable for execution pipelines.

## Live OKX evidence bridge

The repository includes `examples/okx-live-preflight.mjs`. It runs a read-only public-address portfolio query through a locally installed Onchain OS CLI, converts balances and prices into a provenance-labelled snapshot, and sends that snapshot to Phylax.

Risk attributes unavailable from the balance response use neutral placeholders and are explicitly marked low-confidence. Wallet credentials are never sent to Phylax.
