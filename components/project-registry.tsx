"use client"
import { useEffect, useMemo, useState } from "react"

type Evidence = { label: string; url: string }
type RecordEntry = { id: string; title: string; owner: string; kind: string; lifecycle: string; evidenceStatus: string; summary: string; repository: string; sourceRevision: string; deployment: string; lastReviewed: string; limitations: string; reproduction: string; evidence: Evidence[] }
export type Registry = { schemaVersion: number; version: string; reviewedOn: string; canonicalUrl: string; reviewScope: string; appInventory: { count: number; observedOn: string; url: string }; records: RecordEntry[] }
function isRegistry(value: unknown): value is Registry {
  if (!value || typeof value !== "object") return false
  const r = value as Registry
  return r.schemaVersion === 1 && typeof r.version === "string" && typeof r.reviewedOn === "string" && typeof r.reviewScope === "string" &&
    !!r.appInventory && Number.isInteger(r.appInventory.count) && typeof r.appInventory.observedOn === "string" && Array.isArray(r.records) &&
    r.records.every(entry => entry && ["id","title","owner","kind","lifecycle","evidenceStatus","summary","repository","sourceRevision","deployment","lastReviewed","limitations","reproduction"].every(key => typeof entry[key as keyof RecordEntry] === "string") &&
      (!entry.repository || entry.repository.startsWith("https://")) && (!entry.deployment || entry.deployment.startsWith("https://")) &&
      Array.isArray(entry.evidence) && entry.evidence.every(e => e && typeof e.label === "string" && typeof e.url === "string" && e.url.startsWith("https://")))
}
export default function ProjectRegistry({ initial }: { initial?: Registry }) {
  const [registry, setRegistry] = useState<Registry | null>(initial ?? null)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState("")
  const [kind, setKind] = useState("All")
  useEffect(() => {
    if (initial) return
    let active = true
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12000)
    fetch("https://www.kayser-medical.com/api/project-registry", { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Registry unavailable"); return response.json() })
      .then(data => { if (!isRegistry(data)) throw new Error("Invalid registry"); if (active) setRegistry(data) })
      .catch(() => { if (active) setError(true) })
      .finally(() => clearTimeout(timeout))
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [initial])
  const filtered = useMemo(() => registry?.records.filter(record =>
    (kind === "All" || record.kind === kind) && query.trim().toLowerCase().split(/\s+/).every(term =>
      [record.id,record.title,record.kind,record.lifecycle,record.evidenceStatus,record.summary].join(" ").toLowerCase().includes(term))) ?? [], [registry,query,kind])
  if (!registry) return <section role="status"><p>{error ? "The shared registry could not be loaded. No cached status is being presented as current." : "Loading the canonical research and project record…"}</p><a href="https://www.kayser-medical.com/project-registry">Open the canonical registry →</a></section>
  return <section className="project-registry">
    <style>{`
      .project-registry {color:#f5f4ef;line-height:1.7}
      .project-registry a {color:#edce8c;text-decoration:underline;overflow-wrap:anywhere}
      .registry-controls {display:flex;flex-wrap:wrap;gap:16px;margin:26px 0}
      .registry-controls label {display:flex;flex-direction:column;gap:8px;flex:1 1 240px}
      .registry-controls input,.registry-controls select {background:#17263e;color:#f5f4ef;border:1px solid #52627b;border-radius:10px;padding:12px;font-size:16px;min-height:46px}
      .project-registry :focus-visible {outline:3px solid #edce8c;outline-offset:4px}
      .registry-grid {display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,350px),1fr));gap:20px}
      .registry-card {background:#112039;border:1px solid #34445b;border-radius:16px;padding:24px;min-width:0;scroll-margin-top:24px;overflow-wrap:anywhere}
      .registry-card h2 {font-size:24px;line-height:1.25;margin:12px 0}
      .registry-card dt {font-weight:700;color:#edce8c;margin-top:14px}
      .registry-card dd {margin:4px 0;color:#c8d4e2}
      .registry-card summary {cursor:pointer;min-height:44px;display:list-item;padding-top:12px;color:#edce8c}
      .registry-card li {margin:8px 0}
    `}</style>
    <p>Registry version <strong>{registry.version}</strong> · source review {registry.reviewedOn}</p>
    <p style={{color:"#c8d4e2"}}>{registry.reviewScope}</p>
    <p><strong>{registry.appInventory.count} app records</strong> in the dated inventory from {registry.appInventory.observedOn}. Individual lifecycle and capability review remains pending. <a href={registry.appInventory.url}>Inspect the inventory JSON</a>.</p>
    <div className="registry-controls">
      <label>Search projects and evidence<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try CUST, sandbox, HRV…" /></label>
      <label>Workstream<select value={kind} onChange={e=>setKind(e.target.value)}><option>All</option>{Array.from(new Set(registry.records.map(r=>r.kind))).sort().map(value=><option key={value}>{value}</option>)}</select></label>
    </div>
    <p role="status" aria-live="polite">{filtered.length} of {registry.records.length} workstreams shown</p>
    <div className="registry-grid">{filtered.map(record=><article className="registry-card" key={record.id} id={record.id}>
      <p style={{fontSize:12,letterSpacing:1,color:"#edce8c"}}>{record.id} · {record.kind}</p>
      <h2>{record.title}</h2><p>{record.summary}</p>
      <dl><dt>Project status</dt><dd>{record.lifecycle}</dd><dt>Evidence status</dt><dd>{record.evidenceStatus}</dd><dt>Owner / attribution</dt><dd>{record.owner}</dd><dt>Last source review</dt><dd>{record.lastReviewed}</dd><dt>Limitations</dt><dd>{record.limitations}</dd></dl>
      <details><summary>Sources and reproducibility record</summary><dl><dt>Source revision</dt><dd>{record.sourceRevision}</dd><dt>Reproduction / missing evidence</dt><dd>{record.reproduction}</dd></dl>
      {record.repository ? <p><a href={record.repository}>Source repository ↗</a></p> : <p>No source repository confirmed for this record.</p>}
      <ul>{record.evidence.map(e=><li key={e.url}><a href={e.url}>{e.label} ↗</a></li>)}</ul></details>
      {record.deployment ? <p><a href={record.deployment}>Open this work ↗</a></p> : <p style={{color:"#c8d4e2"}}>No production deployment asserted.</p>}
    </article>)}</div>
    {!filtered.length && <p>No matching workstreams. Clear the search or choose another filter.</p>}
  </section>
}

