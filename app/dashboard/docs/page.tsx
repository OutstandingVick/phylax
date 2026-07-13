import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sections = [
  ["Overview", "Phylax exposes agent-readable portfolio risk, approval risk, rebalance simulation, and preflight endpoints."],
  ["Authentication", "Use Bearer API keys. Never send private keys. Demo mode accepts mocked requests only."],
  ["Agent intents", "portfolio.scan, approval.scan, risk.deep_analysis, rebalance.simulate, execution.preflight, report.generate"],
  ["x402/Upto payment flow", "Deep analysis returns payment_required until an approved payment session is supplied."],
  ["Webhooks", "Register HTTPS URLs for alerts.created, policy.failed, report.ready, and payment.settled."],
  ["Error codes", "400 invalid_request, 402 payment_required, 403 policy_blocked, 500 internal_error"]
];

const request = `POST /api/agent/query
{
  "requestingAgentId": "agent_portfolio_manager_01",
  "intent": "execution.preflight",
  "walletAddress": "0x742d...44e",
  "proposedAction": {
    "type": "swap",
    "from": "USDC",
    "to": "TSLAx",
    "amountUsd": 10000
  },
  "policy": {
    "maxSingleAssetExposurePct": 30,
    "maxSlippagePct": 0.5
  }
}`;

const response = `{
  "decision": "blocked",
  "reason": "Proposed trade would increase TSLAx allocation above policy limit.",
  "riskScoreBefore": 74,
  "riskScoreAfter": 89,
  "confidence": "high"
}`;

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black">Agent/API Docs</h1>
        <p className="mt-2 text-muted">Developer-facing contract for A2MCP-first portfolio guardrails.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map(([title, body]) => <Card key={title}><CardHeader><CardTitle>{title}</CardTitle><Badge>docs</Badge></CardHeader><p className="text-sm leading-6 text-muted">{body}</p></Card>)}
      </div>
      <Card>
        <CardHeader><CardTitle>Endpoints</CardTitle></CardHeader>
        <div className="grid gap-2 text-sm text-muted md:grid-cols-2">
          {["GET /api/portfolio/overview", "GET /api/portfolio/holdings", "POST /api/risk/scan", "POST /api/approvals/scan", "POST /api/rebalance/simulate", "POST /api/rebalance/execute", "POST /api/payments/session", "POST /api/agent/query", "GET /api/reports/:id", "GET /api/alerts", "POST /api/webhooks"].map((endpoint) => <code key={endpoint} className="rounded bg-surface-soft p-3">{endpoint}</code>)}
        </div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Example Request</CardTitle></CardHeader><pre className="overflow-auto rounded-lg bg-surface p-4 text-xs text-primary-soft">{request}</pre></Card>
        <Card><CardHeader><CardTitle>Example Response</CardTitle></CardHeader><pre className="overflow-auto rounded-lg bg-surface p-4 text-xs text-primary-soft">{response}</pre></Card>
      </div>
    </div>
  );
}
