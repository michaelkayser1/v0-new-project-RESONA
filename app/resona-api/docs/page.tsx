"use client"

import { CodeBlock, MethodBadge, ApiConsole, ParamTable } from "@/components/api-console"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

function SectionHeader({ id, title, description }: { id: string; title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h2 id={id} className="scroll-mt-20 text-2xl md:text-3xl font-semibold text-white tracking-tight mb-2">
        {title}
      </h2>
      {description && <p className="text-sm text-white/50 leading-relaxed max-w-2xl">{description}</p>}
    </div>
  )
}

function Divider() {
  return <hr className="border-white/[0.06] my-16" />
}

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-16 pb-32">

      {/* ================================================================ */}
      {/* OVERVIEW */}
      {/* ================================================================ */}
      <section id="overview">
        <span className="inline-flex px-2.5 py-1 bg-[#2DD4BF]/10 text-[#2DD4BF] text-[10px] font-mono font-bold rounded-full tracking-wider mb-4">
          v1.0.0-preview
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-4">
          Resona API v1
        </h1>
        <p className="text-base text-white/50 leading-relaxed max-w-2xl mb-8">
          Programmatic access to autonomic state computation, coherence monitoring, intervention logging, and trend analysis.
        </p>

        {/* Base URL card */}
        <div className="p-5 rounded-xl border border-[#2DD4BF]/20 bg-[#2DD4BF]/[0.04] mb-8">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#2DD4BF]/60 mb-2">Base URL</p>
          <code className="text-lg font-mono text-[#2DD4BF] font-semibold">https://api.resona.health/v1</code>
        </div>

        {/* Architecture diagram */}
        <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] mb-8">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4">Architecture</p>
          <div className="flex flex-wrap items-center gap-2 text-sm font-mono">
            {["Wearables", "/ingest", "State Engine", "/state", "Interventions", "Trends", "Alerts"].map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-lg ${
                  item.startsWith("/")
                    ? "bg-[#2DD4BF]/10 text-[#2DD4BF]"
                    : "bg-white/[0.04] text-white/60"
                }`}>
                  {item}
                </span>
                {i < 6 && <span className="text-white/20">{"-->"}</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg border border-[#F87171]/20 bg-[#F87171]/[0.04]">
          <p className="text-xs text-[#F87171]/80">
            Resona provides decision support and regulation guidance. Not a medical device. Not for emergencies.
          </p>
        </div>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* QUICKSTART */}
      {/* ================================================================ */}
      <section id="quickstart">
        <SectionHeader id="quickstart-h" title="Quickstart" description="Four steps to get coherence data flowing." />

        <div className="space-y-10">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] text-xs font-mono font-bold flex items-center justify-center">1</span>
              <h3 className="text-base font-semibold text-white">Get State</h3>
            </div>
            <CodeBlock
              title="curl"
              code={`curl -X GET "https://api.resona.health/v1/users/usr_8x2k/state" \\
  -H "Authorization: Bearer rk_live_abc123..." \\
  -H "Accept: application/json"`}
            />
            <div className="mt-3">
              <CodeBlock
                title="Response 200"
                code={`{
  "state_id": "st_9x21a",
  "user_id": "usr_8x2k",
  "coherence_score": 72,
  "corridor_status": "in",
  "corridor_band": { "low": 62, "high": 84 },
  "stress_index": 0.31,
  "readiness": 0.84,
  "confidence": 0.91,
  "parasympathetic": 0.67,
  "sympathetic": 0.33,
  "computed_at": "2026-02-09T10:35:00Z"
}`}
              />
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] text-xs font-mono font-bold flex items-center justify-center">2</span>
              <h3 className="text-base font-semibold text-white">Ingest Data</h3>
            </div>
            <CodeBlock
              title="curl"
              code={`curl -X POST https://api.resona.health/v1/users/usr_8x2k/ingest \\
  -H "Authorization: Bearer rk_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: ing_20260209_103000_001" \\
  -d '{
    "source": "apple_health",
    "timestamp": "2026-02-09T10:30:00Z",
    "metrics": {
      "hrv_ms": 48.2,
      "rhr_bpm": 62,
      "skin_temp_c": 33.1,
      "sleep_hours": 7.2,
      "steps": 4200
    }
  }'`}
            />
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] text-xs font-mono font-bold flex items-center justify-center">3</span>
              <h3 className="text-base font-semibold text-white">Log Intervention</h3>
            </div>
            <CodeBlock
              title="curl"
              code={`curl -X POST https://api.resona.health/v1/users/usr_8x2k/interventions \\
  -H "Authorization: Bearer rk_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "breathing",
    "protocol_id": "breath_4_6_v1",
    "duration_sec": 180,
    "trigger": "alert"
  }'`}
            />
          </div>

          {/* Step 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] text-xs font-mono font-bold flex items-center justify-center">4</span>
              <h3 className="text-base font-semibold text-white">View Trends</h3>
            </div>
            <CodeBlock
              title="curl"
              code={`curl -X GET "https://api.resona.health/v1/users/usr_8x2k/trends?range=30d" \\
  -H "Authorization: Bearer rk_live_abc123..."`}
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* AUTHENTICATION */}
      {/* ================================================================ */}
      <section id="authentication">
        <SectionHeader id="auth-h" title="Authentication" description="All requests require a Bearer token in the Authorization header." />

        <CodeBlock
          title="Example"
          code={`Authorization: Bearer rk_live_abc123...`}
        />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <code className="text-sm font-mono text-[#2DD4BF]">rk_test_...</code>
            <p className="text-xs text-white/40 mt-1">Sandbox / testing environment</p>
          </div>
          <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <code className="text-sm font-mono text-[#34D399]">rk_live_...</code>
            <p className="text-xs text-white/40 mt-1">Production environment</p>
          </div>
        </div>

        {/* Key rotation panel */}
        <div className="mt-6 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <h4 className="text-sm font-semibold text-white mb-3">Key Management</h4>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] mb-3">
            <div className="flex-1 min-w-0">
              <code className="text-xs font-mono text-white/60 truncate block">rk_live_9x2kF8m...j4Qp</code>
              <p className="text-[10px] text-white/30 mt-0.5">Created Feb 1, 2026</p>
            </div>
            <span className="px-2 py-0.5 bg-[#34D399]/10 text-[#34D399] text-[10px] font-mono rounded">Active</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <div className="flex-1 min-w-0">
              <code className="text-xs font-mono text-white/30 truncate block line-through">rk_live_7m1aB3x...w8Ln</code>
              <p className="text-[10px] text-white/30 mt-0.5">Revoked Jan 15, 2026</p>
            </div>
            <span className="px-2 py-0.5 bg-white/5 text-white/30 text-[10px] font-mono rounded">Revoked</span>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Security Best Practices</p>
          {["Store keys server-side only, never expose in client code", "Use the principle of least privilege", "Rotate keys regularly and revoke unused ones"].map((tip) => (
            <p key={tip} className="flex items-start gap-2 text-sm text-white/50">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2DD4BF] shrink-0" />
              {tip}
            </p>
          ))}
        </div>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* USERS */}
      {/* ================================================================ */}
      <section id="users">
        <SectionHeader id="users-h" title="Users" description="All resources are scoped under a user identifier." />

        <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] mb-6">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">Base Path</p>
          <code className="text-base font-mono text-white/80">{"/v1/users/{user_id}/"}</code>
        </div>

        <div className="space-y-2">
          {[
            { method: "GET", path: "/users/{id}/state" },
            { method: "POST", path: "/users/{id}/ingest" },
            { method: "POST", path: "/users/{id}/interventions" },
            { method: "GET", path: "/users/{id}/trends" },
            { method: "POST", path: "/users/{id}/alerts/subscribe" },
          ].map((ep) => (
            <div key={ep.path} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <MethodBadge method={ep.method} />
              <code className="text-sm font-mono text-white/60">{ep.path}</code>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* STATE */}
      {/* ================================================================ */}
      <section id="state">
        <SectionHeader id="state-h" title="State" description="Retrieve the computed autonomic state for a user." />

        <div className="flex items-center gap-3 mb-6">
          <MethodBadge method="GET" />
          <code className="text-sm font-mono text-white/70">{"/v1/users/{user_id}/state"}</code>
        </div>

        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Query Parameters</h4>
        <ParamTable params={[
          { name: "range", type: "string", description: "Time range: 7d, 30d, or 90d. Defaults to latest." },
        ]} />

        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mt-8 mb-3">Response Fields</h4>
        <ParamTable params={[
          { name: "state_id", type: "string", description: "Unique state computation identifier." },
          { name: "coherence_score", type: "integer", description: "0-100 coherence score." },
          { name: "corridor_status", type: "string", description: '"in" or "out" of the coherence corridor.' },
          { name: "stress_index", type: "float", description: "0-1 stress level." },
          { name: "parasympathetic", type: "float", description: "0-1 parasympathetic tone." },
          { name: "sympathetic", type: "float", description: "0-1 sympathetic tone." },
          { name: "readiness", type: "float", description: "0-1 overall readiness." },
          { name: "confidence", type: "float", description: "0-1 confidence in the computation." },
        ]} />

        {/* Coherence Gauge */}
        <div className="mt-8 p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4">Coherence Meter</p>
          <div className="flex items-end gap-1 h-16 mb-2">
            {[28, 35, 42, 50, 58, 65, 72, 68, 74, 70, 72, 75, 71, 69, 72].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all"
                style={{
                  height: `${v}%`,
                  backgroundColor: v >= 62 ? "#2DD4BF" : v >= 40 ? "#FBBF24" : "#F87171",
                  opacity: 0.6 + (i / 30),
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-mono text-white/30">
            <span>0</span>
            <span className="text-[#FBBF24]/60">40</span>
            <span className="text-[#2DD4BF]/60">62 - 84 (corridor)</span>
            <span>100</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Try It</p>
          <ApiConsole
            method="GET"
            endpoint="/v1/users/usr_8x2k/state"
            mockResponse={`{
  "state_id": "st_9x21a",
  "user_id": "usr_8x2k",
  "coherence_score": 72,
  "corridor_status": "in",
  "corridor_band": { "low": 62, "high": 84 },
  "stress_index": 0.31,
  "readiness": 0.84,
  "confidence": 0.91,
  "parasympathetic": 0.67,
  "sympathetic": 0.33,
  "computed_at": "2026-02-09T10:35:00Z"
}`}
          />
        </div>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* INGEST */}
      {/* ================================================================ */}
      <section id="ingest">
        <SectionHeader id="ingest-h" title="Ingest" description="Submit physiological signals from wearables and clinical devices." />

        <div className="flex items-center gap-3 mb-6">
          <MethodBadge method="POST" />
          <code className="text-sm font-mono text-white/70">{"/v1/users/{user_id}/ingest"}</code>
        </div>

        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Request Body</h4>
        <ParamTable params={[
          { name: "source", type: "string", required: true, description: "Data source identifier (e.g. apple_health, oura)." },
          { name: "timestamp", type: "string", required: true, description: "UTC ISO 8601 timestamp." },
          { name: "metrics", type: "object", required: true, description: "Signal payload (hrv_ms, rhr_bpm, skin_temp_c, etc.)." },
        ]} />

        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mt-8 mb-3">Headers</h4>
        <ParamTable params={[
          { name: "Idempotency-Key", type: "string", description: "Recommended. Prevents duplicate ingestion of the same data." },
        ]} />

        <div className="mt-6 p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
          <p className="text-xs font-semibold text-white/60 mb-2">Validation Rules</p>
          <ul className="space-y-1 text-xs text-white/40">
            <li>{"hrv_ms >= 0"}</li>
            <li>{"rhr_bpm >= 0"}</li>
            <li>{"sleep_hours >= 0"}</li>
            <li>Duplicate Idempotency-Key returns the original response</li>
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Try It</p>
          <ApiConsole
            method="POST"
            endpoint="/v1/users/usr_8x2k/ingest"
            defaultBody={`{
  "source": "apple_health",
  "timestamp": "2026-02-09T10:30:00Z",
  "metrics": {
    "hrv_ms": 48.2,
    "rhr_bpm": 62,
    "skin_temp_c": 33.1,
    "sleep_hours": 7.2,
    "steps": 4200
  }
}`}
            mockResponse={`{
  "ingestion_id": "ing_a8x2f",
  "user_id": "usr_8x2k",
  "status": "accepted",
  "metrics_received": 5,
  "coherence_estimate": 68,
  "processed_at": "2026-02-09T10:30:01Z"
}`}
          />
        </div>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* INTERVENTIONS */}
      {/* ================================================================ */}
      <section id="interventions">
        <SectionHeader id="interventions-h" title="Interventions" description="Log breathing, grounding, movement, and other interventions." />

        <div className="flex items-center gap-3 mb-6">
          <MethodBadge method="POST" />
          <code className="text-sm font-mono text-white/70">{"/v1/users/{user_id}/interventions"}</code>
        </div>

        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Request Body</h4>
        <ParamTable params={[
          { name: "type", type: "string", required: true, description: "Intervention type: breathing, grounding, movement, stimulus_reduction." },
          { name: "protocol_id", type: "string", description: "Optional protocol reference (e.g. breath_4_6_v1)." },
          { name: "duration_sec", type: "integer", required: true, description: "Duration of the intervention in seconds." },
          { name: "trigger", type: "string", required: true, description: "What initiated it: manual, alert, or scheduled." },
        ]} />

        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mt-8 mb-3">Response Fields</h4>
        <ParamTable params={[
          { name: "intervention_id", type: "string", description: "Unique intervention identifier." },
          { name: "state_before", type: "object", description: "Autonomic state snapshot before intervention." },
          { name: "state_after", type: "object", description: "Autonomic state snapshot after intervention (if available)." },
        ]} />

        <div className="mt-6">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Try It</p>
          <ApiConsole
            method="POST"
            endpoint="/v1/users/usr_8x2k/interventions"
            defaultBody={`{
  "type": "breathing",
  "protocol_id": "breath_4_6_v1",
  "duration_sec": 180,
  "trigger": "alert"
}`}
            mockResponse={`{
  "intervention_id": "int_b4x9k",
  "user_id": "usr_8x2k",
  "type": "breathing",
  "status": "logged",
  "state_before": {
    "coherence_score": 58,
    "stress_index": 0.62
  },
  "state_after": {
    "coherence_score": 71,
    "stress_index": 0.34
  },
  "logged_at": "2026-02-09T10:45:00Z"
}`}
          />
        </div>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* TRENDS */}
      {/* ================================================================ */}
      <section id="trends">
        <SectionHeader id="trends-h" title="Trends" description="Retrieve time-series data and corridor adherence metrics." />

        <div className="flex items-center gap-3 mb-6">
          <MethodBadge method="GET" />
          <code className="text-sm font-mono text-white/70">{"/v1/users/{user_id}/trends?range=30d"}</code>
        </div>

        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Query Parameters</h4>
        <ParamTable params={[
          { name: "range", type: "string", required: true, description: "Time range: 7d, 30d, or 90d." },
        ]} />

        {/* Mini chart preview */}
        <div className="mt-8 p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/30">30-day Coherence Trend</p>
            <span className="text-xs font-mono text-[#2DD4BF]">73.2% corridor adherence</span>
          </div>
          <div className="flex items-end gap-0.5 h-20">
            {[65, 68, 62, 70, 72, 68, 74, 76, 71, 69, 73, 75, 72, 78, 74, 71, 76, 73, 77, 75, 72, 79, 76, 74, 78, 73, 75, 77, 74, 76].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${v}%`,
                  backgroundColor: v >= 62 && v <= 84 ? "#2DD4BF" : "#F87171",
                  opacity: 0.4 + (i / 60),
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-mono text-white/20">
            <span>Day 1</span>
            <span>Day 30</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Try It</p>
          <ApiConsole
            method="GET"
            endpoint="/v1/users/usr_8x2k/trends?range=30d"
            mockResponse={`{
  "user_id": "usr_8x2k",
  "range": "30d",
  "corridor_adherence_pct": 73.2,
  "series": {
    "coherence": [65, 68, 62, 70, 72, 68, 74, 76, 71, 69, 73, 75, 72, 78, 74, 71, 76, 73, 77, 75, 72, 79, 76, 74, 78, 73, 75, 77, 74, 76],
    "stress": [0.42, 0.38, 0.51, 0.35, 0.31, 0.39, 0.28, 0.25, 0.33, 0.36, 0.30, 0.27, 0.32, 0.22, 0.29],
    "recovery": [0.61, 0.67, 0.58, 0.72, 0.74, 0.65, 0.78, 0.80, 0.71, 0.68, 0.73, 0.76, 0.72, 0.82, 0.75]
  }
}`}
          />
        </div>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* ALERTS & WEBHOOKS */}
      {/* ================================================================ */}
      <section id="alerts">
        <SectionHeader id="alerts-h" title="Alerts & Webhooks" description="Subscribe to threshold-based alerts and receive real-time event notifications." />

        <div className="flex items-center gap-3 mb-6">
          <MethodBadge method="POST" />
          <code className="text-sm font-mono text-white/70">{"/v1/users/{user_id}/alerts/subscribe"}</code>
        </div>

        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Thresholds</h4>
        <ParamTable params={[
          { name: "coherence_below", type: "integer", description: "Alert when coherence drops below this value." },
          { name: "stress_above", type: "float", description: "Alert when stress exceeds this value." },
        ]} />

        <div className="mt-6">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Try It</p>
          <ApiConsole
            method="POST"
            endpoint="/v1/users/usr_8x2k/alerts/subscribe"
            defaultBody={`{
  "channels": ["webhook"],
  "webhook_url": "https://your-app.com/hooks/resona",
  "thresholds": {
    "coherence_below": 40,
    "stress_above": 0.8
  }
}`}
            mockResponse={`{
  "subscription_id": "sub_c7x3m",
  "user_id": "usr_8x2k",
  "channels": ["webhook"],
  "thresholds": {
    "coherence_below": 40,
    "stress_above": 0.8
  },
  "status": "active",
  "created_at": "2026-02-09T11:00:00Z"
}`}
          />
        </div>

        {/* Webhook Security */}
        <h4 className="text-sm font-semibold text-white mt-10 mb-4">Webhook Signature Verification</h4>
        <p className="text-sm text-white/50 mb-4 max-w-2xl">
          Every webhook includes signature headers for verification. Validate every incoming webhook before processing.
        </p>

        <div className="space-y-3 mb-6">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <code className="text-xs font-mono text-white/60">X-Resona-Signature</code>
            <p className="text-[11px] text-white/30 mt-0.5">HMAC-SHA256 signature of the payload</p>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <code className="text-xs font-mono text-white/60">X-Resona-Timestamp</code>
            <p className="text-[11px] text-white/30 mt-0.5">Unix timestamp of the webhook event</p>
          </div>
        </div>

        <p className="text-xs text-white/40 mb-2">Signing string format:</p>
        <CodeBlock code="timestamp.raw_body" />

        <p className="text-xs text-white/40 mt-6 mb-2">Node.js verification example:</p>
        <CodeBlock
          title="verify-webhook.ts"
          code={`import crypto from "crypto"

export function verifyResonaWebhook(req, secret) {
  const sig = req.headers["x-resona-signature"]?.replace("sha256=", "")
  const ts = req.headers["x-resona-timestamp"]
  const payload = \`\${ts}.\${req.rawBody}\`

  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex")

  return crypto.timingSafeEqual(
    Buffer.from(sig || ""),
    Buffer.from(expected)
  )
}`}
        />

        <p className="mt-4 text-xs text-white/40">
          Reject webhooks with timestamps older than 5 minutes to prevent replay attacks.
        </p>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* ERRORS */}
      {/* ================================================================ */}
      <section id="errors">
        <SectionHeader id="errors-h" title="Errors" description="All errors return a consistent JSON structure with machine-readable types." />

        <CodeBlock
          title="Error Response"
          code={`{
  "error": {
    "type": "auth_error",
    "code": 401,
    "message": "Invalid or expired API key",
    "request_id": "req_x9f2k"
  }
}`}
        />

        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mt-8 mb-3">Error Types</h4>
        <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">Type</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">Code</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">Description</th>
              </tr>
            </thead>
            <tbody className="text-white/50">
              {[
                { type: "auth_error", code: "401", desc: "Missing or invalid API key." },
                { type: "validation_error", code: "400", desc: "Invalid request parameters." },
                { type: "rate_limited", code: "429", desc: "Too many requests. Back off and retry." },
                { type: "server_error", code: "500", desc: "Internal server error. Contact support." },
              ].map((e) => (
                <tr key={e.type} className="border-b border-white/[0.04] last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[13px] text-[#F87171]/80">{e.type}</td>
                  <td className="px-4 py-2.5 font-mono text-[13px] text-white/60">{e.code}</td>
                  <td className="px-4 py-2.5 text-[13px]">{e.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* RATE LIMITS */}
      {/* ================================================================ */}
      <section id="rate-limits">
        <SectionHeader id="rate-limits-h" title="Rate Limits" description="Soft limits are enforced per API key." />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">Default Limit</p>
            <p className="text-2xl font-mono font-bold text-white">100 <span className="text-sm text-white/40 font-normal">req/min</span></p>
          </div>
          <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">Burst Allowance</p>
            <p className="text-2xl font-mono font-bold text-white">10 <span className="text-sm text-white/40 font-normal">req/sec</span></p>
          </div>
        </div>

        <CodeBlock
          title="429 Response"
          code={`{
  "error": {
    "type": "rate_limited",
    "code": 429,
    "message": "Rate limit exceeded. Retry after 12 seconds.",
    "request_id": "req_r4t8k",
    "retry_after": 12
  }
}`}
        />

        <p className="mt-4 text-xs text-white/40">
          Use exponential backoff on 429 responses. Contact us for higher limits.
        </p>
      </section>

      <Divider />

      {/* ================================================================ */}
      {/* CHANGELOG */}
      {/* ================================================================ */}
      <section id="changelog">
        <SectionHeader id="changelog-h" title="Changelog" />

        <div className="space-y-6">
          <div className="relative pl-6 border-l-2 border-[#2DD4BF]/20">
            <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[#2DD4BF]" />
            <p className="text-xs font-mono text-[#2DD4BF] mb-1">v1.0.0-preview -- February 9, 2026</p>
            <ul className="space-y-1 text-sm text-white/50">
              <li>Added state_id to all state responses</li>
              <li>Added idempotency support for /ingest</li>
              <li>Added webhook signature verification</li>
              <li>Standardized error types (auth_error, validation_error, rate_limited, server_error)</li>
              <li>Full REST API documentation with interactive console</li>
            </ul>
          </div>
          <div className="relative pl-6 border-l-2 border-white/10">
            <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-white/20" />
            <p className="text-xs font-mono text-white/40 mb-1">v0.9.0 -- January 15, 2026</p>
            <ul className="space-y-1 text-sm text-white/30">
              <li>Internal alpha release</li>
              <li>Core state model and corridor gating</li>
              <li>Basic ingest and trends endpoints</li>
            </ul>
          </div>
        </div>
      </section>

      <Divider />

      {/* Footer */}
      <footer className="text-center py-10">
        <p className="text-xs text-white/30">
          {"Kayser Medical PLLC -- Resona API"}
        </p>
        <p className="text-xs text-white/20 mt-1">
          Helping humans and intelligent systems return to coherence.
        </p>
        <div className="flex justify-center gap-3 mt-4">
          <Link href="/resona-api" className="text-xs text-[#2DD4BF]/60 hover:text-[#2DD4BF] transition-colors">
            API Home
          </Link>
          <Link href="/request-access" className="text-xs text-[#2DD4BF]/60 hover:text-[#2DD4BF] transition-colors">
            Request Access
          </Link>
          <Link href="/" className="text-xs text-[#2DD4BF]/60 hover:text-[#2DD4BF] transition-colors">
            Resona OS
          </Link>
        </div>
      </footer>
    </div>
  )
}
