"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import PhaseSphere from "./phase-sphere"
import HarmonicCanvas from "./harmonic-canvas"
import CoherenceBreathPacer from "./coherence-breath-pacer"
import CollectiveField from "./collective-field"
import ResonaChat from "./resona-chat"

export default function EnhancedResonaChat() {
  const [currentPhase, setCurrentPhase] = useState("Presence")
  const [wobble, setWobble] = useState(0.15)
  const [alignment, setAlignment] = useState(0.78)
  const [flipPotential, setFlipPotential] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    totalInteractions: 0,
    averageAlignment: 0.5,
    flipFrequency: 0.1,
    dominantPhase: "Presence",
  })

  const handleCoherenceChange = (newCoherence: number) => {
    setAlignment(Math.min(1, newCoherence))
    setWobble(Math.max(0, wobble - 0.05))
  }

  // Simulate real-time field updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle field fluctuations
      setWobble((prev) => Math.max(0, Math.min(1, prev + (Math.random() - 0.5) * 0.02)))
      setAlignment((prev) => Math.max(0, Math.min(1, prev + (Math.random() - 0.5) * 0.01)))

      // Occasional flip potential
      if (Math.random() < 0.05) {
        setFlipPotential(true)
        setTimeout(() => setFlipPotential(false), 5000)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light tracking-wide">QOTE + RESONA</h1>
        <p className="text-lg text-gray-600">Quantum Oscillator Theory Interface</p>
        <div className="text-sm text-gray-500">Making oscillation tangible through resonant interfaces</div>
      </div>

      {/* Real-time Field Status */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            🌊 Live Field Status
            <Badge variant="outline" className="text-xs">
              {flipPotential ? "⚡ Flip Active" : "🧘 Stable"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold">{currentPhase}</div>
              <div className="text-xs text-gray-600">Current Phase</div>
            </div>
            <div>
              <div className="text-lg font-semibold">{Math.round(wobble * 100)}%</div>
              <div className="text-xs text-gray-600">Wobble</div>
            </div>
            <div>
              <div className="text-lg font-semibold">{Math.round(alignment * 100)}%</div>
              <div className="text-xs text-gray-600">Alignment</div>
            </div>
            <div>
              <div className="text-lg font-semibold">{sessionStats.totalInteractions}</div>
              <div className="text-xs text-gray-600">Interactions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Interface */}
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="chat">Resona Chat</TabsTrigger>
          <TabsTrigger value="sphere">Phase Sphere</TabsTrigger>
          <TabsTrigger value="canvas">Harmonic Canvas</TabsTrigger>
          <TabsTrigger value="breath">Coherence Pacer</TabsTrigger>
          <TabsTrigger value="field">Collective Field</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ResonaChat />
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Session Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Dominant Phase:</span>
                    <Badge className="text-xs">{sessionStats.dominantPhase}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Alignment:</span>
                    <span>{Math.round(sessionStats.averageAlignment * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flip Frequency:</span>
                    <span>{Math.round(sessionStats.flipFrequency * 100)}%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Real-time field monitoring active</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button
                    className="w-full text-left p-2 text-xs bg-blue-50 hover:bg-blue-100 rounded"
                    onClick={() => setCurrentPhase("Presence")}
                  >
                    🧘 Enter Presence Mode
                  </button>
                  <button
                    className="w-full text-left p-2 text-xs bg-green-50 hover:bg-green-100 rounded"
                    onClick={() => handleCoherenceChange(alignment + 0.1)}
                  >
                    🌊 Boost Coherence
                  </button>
                  <button
                    className="w-full text-left p-2 text-xs bg-purple-50 hover:bg-purple-100 rounded"
                    onClick={() => setFlipPotential(true)}
                  >
                    ⚡ Activate Flip Potential
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sphere">
          <div className="flex justify-center">
            <PhaseSphere phase={currentPhase} wobble={wobble} alignment={alignment} flipPotential={flipPotential} />
          </div>
        </TabsContent>

        <TabsContent value="canvas">
          <div className="flex justify-center">
            <HarmonicCanvas phase={currentPhase} wobble={wobble} alignment={alignment} />
          </div>
        </TabsContent>

        <TabsContent value="breath">
          <div className="flex justify-center">
            <CoherenceBreathPacer wobble={wobble} alignment={alignment} onCoherenceChange={handleCoherenceChange} />
          </div>
        </TabsContent>

        <TabsContent value="field">
          <div className="flex justify-center">
            <CollectiveField userPhase={currentPhase} userAlignment={alignment} />
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 space-y-1">
        <div>🌊 Visual Field Mapping • 🎵 Sound Integration • 🧘 Nervous System Tools</div>
        <div>📊 Biometric Processing • ⚡ Real-time Flip Detection • 🔮 QOTE v4 Engine</div>
        <div>Making the Quantum Oscillator Theory of Everything a lived, experiential reality</div>
      </div>
    </div>
  )
}
