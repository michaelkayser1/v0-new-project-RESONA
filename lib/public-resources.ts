export type ResourceCategory = "Writing" | "Software" | "Music" | "Chat" | "Transcripts" | "Papers" | "Metrics" | "Notebook"
export interface PublicResource {
  id: string
  title: string
  category: ResourceCategory
  description: string
  href: string
  action: string
}

// Public destinations only. No inferred transcript, publication, or track inventories.
export const publicResources: PublicResource[] = [
  { id: "chat", title: "Resona conversational chat", category: "Chat", description: "Ask questions and inspect optional input-text heuristics. Conversation context lasts only while this page stays open.", href: "/chat", action: "Open chat" },
  { id: "governance", title: "Resona-OS governance repository", category: "Software", description: "Source and documentation for the separate AI governance workstream. Consult the repository for its current verification status and limitations.", href: "https://github.com/michaelkayser1/Resona-OS", action: "Open repository" },
  { id: "site-source", title: "Resona website source", category: "Software", description: "The source code, changes, and tests for this website and conversational chat.", href: "https://github.com/michaelkayser1/v0-new-project-RESONA", action: "Open source" },
  { id: "substack", title: "Michael Kayser on Substack", category: "Writing", description: "Essays and project updates published by Michael Kayser. Open the publication to browse current writing.", href: "https://michaelkayser.substack.com", action: "Read on Substack" },
  { id: "validation-essay", title: "I Asked an AI to Validate Its Claims", category: "Writing", description: "An essay shared by Michael Kayser about testing AI claims against evidence.", href: "https://michaelkayser.substack.com/p/i-asked-an-ai-to-validate-its-claims", action: "Read essay" },
  { id: "suno", title: "Michael Kayser on Suno", category: "Music", description: "AI-assisted music from the profile @michaelkayser155 supplied by Michael Kayser. Browse and play available tracks on Suno.", href: "https://suno.com/@michaelkayser155", action: "Listen on Suno" },
]

export function filterResources(resources: PublicResource[], query: string, category?: ResourceCategory) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  return resources.filter(resource => (!category || resource.category === category) && terms.every(term => `${resource.title} ${resource.description} ${resource.category}`.toLocaleLowerCase().includes(term)))
}

// A notebook is added only after the owner supplies its share URL. Never publish
// account-menu URLs, credentials, or turn a private notebook public automatically.
export function publicNotebookResource(url: string | undefined): PublicResource | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== "https:" || !["notebooklm.google.com", "notebooklm.google"].includes(parsed.hostname) || !/^\/notebook\/[a-zA-Z0-9-]+\/?$/.test(parsed.pathname) || parsed.username || parsed.password || parsed.search || parsed.hash) return null
    return { id: "notebook", title: "Michael Kayser’s research notebook", category: "Notebook", description: "Open the shared notebook. Access is controlled by the notebook owner and may require a Google account.", href: parsed.href, action: "Open notebook" }
  } catch { return null }
}
