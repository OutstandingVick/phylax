const stablecoins = new Set(["USDC", "USDT", "USDG", "DAI", "USDE"]);

function categoryFor(symbol, overrides) {
  if (overrides?.[symbol]) return overrides[symbol];
  if (stablecoins.has(symbol.toUpperCase())) return "Stablecoin";
  if (/\.x$/i.test(symbol) || /^[A-Z]{1,6}X$/.test(symbol)) return "xStock";
  return "Cash";
}

export function tokenAssetsFromOnchainOsResponse(response) {
  if (Array.isArray(response?.data?.tokenAssets)) return response.data.tokenAssets;
  if (Array.isArray(response?.data?.details)) return response.data.details.flatMap((detail) => detail.tokenAssets ?? []);
  return [];
}

export function toPhylaxPortfolioSnapshot(tokenAssets, options = {}) {
  const valued = tokenAssets
    .map((asset) => {
      const balance = Number(asset.balance ?? 0);
      const price = Number(asset.tokenPrice ?? 0);
      return { asset, valueUsd: balance * price };
    })
    .filter(({ valueUsd }) => Number.isFinite(valueUsd) && valueUsd > 0);
  const totalValueUsd = valued.reduce((sum, item) => sum + item.valueUsd, 0);
  if (totalValueUsd <= 0) throw new Error("The OKX portfolio response has no positively valued token holdings.");

  return {
    holdings: valued.map(({ asset, valueUsd }) => ({
      symbol: String(asset.symbol || "UNKNOWN"),
      name: String(asset.symbol || "Unknown token"),
      category: categoryFor(String(asset.symbol || ""), options.categories),
      valueUsd: Number(valueUsd.toFixed(2)),
      allocationPct: Number(((valueUsd / totalValueUsd) * 100).toFixed(4)),
      pnl24hPct: 0,
      liquidityScore: 50,
      volatilityScore: 50,
      riskScore: asset.isRiskToken ? 90 : 50,
      confidence: "low"
    })),
    approvals: [],
    observedAt: options.observedAt ?? new Date().toISOString(),
    source: "OKX Onchain OS public-address portfolio; neutral low-confidence risk placeholders",
    sourceUrl: "https://web3.okx.com/onchain-os/dev-docs",
    chainId: options.chainId
  };
}
