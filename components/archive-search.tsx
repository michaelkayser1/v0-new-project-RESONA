"use client"

import { Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

function SearchInputs({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex max-w-xl gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          className="min-h-[44px] bg-card pl-10 border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <Button variant="outline" className="min-h-[44px] border-border bg-transparent text-foreground hover:bg-muted">
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
    </div>
  )
}

export default function ArchiveSearch({ placeholder = "Search..." }: { placeholder?: string }) {
  return (
    <Suspense fallback={<div className="h-[44px] max-w-xl animate-pulse rounded-md bg-muted" />}>
      <SearchInputs placeholder={placeholder} />
    </Suspense>
  )
}
