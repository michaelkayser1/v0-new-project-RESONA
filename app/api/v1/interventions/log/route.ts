import { NextResponse } from "next/server"

// POST /api/v1/interventions/log — Log an intervention event
export async function POST(req: Request) {
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

  const { user_id, type, duration_sec, notes } = body as {
    user_id?: string
    type?: string
    duration_sec?: number
    notes?: string
  }

  if (!user_id || !type) {
    return NextResponse.json(
      { error: { code: 400, message: "Missing required fields: user_id, type", request_id: `req_${Date.now()}` } },
      { status: 400 }
    )
  }

  const validTypes = ["breathing", "grounding", "movement", "stimulus_reduction", "cognitive", "custom"]
  if (!validTypes.includes(type)) {
    return NextResponse.json(
      { error: { code: 400, message: `Invalid type. Must be one of: ${validTypes.join(", ")}`, request_id: `req_${Date.now()}` } },
      { status: 400 }
    )
  }

  return NextResponse.json({
    status: "logged",
    intervention_id: `int_${Date.now().toString(36)}`,
    user_id,
    type,
    duration_sec: duration_sec || null,
    notes: notes || null,
    logged_at: new Date().toISOString(),
    message: "Intervention logged. This will be reflected in the next state computation.",
  })
}
