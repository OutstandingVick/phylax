import { NextResponse } from "next/server";

export function requestId(request?: Request) {
  if (process.env.GITHUB_PAGES === "true") return "req_static_export";
  return request?.headers.get("x-request-id") ?? `req_${crypto.randomUUID()}`;
}

export function ok<T>(data: T, request?: Request, init?: ResponseInit) {
  return NextResponse.json(
    {
      requestId: requestId(request),
      timestamp: new Date().toISOString(),
      mode: process.env.NEXT_PUBLIC_DEMO_MODE === "false" ? "live-adapter-ready" : "demo",
      data
    },
    init
  );
}

export function fail({
  request,
  status,
  code,
  message,
  details
}: {
  request?: Request;
  status: number;
  code: string;
  message: string;
  details?: unknown;
}) {
  return NextResponse.json(
    {
      requestId: requestId(request),
      timestamp: new Date().toISOString(),
      error: code,
      status,
      message,
      details
    },
    { status }
  );
}
