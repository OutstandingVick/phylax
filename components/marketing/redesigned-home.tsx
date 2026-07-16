"use client";

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Blocks,
  CheckCircle2,
  ChevronDown,
  Code2,
  Coins,
  DatabaseZap,
  FileJson,
  FileText,
  Fingerprint,
  Gauge,
  GitBranch,
  Globe2,
  Landmark,
  LineChart,
  LockKeyhole,
  Network,
  Radar,
  ReceiptText,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TableProperties,
  WalletCards,
  Webhook
} from "lucide-react";
import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { PhylaxLogo } from "@/components/brand/phylax-logo";
import { PhylaxMark } from "@/components/brand/phylax-mark";
import { cn } from "@/lib/utils";

const shell = "mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16";
const sectionY = "py-16 md:py-24 lg:py-36";
const buttonPrimary =
  "focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary px-6 text-sm font-black text-background shadow-glow transition hover:-translate-y-0.5";
const buttonSecondary =
  "focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 text-sm font-black text-main transition hover:bg-surface-soft";

type IconCard = {
  title: string;
  text: string;
  icon: LucideIcon;
  href?: string;
};

function SectionIntro({
  eyebrow,
  title,
  text,
  centered = false,
  light = false
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={cn(centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl", light && "text-[#F7F7F2]")}>
      {eyebrow && (
        <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {text && (
        <p className={cn("mt-5 text-base leading-8 md:text-lg", light ? "text-[#CDE7C7]" : "text-muted")}>{text}</p>
      )}
    </div>
  );
}

function HeroNetworkVisual() {
  const nodes = [
    { label: "AAPL.x", x: 22, y: 34, tone: "good" },
    { label: "TSLA.x", x: 72, y: 30, tone: "alert" },
    { label: "NVDA.x", x: 82, y: 62, tone: "good" },
    { label: "USDC", x: 27, y: 70, tone: "alert" },
    { label: "Treasury", x: 50, y: 18, tone: "warn" },
    { label: "Real Estate", x: 48, y: 82, tone: "warn" }
  ];
  const toneClass = {
    good: "bg-primary",
    warn: "bg-warning",
    alert: "bg-accent"
  };

  return (
    <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] border border-border bg-surface p-5 shadow-panel md:min-h-[620px]">
      <div className="absolute inset-0 subtle-grid opacity-50" />
      <div className="absolute inset-10 rounded-full border border-primary/20" />
      <div className="absolute inset-24 rounded-full border border-primary/10" />
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-background/80 shadow-glow">
        <div className="guardian-pulse absolute inset-0 rounded-full border border-primary/30" />
        <div className="flex h-full w-full items-center justify-center">
          <PhylaxMark className="h-14 w-12" />
        </div>
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <g stroke="currentColor" className="text-primary/20" strokeWidth="0.35">
          {nodes.map((node) => (
            <line key={node.label} x1="50" y1="50" x2={node.x} y2={node.y} />
          ))}
        </g>
      </svg>
      {nodes.map((node, index) => (
        <div
          key={node.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-2 text-xs font-black shadow-panel"
          style={{ left: `${node.x}%`, top: `${node.y}%`, animationDelay: `${index * 140}ms` }}
        >
          <span className={cn("node-blip h-2.5 w-2.5 rounded-full", toneClass[node.tone as keyof typeof toneClass])} />
          <span>{node.label}</span>
        </div>
      ))}
      <div className="absolute right-5 top-5 w-64 rounded-3xl border border-border bg-background/95 p-4 shadow-panel">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-muted">Agent Feed</p>
          <span className="h-2 w-2 rounded-full bg-primary" />
        </div>
        <div className="mt-4 grid gap-2">
          {[
            ["Exposure Spike", "High", "text-warning"],
            ["Risky Approval", "Critical", "text-accent"],
            ["Liquidity Shift", "Medium", "text-warning"],
            ["Rebalance Suggested", "Medium", "text-warning"],
            ["Policy Check", "Blocked", "text-accent"]
          ].map(([title, status, color]) => (
            <div key={title} className="rounded-2xl border border-border bg-surface px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-main">{title}</span>
                <span className={cn("text-[0.62rem] font-black uppercase tracking-wide", color)}>{status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 left-5 grid w-[calc(100%-2.5rem)] gap-3 rounded-3xl border border-border bg-background/95 p-4 shadow-panel sm:w-72">
        <div className="grid grid-cols-2 gap-3">
          {[
            ["2", "risks detected"],
            ["1", "agent active"],
            ["74", "risk score"],
            ["61", "health score"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl bg-surface p-3">
              <p className="font-tabular text-2xl font-black">{value}</p>
              <p className="text-[0.68rem] font-bold uppercase tracking-wide text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className={cn(shell, "pb-14 md:pb-20 lg:pb-24")}>
      <div className="flex min-h-[calc(100svh-10rem)] items-center justify-center py-16 md:min-h-[calc(100svh-11rem)] md:py-20">
        <div className="mx-auto w-full max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-muted">Autonomous Risk Infrastructure</p>
          <h1 className="mx-auto mt-6 max-w-6xl text-wrap-balance font-display text-[2.15rem] font-black leading-[1.08] tracking-normal min-[430px]:text-[2.55rem] md:text-7xl xl:text-[5.35rem]">
            <span className="block">The security layer</span>
            <span className="block">between agent intent</span>
            <span className="block">and portfolio execution.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted md:text-xl">
            Phylax monitors xStocks and RWA portfolios, detects unsafe approvals, simulates safer allocations, and gives
            autonomous agents a security check before capital moves.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard?demo=incident" className={cn(buttonPrimary, "w-full sm:w-auto")}>
              Launch Phylax
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#protection-lifecycle" className={cn(buttonSecondary, "w-full sm:w-auto")}>
              See how it works
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-muted">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Built for autonomous agents. Secured by policy-controlled execution.
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl">
        <HeroNetworkVisual />
      </div>
    </section>
  );
}

function EcosystemStrip() {
  const items = [
    ["OKX Onchain OS", Blocks],
    ["Agentic Wallet", WalletCards],
    ["APP / x402", ReceiptText],
    ["X Layer", Network],
    ["Market Data", LineChart],
    ["A2MCP", GitBranch]
  ] as const;
  return (
    <section className="border-y border-border bg-surface/65">
      <div className={cn(shell, "py-10")}>
        <p className="mb-6 text-xs font-black uppercase tracking-[0.26em] text-muted">Built for the agentic finance stack</p>
        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:px-0 lg:grid-cols-6">
          {items.map(([label, Icon]) => (
            <div key={label} className="flex min-w-52 items-center gap-3 rounded-2xl border border-border bg-background/60 px-4 py-4 text-muted">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-black">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsPanel() {
  const metrics = [
    ["74 -> 49", "Modelled Risk Score"],
    ["61 -> 78", "Portfolio Health"],
    ["2", "Critical Risks Detected"],
    ["0.21%", "Estimated Slippage"],
    ["3.00 USDC", "Maximum Analysis Spend"],
    ["1.84 USDC", "Demo Charge Settled"]
  ];
  return (
    <section className={cn(shell, "py-14 md:py-20")}>
      <div className="rounded-[2rem] border border-border bg-primary-soft/15 p-5 shadow-panel md:rounded-[2.5rem] md:p-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Incident demo results</p>
            <p className="mt-2 max-w-2xl text-sm font-bold text-muted">Modelled demo scenario, not historical customer performance.</p>
          </div>
          <Link href="/dashboard?demo=incident" className="text-sm font-black text-main underline decoration-primary underline-offset-4">
            Run Incident Demo
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {metrics.map(([value, label]) => (
            <div key={label} className="rounded-3xl border border-border bg-background/70 p-5">
              <p className="font-tabular text-3xl font-black tracking-tight md:text-4xl">{value}</p>
              <p className="mt-2 text-sm font-bold leading-5 text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const lifecycleTabs = [
  {
    id: "monitor",
    label: "Monitor",
    eyebrow: "Monitor",
    title: "Know the portfolio before the next action.",
    text: "Track holdings, allocation, PnL, approvals, liquidity, market conditions, and data confidence in one view.",
    visual: ["Portfolio value $245,680.35", "Health score 61 Watch", "7 monitored assets", "Freshness 42 seconds"]
  },
  {
    id: "detect",
    label: "Detect",
    eyebrow: "Detect",
    title: "Identify risk before it becomes exposure.",
    text: "Detect concentration spikes, dangerous approvals, liquidity deterioration, and policy violations as they emerge.",
    visual: ["TSLA.x exposure 37.8%", "Configured limit 25%", "USDC approval unlimited", "Critical alert state"]
  },
  {
    id: "analyse",
    label: "Analyse",
    eyebrow: "Deep Analysis",
    title: "Increase confidence when the decision matters.",
    text: "Use payment-gated analysis to evaluate market, liquidity, approval, counterparty, and execution risk in more depth.",
    visual: ["402 Payment Required", "Upto max spend 3.00 USDC", "Approved cap", "Settled 1.84 USDC"]
  },
  {
    id: "simulate",
    label: "Simulate",
    eyebrow: "Simulate",
    title: "Compare the safer outcome before committing capital.",
    text: "Evaluate allocation changes, fees, slippage, health, and risk before a transaction reaches the wallet.",
    visual: ["Risk 74 -> 49", "Health 61 -> 78", "Estimated fee $18.42", "Slippage 0.21%"]
  },
  {
    id: "enforce",
    label: "Enforce",
    eyebrow: "Policy Enforcement",
    title: "Approve safe actions. Block unsafe ones.",
    text: "Apply exposure limits, spending caps, asset restrictions, slippage thresholds, and explicit approval requirements.",
    visual: ["Decision Blocked", "Policy failed", "TSLA.x exceeds limit", "Alternative: reduce exposure"]
  }
];

function LifecycleVisual({ items }: { items: string[] }) {
  return (
    <div className="rounded-[2rem] border border-border bg-surface-soft p-5 shadow-panel">
      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-muted">Phylax Check</p>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-black text-primary">LIVE DEMO</span>
        </div>
        <div className="mt-5 grid gap-3">
          {items.map((item, index) => (
            <div key={item} className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-4">
              <span className="text-sm font-bold text-main">{item}</span>
              {index < 2 ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <AlertTriangle className="h-5 w-5 text-warning" />}
            </div>
          ))}
        </div>
        <div className="mt-5 h-28 rounded-2xl border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_22%,transparent),transparent_55%),var(--surface-soft)] p-4">
          <div className="flex h-full items-end gap-2">
            {[36, 62, 45, 78, 52, 89, 64].map((height, index) => (
              <span key={index} className="flex-1 rounded-t-lg bg-primary/70" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtectionLifecycle() {
  const [active, setActive] = useState(0);
  const current = lifecycleTabs[active];
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") setActive((active + 1) % lifecycleTabs.length);
    if (event.key === "ArrowLeft") setActive((active - 1 + lifecycleTabs.length) % lifecycleTabs.length);
  }
  return (
    <section id="protection-lifecycle" className={cn(shell, sectionY)}>
      <SectionIntro
        centered
        title="Protection across the entire agent execution lifecycle."
        text="Legacy dashboards explain what already happened. Phylax evaluates portfolio conditions before, during, and after an agent action within one policy-aware system."
      />
      <div
        className="mt-10 flex gap-3 overflow-x-auto rounded-[2rem] border border-border bg-surface p-2"
        role="tablist"
        aria-label="Protection lifecycle"
        onKeyDown={onKeyDown}
      >
        {lifecycleTabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={cn(
              "focus-ring min-h-12 min-w-36 flex-1 rounded-[1.5rem] px-5 text-sm font-black transition",
              index === active ? "bg-primary text-background" : "text-muted hover:bg-surface-soft hover:text-main"
            )}
            onClick={() => setActive(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid items-center gap-8 rounded-[2rem] border border-border bg-background p-5 shadow-panel md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">{current.eyebrow}</p>
          <h3 className="mt-4 max-w-xl font-display text-3xl font-black leading-tight md:text-5xl">{current.title}</h3>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted">{current.text}</p>
        </div>
        <LifecycleVisual items={current.visual} />
      </div>
    </section>
  );
}

const engineItems = [
  {
    title: "Risk Intelligence",
    icon: Radar,
    text: "Explainable scoring across market, liquidity, concentration, counterparty, approvals, volatility, execution, and data confidence.",
    visual: ["Market 15%", "Liquidity 15%", "Concentration 20%", "Approvals 15%", "Confidence penalty active"]
  },
  {
    title: "Agent Guardrails",
    icon: SlidersHorizontal,
    text: "Policy controls for exposure, spending, slippage, blocked assets, and execution approval.",
    visual: ["Max exposure 25%", "Daily spend cap on", "Slippage limit 0.5%", "Execution requires confirmation"]
  },
  {
    title: "Portfolio Coverage",
    icon: TableProperties,
    text: "Track xStocks, RWAs, stablecoins, and cash-like assets with category-level and asset-level risk.",
    visual: ["AAPL.x monitored", "TSLA.x high", "Treasury defensive", "USDC approval issue"]
  },
  {
    title: "Data Confidence",
    icon: DatabaseZap,
    text: "Show freshness, missing sources, degraded dependencies, and confidence penalties before execution.",
    visual: ["Market data fresh", "Liquidity medium", "Approval scan current", "Stale data blocks execution"]
  },
  {
    title: "Integrations & APIs",
    icon: Code2,
    text: "Connect external agents through typed APIs, webhooks, A2MCP-compatible output, and x402/Upto payment flows.",
    visual: ["POST /api/agent/query", "402 payment_required", "webhook.alert.created", "decision blocked"]
  }
];

function EngineVisual({ visual }: { visual: string[] }) {
  return (
    <div className="min-h-[430px] rounded-[2rem] border border-border bg-[radial-gradient(circle_at_20%_0%,color-mix(in_srgb,var(--primary)_24%,transparent),transparent_38%),var(--surface)] p-5 shadow-panel">
      <div className="rounded-3xl border border-border bg-background/85 p-5">
        <div className="flex items-center gap-3">
          <PhylaxMark className="h-9 w-8" />
          <div>
            <p className="text-sm font-black">Engine Output</p>
            <p className="text-xs font-bold text-muted">Simulation-only MVP</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3">
          {visual.map((item, index) => (
            <div key={item} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold">{item}</span>
                <span className={cn("h-2.5 w-2.5 rounded-full", index % 3 === 0 ? "bg-primary" : index % 3 === 1 ? "bg-warning" : "bg-accent")} />
              </div>
            </div>
          ))}
        </div>
        <pre className="mt-5 overflow-x-auto rounded-2xl border border-border bg-[#191919] p-4 text-xs leading-6 text-[#F7F7F2]">
{`{
  "decision": "blocked",
  "confidence": "high",
  "simulationOnly": true
}`}
        </pre>
      </div>
    </div>
  );
}

function PhylaxEngine() {
  const [open, setOpen] = useState(0);
  const active = engineItems[open];
  return (
    <section id="engine" className={cn(shell, sectionY)}>
      <SectionIntro
        centered
        title="Explore the engine behind autonomous portfolio protection."
        text="Built for transparent risk decisions, configurable guardrails, agent-readable output, and safe portfolio workflows."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-border bg-surface p-3">
          {engineItems.map((item, index) => {
            const Icon = item.icon;
            const selected = index === open;
            return (
              <section key={item.title} className="border-b border-border last:border-b-0">
                <button
                  type="button"
                  className="focus-ring flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl px-4 text-left"
                  aria-expanded={selected}
                  onClick={() => setOpen(index)}
                >
                  <span className="flex items-center gap-3 text-lg font-black">
                    <Icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </span>
                  <ChevronDown className={cn("h-5 w-5 transition", selected && "rotate-180")} />
                </button>
                {selected && <p className="px-4 pb-5 text-base leading-7 text-muted">{item.text}</p>}
              </section>
            );
          })}
        </div>
        <EngineVisual visual={active.visual} />
      </div>
    </section>
  );
}

const suiteTabs = [
  ["Portfolio Risk", "See dangerous concentration before it compounds.", "Track asset, category, issuer, liquidity, and market exposure across tokenized portfolios.", "Explore Portfolio Risk", "/dashboard/portfolio"],
  ["Approval Security", "Catch dangerous permissions before they become losses.", "Detect unlimited allowances, unknown spenders, and abnormal approval behaviour.", "Explore Approval Guard", "/dashboard/alerts"],
  ["Agent Preflight", "Let every agent ask Phylax first.", "Validate a proposed action against market conditions and portfolio policy before execution.", "Explore Agent API", "/dashboard/docs"],
  ["Payment Controls", "Pay only for the depth the decision requires.", "Use x402 and Upto-style flows to authorise variable-depth analysis with explicit spending limits.", "Explore Payments", "/dashboard/billing"],
  ["Rebalancing", "See the safer move before you make it.", "Compare modelled allocations, risk, health, fees, and slippage before execution.", "Open Simulator", "/dashboard/rebalance"],
  ["Reporting", "Make every decision explainable.", "Generate human-readable and machine-readable reports with evidence, confidence, and recommended actions.", "View Reports", "/dashboard/reports"]
] as const;

function SuiteVisual({ label }: { label: string }) {
  return (
    <div className="rounded-[2rem] border border-[#CDE7C7]/20 bg-[#191919] p-5">
      <div className="rounded-3xl bg-[#F7F7F2] p-5 text-[#191919]">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.22em]">Phylax {label}</p>
          <ShieldCheck className="h-5 w-5 text-[#6BAA75]" />
        </div>
        <div className="mt-7 grid gap-3">
          {["Policy", "Risk", "Payment", "Simulation"].map((item, index) => (
            <div key={item} className="rounded-2xl border border-[#191919]/10 bg-white/55 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black">{item}</span>
                <span className={cn("rounded-full px-3 py-1 text-xs font-black", index === 0 ? "bg-[#F15025]/15 text-[#9A350F]" : "bg-[#6BAA75]/15 text-[#2D6A39]")}>
                  {index === 0 ? "Blocked" : "Checked"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 h-36 rounded-2xl bg-[linear-gradient(135deg,#6BAA75,#84DD63_55%,#F15025)] p-1">
          <div className="flex h-full items-center justify-center rounded-[0.9rem] bg-[#191919]/90">
            <PhylaxMark className="h-20 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductSuite() {
  const [active, setActive] = useState(0);
  const current = suiteTabs[active];
  return (
    <section id="product-suite" className="bg-[#191919] text-[#F7F7F2]">
      <div className={cn(shell, sectionY)}>
        <SectionIntro
          centered
          light
          title="One guardian. Every critical check. Real-time protection."
          text="Phylax combines monitoring, analysis, payment controls, simulation, and policy enforcement in one agent-native layer."
        />
        <div className="mt-10 grid gap-3 overflow-x-auto md:grid-cols-3 lg:grid-cols-6" role="tablist" aria-label="Product solution suite">
          {suiteTabs.map((tab, index) => (
            <button
              key={tab[0]}
              type="button"
              className={cn(
                "focus-ring min-h-12 min-w-44 rounded-full border px-4 text-sm font-black transition",
                active === index ? "border-[#84DD63] bg-[#84DD63] text-[#191919]" : "border-[#CDE7C7]/25 text-[#CDE7C7] hover:bg-[#202020]"
              )}
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
            >
              {tab[0]}
            </button>
          ))}
        </div>
        <div className="mt-10 grid items-center gap-8 rounded-[2rem] border border-[#CDE7C7]/18 bg-[#202020] p-5 md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#84DD63]">{current[0]}</p>
            <h3 className="mt-4 max-w-2xl font-display text-4xl font-black leading-tight md:text-5xl">{current[1]}</h3>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#CDE7C7]">{current[2]}</p>
            <Link href={current[4]} className={cn(buttonPrimary, "mt-8")}>{current[3]} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <SuiteVisual label={current[0]} />
        </div>
      </div>
    </section>
  );
}

const incidentCards = [
  ["Exposure Incident", "TSLA.x concentration exceeded policy.", "37.8% exposure", "Phylax detected that TSLA.x had exceeded the configured 25% maximum allocation and marked the proposed action unsafe.", "View Detection", "/dashboard/alerts"],
  ["Approval Incident", "Unlimited USDC approval flagged.", "Critical risk", "An unknown spender received an unlimited USDC allowance. Phylax recommended revocation and blocked guarded execution.", "View Approval Analysis", "/dashboard/alerts"],
  ["Rebalance Result", "Portfolio risk reduced in simulation.", "74 -> 49", "A defensive allocation reduced modelled risk while improving portfolio health from 61 to 78.", "View Simulation", "/dashboard/rebalance"],
  ["Agent Preflight", "Unsafe trade blocked before execution.", "Policy failed", "The proposed TSLA.x purchase would have pushed exposure above the configured limit.", "View Agent Response", "/dashboard/docs"]
] as const;

function IncidentCarousel() {
  const [active, setActive] = useState(0);
  const cards = useMemo(() => {
    return incidentCards.map((card, index) => {
      const offset = index - active;
      return { card, offset };
    });
  }, [active]);
  return (
    <section className={cn(shell, sectionY)}>
      <SectionIntro centered title="Proven in the flow. Verifiable in the output." text="Demo scenarios using the Phylax MVP." />
      <div className="relative mt-12 overflow-hidden py-6" tabIndex={0} onKeyDown={(event) => {
        if (event.key === "ArrowRight") setActive((active + 1) % incidentCards.length);
        if (event.key === "ArrowLeft") setActive((active - 1 + incidentCards.length) % incidentCards.length);
      }}>
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map(({ card, offset }, index) => {
            const isActive = index === active;
            return (
              <article
                key={card[0]}
                className={cn(
                  "rounded-[2rem] border border-border bg-surface p-6 shadow-panel transition md:min-h-[420px]",
                  isActive ? "scale-100 opacity-100" : "hidden opacity-55 md:block md:scale-95"
                )}
                style={{ order: offset < 0 ? offset + incidentCards.length : offset }}
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-muted">{card[0]}</p>
                <p className="mt-10 font-tabular text-4xl font-black text-primary md:text-5xl">{card[2]}</p>
                <h3 className="mt-5 font-display text-2xl font-black leading-tight md:text-3xl">{card[1]}</h3>
                <p className="mt-5 text-base leading-7 text-muted">{card[3]}</p>
                <Link href={card[5]} className="mt-8 inline-flex items-center gap-2 text-sm font-black text-main underline decoration-primary underline-offset-4">
                  {card[4]} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button type="button" className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full border border-border" aria-label="Previous incident" onClick={() => setActive((active - 1 + incidentCards.length) % incidentCards.length)}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          {incidentCards.map((card, index) => (
            <button key={card[0]} type="button" className={cn("focus-ring h-2.5 rounded-full transition", active === index ? "w-8 bg-primary" : "w-2.5 bg-muted/40")} aria-label={`Show ${card[0]}`} onClick={() => setActive(index)} />
          ))}
          <button type="button" className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full border border-border" aria-label="Next incident" onClick={() => setActive((active + 1) % incidentCards.length)}>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ResourceBanner() {
  return (
    <section className={cn(shell, "py-10 md:py-16")}>
      <div className="grid items-center gap-10 rounded-[2.5rem] border border-[#CDE7C7]/18 bg-[#191919] p-6 text-[#F7F7F2] shadow-panel md:p-12 lg:grid-cols-[1fr_0.75fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#84DD63]">Architecture Brief</p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-black leading-tight md:text-6xl">
            How Phylax protects autonomous capital.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#CDE7C7]">
            A practical guide to portfolio monitoring, agent preflight checks, payment-gated analysis, policy enforcement,
            and simulation-first execution for xStocks and RWA workflows.
          </p>
          <Link href="/dashboard/docs" className={cn(buttonPrimary, "mt-8")}>Read the architecture brief</Link>
        </div>
        <div className="rounded-[2rem] border border-[#CDE7C7]/20 bg-[#F7F7F2] p-8 text-[#191919]">
          <div className="flex items-center gap-3">
            <PhylaxMark className="h-10 w-9" />
            <span className="brand-wordmark text-[1.05rem] text-[#191919]">
              PHYL<span className="brand-wordmark-a">A</span>X
            </span>
          </div>
          <div className="mt-16 rounded-3xl bg-[#191919] p-6 text-[#F7F7F2]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#84DD63]">Report</p>
            <h3 className="mt-5 font-display text-3xl font-black leading-tight">The Autonomous Portfolio Risk Stack</h3>
            <p className="mt-4 text-sm leading-6 text-[#CDE7C7]">Monitoring, preflight, payments, simulation, and guardrails.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const audienceCards: IconCard[] = [
  { title: "Autonomous Agents", text: "Preflight portfolio actions, request deep analysis, and receive machine-readable decisions.", icon: Sparkles },
  { title: "RWA Platforms", text: "Add monitoring, approval analysis, and policy controls to tokenized-asset products.", icon: Landmark },
  { title: "Agent Builders", text: "Integrate portfolio scans, webhooks, x402 payments, and structured risk output.", icon: Code2 },
  { title: "Teams & Treasuries", text: "Set exposure limits, spending caps, approval thresholds, and reporting policies.", icon: Coins },
  { title: "Wallet Providers", text: "Add risk warnings, approval intelligence, and simulation before signing.", icon: WalletCards },
  { title: "Asset Managers", text: "Monitor allocations, liquidity, issuer concentration, and portfolio health.", icon: BarChart3 },
  { title: "Protocols & Marketplaces", text: "Add safety checks around token listings, trading actions, and automated workflows.", icon: Globe2 },
  { title: "Research & Risk Teams", text: "Generate explainable risk reports with confidence, evidence, and incident history.", icon: FileText }
];

function AudienceGrid() {
  return (
    <section id="audiences" className={cn(shell, sectionY)}>
      <SectionIntro
        centered
        title="Purpose-built for how autonomous finance operates."
        text="Whether you are deploying an agent, tokenizing an asset, managing a treasury, or building portfolio infrastructure, Phylax provides risk controls for your workflow."
      />
      <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl" />
        {audienceCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href="/dashboard/docs" className="focus-ring group rounded-3xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:bg-surface-soft">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-10 font-display text-xl font-black">{card.title}</h3>
              <p className="mt-4 min-h-24 text-base leading-7 text-muted">{card.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-main underline decoration-primary underline-offset-4">
                Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function WhyPhylax() {
  const differentiators: IconCard[] = [
    { title: "Proactive, Not Retrospective", text: "Detect exposure, approval, and liquidity risk before the portfolio action is final.", icon: Activity },
    { title: "Explainable Enough to Trust", text: "Every score includes factors, evidence, confidence, and recommended next steps.", icon: FileJson },
    { title: "One Guardian, Not Ten Point Solutions", text: "Monitor, analyse, pay, simulate, enforce, and report through one system.", icon: ShieldCheck },
    { title: "Agent-Native by Design", text: "Machine-readable requests, structured responses, webhooks, and payment-aware workflows.", icon: Webhook }
  ];
  const chips = [
    "Detect exposure spikes",
    "Enforce allocation limits",
    "Scan risky approvals",
    "Simulate every action",
    "Track data freshness",
    "Apply confidence penalties",
    "Estimate fees",
    "Estimate slippage",
    "Block stale-data execution",
    "Block policy violations",
    "Generate agent reports",
    "Create x402 sessions",
    "Approve Upto caps",
    "Record audit events",
    "Produce safe alternatives",
    "Monitor portfolio health"
  ];
  return (
    <section className="overflow-hidden bg-[#191919] text-[#F7F7F2]">
      <div className={cn(shell, sectionY)}>
        <SectionIntro
          centered
          light
          title="Why autonomous agents need Phylax."
          text="Execution speed is not enough. Autonomous finance also needs independent risk checks, explainable policy decisions, and safe failure states."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-3xl border border-[#CDE7C7]/18 bg-[#202020] p-6">
                <Icon className="h-6 w-6 text-[#84DD63]" />
                <h3 className="mt-8 font-display text-xl font-black">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#CDE7C7]">{item.text}</p>
              </div>
            );
          })}
        </div>
        <div className="chip-marquee mt-12 flex gap-3 overflow-hidden py-2" tabIndex={0}>
          {[...chips, ...chips].map((chip, index) => (
            <span key={`${chip}-${index}`} className="shrink-0 rounded-xl border border-[#CDE7C7]/16 bg-[#263428] px-4 py-3 text-sm font-bold text-[#CDE7C7]">
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/dashboard?demo=incident" className={buttonPrimary}>Launch Phylax</Link>
        </div>
      </div>
    </section>
  );
}

function LatestFromPhylax() {
  const cards = [
    ["Research", "Why autonomous agents need portfolio preflight checks", "A practical look at the risks created when execution systems move faster than monitoring, policy, and human review.", "Read the insight", "#protection-lifecycle"],
    ["Risk Model", "How Phylax scores xStocks and RWA portfolios", "An explanation of market, liquidity, concentration, counterparty, approval, volatility, execution, and data-confidence factors.", "Explore the model", "/dashboard/docs"],
    ["Developers", "Building payment-gated deep analysis with x402 and Upto", "How agents can authorise variable-depth analysis while preserving explicit spending limits and machine-readable settlement state.", "Read the guide", "/dashboard/billing"]
  ] as const;
  return (
    <section id="latest" className={cn(shell, sectionY)}>
      <SectionIntro centered title="The latest from Phylax." />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Link key={card[1]} href={card[4]} className="focus-ring group overflow-hidden rounded-3xl border border-border bg-surface transition hover:-translate-y-1">
            <div className="h-56 bg-[radial-gradient(circle_at_30%_25%,color-mix(in_srgb,var(--primary)_32%,transparent),transparent_34%),linear-gradient(135deg,var(--surface-soft),var(--surface))] p-6">
              <div className="flex h-full items-center justify-center rounded-2xl border border-border bg-background/55">
                {(() => {
                  const Icon = [Fingerprint, Gauge, LockKeyhole][index];
                  return <Icon className="h-16 w-16 text-primary" />;
                })()}
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-muted">{card[0]}</p>
              <h3 className="mt-4 font-display text-2xl font-black leading-tight">{card[1]}</h3>
              <p className="mt-5 text-base leading-7 text-muted">{card[2]}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-main underline decoration-primary underline-offset-4">
                {card[3]} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className={cn(shell, "py-10 md:py-16")}>
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[#CDE7C7]/18 bg-[#191919] p-6 text-[#F7F7F2] shadow-panel md:p-12 lg:p-16">
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 opacity-25 lg:block">
          <PhylaxMark className="h-72 w-60" />
        </div>
        <div className="relative max-w-3xl">
          <h2 className="font-display text-4xl font-black leading-tight md:text-6xl">Ready to give every agent a guardian?</h2>
          <p className="mt-6 text-lg leading-8 text-[#CDE7C7]">
            Monitor portfolio risk, detect unsafe approvals, simulate safer outcomes, and enforce policy before capital moves.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard?demo=incident" className={buttonPrimary}>Launch Phylax</Link>
            <Link href="/docs" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-xl border border-[#CDE7C7]/25 px-6 text-sm font-black text-[#F7F7F2] transition hover:bg-[#202020]">
              Read the Docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const footerColumns = [
  ["Product", ["Portfolio Monitoring", "Approval Guard", "Risk Analysis", "Rebalance Simulation", "Reports"]],
  ["Solutions", ["Autonomous Agents", "RWA Platforms", "Teams & Treasuries", "Wallet Providers", "Agent Builders"]],
  ["Developers", ["Documentation", "API Reference", "Agent Intents", "x402/Upto", "Webhooks"]],
  ["Resources", ["Risk Model", "Architecture", "Security", "Demo Scenario", "GitHub"]],
  ["Company", ["About Phylax", "Brand", "Contact", "Privacy", "Terms"]]
] as const;

function PhylaxFooter() {
  function hrefFor(label: string) {
    if (label === "GitHub") return "https://github.com/OutstandingVick/phylax";
    if (label === "Demo Scenario") return "/dashboard?demo=incident";
    if (label === "Reports") return "/dashboard/reports";
    if (label === "Rebalance Simulation") return "/dashboard/rebalance";
    if (label === "Approval Guard") return "/dashboard/alerts";
    if (label === "Portfolio Monitoring") return "/dashboard/portfolio";
    if (label === "Documentation") return "/docs";
    if (label === "API Reference" || label === "Webhooks") return "/docs#api";
    if (label === "Agent Intents") return "/docs#sdk";
    if (label === "Architecture") return "/docs#how-it-works";
    if (label === "Security") return "/docs#verification";
    if (label === "Risk Model") return "/docs#problem";
    if (label === "x402/Upto") return "/docs#business-model";
    return "#audiences";
  }
  return (
    <footer className="bg-[#191919] text-[#F7F7F2]">
      <div className={cn(shell, "relative overflow-hidden py-16 md:py-24")}>
        <PhylaxMark className="absolute left-0 top-16 h-[34rem] w-[28rem] opacity-[0.04]" />
        <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.6fr]">
          <div>
            <PhylaxLogo />
            <p className="mt-6 max-w-sm text-lg leading-8 text-[#CDE7C7]">Protecting value. Empowering agents. Securing the future.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {footerColumns.map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-black uppercase tracking-[0.18em]">{title}</h3>
                <div className="mt-5 grid gap-3">
                  {links.map((label) => {
                    const href = hrefFor(label);
                    const external = href.startsWith("http");
                    const className = "focus-ring rounded-md text-sm font-semibold text-[#CDE7C7] hover:text-[#F7F7F2]";
                    return external ? (
                      <a key={label} href={href} target="_blank" rel="noreferrer" className={className}>{label}</a>
                    ) : (
                      <Link key={label} href={href} className={className}>{label}</Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-16 flex flex-col justify-between gap-5 border-t border-[#CDE7C7]/18 pt-8 text-sm text-[#CDE7C7] md:flex-row md:items-center">
          <div className="flex gap-5">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="font-black hover:text-[#F7F7F2]">X</a>
            <a href="https://github.com/OutstandingVick/phylax" target="_blank" rel="noreferrer" className="font-black hover:text-[#F7F7F2]">GitHub</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="font-black hover:text-[#F7F7F2]">LinkedIn</a>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/docs#limitations" className="hover:text-[#F7F7F2]">Privacy</Link>
            <Link href="/docs#limitations" className="hover:text-[#F7F7F2]">Terms</Link>
            <span>© 2026 Phylax. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function RedesignedHome() {
  return (
    <>
      <HeroSection />
      <EcosystemStrip />
      <MetricsPanel />
      <ProtectionLifecycle />
      <PhylaxEngine />
      <ProductSuite />
      <IncidentCarousel />
      <ResourceBanner />
      <AudienceGrid />
      <WhyPhylax />
      <LatestFromPhylax />
      <FinalCTA />
      <PhylaxFooter />
    </>
  );
}
