import { reports } from "@/lib/mock/reports";
import { fail, ok } from "@/lib/api";

export const dynamic = "force-static";

export function generateStaticParams() {
  return reports.map((report) => ({ id: report.id }));
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = reports.find((item) => item.id === id);
  if (!report) return fail({ request, status: 404, code: "resource_not_found", message: `Report ${id} was not found.` });
  return ok(report, request);
}
