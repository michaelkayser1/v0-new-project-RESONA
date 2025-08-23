"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

  const handleCoherenceChange = (newCoherence: number) => {
    setAlignment(Math.min(1, newCoherence))
    setWobble(Math.max(0, wobble - 0.05))
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light tracking-wide">QOTE + RESONA</h1>
        <p className="text-lg text-gray-600">Quantum Oscillator Theory Interface</p>
        <div className="text-sm text-gray-500">Making oscillation tangible through resonant interfaces</div>
      </div>

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
                  <CardTitle className="text-sm">Current State</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Phase:</span>
                    <span className="font-medium">{currentPhase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wobble:</span>
                    <span>{Math.round(wobble * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alignment:</span>
                    <span>{Math.round(alignment * 100)}%</span>
                  </div>
                  {flipPotential && (
                    <div className="text-yellow-600 font-medium text-center">⚡ Flip Potential Active</div>
                  )}
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
        <div>Making the Quantum Oscillator Theory of Everything a lived, experiential reality</div>
      </div>
    </div>
  )
}
