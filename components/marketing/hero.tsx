import Link from "next/link";
import { AlertTriangle, ArrowRight, Bell, CheckCircle2, ShieldCheck } from "lucide-react";
import { PhylaxMark } from "@/components/brand/phylax-mark";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { RiskRadar } from "@/components/dashboard/risk-radar";
import { formatUsd } from "@/lib/utils";
import { portfolioOverview } from "@/lib/mock/portfolio";

export function Hero() {
  return (
    <section className="marketing-surface relative overflow-hidden">
      <div className="subtle-grid absolute inset-0 opacity-30" />
      <div className="wire-field absolute bottom-[-9rem] left-0 h-72 w-[44rem] max-w-full" />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:px-11 lg:py-8">
        <div className="pt-4 lg:pt-10">
          <Badge tone="good" className="border-primary/30 bg-primary/10 tracking-[0.16em]">AUTONOMOUS RISK INFRASTRUCTURE</Badge>
          <h1 className="mt-8 max-w-[670px] font-serif text-5xl font-bold leading-[0.98] text-main md:text-[4.6rem]">
            The autonomous guardian for <span className="text-primary">xStocks</span> & RWA portfolios.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Phylax monitors portfolio risk, detects unsafe approvals, simulates safer allocations and gives autonomous agents a security check before they move capital.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard?demo=incident"><Button className="px-7">Launch Phylax <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link href="#product"><Button variant="secondary" className="px-7">See how it works</Button></Link>
          </div>
          <p className="mt-7 flex items-center gap-2 text-sm font-semibold text-muted"><ShieldCheck className="h-4 w-4 text-primary" /> Built for autonomous agents. Secured by policy-controlled execution.</p>
        </div>
        <div className="relative h-[520px] overflow-hidden sm:h-[610px] lg:h-[690px]">
          <div className="relative h-[690px] w-[790px] origin-top-left scale-[0.72] sm:scale-[0.84] lg:scale-100">
          <Card className="absolute right-0 top-0 z-10 w-[790px] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-black">Portfolio Overview</h2>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-lg border border-border bg-surface-soft px-4 py-2 text-left text-xs font-bold">
                  Phylax Capital<br /><span className="text-muted">Workspace</span>
                </button>
                <Bell className="h-5 w-5 text-muted" />
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-xs font-black text-background">ML</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-3">
              {[
                ["Total Portfolio Value", formatUsd(portfolioOverview.totalValueUsd), "+4.28% (24h)", "good"],
                ["24H PnL", "+$10,072.45", "+4.28%", "good"],
                ["Risk Score", "74", "High", "bad"],
                ["Health Status", "61", "Watch", "warn"]
              ].map(([label, value, detail]) => (
                <div key={label} className="rounded-xl border border-border bg-surface p-4">
                  <p className="text-[0.68rem] font-bold text-muted">{label}</p>
                  <b className="mt-3 block font-display text-xl font-black font-tabular">{value}</b>
                  <span className="mt-1 block text-xs font-bold text-primary">{detail}</span>
                  <div className="mt-3 h-7 rounded-sm bg-[linear-gradient(135deg,transparent_42%,rgba(79,157,93,.45)_43%,rgba(79,157,93,.45)_48%,transparent_49%)]" />
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-[1.22fr_0.78fr] gap-4">
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-black">Portfolio Performance</h3>
                  <div className="flex gap-1 text-[0.65rem] font-bold text-muted">
                    {["1D", "7D", "30D", "90D", "YTD", "ALL"].map((range) => <span key={range} className={range === "30D" ? "rounded-full bg-primary/20 px-2 text-primary" : "px-1"}>{range}</span>)}
                  </div>
                </div>
                <PortfolioChart />
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <h3 className="mb-2 text-sm font-black">Guardian Insights</h3>
                <RiskRadar />
                <div className="mt-2 space-y-2 text-xs">
                  <div className="flex items-center justify-between"><span>Risk Score</span><Badge tone="bad">74 High</Badge></div>
                  <div className="flex items-center justify-between"><span>Health</span><Badge tone="warn">61 Watch</Badge></div>
                  <div className="flex items-center justify-between"><span>Alerts</span><Badge tone="bad">2 risks require attention</Badge></div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="absolute bottom-10 left-0 z-20 w-72 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-surface-soft text-xl">●</div>
              <div><h3 className="font-display font-black">TSLA.x <span className="text-xs text-muted">xStock</span></h3><p className="text-xs text-muted">Exposure Spike</p></div>
              </div>
              <Badge tone="good">Monitored</Badge>
            </div>
            <p className="mt-5 text-xs text-muted">Portfolio Exposure</p>
            <p className="mt-1 text-2xl font-black font-tabular">{formatUsd(portfolioOverview.totalValueUsd)}</p>
            <div className="mt-4 grid grid-cols-3 divide-x divide-border text-xs">
              <div><b>1.2M</b><span className="block text-muted">24H Vol</span></div>
              <div className="pl-3"><b>37.8%</b><span className="block text-accent">Over limit</span></div>
              <div className="pl-3"><b>25%</b><span className="block text-muted">Policy</span></div>
            </div>
          </Card>
          <Card className="absolute bottom-10 left-[19rem] z-20 w-[390px] p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-black">Rebalance Simulator</h3>
              <a className="text-xs font-black text-primary" href="/dashboard/rebalance">View Full Simulator →</a>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                {["Trim Tesla -3.10%", "Increase US Treasury +2.45%", "Increase Cash +1.85%"].map((item, index) => (
                  <p key={item} className="flex items-center gap-2"><span className={index === 0 ? "h-2 w-2 rounded-full bg-accent" : "h-2 w-2 rounded-full bg-primary"} />{item}</p>
                ))}
              </div>
              <div className="space-y-2">
                <p>Risk Score <b className="text-primary">74 → 49</b></p>
                <p>Est. Slippage <b className="text-primary">0.21%</b></p>
                <p>Portfolio Health <b className="text-primary">61 → 78</b></p>
              </div>
            </div>
            <Button className="mt-4 h-9 w-full text-xs"><CheckCircle2 className="h-3 w-3" /> Run Simulation</Button>
          </Card>
          <Card className="absolute bottom-8 right-4 z-20 w-64 p-5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-accent" />
              <div className="font-display font-black">Risky Approval</div>
              <Badge tone="bad">Critical</Badge>
            </div>
            <p className="mt-6 text-sm text-muted">Unlimited USDC allowance<br />0x9ab...991</p>
          </Card>
          <div className="absolute bottom-[-2rem] right-[-1rem] opacity-20 dark:opacity-35">
            <PhylaxMark className="h-48 w-40" />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
