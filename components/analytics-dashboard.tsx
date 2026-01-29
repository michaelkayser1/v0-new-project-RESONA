"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, TrendingUp, Users, Zap, Brain, Activity } from "lucide-react"

interface AnalyticsData {
  globalStats: any
  fieldAnalytics: any
  insights?: any
}

export default function AnalyticsDashboard({ sessionId }: { sessionId?: string }) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"global" | "fields" | "personal">("global")

  useEffect(() => {
    fetchAnalytics()
  }, [sessionId])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)

      // Fetch global analytics
      const globalResponse = await fetch("/api/resona-enhanced?action=analytics")
      const globalData = await globalResponse.json()

      let personalData = null
      if (sessionId) {
        // Fetch personal insights
        const personalResponse = await fetch(`/api/resona-enhanced?action=insights&sessionId=${sessionId}`)
        personalData = await personalResponse.json()
      }

      setAnalytics({
        globalStats: globalData.globalStats,
        fieldAnalytics: globalData.fieldAnalytics,
        insights: personalData?.insights,
      })
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Loading field analytics...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analytics) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Analytics temporarily unavailable</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { globalStats, fieldAnalytics, insights } = analytics

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === "global" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("global")}
          className="flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Global Field
        </Button>
        <Button
          variant={activeTab === "fields" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("fields")}
          className="flex items-center gap-2"
        >
          <BarChart className="w-4 h-4" />
          Resonance Fields
        </Button>
        {insights && (
          <Button
            variant={activeTab === "personal" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("personal")}
            className="flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            Your Patterns
          </Button>
        )}
      </div>

      {/* Global Statistics */}
      {activeTab === "global" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />
                QOTE Analyses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{globalStats.qote_analyses || 0}</div>
              <p className="text-xs text-gray-600">Total field interpretations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                RTP Triggers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{globalStats.rtp_triggers || 0}</div>
              <p className="text-xs text-gray-600">Coherence restorations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{globalStats.sessions_created || 0}</div>
              <p className="text-xs text-gray-600">Unique field connections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" />
                Field Coherence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {globalStats.qote_analyses
                  ? Math.round(
                      ((globalStats.qote_analyses - globalStats.rtp_triggers) / globalStats.qote_analyses) * 100,
                    )
                  : 0}
                %
              </div>
              <p className="text-xs text-gray-600">Stable interactions</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Field Analytics */}
      {activeTab === "fields" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resonance Field Activity (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(fieldAnalytics).map(([field, data]: [string, any]) => {
                  const totalActivations = data.reduce((sum: number, day: any) => sum + day.count, 0)
                  const fieldColors = {
                    business: "bg-blue-100 text-blue-800",
                    healing: "bg-green-100 text-green-800",
                    connection: "bg-purple-100 text-purple-800",
                    ai: "bg-orange-100 text-orange-800",
                    art: "bg-indigo-100 text-indigo-800",
                    memory: "bg-yellow-100 text-yellow-800",
                  }

                  return (
                    <div key={field} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          className={fieldColors[field as keyof typeof fieldColors] || "bg-gray-100 text-gray-800"}
                        >
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </Badge>
                        <span className="text-sm font-medium">{totalActivations}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (totalActivations / Math.max(...Object.values(fieldAnalytics).map((d: any) => d.reduce((s: number, day: any) => s + day.count, 0)))) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Personal Insights */}
      {activeTab === "personal" && insights && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Resonance Pattern</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Average Alignment</div>
                  <div className="text-xl font-bold text-green-600">{(insights.avgAlignment * 100).toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Average Wobble</div>
                  <div className="text-xl font-bold text-orange-600">{(insights.avgWobble * 100).toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Flip Frequency</div>
                  <div className="text-xl font-bold text-purple-600">{(insights.flipFrequency * 100).toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Sessions</div>
                  <div className="text-xl font-bold text-blue-600">{insights.totalSessions}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Phase Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(insights.phaseDistribution).map(([phase, count]: [string, any]) => (
                  <div key={phase} className="flex items-center justify-between">
                    <span className="text-sm">{phase}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-400 to-blue-400"
                          style={{ width: `${(count / insights.totalSessions) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Refresh Button */}
      <div className="text-center">
        <Button variant="outline" onClick={fetchAnalytics} className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Refresh Field Data
        </Button>
      </div>
    </div>
  )
}
