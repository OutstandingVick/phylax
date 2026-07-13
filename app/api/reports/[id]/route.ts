import { reports } from "@/lib/mock/reports";
import { fail, ok } from "@/lib/api";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = reports.find((item) => item.id === id);
  if (!report) return fail({ request, status: 404, code: "resource_not_found", message: `Report ${id} was not found.` });
  return ok(report, request);
}
