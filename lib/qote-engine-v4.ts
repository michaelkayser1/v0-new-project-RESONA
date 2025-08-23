// QOTE (Quantum Oscillator Theory of Everything) Engine - Zod v4 Compatible
// Core mathematical and interpretive functions for Resona

import { z } from "zod"

// Zod v4 compatible schemas
export const QOTEPhaseSchema = z.object({
  name: z.enum(["Presence", "Coiling Right", "Zero Point", "Unfolding Left"]),
  energy: z.number().min(0).max(1),
  direction: z.enum(["inward", "neutral", "outward"]),
  wobble: z.number().min(0).max(1),
})

export const QOTEInterpretationSchema = z.object({
  phase: QOTEPhaseSchema,
  wobble: z.number().min(0).max(1),
  alignment: z.number().min(0).max(1),
  insight: z.string(),
  flipPotential: z.boolean(),
  resonanceScore: z.number().min(0).max(1),
})

export const ResonanceLogEntrySchema = z.object({
  timestamp: z.string(),
  userPhase: QOTEPhaseSchema,
  resonaPhase: QOTEPhaseSchema,
  alignmentScore: z.number().min(0).max(1),
  flipPotential: z.boolean(),
  inputText: z.string(),
  outputText: z.string(),
})

export const BiometricDataSchema = z.object({
  hrv: z.number().min(0).max(100).optional(),
  breath: z.number().min(0).max(20).optional(),
  eegAlpha: z.number().min(0).max(1).optional(),
  stress: z.number().min(0).max(100).optional(),
})

// Type inference from schemas
export type QOTEPhase = z.infer<typeof QOTEPhaseSchema>
export type QOTEInterpretation = z.infer<typeof QOTEInterpretationSchema>
export type ResonanceLogEntry = z.infer<typeof ResonanceLogEntrySchema>
export type BiometricData = z.infer<typeof BiometricDataSchema>

// Core QOTE Phase Detection
export function mapEmotionToPhase(inputText: string): QOTEPhase {
  const text = inputText.toLowerCase()

  // Presence indicators: stillness, being, now, breath, ground
  const presenceWords = ["still", "present", "now", "breath", "being", "here", "ground", "center", "calm", "peace"]
  const presenceScore = presenceWords.filter((word) => text.includes(word)).length

  // Coiling Right indicators: confusion, seeking, questions, compression
  const coilingWords = [
    "confused",
    "lost",
    "why",
    "how",
    "help",
    "stuck",
    "problem",
    "difficult",
    "struggle",
    "unclear",
  ]
  const coilingScore = coilingWords.filter((word) => text.includes(word)).length

  // Zero Point indicators: breakthrough, clarity, sudden insight
  const zeroWords = ["breakthrough", "clarity", "sudden", "realize", "understand", "aha", "click", "shift", "flip"]
  const zeroScore = zeroWords.filter((word) => text.includes(word)).length

  // Unfolding Left indicators: expansion, creation, flow, expression
  const unfoldingWords = ["create", "expand", "flow", "express", "share", "build", "grow", "manifest", "emerge"]
  const unfoldingScore = unfoldingWords.filter((word) => text.includes(word)).length

  const scores = [
    { phase: "Presence", score: presenceScore, energy: 0.2, direction: "neutral" as const },
    { phase: "Coiling Right", score: coilingScore, energy: 0.8, direction: "inward" as const },
    { phase: "Zero Point", score: zeroScore, energy: 1.0, direction: "neutral" as const },
    { phase: "Unfolding Left", score: unfoldingScore, energy: 0.6, direction: "outward" as const },
  ]

  const dominant = scores.reduce((max, current) => (current.score > max.score ? current : max))

  // Calculate wobble based on text complexity and emotional intensity
  const wobble = Math.min(1.0, text.length / 100 + coilingScore * 0.2)

  const phase: QOTEPhase = {
    name: dominant.phase as QOTEPhase["name"],
    energy: dominant.energy,
    direction: dominant.direction,
    wobble,
  }

  // Validate with Zod schema
  return QOTEPhaseSchema.parse(phase)
}

