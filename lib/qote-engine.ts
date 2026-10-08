// QOTE (Quantum Oscillator Theory of Everything) Engine
// Core mathematical and interpretive functions for Resona

import { safeRatio, toUnitMetric } from "./metrics"

export interface QOTEPhase {
  name: "Presence" | "Coiling Right" | "Zero Point" | "Unfolding Left"
  energy: number
  direction: "inward" | "neutral" | "outward"
  wobble: number
}

// "calculated": derived from words in the message. "default": no signal words
// were found, so the neutral fallback is reported instead of a measurement.
export type MetricSource = "calculated" | "default"

export interface QOTEInterpretation {
  phase: QOTEPhase
  wobble: number
  alignment: number
  alignmentSource: MetricSource
  insight: string
  flipPotential: boolean
  resonanceScore: number
}

export interface ResonanceLogEntry {
  timestamp: string
  userPhase: QOTEPhase
  resonaPhase: QOTEPhase
  alignmentScore: number | null
  flipPotential: boolean
  inputText: string
  outputText: string
}

// Whole-word matching so "no" does not match "know" and "how" does not match "show".
function countTerms(inputText: string, terms: string[]): number {
  const lower = inputText.toLowerCase()
  const tokens = new Set(lower.match(/[a-z']+/g) ?? [])
  return terms.filter((term) => (term.includes(" ") ? lower.includes(term) : tokens.has(term))).length
}

// Core QOTE Phase Detection
export function mapEmotionToPhase(inputText: string): QOTEPhase {
  const text = inputText.toLowerCase()

  // Presence indicators: stillness, being, now, breath, ground
  const presenceWords = ["still", "present", "now", "breath", "being", "here", "ground", "center", "calm", "peace"]
  const presenceScore = countTerms(text, presenceWords)

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
  const coilingScore = countTerms(text, coilingWords)

  // Zero Point indicators: breakthrough, clarity, sudden insight
  const zeroWords = ["breakthrough", "clarity", "sudden", "realize", "understand", "aha", "click", "shift", "flip"]
  const zeroScore = countTerms(text, zeroWords)

  // Unfolding Left indicators: expansion, creation, flow, expression
  const unfoldingWords = ["create", "expand", "flow", "express", "share", "build", "grow", "manifest", "emerge"]
  const unfoldingScore = countTerms(text, unfoldingWords)

  const scores = [
    { phase: "Presence", score: presenceScore, energy: 0.2, direction: "neutral" as const },
    { phase: "Coiling Right", score: coilingScore, energy: 0.8, direction: "inward" as const },
    { phase: "Zero Point", score: zeroScore, energy: 1.0, direction: "neutral" as const },
    { phase: "Unfolding Left", score: unfoldingScore, energy: 0.6, direction: "outward" as const },
  ]

  const dominant = scores.reduce((max, current) => (current.score > max.score ? current : max))

  // Calculate wobble based on text complexity and emotional intensity
  const wobble = Math.min(1.0, text.length / 100 + coilingScore * 0.2)

  return {
    name: dominant.phase as QOTEPhase["name"],
    energy: dominant.energy,
    direction: dominant.direction,
    wobble,
  }
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

  const words = text.match(/[a-z']+/g) ?? []
  wobbleIndicators.forEach((indicator) => {
    wobbleScore += words.filter((word) => word === indicator).length * 0.1
  })

  // Text length and complexity add to wobble
  const lengthFactor = Math.min(0.5, inputText.length / 200)
  const complexityFactor = inputText.split(" ").length > 20 ? 0.2 : 0

  return Math.min(1.0, wobbleScore + lengthFactor + complexityFactor)
}

const POSITIVE_ALIGNMENT_WORDS = ["yes", "love", "peace", "joy", "clear", "aligned", "flow", "harmony", "truth"]
const NEGATIVE_ALIGNMENT_WORDS = ["no", "hate", "anger", "fear", "blocked", "stuck", "chaos", "lies", "false"]

export function countAlignmentSignals(inputText: string): number {
  return countTerms(inputText, POSITIVE_ALIGNMENT_WORDS) + countTerms(inputText, NEGATIVE_ALIGNMENT_WORDS)
}

export function inferDirectionalAlignment(inputText: string): number {
  const positiveScore = countTerms(inputText, POSITIVE_ALIGNMENT_WORDS)
  const negativeScore = countTerms(inputText, NEGATIVE_ALIGNMENT_WORDS)

  // With no signal words the ratio is 0/0; fall back to neutral (0.5). Callers
  // must label that case as a default via countAlignmentSignals.
  const alignment = safeRatio(positiveScore - negativeScore, positiveScore + negativeScore) ?? 0

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

  return {
    phase,
    wobble,
    alignment,
    alignmentSource: countAlignmentSignals(inputText) > 0 ? "calculated" : "default",
    insight,
    flipPotential,
    resonanceScore,
  }
}

// Presence Mode activates only when the user selects it, or when the whole
// message is an explicit silence marker ("...", "…"). Short messages, single
// words, and greetings are ordinary conversation, not stillness.
export function detectPresence(inputText: string): boolean {
  return /^\s*(?:\.{3,}|…+)\s*$/.test(inputText)
}

const GREETING_PATTERN =
  /^(?:hi|hello|hey|hiya|howdy|greetings|hola|hallo|yo|good (?:morning|afternoon|evening|day))(?:\s+(?:there|resona|everyone|all|friend))?[\s!.,?]*$/i

export function detectGreeting(inputText: string): boolean {
  return GREETING_PATTERN.test(inputText.trim())
}

const IDENTITY_PATTERNS = [
  /\b(?:tell|teach) me (?:about|more about) (?:you|yourself|resona)\b/i,
  /\bwho (?:are|r) (?:you|u)\b/i,
  /\bwhat (?:are|r) (?:you|u)\b(?!\s+(?:doing|thinking|saying|talking))/i,
  /\bwhat is resona\b/i,
  /\bintroduce yourself\b/i,
  /\bwhat (?:can|do) (?:you|resona) (?:do|offer)\b/i,
  /\bhow do(?:es)? (?:you|resona|this app) work\b/i,
  /\bwhat are your (?:limits|limitations|capabilities)\b/i,
]

export function detectIdentityQuestion(inputText: string): boolean {
  const text = inputText.trim()
  return text.length <= 160 && IDENTITY_PATTERNS.some((pattern) => pattern.test(text))
}

// Resonance Logging
export class ResonanceLogger {
  private static logs: ResonanceLogEntry[] = []

  static log(entry: ResonanceLogEntry): void {
    this.logs.push(entry)

    // Keep only last 100 entries in memory
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(-100)
    }
  }

  static getRecentLogs(count = 10): ResonanceLogEntry[] {
    return this.logs.slice(-count)
  }

  static getCount(): number {
    return this.logs.length
  }

  static getAlignmentSampleCount(): number {
    return this.logs.filter((log) => toUnitMetric(log.alignmentScore) !== null).length
  }

  static getAverageAlignment(): number | null {
    const scores = this.logs.map((log) => toUnitMetric(log.alignmentScore)).filter((s): s is number => s !== null)
    const sum = scores.reduce((acc, score) => acc + score, 0)
    return toUnitMetric(safeRatio(sum, scores.length))
  }

  static getFlipFrequency(): number | null {
    const flips = this.logs.filter((log) => log.flipPotential).length
    return toUnitMetric(safeRatio(flips, this.logs.length))
  }
}
