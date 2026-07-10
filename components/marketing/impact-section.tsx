import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  ["-38%", "Lower Max Drawdown", "Average reduction across monitored portfolios."],
  ["3.6x", "Faster Risk Detection", "Identify critical issues before they impact performance."],
  ["+21%", "Improvement in Portfolio Health", "Stronger risk-adjusted outcomes over time."],
  ["-62%", "Lower Manual Overhead", "Automation-first operations free your team to focus on alpha."]
];

export function ImpactSection() {
  return (
    <section id="security" className="mx-auto max-w-[1440px] px-6 py-2 lg:px-11">
      <div className="grid gap-3 rounded-xl border border-border bg-background/35 p-3 lg:grid-cols-[1.1fr_repeat(4,1fr)_1.1fr]">
        <div className="p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">MEASURABLE IMPACT</p>
          <h2 className="mt-5 font-display text-3xl font-black leading-tight">Better outcomes. By design.</h2>
          <p className="mt-5 text-sm leading-6 text-main">Phylax helps autonomous agents protect capital and compound performance.</p>
        </div>
        {stats.map(([value, label, body], index) => (
            <Card key={label} className="p-5 shadow-none">
              <p className="font-display text-3xl font-black">{value}</p>
              <h3 className="mt-2 text-xs font-black">{label}</h3>
              <p className="mt-3 text-xs leading-5 text-muted">{body}</p>
              <div className="mt-5 flex h-12 items-end gap-1">
                {[28, 44, 32, 58, 47, 72, 64].map((height, bar) => (
                  <span key={bar} className="flex-1 rounded-sm bg-primary/70" style={{ height: `${Math.max(18, height - index * 4)}%` }} />
                ))}
              </div>
            </Card>
        ))}
        <Card className="relative overflow-hidden p-6 shadow-none">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <p className="mt-5 font-display text-lg font-bold leading-6">Phylax gives our agents the confidence to act with guardrails built into every decision.</p>
          <p className="mt-4 text-xs font-bold text-muted">— Marcus Moore<br />Head of DeFi Strategies<br />Phylax Capital</p>
          <ShieldCheck className="absolute -bottom-8 -right-5 h-28 w-28 text-primary opacity-15" />
        </Card>
      </div>
    </section>
  );
}
