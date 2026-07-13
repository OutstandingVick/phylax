import { holdings } from "@/lib/mock/holdings";
import { ok } from "@/lib/api";

export const dynamic = "force-static";

export async function GET(request: Request) {
  return ok({ holdings }, request);
}
