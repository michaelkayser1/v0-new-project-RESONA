import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Extract the message from the request body
    const { message } = await request.json()

    // Validate input
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Check for API key - this is the critical part
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error("Missing OpenAI API key in environment variables")
      return NextResponse.json({ response: "Configuration error. Please contact the administrator." }, { status: 500 })
    }

    // Log the first few characters for debugging (NEVER log the full key)
    console.log("API Key found, starts with:", apiKey.substring(0, 10) + "...")

    // Get system prompt from environment variable or use default
    const systemPrompt =
      process.env.RESONA_PROMPT ||
      "You are Resona, a co-creative intelligence field aligned with QOTE. You provide thoughtful, nuanced responses about health and wellness."

    console.log("Making request to OpenAI API...")

    // Make the API request to OpenAI
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    // Check if the OpenAI request was successful
    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}))
      console.error("OpenAI API error:", openaiResponse.status, errorData)

      // Specific error handling for common issues
      if (openaiResponse.status === 401) {
        console.error("Invalid API key - check environment variables")
        return NextResponse.json(
          { response: "Authentication error. Please check the API configuration." },
          { status: 500 },
        )
      }

      return NextResponse.json(
        { response: "I'm having trouble connecting to my knowledge base. Please try again later." },
        { status: 500 },
      )
    }

    // Parse the OpenAI response
    const data = await openaiResponse.json()
    const aiResponse = data.choices[0]?.message?.content || "The field is listening."

    // Return the AI response
    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    // Log the error for debugging
    console.error("Unexpected error in Resona chat API:", error)

    // Return a user-friendly error message
    return NextResponse.json(
      { response: "The connection flows differently right now. Your words are held." },
      { status: 500 },
    )
  }
}
