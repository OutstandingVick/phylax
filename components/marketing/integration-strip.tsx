import { Boxes, Cpu, Layers3, WalletCards } from "lucide-react";

const items = [
  { label: "Onchain OS", icon: Layers3 },
  { label: "Agentic Wallet", icon: WalletCards },
  { label: "APP / x402", icon: Cpu },
  { label: "X Layer", icon: Boxes }
];

export function IntegrationStrip() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-2 lg:px-11">
      <div className="grid items-center gap-4 rounded-xl border border-border bg-surface/70 px-6 py-5 shadow-panel lg:grid-cols-[1fr_3fr]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-muted">BUILT FOR THE DECENTRALIZED FUTURE</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-3 px-4 py-2">
              <item.icon className="h-5 w-5 text-primary" />
              <span className="font-display text-sm font-bold uppercase tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
