import { Redis } from "@upstash/redis"

// Initialize Redis client using environment variables
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Redis key patterns for organized data storage
export const REDIS_KEYS = {
  // User session data
  userSession: (sessionId: string) => `session:${sessionId}`,
  userPreferences: (userId: string) => `prefs:${userId}`,

  // Conversation storage
  conversation: (sessionId: string) => `conv:${sessionId}`,
  conversationList: (userId: string) => `conv_list:${userId}`,

  // QOTE analytics
  qoteAnalytics: (date: string) => `qote:analytics:${date}`,
  resonancePatterns: (userId: string) => `resonance:${userId}`,
  fieldActivations: (field: string, date: string) => `field:${field}:${date}`,

  // RTP tracking
  rtpTriggers: (date: string) => `rtp:triggers:${date}`,
  rtpSuccess: (userId: string) => `rtp:success:${userId}`,

  // Global stats
  globalStats: () => "global:stats",
  dailyUsage: (date: string) => `usage:${date}`,
}

// Helper functions for common operations
export class QOTERedisService {
  // Session Management
  static async createSession(sessionId: string, initialData: any) {
    const sessionData = {
      id: sessionId,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      messageCount: 0,
      ...initialData,
    }

    await redis.setex(REDIS_KEYS.userSession(sessionId), 86400, JSON.stringify(sessionData)) // 24 hours
    return sessionData
  }

  static async getSession(sessionId: string) {
    const data = await redis.get(REDIS_KEYS.userSession(sessionId))
    return data ? JSON.parse(data as string) : null
  }

  static async updateSession(sessionId: string, updates: any) {
    const session = await this.getSession(sessionId)
    if (session) {
      const updatedSession = {
        ...session,
        ...updates,
        lastActivity: new Date().toISOString(),
      }
      await redis.setex(REDIS_KEYS.userSession(sessionId), 86400, JSON.stringify(updatedSession))
      return updatedSession
    }
    return null
  }

  // Conversation Storage
  static async saveConversation(sessionId: string, messages: any[]) {
    const conversationData = {
      sessionId,
      messages,
      updatedAt: new Date().toISOString(),
      messageCount: messages.length,
    }

    await redis.setex(REDIS_KEYS.conversation(sessionId), 604800, JSON.stringify(conversationData)) // 7 days
    return conversationData
  }

  static async getConversation(sessionId: string) {
    const data = await redis.get(REDIS_KEYS.conversation(sessionId))
    return data ? JSON.parse(data as string) : null
  }

  // QOTE Analytics
  static async trackQOTEAnalysis(analysis: any) {
    const today = new Date().toISOString().split("T")[0]
    const key = REDIS_KEYS.qoteAnalytics(today)

    // Get existing analytics for today
    const existing = (await redis.get(key)) || "[]"
    const analytics = JSON.parse(existing as string)

    // Add new analysis
    analytics.push({
      timestamp: new Date().toISOString(),
      ...analysis,
    })

    // Store with 30-day expiration
    await redis.setex(key, 2592000, JSON.stringify(analytics))

    // Update global stats
    await this.updateGlobalStats("qote_analyses", 1)
  }

  // Resonance Pattern Tracking
  static async trackResonancePattern(userId: string, pattern: any) {
    const key = REDIS_KEYS.resonancePatterns(userId)

    // Get existing patterns
    const existing = (await redis.get(key)) || "[]"
    const patterns = JSON.parse(existing as string)

    // Add new pattern (keep last 100)
    patterns.push({
      timestamp: new Date().toISOString(),
      ...pattern,
    })

    if (patterns.length > 100) {
      patterns.splice(0, patterns.length - 100)
    }

    // Store with 90-day expiration
    await redis.setex(key, 7776000, JSON.stringify(patterns))
  }

