import { agenticWalletAdapter } from "./agentic-wallet-adapter";
import { dexAdapter } from "./dex-adapter";
import { marketApiAdapter } from "./market-api-adapter";
import { okxOnchainOsAdapter } from "./okx-onchainos-adapter";
import type { PhylaxIntegrations } from "./types";

export function createDemoIntegrations(): PhylaxIntegrations {
  return {
    mode: "demo",
    okxOnchainOS: okxOnchainOsAdapter,
    agenticWallet: agenticWalletAdapter,
    marketApi: marketApiAdapter,
    dex: dexAdapter
  };
}
