import { BillingCard } from "@/components/dashboard/billing-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableWrap } from "@/components/ui/table";
import { paymentHistory, usage } from "@/lib/mock/payments";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black">Billing</h1>
        <p className="mt-2 text-muted">Plan usage, pay-per-insight sessions, and x402/Upto payment history.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card><CardHeader><CardTitle>Current Plan</CardTitle><Badge tone="good">{usage.plan}</Badge></CardHeader><p className="text-sm text-muted">Includes agent preflights, alerts, and policy simulation.</p></Card>
        <Card><CardHeader><CardTitle>Usage This Month</CardTitle></CardHeader><p className="font-display text-3xl font-black">{usage.apiCalls.toLocaleString()}</p><p className="text-sm text-muted">API calls</p></Card>
        <BillingCard />
      </div>
      <Card>
        <CardHeader><CardTitle>Payment History</CardTitle><Badge>Spending cap ${usage.spendingCapUsd}</Badge></CardHeader>
        <TableWrap>
          <Table>
            <thead className="bg-surface-soft text-xs uppercase text-muted"><tr>{["Session", "Type", "Purpose", "Status", "Max", "Charged"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
            <tbody>{paymentHistory.map((row) => <tr key={row.id}><td className="px-4 py-3">{row.id}</td><td className="px-4 py-3">{row.type}</td><td className="px-4 py-3">{row.purpose}</td><td className="px-4 py-3">{row.status}</td><td className="px-4 py-3">{row.maxAmount} {row.currency}</td><td className="px-4 py-3">{row.chargedAmount} {row.currency}</td></tr>)}</tbody>
          </Table>
        </TableWrap>
      </Card>
    </div>
  );
}
