"use client"
import { useMemo, useState } from "react"
import catalog from "@/public/provenance/vercel-apps.json"

export default function AppsExplorer() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [access, setAccess] = useState("All")
  const [limit, setLimit] = useState(24)
  const categories = ["All", ...Array.from(new Set(catalog.apps.map(app => app.category))).sort()]
  const filtered = useMemo(() => catalog.apps.filter(app =>
    (category === "All" || app.category === category) &&
    (access === "All" || (access === "Public links" ? !app.accessRestricted && !!app.url : app.accessRestricted)) &&
    query.trim().toLowerCase().split(/\s+/).every(term => (app.title + " " + app.name + " " + app.category).toLowerCase().includes(term))
  ), [query, category, access])
  return <div className="apps-explorer">
    <style>{`
      .apps-explorer { color:#f5f4ef; font-family:system-ui,sans-serif }
      .apps-controls { display:flex;flex-wrap:wrap;gap:12px;margin:28px 0 20px }
      .apps-controls label { display:flex;flex-direction:column;gap:7px;font-size:13px;color:#c8d4e2 }
      .apps-controls input,.apps-controls select { min-height:46px;background:#17263e;color:#f5f4ef;border:1px solid #52627b;border-radius:10px;padding:10px 14px;font-size:16px;width:100% }
      .apps-controls input:focus-visible,.apps-controls select:focus-visible,.apps-explorer a:focus-visible,.apps-explorer button:focus-visible { outline:3px solid #edce8c;outline-offset:4px }
      .apps-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,285px),1fr));gap:16px }
      .apps-card { border:1px solid #34445b;background:#112039;border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:12px;min-width:0 }
      .apps-card h2 { font-size:21px;line-height:1.3;margin:0;overflow-wrap:anywhere }
      .apps-card p { font-size:13px;line-height:1.6;color:#c8d4e2;margin:0;overflow-wrap:anywhere }
      .apps-card a { color:#edce8c;display:inline-flex;align-items:center;min-height:44px;margin-top:auto;text-decoration:underline }
      .apps-tag { color:#edce8c;font-size:11px;letter-spacing:1px;text-transform:uppercase }
      .apps-load { background:#edce8c;color:#0b1528;border:0;padding:14px 26px;border-radius:10px;min-height:46px;font-weight:700;cursor:pointer;margin-top:28px }
    `}</style>
    <div className="apps-controls">
      <label style={{flex:"1 1 300px"}}>Search apps<input type="search" value={query} placeholder="Try witness, oscillator, clinical…" onChange={e=>{setQuery(e.target.value);setLimit(24)}} /></label>
      <label style={{flex:"1 1 190px"}}>Collection<select value={category} onChange={e=>{setCategory(e.target.value);setLimit(24)}}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
      <label style={{flex:"1 1 170px"}}>Access<select value={access} onChange={e=>{setAccess(e.target.value);setLimit(24)}}><option>All</option><option>Public links</option><option>Access controlled</option></select></label>
    </div>
    <p role="status" aria-live="polite" style={{color:"#c8d4e2",marginBottom:20}}>Showing {Math.min(limit,filtered.length)} of {filtered.length} apps · inventory checked {catalog.observedOn}</p>
    <div className="apps-grid">{filtered.slice(0,limit).map(app=><article className="apps-card" key={app.id}>
      <span className="apps-tag">{app.category}</span><h2>{app.title}</h2>
      <p>{app.name}</p><p>Built with v0 AI · Michael Kayser’s development collection</p>
      <p>{app.buildState === "READY" ? "Latest recorded build completed" : "Latest recorded build: " + app.buildState} · {app.accessRestricted ? "Access controlled" : app.url ? "Production link" : "No production link recorded"}</p>
      <p>Updated {app.updatedOn}. {app.accessRestricted ? "Opening this app may require an authorized Vercel account." : "Availability and behavior may change."}</p>
      {app.url ? <a href={app.url} target="_blank" rel="noopener noreferrer">{app.accessRestricted ? "Open app — access may be required ↗" : "Explore app ↗"}</a> : <p>Link pending</p>}
    </article>)}</div>
    {!filtered.length && <p>No apps match. Try another search or collection.</p>}
    {filtered.length>limit && <button className="apps-load" type="button" onClick={()=>setLimit(n=>n+24)}>Show 24 more apps</button>}
  </div>
}
