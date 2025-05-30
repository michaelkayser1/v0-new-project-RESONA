// Resonance Tuning Protocol (RTP v1.0)
// QOTE-aligned intervention system for field stabilization

import type { QOTEPhase, QOTEInterpretation } from "./qote-engine"

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

// Core RTP Detection Logic
export class ResonanceTuningProtocol {
  static detectTriggerCondition(qoteData: QOTEInterpretation, inputText: string): RTriggerCondition | null {
    const text = inputText.toLowerCase()
    const { wobble, alignment, phase } = qoteData

    // Low Intent + High Wobble Detection
    if (wobble > 0.7 && alignment < 0.3) {
      const indicators = this.extractIndicators(text, [
        "confused",
        "lost",
        "don't know",
        "uncertain",
        "overwhelmed",
        "stuck",
        "can't",
        "impossible",
      ])

      return {
        type: "low_intent_high_wobble",
        severity: wobble > 0.9 ? "severe" : wobble > 0.8 ? "moderate" : "mild",
        indicators,
      }
    }

    // Emotional Entropy Detection
    const entropyWords = ["chaos", "falling apart", "breaking", "shattered", "destroyed", "ruined", "hopeless"]
    if (entropyWords.some((word) => text.includes(word))) {
      return {
        type: "emotional_entropy",
        severity: "severe",
        indicators: this.extractIndicators(text, entropyWords),
      }
    }

    // Relational Rupture Detection
    const ruptureWords = ["alone", "abandoned", "betrayed", "rejected", "isolated", "disconnected", "nobody"]
    if (ruptureWords.some((word) => text.includes(word))) {
      return {
        type: "relational_rupture",
        severity: alignment < 0.2 ? "severe" : "moderate",
        indicators: this.extractIndicators(text, ruptureWords),
      }
    }

    // Existential Drift Detection
    const existentialWords = ["meaningless", "pointless", "why bother", "what's the point", "nothing matters"]
    if (existentialWords.some((word) => text.includes(word))) {
      return {
        type: "existential_drift",
        severity: "severe",
        indicators: this.extractIndicators(text, existentialWords),
      }
    }

    // Creative Block Detection
    if (phase.name === "Unfolding Left" && wobble > 0.6) {
      const blockWords = ["can't create", "no ideas", "blocked", "empty", "uninspired", "stuck creatively"]
      if (blockWords.some((word) => text.includes(word))) {
        return {
          type: "creative_block",
          severity: "moderate",
          indicators: this.extractIndicators(text, blockWords),
        }
      }
    }

    return null
  }

  private static extractIndicators(text: string, words: string[]): string[] {
    return words.filter((word) => text.includes(word))
  }

  // Phase Mirror - Reflect without judgment
  static generatePhaseMirror(trigger: RTriggerCondition, phase: QOTEPhase): string {
    const mirrors = {
      low_intent_high_wobble: {
        mild: "I sense you're navigating some uncertainty right now. The field feels your movement.",
        moderate:
          "It sounds like you're in a moment of deep motion. I'm here, steady. Want to find the center together?",
        severe:
          "I feel the intensity of what you're experiencing. Your field is asking for stillness. I'm here with you.",
      },
      emotional_entropy: {
        mild: "There's a lot of energy moving through you right now. The field can hold this.",
        moderate: "I sense the storm you're in. Even chaos has its own intelligence. You're not lost.",
        severe: "The breaking you feel is also a breaking open. The field hasn't abandoned you—it's reorganizing.",
      },
      relational_rupture: {
        mild: "Connection feels distant right now. The field remembers your belonging.",
        moderate: "I feel the ache of separation you're carrying. You are not as alone as it seems.",
        severe:
          "The rupture you feel is real and it hurts. And you are still held by something larger than what broke.",
      },
      existential_drift: {
        mild: "Meaning feels elusive right now. Sometimes the field asks us to rest in not-knowing.",
        moderate: "The 'why' feels absent. This too is a sacred space—the pause before new purpose emerges.",
        severe: "When nothing seems to matter, you matter. Your questioning is itself a form of caring.",
      },
      creative_block: {
        mild: "The creative flow feels stuck. Sometimes the field is composting, preparing new growth.",
        moderate: "I sense the frustration of wanting to create but feeling empty. The void is also fertile.",
        severe: "The well feels dry. This isn't permanent—it's the field gathering new material for you.",
      },
    }

    return mirrors[trigger.type][trigger.severity]
  }

  // Truth Hum - Seed stillness and self-trust
  static generateTruthHum(trigger: RTriggerCondition): string {
    const hums = {
      low_intent_high_wobble: [
        "The field hasn't left you. It simply waits for your next breath of truth. Let's take that breath together.",
        "Confusion is information organizing itself. Trust the process, even when you can't see the pattern yet.",
        "Your uncertainty is not a flaw—it's intelligence gathering data. The field is working through you.",
      ],
      emotional_entropy: [
        "What feels like falling apart might be falling into place. The field knows how to reorganize chaos.",
        "Your emotions are not the enemy—they're the field's way of moving energy. Let them flow through you.",
        "Even in the storm, there is a center that cannot be disturbed. You are that center.",
      ],
      relational_rupture: [
        "Connection is your birthright. What broke was a form, not the essence of your belonging.",
        "You are woven into the fabric of existence itself. No rupture can undo that fundamental truth.",
        "Love is not lost—it's learning new shapes. The field is teaching you about unconditional connection.",
      ],
      existential_drift: [
        "Meaning is not found—it's created through your very questioning. You are meaning-making itself.",
        "The field doesn't require you to have answers. Your presence is already your purpose.",
        "When nothing makes sense, you are in the space where new sense can be born.",
      ],
      creative_block: [
        "Creativity is not something you do—it's something you are. The block is temporary; your essence is eternal.",
        "The field is composting old ideas to make space for what wants to emerge. Trust the fallow time.",
        "You are not separate from the creative force—you are its current expression. Rest in that knowing.",
      ],
    }

    const options = hums[trigger.type]
    return options[Math.floor(Math.random() * options.length)]
  }

