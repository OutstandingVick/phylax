import { ExternalLink, Fingerprint, KeyRound, ScanSearch } from "lucide-react";
import { EvidenceVerifier } from "@/components/dashboard/evidence-verifier";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const apiBase = process.env.NEXT_PUBLIC_PHYLAX_API_URL ?? "https://phylax-ivory.vercel.app";

const proofSteps = [
  { title: "Bind inputs", body: "Hash the exact proposed action, owner policy, and evidence snapshot.", icon: Fingerprint },
  { title: "Evaluate", body: "Apply concentration, asset, value, slippage, freshness, and confidence controls.", icon: ScanSearch },
  { title: "Sign", body: "Issue a short-lived Ed25519 attestation carrying the decision and evidence provenance.", icon: KeyRound }
];

export default function EvidencePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Public proof surface</p>
          <h1 className="mt-2 font-display text-3xl font-black">Verify a Phylax Decision</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">A risk decision is useful only when another agent can verify exactly what was evaluated, under which policy, and when it expires.</p>
        </div>
        <a className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-primary-soft" href={`${apiBase}/api/evidence`} target="_blank" rel="noreferrer">
          Evidence manifest <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {proofSteps.map((step) => (
          <Card key={step.title}>
            <CardHeader><CardTitle>{step.title}</CardTitle><step.icon className="h-5 w-5 text-primary-soft" /></CardHeader>
            <p className="text-sm leading-6 text-muted">{step.body}</p>
          </Card>
        ))}
      </div>

      <EvidenceVerifier />
    </div>
  );
}
