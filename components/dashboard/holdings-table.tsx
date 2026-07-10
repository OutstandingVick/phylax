import { Badge } from "@/components/ui/badge";
import { Table, TableWrap } from "@/components/ui/table";
import { formatPct, formatUsd } from "@/lib/utils";
import type { Holding } from "@/types";

export function HoldingsTable({ holdings }: { holdings: Holding[] }) {
  if (holdings.length === 0) {
    return <div className="rounded-xl border border-border p-8 text-center text-sm text-muted">No holdings detected.</div>;
  }
  return (
    <TableWrap>
      <Table>
        <thead className="bg-surface-soft text-xs uppercase text-muted">
          <tr>
            {["Asset", "Category", "Allocation", "Value", "24H", "Risk", "Confidence"].map((head) => (
              <th className="px-4 py-3 font-bold" key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <tr key={holding.symbol} className="border-t border-border">
              <td className="px-4 py-4">
                <div className="font-bold text-main">{holding.symbol}</div>
                <div className="text-xs text-muted">{holding.name}</div>
              </td>
              <td className="px-4 py-4 text-muted">{holding.category}</td>
              <td className="px-4 py-4 font-tabular">{holding.allocationPct.toFixed(2)}%</td>
              <td className="px-4 py-4 font-tabular">{formatUsd(holding.valueUsd)}</td>
              <td className="px-4 py-4 font-tabular text-primary">{formatPct(holding.pnl24hPct)}</td>
              <td className="px-4 py-4">
                <Badge tone={holding.riskScore > 65 ? "bad" : holding.riskScore > 35 ? "warn" : "good"}>{holding.riskScore}</Badge>
              </td>
              <td className="px-4 py-4">
                <Badge>{holding.confidence}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrap>
  );
}
