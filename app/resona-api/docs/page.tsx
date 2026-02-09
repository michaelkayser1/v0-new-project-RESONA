"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Copy, Check } from "lucide-react"

const sidebarItems = [
  { id: "overview", label: "Overview" },
  { id: "authentication", label: "Authentication" },
  { id: "endpoints", label: "Endpoints" },
  { id: "webhooks", label: "Webhooks" },
  { id: "errors", label: "Errors" },
  { id: "rate-limits", label: "Rate Limits" },
  { id: "sdks", label: "SDKs" },
  { id: "changelog", label: "Changelog" },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label="Copy code"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  return (
    <div className="relative bg-background border border-border/50 rounded-xl p-5 overflow-x-auto">
      <CopyButton text={code} />
      <pre className="text-xs font-mono text-foreground leading-relaxed whitespace-pre">{code}</pre>
    </div>
  )
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-primary/10 text-primary",
    POST: "bg-accent/10 text-accent",
    PUT: "bg-blue-500/10 text-blue-400",
    DELETE: "bg-destructive/10 text-destructive",
  }
  return (
    <span className={`px-2 py-0.5 text-[11px] font-mono font-bold rounded ${colors[method] || "bg-muted text-muted-foreground"}`}>
      {method}
    </span>
  )
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-5 flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-48 shrink-0 sticky top-24 self-start">
            <nav className="flex flex-col gap-0.5">
              {sidebarItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 pb-20">
            {/* Mobile nav */}
            <div className="md:hidden mb-6 overflow-x-auto pb-2">
              <div className="flex gap-2">
                {sidebarItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setActiveSection(item.id)}
                    className={`px-3 py-2 rounded-full text-xs whitespace-nowrap transition-colors min-h-[44px] flex items-center ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Overview */}
            <section id="overview" className="mb-16 scroll-mt-28">
              <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">API Reference</h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-6">
                The Resona API provides programmatic access to autonomic state computation, coherence monitoring, intervention logging, and trend analysis. All endpoints return JSON and follow REST conventions.
              </p>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-xs text-primary font-medium">
                  Base URL: <code className="font-mono">https://api.resona.health/v1</code>
                </p>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="mb-16 scroll-mt-28">
              <h2 className="font-serif text-2xl text-foreground mb-4">Authentication</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
                All API requests require a Bearer token in the Authorization header. Keys are issued per-organization and can be rotated via the dashboard. Use the principle of least privilege.
              </p>
              <CodeBlock code={`curl -X GET https://api.resona.health/v1/state?user_id=usr_8x2k \\
  -H "Authorization: Bearer rk_live_abc123..." \\
  -H "Content-Type: application/json"`} />
              <p className="text-xs text-muted-foreground mt-4">
                Keys follow the format <code className="font-mono text-foreground">rk_live_</code> (production) or <code className="font-mono text-foreground">rk_test_</code> (sandbox). Rotate keys regularly.
              </p>
            </section>

            {/* Endpoints */}
            <section id="endpoints" className="mb-16 scroll-mt-28">
              <h2 className="font-serif text-2xl text-foreground mb-6">Endpoints</h2>

              {/* POST /v1/ingest */}
              <div className="mb-10 p-6 bg-card/40 border border-border/50 rounded-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <MethodBadge method="POST" />
                  <code className="text-sm font-mono text-foreground">/v1/ingest</code>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Ingest physiological signals from a data source.</p>
                <CodeBlock code={`POST /v1/ingest
Content-Type: application/json

{
  "source": "apple_health",
  "user_id": "usr_8x2k",
  "timestamp": "2026-02-09T10:30:00Z",
  "metrics": {
    "hrv_ms": 48.2,
    "rhr_bpm": 62,
    "skin_temp_c": 33.1,
    "sleep_hours": 7.2,
    "steps": 4200
  }
}`} />
              </div>

              {/* GET /v1/state */}
              <div className="mb-10 p-6 bg-card/40 border border-border/50 rounded-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-foreground">{"\/v1\/state?user_id={id}&range={days}d"}</code>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Retrieve computed autonomic state for a user.</p>
                <CodeBlock code={`GET /v1/state?user_id=usr_8x2k&range=7d

// Response 200
{
  "user_id": "usr_8x2k",
  "coherence_score": 72,
  "corridor_status": "in",
  "stress_index": 0.31,
  "readiness": 0.84,
  "confidence": 0.91,
  "parasympathetic": 0.67,
  "sympathetic": 0.33,
  "computed_at": "2026-02-09T10:35:00Z"
}`} />
              </div>

              {/* POST /v1/interventions/log */}
              <div className="mb-10 p-6 bg-card/40 border border-border/50 rounded-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <MethodBadge method="POST" />
                  <code className="text-sm font-mono text-foreground">/v1/interventions/log</code>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Log an intervention event.</p>
                <CodeBlock code={`POST /v1/interventions/log
Content-Type: application/json

{
  "user_id": "usr_8x2k",
  "type": "breathing",
  "duration_sec": 180,
  "notes": "Box breathing after elevated stress alert"
}`} />
              </div>

              {/* GET /v1/trends */}
              <div className="mb-10 p-6 bg-card/40 border border-border/50 rounded-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-foreground">{"\/v1\/trends?user_id={id}&range={days}d"}</code>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Retrieve trend data over time.</p>
                <CodeBlock code={`GET /v1/trends?user_id=usr_8x2k&range=30d

// Response 200
{
  "user_id": "usr_8x2k",
  "range": "30d",
  "corridor_adherence_pct": 73.2,
  "series": {
    "coherence": [68, 71, 65, 74, ...],
    "stress": [0.42, 0.38, 0.51, 0.29, ...],
    "recovery": [0.61, 0.67, 0.58, 0.72, ...]
  }
}`} />
              </div>

              {/* POST /v1/alerts/subscribe */}
              <div className="p-6 bg-card/40 border border-border/50 rounded-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <MethodBadge method="POST" />
                  <code className="text-sm font-mono text-foreground">/v1/alerts/subscribe</code>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Subscribe to threshold-based alerts.</p>
                <CodeBlock code={`POST /v1/alerts/subscribe
Content-Type: application/json

{
  "user_id": "usr_8x2k",
  "channels": ["webhook"],
  "thresholds": {
    "coherence_below": 40,
    "stress_above": 0.8
  }
}`} />
              </div>
            </section>

            {/* Webhooks */}
            <section id="webhooks" className="mb-16 scroll-mt-28">
              <h2 className="font-serif text-2xl text-foreground mb-4">Webhooks</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-6">
                Subscribe to real-time events. All webhooks include a signature header for verification.
              </p>
              <div className="space-y-4">
                {[
                  { event: "autonomic.alert", description: "Fired when a metric crosses a configured threshold." },
                  { event: "corridor.exit", description: "User coherence has dropped below the golden corridor (< 0.618)." },
                  { event: "corridor.return", description: "User coherence has returned to corridor range." },
                ].map((wh) => (
                  <div key={wh.event} className="p-4 bg-card/40 border border-border/50 rounded-xl">
                    <code className="text-sm font-mono text-primary">{wh.event}</code>
                    <p className="text-xs text-muted-foreground mt-1">{wh.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-xs text-muted-foreground mb-2">Signature verification header:</p>
                <CodeBlock code={`X-Resona-Signature: sha256=abc123...
X-Resona-Timestamp: 1707500100`} />
              </div>
            </section>

            {/* Errors */}
            <section id="errors" className="mb-16 scroll-mt-28">
              <h2 className="font-serif text-2xl text-foreground mb-4">Errors</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-6">
                All errors return a consistent JSON structure with a machine-readable code and human-readable message.
              </p>
              <CodeBlock code={`{
  "error": {
    "code": 401,
    "message": "Invalid or expired API key",
    "request_id": "req_x9f2k..."
  }
}`} />
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Code</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30"><td className="py-2 pr-4 font-mono text-foreground">400</td><td>Bad request -- invalid parameters</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 pr-4 font-mono text-foreground">401</td><td>Unauthorized -- missing or invalid key</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 pr-4 font-mono text-foreground">403</td><td>Forbidden -- insufficient permissions</td></tr>
                    <tr className="border-b border-border/30"><td className="py-2 pr-4 font-mono text-foreground">429</td><td>Rate limited -- back off and retry</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-foreground">500</td><td>Internal server error</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits" className="mb-16 scroll-mt-28">
              <h2 className="font-serif text-2xl text-foreground mb-4">Rate Limits</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
                Soft limits are enforced per API key. If you exceed them, requests will return <code className="font-mono text-foreground">429</code> with a <code className="font-mono text-foreground">Retry-After</code> header.
              </p>
              <div className="p-5 bg-card/40 border border-border/50 rounded-xl">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Default limit</p>
                    <p className="font-mono text-foreground font-semibold">60 req/min</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Burst allowance</p>
                    <p className="font-mono text-foreground font-semibold">10 req/sec</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Use exponential backoff on 429 responses. Contact us for higher limits.</p>
            </section>

            {/* SDKs */}
            <section id="sdks" className="mb-16 scroll-mt-28">
              <h2 className="font-serif text-2xl text-foreground mb-4">SDKs</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
                Official SDKs are in development. For now, any HTTP client works.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { lang: "JavaScript/TS", status: "Coming soon" },
                  { lang: "Python", status: "Coming soon" },
                  { lang: "Swift", status: "Planned" },
                ].map((sdk) => (
                  <div key={sdk.lang} className="p-4 bg-card/40 border border-border/50 rounded-xl">
                    <p className="text-sm font-semibold text-foreground">{sdk.lang}</p>
                    <p className="text-xs text-muted-foreground">{sdk.status}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Changelog */}
            <section id="changelog" className="scroll-mt-28">
              <h2 className="font-serif text-2xl text-foreground mb-6">Changelog</h2>
              <div className="space-y-4">
                {[
                  { date: "2026-02-09", version: "v1.0.0-preview", description: "Initial developer preview. Ingest, state, trends, interventions, alerts." },
                  { date: "2026-01-15", version: "v0.9.0", description: "Internal alpha. Core state model and corridor gating." },
                ].map((entry) => (
                  <div key={entry.version} className="flex gap-4 p-4 bg-card/40 border border-border/50 rounded-xl">
                    <div className="shrink-0">
                      <span className="text-xs font-mono text-muted-foreground">{entry.date}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{entry.version}</p>
                      <p className="text-xs text-muted-foreground">{entry.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
