import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    user_id: "usr_8x2k",
    computed_at: new Date().toISOString(),
    coherence_score: 72,
    corridor_status: "in",
    corridor_range: { low: 0.618, high: 0.667 },
    stress_index: 0.31,
    readiness: 0.84,
    confidence: 0.91,
    parasympathetic: 0.67,
    sympathetic: 0.33,
    recommendation: {
      type: "breathing",
      reason: "Elevated sympathetic tone detected. Coherence trending toward corridor exit.",
      duration_sec: 180,
    },
    interventions_today: [
      {
        type: "grounding",
        timestamp: "2026-02-09T08:15:00Z",
        duration_sec: 120,
      },
    ],
    trends_7d: {
      coherence: [68, 71, 65, 74, 70, 72, 72],
      stress: [0.42, 0.38, 0.51, 0.29, 0.35, 0.33, 0.31],
      recovery: [0.61, 0.67, 0.58, 0.72, 0.69, 0.71, 0.7],
    },
  })
}
