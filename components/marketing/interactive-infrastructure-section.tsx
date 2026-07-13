"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  CircleDollarSign,
  Hexagon,
  Layers3,
  LockKeyhole,
  Radio,
  ScanLine,
  ShieldCheck,
  TrendingUp,
  WalletCards,
  Zap
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const infrastructure = [
  { id: "onchain-os", label: "Onchain OS", icon: Layers3 },
  { id: "agentic-wallet", label: "Agentic Wallet", icon: WalletCards },
  { id: "app-x402", label: "APP / x402", icon: Zap },
  { id: "x-layer", label: "X Layer", icon: Hexagon }
] as const;

const features = [
  {
    id: "risk-guardian",
    number: "01",
    title: "Risk Guardian",
    description:
      "Continuous assessment across market, liquidity, counterparty, concentration, approval, volatility, and execution risk.",
    icon: ShieldCheck,
    infrastructure: ["onchain-os"],
    status: "Risk scan active",
    signal: "Concentration + approval risk monitored",
    output: "Policy-aware protection enabled"
  },
  {
    id: "portfolio-monitoring",
    number: "02",
    title: "Portfolio Monitoring",
    description: "24/7 position surveillance with health scoring, incident detection, and policy-aware exposure intelligence.",
    icon: TrendingUp,
    infrastructure: ["onchain-os", "agentic-wallet"],
    status: "Surveillance running",
    signal: "PnL, exposure, health, and volatility tracked",
    output: "Live portfolio intelligence"
  },
  {
    id: "intelligent-rebalancing",
    number: "03",
    title: "Intelligent Rebalancing",
    description: "Simulation-first allocation recommendations that reduce risk before autonomous capital moves.",
    icon: ScanLine,
    infrastructure: ["agentic-wallet", "x-layer"],
    status: "Simulation ready",
    signal: "Risk before action",
    output: "Suggested allocation improvement"
  },
  {
    id: "pay-per-insight",
    number: "04",
    title: "Pay-per-Insight",
    description: "x402/Upto-style metering for deep analysis, reports, and agent-query intelligence.",
    icon: CircleDollarSign,
    infrastructure: ["app-x402"],
    status: "x402/Upto enabled",
    signal: "Metered deep analysis",
    output: "Charge only when insight is requested"
  },
  {
    id: "secure-execution",
    number: "05",
    title: "Secure Execution",
    description: "Preflight checks, allowlists, policy thresholds, and signing boundaries before execution.",
    icon: LockKeyhole,
    infrastructure: ["agentic-wallet", "x-layer"],
    status: "Preflight required",
    signal: "Policy + allowlist checks",
    output: "Unsafe action blocked before signing"
  },
  {
    id: "agent-native",
    number: "06",
    title: "Agent-Native",
    description: "A2MCP-ready APIs, webhooks, machine-readable decisions, and terminal-grade response contracts.",
    icon: Hexagon,
    infrastructure: ["app-x402", "onchain-os"],
    status: "A2MCP-ready",
    signal: "Machine-readable response",
    output: "Agent decision contract available"
  }
] as const;

type Feature = (typeof features)[number];

