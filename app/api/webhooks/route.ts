import { z } from "zod";
import { fail, ok } from "@/lib/api";

export const dynamic = "force-static";

const schema = z.object({
  url: z.string().url(),
  events: z.array(z.string()).min(1)
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
    return fail({ request, status: 400, code: "invalid_request", message: "Webhook registration failed validation.", details: parsed.error.flatten() });
  }
  return ok({
    webhookId: `wh_${crypto.randomUUID().slice(0, 8)}`,
    status: "registered",
    simulationOnly: true,
    ...parsed.data
  }, request);
}
