export interface AgenticWalletAdapter {
  createSession(agentId: string): Promise<{ sessionId: string; agentId: string }>;
  requestSignature(payload: unknown): Promise<{ status: "pending_signature"; payload: unknown }>;
  simulateTransaction(tx: unknown): Promise<{ safe: boolean; warnings: string[] }>;
  policyCheck(policy: unknown, action: unknown): Promise<{ result: "passed" | "failed"; reason?: string }>;
  signWithTEE(tx: unknown): Promise<{ disabled: true; message: string; tx: unknown }>;
}

export const agenticWalletAdapter: AgenticWalletAdapter = {
  async createSession(agentId) {
    return { sessionId: `aws_${crypto.randomUUID().slice(0, 8)}`, agentId };
  },
  async requestSignature(payload) {
    return { status: "pending_signature", payload };
  },
  async simulateTransaction() {
    return { safe: true, warnings: ["Execution is simulated in MVP."] };
  },
  async policyCheck() {
    return { result: "passed" };
  },
  async signWithTEE(tx) {
    return { disabled: true, message: "TEE signing placeholder. Real signing is disabled in MVP.", tx };
  }
};
