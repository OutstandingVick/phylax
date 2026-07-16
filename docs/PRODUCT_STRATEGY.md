# Phylax Product, Business, and Growth Strategy

**Product:** Phylax  
**Category:** Software Services / Agent Service Provider (ASP)  
**Positioning:** The risk and policy layer between agent intent and portfolio execution  
**Primary market:** Autonomous xStocks and real-world asset (RWA) workflows  
**Document status:** Hackathon submission and post-hackathon operating plan  
**Last updated:** 2026-07-16

## 1. Executive Summary

Phylax is an agent-native risk infrastructure service for xStocks and RWA portfolios. Before an autonomous agent trades, rebalances, grants an approval, or moves tokenized capital, it can ask Phylax whether the proposed action is safe and consistent with the owner's policy.

Phylax combines portfolio monitoring, concentration analysis, approval scanning, liquidity and execution checks, explainable risk scoring, rebalance simulation, and machine-readable preflight decisions. The hackathon MVP exposes these capabilities through a web dashboard and a public agent endpoint. High-impact execution remains simulation-only until production wallet, market-data, transaction-simulation, and signing integrations are verified.

The commercial thesis is straightforward: as tokenized assets and autonomous finance agents grow, every execution agent will need an independent control layer. Phylax can monetize that layer through per-request agent payments, developer API subscriptions, continuous portfolio-monitoring plans, and enterprise policy and reporting contracts.

## 2. Problem Statement

### 2.1 The core problem

Autonomous finance agents can increasingly discover assets, construct transactions, and move capital, but execution capability is advancing faster than independent risk control. A model may produce a plausible trade while still overlooking concentration limits, stale or weak price data, illiquid routes, unsafe token allowances, excessive slippage, an untrusted counterparty, or a policy restriction.

This creates a control gap:

> There is no default, agent-native checkpoint that independently answers: "Should this portfolio action be allowed, blocked, or escalated before capital moves?"

The gap is more pronounced for tokenized stocks and RWAs because a token is not the underlying asset itself. Its risk can also depend on the issuer, custodian, redemption mechanism, market hours, oracle or reference price, token wrapper, settlement asset, blockchain, and available secondary-market liquidity.

### 2.2 Evidence that the problem is real

#### Tokenized assets are already economically meaningful

RWA.xyz displayed **$30.87 billion in distributed RWA value**, **889,409 RWA holders**, and **4,866 tracked distributed and represented assets** in its 2026 market snapshot. Its tokenized-stock dashboard displayed **$1.08 billion in tokenized-stock value**, **$2.30 billion in monthly transfer volume**, and about **190,610 holders**. xStocks alone represented **$252.8 million across 75 assets** in that snapshot.[^1][^2]

These figures show that tokenized securities are no longer only a technical experiment. Capital, users, issuers, and transfer activity are already present, so failures in monitoring or execution can have real financial consequences.

#### Tokenization introduces multiple layers of risk

The Financial Stability Board identifies vulnerabilities in DLT-based tokenization related to **liquidity and maturity mismatch, leverage, asset price and quality, interconnectedness, and operational fragilities**. It also warns that complexity and opacity may create unpredictable outcomes during stress as adoption grows.[^3]

The Bank for International Settlements' summary of the FSB work highlights additional dependencies on custodians, oracles, protocol maintainers, bridges, and the chosen settlement asset. These dependencies can affect both platform operation and token valuation.[^4]

This supports Phylax's decision to score several dimensions rather than presenting balances or total value alone.

#### Autonomous agents add a new execution-risk surface

OWASP identifies tool abuse, privilege escalation, goal hijacking, excessive autonomy, high-impact action abuse, approval manipulation, and cascading failures as key agent-security risks. Its recommended controls include least privilege, explicit authorization for sensitive tools, action previews, approval requirements for high-impact operations, risk-based autonomy boundaries, and audit trails.[^5]

Phylax implements this pattern for portfolio actions: analyze the proposed action, compare it with explicit policy, return an explainable decision, simulate the result, and require approval before any future live execution.

#### The financial stakes of weak digital-asset controls are high

The FBI's 2024 Internet Crime Report recorded more than **$16 billion in reported internet-crime losses**, with cryptocurrency-related investment fraud accounting for more than **$6.5 billion**.[^6] Phylax is not an anti-fraud guarantee and cannot prevent social engineering by itself. However, the scale of reported loss strengthens the case for policy gates, permission checks, clear warnings, and auditable confirmation before irreversible financial actions.

