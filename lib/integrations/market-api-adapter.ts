export interface MarketApiAdapter {
  getPrice(symbol: string): Promise<number>;
  getLiquidity(symbol: string): Promise<number>;
  getVolatility(symbol: string): Promise<number>;
  getHistoricalPerformance(symbol: string): Promise<Array<{ date: string; value: number }>>;
}

export const marketApiAdapter: MarketApiAdapter = {
  async getPrice(symbol) {
    return symbol.includes("NVDA") ? 128.4 : symbol.includes("TSLA") ? 312.44 : 184.21;
  },
  async getLiquidity(symbol) {
    return symbol.includes("PRE") ? 860_000 : 4_200_000;
  },
  async getVolatility(symbol) {
    return symbol.includes("TSLA") ? 74 : 32;
  },
  async getHistoricalPerformance() {
    return [
      { date: "Jun", value: 100 },
      { date: "Jul", value: 112 }
    ];
  }
};
