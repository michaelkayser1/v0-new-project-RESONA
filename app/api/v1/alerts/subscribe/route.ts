import { NextResponse } from "next/server"

// POST /api/v1/alerts/subscribe — Subscribe to threshold-based alerts
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

  const { user_id, channels, thresholds } = body as {
    user_id?: string
    channels?: string[]
    thresholds?: Record<string, number>
  }

  if (!user_id || !channels || !thresholds) {
    return NextResponse.json(
      { error: { code: 400, message: "Missing required fields: user_id, channels, thresholds", request_id: `req_${Date.now()}` } },
      { status: 400 }
    )
  }

  const validChannels = ["webhook", "email", "sms", "push"]
  const invalidChannels = channels.filter((c) => !validChannels.includes(c))
  if (invalidChannels.length > 0) {
    return NextResponse.json(
      { error: { code: 400, message: `Invalid channels: ${invalidChannels.join(", ")}. Must be: ${validChannels.join(", ")}`, request_id: `req_${Date.now()}` } },
      { status: 400 }
    )
  }

  return NextResponse.json({
    status: "subscribed",
    subscription_id: `sub_${Date.now().toString(36)}`,
    user_id,
    channels,
    thresholds,
    created_at: new Date().toISOString(),
    message: "Alert subscription created. You will receive notifications on the configured channels.",
  })
}
