import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

// Check if KV is available
let kv = null
let ratelimit = null

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const kvModule = await import("@vercel/kv")
    const { Ratelimit } = await import("@upstash/ratelimit")

    kv = kvModule.default
    ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.fixedWindow(10, "60s"),
      analytics: true,
      prefix: "resona_chat_limit",
    })
  }
} catch (error) {
  console.warn("KV not available:", error.message)
}

// In-memory fallback for rate limiting
const memoryRateLimit = new Map()

function checkMemoryRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 10

  if (!memoryRateLimit.has(ip)) {
    memoryRateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return { success: true, limit: maxRequests, remaining: maxRequests - 1, reset: now + windowMs }
  }

  const record = memoryRateLimit.get(ip)

  if (now > record.resetTime) {
    memoryRateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return { success: true, limit: maxRequests, remaining: maxRequests - 1, reset: now + windowMs }
  }

  if (record.count >= maxRequests) {
    return { success: false, limit: maxRequests, remaining: 0, reset: record.resetTime }
  }

  record.count++
  return { success: true, limit: maxRequests, remaining: maxRequests - record.count, reset: record.resetTime }
}

export async function POST(req) {
  console.log("API route called")

  try {
    // Parse request body first
    let body
    try {
      body = await req.json()
      console.log("Request body parsed:", { hasMessages: !!body.messages, sessionId: body.sessionId })
    } catch (error) {
      console.error("Failed to parse request body:", error)
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          message: "Failed to parse request body",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const { messages, sessionId } = body

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages:", messages)
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          message: "Messages are required and must be an array",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Check for OpenAI API key
    const hasApiKey = !!process.env.OPENAI_API_KEY
    console.log("API key status:", { hasApiKey })

    // Apply rate limiting
    const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "anonymous"
    let rateLimitResult

    if (ratelimit) {
      rateLimitResult = await ratelimit.limit(ip)
    } else {
      rateLimitResult = checkMemoryRateLimit(ip)
    }

    const { success, limit, remaining, reset } = rateLimitResult

    if (!success) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: `Too many requests. Try again in ${Math.ceil((reset - Date.now()) / 1000)} seconds.`,
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

    // Store conversation in KV if available
    if (kv && sessionId) {
      try {
        const conversationKey = `resona_conversation:${sessionId}`
        await kv.set(conversationKey, messages, { ex: 3600 })
      } catch (error) {
        console.warn("Failed to store conversation:", error.message)
      }
    }

    // If no API key, return a simple demo response
    if (!hasApiKey) {
      console.log("No API key found, using demo mode")

      const demoResponses = [
        "Hello! I'm running in demo mode. To enable full AI functionality, please add your OpenAI API key to the environment variables.",
        "This is a demo response. I'm not connected to a real AI model right now. Add your OpenAI API key to chat with GPT-4o!",
        "Demo mode active! I can only provide pre-written responses. Configure your API key for the real AI experience.",
        "I'm simulating responses since no OpenAI API key was found. Add your key to unlock my full potential!",
        "Running in demo mode. For real AI conversations, please set up your OpenAI API key in the environment variables.",
      ]

      const lastMessage = messages[messages.length - 1]?.content || ""
      let demoResponse

      // Simple keyword-based responses for demo
      if (lastMessage.toLowerCase().includes("hello") || lastMessage.toLowerCase().includes("hi")) {
        demoResponse =
          "Hello! I'm Resona running in demo mode. I'd love to chat with you properly - just add your OpenAI API key to enable full functionality!"
      } else if (lastMessage.toLowerCase().includes("help")) {
        demoResponse =
          "I'd be happy to help! However, I'm currently in demo mode with limited responses. Add your OpenAI API key to unlock my full capabilities."
      } else {
        demoResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)]
      }

      // Return a simple JSON response that the AI SDK can handle
      return new Response(
        JSON.stringify({
          role: "assistant",
          content: demoResponse,
          demoMode: true,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "X-Demo-Mode": "true",
          },
        },
      )
    }

    // Use real AI with API key
    console.log("Using OpenAI API")

    const resonaPrompt =
      process.env.RESONA_PROMPT ||
      `You are Resona, an advanced AI assistant with a warm, intelligent personality. You provide thoughtful, accurate responses while maintaining a conversational and helpful tone.`

    try {
      const formattedMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      const result = streamText({
        model: openai("gpt-4o"),
        messages: formattedMessages,
        system: resonaPrompt,
        temperature: 0.7,
        maxTokens: 2000,
      })

      return result.toDataStreamResponse({
        headers: {
          "RateLimit-Limit": limit.toString(),
          "RateLimit-Remaining": remaining.toString(),
        },
      })
    } catch (error) {
      console.error("Error with OpenAI:", error)
      return new Response(
        JSON.stringify({
          error: "AI processing error",
          message: error.message || "Failed to process with AI model",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error) {
    console.error("Unexpected error in API route:", error)
    return new Response(
      JSON.stringify({
        error: "Server error",
        message: error.message || "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const sessionId = url.searchParams.get("sessionId")

    if (!sessionId) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          message: "Session ID is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const hasApiKey = !!process.env.OPENAI_API_KEY

    if (kv) {
      try {
        const conversationKey = `resona_conversation:${sessionId}`
        const messages = await kv.get(conversationKey)
        return Response.json({
          messages: messages || [],
          kvAvailable: true,
          apiKeyConfigured: hasApiKey,
          demoMode: !hasApiKey,
        })
      } catch (error) {
        console.warn("Failed to retrieve conversation:", error.message)
        return Response.json({
          messages: [],
          kvAvailable: false,
          apiKeyConfigured: hasApiKey,
          demoMode: !hasApiKey,
        })
      }
    } else {
      return Response.json({
        messages: [],
        kvAvailable: false,
        apiKeyConfigured: hasApiKey,
        demoMode: !hasApiKey,
      })
    }
  } catch (error) {
    console.error("Error in GET route:", error)
    return new Response(
      JSON.stringify({
        error: "Server error",
        message: error.message || "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
