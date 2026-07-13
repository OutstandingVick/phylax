import { nowPlusMinutes } from "@/lib/utils";
import type { PaymentSessionInput, UptoPaymentAdapter } from "./service";

export function createUptoSession(input: PaymentSessionInput) {
  return {
    paymentSessionId: `pay_${crypto.randomUUID().slice(0, 8)}`,
    type: "upto" as const,
    status: "requires_approval" as const,
    purpose: input.purpose,
    walletAddress: input.walletAddress,
    maxAmount: input.maxAmount,
    currency: input.currency,
    estimatedFinalCharge: "1.20 - 2.80",
    expiresAt: nowPlusMinutes(15),
    demoPayment: true as const
  };
}

export const demoUptoPaymentAdapter: UptoPaymentAdapter = {
  createSession: createUptoSession,
  approveCap(paymentSessionId) {
    return { paymentSessionId, status: "settled", exactMockCharge: "2.18", demoPayment: true };
  }
};
