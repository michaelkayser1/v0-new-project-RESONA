import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { Ratelimit } from "@upstash/ratelimit"
import kv from "@vercel/kv"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Create a rate limiter that allows 5 requests per 30 seconds
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(5, "30s"),
  analytics: true, // Enable analytics for monitoring rate limit usage
  prefix: "resona_api_ratelimit", // Prefix for Redis keys
})

export async function POST(req) {
  try {
    // Get client IP for rate limiting
    const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "anonymous"

    // Apply rate limiting based on IP
    const { success, limit, remaining, reset } = await ratelimit.limit(ip)

    // If rate limit exceeded, return 429 Too Many Requests
    if (!success) {
      return new Response(
        JSON.stringify({
          error: "Too many requests",
          message: "Please try again later",
          limit,
          remaining,
          reset: new Date(reset).toISOString(),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "RateLimit-Limit": limit.toString(),
            "RateLimit-Remaining": remaining.toString(),
            "RateLimit-Reset": reset.toString(),
          },
        },
      )
    }

    const { messages, model = "gpt-4o" } = await req.json()

    // Validate that messages exist
    if (!messages || !Array.isArray(messages)) {
      return new Response("Messages are required", { status: 400 })
    }

    const result = streamText({
      model: openai(model),
      messages,
      system: "You are Resona, a helpful AI assistant. Provide clear, concise, and helpful responses.",
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in resona-chat API:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

export async function GET(req) {
  try {
    // Apply rate limiting for GET requests too
    const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "anonymous"
    const { success } = await ratelimit.limit(`${ip}:get`)

    if (!success) {
      return new Response("Too many requests", { status: 429 })
    }

    // Handle resume functionality for ongoing streams
    const url = new URL(req.url)
    const chatId = url.searchParams.get("chatId")

    if (!chatId) {
      return new Response("Chat ID is required", { status: 400 })
    }

    // This would typically look up the stream from a database
    // For now, we'll return a simple response
    return new Response("No active stream found", { status: 404 })
  } catch (error) {
    console.error("Error in resona-chat GET API:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
