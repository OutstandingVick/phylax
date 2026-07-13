import Link from "next/link";
import { AlertTriangle, Gauge, Menu, RotateCw, Wallet } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Overview", icon: Gauge },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/dashboard/alerts", label: "Alerts", icon: AlertTriangle },
  { href: "/dashboard/rebalance", label: "Rebalance", icon: RotateCw },
  { href: "/dashboard/docs", label: "More", icon: Menu }
];

export function MobileAppNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-surface/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur-xl lg:hidden">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="focus-ring flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[0.68rem] font-bold text-muted hover:bg-surface-soft hover:text-main">
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
