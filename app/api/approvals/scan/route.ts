import { NextResponse } from "next/server";
import { riskyApprovals } from "@/lib/mock/holdings";

export async function POST() {
  return NextResponse.json({ approvals: riskyApprovals });
}
