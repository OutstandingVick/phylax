import { z } from "zod";
import { fail, ok } from "@/lib/api";

export const dynamic = "force-static";

const schema = z.object({
  paymentSessionId: z.string().min(5),
  approvedMaxAmount: z.string(),
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
    return fail({ request, status: 400, code: "invalid_request", message: "Payment approval failed validation.", details: parsed.error.flatten() });
  }
  return ok(
    {
      ...parsed.data,
      status: "settled",
      exactMockCharge: "2.18",
      purpose: "risk.deep_analysis",
      demoPayment: true,
      message: "Demo payment cap approved and settled. No onchain settlement was performed."
    },
    request
  );
}
