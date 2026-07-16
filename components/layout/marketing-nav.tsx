"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { PhylaxLogo } from "@/components/brand/phylax-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Product",
    items: [
      ["Portfolio Monitoring", "/dashboard/portfolio"],
      ["Approval Guard", "/dashboard/alerts"],
      ["Risk Analysis", "/dashboard"],
      ["Rebalance Simulation", "/dashboard/rebalance"],
      ["Agent Preflight", "/docs#how-it-works"]
    ]
  },
  {
    label: "Solutions",
    items: [
      ["Autonomous Agents", "#audiences"],
      ["RWA Platforms", "#audiences"],
      ["Teams & Treasuries", "#audiences"],
      ["Wallet Providers", "#audiences"]
    ]
  },
  {
    label: "Developers",
    items: [
      ["API Reference", "/docs#api"],
      ["Agent Integration", "/docs#sdk"],
      ["x402/Upto", "/docs#business-model"],
      ["Webhooks", "/docs#api"]
    ]
  },
  {
    label: "Security",
    items: [
      ["Policy Controls", "/docs#verification"],
      ["Approval Analysis", "/docs#how-it-works"],
      ["Simulation First", "/docs#limitations"],
      ["Audit Reports", "/dashboard/reports"]
    ]
  },
  {
    label: "Resources",
    items: [
      ["Documentation", "/docs"],
      ["Risk Model", "/docs#problem"],
      ["Architecture", "/docs#how-it-works"],
      ["Demo Scenario", "/dashboard?demo=incident"],
      ["GitHub", "https://github.com/OutstandingVick/phylax"]
    ]
  }
] as const;

function MarketingLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function MarketingNav() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>("Product");

  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className="sticky top-3 z-50 px-5 md:top-5 md:px-8 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div
          className={cn(
            "relative flex min-h-[76px] items-center justify-between gap-4 rounded-[2rem] border border-border bg-background/92 px-4 shadow-panel backdrop-blur-md",
            "light:bg-surface/90 md:px-6"
          )}
          onMouseLeave={() => setOpenGroup(null)}
        >
          <PhylaxLogo />
          <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
            {groups.map((group) => (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  className="focus-ring inline-flex min-h-11 items-center gap-1 rounded-xl px-4 text-sm font-bold text-main transition hover:bg-surface-soft"
                  aria-expanded={openGroup === group.label}
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  onFocus={() => setOpenGroup(group.label)}
                >
                  {group.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {openGroup === group.label && (
                  <div className="absolute left-0 top-[calc(100%+0.7rem)] w-72 rounded-3xl border border-border bg-surface p-3 shadow-panel">
                    <div className="grid gap-1">
                      {group.items.map(([label, href]) => (
                        <MarketingLink
                          key={label}
                          href={href}
                          className="focus-ring rounded-2xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-surface-soft hover:text-main"
                        >
                          {label}
                        </MarketingLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="hidden items-center gap-3 xl:flex">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-bold text-main transition hover:bg-surface-soft"
            >
              Open App
            </Link>
            <Link
              href="/dashboard?demo=incident"
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary px-5 text-sm font-black text-background shadow-glow transition hover:-translate-y-0.5"
            >
              Launch Phylax
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <button
            type="button"
            className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-main xl:hidden"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background/80 p-4 backdrop-blur-sm xl:hidden" role="dialog" aria-modal="true">
          <div className="ml-auto flex h-full max-w-md flex-col rounded-[2rem] border border-border bg-surface p-5 shadow-panel">
            <div className="flex items-center justify-between gap-4">
              <PhylaxLogo />
              <button
                type="button"
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-main"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-background p-3">
              <span className="text-sm font-bold text-muted">Theme</span>
              <ThemeToggle />
            </div>
            <nav aria-label="Mobile navigation" className="mt-5 flex-1 overflow-y-auto">
              {groups.map((group) => (
                <section key={group.label} className="border-b border-border py-2">
                  <button
                    type="button"
                    className="focus-ring flex min-h-12 w-full items-center justify-between rounded-xl px-2 text-left text-base font-black text-main"
                    aria-expanded={mobileGroup === group.label}
                    onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                  >
                    {group.label}
                    <ChevronDown className={cn("h-4 w-4 transition", mobileGroup === group.label && "rotate-180")} />
                  </button>
                  {mobileGroup === group.label && (
                    <div className="grid gap-1 pb-3 pt-1">
                      {group.items.map(([label, href]) => (
                        <MarketingLink
                          key={label}
                          href={href}
                          className="focus-ring rounded-xl px-4 py-3 text-sm font-semibold text-muted hover:bg-surface-soft hover:text-main"
                        >
                          {label}
                        </MarketingLink>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </nav>
            <Link
              href="/dashboard?demo=incident"
              className="focus-ring mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary px-5 text-sm font-black text-background"
            >
              Launch Phylax
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
