"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CreditCard, RefreshCcw, ShieldAlert, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";

const finalReport = {
  decision: "recommended",
  executionAllowed: true,
  simulationOnly: true,
  policyCheck: "passed",
  riskScoreBefore: 74,
  riskScoreAfter: 49,
  healthBefore: 61,
  healthAfter: 78,
  recommendations: [
    "Reduce TSLA.x allocation below 25%",
    "Increase USDC and defensive RWA allocation",
    "Revoke unlimited USDC approval for 0x9ab...991"
  ]
};

type DemoStep = "ready" | "scanning" | "incident" | "payment" | "analysis" | "complete";

export function DemoController() {
  const [step, setStep] = useState<DemoStep>("ready");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [charge, setCharge] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("demo") === "incident") {
      runDemo();
    }
  }, []);

  const progress = useMemo(() => {
    return {
      ready: 0,
      scanning: 35,
      incident: 55,
      payment: 70,
      analysis: 86,
      complete: 100
    }[step];
  }, [step]);

  function runDemo() {
    setCharge(null);
    setPaymentOpen(false);
    setStep("scanning");
    window.setTimeout(() => setStep("incident"), 700);
  }

  function requestDeepAnalysis() {
    setStep("payment");
    setPaymentOpen(true);
  }

  function approvePayment() {
    setPaymentOpen(false);
    setStep("analysis");
    window.setTimeout(() => {
      setCharge("2.18 USDC");
      setStep("complete");
    }, 750);
  }

  return (
    <Card className="border-primary/30 bg-primary/5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={step === "complete" ? "good" : "warn"}>Incident Demo</Badge>
            <Badge tone="neutral">Simulation-only execution</Badge>
            {charge && <Badge tone="good">Demo charge: {charge}</Badge>}
          </div>
          <h2 className="mt-3 font-display text-xl font-black">Run the TSLA.x exposure and risky approval incident.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            Replays the 90-second narrative: scan, 74 High risk, 61 Watch health, payment-gated deep analysis, defensive rebalance, and agent-readable report.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={runDemo}>
            <RefreshCcw className="h-4 w-4" /> Run Incident Demo
          </Button>
          <Button onClick={requestDeepAnalysis} disabled={step === "ready" || step === "scanning" || step === "analysis"}>
            <CreditCard className="h-4 w-4" /> Run Deep Analysis
          </Button>
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-soft">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {[
          ["Scan", step === "ready" ? "Awaiting demo wallet" : "Portfolio loaded"],
          ["Incident", step === "ready" || step === "scanning" ? "Watching" : "Exposure + approval detected"],
          ["Payment", step === "payment" ? "402 required" : charge ? "Settled" : "Not requested"],
          ["Report", step === "complete" ? "Generated" : "Pending"]
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-surface p-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{label}</p>
            <p className="mt-2 text-sm font-bold">{value}</p>
          </div>
        ))}
      </div>
      {step === "complete" && (
        <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-center gap-2 font-bold">
              <Sparkles className="h-4 w-4 text-primary" /> Rebalance result
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <p>Risk <b className="text-primary">74 <ArrowRight className="inline h-3 w-3" /> 49</b></p>
              <p>Health <b className="text-primary">61 <ArrowRight className="inline h-3 w-3" /> 78</b></p>
              <p>Estimated fee <b>$18.42</b></p>
              <p>Slippage <b>0.21%</b></p>
            </div>
          </div>
          <pre className="max-h-80 overflow-auto rounded-lg border border-border bg-surface p-4 text-xs leading-relaxed text-primary-soft">
            {JSON.stringify(finalReport, null, 2)}
          </pre>
        </div>
      )}
      <Modal open={paymentOpen} title="Demo payment required" onClose={() => setPaymentOpen(false)}>
        <div className="space-y-4">
          <div className="rounded-lg border border-warning/30 bg-warning/10 p-4 text-sm">
            <div className="flex items-center gap-2 font-bold text-warning">
              <ShieldAlert className="h-4 w-4" /> HTTP 402 payment_required
            </div>
            <p className="mt-2 text-muted">Upto-style spending cap required before risk.deep_analysis can run.</p>
          </div>
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <p className="rounded-lg border border-border bg-surface-soft p-3">Maximum spend<br /><b>3.00 USDC</b></p>
            <p className="rounded-lg border border-border bg-surface-soft p-3">Estimated charge<br /><b>1.20-2.80 USDC</b></p>
            <p className="rounded-lg border border-border bg-surface-soft p-3">Purpose<br /><b>Risk Deep Analysis</b></p>
            <p className="rounded-lg border border-border bg-surface-soft p-3">Settlement<br /><b>Demo payment</b></p>
          </div>
          <Button className="w-full" onClick={approvePayment}>
            Approve spending cap
          </Button>
        </div>
      </Modal>
    </Card>
  );
}
