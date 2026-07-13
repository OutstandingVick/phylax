import { ok } from "@/lib/api";

export async function GET(request: Request) {
  return ok(
    {
      status: "ok",
      service: "phylax",
      version: "0.1.0",
      adapters: {
        okxOnchainOS: "demo",
        agenticWallet: "demo-disabled-execution",
        marketData: "demo",
        dex: "demo-disabled-execution",
        payments: "demo"
      }
    },
    request
  );
}
