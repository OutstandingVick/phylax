import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  url: z.string().url(),
  events: z.array(z.string()).min(1)
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_request", issues: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({
    webhookId: `wh_${crypto.randomUUID().slice(0, 8)}`,
    status: "registered",
    simulationOnly: true,
    ...parsed.data
  });
}
