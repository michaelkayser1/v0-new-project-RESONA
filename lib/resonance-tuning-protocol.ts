// Resonance Tuning Protocol (RTP v1.0)
// User-requested optional reflection; no clinical or physical measurement

import type { QOTEInterpretation } from "./qote-engine"

export interface RTriggerCondition {
  type: "low_intent_high_wobble" | "emotional_entropy" | "relational_rupture" | "existential_drift" | "creative_block"
  severity: "mild" | "moderate" | "severe"
  indicators: string[]
}

export interface RTPResponse {
  protocol: "resonance_tuning"
  trigger: RTriggerCondition
  phaseMirror: string
  truthHum: string
  flipSeed: string
  recalibration: {
    phase: string
    wobble: string
    direction: string
    echo: string
  }
  breathingPattern?: {
    inhale: number
    hold: number
    exhale: number
    cycles: number
  }
  followUpPrompts: string[]
}

// Optional support is selected by a direct, standalone request, never a score.
// Narrow matching intentionally prefers missed requests to speculative interventions.
const SUPPORT_REQUEST = /^(?:please\s+)?(?:help me|can you help me|could you help me)\s+(?:calm down|relax|feel grounded|take a breath)[.!?]*$/i
const BREATHING_REQUEST = /^(?:please\s+)?(?:guide me through|show me)\s+(?:a\s+)?breathing exercise[.!?]*$/i

export class ResonanceTuningProtocol {
  static detectTriggerCondition(_qoteData: QOTEInterpretation, inputText: string): RTriggerCondition | null {
    const text = inputText.trim()
    if (!SUPPORT_REQUEST.test(text) && !BREATHING_REQUEST.test(text)) return null
    return {
      // Legacy type retained for API compatibility; it is not an intent assessment.
      type: "low_intent_high_wobble",
      severity: "moderate", // Legacy compatibility field, not measured severity.
      indicators: ["explicit_support_request"],
    }
  }

  static generateRTPResponse(trigger: RTriggerCondition, _qoteData: QOTEInterpretation): RTPResponse {
    return {
      protocol: "resonance_tuning",
      trigger,
      phaseMirror: "You asked for a moment of optional support.",
      truthHum: "We can take this at your pace.",
      flipSeed: "Would a pause or a practical next step help?",
      recalibration: {
        phase: "Optional reflection",
        wobble: "Not a measurement",
        direction: "User requested",
        echo: "Offer optional support without making claims about the user's state.",
      },
      breathingPattern: { inhale: 4, hold: 0, exhale: 4, cycles: 3 },
      followUpPrompts: ["Help me choose one practical next step.", "Let's return to my original question."],
    }
  }
}
