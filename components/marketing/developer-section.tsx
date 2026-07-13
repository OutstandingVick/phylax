"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const code = `const response = await fetch("/api/agent/query", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: \`Bearer \${process.env.PHYLAX_API_KEY}\`,
  },
  body: JSON.stringify({
    requestingAgentId: "portfolio_agent_01",
    intent: "execution.preflight",
    walletAddress: "0x742d...44e",
    proposedAction: {
      type: "swap",
      from: "USDC",
      to: "TSLAx",
      amountUsd: 10000,
    },
    policy: {
      maxSingleAssetExposurePct: 30,
      maxSlippagePct: 0.5,
    },
  }),
});

const decision = await response.json();`;

export function DeveloperSection() {
  const [active, setActive] = useState("Agent");
  return (
    <section id="docs" className="mx-auto grid max-w-[1440px] gap-3 px-6 py-2 lg:grid-cols-[0.9fr_2.15fr_1fr] lg:px-11">
      <div className="rounded-xl border border-border bg-background/35 p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">DEVELOPER FIRST</p>
        <h2 className="mt-5 font-display text-3xl font-black">Add portfolio guardrails to any agent.</h2>
        <p className="mt-4 text-sm leading-6 text-main">Use typed APIs, webhooks and A2MCP-compatible responses to scan portfolios, validate proposed actions and automate risk-aware workflows.</p>
        <a href="/dashboard/docs" className="mt-7 inline-flex text-sm font-black text-primary">Read the documentation →</a>
      </div>
      <Card className="p-5 shadow-none">
        <Tabs tabs={["Agent", "Risk", "Rebalancing", "Payments"]} active={active} onChange={setActive} />
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <pre className="overflow-auto rounded-lg border border-border bg-surface-soft p-5 text-xs leading-6 text-main">{active === "Agent" ? code : `${active}\n\n// Demo endpoints are live locally. OKX, x402, Upto, wallet, and DEX adapters are typed placeholders until verified provider contracts are configured.`}</pre>
          <div className="space-y-3">
            {["Machine-readable decisions", "Policy-aware preflight", "402 payment path"].map((item) => (
              <div key={item} className="rounded-lg border border-border bg-surface-soft p-4">
                <div className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-4 w-4 text-primary" /> {item}</div>
                <p className="mt-2 text-xs text-muted">Portfolio values, policy checks, and event-driven actions.</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card className="relative overflow-hidden p-6 shadow-none">
        <h3 className="font-display font-black">Security posture</h3>
        <div className="mt-8 grid gap-4 text-sm font-semibold">
          {["Non-custodial MVP", "No private-key storage", "Simulation-only execution", "Audit logs"].map((item) => (
            <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {item}</div>
          ))}
        </div>
        <CheckCircle2 className="absolute -bottom-5 -right-5 h-28 w-28 text-primary opacity-15" />
      </Card>
    </section>
  );
}
