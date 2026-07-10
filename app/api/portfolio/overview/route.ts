import { NextResponse } from "next/server";
import { portfolioOverview } from "@/lib/mock/portfolio";

export async function GET() {
  return NextResponse.json(portfolioOverview);
}
