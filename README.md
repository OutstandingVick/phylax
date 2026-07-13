# Phylax

Phylax is the autonomous guardian for xStocks and RWA portfolios. Before autonomous agents move tokenized capital, they should ask Phylax whether the action is safe.

## Product Thesis

Phylax sits between agent intent, portfolio data, risk analysis, payment authorization, policy checks, simulation, and execution. It provides portfolio monitoring, concentration and approval-risk detection, payment-gated deep analysis, rebalance simulation, and machine-readable agent decisions.

Phylax provides portfolio risk analysis, not financial advice. Execution is simulated in the MVP unless a verified wallet adapter is configured.

## Demo Flow

Run `/dashboard?demo=incident` and click **Run Incident Demo**. The flow shows:

- Portfolio value `$245,680.35`
- TSLA.x at `37.8%` versus a `25%` policy limit
- Risk `74 High`, health `61 Watch`
- Risky approval: unlimited USDC allowance to `0x9ab...991`
- 402-style Upto payment cap: max `3.00 USDC`
- Exact mock charge `2.18 USDC`
- Rebalance result: risk `74 -> 49`, health `61 -> 78`, fee `$18.42`, slippage `0.21%`
- Final agent-readable JSON report

## Tech Stack

Next.js App Router, React, TypeScript strict mode, Tailwind CSS, lucide-react, lightweight local Zod-compatible validation, deterministic domain modules, and optional Prisma schema scaffolding for SQLite/Postgres-compatible persistence.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Copy `.env.example` to `.env.local` if needed. Do not store private keys, seed phrases, or populated provider secrets in the repo.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
```

## API Routes

- `GET /api/health`
- `GET /api/portfolio/overview`
- `GET /api/portfolio/holdings`
- `POST /api/risk/scan`
- `POST /api/approvals/scan`
- `POST /api/rebalance/simulate`
- `POST /api/rebalance/execute`
- `POST /api/agent/query`
- `POST /api/payments/session`
- `POST /api/payments/approve`
- `GET /api/reports/:id`
- `GET /api/alerts`
- `POST /api/webhooks`

OpenAPI starter: `docs/openapi.yaml`.

## Agent Service

`POST /api/agent/query` supports:

- `portfolio.scan`
- `approval.scan`
- `risk.deep_analysis`
- `rebalance.simulate`
- `execution.preflight`
- `report.generate`

`risk.deep_analysis` returns HTTP 402 until a demo payment session is approved.

## Risk Model

Risk is scored 0-100 where higher is riskier. Weights:

- Market 15%
- Liquidity 15%
- Concentration 20%
- Counterparty/protocol 15%
- Approval 15%
- Volatility 10%
- Execution 5%
- Data confidence 5%

Risk bands: `0-30 low`, `31-60 medium`, `61-80 high`, `81-100 critical`.

## Rebalance Model

The defensive strategy reduces TSLA.x concentration, increases USDC and Treasury/RWA allocation, estimates fees/slippage, and blocks execution when policy, slippage, blocked assets, stale data, or low confidence rules fail. MVP execution is simulation-only.

## Payment Flow

The x402/Upto payment layer is a realistic demo abstraction. It creates a payment session, requires approval, settles a mock charge, and records exact demo cost. It does not perform onchain settlement.

## Integration Adapters

Typed demo adapters exist for OKX Onchain OS, Agentic Wallet, Market API, DEX, x402, and Upto. No official provider contracts are invented. Live integration requires replacing demo adapters after verifying official SDK/API contracts.

## Persistence

`prisma/schema.prisma` models users, wallets, portfolios, holdings, alerts, payments, policies, reports, agent requests, and audit events. `prisma/seed.ts` prints the demo dataset and is optional until Prisma client is installed.

## Documentation

- `docs/ARCHITECTURE.md`
- `docs/AGENT_INTEGRATION.md`
- `docs/SECURITY.md`
- `docs/BRAND_GUIDELINES.md`
- `docs/DEMO_SCRIPT.md`

## Marketplace Positioning

Category: Agent Service Provider. Primary use case: policy-aware risk and security preflight for autonomous xStocks/RWA portfolios.

## Known Limitations

- No real wallet signing.
- No live OKX/X Layer calls.
- No real x402/Upto settlement.
- No production auth or database persistence wired at runtime.
- Risk model is transparent and deterministic, not a guarantee of safety or returns.

## Roadmap

1. Verify official OKX.AI, A2MCP, X Layer, Agentic Wallet, Market API, DEX, x402, and Upto contracts.
2. Replace demo adapters behind existing interfaces.
3. Add production auth, API keys, rate limiting, durable audit logs, and database persistence.
4. Add live wallet simulation and explicit transaction consent.
5. Prepare marketplace listing with screenshots, 90-second video, pricing, support links, and security disclosures.

## Screenshots and Demo Video

Place final screenshots and the demo video link here before marketplace submission.
