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
  // Redis initialization failed
}

function getEmptyResponse() {
  return {
    dailyData: [],
    totals: {
      totalEvents: 0,
      uniqueSessions: 0,
      conversationStarts: 0,
      messagesSent: 0,
      fieldLayerViews: {},
      promptClicks: {},
    },
    insights: {
      averageMessagesPerConversation: 0,
      mostPopularLayer: "None",
      mostClickedPrompt: "None",
      conversionRate: 0,
    },
    generatedAt: new Date().toISOString(),
  }
}

export async function GET() {
  try {
    if (!redis) {
      return Response.json(getEmptyResponse())
    }

    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    const dailyData = await Promise.all(
      last30Days.map(async (date) => {
        try {
          const dataRaw = await redis!.get(`daily:${date}`)
          const data = typeof dataRaw === "string" ? JSON.parse(dataRaw) : dataRaw
          return (
            data || {
              date,
              totalEvents: 0,
              uniqueSessions: [],
              eventCounts: {},
              fieldLayerViews: {},
              promptClicks: {},
              conversationStarts: 0,
              messagesSent: 0,
            }
          )
        } catch {
          return {
            date,
            totalEvents: 0,
            uniqueSessions: [],
            eventCounts: {},
            fieldLayerViews: {},
            promptClicks: {},
            conversationStarts: 0,
            messagesSent: 0,
          }
        }
      }),
    )

    const totals = dailyData.reduce(
      (acc, day) => ({
        totalEvents: acc.totalEvents + (day.totalEvents || 0),
        uniqueSessions: acc.uniqueSessions + (Array.isArray(day.uniqueSessions) ? day.uniqueSessions.length : 0),
        conversationStarts: acc.conversationStarts + (day.conversationStarts || 0),
        messagesSent: acc.messagesSent + (day.messagesSent || 0),
        fieldLayerViews: {
          ...acc.fieldLayerViews,
          ...Object.entries(day.fieldLayerViews || {}).reduce(
            (layerAcc, [layer, count]) => {
              layerAcc[layer] = (layerAcc[layer] || 0) + (count as number)
              return layerAcc
            },
            {} as Record<string, number>,
          ),
        },
        promptClicks: {
          ...acc.promptClicks,
          ...Object.entries(day.promptClicks || {}).reduce(
            (promptAcc, [prompt, count]) => {
              promptAcc[prompt] = (promptAcc[prompt] || 0) + (count as number)
              return promptAcc
            },
            {} as Record<string, number>,
          ),
        },
      }),
      {
        totalEvents: 0,
        uniqueSessions: 0,
        conversationStarts: 0,
        messagesSent: 0,
        fieldLayerViews: {} as Record<string, number>,
        promptClicks: {} as Record<string, number>,
      },
    )

    const insights = {
      averageMessagesPerConversation:
        totals.conversationStarts > 0 ? (totals.messagesSent / totals.conversationStarts).toFixed(1) : 0,
      mostPopularLayer: Object.entries(totals.fieldLayerViews).sort(([, a], [, b]) => b - a)[0]?.[0] || "None",
      mostClickedPrompt: Object.entries(totals.promptClicks).sort(([, a], [, b]) => b - a)[0]?.[0] || "None",
      conversionRate:
        totals.uniqueSessions > 0 ? ((totals.conversationStarts / totals.uniqueSessions) * 100).toFixed(1) : 0,
    }

    return Response.json({
      dailyData,
      totals,
      insights,
      generatedAt: new Date().toISOString(),
    })
  } catch {
    return Response.json(getEmptyResponse())
  }
}
