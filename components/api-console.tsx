"use client"

import { useState } from "react"
import { Copy, Check, Play, Loader2 } from "lucide-react"

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="p-1.5 rounded-md text-white/30 hover:text-white/60 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
      aria-label="Copy"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-[#2DD4BF]" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

export function CodeBlock({
  code,
  language = "bash",
  title,
}: {
  code: string
  language?: string
  title?: string
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-[#0D1424]">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="text-[11px] font-mono text-white/40">{title}</span>
          <CopyBtn text={code} />
        </div>
      )}
      <div className="relative p-4 overflow-x-auto">
        {!title && (
          <div className="absolute top-3 right-3">
            <CopyBtn text={code} />
          </div>
        )}
        <pre className="text-[13px] font-mono text-white/80 leading-relaxed whitespace-pre">{code}</pre>
      </div>
    </div>
  )
}

export function MethodBadge({ method }: { method: string }) {
  const styles: Record<string, string> = {
    GET: "bg-[#2DD4BF]/10 text-[#2DD4BF]",
    POST: "bg-[#34D399]/10 text-[#34D399]",
    PUT: "bg-blue-500/10 text-blue-400",
    DELETE: "bg-[#F87171]/10 text-[#F87171]",
  }
  return (
    <span className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-md ${styles[method] || "bg-white/10 text-white/60"}`}>
      {method}
    </span>
  )
}

interface ApiConsoleProps {
  method: string
  endpoint: string
  defaultBody?: string
  mockResponse: string
}

export function ApiConsole({ method, endpoint, defaultBody, mockResponse }: ApiConsoleProps) {
  const [body, setBody] = useState(defaultBody || "")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = () => {
    setLoading(true)
    setTimeout(() => {
      setResponse(mockResponse)
      setLoading(false)
    }, 600)
  }

  return (
    <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-[#0D1424]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <MethodBadge method={method} />
        <code className="text-[13px] font-mono text-white/70 flex-1 truncate">{endpoint}</code>
        <button
          onClick={handleSend}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2DD4BF] text-[#0B1220] text-xs font-semibold rounded-md hover:bg-[#2DD4BF]/90 transition-colors min-h-[36px] disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
          Send
        </button>
      </div>

      {/* Request Body */}
      {defaultBody && (
        <div className="border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-4 py-1.5 bg-white/[0.01]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">Request Body</span>
            <CopyBtn text={body} />
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-4 py-3 bg-transparent text-[13px] font-mono text-white/80 leading-relaxed resize-y min-h-[120px] focus:outline-none"
            spellCheck={false}
          />
        </div>
      )}

      {/* Response */}
      {response && (
        <div>
          <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/[0.06] bg-white/[0.01]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">
              Response <span className="text-[#2DD4BF]">200 OK</span>
            </span>
            <CopyBtn text={response} />
          </div>
          <div className="px-4 py-3 overflow-x-auto">
            <pre className="text-[13px] font-mono text-[#2DD4BF]/80 leading-relaxed whitespace-pre">{response}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

export function ParamTable({
  params,
}: {
  params: { name: string; type: string; required?: boolean; description: string }[]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] bg-white/[0.02]">
            <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">Parameter</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">Type</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-b border-white/[0.04] last:border-0">
              <td className="px-4 py-2.5 font-mono text-[13px] text-white/80">
                {p.name}
                {p.required && <span className="ml-1.5 text-[10px] text-[#F87171]">required</span>}
              </td>
              <td className="px-4 py-2.5 font-mono text-[13px] text-white/40">{p.type}</td>
              <td className="px-4 py-2.5 text-[13px] text-white/50">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
