"use client";

import { useState } from "react";
import { CheckCircle2, Copy, FileKey2, Loader2, ShieldX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const apiBase = process.env.NEXT_PUBLIC_PHYLAX_API_URL ?? "https://phylax-ivory.vercel.app";

type ProofState = {
  preflight?: Record<string, unknown>;
  verification?: { data?: { valid?: boolean; reasons?: string[] } };
  error?: string;
};

export function EvidenceVerifier() {
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState<ProofState>({});

  async function runProof() {
    setLoading(true);
    setProof({});
    try {
      const preflightResponse = await fetch(`${apiBase}/api/agent/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestingAgentId: "judge_verification_client",
          intent: "execution.preflight",
          walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
          proposedAction: {
            type: "swap",
            from: "USDC",
            to: "TSLA.x",
            amountUsd: 10000,
            slippagePct: 0.21,
            chainId: 196
          },
          policy: {
            maxSingleAssetExposurePct: 30,
            maxSlippagePct: 0.5,
            maxActionUsd: 15000,
            attestationTtlSeconds: 300
          }
        })
      });
      const preflight = await preflightResponse.json();
      if (!preflight.attestation) throw new Error("This deployment has not enabled attestation signing yet.");

      const verificationResponse = await fetch(`${apiBase}/api/attestations/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attestation: preflight.attestation })
      });
      const verification = await verificationResponse.json();
      setProof({ preflight, verification });
    } catch (error) {
      setProof({ error: error instanceof Error ? error.message : "Proof flow failed." });
    } finally {
      setLoading(false);
    }
  }

  async function copyProof() {
    if (proof.preflight) await navigator.clipboard.writeText(JSON.stringify(proof.preflight, null, 2));
  }

  const valid = proof.verification?.data?.valid === true;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Live Attestation Check</CardTitle>
            <p className="mt-1 text-sm text-muted">Generate a blocked preflight and verify its Ed25519 signature against the public Phylax key.</p>
          </div>
          <Badge tone={valid ? "good" : "neutral"}>{valid ? "Verified" : "Ready"}</Badge>
        </CardHeader>
        <div className="flex flex-wrap gap-3">
          <Button onClick={runProof} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileKey2 className="h-4 w-4" />}
            {loading ? "Running proof" : "Run proof flow"}
          </Button>
          {proof.preflight ? (
            <Button variant="secondary" onClick={copyProof} title="Copy the signed response">
              <Copy className="h-4 w-4" /> Copy proof
            </Button>
          ) : null}
        </div>
        {proof.error ? <p className="mt-4 border-l-2 border-accent pl-3 text-sm text-accent">{proof.error}</p> : null}
      </Card>

      {proof.preflight ? (
        <div className="grid gap-4 xl:grid-cols-[0.7fr_1.3fr]">
          <Card>
            <CardHeader><CardTitle>Verification Result</CardTitle></CardHeader>
            <div className="flex items-center gap-3">
              {valid ? <CheckCircle2 className="h-8 w-8 text-primary-soft" /> : <ShieldX className="h-8 w-8 text-accent" />}
              <div>
                <p className="font-display text-xl font-black">{valid ? "Signature valid" : "Verification failed"}</p>
                <p className="text-sm text-muted">Decision: {String(proof.preflight.decision)}</p>
              </div>
            </div>
            <p className="mt-5 text-xs leading-5 text-muted">The signature proves the decision and its bound inputs were issued by Phylax. The attestation separately labels whether its evidence was independently verified.</p>
          </Card>
          <Card>
            <CardHeader><CardTitle>Signed Response</CardTitle></CardHeader>
            <pre className="max-h-[34rem] overflow-auto rounded-lg border border-border bg-background/80 p-4 text-xs leading-5 text-primary-soft">
              {JSON.stringify(proof.preflight, null, 2)}
            </pre>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
