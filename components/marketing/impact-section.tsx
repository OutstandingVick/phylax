import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  ["38%", "Lower Simulated Max Drawdown", "Demo scenario result from the incident model."],
  ["3.6x", "Faster Incident Detection", "Modelled impact against manual review flow."],
  ["21%", "Improvement in Portfolio Health", "Demo scenario result after defensive simulation."],
  ["62%", "Lower Manual Review Overhead", "Modelled operational impact for agent workflows."]
];

export function ImpactSection() {
  return (
    <section id="security" className="mx-auto max-w-[1440px] px-6 py-2 lg:px-11">
      <div className="grid gap-3 rounded-xl border border-border bg-background/35 p-3 lg:grid-cols-[1.1fr_repeat(4,1fr)_1.1fr]">
        <div className="p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">MODELLED IMPACT</p>
          <h2 className="mt-5 font-display text-3xl font-black leading-tight">Better outcomes. By design.</h2>
          <p className="mt-5 text-sm leading-6 text-main">Demo scenario results, not customer performance claims.</p>
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
          <p className="mt-5 font-display text-lg font-bold leading-6">The MVP shows simulated risk reduction before any transaction reaches a wallet.</p>
          <p className="mt-4 text-xs font-bold text-muted">Execution remains simulation-only unless a verified adapter is configured.</p>
          <ShieldCheck className="absolute -bottom-8 -right-5 h-28 w-28 text-primary opacity-15" />
        </Card>
      </div>
    </section>
  );
}