### 2.3 User pain points

| User | Current pain | Consequence |
|---|---|---|
| Portfolio agent | Must assemble risk logic from several tools | Inconsistent or missing pre-trade controls |
| xStocks/RWA investor | Sees balances but not wrapper, liquidity, approval, or concentration risk | False confidence in portfolio safety |
| Agent developer | Has no standard risk decision endpoint | Rebuilds safety logic for every agent |
| Team, DAO, or fund | Policies live in documents or manual processes | Slow approvals and weak enforcement |
| Platform or marketplace | Third-party agents can act with broad authority | Higher support, trust, and incident risk |

## 3. Product Thesis

Phylax should become the independent pre-execution control plane for autonomous capital.

It does not replace a wallet, exchange, portfolio manager, or investment strategy. It sits between intent and execution:

```text
Agent intent
    -> portfolio and market context
    -> Phylax risk analysis
    -> owner policy evaluation
    -> allow / warn / block / escalate
    -> simulation and approval
    -> execution provider
    -> audit record
```

The product wins when another agent treats a Phylax preflight as a standard prerequisite before moving capital.

## 4. Proposed Solution

### 4.1 Core capabilities

| Capability | What it does | User value |
|---|---|---|
| Portfolio scan | Aggregates holdings, allocation, exposure, and health | A single risk-aware portfolio view |
| Concentration analysis | Compares exposure with configurable limits | Prevents accidental overexposure |
| Approval scan | Flags risky or excessive token allowances | Reduces permission-related exposure |
| Liquidity and execution checks | Evaluates route quality, confidence, slippage, and stale data | Avoids poor or uncertain execution |
| Explainable risk score | Produces a weighted 0-100 score with contributing factors | Makes the decision inspectable |
| Rebalance simulation | Shows before/after allocation, cost, slippage, risk, and health | Lets users assess impact before action |
| Policy engine | Applies blocked assets, exposure caps, spending limits, and approval rules | Converts intent into enforceable control |
| Agent API | Returns structured allow, warn, block, or escalate decisions | Fits autonomous and multi-agent workflows |
| Audit report | Records inputs, evidence, policy result, and recommendation | Supports review and accountability |

### 4.2 Current MVP

The current implementation includes:

- a public marketing site and dashboard;
- deterministic portfolio, concentration, liquidity, approval, and confidence modules;
- an incident demo with a concentrated TSLA.x position and risky USDC approval;
- a rebalance simulator with before-and-after risk output;
- a public `POST /api/agent/query` endpoint;
- a demo payment lifecycle for deeper analysis;
- machine-readable decisions for agent consumption; and
- typed boundaries for future OKX Onchain OS, Agentic Wallet, market, DEX, x402, and Upto integrations.

The MVP is deliberately non-custodial and simulation-first. It does **not** yet provide production wallet signing, live market execution, onchain x402 settlement, production authentication, or runtime database persistence.

### 4.3 Differentiation

| Alternative | Primary job | Gap addressed by Phylax |
|---|---|---|
| Portfolio tracker | Shows balances and performance | Phylax evaluates proposed actions and policy |
| Wallet security scanner | Detects token or approval threats | Phylax combines security with portfolio and execution risk |
| Trading agent | Finds and executes opportunities | Phylax independently checks whether execution should proceed |
| Transaction simulator | Predicts transaction effects | Phylax adds portfolio context and owner-defined limits |
| Generic risk dashboard | Serves human analysts | Phylax returns agent-readable, actionable decisions |

The defensible product is not a single score. It is the combination of normalized asset data, transparent risk evidence, configurable policies, agent workflow integrations, decision history, and feedback from real outcomes.

## 5. Target Customers and Jobs to Be Done

### Primary beachhead: agent developers

Agent developers need a reusable endpoint that reduces the time and liability involved in building pre-trade safeguards. They are the fastest path to repeat usage because one integration can generate many automated checks.

**Job:** "Before my agent moves funds, give me a fast, structured, explainable decision I can enforce in code."

### Secondary market: active xStocks and RWA users

These users need portfolio monitoring that understands both onchain state and the structure of tokenized assets.

**Job:** "Tell me where my portfolio is fragile and what a safer allocation would look like before I approve a transaction."

### Expansion market: teams, DAOs, funds, wallets, and platforms

