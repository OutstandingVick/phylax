import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  CircleDollarSign,
  Code2,
  ExternalLink,
  FileKey2,
  Github,
  LockKeyhole,
  Route,
  ShieldCheck,
  TriangleAlert
} from "lucide-react";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Documentation | Phylax",
  description: "Product, API, verification, business model, and post-hackathon roadmap for the Phylax agent risk infrastructure service."
};

const toc = [
  ["Overview", "overview"],
  ["Problem", "problem"],
  ["How it works", "how-it-works"],
  ["Verification", "verification"],
  ["API reference", "api"],
  ["SDK integration", "sdk"],
  ["Business model", "business-model"],
  ["Roadmap", "roadmap"],
  ["Limitations", "limitations"],
  ["Research", "research"]
] as const;

const requestExample = `curl -X POST https://phylax-ivory.vercel.app/api/agent/query \\
  -H "Content-Type: application/json" \\
  -d '{
    "requestingAgentId": "portfolio-agent-01",
    "intent": "execution.preflight",
    "walletAddress": "0x742d...44e",
    "proposedAction": {
      "type": "swap",
      "from": "USDC",
      "to": "TSLAx",
      "amountUsd": 10000,
      "slippagePct": 0.4
    },
    "policy": {
      "maxSingleAssetExposurePct": 30,
      "maxSlippagePct": 0.5,
      "blockStaleData": true
    }
  }'`;

const sdkExample = `import { PhylaxClient } from "@phylax/sdk";

const phylax = new PhylaxClient({
  baseUrl: "https://phylax-ivory.vercel.app"
});

const result = await phylax.preflight({
  requestingAgentId: "portfolio-agent-01",
  walletAddress: "0x742d...44e",
  proposedAction,
  policy
});

if (result.decision !== "allow") {
  throw new Error(result.reason);
}`;

const endpoints = [
  ["POST", "/api/agent/query", "Run a portfolio scan, deep analysis, simulation, or execution preflight."],
  ["GET", "/api/attestations/public-key", "Fetch the active Ed25519 verification key."],
  ["POST", "/api/attestations/verify", "Verify a signed decision and its action, policy, and evidence bindings."],
  ["GET", "/api/evidence", "Inspect the signed public evidence manifest for this deployment."]
] as const;

const phases = [
  ["July 2026", "Hackathon", "Keep the ASP live, publish the reproducible demo, complete submission, and collect reviewer feedback."],
  ["0-30 days", "Technical hardening", "Add scoped API keys, durable storage, rate limits, idempotency, observability, and a published threat model."],
  ["Aug-Sep 2026", "Private alpha", "Onboard 10-20 agent developers, add controlled live read-only data, webhooks, decision history, and policy templates."],
  ["Oct-Dec 2026", "Public beta", "Launch paid plans and supported settlement, continuous monitoring, broader risk coverage, and an external security review."],
  ["H1 2027", "Production", "Add team roles, SSO, versioned policy packs, tamper-evident exports, SLOs, and platform pilots."]
] as const;

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-border py-12 md:py-16">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-soft">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl font-black leading-tight md:text-4xl">{title}</h2>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-[#111] p-5 text-xs leading-6 text-[#CDE7C7] shadow-panel md:text-sm">
      <code>{children}</code>
    </pre>
  );
}

