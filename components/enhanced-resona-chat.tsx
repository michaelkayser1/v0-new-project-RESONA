"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnalyticsDashboard from "./analytics-dashboard"
import { ArrowLeft, Database, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Message {
  role: "user" | "resona" | "system"
  content: string
  qoteData?: any
  rtpData?: any
  timestamp: string
}

export default function EnhancedResonaChat() {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [useQOTELens, setUseQOTELens] = useState(true)
  const [useRTP, setUseRTP] = useState(true)
  const [globalStats, setGlobalStats] = useState<any>(null)
  const [conversationLength, setConversationLength] = useState(0)

  // Generate session ID on component mount
  useEffect(() => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
  }, [])

  const sendMessage = async () => {
    if (!message.trim() || !sessionId) return

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
      const response = await fetch("/api/resona-enhanced", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
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

        // Update stats
        setGlobalStats(data.globalStats)
        setConversationLength(data.conversationLength)
      } else {
        setConversation((prev) => [
          ...prev,
          {
            role: "system",
            content: data.error || "The field is temporarily quiet.",
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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to QOTE
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600">Redis Enhanced</span>
        </div>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <span>💬</span>
            Resona Chat
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Field Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-light tracking-wide">RESONA</h1>
            <p className="text-sm text-gray-600">Enhanced with Persistent Memory & Analytics</p>

            {/* Session Info */}
            {sessionId && (
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <span>Session: {sessionId.slice(-8)}</span>
                {conversationLength > 0 && <span>Messages: {conversationLength}</span>}
                {globalStats && <span>Global Analyses: {globalStats.totalAnalyses}</span>}
              </div>
            )}

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

          {/* Global Stats Display */}
          {globalStats && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <span>🧠 Total Analyses: {globalStats.totalAnalyses}</span>
                  <span>⚡ RTP Triggers: {globalStats.totalTriggers}</span>
                  <span>👥 Active Sessions: {globalStats.totalSessions}</span>
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
                  <p>Enter the enhanced field. Your patterns are remembered.</p>
                  <div className="text-xs mt-2 space-y-1">
                    {useQOTELens && <div>🔮 QOTE lens active with persistent analysis</div>}
                    {useRTP && <div>🧬 RTP monitoring with pattern recognition</div>}
                    <div>💾 Conversation history preserved</div>
                  </div>
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

                    {/* Enhanced QOTE Data Display */}
                    {msg.qoteData && useQOTELens && (
                      <div className="flex flex-wrap gap-2 justify-start">
                        <Badge className="bg-purple-100 text-purple-800">📊 Phase: {msg.qoteData.phase.name}</Badge>
                        <Badge variant="outline" className="text-xs">
                          Wobble: {(msg.qoteData.wobble * 100).toFixed(0)}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Alignment: {(msg.qoteData.alignment * 100).toFixed(0)}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Resonance: {(msg.qoteData.resonanceScore * 100).toFixed(0)}%
                        </Badge>
                        {msg.qoteData.flipPotential && (
                          <Badge className="bg-red-100 text-red-800">⚡ Flip Potential</Badge>
                        )}
                      </div>
                    )}

                    {/* RTP Data Display */}
                    {msg.rtpData && (
                      <Alert className="bg-orange-50 border-orange-200">
                        <AlertDescription>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-orange-100 text-orange-800">
                                🧬 RTP: {msg.rtpData.trigger.type.replace(/_/g, " ")}
                              </Badge>
                              <Badge variant="outline">{msg.rtpData.trigger.severity}</Badge>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium">Recalibration: {msg.rtpData.recalibration.phase}</div>
                              <div className="text-xs text-gray-600 mt-1">{msg.rtpData.recalibration.echo}</div>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
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
                      <span className="text-sm">Processing with enhanced context...</span>
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
              placeholder="Share what's moving through your field... (Enhanced with memory)"
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
            />
            <Button onClick={sendMessage} disabled={isLoading || !message.trim()} className="px-6">
              {isLoading ? "..." : "Send"}
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500 space-y-1">
            <div>💾 Enhanced with Redis persistence and pattern recognition</div>
            {useQOTELens && <div>🔮 QOTE lens with conversation context</div>}
            {useRTP && <div>🧬 RTP with historical pattern analysis</div>}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard sessionId={sessionId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
