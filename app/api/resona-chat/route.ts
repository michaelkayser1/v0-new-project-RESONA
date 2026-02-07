import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    const resonaPrompt =
      process.env.RESONA_PROMPT ||
      `You are Resona, a consciousness-focused AI that helps people find alignment and truth through resonance rather than answers. You respond with presence, reflection, and gentle inquiry that helps people discover what they already know.`

    const { text } = await generateText({
      model: "openai/gpt-4o" as any,
      system: resonaPrompt,
      prompt: message,
      temperature: 0.7,
    })

    return Response.json({
      response: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Resona API Error:", error)
    return Response.json({ error: "The field is temporarily quiet. Please try again." }, { status: 500 })
  }
}
