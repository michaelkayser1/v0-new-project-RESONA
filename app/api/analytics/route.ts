import type { NextRequest } from "next/server"
import { Redis } from "@upstash/redis"

let redis: Redis | null = null
try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  }
} catch {
  // Redis initialization failed - analytics will be disabled
}

export async function POST(request: NextRequest) {
  try {
    // If Redis is not configured, just acknowledge the request
    if (!redis) {
      return Response.json({ success: true, stored: false })
    }

    const event = await request.json()
    const timestamp = new Date().toISOString()
    const eventKey = `analytics:${timestamp}:${event.sessionId}:${event.event}`

    // Store the event with error handling for each operation
    await redis.set(eventKey, JSON.stringify(event), { ex: 60 * 60 * 24 * 30 })

    // Update session summary
    const sessionKey = `session:${event.sessionId}`
    const sessionDataRaw = await redis.get(sessionKey)
    const sessionData = (typeof sessionDataRaw === "string" ? JSON.parse(sessionDataRaw) : sessionDataRaw) || {
      sessionId: event.sessionId,
      userId: event.userId,
      startTime: timestamp,
      events: [],
      lastActivity: timestamp,
    }

    sessionData.events.push({
      event: event.event,
      timestamp,
      properties: event.properties,
    })
    sessionData.lastActivity = timestamp

    await redis.set(sessionKey, JSON.stringify(sessionData), { ex: 60 * 60 * 24 * 30 })

    // Update daily aggregates
    const dateKey = timestamp.split("T")[0]
    const dailyKey = `daily:${dateKey}`
    const dailyDataRaw = await redis.get(dailyKey)
    const dailyData = (typeof dailyDataRaw === "string" ? JSON.parse(dailyDataRaw) : dailyDataRaw) || {
      date: dateKey,
      totalEvents: 0,
      uniqueSessions: [],
      eventCounts: {},
      fieldLayerViews: {},
      promptClicks: {},
      conversationStarts: 0,
      messagesSent: 0,
    }

    dailyData.totalEvents++

    if (!Array.isArray(dailyData.uniqueSessions)) {
      dailyData.uniqueSessions = []
    }
    if (!dailyData.uniqueSessions.includes(event.sessionId)) {
      dailyData.uniqueSessions.push(event.sessionId)
    }

    dailyData.eventCounts[event.event] = (dailyData.eventCounts[event.event] || 0) + 1

    if (event.event === "field_layer_viewed") {
      const layer = event.properties.layer
      dailyData.fieldLayerViews[layer] = (dailyData.fieldLayerViews[layer] || 0) + 1
    }

    if (event.event === "prompt_clicked") {
      const prompt = event.properties.prompt.substring(0, 50)
      dailyData.promptClicks[prompt] = (dailyData.promptClicks[prompt] || 0) + 1
    }

    if (event.event === "conversation_started") {
      dailyData.conversationStarts++
    }

    if (event.event === "message_sent") {
      dailyData.messagesSent++
    }

    await redis.set(dailyKey, JSON.stringify(dailyData), { ex: 60 * 60 * 24 * 90 })

    return Response.json({ success: true, stored: true })
  } catch {
    return Response.json({ success: true, stored: false })
  }
}