Organizations need shared policies, roles, audit logs, reporting, service guarantees, and integration support.

**Job:** "Turn our risk policy into a control that every human and agent workflow must pass."

## 6. Business Model

### 6.1 Model overview

Phylax uses a hybrid **usage-based infrastructure plus subscription software** model.

1. **Agent-to-service payments:** agents pay per deep analysis or preflight through marketplace-compatible payment rails such as x402/Upto.
2. **Developer API subscriptions:** builders pay monthly for included requests, API keys, webhooks, higher rate limits, and decision history.
3. **Continuous monitoring subscriptions:** users and teams pay per monitored wallet or portfolio for scheduled scans and alerts.
4. **Enterprise contracts:** platforms, funds, and wallets pay for private deployment, custom policy packs, reporting, support, and service-level commitments.

Phylax should not initially charge a percentage of assets under management. A software and usage model is easier to explain, aligns price with delivered infrastructure, and avoids presenting the product as a discretionary asset manager.

### 6.2 Proposed pricing

The following prices are hypotheses for customer testing, not current commitments.

| Plan | Target customer | Included value | Proposed price |
|---|---|---|---|
| Free | Individual evaluator | 1 wallet, 25 basic scans/month, demo policies | $0 |
| Agent micro-payment | Autonomous agent | One deep analysis or execution preflight | $0.50-$3.00 per request |
| Developer | Independent builder | 5,000 checks/month, API key, webhooks, 30-day history | $49/month |
| Team | DAO, startup, small fund | 25,000 checks/month, 10 wallets, shared policies, alerts, 1-year audit history | $299/month |
| Enterprise | Wallet, platform, institution | Custom volume, SSO, private policies, SLA, dedicated support | From $2,500/month |

Overage pricing can range from $0.01 for a basic deterministic check to $0.25 or more for a data-intensive deep analysis. The marketplace demo's maximum authorization of 3 USDC provides a credible upper bound for a single premium analysis, while actual production prices should follow measured data, compute, and settlement costs.

### 6.3 Value metric

The primary value metric is **risk decisions processed**. Secondary metrics are monitored wallets, policy packs, retention period, alert channels, and support level.

This aligns pricing with customer value: an agent that executes more frequently creates more risk-decision traffic, while a team with complex governance pays for broader controls and accountability.

### 6.4 Illustrative unit economics

These are planning assumptions to be validated during the private alpha.

| Metric | Deep-analysis request | Developer subscription |
|---|---:|---:|
| Average revenue | $2.00 | $49.00/month |
| Estimated variable cost | $0.35 | $12.00/month |
| Contribution | $1.65 | $37.00/month |
| Contribution margin | 82.5% | 75.5% |

Variable cost includes market and chain data, model or compute usage, infrastructure, payment fees, and observability. It excludes salaries, security audits, legal work, and customer acquisition.

The first economic validation target is a **greater than 70% contribution margin** after real provider and settlement costs are measured.

### 6.5 Revenue scenarios

These are directional scenarios, not forecasts.

| Scenario | Paying accounts | Usage revenue/month | Subscription revenue/month | Total MRR |
|---|---:|---:|---:|---:|
| Validation | 20 developers, 2 teams | $1,000 | $1,578 | $2,578 |
| Early traction | 100 developers, 10 teams, 1 enterprise | $5,000 | $10,390 | $15,390 |
| Growth | 500 developers, 50 teams, 5 enterprise | $25,000 | $51,950 | $76,950 |

The purpose of these scenarios is to expose the growth levers: integrations, request frequency, paid conversion, team adoption, and enterprise expansion.

## 7. Go-to-Market Strategy

### Phase 1: ecosystem-led distribution

- Launch through OKX.AI as an ASP with a clear `execution.preflight` service.
- Publish copy-paste integrations and sample policies for finance-agent builders.
- Offer a free allowance so developers can test Phylax without procurement.
- Demonstrate blocked incidents, not generic dashboards, in social and technical content.
- Recruit 10-20 design partners from hackathon participants, agent developers, and xStocks users.

### Phase 2: developer adoption

- Release TypeScript and Python SDKs.
- Add sandbox keys, request logs, webhooks, and deterministic test fixtures.
- Create integration guides for portfolio agents, wallets, treasuries, and agent frameworks.
- Publish transparent score methodology and benchmark scenarios.
- Introduce referral credits for agents that bring paid request volume.

