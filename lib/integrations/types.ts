import type { AgenticWalletAdapter } from "./agentic-wallet-adapter";
import type { DexAdapter } from "./dex-adapter";
import type { MarketApiAdapter } from "./market-api-adapter";
import type { OkxOnchainOsAdapter } from "./okx-onchainos-adapter";

export type IntegrationMode = "demo" | "live";

export interface PhylaxIntegrations {
  mode: IntegrationMode;
  okxOnchainOS: OkxOnchainOsAdapter;
  agenticWallet: AgenticWalletAdapter;
  marketApi: MarketApiAdapter;
  dex: DexAdapter;
}
