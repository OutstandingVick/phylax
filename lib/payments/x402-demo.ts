import { nowPlusMinutes } from "@/lib/utils";

export function createX402Session(input: { purpose: string; walletAddress: string; maxAmount: string; currency: string }) {
  return {
    paymentSessionId: `pay_${crypto.randomUUID().slice(0, 8)}`,
    type: "x402",
    status: "requires_approval",
    purpose: input.purpose,
    walletAddress: input.walletAddress,
    maxAmount: input.maxAmount,
    currency: input.currency,
    expiresAt: nowPlusMinutes(15)
  };
}