### Phase 3: team and platform sales

- Package shared policies, roles, audit exports, and incident workflows.
- Target wallets and agent platforms that need a safety layer across many users.
- Offer paid pilots with defined success criteria and integration support.
- Convert successful pilots into annual contracts with volume commitments.

## 8. Product Metrics

### North-star metric

**Monthly protected actions:** unique proposed financial actions evaluated by Phylax before execution.

This measures real use of the safety layer without claiming that every check prevented a loss.

### Supporting metrics

| Area | Metric |
|---|---|
| Adoption | Active agents, active wallets, API keys created, integration completion rate |
| Usage | Protected actions, scans per active agent, monitored portfolio days |
| Product quality | Decision latency, data freshness, uptime, explainability rating |
| Risk quality | Confirmed true positives, false-positive rate, false-negative incidents, override rate |
| Revenue | Paid requests, free-to-paid conversion, MRR, net revenue retention |
| Economics | Variable cost per decision, contribution margin, support cost per account |
| Trust | Policies enabled, human confirmations, audit reports generated, security incidents |

The team must avoid using "loss prevented" as a headline metric unless a customer can verify both the counterfactual and the amount.

## 9. Post-Hackathon Roadmap

### Stage 0: Hackathon completion (July 2026)

**Outcome:** prove the workflow and secure ecosystem visibility.

- Keep the public agent endpoint reliable and documented.
- Complete OKX.AI review and listing.
- Publish a sub-90-second product walkthrough and participation post.
- Submit the final hackathon form with product, ASP, repository, demo, and social links.
- Capture reviewer and user feedback in a prioritized issue list.

**Exit criteria:** ASP is live, the demo is reproducible, and at least five external users complete the incident flow.

### Stage 1: Technical hardening (0-30 days after hackathon)

**Outcome:** move from polished demo to secure testable service.

- Add production authentication, scoped API keys, rate limits, and abuse controls.
- Add durable database persistence for requests, policies, payments, alerts, and audit events.
- Verify official OKX.AI, A2MCP, Agentic Wallet, X Layer, market, DEX, x402, and Upto contracts.
- Replace demo adapters one at a time behind the existing integration interfaces.
- Add structured logs, tracing, uptime checks, alerting, and idempotency controls.
- Publish a threat model and complete an internal security review.

**Targets:** 99% test-environment availability, p95 basic-check latency below 1.5 seconds excluding upstream delays, and zero untracked high-impact actions.

### Stage 2: Private alpha (August-September 2026)

**Outcome:** validate risk usefulness and integration demand with design partners.

- Onboard 10-20 developers and 25-50 monitored wallets.
- Integrate live read-only portfolio and market data for a controlled asset list.
- Launch API keys, webhooks, decision history, and configurable policy templates.
- Run live transaction simulation while keeping execution disabled by default.
- Label evidence freshness and confidence in every decision.
- Measure overrides, false positives, missed risks, latency, and willingness to pay.

**Targets:** 10 active agent integrations, 1,000 monthly protected actions, at least 30% weekly developer retention, and a documented review process for every incorrect high-risk decision.

### Stage 3: Public beta and monetization (October-December 2026)

**Outcome:** prove repeat usage and paid demand.

- Launch self-serve billing and real x402/Upto settlement where officially supported.
- Release Developer and Team plans.
- Add continuous monitoring, alert webhooks, email delivery, and scheduled reports.
- Expand risk coverage for issuer, custodian, wrapper, oracle, liquidity, and venue factors.
- Add explicit consent and policy-gated execution for a narrowly supported set of actions.
- Commission an external security assessment before enabling live execution broadly.

**Targets:** 100 active developers, 25 paying accounts, $3,000 MRR, greater than 70% contribution margin, and fewer than 5% unexplained decision overrides.

### Stage 4: Production launch (H1 2027)

**Outcome:** become dependable risk infrastructure for teams and platforms.

- Provide multi-wallet and team accounts, roles, SSO, and policy approvals.
- Add versioned policy packs and tamper-evident audit exports.
- Establish service-level objectives, incident response, disaster recovery, and support operations.
- Support additional networks and RWA categories only after data-quality and legal review.
- Launch platform pilots with wallets, agent marketplaces, and treasury products.

**Targets:** 1 million cumulative protected actions, 99.9% service availability, 10 enterprise pilots, and no critical unresolved audit findings.

