import { alerts } from "@/lib/mock/alerts";
import { ok } from "@/lib/api";

export async function GET(request: Request) {
  return ok({ alerts }, request);
}
