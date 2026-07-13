export type PaymentState =
  | "created"
  | "requires_approval"
  | "approved"
  | "processing"
  | "settled"
  | "failed"
  | "expired"
  | "rejected";

export interface PaymentSessionInput {
  purpose: string;
  walletAddress: string;
  maxAmount: string;
  currency: string;
}

export interface PaymentSessionResult extends PaymentSessionInput {
  paymentSessionId: string;
  type: "x402" | "upto";
  status: PaymentState;
  expiresAt: string;
  demoPayment: boolean;
}

export interface X402PaymentAdapter {
  createSession(input: PaymentSessionInput): PaymentSessionResult;
}

export interface UptoPaymentAdapter {
  createSession(input: PaymentSessionInput): PaymentSessionResult & { estimatedFinalCharge: string };
  approveCap(paymentSessionId: string): { paymentSessionId: string; status: "settled"; exactMockCharge: "2.18"; demoPayment: true };
}
