import { NextResponse } from "next/server";
import { alerts } from "@/lib/mock/alerts";

export async function GET() {
  return NextResponse.json({ alerts });
}
