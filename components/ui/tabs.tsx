"use client";

import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  active,
  onChange
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface-soft p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "focus-ring rounded-md px-3 py-1.5 text-xs font-bold transition",
            active === tab ? "bg-primary text-background" : "text-muted hover:text-main"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