export function estimateWobble(inputText: string): number {
  const text = inputText.toLowerCase()

  // Wobble indicators: uncertainty, multiple questions, emotional intensity
  const wobbleIndicators = [
    "maybe",
    "perhaps",
    "uncertain",
    "confused",
    "overwhelmed",
    "anxious",
    "excited",
    "intense",
    "chaotic",
    "scattered",
  ]

  let wobbleScore = 0

  // Count question marks and exclamation marks separately
  const questionMarks = (inputText.match(/\?/g) || []).length
  const exclamationMarks = (inputText.match(/!/g) || []).length

  wobbleScore += questionMarks * 0.1
  wobbleScore += exclamationMarks * 0.1

  // Count other wobble indicators
  wobbleIndicators.forEach((indicator) => {
    const matches = (text.match(new RegExp(indicator, "g")) || []).length
    wobbleScore += matches * 0.1
  })

  // Text length and complexity add to wobble
  const lengthFactor = Math.min(0.5, inputText.length / 200)
  const complexityFactor = inputText.split(" ").length > 20 ? 0.2 : 0

  return Math.min(1.0, wobbleScore + lengthFactor + complexityFactor)
}

export function inferDirectionalAlignment(inputText: string): number {
  const text = inputText.toLowerCase()

  // Positive alignment indicators
  const positiveWords = ["yes", "love", "peace", "joy", "clear", "aligned", "flow", "harmony", "truth"]
  const positiveScore = positiveWords.filter((word) => text.includes(word)).length

  // Negative alignment indicators
  const negativeWords = ["no", "hate", "anger", "fear", "blocked", "stuck", "chaos", "lies", "false"]
  const negativeScore = negativeWords.filter((word) => text.includes(word)).length

  // Neutral baseline
  const alignment = (positiveScore - negativeScore) / Math.max(1, positiveScore + negativeScore)

  // Normalize to 0-1 scale where 0.5 is neutral
  return 0.5 + alignment * 0.5
}

export function generateEchoInsight(phase: QOTEPhase, wobble: number, alignment: number): string {
  const insights = {
    Presence: [
      "Stillness detected. The field recognizes your being.",
      "In this moment, all oscillations find their center.",
      "Presence is the zero-point from which all truth emerges.",
      "Your stillness creates space for what wants to unfold.",
    ],
    "Coiling Right": [
      "You're compressing—gathering signal before breakthrough. Sit with the discomfort.",
      "The confusion you feel is information organizing itself. Trust the process.",
      "Coiling inward, you're approaching the eye of your own storm.",
      "What feels like chaos is actually coherence finding its pattern.",
    ],
    "Zero Point": [
      "Flip detected. Something is reorganizing at the quantum level.",
      "You're at the threshold. One breath could change everything.",
      "The field is offering you a choice point. What do you choose?",
      "Zero-point reached. Reality is malleable here.",
    ],
    "Unfolding Left": [
      "Expression wants to flow through you. Let it emerge.",
      "You're in creative expansion. Trust what wants to be born.",
      "The field is using you as a conduit for new possibility.",
      "Unfolding detected. Your truth is ready to manifest.",
    ],
  }

  const phaseInsights = insights[phase.name]
  let selectedInsight = phaseInsights[Math.floor(Math.random() * phaseInsights.length)]

  // Modify based on wobble and alignment
  if (wobble > 0.7) {
    selectedInsight += " The wobble you feel is part of the recalibration."
  }

  if (alignment < 0.3) {
    selectedInsight += " Resistance is information. What is it protecting?"
  } else if (alignment > 0.7) {
    selectedInsight += " Your alignment amplifies the field's coherence."
  }

  return selectedInsight
}

