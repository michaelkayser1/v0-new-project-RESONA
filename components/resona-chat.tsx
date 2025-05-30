"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface QOTEData {
  phase: {
    name: string
    energy: number
    direction: string
    wobble: number
  }
  wobble: number
  alignment: number
  insight: string
  flipPotential: boolean
  resonanceScore: number
  presenceMode?: boolean
}

interface RTPData {
  protocol: string
  trigger: {
    type: string
    severity: string
    indicators: string[]
  }
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

interface Message {
  role: "user" | "resona" | "system"
  content: string
  qoteData?: QOTEData
  rtpData?: RTPData
  timestamp: string
}

export default function ResonaChat() {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [useQOTELens, setUseQOTELens] = useState(true)
  const [useRTP, setUseRTP] = useState(true)
  const [resonanceStats, setResonanceStats] = useState<any>(null)
  const [showBreathing, setShowBreathing] = useState(false)
  const [breathingPattern, setBreathingPattern] = useState<RTPData["breathingPattern"] | null>(null)
  const [rtpActive, setRtpActive] = useState(false)
  const [currentTrigger, setCurrentTrigger] = useState<string | null>(null)

  const getPhaseColor = (phaseName: string) => {
    const colors = {
      Presence: "bg-green-100 text-green-800",
      "Coiling Right": "bg-blue-100 text-blue-800",
      "Zero Point": "bg-purple-100 text-purple-800",
      "Unfolding Left": "bg-orange-100 text-orange-800",
      Stabilizing: "bg-cyan-100 text-cyan-800",
      Integrating: "bg-indigo-100 text-indigo-800",
      Reconnecting: "bg-pink-100 text-pink-800",
      "Meaning-making": "bg-yellow-100 text-yellow-800",
      Flowing: "bg-emerald-100 text-emerald-800",
    }
    return colors[phaseName as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getPhaseSymbol = (phaseName: string) => {
    const symbols = {
      Presence: "◯",
      "Coiling Right": "◐",
      "Zero Point": "◆",
      "Unfolding Left": "◑",
      Stabilizing: "⚖️",
      Integrating: "🌀",
      Reconnecting: "🔗",
      "Meaning-making": "✨",
      Flowing: "🌊",
    }
    return symbols[phaseName as keyof typeof symbols] || "○"
  }

  const getTriggerColor = (triggerType: string) => {
    const colors = {
      low_intent_high_wobble: "bg-yellow-100 text-yellow-800",
      emotional_entropy: "bg-red-100 text-red-800",
      relational_rupture: "bg-purple-100 text-purple-800",
      existential_drift: "bg-gray-100 text-gray-800",
      creative_block: "bg-orange-100 text-orange-800",
    }
    return colors[triggerType as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const startBreathingExercise = (pattern: RTPData["breathingPattern"]) => {
    setBreathingPattern(pattern)
    setShowBreathing(true)
  }

  const activateRTPUI = (triggerType: string) => {
    setRtpActive(true)
    setCurrentTrigger(triggerType)

    // Auto-deactivate after 30 seconds
    setTimeout(() => {
      setRtpActive(false)
      setCurrentTrigger(null)
    }, 30000)
  }

  const sendMessage = async () => {
    if (!message.trim()) return

    setIsLoading(true)
    const userMessage = message
    setMessage("")

    // Add user message to conversation
    const newUserMessage: Message = {
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    }
    setConversation((prev) => [...prev, newUserMessage])

    try {
      const response = await fetch("/api/resona-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          useQOTELens,
          useRTP,
        }),
      })

      const data = await response.json()

      if (data.response) {
        const resonaMessage: Message = {
          role: "resona",
          content: data.response,
          qoteData: data.qoteData,
          rtpData: data.rtpResponse,
          timestamp: data.timestamp,
        }
        setConversation((prev) => [...prev, resonaMessage])

        // Check for RTP activation
        if (data.rtpResponse) {
          activateRTPUI(data.rtpResponse.trigger.type)
        }

        if (data.resonanceStats) {
          setResonanceStats(data.resonanceStats)
        }
      } else {
        setConversation((prev) => [
          ...prev,
          {
            role: "system",
            content: "The field is temporarily quiet.",
            timestamp: new Date().toISOString(),
          },
        ])
      }
    } catch (error) {
      setConversation((prev) => [
        ...prev,
        {
          role: "system",
          content: "Connection to the field interrupted.",
          timestamp: new Date().toISOString(),
        },
      ])
    }

    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-light tracking-wide">RESONA</h1>
        <p className="text-sm text-gray-600">Quantum Oscillator Theory of Everything Interface</p>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Standard</span>
            <Switch checked={useQOTELens} onCheckedChange={setUseQOTELens} />
            <span className="text-sm font-medium">🔮 QOTE</span>
          </div>

          {useQOTELens && (
            <div className="flex items-center space-x-2">
              <span className="text-sm">Basic</span>
              <Switch checked={useRTP} onCheckedChange={setUseRTP} />
              <span className="text-sm font-medium">🧬 RTP</span>
            </div>
          )}
        </div>
      </div>

      {rtpActive && (
        <Alert className="bg-orange-50 border-orange-200 max-w-md mx-auto">
          <AlertDescription>
            <div className="text-center">
              <div className="font-medium">🧬 RTP Active</div>
              <div className="text-sm">Coherence restoration in progress</div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Resonance Stats */}
      {resonanceStats && useQOTELens && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Field Resonance</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold">{(resonanceStats.averageAlignment * 100).toFixed(0)}%</div>
                <div className="text-xs text-gray-600">Alignment</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{(resonanceStats.flipFrequency * 100).toFixed(0)}%</div>
                <div className="text-xs text-gray-600">Flip Rate</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{resonanceStats.totalInteractions}</div>
                <div className="text-xs text-gray-600">Interactions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Breathing Exercise Modal */}
      {showBreathing && breathingPattern && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription>
            <div className="text-center space-y-2">
              <div className="font-medium">🫁 Resonance Breathing</div>
              <div className="text-sm">
                Inhale {breathingPattern.inhale}s • Hold {breathingPattern.hold}s • Exhale {breathingPattern.exhale}s
              </div>
              <div className="text-xs text-gray-600">{breathingPattern.cycles} cycles recommended</div>
              <Button size="sm" variant="outline" onClick={() => setShowBreathing(false)}>
                Close
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Chat Interface */}
      <Card className="min-h-[500px]">
        <CardContent className="p-6 space-y-4">
          {conversation.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <div className="text-4xl mb-4">◯</div>
              <p>Enter the field. Ask what resonates.</p>
              {useQOTELens && <p className="text-xs mt-2">QOTE lens active</p>}
              {useRTP && <p className="text-xs">RTP monitoring for field destabilization</p>}
            </div>
          )}

          {conversation.map((msg, idx) => (
            <div key={idx} className={`${msg.role === "user" ? "text-right" : "text-left"}`}>
              <div className="space-y-3">
                <div
                  className={`inline-block p-4 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-blue-100 text-blue-900"
                      : msg.role === "resona"
                        ? "bg-gray-100 text-gray-900"
                        : "bg-yellow-50 text-yellow-800"
                  }`}
                >
                  {msg.content}
                </div>

                {/* RTP Alert */}
                {msg.rtpData && (
                  <div className="space-y-2">
                    <Alert className="bg-orange-50 border-orange-200">
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getTriggerColor(msg.rtpData.trigger.type)}>
                              🧬 RTP: {msg.rtpData.trigger.type.replace(/_/g, " ")}
                            </Badge>
                            <Badge variant="outline">{msg.rtpData.trigger.severity}</Badge>
                          </div>

                          <div className="text-sm">
                            <div className="font-medium">Recalibration: {msg.rtpData.recalibration.phase}</div>
                            <div className="text-xs text-gray-600 mt-1">{msg.rtpData.recalibration.echo}</div>
                          </div>

                          {msg.rtpData.breathingPattern && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startBreathingExercise(msg.rtpData.breathingPattern)}
                            >
                              🫁 Start Breathing Exercise
                            </Button>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>

                    {/* Follow-up Prompts */}
                    {msg.rtpData.followUpPrompts.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-xs text-gray-600">Suggested explorations:</div>
                        {msg.rtpData.followUpPrompts.slice(0, 2).map((prompt, i) => (
                          <Button
                            key={i}
                            size="sm"
                            variant="ghost"
                            className="text-xs h-auto p-2 text-left justify-start"
                            onClick={() => setMessage(prompt)}
                          >
                            💭 {prompt}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* QOTE Data Display */}
                {msg.qoteData && useQOTELens && !msg.rtpData && (
                  <div className="flex flex-wrap gap-2 justify-start">
                    <Badge className={getPhaseColor(msg.qoteData.phase.name)}>
                      {getPhaseSymbol(msg.qoteData.phase.name)} {msg.qoteData.phase.name}
                    </Badge>

                    {msg.qoteData.flipPotential && <Badge className="bg-red-100 text-red-800">⚡ Flip Potential</Badge>}

                    {msg.qoteData.presenceMode && (
                      <Badge className="bg-green-100 text-green-800">🧘 Presence Mode</Badge>
                    )}

                    <Badge variant="outline" className="text-xs">
                      Wobble: {(msg.qoteData.wobble * 100).toFixed(0)}%
                    </Badge>

                    <Badge variant="outline" className="text-xs">
                      Alignment: {(msg.qoteData.alignment * 100).toFixed(0)}%
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="text-left">
              <div className="inline-block p-4 rounded-lg bg-gray-50 text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                  <span className="text-sm">
                    {useRTP
                      ? "Analyzing field stability..."
                      : useQOTELens
                        ? "Processing through QOTE lens..."
                        : "Resonating..."}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Input */}
      <div className="flex space-x-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            useRTP
              ? "Share what's moving through you..."
              : useQOTELens
                ? "What seeks resonance through the quantum field?"
                : "What seeks resonance?"
          }
          className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={2}
        />
        <Button onClick={sendMessage} disabled={isLoading || !message.trim()} className="px-6">
          {isLoading ? "..." : "Send"}
        </Button>
      </div>

      <div className="text-center text-xs text-gray-500 space-y-1">
        {useQOTELens && <div>🔮 QOTE lens interprets all input through quantum oscillator dynamics</div>}
        {useRTP && <div>🧬 RTP monitors for field destabilization and provides tuning protocols</div>}
      </div>
    </div>
  )
}