export default function PublicDocsPage() {
  return (
    <main className="phylax-page-gradient min-h-screen text-main">
      <MarketingNav />

      <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-16 md:px-8 md:pt-24 lg:px-16">
        <header id="overview" className="scroll-mt-32 border-b border-border pb-14 md:pb-20">
          <div className="flex flex-wrap gap-2">
            {["OKX.AI ASP #6127", "Production demo", "Simulation-first"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/80 px-3 py-2 text-xs font-black text-muted">
                <BadgeCheck className="h-4 w-4 text-primary-soft" /> {item}
              </span>
            ))}
          </div>
          <p className="mt-9 text-sm font-black uppercase tracking-[0.18em] text-primary-soft">Phylax documentation</p>
          <h1 className="mt-4 max-w-5xl font-display text-4xl font-black leading-[1.08] md:text-6xl">
            The policy and risk layer between agent intent and portfolio execution.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted">
            Phylax evaluates xStocks and RWA portfolio actions before capital moves. It combines portfolio context, approval checks, execution constraints, owner policy, simulation, and signed machine-readable decisions.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/evidence" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-black text-background transition hover:-translate-y-0.5">
              Verify live proof <ShieldCheck className="h-4 w-4" />
            </Link>
            <a href="https://phylax-ivory.vercel.app/api/evidence" target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-surface/70 px-6 text-sm font-black hover:bg-surface-soft">
              Evidence manifest <ExternalLink className="h-4 w-4" />
            </a>
            <a href="https://github.com/OutstandingVick/phylax" target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border px-6 text-sm font-black hover:bg-surface-soft">
              Source <Github className="h-4 w-4" />
            </a>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label="Documentation sections" className="sticky top-32 py-12">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-muted">On this page</p>
              <div className="grid border-l border-border">
                {toc.map(([label, id]) => (
                  <a key={id} href={`#${id}`} className="focus-ring border-l-2 border-transparent px-4 py-2 text-sm font-semibold text-muted hover:border-primary hover:text-main">
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          <article className="min-w-0">
            <Section id="problem" eyebrow="Problem statement" title="Execution is getting autonomous faster than its controls.">
              <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-5 text-base leading-7 text-muted">
                  <p>
                    A finance agent can produce a plausible transaction while missing concentration limits, stale prices, weak liquidity, unsafe allowances, excessive slippage, or an owner policy. Tokenized assets add issuer, custodian, redemption, wrapper, oracle, settlement, and market-hours dependencies.
                  </p>
                  <p>
                    The missing default is an independent checkpoint that answers a narrow question before execution: should this action be allowed, warned, blocked, or escalated?
                  </p>
                  <p>
                    The Financial Stability Board identifies liquidity, leverage, interconnectedness, asset-quality, and operational vulnerabilities in tokenization. OWASP separately recommends least privilege, explicit authorization, action previews, risk-based autonomy, and audit trails for AI agents. Phylax applies those control patterns to portfolio actions.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  {[
                    ["$30.87B", "Distributed RWA value"],
                    ["$1.08B", "Tokenized-stock value"],
                    ["$252.8M", "xStocks across 75 assets"]
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-lg border border-border bg-surface/70 p-5">
                      <p className="font-display text-2xl font-black text-primary-soft">{value}</p>
                      <p className="mt-2 text-sm font-semibold text-muted">{label}</p>
                    </div>
                  ))}
                  <p className="text-xs leading-5 text-muted">RWA.xyz snapshots accessed July 16, 2026. Market figures are time-sensitive.</p>
                </div>
              </div>
            </Section>

            <Section id="how-it-works" eyebrow="Product flow" title="Ask Phylax before execution.">
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  [Code2, "1. Submit intent", "An agent sends the action, wallet context, portfolio evidence, and owner policy."],
                  [BookOpen, "2. Normalize evidence", "Phylax preserves provenance, checks freshness, and derives portfolio and approval risk factors."],
                  [ShieldCheck, "3. Evaluate policy", "Concentration, slippage, blocked assets, action size, confidence, and other limits are evaluated."],
                  [Route, "4. Return a decision", "The caller receives allow, warn, block, or escalate with reasons and before/after risk."],
                  [FileKey2, "5. Sign the result", "Eligible preflights include an expiring Ed25519 attestation bound to the action, policy, and evidence."],
                  [LockKeyhole, "6. Enforce upstream", "The execution agent verifies the proof and enforces the result before asking a wallet to sign."]
                ].map(([Icon, title, description]) => (
                  <div key={String(title)} className="rounded-lg border border-border bg-surface/65 p-5">
                    <Icon className="h-6 w-6 text-primary-soft" />
                    <h3 className="mt-4 text-base font-black">{String(title)}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{String(description)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-lg border-l-4 border-accent bg-surface/65 p-5">
                <p className="font-black">Phylax is a control layer, not a trading strategy.</p>
                <p className="mt-2 text-sm leading-6 text-muted">It does not choose what to buy, custody funds, or replace a wallet. It evaluates whether a proposed action fits the supplied evidence and policy.</p>
              </div>
            </Section>

            <Section id="verification" eyebrow="Trust and verification" title="Decisions are inspectable, purpose-bound, and expiring.">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-3 text-xl font-black"><BadgeCheck className="h-6 w-6 text-primary-soft" /> What the proof establishes</h3>
                  <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
                    {["The decision was signed by the published Phylax key.", "The action, policy, and evidence hashes match the signed payload.", "The attestation has not expired.", "A changed action or response fails verification."].map((item) => (
                      <li key={item} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-primary-soft" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center gap-3 text-xl font-black"><TriangleAlert className="h-6 w-6 text-accent" /> What it does not establish</h3>
                  <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
                    {["Caller-supplied portfolio evidence is not independently verified merely because the decision is signed.", "A valid signature is not financial advice or a guarantee against loss.", "The MVP does not persist one-time nonce consumption across instances.", "Signing proves what Phylax evaluated, not that a downstream agent enforced it."].map((item) => (
                      <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link href="/dashboard/evidence" className="mt-8 inline-flex items-center gap-2 text-sm font-black text-primary-soft underline underline-offset-4">
                Open the interactive verifier <ArrowRight className="h-4 w-4" />
              </Link>
            </Section>

            <Section id="api" eyebrow="API reference" title="One endpoint for agent-readable risk decisions.">
              <p className="max-w-3xl text-base leading-7 text-muted">
                The API accepts six intents: <code className="text-main">portfolio.scan</code>, <code className="text-main">approval.scan</code>, <code className="text-main">risk.deep_analysis</code>, <code className="text-main">rebalance.simulate</code>, <code className="text-main">execution.preflight</code>, and <code className="text-main">report.generate</code>.
              </p>
              <div className="mt-7"><CodeBlock>{requestExample}</CodeBlock></div>
              <div className="mt-8 grid gap-3">
                {endpoints.map(([method, path, description]) => (
                  <div key={path} className="grid gap-3 rounded-lg border border-border bg-surface/65 p-4 md:grid-cols-[64px_260px_1fr] md:items-center">
                    <span className="w-fit rounded bg-primary px-2 py-1 font-mono text-xs font-black text-background">{method}</span>
                    <code className="break-all text-sm font-bold text-main">{path}</code>
                    <p className="text-sm leading-6 text-muted">{description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-6 text-muted">The OpenAPI contract lives in <a href="https://github.com/OutstandingVick/phylax/blob/main/docs/openapi.yaml" target="_blank" rel="noreferrer" className="font-bold text-primary-soft underline underline-offset-4">docs/openapi.yaml</a>.</p>
            </Section>

            <Section id="sdk" eyebrow="Agent integration" title="Put the preflight immediately before signing.">
              <CodeBlock>{sdkExample}</CodeBlock>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {[
                  ["Fail closed", "Treat network errors, stale evidence, and invalid signatures as escalation conditions for high-impact actions."],
                  ["Bind exact intent", "Verify the same action, policy, and evidence that the execution agent plans to use."],
                  ["Keep authority scoped", "Phylax returns a decision; wallet credentials and transaction authority stay with the caller."]
                ].map(([title, body]) => (
                  <div key={title} className="border-t-2 border-primary pt-4">
                    <h3 className="font-black">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="business-model" eyebrow="Monetization" title="Usage-based infrastructure plus subscription software.">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  [CircleDollarSign, "Agent payments", "Per-request deep analysis and execution preflight through marketplace-compatible rails such as x402/Upto."],
                  [Code2, "Developer API", "Monthly plans for included decisions, keys, webhooks, higher limits, and history."],
                  [ShieldCheck, "Continuous monitoring", "Per-wallet subscriptions for scheduled scans, alerts, and recurring reports."],
                  [LockKeyhole, "Enterprise controls", "Custom policy packs, private deployment, SSO, audit retention, support, and service commitments."]
                ].map(([Icon, title, body]) => (
                  <div key={String(title)} className="rounded-lg border border-border bg-surface/65 p-5">
                    <Icon className="h-6 w-6 text-primary-soft" />
                    <h3 className="mt-4 font-black">{String(title)}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{String(body)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="bg-surface-soft text-main"><tr><th className="p-4">Plan</th><th className="p-4">Customer</th><th className="p-4">Pricing hypothesis</th></tr></thead>
                  <tbody className="divide-y divide-border bg-surface/60 text-muted">
                    <tr><td className="p-4 font-bold text-main">Free</td><td className="p-4">Individual evaluator</td><td className="p-4">$0, 25 basic scans/month</td></tr>
                    <tr><td className="p-4 font-bold text-main">Agent request</td><td className="p-4">Autonomous agent</td><td className="p-4">$0.50-$3 per deep check</td></tr>
                    <tr><td className="p-4 font-bold text-main">Developer</td><td className="p-4">Independent builder</td><td className="p-4">$49/month</td></tr>
                    <tr><td className="p-4 font-bold text-main">Team</td><td className="p-4">DAO, startup, small fund</td><td className="p-4">$299/month</td></tr>
                    <tr><td className="p-4 font-bold text-main">Enterprise</td><td className="p-4">Wallet, platform, institution</td><td className="p-4">From $2,500/month</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-5 text-muted">These prices are validation hypotheses, not current offers or commitments. The initial value metric is risk decisions processed, not assets under management.</p>
            </Section>

            <Section id="roadmap" eyebrow="Post-hackathon plan" title="From reproducible proof to dependable infrastructure.">
              <div className="grid gap-0 border-l border-border">
                {phases.map(([date, title, body]) => (
                  <div key={title} className="relative pb-9 pl-7 last:pb-0">
                    <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full border-2 border-background bg-primary-soft" />
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-soft">{date}</p>
                    <h3 className="mt-2 text-lg font-black">{title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{body}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="limitations" eyebrow="Current boundaries" title="A useful safety layer must say where its certainty ends.">
              <div className="rounded-lg border border-accent/50 bg-surface/70 p-6">
                <ul className="grid gap-4 text-sm leading-6 text-muted md:grid-cols-2">
                  {["The public MVP is non-custodial and simulation-first; broad live execution is not enabled.", "No production authentication, customer API keys, or durable request database are included yet.", "Market and portfolio evidence may be simulated or caller-supplied and is labeled by provenance.", "Risk scores and signed decisions are decision support, not financial, legal, or investment advice.", "A false negative can permit harm and a false positive can block a legitimate action.", "Production rollout requires verified providers, transaction simulation, consent controls, monitoring, and external security review."].map((item) => (
                    <li key={item} className="flex gap-3"><TriangleAlert className="mt-1 h-4 w-4 shrink-0 text-accent" />{item}</li>
                  ))}
                </ul>
              </div>
            </Section>

            <Section id="research" eyebrow="Evidence base" title="Research supporting the problem statement.">
              <div className="grid gap-3">
                {[
                  ["RWA.xyz Global Market Overview", "Tokenized-asset market size, assets, and holder snapshots.", "https://app.rwa.xyz/"],
                  ["RWA.xyz Tokenized Stocks", "Tokenized-stock value, transfer volume, holders, and xStocks market snapshot.", "https://app.rwa.xyz/stocks"],
                  ["Financial Stability Board", "Liquidity, leverage, interconnectedness, asset-quality, and operational vulnerabilities in tokenization.", "https://www.fsb.org/2024/10/the-financial-stability-implications-of-tokenisation/"],
                  ["Bank for International Settlements", "Dependencies on custodians, oracles, maintainers, bridges, and settlement assets.", "https://www.bis.org/fsi/fsisummaries/exsum_23905.htm"],
                  ["OWASP AI Agent Security Cheat Sheet", "Controls for tool abuse, excessive autonomy, approval manipulation, and high-impact actions.", "https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html"],
                  ["FBI Internet Crime Report", "Reported internet-crime and cryptocurrency investment-fraud loss context.", "https://www.fbi.gov/news/press-releases/fbi-releases-annual-internet-crime-report"]
                ].map(([title, description, href]) => (
                  <a key={title} href={href} target="_blank" rel="noreferrer" className="group grid gap-2 rounded-lg border border-border bg-surface/60 p-5 transition hover:border-primary md:grid-cols-[240px_1fr_auto] md:items-center">
                    <span className="font-black group-hover:text-primary-soft">{title}</span>
                    <span className="text-sm leading-6 text-muted">{description}</span>
                    <ExternalLink className="h-4 w-4 text-muted" />
                  </a>
                ))}
              </div>
              <p className="mt-6 text-xs leading-5 text-muted">Sources support the existence and nature of the problem. They do not validate Phylax pricing, revenue projections, or product performance. Market metrics were accessed July 16, 2026 and should be refreshed before later use.</p>
            </Section>
          </article>
        </div>
      </div>

      <Footer />
    </main>
  );
}
