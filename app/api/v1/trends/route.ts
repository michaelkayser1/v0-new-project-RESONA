import { NextResponse } from "next/server"

// GET /api/v1/trends?user_id={id}&range={days}d — Retrieve trend data over time
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
  const range = searchParams.get("range") || "30d"

  if (!userId) {
    return NextResponse.json(
      { error: { code: 400, message: "Missing required parameter: user_id", request_id: `req_${Date.now()}` } },
      { status: 400 }
    )
  }

  // Parse number of days from range string
  const days = parseInt(range.replace("d", ""), 10) || 30

  // Generate plausible trend data
  const coherence: number[] = []
  const stress: number[] = []
  const recovery: number[] = []

  let cBase = 65 + Math.random() * 10
  let sBase = 0.35 + Math.random() * 0.15
  let rBase = 0.6 + Math.random() * 0.1

  for (let i = 0; i < days; i++) {
    cBase += (Math.random() - 0.45) * 4
    cBase = Math.max(40, Math.min(95, cBase))
    coherence.push(Math.round(cBase))

    sBase += (Math.random() - 0.52) * 0.08
    sBase = Math.max(0.1, Math.min(0.9, sBase))
    stress.push(+sBase.toFixed(2))

    rBase += (Math.random() - 0.48) * 0.06
    rBase = Math.max(0.3, Math.min(0.95, rBase))
    recovery.push(+rBase.toFixed(2))
  }

  const corridorDays = coherence.filter((c) => c >= 62 && c <= 67).length
  const corridorPct = +((corridorDays / days) * 100).toFixed(1)

  return NextResponse.json({
    user_id: userId,
    range,
    corridor_adherence_pct: corridorPct,
    series: {
      coherence,
      stress,
      recovery,
    },
  })
}
