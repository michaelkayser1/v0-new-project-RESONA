"use client"

import { useRef, useEffect, useState } from "react"

interface HarmonicCanvasProps {
  phase: string
  wobble: number
  alignment: number
}

export default function HarmonicCanvas({ phase, wobble, alignment }: HarmonicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })

  const getPhaseColor = (phaseName: string) => {
    const colors = {
      Presence: "#4a148c",
      "Coiling Right": "#8e24aa",
      "Zero Point": "#ffffff",
      "Unfolding Left": "#ffc107",
    }
    return colors[phaseName as keyof typeof colors] || "#666666"
  }

  const getBrushBehavior = (phase: string, wobble: number, alignment: number) => {
    const baseSize = 5 + alignment * 10
    const wobbleEffect = wobble * 20

    return {
      size: baseSize + Math.random() * wobbleEffect,
      opacity: alignment * 0.8 + 0.2,
      flow: phase === "Coiling Right" ? "inward" : phase === "Unfolding Left" ? "outward" : "neutral",
    }
  }

  const drawWithPhysics = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const behavior = getBrushBehavior(phase, wobble, alignment)

    ctx.globalAlpha = behavior.opacity
    ctx.fillStyle = getPhaseColor(phase)

    if (behavior.flow === "inward") {
      // Coiling Right: Spiral inward
      const angle = Math.atan2(y - 200, x - 200)
      const spiralX = x + Math.cos(angle + Date.now() * 0.01) * wobble * 10
      const spiralY = y + Math.sin(angle + Date.now() * 0.01) * wobble * 10
      ctx.beginPath()
      ctx.arc(spiralX, spiralY, behavior.size, 0, Math.PI * 2)
      ctx.fill()
    } else if (behavior.flow === "outward") {
      // Unfolding Left: Radiate outward
      for (let i = 0; i < 5; i++) {
        const angle = ((Math.PI * 2) / 5) * i
        const radiateX = x + Math.cos(angle) * alignment * 20
        const radiateY = y + Math.sin(angle) * alignment * 20
        ctx.beginPath()
        ctx.arc(radiateX, radiateY, behavior.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }
    } else {
      // Neutral: Standard brush
      ctx.beginPath()
      ctx.arc(x, y, behavior.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleMouseDown = (e: MouseEvent) => {
      setIsDrawing(true)
      const rect = canvas.getBoundingClientRect()
      setLastPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return

      const rect = canvas.getBoundingClientRect()
      const currentPos = { x: e.clientX - rect.left, y: e.clientY - rect.top }

      drawWithPhysics(ctx, currentPos.x, currentPos.y)
      setLastPos(currentPos)
    }

    const handleMouseUp = () => {
      setIsDrawing(false)
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)
    }
  }, [phase, wobble, alignment, isDrawing])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium">Harmonic Canvas</h3>
        <p className="text-sm text-gray-600">Your brush responds to your oscillatory state</p>
      </div>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border border-gray-200 rounded-lg cursor-crosshair bg-black"
      />

      <div className="flex justify-between items-center">
        <button onClick={clearCanvas} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm">
          Clear Canvas
        </button>
        <div className="text-xs text-gray-500">
          {phase === "Coiling Right" && "Brush spirals inward"}
          {phase === "Unfolding Left" && "Brush radiates outward"}
          {phase === "Presence" && "Brush flows naturally"}
          {phase === "Zero Point" && "Brush creates pure form"}
        </div>
      </div>
    </div>
  )
}