function AnimatedGridBackground({ activeIndex, reduceMotion }: { activeIndex: number; reduceMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_center,rgba(193,219,179,0.42)_1px,transparent_1px)] [background-size:28px_28px]" />
      <motion.div
        className="absolute left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,var(--phx-primary),transparent)] opacity-40"
        animate={reduceMotion ? undefined : { y: ["8%", "92%"] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />
      {[12, 34, 58, 78].map((left, index) => (
        <motion.span
          key={left}
          className="absolute h-1.5 w-1.5 rounded-full bg-[var(--phx-primary)] opacity-40"
          style={{ left: `${left}%`, top: `${22 + index * 16}%` }}
          animate={reduceMotion ? undefined : { opacity: [0.12, 0.45, 0.12], scale: [0.9, 1.35, 0.9] }}
          transition={{ duration: 3.5 + index * 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="absolute left-[7.5rem] hidden w-px bg-[var(--phx-primary)] opacity-25 lg:block"
        animate={reduceMotion ? undefined : { height: `${Math.min(88, 18 + activeIndex * 11)}%` }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </div>
  );
}

function InfrastructurePill({
  item,
  active,
  index,
  reduceMotion
}: {
  item: (typeof infrastructure)[number];
  active: boolean;
  index: number;
  reduceMotion: boolean;
}) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: 0.12 + index * 0.08, duration: 0.45 }}
      className={cn("flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors", active ? "text-[var(--phx-main)]" : "text-[var(--phx-muted)]")}
    >
      <motion.span
        className={cn(
          "grid h-8 w-8 place-items-center transition-colors",
          active && "text-[var(--phx-primary)] drop-shadow-[0_0_16px_rgba(126,188,137,0.45)]"
        )}
        animate={reduceMotion ? undefined : active ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 1.8, repeat: active ? Infinity : 0 }}
      >
        <Icon className={cn("h-4 w-4", active ? "text-[var(--phx-primary)]" : "text-[var(--phx-muted)]")} />
      </motion.span>
      {item.label}
    </motion.div>
  );
}

function FeatureSignalRow({
  feature,
  active,
  index,
  onActivate,
  reduceMotion
}: {
  feature: Feature;
  active: boolean;
  index: number;
  onActivate: () => void;
  reduceMotion: boolean;
}) {
  const Icon = feature.icon;

  return (
    <motion.button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-expanded={active}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay: 0.18 + index * 0.08, duration: 0.5 }}
      layout
      className={cn(
        "group relative grid w-full overflow-hidden border-b border-[var(--phx-border)] px-0 py-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--phx-primary)] md:grid-cols-[0.34fr_0.38fr_1.15fr_2fr] md:py-7",
        active ? "bg-[rgba(126,188,137,0.035)] py-8 md:py-9" : "hover:bg-white/[0.015]"
      )}
    >
      {active && !reduceMotion && (
        <motion.span
          className="absolute inset-y-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(126,188,137,0.16),transparent)]"
          initial={{ x: "-120%" }}
          animate={{ x: "820%" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      )}
      <span
        className={cn(
          "relative font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
          active ? "text-[var(--phx-primary)]" : "text-[var(--phx-muted)]"
        )}
      >
        {feature.number}
      </span>
      <motion.span
        className="relative mt-4 md:mt-0"
        animate={reduceMotion ? undefined : active ? { rotate: [0, -4, 4, 0], scale: [1, 1.08, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      >
        <Icon className={cn("h-5 w-5 transition-colors", active ? "text-[var(--phx-primary)]" : "text-[var(--phx-muted)]")} />
      </motion.span>
      <div className="relative mt-4 md:mt-0">
        <h3 className={cn("font-display text-2xl font-black transition-colors md:text-3xl", active ? "text-[var(--phx-main)]" : "text-[var(--phx-muted)]")}>
          {feature.title}
        </h3>
        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--phx-primary)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--phx-primary)] shadow-[0_0_18px_rgba(126,188,137,0.8)]" />
              Live signal
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p
        className={cn(
          "relative max-w-3xl overflow-hidden text-sm leading-7 transition-colors md:mt-0 md:block md:text-base",
          active ? "mt-4 max-h-40 text-[var(--phx-main)]" : "mt-0 max-h-0 text-[var(--phx-muted)] md:max-h-none"
        )}
      >
        {feature.description}
      </p>
    </motion.button>
  );
}

function ActiveFeaturePanel({ feature, reduceMotion }: { feature: Feature; reduceMotion: boolean }) {
  const Icon = feature.icon;

  return (
    <div className="sticky top-24 hidden self-start border border-[var(--phx-border)] bg-[rgba(18,26,23,0.78)] p-5 backdrop-blur xl:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={feature.id}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
        >
          <div className="flex items-center justify-between border-b border-[var(--phx-border)] pb-4">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-[var(--phx-primary)]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--phx-main)]">System output</span>
            </div>
            <motion.span
              className="h-2 w-2 rounded-full bg-[var(--phx-primary)]"
              animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
          <div className="space-y-5 py-5">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--phx-muted)]">Status</p>
              <p className="mt-2 text-xl font-black text-[var(--phx-main)]">{feature.status}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--phx-muted)]">Signal</p>
              <p className="mt-2 text-sm leading-6 text-[var(--phx-muted)]">{feature.signal}</p>
            </div>
            <div className="border-t border-[var(--phx-border)] pt-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--phx-primary)]">Output</p>
              <p className="mt-2 text-base font-bold text-[var(--phx-main)]">{feature.output}</p>
            </div>
          </div>
          <div className="h-24 overflow-hidden border-t border-[var(--phx-border)] pt-4">
            <svg viewBox="0 0 260 90" className="h-full w-full" aria-hidden="true">
              <path d="M0 64 C32 64 36 24 68 24 S105 66 136 48 174 18 206 34 232 68 260 46" fill="none" stroke="var(--phx-primary)" strokeWidth="1.4" />
              <path d="M0 64 C32 64 36 24 68 24 S105 66 136 48 174 18 206 34 232 68 260 46 L260 90 L0 90Z" fill="var(--phx-primary)" opacity=".08" />
            </svg>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function InteractiveInfrastructureSection() {
  const [activeId, setActiveId] = useState<Feature["id"]>("risk-guardian");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduceMotion = Boolean(useReducedMotion());
  const activeFeature = useMemo(() => features.find((feature) => feature.id === activeId) ?? features[0], [activeId]);
  const activeInfrastructure = new Set(activeFeature.infrastructure);
  const activeIndex = features.findIndex((feature) => feature.id === activeFeature.id);

  return (
    <section
      ref={ref}
      id="product"
      className="relative isolate mx-auto max-w-[1440px] overflow-hidden border-b border-[var(--phx-border)] bg-[var(--phx-bg)] px-8 py-10 [--phx-accent:#FE5D26] [--phx-bg:#0B1110] [--phx-border:rgba(193,219,179,0.18)] [--phx-main:#FAEDCA] [--phx-muted:#C1DBB3] [--phx-primary-soft:#C1DBB3] [--phx-primary:#7EBC89] [--phx-surface-soft:#1A241F] [--phx-surface:#121A17] md:py-14"
    >
      <AnimatedGridBackground activeIndex={Math.max(0, activeIndex)} reduceMotion={reduceMotion} />
      <div className="relative z-10">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.45 }}
          className="grid gap-8 md:grid-cols-[1fr_3fr]"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--phx-primary)]">Built for the decentralized future</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {infrastructure.map((item, index) => (
              <InfrastructurePill key={item.id} item={item} active={activeInfrastructure.has(item.id)} index={index} reduceMotion={reduceMotion} />
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : undefined}
          transition={{ delay: 0.08, duration: 0.75, ease: "easeOut" }}
          className="mt-10 h-px origin-left bg-[var(--phx-border)]"
        />

        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="mt-4">
            {features.map((feature, index) => (
              <FeatureSignalRow
                key={feature.id}
                feature={feature}
                active={activeFeature.id === feature.id}
                index={index}
                onActivate={() => setActiveId(feature.id)}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
          <ActiveFeaturePanel feature={activeFeature} reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}
