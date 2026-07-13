import { riskyApprovals } from "@/lib/mock/holdings";
import { ok } from "@/lib/api";

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
