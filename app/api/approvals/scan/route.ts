import { riskyApprovals } from "@/lib/mock/holdings";
import { ok } from "@/lib/api";

export const dynamic = "force-static";

export async function POST(request: Request) {
  return ok(
    {
      riskyApprovals,
      recommendedActions: riskyApprovals.flatMap((approval) => approval.recommendedActions),
      confidence: "medium",
      demoAdapter: true
    },
    request
  );
}
