import { NextResponse } from "next/server";
import { z } from "zod";
import { createUptoSession } from "@/lib/payments/upto-demo";
import { createX402Session } from "@/lib/payments/x402-demo";

const schema = z.object({
  type: z.enum(["upto", "x402"]),
  purpose: z.string().min(3),
  walletAddress: z.string().min(6),
  maxAmount: z.string(),
  currency: z.string().default("USDC")
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request", issues: parsed.error.flatten() }, { status: 400 });
  }
  const session =
    parsed.data.type === "upto" ? createUptoSession(parsed.data) : createX402Session(parsed.data);
  return NextResponse.json(session);
}
