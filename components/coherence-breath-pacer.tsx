"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface CoherenceBreathPacerProps {
  wobble: number
  alignment: number
  onCoherenceChange?: (coherence: number) => void
}

export default function CoherenceBreathPacer({ wobble, alignment, onCoherenceChange }: CoherenceBreathPacerProps) {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [cycleCount, setCycleCount] = useState(0)
  const [breathPattern, setBreathPattern] = useState({ inhale: 4, hold: 4, exhale: 6 })
  const intervalRef = useRef<NodeJS.Timeout>()
  const phaseTimeRef = useRef(0)

  // Adaptive algorithm based on wobble and alignment
  useEffect(() => {
    if (wobble > 0.7) {
      // High wobble: calming pattern
      setBreathPattern({ inhale: 4, hold: 6, exhale: 8 })
    } else if (alignment > 0.8) {
      // High alignment: coherent pattern
      setBreathPattern({ inhale: 5, hold: 5, exhale: 5 })
    } else {
      // Balanced pattern
      setBreathPattern({ inhale: 4, hold: 4, exhale: 6 })
    }
  }, [wobble, alignment])

  const startBreathing = () => {
    setIsActive(true)
    setCycleCount(0)
    setPhase("inhale")
    phaseTimeRef.current = 0

    intervalRef.current = setInterval(() => {
      phaseTimeRef.current += 1

      if (phase === "inhale" && phaseTimeRef.current >= breathPattern.inhale) {
        setPhase("hold")
        phaseTimeRef.current = 0
      } else if (phase === "hold" && phaseTimeRef.current >= breathPattern.hold) {
        setPhase("exhale")
        phaseTimeRef.current = 0
      } else if (phase === "exhale" && phaseTimeRef.current >= breathPattern.exhale) {
        setPhase("inhale")
        phaseTimeRef.current = 0
        setCycleCount((prev) => {
          const newCount = prev + 1
          // Calculate coherence improvement
          const coherenceGain = Math.min(0.1, newCount * 0.02)
          onCoherenceChange?.(alignment + coherenceGain)
          return newCount
        })
      }
    }, 1000)
  }

  const stopBreathing = () => {
    setIsActive(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const getPhaseInstruction = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
    }
  }

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale":
        return "bg-blue-500"
      case "hold":
        return "bg-purple-500"
      case "exhale":
        return "bg-green-500"
    }
  }

  const progress = isActive ? (phaseTimeRef.current / breathPattern[phase]) * 100 : 0

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Coherence Breath Pacer</h3>
        <p className="text-sm text-gray-600">
          Adaptive breathing pattern: {breathPattern.inhale}-{breathPattern.hold}-{breathPattern.exhale}
        </p>
      </div>

      {/* Visual Breath Guide */}
      <div className="relative w-48 h-48 mx-auto">
        <div
          className={`absolute inset-0 rounded-full transition-all duration-1000 ${getPhaseColor()} opacity-20`}
          style={{
            transform: `scale(${phase === "inhale" ? 1.2 : phase === "exhale" ? 0.8 : 1})`,
            transition: `transform ${breathPattern[phase]}s ease-in-out`,
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-light">{getPhaseInstruction()}</div>
            <div className="text-sm text-gray-500 mt-2">
              {Math.max(0, breathPattern[phase] - phaseTimeRef.current)}s
            </div>
          </div>
        </div>

        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="50%" cy="50%" r="90" fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle
            cx="50%"
            cy="50%"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
            className={phase === "inhale" ? "text-blue-500" : phase === "hold" ? "text-purple-500" : "text-green-500"}
            style={{ transition: "stroke-dashoffset 0.1s ease" }}
          />
        </svg>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex justify-center gap-4">
          <Button
            onClick={isActive ? stopBreathing : startBreathing}
            className={isActive ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}
          >
            {isActive ? "Stop" : "Start"} Breathing
          </Button>
        </div>

        {isActive && (
          <div className="text-sm text-gray-600">
            <div>Cycles completed: {cycleCount}</div>
            <div>Coherence building: {Math.min(100, cycleCount * 5)}%</div>
          </div>
        )}
      </div>
    </div>
  )
}
