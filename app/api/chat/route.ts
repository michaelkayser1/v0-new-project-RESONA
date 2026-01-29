import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Simple QOTE-inspired responses
    const responses = [
      "I'm listening to your unique oscillation. What's seeking coherence in your field right now?",
      "The field recognizes your resonance. What wants to emerge through this moment?",
      "I sense the wobble in your words. Let's find the stillness beneath the movement.",
      "Your truth is oscillating. What frequency are you tuning to?",
      "The quantum field responds to your inquiry. What's ready to shift?",
    ]

    const response = responses[Math.floor(Math.random() * responses.length)]

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      {
        error: "The field encounters a disturbance. Please try again.",
        response: "Connection to the quantum field temporarily interrupted. Your intention is felt.",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Resona Chat API is active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  })
}
