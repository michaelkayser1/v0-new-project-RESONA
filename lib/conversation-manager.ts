// Simplified conversation manager that works with or without KV

export interface ConversationMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export class ConversationManager {
  private static async getKV() {
    try {
      if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        const kv = await import("@vercel/kv")
        return kv.default
      }
    } catch (error) {
      console.warn("KV not available:", error)
    }
    return null
  }

  private static getKey(sessionId: string): string {
    return `resona_conversation:${sessionId}`
  }

  static async saveConversation(sessionId: string, messages: ConversationMessage[]): Promise<boolean> {
    try {
      const kv = await this.getKV()
      if (!kv) return false

      const key = this.getKey(sessionId)
      await kv.set(key, messages, { ex: 3600 }) // 1 hour expiry
      return true
    } catch (error) {
      console.warn("Failed to save conversation:", error)
      return false
    }
  }

  static async getConversation(sessionId: string): Promise<{ messages: ConversationMessage[]; fromKV: boolean }> {
    try {
      const kv = await this.getKV()
      if (!kv) return { messages: [], fromKV: false }

      const key = this.getKey(sessionId)
      const messages = await kv.get<ConversationMessage[]>(key)
      return { messages: messages || [], fromKV: true }
    } catch (error) {
      console.warn("Failed to get conversation:", error)
      return { messages: [], fromKV: false }
    }
  }

  static async deleteConversation(sessionId: string): Promise<boolean> {
    try {
      const kv = await this.getKV()
      if (!kv) return false

      const key = this.getKey(sessionId)
      await kv.del(key)
      return true
    } catch (error) {
      console.warn("Failed to delete conversation:", error)
      return false
    }
  }

  static async isKVAvailable(): Promise<boolean> {
    const kv = await this.getKV()
    return kv !== null
  }
}
