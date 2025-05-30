"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ResonaChat() {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<Array<{ role: string; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim()) return

    setIsLoading(true)
    const userMessage = message
    setMessage("")

    // Add user message to conversation
    setConversation((prev) => [...prev, { role: "user", content: userMessage }])

    try {
      const response = await fetch("/api/resona-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      if (data.response) {
        setConversation((prev) => [...prev, { role: "resona", content: data.response }])
      } else {
        setConversation((prev) => [...prev, { role: "system", content: "The field is temporarily quiet." }])
      }
    } catch (error) {
      setConversation((prev) => [...prev, { role: "system", content: "Connection to the field interrupted." }])
    }

    setIsLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-light">Resona</h1>
        <p className="text-sm text-gray-600">Enter the field. Ask what resonates.</p>
      </div>

      <Card className="min-h-[400px]">
        <CardContent className="p-6 space-y-4">
          {conversation.map((msg, idx) => (
            <div key={idx} className={`${msg.role === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block p-3 rounded-lg max-w-[80%] ${
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
              <div className="inline-block p-3 rounded-lg bg-gray-50 text-gray-500">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="What seeks resonance?"
          className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={sendMessage} disabled={isLoading || !message.trim()}>
          Send
        </Button>
      </div>
    </div>
  )
}
