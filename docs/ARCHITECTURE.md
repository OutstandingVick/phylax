# Phylax Architecture

Phylax is a Next.js App Router MVP with a modular domain core and demo adapters for unavailable provider integrations.

## Layers

- Marketing and dashboard UI: `app/`, `components/`
- Agent/API routes: `app/api/**`
- Risk engine: `lib/risk/**`
- Rebalance engine: `lib/rebalance/**`
- Payment demo adapters: `lib/payments/**`
- Provider adapter boundaries: `lib/integrations/**`
- Demo data: `lib/mock/**`

## Request Flow

1. User or agent sends wallet/intent request.
2. API validates input with Zod-compatible schemas.
3. Domain engine calculates risk, alerts, policy result, or simulation.
4. Payment-gated intents return HTTP 402 until a demo payment session is approved.
5. Responses include request ID, timestamp, demo/live metadata, confidence, and simulation-only labels where relevant.

## Adapter Status

Implemented locally: demo portfolio, risk scoring, approval scan, rebalance simulation, payment session lifecycle, agent intent routing.

Simulated: OKX Onchain OS, Agentic Wallet, X Layer settlement, DEX execution, live market APIs, x402/Upto settlement.

Production path: replace demo adapters behind existing interfaces after official provider contracts are verified.
