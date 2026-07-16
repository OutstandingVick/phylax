# Phylax 90-Second Demo Script

## 0-10 seconds — The problem

**On screen:** Phylax landing page.

**Voiceover:** "Autonomous agents can move capital, but who checks whether their actions are safe? Phylax is the risk and policy layer for xStocks and RWA portfolios."

## 10-25 seconds — Detect the incident

**On screen:** Open the dashboard and run the incident demo.

**Voiceover:** "This portfolio has two critical issues: TSLA.x concentration is above policy limits, and USDC has an unlimited approval to an unknown spender. Phylax detects both and explains the risk."

## 25-42 seconds — Block the unsafe action

**On screen:** Show the agent preflight for buying another $10,000 of TSLA.x.

**Voiceover:** "Before another agent executes this trade, it asks Phylax for a preflight. The purchase would increase concentration even further, so Phylax blocks it and returns a machine-readable reason."

## 42-62 seconds — Prove the decision

**On screen:** Open **Proof & Evidence** and click **Run proof flow**.

**Voiceover:** "Phylax then binds the exact action, portfolio evidence, and owner policy into a short-lived Ed25519 attestation. Any agent can verify the decision against Phylax's public key. The signature is valid, and changing the decision would invalidate it."

## 62-78 seconds — Recommend a safer path

**On screen:** Show the rebalance simulation.

**Voiceover:** "Phylax does not stop at warning. It simulates a safer rebalance, reducing portfolio risk from 74 to 49 and improving health from 61 to 78 before any capital moves."

## 78-90 seconds — Close

**On screen:** Show the signed JSON response and public API endpoint.

**Voiceover:** "Phylax gives autonomous finance something it is missing: an independent, explainable, and verifiable checkpoint between agent intent and execution. Ask Phylax before capital moves."

## Recording Notes

- Target speaking length: approximately 175 words.
- Keep the cursor moving only when changing views or clicking the proof button.
- Pause briefly on **blocked**, **Signature valid**, and the before/after risk scores.
- Do not claim that the MVP executes real trades or independently verifies caller-supplied evidence.
