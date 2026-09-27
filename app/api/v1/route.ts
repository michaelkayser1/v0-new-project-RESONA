import { NextResponse } from "next/server"

// GET /api/v1 — API root / health check
export async function GET() {
  return NextResponse.json({
    name: "Resona API",
    version: "1.0.0-preview",
    status: "operational",
    documentation: "https://kayser-medical.com/resona-api/docs",
    endpoints: {
      ingest: "POST /v1/ingest",
      state: "GET /v1/state?user_id={id}",
      interventions: "POST /v1/interventions/log",
      trends: "GET /v1/trends?user_id={id}&range={days}d",
      alerts: "POST /v1/alerts/subscribe",
    },
    timestamp: new Date().toISOString(),
  })
}
