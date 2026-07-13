import { Card } from "@/components/ui/card";

const agentOutput = {
  decision: "recommended",
  executionAllowed: true,
  policyCheck: "passed",
  riskScoreBefore: 74,
  riskScoreAfter: 49,
  healthBefore: 61,
  healthAfter: 78,
  recommendations: [
    "Reduce TSLA.x allocation below 25%",
    "Increase USDC/RWA defensive allocation",
    "Revoke unlimited USDC approval for 0x9ab...991"
  ]
};

export function AgentJsonPanel() {
  return (
    <Card>
      <div className="mb-4">
        <h3 className="font-display font-bold">Agent-readable Output</h3>
        <p className="mt-1 text-sm text-muted">What another autonomous agent receives before moving capital.</p>
      </div>
      <pre className="max-h-80 overflow-auto rounded-lg border border-border bg-surface p-4 text-xs leading-relaxed text-primary-soft">
        {JSON.stringify(agentOutput, null, 2)}
      </pre>
    </Card>
  );
}
