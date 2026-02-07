"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DashboardData {
  dailyData: any[]
  totals: {
    totalEvents: number
    uniqueSessions: number
    conversationStarts: number
    messagesSent: number
    fieldLayerViews: Record<string, number>
    promptClicks: Record<string, number>
  }
  insights: {
    averageMessagesPerConversation: string
    mostPopularLayer: string
    mostClickedPrompt: string
    conversionRate: string
  }
  generatedAt: string
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/analytics/dashboard")
      if (!response.ok) throw new Error("Failed to fetch analytics")
      const dashboardData = await response.json()
      setData(dashboardData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">Loading analytics...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-red-400">Error: {error}</div>
          <div className="text-center mt-4">
            <Button onClick={fetchData}>Retry</Button>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-light">QOTE + Resona Analytics</h1>
          <div className="text-sm text-gray-400">Last updated: {new Date(data.generatedAt).toLocaleString()}</div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Total Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{data.totals.uniqueSessions}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Conversations Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{data.totals.conversationStarts}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Messages Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{data.totals.messagesSent}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">{data.insights.conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Most Popular Layer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold text-blue-400">{data.insights.mostPopularLayer}</div>
              <div className="text-sm text-gray-400 mt-2">
                {data.totals.fieldLayerViews[data.insights.mostPopularLayer] || 0} views
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Avg Messages/Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold text-green-400">{data.insights.averageMessagesPerConversation}</div>
              <div className="text-sm text-gray-400 mt-2">Indicates engagement depth</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Top Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold text-purple-400 line-clamp-2">
                {data.insights.mostClickedPrompt}
              </div>
              <div className="text-sm text-gray-400 mt-2">
                {data.totals.promptClicks[data.insights.mostClickedPrompt] || 0} clicks
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Field Layer Views */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Field Layer Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(data.totals.fieldLayerViews)
                .sort(([, a], [, b]) => b - a)
                .map(([layer, views]) => (
                  <div key={layer} className="flex justify-between items-center">
                    <span className="text-gray-300">{layer}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${(views / Math.max(...Object.values(data.totals.fieldLayerViews))) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-8">{views}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Activity */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg">Daily Activity (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.dailyData.slice(-7).map((day) => (
                <div key={day.date} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{new Date(day.date).toLocaleDateString()}</span>
                  <div className="flex space-x-4 text-gray-400">
                    <span>Sessions: {day.uniqueSessions.length}</span>
                    <span>Events: {day.totalEvents}</span>
                    <span>Conversations: {day.conversationStarts}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={fetchData} variant="outline" className="border-gray-600">
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  )
}