### Stage 5: Scale and intelligence (H2 2027 and beyond)

**Outcome:** create a network-level standard for autonomous financial safety.

- Add policy learning from approved and rejected actions without weakening owner control.
- Build cross-agent reputation and counterparty risk signals.
- Offer institutional reporting and private deployment options.
- Develop risk benchmarks for tokenized asset and agent workflows.
- Expand from portfolio preflight into continuous, cross-venue exposure control.

## 10. Key Risks and Mitigations

| Risk | Why it matters | Mitigation |
|---|---|---|
| Incorrect risk decision | A false negative can permit harm; a false positive can block legitimate activity | Explainable factors, confidence thresholds, simulation, human approval, staged rollout |
| Stale or manipulated data | Bad prices or metadata corrupt the decision | Multi-source validation, freshness labels, fail-closed policy for critical actions |
| Over-automation | An agent may act beyond user intent | Least privilege, scoped policies, caps, previews, explicit approval, audit logs |
| Integration dependency | Provider outages can stop or degrade checks | Adapter isolation, timeouts, circuit breakers, degraded-mode responses |
| Regulatory ambiguity | Tokenized securities vary by jurisdiction and structure | No financial or legal advice claims, asset eligibility controls, specialist counsel |
| Security breach | The service handles sensitive portfolio and action data | Data minimization, encryption, secret isolation, access controls, external audit |
| Weak willingness to pay | Users may expect risk checks to be free | Free basic tier, paid depth and monitoring, enterprise control and reporting value |
| Marketplace concentration | Reliance on one ecosystem limits distribution | Standard API, SDKs, multi-platform integrations, direct developer plans |

## 11. Validation Plan

The next product decisions should be driven by evidence, not only feature completion.

1. Interview at least 15 agent developers and 10 xStocks/RWA users.
2. Test whether developers integrate a preflight endpoint into an actual execution flow.
3. Compare $0.50, $1.00, and $2.00 deep-analysis prices and monthly bundles.
4. Record which risk factors change or stop a proposed action.
5. Review every user override to determine whether the policy, data, explanation, or score was wrong.
6. Measure the operational cost of each check using live providers before finalizing limits.
7. Do not enable broad live execution until threat modeling, transaction simulation, consent, rollback planning, and external review are complete.

## 12. Why Phylax Can Win

Phylax is built around a narrow but increasingly important question: whether an autonomous financial action should proceed. The market already has wallets, trading agents, data services, and portfolio dashboards. As those components become more capable, the need for an independent, enforceable, and auditable risk decision becomes stronger.

The long-term opportunity is to make `ask Phylax before execution` a standard agent behavior. If Phylax earns that position, it participates in transaction volume without custodying funds or competing to own the investment strategy.

## 13. Research Notes and Sources

Market figures are time-sensitive snapshots and should be refreshed before investor, grant, or public-market use. Research sources support the existence and nature of the problem; they do not validate Phylax's pricing or revenue projections. Pricing, cost, conversion, and roadmap targets in this document are internal hypotheses.

[^1]: RWA.xyz, [Global Market Overview](https://app.rwa.xyz/), accessed 2026-07-16. The page displayed $30.87B distributed asset value, 889,409 total asset holders, and 4,866 total tracked distributed/represented assets; the page's chart snapshot was dated 2026-06-09.
[^2]: RWA.xyz, [Tokenized Stocks](https://app.rwa.xyz/stocks), accessed 2026-07-16. The page displayed $1.08B total value, $2.30B monthly transfer volume, 190.61K holders, and xStocks at $252.8M across 75 assets; the page's table snapshot was dated 2026-03-12.
[^3]: Financial Stability Board, [The Financial Stability Implications of Tokenisation](https://www.fsb.org/2024/10/the-financial-stability-implications-of-tokenisation/), 2024-10-22.
[^4]: Bank for International Settlements, [Financial stability implications of tokenisation - Executive Summary](https://www.bis.org/fsi/fsisummaries/exsum_23905.htm), 2025-08-28.
[^5]: OWASP Cheat Sheet Series, [AI Agent Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html), accessed 2026-07-16.
[^6]: Federal Bureau of Investigation, [FBI Releases Annual Internet Crime Report](https://www.fbi.gov/news/press-releases/fbi-releases-annual-internet-crime-report), 2025-04-23, summarizing the 2024 IC3 report.