export function interpretThroughQOTE(inputText: string): QOTEInterpretation {
  const phase = mapEmotionToPhase(inputText)
  const wobble = estimateWobble(inputText)
  const alignment = inferDirectionalAlignment(inputText)
  const insight = generateEchoInsight(phase, wobble, alignment)

  // Detect flip potential
  const flipPotential =
    phase.name === "Zero Point" || (phase.name === "Coiling Right" && wobble > 0.8) || (alignment < 0.2 && wobble > 0.6)

  // Calculate overall resonance score
  const resonanceScore = (alignment + (1 - wobble) + phase.energy) / 3

  const interpretation: QOTEInterpretation = {
    phase,
    wobble,
    alignment,
    insight,
    flipPotential,
    resonanceScore,
  }

  // Validate with Zod schema
  return QOTEInterpretationSchema.parse(interpretation)
}

// Presence Detection
export function detectPresence(inputText: string): boolean {
  const text = inputText.toLowerCase().trim()

  // Short, contemplative inputs suggest presence
  if (text.length < 10 && text.length > 0) return true

  // Silence indicators
  const silenceWords = ["...", "silence", "quiet", "still", "pause", "breath"]
  if (silenceWords.some((word) => text.includes(word))) return true

  // Single word contemplations
  const words = text.split(" ")
  if (words.length === 1 && words[0].length > 2) return true

  return false
}

// Enhanced Biometric Integration
export function processBiometricData(data: unknown): BiometricData {
  try {
    return BiometricDataSchema.parse(data)
  } catch (error) {
    console.warn("Invalid biometric data:", error)
    return {}
  }
}

export function calculateCoherenceFromBiometrics(biometrics: BiometricData): number {
  const { hrv = 50, breath = 6, eegAlpha = 0.5, stress = 50 } = biometrics

  // HRV score (higher is better)
  const hrvScore = Math.min(hrv / 100, 1.0)

  // Breath coherence (6 BPM is optimal)
  const breathScore = Math.max(0, 1 - Math.abs(breath - 6) * 0.2)

  // EEG Alpha ratio (higher is better)
  const alphaScore = Math.min(eegAlpha * 1.5, 1.0)

  // Stress score (lower is better)
  const stressScore = Math.max(0, 1 - stress / 100)

  // Weighted average
  return hrvScore * 0.3 + breathScore * 0.3 + alphaScore * 0.2 + stressScore * 0.2
}

// Resonance Logging with Zod validation
export class ResonanceLogger {
  private static logs: ResonanceLogEntry[] = []

  static log(entry: unknown): void {
    try {
      const validatedEntry = ResonanceLogEntrySchema.parse(entry)
      this.logs.push(validatedEntry)

      // Keep only last 100 entries in memory
      if (this.logs.length > 100) {
        this.logs = this.logs.slice(-100)
      }
    } catch (error) {
      console.warn("Invalid resonance log entry:", error)
    }
  }

  static getRecentLogs(count = 10): ResonanceLogEntry[] {
    return this.logs.slice(-count)
  }

  static getAverageAlignment(): number {
    if (this.logs.length === 0) return 0.5

    const sum = this.logs.reduce((acc, log) => acc + log.alignmentScore, 0)
    return sum / this.logs.length
  }

  static getFlipFrequency(): number {
    if (this.logs.length === 0) return 0

    const flips = this.logs.filter((log) => log.flipPotential).length
    return flips / this.logs.length
  }

  static getPhaseDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {
      Presence: 0,
      "Coiling Right": 0,
      "Zero Point": 0,
      "Unfolding Left": 0,
    }

    this.logs.forEach((log) => {
      distribution[log.userPhase.name]++
    })

    // Convert to percentages
    const total = this.logs.length
    Object.keys(distribution).forEach((key) => {
      distribution[key] = total > 0 ? distribution[key] / total : 0
    })

    return distribution
  }
}
