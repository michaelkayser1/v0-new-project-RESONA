"use client"

import { useEffect, useRef } from "react"

export function CoherenceWaveform({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener("resize", resize)

    let time = 0

    const draw = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      ctx.clearRect(0, 0, w, h)

      time += 0.008

      // Phase relationship cycles between coherence and drift
      // Coherence = waves in sync, Drift = waves diverge
      const coherenceCycle = Math.sin(time * 0.3) * 0.5 + 0.5 // 0 to 1
      const phaseOffset = (1 - coherenceCycle) * Math.PI * 0.8

      const centerY = h * 0.5
      const amplitude = h * 0.18

      // Draw multiple wave layers for depth
      for (let layer = 0; layer < 3; layer++) {
        const layerAlpha = [0.08, 0.15, 0.06][layer]
        const layerOffset = [0, 0, Math.PI * 0.5][layer]
        const layerAmp = amplitude * [1.2, 1, 0.7][layer]

        // Wave 1 — teal
        ctx.beginPath()
        ctx.strokeStyle = `hsla(168, 71%, 51%, ${layerAlpha + coherenceCycle * 0.15})`
        ctx.lineWidth = layer === 1 ? 2 : 1
        for (let x = 0; x < w; x++) {
          const progress = x / w
          const y =
            centerY +
            Math.sin(progress * Math.PI * 3 + time * 1.5 + layerOffset) * layerAmp * (0.5 + progress * 0.5)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Wave 2 — teal shifted
        ctx.beginPath()
        ctx.strokeStyle = `hsla(168, 71%, 65%, ${layerAlpha + coherenceCycle * 0.12})`
        ctx.lineWidth = layer === 1 ? 2 : 1
        for (let x = 0; x < w; x++) {
          const progress = x / w
          const y =
            centerY +
            Math.sin(progress * Math.PI * 3 + time * 1.5 + phaseOffset + layerOffset) *
              layerAmp *
              (0.5 + progress * 0.5)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Glow at convergence points when in coherence
      if (coherenceCycle > 0.6) {
        const glowIntensity = (coherenceCycle - 0.6) / 0.4
        for (let x = 0; x < w; x += 4) {
          const progress = x / w
          const y1 =
            centerY + Math.sin(progress * Math.PI * 3 + time * 1.5) * amplitude * (0.5 + progress * 0.5)
          const y2 =
            centerY +
            Math.sin(progress * Math.PI * 3 + time * 1.5 + phaseOffset) * amplitude * (0.5 + progress * 0.5)
          const distance = Math.abs(y1 - y2)

          if (distance < 8) {
            const proximity = 1 - distance / 8
            const midY = (y1 + y2) / 2
            const gradient = ctx.createRadialGradient(x, midY, 0, x, midY, 12)
            gradient.addColorStop(0, `hsla(168, 71%, 51%, ${proximity * glowIntensity * 0.3})`)
            gradient.addColorStop(1, "hsla(168, 71%, 51%, 0)")
            ctx.fillStyle = gradient
            ctx.fillRect(x - 12, midY - 12, 24, 24)
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  )
}
