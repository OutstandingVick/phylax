import { z } from "zod";
import { createUptoSession } from "@/lib/payments/upto-demo";
import { createX402Session } from "@/lib/payments/x402-demo";
import { fail, ok } from "@/lib/api";

export const dynamic = "force-static";

const schema = z.object({
  type: z.enum(["upto", "x402"]),
  purpose: z.string().min(3),
  walletAddress: z.string().min(6),
  maxAmount: z.string(),
  currency: z.string().default("USDC")
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail({ request, status: 400, code: "invalid_json", message: "Request body must be valid JSON." });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return fail({ request, status: 400, code: "invalid_request", message: "Payment session request failed validation.", details: parsed.error.flatten() });
  }
  const session =
    parsed.data.type === "upto" ? createUptoSession(parsed.data) : createX402Session(parsed.data);
  return ok({ ...session, demoPayment: true }, request);
}
