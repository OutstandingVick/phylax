import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Badge } from "@/components/ui/badge";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/86 px-4 py-3 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input className="pl-9" placeholder="Search assets, alerts, agents..." />
        </div>
        <Badge tone="neutral" className="hidden md:inline-flex">X Layer</Badge>
        <Badge tone="good" className="hidden md:inline-flex">Phylax Capital</Badge>
        <Badge tone="warn" className="hidden xl:inline-flex">Demo Mode</Badge>
        <Button variant="secondary" className="h-10 w-10 p-0" aria-label="Notifications"><Bell className="h-4 w-4" /></Button>
        <ThemeToggle />
        <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-soft text-sm font-black">PC</div>
      </div>
    </header>
  );
}
