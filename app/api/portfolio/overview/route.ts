import { portfolioOverview } from "@/lib/mock/portfolio";
import { ok } from "@/lib/api";

export async function GET(request: Request) {
  return ok(portfolioOverview, request);
}
