import { NextResponse } from "next/server";
import { holdings } from "@/lib/mock/holdings";

export async function GET() {
  return NextResponse.json({ holdings });
}
