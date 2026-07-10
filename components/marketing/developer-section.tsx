"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const code = `GET /v1/portfolio/overview
Authorization: Bearer YOUR_API_KEY

{
  "total_value": "245680.35",
  "risk_score": 18,
  "health_status": "98%",
  "pnl_24h": "+10072.45",
  "health_status_text": "healthy"
}`;

export function DeveloperSection() {
  const [active, setActive] = useState("REST API");
  return (
    <section id="docs" className="mx-auto grid max-w-[1440px] gap-3 px-6 py-2 lg:grid-cols-[0.9fr_2.15fr_1fr] lg:px-11">
      <div className="rounded-xl border border-border bg-background/35 p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">DEVELOPER FIRST</p>
        <h2 className="mt-5 font-display text-3xl font-black">Build with Phylax</h2>
        <p className="mt-4 text-sm leading-6 text-main">Power autonomous strategies with APIs, webhooks, and programmable guardrails.</p>
        <a href="/dashboard/docs" className="mt-7 inline-flex text-sm font-black text-primary">Explore Docs →</a>
      </div>
      <Card className="p-5 shadow-none">
        <Tabs tabs={["REST API", "Webhooks", "SDKs", "x402 Integration"]} active={active} onChange={setActive} />
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <pre className="overflow-auto rounded-lg border border-border bg-surface-soft p-5 text-xs leading-6 text-main">{active === "REST API" ? code : `${active}\n\n// Production adapters are typed and ready for OKX/OnchainOS integration.`}</pre>
          <div className="space-y-3">
            {["Real-time Data", "Programmable Guardrails", "Seamless Automation"].map((item) => (
              <div key={item} className="rounded-lg border border-border bg-surface-soft p-4">
                <div className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-4 w-4 text-primary" /> {item}</div>
                <p className="mt-2 text-xs text-muted">Portfolio values, policy checks, and event-driven actions.</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card className="relative overflow-hidden p-6 shadow-none">
        <h3 className="font-display font-black">Trusted & Secure</h3>
        <div className="mt-8 grid gap-4 text-sm font-semibold">
          {["SOC 2 Aligned", "Encrypted in transit & at rest", "Allowlisted Execution", "Audit Logs"].map((item) => (
            <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {item}</div>
          ))}
        </div>
        <CheckCircle2 className="absolute -bottom-5 -right-5 h-28 w-28 text-primary opacity-15" />
      </Card>
    </section>
  );
}
