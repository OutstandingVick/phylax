import { DeveloperSection } from "@/components/marketing/developer-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { FinalCta } from "@/components/marketing/final-cta";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { ImpactSection } from "@/components/marketing/impact-section";
import { IntegrationStrip } from "@/components/marketing/integration-strip";
import { InteractiveInfrastructureSection } from "@/components/marketing/interactive-infrastructure-section";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileWarning, LockKeyhole, ScanLine, ShieldCheck } from "lucide-react";

function SecuritySection() {
  const controls = [
    "Non-custodial architecture",
    "Approval analysis",
    "Policy checks",
    "Simulation before execution",
    "Explicit payment consent",
    "Data freshness and confidence",
    "Audit-ready events"
  ];

  return (
    <section id="security" className="mx-auto max-w-[1440px] px-6 py-16 lg:px-11 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Badge tone="good">SECURITY BEFORE EXECUTION</Badge>
          <h2 className="mt-5 max-w-xl font-display text-4xl font-black leading-tight md:text-5xl">Security before execution.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            Phylax does not custody assets or store signing secrets. The MVP keeps execution simulated, runs server-side
            policy checks, and requires explicit consent before any paid analysis or future wallet action.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {controls.map((control, index) => {
            const Icon = [ShieldCheck, LockKeyhole, ScanLine, CheckCircle2, FileWarning][index % 5];
            return (
              <Card key={control} className="min-h-36">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-5 font-display text-lg font-bold">{control}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">Implemented as product guardrails or documented integration boundaries for live adapters.</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-main">
      <MarketingNav />
      <Hero />
      <IntegrationStrip />
      <FeatureGrid />
      <InteractiveInfrastructureSection />
      <SecuritySection />
      <ImpactSection />
      <DeveloperSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
