import Link from "next/link";
import { AlertTriangle, BarChart3, BookOpen, CreditCard, Gauge, RotateCw, Settings, Wallet } from "lucide-react";
import { PhylaxLogo } from "@/components/brand/phylax-logo";
import { PhylaxMark } from "@/components/brand/phylax-mark";
import { Badge } from "@/components/ui/badge";

const items = [
  { href: "/dashboard", label: "Overview", icon: Gauge },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/dashboard/alerts", label: "Alerts", icon: AlertTriangle },
  { href: "/dashboard/rebalance", label: "Rebalancing", icon: RotateCw },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/docs", label: "Agent Docs", icon: BookOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export function AppSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-border bg-surface/70 p-5 lg:block">
      <PhylaxLogo href="/dashboard" />
      <div className="mt-8 rounded-xl border border-border bg-surface-soft p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted"><BarChart3 className="h-4 w-4" /> Demo Mode</div>
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface shadow-glow">
            <PhylaxMark compact className="h-8 w-7" />
          </div>
        </div>
        <p className="mt-2 text-sm text-main">Incident: TSLA.x concentration plus risky USDC approval.</p>
        <Badge tone="warn" className="mt-4">Attention</Badge>
      </div>
      <nav className="mt-6 space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-surface-soft hover:text-main"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <p className="absolute bottom-5 max-w-56 text-xs text-muted">Phylax provides risk analysis, not financial advice. Non-custodial by design.</p>
    </aside>
  );
}
