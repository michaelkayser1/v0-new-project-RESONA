"use client"

import { useId, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Info } from "lucide-react"
import { qoteOverview } from "@/lib/qote-overview"

interface QOTEInfoProps {
  expanded?: boolean
}

export default function QOTEInfo({ expanded = false }: QOTEInfoProps) {
  const [isExpanded, setIsExpanded] = useState(expanded)
  const contentId = useId()

  return (
    <Card className="border-slate-200 bg-slate-50 text-slate-900">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Info className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
            <div>
              <CardTitle className="text-lg text-slate-900">What is QOTE?</CardTitle>
              <p className="text-sm text-slate-600">Experimental research and this chat</p>
            </div>
          </div>
          {!expanded && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(value => !value)}
              aria-expanded={isExpanded}
              aria-controls={contentId}
              aria-label={isExpanded ? "Collapse QOTE overview" : "Expand QOTE overview"}
              className="h-11 w-11 shrink-0 text-blue-700 hover:bg-blue-100"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
            </Button>
          )}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent id={contentId} className="space-y-4 text-sm leading-relaxed text-slate-700">
          <p>{qoteOverview.description}</p>
          <div className="space-y-2">
            {qoteOverview.principles.map(principle => (
              <details key={principle.title} className="rounded-lg border border-slate-200 bg-white p-3">
                <summary className="cursor-pointer font-medium text-slate-900">{principle.title}</summary>
                <p className="mt-2">{principle.description}</p>
              </details>
            ))}
          </div>
          <section aria-label="Resona chat capabilities" className="space-y-2">
            <h3 className="font-semibold text-slate-900">What this chat does</h3>
            <p>{qoteOverview.resonaIntegration.description}</p>
          </section>
          <section aria-label="Separate governance research" className="space-y-2">
            <h3 className="font-semibold text-slate-900">Resona-OS is separate</h3>
            <p>{qoteOverview.fieldDescription}</p>
          </section>
        </CardContent>
      )}
    </Card>
  )
}
