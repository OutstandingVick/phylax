import { portfolioOverview } from "@/lib/mock/portfolio";
import { ok } from "@/lib/api";

export const dynamic = "force-static";

export async function GET(request: Request) {
  return ok(portfolioOverview, request);
}
