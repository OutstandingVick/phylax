import { NextResponse } from "next/server";
import { reports } from "@/lib/mock/reports";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = reports.find((item) => item.id === id) ?? reports[0];
  return NextResponse.json(report);
}
