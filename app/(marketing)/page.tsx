import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Box,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Github,
  Hexagon,
  Layers3,
  Linkedin,
  LockKeyhole,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Twitter,
  WalletCards,
  Zap
} from "lucide-react";
import { PhylaxLogo } from "@/components/brand/phylax-logo";
import { PhylaxMark } from "@/components/brand/phylax-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const features = [
  ["Risk Guardian", "Continuous assessment across market, liquidity, counterparty, and concentration.", ShieldCheck],
  ["Portfolio Monitoring", "24/7 monitoring with real-time alerts, health scores, and exposure intelligence.", TrendingUp],
  ["Intelligent Rebalancing", "AI-driven rebalancing simulations to optimize returns and control risk.", Sparkles],
  ["Pay-per-Insight", "Transparent, usage-based pricing for insights with no upfront commitments.", CircleDollarSign],
  ["Secure Execution", "Policy-enforced actions through secure checkpoints and allowlisted execution.", LockKeyhole],
  ["Agent-Native", "Built for autonomous agents with APIs, webhooks, and x402 integrations.", Hexagon]
] as const;

const stats = [
  ["-38%", "Lower Max Drawdown", "Average reduction across monitored portfolios.", "line"],
  ["3.6x", "Faster Risk Detection", "Identify critical issues before they impact performance.", "bars"],
  ["+21%", "Improvement in Portfolio Health", "Stronger risk-adjusted outcomes over time.", "line-up"],
  ["-62%", "Lower Manual Overhead", "Automation-first operations free your team to focus on alpha.", "bars-down"]
] as const;

