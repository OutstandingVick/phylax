import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const fields = [
  ["Max single asset exposure %", "25"],
  ["Max slippage %", "0.5"],
  ["Min stablecoin %", "20"],
  ["Daily spend cap", "250"],
  ["Require approval above amount", "10000"]
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black">Policy Settings</h1>
        <p className="mt-2 text-muted">Programmable guardrails for agent-managed xStocks and RWA portfolios.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Risk Policy</CardTitle><Badge tone="good">active</Badge></CardHeader>
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map(([label, value]) => <label key={label} className="text-sm font-semibold">{label}<Input className="mt-2" defaultValue={value} /></label>)}
          <label className="text-sm font-semibold">Blocked assets<Input className="mt-2" defaultValue="Unknown xStocks, unaudited RWA vaults" /></label>
          <label className="text-sm font-semibold">Allowed actions<Input className="mt-2" defaultValue="scan, simulate, revoke, guarded_swap" /></label>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {["Email critical alerts", "Webhook policy failures", "Require human approval for execution"].map((item) => (
            <label key={item} className="flex items-center gap-3 rounded-lg border border-border bg-surface-soft p-3 text-sm font-semibold">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[var(--primary)]" />
              {item}
            </label>
          ))}
        </div>
        <Button className="mt-6"><Save className="h-4 w-4" /> Save policy</Button>
      </Card>
      <p className="text-xs text-muted">Never share private keys. Phylax is non-custodial by design.</p>
    </div>
  );
}
