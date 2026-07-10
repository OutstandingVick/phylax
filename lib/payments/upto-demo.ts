import { nowPlusMinutes } from "@/lib/utils";

export function createUptoSession(input: { purpose: string; walletAddress: string; maxAmount: string; currency: string }) {
  return {
    paymentSessionId: `pay_${crypto.randomUUID().slice(0, 8)}`,
    type: "upto",
    status: "requires_approval",
    purpose: input.purpose,
    walletAddress: input.walletAddress,
    maxAmount: input.maxAmount,
    currency: input.currency,
    estimatedFinalCharge: "1.20 - 2.80",
    expiresAt: nowPlusMinutes(15)
  };
}
