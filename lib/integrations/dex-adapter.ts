export interface DexAdapter {
  getQuote(input: { from: string; to: string; amountUsd: number }): Promise<{ outputAmountUsd: number; slippagePct: number }>;
  simulateSwap(input: unknown): Promise<{ safe: boolean; estimatedFeesUsd: number }>;
  buildSwapTransaction(input: unknown): Promise<{ tx: unknown; simulationOnly: true }>;
  executeSwap(input: unknown): Promise<{ disabled: true; message: string; input: unknown }>;
}

export const dexAdapter: DexAdapter = {
  async getQuote(input) {
    return { outputAmountUsd: input.amountUsd * 0.9979, slippagePct: 0.21 };
  },
  async simulateSwap() {
    return { safe: true, estimatedFeesUsd: 18.42 };
  },
  async buildSwapTransaction(input) {
    return { tx: input, simulationOnly: true };
  },
  async executeSwap(input) {
    return { disabled: true, message: "Real swap execution is disabled in the MVP.", input };
  }
};
