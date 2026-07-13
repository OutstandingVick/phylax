import { alerts } from "@/lib/mock/alerts";
import { ok } from "@/lib/api";

export const dynamic = "force-static";

export async function GET(request: Request) {
  return ok({ alerts }, request);
}
