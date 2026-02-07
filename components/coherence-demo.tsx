"use client"

import { useEffect, useRef } from "react"

export function CoherenceDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scoreRef = useRef<HTMLSpanElement>(null)
  const stateRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<HTMLDivElement>(null)
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

    let time = 0

    const draw = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)
      time += 0.012

      const rawScore = 0.618 + Math.sin(time * 0.4) * 0.08 + Math.sin(time * 1.1) * 0.03
      const score = Math.max(0.5, Math.min(0.75, rawScore))
      const inCorridor = score >= 0.618 && score <= 0.667

      // Update DOM refs directly instead of React state
      if (scoreRef.current) scoreRef.current.textContent = score.toFixed(3)
      if (stateRef.current) {
        stateRef.current.textContent = inCorridor ? "COHERENT" : "DRIFTING"
        stateRef.current.className = `text-xs font-mono ${inCorridor ? "text-primary" : "gold-text"}`
      }
      if (dotRef.current) {
        dotRef.current.className = `w-2 h-2 rounded-full ${inCorridor ? "bg-primary animate-pulse" : "bg-accent"}`
      }
      if (scoreRef.current) {
        scoreRef.current.className = `text-lg font-mono font-semibold ${inCorridor ? "text-primary" : "gold-text"}`
      }
      if (barsRef.current) {
        const bars = barsRef.current.children
        for (let i = 0; i < bars.length; i++) {
          const thresholds = [0.66, 0.64, 0.62, 0.6]
          const el = bars[i] as HTMLElement
          el.className = `w-1.5 h-6 rounded-full ${score > thresholds[i] ? (i < 3 ? "bg-primary" : "bg-primary/50") : "bg-border"}`
        }
      }

      const centerY = h * 0.5
      const amp = h * 0.3

      // Background grid
      ctx.strokeStyle = "hsla(216, 30%, 30%, 0.15)"
      ctx.lineWidth = 0.5
      for (let y = 0; y < h; y += h / 6) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Golden corridor zone
      const corridorTop = centerY - amp * 0.15
      const corridorBottom = centerY + amp * 0.15
      ctx.fillStyle = "hsla(168, 71%, 51%, 0.05)"
      ctx.fillRect(0, corridorTop, w, corridorBottom - corridorTop)
      ctx.strokeStyle = "hsla(168, 71%, 51%, 0.2)"
      ctx.lineWidth = 0.5
      ctx.setLineDash([4, 6])
      ctx.beginPath()
      ctx.moveTo(0, corridorTop)
      ctx.lineTo(w, corridorTop)
      ctx.moveTo(0, corridorBottom)
      ctx.lineTo(w, corridorBottom)
      ctx.stroke()
      ctx.setLineDash([])

      // Main waveform
      ctx.beginPath()
      ctx.strokeStyle = inCorridor ? "hsl(168, 71%, 51%)" : "hsl(40, 55%, 55%)"
      ctx.lineWidth = 2
      ctx.shadowColor = inCorridor ? "hsla(168, 71%, 51%, 0.5)" : "hsla(40, 55%, 55%, 0.5)"
      ctx.shadowBlur = 8

      for (let x = 0; x < w; x++) {
        const p = x / w
        const noise = Math.sin(p * 20 + time * 3) * 2 * (1 - score)
        const y = centerY + Math.sin(p * Math.PI * 4 + time * 2) * amp * 0.3 * score + noise
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      // Cursor dot
      const cx = w * 0.92
      const cp = cx / w
      const cn = Math.sin(cp * 20 + time * 3) * 2 * (1 - score)
      const cy = centerY + Math.sin(cp * Math.PI * 4 + time * 2) * amp * 0.3 * score + cn

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8)
      g.addColorStop(0, "hsla(168, 71%, 51%, 0.9)")
      g.addColorStop(1, "hsla(168, 71%, 51%, 0)")
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "hsl(168, 71%, 51%)"
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fill()

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationRef.current)
  }, [])

  return (
    <div className="relative bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div ref={dotRef} className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Coherence Monitor</span>
        </div>
        <span ref={stateRef} className="text-xs font-mono text-primary">COHERENT</span>
      </div>

      {/* Canvas */}
      <div className="relative h-48 md:h-56">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1">
          <span className="text-[10px] font-mono text-primary/60">0.667</span>
          <span className="text-[10px] font-mono text-muted-foreground/40">golden corridor</span>
          <span className="text-[10px] font-mono text-primary/60">0.618</span>
        </div>
      </div>

      {/* Score bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/30">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Score</span>
            <p><span ref={scoreRef} className="text-lg font-mono font-semibold text-primary">0.640</span></p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Range</span>
            <p className="text-sm font-mono text-foreground/80">{"\u03C6\u207B\u00B9 \u2013 2/3"}</p>
          </div>
        </div>
        <div ref={barsRef} className="flex items-center gap-1.5">
          <div className="w-1.5 h-6 rounded-full bg-primary" />
          <div className="w-1.5 h-6 rounded-full bg-primary" />
          <div className="w-1.5 h-6 rounded-full bg-primary" />
          <div className="w-1.5 h-6 rounded-full bg-primary/50" />
        </div>
      </div>
    </div>
  )
}
