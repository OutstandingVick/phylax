# Security Model

Phylax is non-custodial by design. The MVP never stores private keys, seed phrases, recovery phrases, or signing material.

## Implemented

- Server-side input validation for API routes.
- Structured safe errors with request IDs and timestamps.
- Explicit demo/live metadata.
- Payment consent before deep analysis.
- Simulation-only execution route.
- Risk, approval, policy, stale-data, confidence, and slippage guardrails in the domain model.
- Visible financial-advice and simulation-only disclaimers.

## Demo Boundaries

OKX Onchain OS, Agentic Wallet, x402, Upto, Market API, DEX, TEE signing, and X Layer settlement are adapter interfaces or demo implementations only. No official provider contract is invented.

## Production Requirements

Before live execution: verify provider SDKs/contracts, add authentication and authorization, persistent audit logs, secrets management, dependency monitoring, replay protection, rate limiting, wallet simulation, explicit transaction consent, and independent security review.
