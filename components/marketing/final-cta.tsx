import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhylaxMark } from "@/components/brand/phylax-mark";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-3 lg:px-11">
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-8 shadow-glow md:p-10">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-8">
            <PhylaxMark className="h-20 w-16" />
            <div>
              <h2 className="font-display text-3xl font-black leading-tight">Let your agents trade.<br />We’ll guard every move.</h2>
              <p className="mt-2 text-muted">Launch in minutes. Protect forever.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="px-8">Book a Demo <ArrowRight className="h-4 w-4" /></Button>
            <Link href="/dashboard/docs"><Button variant="secondary" className="px-8">Start Building</Button></Link>
          </div>
        </div>
        <div className="wire-field absolute -bottom-24 right-0 h-64 w-80" />
      </div>
    </section>
  );
}
