import { nowPlusMinutes } from "@/lib/utils";
import type { PaymentSessionInput, X402PaymentAdapter } from "./service";

export function createX402Session(input: PaymentSessionInput) {
  return {
    paymentSessionId: `pay_${crypto.randomUUID().slice(0, 8)}`,
    type: "x402" as const,
    status: "requires_approval" as const,
    purpose: input.purpose,
    walletAddress: input.walletAddress,
    maxAmount: input.maxAmount,
    currency: input.currency,
    expiresAt: nowPlusMinutes(15),
    demoPayment: true as const
  };
}

export const demoX402PaymentAdapter: X402PaymentAdapter = {
  createSession: createX402Session
};
