import { Bot, CreditCard, Eye, LockKeyhole, Radar, RotateCw } from "lucide-react";
import Link from "next/link";

const features = [
  ["Risk Guardian", "Continuous assessment across market, liquidity, counterparty, and concentration risk.", Radar],
  ["Portfolio Monitoring", "24/7 monitoring with real-time alerts, health scores, and exposure intelligence.", Eye],
  ["Intelligent Rebalancing", "AI-driven simulations to optimize returns and control risk.", RotateCw],
  ["Pay-per-Insight", "Transparent usage-based pricing for insights with no upfront commitments.", CreditCard],
  ["Secure Execution", "Policy-enforced actions through secure checkpoints and allowlisted execution.", LockKeyhole],
  ["Agent-Native", "Built for autonomous agents with APIs, webhooks, and x402 integrations.", Bot]
] as const;

export function FeatureGrid() {
  return (
    <section id="product" className="mx-auto max-w-[1440px] px-6 py-8 lg:px-11">
      <div className="grid gap-0 rounded-xl border border-border bg-background/35 lg:grid-cols-6">
        {features.map(([title, description, Icon]) => (
          <div key={title} className="border-b border-border p-7 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
            <div className="grid h-14 w-14 place-items-center rounded-xl border border-border bg-surface">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-6 font-display text-lg font-bold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-main">{description}</p>
            <Link href="/dashboard/docs" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary">Learn more <span>→</span></Link>
          </div>
        ))}
      </div>
    </section>
  );
}
