import { holdings } from "@/lib/mock/holdings";

export interface OkxOnchainOsAdapter {
  getWalletPortfolio(address: string): Promise<typeof holdings>;
  getTokenRisk(address: string): Promise<{ address: string; riskScore: number }>;
  getMarketData(symbol: string): Promise<{ symbol: string; priceUsd: number; liquidityUsd: number }>;
  getSmartMoneySignals(symbol: string): Promise<{ symbol: string; signal: "neutral" | "accumulating" | "reducing" }>;
  simulateTransaction(tx: unknown): Promise<{ ok: boolean; estimatedGasUsd: number; warnings: string[] }>;
  getTransactionSimulation(tx: unknown): Promise<{ ok: boolean; estimatedGasUsd: number; warnings: string[] }>;
}

export const okxOnchainOsAdapter: OkxOnchainOsAdapter = {
  async getWalletPortfolio() {
    return holdings;
  },
  async getTokenRisk(address) {
    return { address, riskScore: 41 };
  },
  async getMarketData(symbol) {
    return { symbol, priceUsd: symbol.includes("TSLA") ? 312.44 : 184.21, liquidityUsd: 4_800_000 };
  },
  async getSmartMoneySignals(symbol) {
    return { symbol, signal: symbol.includes("TSLA") ? "reducing" : "neutral" };
  },
  async simulateTransaction() {
    return { ok: true, estimatedGasUsd: 0.82, warnings: ["Mock simulation only."] };
  },
  async getTransactionSimulation(tx) {
    return this.simulateTransaction(tx);
  }
};