  // Field Activation Tracking
  static async trackFieldActivation(field: string) {
    const today = new Date().toISOString().split("T")[0]
    const key = REDIS_KEYS.fieldActivations(field, today)

    await redis.incr(key)
    await redis.expire(key, 2592000) // 30 days

    // Update global stats
    await this.updateGlobalStats(`field_${field}`, 1)
  }

  // RTP Trigger Tracking
  static async trackRTPTrigger(triggerType: string, severity: string) {
    const today = new Date().toISOString().split("T")[0]
    const key = REDIS_KEYS.rtpTriggers(today)

    // Get existing triggers
    const existing = (await redis.get(key)) || "{}"
    const triggers = JSON.parse(existing as string)

    // Initialize if needed
    if (!triggers[triggerType]) {
      triggers[triggerType] = { mild: 0, moderate: 0, severe: 0 }
    }

    // Increment counter
    triggers[triggerType][severity] = (triggers[triggerType][severity] || 0) + 1

    // Store with 30-day expiration
    await redis.setex(key, 2592000, JSON.stringify(triggers))

    // Update global stats
    await this.updateGlobalStats("rtp_triggers", 1)
  }

  // Global Statistics
  static async updateGlobalStats(metric: string, increment = 1) {
    const key = REDIS_KEYS.globalStats()

    // Get existing stats
    const existing = (await redis.get(key)) || "{}"
    const stats = JSON.parse(existing as string)

    // Update metric
    stats[metric] = (stats[metric] || 0) + increment
    stats.lastUpdated = new Date().toISOString()

    // Store without expiration
    await redis.set(key, JSON.stringify(stats))
  }

  static async getGlobalStats() {
    const data = await redis.get(REDIS_KEYS.globalStats())
    return data ? JSON.parse(data as string) : {}
  }

  // Daily Usage Tracking
  static async trackDailyUsage(action: string) {
    const today = new Date().toISOString().split("T")[0]
    const key = REDIS_KEYS.dailyUsage(today)

    // Get existing usage
    const existing = (await redis.get(key)) || "{}"
    const usage = JSON.parse(existing as string)

    // Update action count
    usage[action] = (usage[action] || 0) + 1
    usage.lastUpdated = new Date().toISOString()

    // Store with 90-day expiration
    await redis.setex(key, 7776000, JSON.stringify(usage))
  }

  // Analytics Queries
  static async getResonanceInsights(userId: string) {
    const patterns = await redis.get(REDIS_KEYS.resonancePatterns(userId))
    if (!patterns) return null

    const data = JSON.parse(patterns as string)

    // Calculate insights
    const totalSessions = data.length
    const avgAlignment = data.reduce((sum: number, p: any) => sum + (p.alignment || 0), 0) / totalSessions
    const avgWobble = data.reduce((sum: number, p: any) => sum + (p.wobble || 0), 0) / totalSessions
    const flipCount = data.filter((p: any) => p.flipPotential).length

    const phaseDistribution = data.reduce((acc: any, p: any) => {
      const phase = p.phase?.name || "Unknown"
      acc[phase] = (acc[phase] || 0) + 1
      return acc
    }, {})

    return {
      totalSessions,
      avgAlignment: Math.round(avgAlignment * 100) / 100,
      avgWobble: Math.round(avgWobble * 100) / 100,
      flipFrequency: Math.round((flipCount / totalSessions) * 100) / 100,
      phaseDistribution,
      lastSession: data[data.length - 1]?.timestamp,
    }
  }

  static async getFieldAnalytics(days = 7) {
    const analytics: any = {}
    const today = new Date()

    for (let i = 0; i < days; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      const fields = ["business", "healing", "connection", "ai", "art", "memory"]

      for (const field of fields) {
        const count = (await redis.get(REDIS_KEYS.fieldActivations(field, dateStr))) || 0
        if (!analytics[field]) analytics[field] = []
        analytics[field].push({ date: dateStr, count: Number(count) })
      }
    }

    return analytics
  }
}
