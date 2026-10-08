"use client"

import type React from "react"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ChevronDown, Info, Pencil, RotateCcw, Wind } from "lucide-react"
import QOTEInfo from "./qote-info"
import { formatCount, formatPercent, toUnitMetric } from "@/lib/metrics"

type MetricSource = "calculated" | "default"

interface QOTEData {
  phase: {
    name: string
    energy?: number | null
    direction?: string
    wobble?: number | null
  }
  wobble?: number | null
  alignment?: number | null
  metricSources?: { wobble?: MetricSource; alignment?: MetricSource }
  flipPotential?: boolean
  resonanceScore?: number | null
  presenceMode?: boolean
}

interface ResonanceStats {
  averageAlignment?: number | null
  alignmentSamples?: number | null
  flipFrequency?: number | null
  totalInteractions?: number | null
}

interface RTPData {
  protocol: string
  trigger: {
    type: string
    severity: string
    indicators: string[]
  }
  phaseMirror: string
  truthHum: string
  flipSeed: string
  recalibration: {
    phase: string
    wobble: string
    direction: string
    echo: string
  }
  breathingPattern?: {
    inhale: number
    hold: number
    exhale: number
    cycles: number
  }
  followUpPrompts: string[]
}

interface Message {
  role: "user" | "resona" | "system"
  content: string
  qoteData?: QOTEData
  rtpData?: RTPData
  mode?: string
  model?: string
  timestamp: string
  retryText?: string
}

const MODE_LABELS: Record<string, string> = {
  identity: "About Resona",
  presence: "Presence",
  greeting: "Greeting",
  rtp: "RTP",
  qote: "QOTE lens",
  standard: "Standard",
}

const PHASE_STYLES: Record<string, string> = {
  Presence: "bg-emerald-100 text-emerald-900",
  "Coiling Right": "bg-sky-100 text-sky-900",
  "Zero Point": "bg-indigo-100 text-indigo-900",
  "Unfolding Left": "bg-amber-100 text-amber-900",
}

const TRIGGER_STYLES: Record<string, string> = {
  low_intent_high_wobble: "bg-amber-100 text-amber-900",
  emotional_entropy: "bg-red-100 text-red-900",
  relational_rupture: "bg-indigo-100 text-indigo-900",
  existential_drift: "bg-slate-200 text-slate-900",
  creative_block: "bg-orange-100 text-orange-900",
}

const badgeBase = "h-auto whitespace-normal break-words text-left text-xs leading-snug"

// iOS Safari keeps the layout viewport when the keyboard opens, so a sticky
// composer would sit behind it. Lift it by the height the keyboard covers.
function useKeyboardInset() {
  const [inset, setInset] = useState(0)
  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return
    const update = () => setInset(Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop))
    update()
    viewport.addEventListener("resize", update)
    viewport.addEventListener("scroll", update)
    return () => {
      viewport.removeEventListener("resize", update)
      viewport.removeEventListener("scroll", update)
    }
  }, [])
  return inset
}

