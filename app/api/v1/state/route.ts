import { NextResponse } from "next/server"

// GET /api/v1/state?user_id={id}&range={days}d — Retrieve computed autonomic state
export async function GET(req: Request) {
  const auth = req.headers.get("authorization")
  if (!auth?.startsWith("Bearer rk_")) {
    return NextResponse.json(
      { error: { code: 401, message: "Invalid or expired API key", request_id: `req_${Date.now()}` } },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("user_id")
  const range = searchParams.get("range") || "7d"

  if (!userId) {
    return NextResponse.json(
      { error: { code: 400, message: "Missing required parameter: user_id", request_id: `req_${Date.now()}` } },
      { status: 400 }
    )
  }

  // Generate plausible state data (in production, this comes from the coherence engine)
  const now = new Date()
  const baseCoherence = 65 + Math.floor(Math.random() * 20)
  const stressIndex = +(0.2 + Math.random() * 0.4).toFixed(2)
  const readiness = +(0.6 + Math.random() * 0.3).toFixed(2)
  const confidence = +(0.8 + Math.random() * 0.15).toFixed(2)
  const parasympathetic = +(0.5 + Math.random() * 0.3).toFixed(2)
  const sympathetic = +(1 - parasympathetic).toFixed(2)
  const inCorridor = baseCoherence >= 62 && baseCoherence <= 67

  return NextResponse.json({
    user_id: userId,
    range,
    coherence_score: baseCoherence,
    corridor_status: inCorridor ? "in" : baseCoherence > 67 ? "above" : "below",
    corridor_range: { low: 0.618, high: 0.667 },
    stress_index: stressIndex,
    readiness,
    confidence,
    parasympathetic,
    sympathetic,
    computed_at: now.toISOString(),
  })
}
