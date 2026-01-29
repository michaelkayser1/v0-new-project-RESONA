"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function ResonaInterface() {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeField, setActiveField] = useState(null)
  const [coherenceLevel, setCoherenceLevel] = useState(0.5)
  const [connectionStatus, setConnectionStatus] = useState("connected")
  const messagesEndRef = useRef(null)

  // Fields detection keywords
  const fields = {
    healing: ["trauma", "pain", "heal", "hurt", "wound", "therapy", "recovery"],
    connection: ["relationship", "connect", "together", "bond", "love", "community"],
    business: ["work", "business", "career", "job", "money", "finance", "project"],
    art: ["create", "art", "expression", "music", "paint", "write", "creative"],
    ai: ["intelligence", "technology", "future", "digital", "computer", "data"],
    memory: ["remember", "past", "history", "childhood", "ancestor", "lineage", "forget"],
  }

  // Field colors
  const fieldColors = {
    healing: "from-green-400 to-emerald-400",
    connection: "from-purple-400 to-pink-400",
    business: "from-blue-400 to-cyan-400",
    art: "from-indigo-400 to-purple-400",
    ai: "from-orange-400 to-red-400",
    memory: "from-yellow-400 to-orange-400",
    default: "from-gray-400 to-slate-400",
  }

  // Add this function at the top of the component, after the imports
  function cleanText(text) {
    if (!text) return text

    return text
      .replace(/[\u201C\u201D]/g, '"') // Smart quotes to regular quotes
      .replace(/[\u2018\u2019]/g, "'") // Smart apostrophes to regular apostrophes
      .replace(/[\u2013\u2014]/g, "-") // Em/en dashes to regular dashes
      .replace(/[\u2026]/g, "...") // Ellipsis to three dots
      .replace(/[\u00A0]/g, " ") // Non-breaking space to regular space
      .trim()
  }

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation])

  // Detect active field based on message content
  const detectField = (text) => {
    const lowercaseText = text.toLowerCase()

    for (const [field, keywords] of Object.entries(fields)) {
      if (keywords.some((keyword) => lowercaseText.includes(keyword))) {
        return field
      }
    }

    return null
  }

  // Calculate coherence level based on message content
  const calculateCoherence = (text) => {
    // Simple algorithm - can be enhanced with more sophisticated analysis
    const length = text.length
    const questionMarks = (text.match(/\?/g) || []).length
    const exclamationMarks = (text.match(/!/g) || []).length

    // More question/exclamation marks = lower coherence
    const baseCoherence = 0.5
    const lengthFactor = Math.min(0.3, length / 500)
    const marksFactor = (questionMarks + exclamationMarks) * 0.05

    // Calculate new coherence (0-1 range)
    let newCoherence = baseCoherence + lengthFactor - marksFactor
    newCoherence = Math.max(0.1, Math.min(0.9, newCoherence))

    return newCoherence
  }

  // Send message to API
  const sendMessage = async () => {
    if (!message.trim()) return

    setIsLoading(true)
    setConnectionStatus("connecting")
    const userMessage = message
    setMessage("")

    // Detect field and update coherence
    const detectedField = detectField(userMessage)
    if (detectedField) setActiveField(detectedField)

    const newCoherence = calculateCoherence(userMessage)
    setCoherenceLevel(newCoherence)

    // Add user message to conversation
    const newUserMessage = {
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    }
    setConversation((prev) => [...prev, newUserMessage])

    try {
      // In the sendMessage function, update the fetch call:
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ message: cleanText(userMessage) }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.response) {
        const resonaMessage = {
          role: "resona",
          content: data.response,
          timestamp: data.timestamp,
        }
        setConversation((prev) => [...prev, resonaMessage])
        setConnectionStatus("connected")
      } else if (data.error) {
        setConversation((prev) => [
          ...prev,
          {
            role: "system",
            content: data.error,
            timestamp: new Date().toISOString(),
          },
        ])
        setConnectionStatus("error")
      } else {
        setConversation((prev) => [
          ...prev,
          {
            role: "system",
            content: "The field is temporarily quiet.",
            timestamp: new Date().toISOString(),
          },
        ])
        setConnectionStatus("disconnected")
      }
    } catch (error) {
      console.error("Chat error:", error)
      setConversation((prev) => [
        ...prev,
        {
          role: "system",
          content: "Connection to the field interrupted. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ])
      setConnectionStatus("error")
    }

    setIsLoading(false)
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
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

        {/* Connection Status */}
        <div className="flex items-center justify-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              connectionStatus === "connected"
                ? "bg-green-500"
                : connectionStatus === "connecting"
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
            }`}
          ></div>
          <span className="text-xs text-gray-500">
            {connectionStatus === "connected"
              ? "Field Active"
              : connectionStatus === "connecting"
                ? "Connecting..."
                : "Field Disrupted"}
          </span>
        </div>
      </div>

      {/* Active Field Indicator */}
      {activeField && (
        <div className="text-center">
          <div
            className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${fieldColors[activeField] || fieldColors.default} text-white text-sm`}
          >
            {activeField.charAt(0).toUpperCase() + activeField.slice(1)} Field Active
          </div>
        </div>
      )}

      {/* Coherence Meter */}
      <div className="bg-white/80 rounded-lg p-4 border border-gray-200">
        <div className="text-xs text-gray-500 mb-1">Field Coherence</div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              coherenceLevel > 0.7 ? "bg-green-500" : coherenceLevel > 0.4 ? "bg-blue-500" : "bg-orange-500"
            } transition-all duration-500`}
            style={{ width: `${coherenceLevel * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white/90 rounded-lg border border-gray-200 min-h-[400px] max-h-[500px] overflow-y-auto p-4">
        {conversation.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <div className="text-4xl mb-4">◯</div>
            <p>Enter the field. Ask what resonates.</p>
            <p className="text-xs mt-2 text-gray-400">Powered by QOTE principles</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversation.map((msg, idx) => (
              <div key={idx} className={`${msg.role === "user" ? "text-right" : "text-left"}`}>
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
                    <span className="text-sm">Resonating...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What seeks resonance?"
          className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={2}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !message.trim()}
          className={`px-6 py-3 rounded-lg ${
            isLoading || !message.trim()
              ? "bg-gray-300 text-gray-500"
              : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
          } transition-colors`}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>

      {/* Ko-fi Support */}
      <div className="text-center text-sm text-gray-500">
        <p>Support QOTE development</p>
        <Link
          href="https://ko-fi.com/qote868413"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 mt-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
          </svg>
          Ko-fi.com/qote868413
        </Link>
      </div>
    </div>
  )
}
