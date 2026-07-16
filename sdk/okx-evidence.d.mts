export interface OnchainOsTokenAsset {
  symbol?: string;
  balance?: string | number;
  tokenPrice?: string | number;
  isRiskToken?: boolean;
  chainIndex?: string;
  tokenContractAddress?: string;
}

export interface EvidenceHolding {
  symbol: string;
  name: string;
  category: "xStock" | "RWA" | "Stablecoin" | "Cash";
  valueUsd: number;
  allocationPct: number;
  pnl24hPct: number;
  liquidityScore: number;
  volatilityScore: number;
  riskScore: number;
  confidence: "low";
}

export function tokenAssetsFromOnchainOsResponse(response: unknown): OnchainOsTokenAsset[];
export function toPhylaxPortfolioSnapshot(
  tokenAssets: OnchainOsTokenAsset[],
  options?: {
    observedAt?: string;
    chainId?: number;
    categories?: Record<string, EvidenceHolding["category"]>;
  }
): {
  holdings: EvidenceHolding[];
  approvals: [];
  observedAt: string;
  source: string;
  sourceUrl: string;
  chainId?: number;
};
