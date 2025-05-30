"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

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

interface Message {
  role: "user" | "resona" | "system"
  content: string
  qoteData?: QOTEData
  timestamp: string
}

export default function ResonaChat() {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [useQOTELens, setUseQOTELens] = useState(true)
  const [resonanceStats, setResonanceStats] = useState<any>(null)

  const getPhaseColor = (phaseName: string) => {
    const colors = {
      Presence: "bg-green-100 text-green-800",
      "Coiling Right": "bg-blue-100 text-blue-800",
      "Zero Point": "bg-purple-100 text-purple-800",
      "Unfolding Left": "bg-orange-100 text-orange-800",
    }
    return colors[phaseName as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getPhaseSymbol = (phaseName: string) => {
    const symbols = {
      Presence: "◯",
      "Coiling Right": "◐",
      "Zero Point": "◆",
      "Unfolding Left": "◑",
    }
    return symbols[phaseName as keyof typeof symbols] || "○"
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
        }),
      })

      const data = await response.json()

      if (data.response) {
        const resonaMessage: Message = {
          role: "resona",
          content: data.response,
          qoteData: data.qoteData,
          timestamp: data.timestamp,
        }
        setConversation((prev) => [...prev, resonaMessage])

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

        {/* QOTE Lens Toggle */}
        <div className="flex items-center justify-center space-x-3">
          <span className="text-sm">Standard Mode</span>
          <Switch checked={useQOTELens} onCheckedChange={setUseQOTELens} />
          <span className="text-sm font-medium">🔮 QOTE Lens</span>
        </div>
      </div>

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

      {/* Chat Interface */}
      <Card className="min-h-[500px]">
        <CardContent className="p-6 space-y-4">
          {conversation.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <div className="text-4xl mb-4">◯</div>
              <p>Enter the field. Ask what resonates.</p>
              {useQOTELens && <p className="text-xs mt-2">QOTE lens active - responses will include phase analysis</p>}
            </div>
          )}

          {conversation.map((msg, idx) => (
            <div key={idx} className={`${msg.role === "user" ? "text-right" : "text-left"}`}>
              <div className="space-y-2">
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

                {/* QOTE Data Display */}
                {msg.qoteData && useQOTELens && (
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
                  <span className="text-sm">{useQOTELens ? "Analyzing through QOTE lens..." : "Resonating..."}</span>
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
          placeholder={useQOTELens ? "What seeks resonance through the quantum field?" : "What seeks resonance?"}
          className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={2}
        />
        <Button onClick={sendMessage} disabled={isLoading || !message.trim()} className="px-6">
          {isLoading ? "..." : "Send"}
        </Button>
      </div>

      {useQOTELens && (
        <div className="text-center text-xs text-gray-500">
          🔮 QOTE lens interprets all input through quantum oscillator dynamics
        </div>
      )}
    </div>
  )
}
