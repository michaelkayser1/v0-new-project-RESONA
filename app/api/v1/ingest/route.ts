import { NextResponse } from "next/server"

// POST /api/v1/ingest — Ingest physiological signals
export async function POST(req: Request) {
  // Validate auth header
  const auth = req.headers.get("authorization")
  if (!auth?.startsWith("Bearer rk_")) {
    return NextResponse.json(
      { error: { code: 401, message: "Invalid or expired API key", request_id: `req_${Date.now()}` } },
      { status: 401 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: { code: 400, message: "Invalid JSON body", request_id: `req_${Date.now()}` } },
      { status: 400 }
    )
  }

  const { source, user_id, timestamp, metrics } = body as {
    source?: string
    user_id?: string
    timestamp?: string
    metrics?: Record<string, number>
  }

  if (!source || !user_id || !metrics) {
    return NextResponse.json(
      { error: { code: 400, message: "Missing required fields: source, user_id, metrics", request_id: `req_${Date.now()}` } },
      { status: 400 }
    )
  }

  // In production, this would write to a time-series database.
  // For now, return a success acknowledgement with computed preview.
  const coherenceEstimate = metrics.hrv_ms
    ? Math.min(100, Math.round((metrics.hrv_ms / 65) * 72))
    : null

  return NextResponse.json({
    status: "accepted",
    user_id,
    source,
    timestamp: timestamp || new Date().toISOString(),
    metrics_received: Object.keys(metrics).length,
    coherence_estimate: coherenceEstimate,
    message: "Data ingested successfully. State will update within 30 seconds.",
  })
}

// Return 405 for other methods
export async function GET() {
  return NextResponse.json(
    { error: { code: 405, message: "Method not allowed. Use POST.", request_id: `req_${Date.now()}` } },
    { status: 405 }
  )
}
