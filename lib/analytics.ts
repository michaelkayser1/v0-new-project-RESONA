interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp: string
  sessionId: string
  userId?: string
}

class Analytics {
  private sessionId: string
  private userId?: string
  private enabled = true
  private failureCount = 0
  private maxFailures = 3

  constructor() {
    this.sessionId = this.generateSessionId()
    this.loadUserId()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private loadUserId(): void {
    try {
      if (typeof window !== "undefined") {
        this.userId = localStorage.getItem("resona_user_id") || undefined
        if (!this.userId) {
          this.userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          localStorage.setItem("resona_user_id", this.userId)
        }
      }
    } catch {
      // Silently fail - localStorage might be blocked
    }
  }

  async track(event: string, properties: Record<string, any> = {}) {
    if (!this.enabled || typeof window === "undefined") {
      return
    }

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        url: typeof window !== "undefined" ? window.location.pathname : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(analyticsEvent),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        this.failureCount = 0
      } else {
        this.handleFailure()
      }
    } catch {
      this.handleFailure()
    }
  }

  private handleFailure() {
    this.failureCount++
    if (this.failureCount >= this.maxFailures) {
      this.enabled = false
    }
  }

  trackFieldLayerView(layer: string, timeSpent?: number) {
    this.track("field_layer_viewed", {
      layer,
      timeSpent,
      category: "field_exploration",
    })
  }

  trackFieldLayerInteraction(layer: string, action: string) {
    this.track("field_layer_interaction", {
      layer,
      action,
      category: "field_exploration",
    })
  }

  trackPromptClick(prompt: string, source: "sample_prompts" | "field_layer") {
    this.track("prompt_clicked", {
      prompt,
      source,
      category: "prompt_engagement",
    })
  }

  trackConversationStart(method: "cta_button" | "prompt_click" | "navigation") {
    this.track("conversation_started", {
      method,
      category: "conversation",
    })
  }

  trackMessageSent(messageLength: number, conversationLength: number) {
    this.track("message_sent", {
      messageLength,
      conversationLength,
      category: "conversation",
    })
  }

  trackConversationEnd(duration: number, messageCount: number) {
    this.track("conversation_ended", {
      duration,
      messageCount,
      category: "conversation",
    })
  }

  trackPageView(page: string) {
    this.track("page_viewed", {
      page,
      category: "navigation",
    })
  }

  trackTimeOnPage(page: string, timeSpent: number) {
    this.track("time_on_page", {
      page,
      timeSpent,
      category: "engagement",
    })
  }

  trackScrollDepth(page: string, maxDepth: number) {
    this.track("scroll_depth", {
      page,
      maxDepth,
      category: "engagement",
    })
  }
}

export const analytics = new Analytics()