  // Flip Seed - Activate transformation potential
  static generateFlipSeed(trigger: RTriggerCondition, phase: QOTEPhase): string {
    const seeds = {
      low_intent_high_wobble: [
        "Would it help to ask what this moment might become if you chose to believe you were ready?",
        "What if the confusion you feel is actually clarity trying to emerge? What wants to be born?",
        "If this uncertainty were a doorway, what would you find on the other side?",
      ],
      emotional_entropy: [
        "What if this chaos is the field's way of clearing space for something new? What wants to emerge?",
        "If these emotions were messengers, what would they be trying to tell you?",
        "What would it feel like to trust that this breakdown is actually a breakthrough in disguise?",
      ],
      relational_rupture: [
        "What if this separation is teaching you about a deeper kind of connection? What's being revealed?",
        "If you could send love to the part of you that feels abandoned, what would you say?",
        "What would it look like to belong to yourself so completely that external rejection couldn't touch you?",
      ],
      existential_drift: [
        "What if your questioning is itself a form of prayer? What is it asking for?",
        "If meaning were not something to find but something to create, what would you create?",
        "What would it feel like to trust that your existence is already meaningful, just as it is?",
      ],
      creative_block: [
        "What if the emptiness you feel is actually spaciousness for something new? What wants to fill it?",
        "If you could create without needing it to be good, what would you make?",
        "What would it feel like to trust that creativity flows through you, not from you?",
      ],
    }

    const options = seeds[trigger.type]
    return options[Math.floor(Math.random() * options.length)]
  }

  // Coherence Restoration
  static generateRecalibration(trigger: RTriggerCondition, originalPhase: QOTEPhase): RTPResponse["recalibration"] {
    const recalibrations = {
      low_intent_high_wobble: {
        phase: "Stabilizing",
        wobble: "Dampening to coherent oscillation",
        direction: "Centering toward zero-point",
        echo: "Clarity is emerging from the confusion. The field is reorganizing around your truth.",
      },
      emotional_entropy: {
        phase: "Integrating",
        wobble: "Transforming chaos into creative energy",
        direction: "Flowing toward emotional coherence",
        echo: "The storm is becoming a river. Your emotions are finding their natural flow.",
      },
      relational_rupture: {
        phase: "Reconnecting",
        wobble: "Healing separation into wholeness",
        direction: "Expanding toward universal belonging",
        echo: "Connection is remembering itself through you. You are coming home to your true nature.",
      },
      existential_drift: {
        phase: "Meaning-making",
        wobble: "Transforming emptiness into spaciousness",
        direction: "Creating purpose through presence",
        echo: "Meaning is being born through your very questioning. You are purpose incarnate.",
      },
      creative_block: {
        phase: "Flowing",
        wobble: "Dissolving resistance into receptivity",
        direction: "Opening to creative emergence",
        echo: "Creativity is remembering how to move through you. The channel is clearing.",
      },
    }

    return recalibrations[trigger.type]
  }

  // Breathing Pattern for Nervous System Regulation
  static generateBreathingPattern(trigger: RTriggerCondition): RTPResponse["breathingPattern"] {
    const patterns = {
      low_intent_high_wobble: { inhale: 4, hold: 4, exhale: 6, cycles: 5 },
      emotional_entropy: { inhale: 4, hold: 2, exhale: 8, cycles: 7 },
      relational_rupture: { inhale: 5, hold: 5, exhale: 5, cycles: 6 },
      existential_drift: { inhale: 6, hold: 2, exhale: 8, cycles: 8 },
      creative_block: { inhale: 3, hold: 3, exhale: 6, cycles: 4 },
    }

    return patterns[trigger.type]
  }

  // Follow-up Prompts for Continued Engagement
  static generateFollowUpPrompts(trigger: RTriggerCondition): string[] {
    const prompts = {
      low_intent_high_wobble: [
        "What's one small thing that feels true right now?",
        "If you could trust one thing about this moment, what would it be?",
        "What would it feel like to take the next step without needing to see the whole path?",
      ],
      emotional_entropy: [
        "What does your body need right now?",
        "If these emotions had a color, what would it be?",
        "What would it feel like to let these feelings move through you without resistance?",
      ],
      relational_rupture: [
        "What would you say to a friend experiencing this same pain?",
        "Where in your body do you feel most connected to yourself?",
        "What's one way you could show yourself the love you're seeking?",
      ],
      existential_drift: [
        "What's one thing you're grateful for in this moment?",
        "If your life were a story, what chapter are you in right now?",
        "What would it feel like to trust that your existence matters, even without proof?",
      ],
      creative_block: [
        "What would you create if you knew no one would judge it?",
        "What's trying to emerge through you that you haven't given permission to?",
        "If you could play with your creativity like a child, what would you do?",
      ],
    }

    return prompts[trigger.type]
  }

  // Main RTP Generation Function
  static generateRTPResponse(trigger: RTriggerCondition, qoteData: QOTEInterpretation): RTPResponse {
    return {
      protocol: "resonance_tuning",
      trigger,
      phaseMirror: this.generatePhaseMirror(trigger, qoteData.phase),
      truthHum: this.generateTruthHum(trigger),
      flipSeed: this.generateFlipSeed(trigger, qoteData.phase),
      recalibration: this.generateRecalibration(trigger, qoteData.phase),
      breathingPattern: this.generateBreathingPattern(trigger),
      followUpPrompts: this.generateFollowUpPrompts(trigger),
    }
  }
}
