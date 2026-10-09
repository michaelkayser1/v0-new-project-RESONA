"use client"

import { useState } from "react"
import { filterResources, type PublicResource, type ResourceCategory } from "@/lib/public-resources"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ArchiveExplorer({ resources, category }: { resources: PublicResource[]; category?: ResourceCategory }) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<ResourceCategory | undefined>(category)
  const [visibleCount, setVisibleCount] = useState(4)
  const filtered = filterResources(resources, query, selected)
  const categories = Array.from(new Set(resources.map(resource => resource.category)))
  const reset = () => { setQuery(""); setSelected(category); setVisibleCount(4) }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1">
          <label htmlFor="archive-query" className="mb-2 block text-sm font-medium">Search public resources</label>
          <Input id="archive-query" type="search" value={query} placeholder="Search titles, descriptions, or categories…" className="min-h-11" onChange={event => { setQuery(event.target.value); setVisibleCount(4) }} />
        </div>
        <Button variant="outline" className="min-h-11" onClick={reset} disabled={!query && selected === category}>Clear search</Button>
      </div>
      {!category && <div className="flex flex-wrap gap-2" role="group" aria-label="Resource categories">
        <Button variant={selected ? "outline" : "default"} aria-pressed={!selected} className="min-h-11" onClick={() => { setSelected(undefined); setVisibleCount(4) }}>All ({resources.length})</Button>
        {categories.map(value => <Button key={value} variant={selected === value ? "default" : "outline"} aria-pressed={selected === value} className="min-h-11" onClick={() => { setSelected(value); setVisibleCount(4) }}>{value} ({resources.filter(resource => resource.category === value).length})</Button>)}
      </div>}
      <p role="status" className="text-sm text-muted-foreground">{filtered.length ? `Showing ${Math.min(visibleCount, filtered.length)} of ${filtered.length} resources` : "No matching public resources."}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        {filtered.slice(0, visibleCount).map(resource => <article key={resource.id} className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-6">
          <p className="mb-2 text-xs uppercase tracking-wider text-primary">{resource.category}</p>
          <h2 className="mb-3 text-xl font-medium">{resource.title}</h2>
          <p className="mb-5 flex-1 text-muted-foreground">{resource.description}</p>
          {resource.provenance && <dl className="mb-5 space-y-2 text-sm text-muted-foreground">
            <div><dt className="font-medium text-foreground">Date shown by Suno</dt><dd>{resource.provenance.displayedDate}</dd></div>
            <div><dt className="font-medium text-foreground">Model shown by Suno</dt><dd>{resource.provenance.displayedModel}</dd></div>
            <div><dt className="font-medium text-foreground">Available playback</dt><dd>{resource.provenance.displayedPlayback}{resource.provenance.preview ? " · Preview" : ""}</dd></div>
            <div><dt className="font-medium text-foreground">Metadata checked</dt><dd>{resource.provenance.observedOn}</dd></div>
            <div><dt className="font-medium text-foreground">Song ID</dt><dd className="break-all font-mono text-xs">{resource.provenance.songId}</dd></div>
          </dl>}
          <a href={resource.href} target={resource.href.startsWith("https:") ? "_blank" : undefined} rel={resource.href.startsWith("https:") ? "noopener noreferrer" : undefined} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">{resource.action}{resource.href.startsWith("https:") ? " ↗" : ""}</a>
        </article>)}
      </div>
      {filtered.length > visibleCount && <Button className="min-h-11" onClick={() => setVisibleCount(value => value + 4)}>Show more resources</Button>}
    </div>
  )
}
