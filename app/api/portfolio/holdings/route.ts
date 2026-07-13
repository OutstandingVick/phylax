import { holdings } from "@/lib/mock/holdings";
import { ok } from "@/lib/api";

export async function GET(request: Request) {
  return ok({ holdings }, request);
}