function MiniLine({ up = true }: { up?: boolean }) {
  const points = up ? "0,54 22,46 44,43 66,32 88,35 110,22 132,18 154,8" : "0,12 22,18 44,16 66,26 88,24 110,38 132,42 154,52";
  return (
    <svg viewBox="0 0 154 62" className="h-16 w-full" aria-hidden="true">
      <polyline points={points} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,62 ${points} 154,62`} fill="var(--primary)" opacity=".11" />
    </svg>
  );
}

function MiniBars({ down = false }: { down?: boolean }) {
  const bars = down ? [42, 36, 30, 24, 18, 14, 10] : [16, 44, 36, 28, 22, 34, 46];
  return (
    <div className="flex h-16 items-end gap-2">
      {bars.map((height, index) => <span key={index} className="flex-1 rounded-sm bg-primary/55" style={{ height }} />)}
    </div>
  );
}

function ProductMockup() {
  return (
    <div className="relative h-[560px] min-w-[760px]">
      <div className="absolute right-0 top-0 h-[430px] w-[720px] rounded-2xl border border-border bg-surface/90 p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-black">Portfolio Overview</h2>
          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-border bg-surface-soft px-4 py-2 text-left text-[0.68rem] font-black leading-tight">
              Phylax Capital<br /><span className="text-muted">Workspace</span>
            </button>
            <Bell className="h-5 w-5 text-muted" />
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-xs font-black text-[#0B1110]">ML</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3">
          {[
            ["Total Portfolio Value", "$245,680.35", "+4.28% (24h)"],
            ["24H PnL", "+$10,072.45", "+4.28%"],
            ["Risk Score", "18", "Low Risk"],
            ["Health Status", "98%", "Healthy"]
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-[0.62rem] font-black text-muted">{label}</p>
              <p className="mt-3 font-display text-lg font-black font-tabular">{value}</p>
              <p className="mt-1 text-[0.66rem] font-black text-primary">{detail}</p>
              <MiniLine />
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-[1.35fr_0.85fr] gap-3">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black">Portfolio Performance</h3>
              <div className="flex gap-2 text-[0.62rem] font-black text-muted">
                {["1D", "7D", "30D", "90D", "YTD", "ALL"].map((item) => <span key={item} className={item === "30D" ? "rounded-full bg-primary/20 px-2 text-primary" : ""}>{item}</span>)}
              </div>
            </div>
            <div className="mt-4 h-52 rounded-lg bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:72px_52px] p-3">
              <MiniLine />
              <div className="mt-7 h-20"><MiniLine /></div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="text-sm font-black">Guardian Insights</h3>
            <div className="mt-3 grid grid-cols-[1fr_0.9fr] gap-2">
              <svg viewBox="0 0 150 150" className="h-36 w-full">
                {[24, 44, 64].map((r) => <circle key={r} cx="75" cy="75" r={r} fill="none" stroke="var(--border)" />)}
                <polygon points="75,22 116,62 104,118 48,114 36,60" fill="var(--primary)" opacity=".15" stroke="var(--primary)" strokeWidth="2" />
                <text x="75" y="12" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Market</text>
                <text x="128" y="76" fill="var(--text-muted)" fontSize="9">Liquidity</text>
                <text x="75" y="143" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Concentration</text>
              </svg>
              <div className="space-y-3 text-[0.68rem]">
                <p><b>AI System Score</b><br /><span className="text-muted">98% Overall Health</span></p>
                <p className="rounded-full border border-primary/30 px-2 py-1 text-primary">Monitoring Healthy</p>
                <p className="rounded-full border border-warning/40 px-2 py-1 text-warning">Retention Required</p>
                <p className="rounded-full border border-accent/40 px-2 py-1 text-accent">Action Required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-[270px] rounded-2xl border border-border bg-surface/95 p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-surface-soft">●</div>
            <div><b>AAPL <span className="text-xs text-muted">xStock</span></b><p className="text-xs text-muted">Apple xStock</p></div>
          </div>
          <span className="rounded-full border border-primary/30 px-3 py-1 text-xs font-black text-primary">Monitored</span>
        </div>
        <p className="mt-5 text-xs text-muted">Portfolio Exposure</p>
        <p className="font-display text-2xl font-black">$245,680.35</p>
        <div className="mt-4 grid grid-cols-3 divide-x divide-border text-xs">
          <div><b>1.2M</b><span className="block text-muted">24H Volume</span></div>
          <div className="pl-3"><b>98%</b><span className="block text-primary">Healthy</span></div>
          <div className="pl-3"><b>14.6%</b><span className="block text-muted">Portfolio</span></div>
        </div>
      </div>

      <div className="absolute bottom-8 left-[315px] w-[360px] rounded-2xl border border-border bg-surface/95 p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-black">Rebalance Simulator</h3>
          <Link href="/dashboard/rebalance" className="text-xs font-black text-primary">View Full Simulator →</Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />Trim Tesla <b className="float-right">-3.10%</b></p>
            <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-warning" />Increase US Treasury <b className="float-right">+2.45%</b></p>
            <p><span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />Increase Cash <b className="float-right">+1.85%</b></p>
          </div>
          <div className="space-y-2">
            <p>Risk Score <b className="text-primary">18 → 14</b></p>
            <p>Expected Return <b className="text-primary">+0.72%</b></p>
            <p>Portfolio Health <b className="text-primary">98% → 99%</b></p>
          </div>
        </div>
        <button className="mt-4 h-9 w-full rounded-lg bg-primary text-xs font-black text-[#0B1110]">Run Simulation</button>
      </div>

      <div className="absolute bottom-7 right-0 w-[250px] rounded-2xl border border-border bg-surface/95 p-6 shadow-panel">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-accent/12 text-accent">!</div>
          <b>Exposure Spike</b>
          <span className="rounded-full border border-accent/30 px-2 py-1 text-xs font-black text-accent">High</span>
        </div>
        <p className="mt-6 text-sm text-muted">Instant clarity.<br />Action when it matters.</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-main">
      <header className="sticky top-0 z-50 border-b border-border bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-5">
          <PhylaxLogo />
          <nav className="hidden items-center gap-12 text-sm font-semibold text-main md:flex">
            <a className="inline-flex items-center gap-1" href="#product">Product <ChevronDown className="h-3 w-3" /></a>
            <a href="#security">Security</a>
            <a href="#use-cases">Use Cases</a>
            <a href="#pricing">Pricing</a>
            <Link href="/dashboard/docs">Docs</Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/dashboard"><Button className="px-7">Launch with Phylax <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
        </div>
        <nav className="mx-auto flex max-w-[1440px] gap-7 overflow-x-auto border-t border-border px-8 py-3 text-xs font-bold text-main md:hidden">
          <a className="inline-flex shrink-0 items-center gap-1" href="#product">Product <ChevronDown className="h-3 w-3" /></a>
          <a className="shrink-0" href="#security">Security</a>
          <a className="shrink-0" href="#use-cases">Use Cases</a>
          <a className="shrink-0" href="#pricing">Pricing</a>
          <Link className="shrink-0" href="/dashboard/docs">Docs</Link>
        </nav>
      </header>

      <section className="relative mx-auto grid max-w-[1440px] grid-cols-[0.95fr_1.05fr] gap-4 px-8 pb-8 pt-10 md:grid-cols-[0.78fr_1.22fr] md:gap-12 md:pt-14">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
        <div className="pt-4 md:pt-10">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[0.55rem] font-black uppercase tracking-[0.16em] text-primary md:px-4 md:py-2 md:text-xs">Autonomous Portfolio Guardian</span>
          <h1 className="mt-5 max-w-[650px] font-serif text-[clamp(2rem,4.6vw,4.6rem)] font-bold leading-[0.97] tracking-[-0.035em] text-main md:mt-8">
            The autonomous guardian for <span className="text-primary">xStocks</span> & RWA portfolios
          </h1>
          <p className="mt-5 max-w-[540px] text-sm leading-6 text-muted md:mt-7 md:text-lg md:leading-8">
            Phylax protects, monitors, and optimizes real-world and tokenized equity portfolios so autonomous agents can act with confidence.
          </p>
          <div className="mt-6 flex flex-nowrap gap-3 md:mt-8 md:gap-4">
            <Button className="px-4 md:px-7">Book demo <ArrowRight className="h-4 w-4" /></Button>
            <Link href="/dashboard"><Button variant="secondary" className="px-4 md:px-7">Explore product</Button></Link>
          </div>
          <p className="mt-6 flex items-center gap-2 text-xs font-semibold text-muted md:mt-8 md:text-sm"><ShieldCheck className="h-4 w-4 text-primary" /> Built for autonomy. Secured by design.</p>
          <div className="wire-field mt-8 h-32 w-full max-w-[520px] md:mt-10 md:h-44" />
        </div>
        <div className="relative h-[350px] overflow-visible pb-4 md:h-[500px] lg:h-[570px]">
          <div className="origin-top-left translate-x-[-18px] scale-[0.5] md:translate-x-0 md:scale-[0.7] lg:scale-100">
            <ProductMockup />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-8 py-2">
        <div className="grid items-center rounded-xl border border-border bg-surface/70 px-7 py-5 lg:grid-cols-[1fr_3fr]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-muted">Built for the decentralized future</p>
          <div className="grid grid-cols-4 divide-x divide-border">
            {[
              ["Onchain OS", Layers3],
              ["Agentic Wallet", WalletCards],
              ["APP / x402", Box],
              ["X Layer", Zap]
            ].map(([label, Icon]) => (
              <div key={label as string} className="flex items-center justify-center gap-3 text-sm font-black uppercase">
                <Icon className="h-5 w-5 text-primary" />
                {label as string}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="grid rounded-xl border border-border lg:grid-cols-6">
          {features.map(([title, body, Icon]) => (
            <div key={title} className="border-b border-border p-7 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <div className="grid h-14 w-14 place-items-center rounded-xl border border-border bg-surface"><Icon className="h-6 w-6 text-primary" /></div>
              <h3 className="mt-6 font-display text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-main">{body}</p>
              <a className="mt-7 inline-flex text-sm font-black text-primary" href="/dashboard/docs">Learn more →</a>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="mx-auto max-w-[1440px] px-8 py-2">
        <div className="grid gap-3 rounded-xl border border-border p-3 lg:grid-cols-[1.05fr_repeat(4,1fr)_1.1fr]">
          <div className="p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Measurable Impact</p>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight">Better outcomes. By design.</h2>
            <p className="mt-5 text-sm leading-6 text-main">Phylax helps autonomous agents protect capital and compound performance.</p>
          </div>
          {stats.map(([value, title, body, chart]) => (
            <div key={title} className="rounded-xl border border-border bg-surface p-5">
              <p className="font-display text-3xl font-black">{value}</p>
              <h3 className="mt-2 text-xs font-black">{title}</h3>
              <p className="mt-3 text-xs leading-5 text-muted">{body}</p>
              <div className="mt-5">{chart === "bars" ? <MiniBars /> : chart === "bars-down" ? <MiniBars down /> : <MiniLine up={chart === "line-up"} />}</div>
            </div>
          ))}
          <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-6">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <p className="mt-5 font-display text-lg font-bold leading-6">Phylax gives our agents the confidence to act with guardrails built into every decision.</p>
            <p className="mt-4 text-xs font-bold text-muted">— Marcus Moore<br />Head of DeFi Strategies<br />Phylax Capital</p>
            <ShieldCheck className="absolute -bottom-8 -right-4 h-28 w-28 text-primary opacity-15" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-3 px-8 py-2 lg:grid-cols-[0.95fr_2.15fr_1fr]">
        <div className="rounded-xl border border-border p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Developer First</p>
          <h2 className="mt-5 font-display text-3xl font-black">Build with Phylax</h2>
          <p className="mt-4 text-sm leading-6 text-main">Power autonomous strategies with APIs, webhooks, and programmable guardrails.</p>
          <Link href="/dashboard/docs" className="mt-7 inline-flex text-sm font-black text-primary">Explore Docs →</Link>
        </div>
        <div className="grid gap-4 rounded-xl border border-border bg-surface p-5 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-3 flex gap-2 text-[0.68rem] font-black">
              {["REST API", "Webhooks", "SDKs", "x402 Integration"].map((tab) => <span key={tab} className={tab === "REST API" ? "rounded-full bg-primary/15 px-3 py-1 text-primary" : "px-2 py-1 text-muted"}>{tab}</span>)}
            </div>
            <pre className="rounded-lg border border-border bg-surface-soft p-5 text-xs leading-6 text-main">{`GET /v1/portfolio/overview
Authorization: Bearer YOUR_API_KEY

{
  "total_value": "245680.35",
  "risk_score": 18,
  "health_status": "98%",
  "pnl_24h": "+10072.45",
  "health_status_text": "healthy"
}`}</pre>
          </div>
          <div className="space-y-3">
            {["Real-time Data", "Programmable Guardrails", "Seamless Automation"].map((item) => (
              <div key={item} className="rounded-lg border border-border bg-surface-soft p-4">
                <div className="flex items-center gap-2 text-sm font-black"><Radio className="h-4 w-4 text-primary" /> {item}</div>
                <p className="mt-2 text-xs text-muted">Portfolio values, PnL, risk metrics, and more.</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-6">
          <h3 className="font-display font-black">Trusted & Secure</h3>
          <div className="mt-8 grid gap-4 text-sm font-semibold">
            {["SOC 2 Aligned", "Encrypted in transit", "Allowlisted Execution", "Audit Logs"].map((item) => <p key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {item}</p>)}
          </div>
          <ShieldCheck className="absolute -bottom-5 -right-5 h-28 w-28 text-primary opacity-15" />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-8 py-3">
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-9">
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-8">
              <PhylaxMark className="h-20 w-16" />
              <div>
                <h2 className="font-display text-3xl font-black leading-tight">Let your agents trade.<br />We’ll guard every move.</h2>
                <p className="mt-2 text-muted">Launch in minutes. Protect forever.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button className="px-8">Book a Demo <ArrowRight className="h-4 w-4" /></Button>
              <Link href="/dashboard/docs"><Button variant="secondary" className="px-8">Start Building</Button></Link>
            </div>
          </div>
          <div className="wire-field absolute -bottom-24 right-0 h-64 w-80" />
        </div>
      </section>

      <footer className="mx-auto grid max-w-[1440px] gap-10 px-8 py-10 lg:grid-cols-[1.2fr_2fr_1fr]">
        <div>
          <PhylaxLogo />
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted">Protecting value. Empowering investors. Securing the future.</p>
          <p className="mt-10 text-xs text-muted">© 2025 Phylax. All rights reserved.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-4">
          {[
            ["Product", "Overview", "Pricing", "Integrations"],
            ["Company", "About", "Careers", "Contact"],
            ["Resources", "Docs", "Blog", "Status"],
            ["Legal", "Privacy", "Terms", "Security"]
          ].map(([heading, ...items]) => (
            <div key={heading}>
              <h3 className="text-sm font-black">{heading}</h3>
              <div className="mt-4 space-y-3 text-sm text-muted">{items.map((item) => <p key={item}>{item}</p>)}</div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-black">Stay updated</h3>
          <p className="mt-3 text-sm leading-6 text-muted">Get the latest product updates and security insights.</p>
          <div className="mt-5 flex gap-2">
            <Input placeholder="Enter your email" />
            <Button className="h-10 w-12 p-0"><Send className="h-4 w-4" /></Button>
          </div>
          <div className="mt-7 flex gap-2">
            {[Twitter, Github, Linkedin].map((Icon, index) => <Button key={index} variant="ghost" className="h-9 w-9 p-0"><Icon className="h-4 w-4" /></Button>)}
          </div>
        </div>
      </footer>
    </main>
  );
}
