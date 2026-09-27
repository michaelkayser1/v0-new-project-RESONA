import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // A deployment-provided RESONA_PROMPT overrides this research-demo fallback.
    const resonaPrompt =
      process.env.RESONA_PROMPT ||
      `You are Resona, an experimental conversational assistant. Answer clearly, distinguish facts from uncertainty, and do not imply that your answers have been independently validated or authorized for consequential action.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
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
    return Response.json({ error: "The chat service is temporarily unavailable. Please try again." }, { status: 500 })
  }
}
