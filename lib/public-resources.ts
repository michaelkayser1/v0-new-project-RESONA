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
    const isNotebook = ["notebooklm.google.com", "notebooklm.google"].includes(parsed.hostname) && /^\/notebook\/[a-zA-Z0-9-]+\/?$/.test(parsed.pathname)
    const isShareLink = parsed.hostname === "notebooklm.link.google" && /^\/[a-zA-Z0-9]{12}$/.test(parsed.pathname)
    if (parsed.protocol !== "https:" || !(isNotebook || isShareLink) || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.port) return null
    return { id: "notebook", title: "Michael Kayser’s research notebook", category: "Notebook", description: "Open the shared notebook. Access is controlled by the notebook owner and may require a Google account.", href: parsed.href, action: "Open notebook" }
  } catch { return null }
}

// Owner-supplied share links, in the order received on October 9, 2026.
// Titles could not be retrieved; numbers do not imply a topic or source mapping.
export const sharedNotebooks: PublicResource[] = [
  { id: "notebook-01", title: "Shared notebook 01", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/DVE6I3WWersL", action: "Open notebook" },
  { id: "notebook-02", title: "Shared notebook 02", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/hWrQR5dHlw5J", action: "Open notebook" },
  { id: "notebook-03", title: "Shared notebook 03", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/aSZtMLXCkmlU", action: "Open notebook" },
  { id: "notebook-04", title: "Shared notebook 04", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/T55NO50FCJe3", action: "Open notebook" },
  { id: "notebook-05", title: "Shared notebook 05", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/f3NJPcaXGxlL", action: "Open notebook" },
  { id: "notebook-06", title: "Shared notebook 06", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/jMojMtfthUWd", action: "Open notebook" },
  { id: "notebook-07", title: "Shared notebook 07", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/mpkwSO6DGgpl", action: "Open notebook" },
  { id: "notebook-08", title: "Shared notebook 08", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/rLrYgklkU6Db", action: "Open notebook" },
  { id: "notebook-09", title: "Shared notebook 09", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/u1ItCaJaa67o", action: "Open notebook" },
  { id: "notebook-10", title: "Shared notebook 10", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/mSW64u0qOpI1", action: "Open notebook" },
  { id: "notebook-11", title: "Shared notebook 11", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/xYa8Hoy0E6Sy", action: "Open notebook" },
  { id: "notebook-12", title: "Shared notebook 12", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/yhlD0fHfa7j2", action: "Open notebook" },
  { id: "notebook-13", title: "Shared notebook 13", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/zyptYxL9b8EZ", action: "Open notebook" },
  { id: "notebook-14", title: "Shared notebook 14", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/Xn2rZXxaU0fC", action: "Open notebook" },
  { id: "notebook-15", title: "Shared notebook 15", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/ohPfW7EcZ275", action: "Open notebook" },
  { id: "notebook-16", title: "Shared notebook 16", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/AOxRvsOjIJvM", action: "Open notebook" },
  { id: "notebook-17", title: "Shared notebook 17", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/aQMX5E3T782V", action: "Open notebook" },
  { id: "notebook-18", title: "Shared notebook 18", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/95wNxKyIYNxO", action: "Open notebook" },
  { id: "notebook-19", title: "Shared notebook 19", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/ViBN6zSfSALu", action: "Open notebook" },
  { id: "notebook-20", title: "Shared notebook 20", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/RJ3UxNjg6r78", action: "Open notebook" },
  { id: "notebook-21", title: "Shared notebook 21", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/fo4r1GrgAYAc", action: "Open notebook" },
  { id: "notebook-22", title: "Shared notebook 22", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/Dl2k8HJSa9tb", action: "Open notebook" },
  { id: "notebook-23", title: "Shared notebook 23", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/16l4XVDx2xaX", action: "Open notebook" },
  { id: "notebook-24", title: "Shared notebook 24", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/KQFLvxZfbhkD", action: "Open notebook" },
  { id: "notebook-25", title: "Shared notebook 25", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/NdSFd1m2It2y", action: "Open notebook" },
  { id: "notebook-26", title: "Shared notebook 26", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/OO0xN62wpjW4", action: "Open notebook" },
  { id: "notebook-27", title: "Shared notebook 27", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/QM3tVfVeRDrC", action: "Open notebook" },
  { id: "notebook-28", title: "Shared notebook 28", category: "Notebook", description: "Notebook link supplied by Michael Kayser. Open in Google to see its title and contents; access follows the notebook’s sharing settings.", href: "https://notebooklm.link.google/Eg4CQjOWS28b", action: "Open notebook" },
]

export function allPublicResources(optionalNotebookUrl?: string): PublicResource[] {
  const extra = publicNotebookResource(optionalNotebookUrl)
  const resources = [...publicResources, ...sharedNotebooks]
  return extra && !resources.some(resource => resource.href === extra.href) ? [...resources, extra] : resources
}