function ModeToggle({
  id,
  title,
  checked,
  onCheckedChange,
  description,
  disabled,
}: {
  id: string
  title: string
  checked: boolean
  onCheckedChange: (value: boolean) => void
  description: string
  disabled?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2">
      <div className="min-w-0">
        <label htmlFor={id} className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-900">
          {title}
          <span
            className={`rounded px-1.5 py-0.5 text-xs font-semibold ${checked ? "bg-blue-700 text-white" : "bg-slate-200 text-slate-700"}`}
          >
            {checked ? "On" : "Off"}
          </span>
        </label>
        <p id={`${id}-desc`} className="mt-1 text-sm leading-relaxed text-slate-600">
          {description}
        </p>
      </div>
      <div className="flex min-h-11 shrink-0 items-center">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-describedby={`${id}-desc`}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

function MetricBadges({ data, infoId }: { data: QOTEData; infoId: string }) {
  const [open, setOpen] = useState(false)
  const alignmentIsDefault = data.metricSources?.alignment === "default" && toUnitMetric(data.alignment) !== null
  const wobble = formatPercent(data.wobble)
  const alignment = alignmentIsDefault ? "default, no signal words" : formatPercent(data.alignment)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge className={`${badgeBase} ${PHASE_STYLES[data.phase.name] ?? "bg-slate-200 text-slate-900"}`}>
          Phase: {data.phase.name}
        </Badge>
        <Badge variant="outline" className={`${badgeBase} border-slate-300 text-slate-800`}>
          Wobble: {wobble}
        </Badge>
        <Badge variant="outline" className={`${badgeBase} border-slate-300 text-slate-800`}>
          Alignment: {alignment}
        </Badge>
        {data.flipPotential && (
          <Badge className={`${badgeBase} bg-red-100 text-red-900`}>Flip flagged</Badge>
        )}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={infoId}
          className="inline-flex min-h-11 items-center gap-1 rounded-md px-2 text-xs font-medium text-blue-800 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <Info className="h-4 w-4" aria-hidden="true" />
          Experimental scores
        </button>
      </div>
      {open && (
        <div
          id={infoId}
          className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-700"
        >
          <p className="font-medium text-slate-900">Keyword heuristics, not measurements</p>
          <p className="mt-1">
            These scores describe the words in your message only. They do not measure your consciousness, body, or
            any quantum state.
          </p>
          <ul className="mt-2 flex flex-col gap-1">
            <li>
              <span className="font-medium text-slate-900">Wobble:</span> rises with question marks, ellipses, hedge
              words like {"\u201C"}maybe{"\u201D"} or {"\u201C"}but{"\u201D"}, and very short or long messages.
            </li>
            <li>
              <span className="font-medium text-slate-900">Alignment:</span> positive minus negative words, divided by
              all signal words, shown on a 0 to 100% scale where 50% is neutral. With no signal words it is a default,
              not a measured value.
            </li>
            <li>
              <span className="font-medium text-slate-900">Flip flagged:</span> Zero Point phase, or high wobble with
              low alignment.
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

function renderInlineMarkdown(text: string) {
  return text.split(/(\*\*[^*\n]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

export default function ResonaChat() {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [useQOTELens, setUseQOTELens] = useState(true)
  const [useRTP, setUseRTP] = useState(true)
  const [presenceMode, setPresenceMode] = useState(false)
  const [resonanceStats, setResonanceStats] = useState<ResonanceStats | null>(null)
  const [breathingPattern, setBreathingPattern] = useState<RTPData["breathingPattern"] | null>(null)
  const inFlight = useRef(false)
  const endRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const keyboardInset = useKeyboardInset()
  const baseId = useId()
  const rtpOn = useQOTELens && useRTP

  useEffect(() => {
    if (conversation.length > 0 || isLoading) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [conversation.length, isLoading])

  const requestReply = async (userMessage: string) => {
    if (inFlight.current) return
    inFlight.current = true
    setIsLoading(true)

    const appendError = (content: string, retryable: boolean) =>
      setConversation((prev) => [
        ...prev,
        { role: "system", content, timestamp: new Date().toISOString(), retryText: retryable ? userMessage : undefined },
      ])

    try {
      const response = await fetch("/api/resona-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, useQOTELens, useRTP: rtpOn, presenceMode }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || !data || data.source !== "ai" || typeof data.response !== "string" || !data.response) {
        const reason =
          typeof data?.error === "string" ? data.error : `The chat service responded with status ${response.status}.`
        appendError(`Resona could not reply. ${reason}`, data?.retryable !== false)
        return
      }

      setConversation((prev) => [
        ...prev,
        {
          role: "resona",
          content: data.response,
          qoteData: data.qoteData ?? undefined,
          rtpData: data.rtpResponse ?? undefined,
          mode: typeof data.mode === "string" ? data.mode : undefined,
          model: typeof data.model === "string" ? data.model : undefined,
          timestamp: data.timestamp,
        },
      ])

      setResonanceStats(data.resonanceStats ?? null)
    } catch {
      appendError("Resona could not reply. The connection to the chat service failed.", true)
    } finally {
      inFlight.current = false
      setIsLoading(false)
    }
  }

  const sendMessage = () => {
    const userMessage = message.trim()
    if (!userMessage || inFlight.current) return

    setMessage("")
    setConversation((prev) => [...prev, { role: "user", content: userMessage, timestamp: new Date().toISOString() }])
    requestReply(userMessage)
  }

  const retryMessage = (errorIndex: number, text: string) => {
    if (inFlight.current) return
    setConversation((prev) => prev.filter((_, i) => i !== errorIndex))
    requestReply(text)
  }

  const editMessage = (errorIndex: number, text: string) => {
    setConversation((prev) => {
      const withoutError = prev.filter((_, i) => i !== errorIndex)
      const lastUser = withoutError.findLastIndex((m) => m.role === "user" && m.content === text)
      return lastUser === -1 ? withoutError : withoutError.filter((_, i) => i !== lastUser)
    })
    setMessage(text)
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const activeModes = [useQOTELens && "QOTE", rtpOn && "RTP", presenceMode && "Presence"].filter(Boolean)

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-3 px-3 pt-2 md:gap-4 md:px-6 md:pt-6">
      <header className="flex items-center justify-between gap-2">
        <Button
          asChild
          variant="ghost"
          className="min-h-11 gap-2 px-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Home
          </Link>
        </Button>
        <div className="text-right">
          <h1 className="text-lg font-semibold tracking-wide text-slate-900 md:text-2xl">Resona</h1>
          <p className="text-xs text-slate-600">Conversational companion · experimental</p>
        </div>
      </header>

      <details className="group rounded-lg border border-slate-200 bg-card text-slate-900">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-sm [&::-webkit-details-marker]:hidden">
          <span>
            <span className="font-medium">Modes:</span>{" "}
            <span className="text-slate-700">{activeModes.length ? activeModes.join(" · ") : "Standard only"}</span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="flex flex-col divide-y divide-slate-200 border-t border-slate-200 px-3 pb-1">
          <ModeToggle
            id={`${baseId}-qote`}
            title="QOTE lens"
            checked={useQOTELens}
            onCheckedChange={setUseQOTELens}
            description="Off: standard conversation. On: each message gets experimental keyword scores (phase, wobble, alignment) that set Resona's tone and appear as badges."
          />
          <ModeToggle
            id={`${baseId}-rtp`}
            title="Resonance Tuning Protocol"
            checked={rtpOn}
            onCheckedChange={setUseRTP}
            disabled={!useQOTELens}
            description={
              useQOTELens
                ? "On: distress phrases such as \u201Coverwhelmed\u201D, \u201Cstuck\u201D, or \u201Calone\u201D switch Resona to a gentler reflective reply with suggested prompts and a breathing pattern. Off: no protocol."
                : "Needs the QOTE lens. Turn the lens on to use RTP."
            }
          />
          <ModeToggle
            id={`${baseId}-presence`}
            title="Presence Mode"
            checked={presenceMode}
            onCheckedChange={setPresenceMode}
            description="On: slower, spacious, reflective replies. Direct questions still get a direct answer. Off: normal pace."
          />
        </div>
      </details>

      <QOTEInfo expanded={false} />

      {resonanceStats && useQOTELens && (
        <section aria-label="Experimental server statistics" className="rounded-lg border border-slate-200 bg-card p-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2">
            <h2 className="text-sm font-medium text-slate-900">Recent scores · experimental</h2>
            <p className="text-xs text-slate-600">All recent chats on this server; resets on restart</p>
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div>
              <dd className="text-base font-semibold text-slate-900">{formatPercent(resonanceStats.averageAlignment)}</dd>
              <dt className="text-xs text-slate-600">
                Avg alignment
                <span className="block">({formatCount(resonanceStats.alignmentSamples)} calculated)</span>
              </dt>
            </div>
            <div>
              <dd className="text-base font-semibold text-slate-900">{formatPercent(resonanceStats.flipFrequency)}</dd>
              <dt className="text-xs text-slate-600">
                Flip rate
                <span className="block">(flagged ÷ logged)</span>
              </dt>
            </div>
            <div>
              <dd className="text-base font-semibold text-slate-900">{formatCount(resonanceStats.totalInteractions)}</dd>
              <dt className="text-xs text-slate-600">Logged messages</dt>
            </div>
          </dl>
        </section>
      )}

      {breathingPattern && (
        <Alert className="border-blue-200 bg-blue-50 text-blue-950">
          <AlertDescription>
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-medium">Breathing pattern</p>
              <p className="text-sm">
                Inhale {breathingPattern.inhale}s · Hold {breathingPattern.hold}s · Exhale {breathingPattern.exhale}s
              </p>
              <p className="text-xs text-slate-700">{breathingPattern.cycles} cycles suggested</p>
              <Button size="sm" variant="outline" className="min-h-11" onClick={() => setBreathingPattern(null)}>
                Close
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <section aria-label="Conversation" aria-live="polite" className="flex flex-1 flex-col gap-3">
        {conversation.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 px-4 py-6 text-center text-slate-700">
            <p className="text-pretty leading-relaxed">
              Say hello, ask a question, or try {"\u201C"}Tell me about you{"\u201D"}.
            </p>
          </div>
        )}

        {conversation.map((msg, idx) => (
          <div key={idx} className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
            <div
              className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-base leading-relaxed break-words whitespace-pre-wrap ${
                msg.role === "user"
                  ? "rounded-br-md bg-blue-700 text-white"
                  : msg.role === "resona"
                    ? "rounded-bl-md border border-slate-200 bg-card text-slate-900"
                    : "border border-red-200 bg-red-50 text-red-900"
              }`}
              role={msg.role === "system" ? "alert" : undefined}
            >
              {msg.role === "resona" ? renderInlineMarkdown(msg.content) : msg.content}
              {msg.role === "system" && msg.retryText && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="min-h-11 border-red-300 bg-card text-red-900 hover:bg-red-100 hover:text-red-950"
                    onClick={() => retryMessage(idx, msg.retryText as string)}
                    disabled={isLoading}
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Retry
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="min-h-11 text-red-900 hover:bg-red-100 hover:text-red-950"
                    onClick={() => editMessage(idx, msg.retryText as string)}
                    disabled={isLoading}
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    Edit message
                  </Button>
                </div>
              )}
            </div>

            {msg.role === "resona" && msg.mode && (
              <p className="px-1 text-xs text-slate-600">
                {MODE_LABELS[msg.mode] ?? msg.mode}
                {msg.model ? ` · AI reply (${msg.model})` : " · AI reply"}
              </p>
            )}

            {msg.rtpData && (
              <div className="flex w-full max-w-[88%] flex-col gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3 text-orange-950">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge className={`${badgeBase} ${TRIGGER_STYLES[msg.rtpData.trigger.type] ?? "bg-slate-200 text-slate-900"}`}>
                    RTP: {msg.rtpData.trigger.type.replace(/_/g, " ")}
                  </Badge>
                  <Badge variant="outline" className={`${badgeBase} border-orange-300 text-orange-950`}>
                    {msg.rtpData.trigger.severity}
                  </Badge>
                </div>
                <p className="text-xs text-orange-900">Triggered by keywords in your message (experimental).</p>
                {msg.rtpData.breathingPattern && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="min-h-11 self-start border-orange-300 bg-card text-orange-950"
                    onClick={() => setBreathingPattern(msg.rtpData?.breathingPattern ?? null)}
                  >
                    <Wind className="h-4 w-4" aria-hidden="true" />
                    Show breathing pattern
                  </Button>
                )}
                {msg.rtpData.followUpPrompts.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-orange-900">Suggested prompts (tap to edit before sending):</p>
                    {msg.rtpData.followUpPrompts.slice(0, 2).map((prompt, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant="ghost"
                        className="h-auto min-h-11 justify-start whitespace-normal text-left text-sm text-orange-950 hover:bg-orange-100"
                        onClick={() => {
                          setMessage(prompt)
                          textareaRef.current?.focus()
                        }}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {msg.qoteData && useQOTELens && (
              <div className="w-full max-w-[88%]">
                <MetricBadges data={msg.qoteData} infoId={`${baseId}-metrics-${idx}`} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start" role="status">
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-card px-3.5 py-2.5 text-slate-700">
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 delay-75" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 delay-150" />
              </span>
              <span className="text-sm">Resona is replying…</span>
            </div>
          </div>
        )}
        <div ref={endRef} className="scroll-mb-28" aria-hidden="true" />
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }}
        className="sticky z-10 -mx-3 flex items-end gap-2 border-t border-slate-200 bg-background/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:mx-0 md:rounded-t-lg md:px-0"
        style={{ bottom: keyboardInset }}
      >
        <textarea
          ref={textareaRef}
          aria-label="Message Resona"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={presenceMode ? "Share what is here right now…" : "Message Resona…"}
          className="max-h-40 min-h-11 min-w-0 flex-1 resize-none rounded-lg border border-slate-300 bg-card px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          rows={1}
          enterKeyHint="send"
        />
        <Button type="submit" disabled={isLoading || !message.trim()} className="min-h-11 px-5">
          {isLoading ? "Sending…" : "Send"}
        </Button>
      </form>
    </div>
  )
}
