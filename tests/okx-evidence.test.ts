import assert from "node:assert/strict";
import { tokenAssetsFromOnchainOsResponse, toPhylaxPortfolioSnapshot } from "../sdk/okx-evidence.mjs";

const response = {
  data: {
    details: [
      {
        tokenAssets: [
          { symbol: "TSLA.x", balance: "2", tokenPrice: "300", isRiskToken: false },
          { symbol: "USDC", balance: "400", tokenPrice: "1", isRiskToken: false }
        ]
      }
    ]
  }
};

const assets = tokenAssetsFromOnchainOsResponse(response);
assert.equal(assets.length, 2);
const snapshot = toPhylaxPortfolioSnapshot(assets, { observedAt: "2026-07-16T12:00:00.000Z", chainId: 196 });
assert.equal(snapshot.holdings[0].category, "xStock");
assert.equal(snapshot.holdings[1].category, "Stablecoin");
assert.equal(snapshot.holdings[0].allocationPct, 60);
assert.equal(snapshot.holdings[1].allocationPct, 40);
assert.equal(snapshot.holdings.every((holding) => holding.confidence === "low"), true);
assert.throws(() => toPhylaxPortfolioSnapshot([]), /no positively valued/);

console.log("OKX live evidence bridge tests passed");
