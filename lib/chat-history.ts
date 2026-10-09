export type ChatTurn = { role: "user" | "assistant"; content: string }
const MAX_TURNS = 20
const MAX_CONTENT = 4000
const MAX_TOTAL = 32000

// Build context only from completed exchanges. Failed/pending sends and UI error
// notices are excluded, so retries do not duplicate the current user message.
export function completedChatHistory(conversation: { role: string; content: string }[]): ChatTurn[] {
  const pairs: ChatTurn[] = []
  let pending: string | undefined
  for (const turn of conversation) {
    if (turn.role === "user") pending = turn.content
    else if (turn.role === "resona" && pending !== undefined) {
      pairs.push({ role: "user", content: pending }, { role: "assistant", content: turn.content })
      pending = undefined
    }
  }
  let result = pairs.slice(-MAX_TURNS)
  while (result.length && (result.some(t => t.content.length > MAX_CONTENT) || result.reduce((n, t) => n + t.content.length, 0) > MAX_TOTAL)) {
    result = result.slice(2)
  }
  return result
}

export function validateChatHistory(value: unknown):
  | { ok: true; messages: ChatTurn[] }
  | { ok: false; error: string } {
  const invalid = { ok: false as const, error: "History must contain at most 10 completed user/assistant exchanges within 32,000 characters." }
  if (!Array.isArray(value) || value.length > MAX_TURNS || value.length % 2 !== 0) return invalid
  let total = 0
  const messages: ChatTurn[] = []
  for (let i = 0; i < value.length; i++) {
    const turn = value[i]
    const role = i % 2 === 0 ? "user" : "assistant"
    if (!turn || typeof turn !== "object" || turn.role !== role || typeof turn.content !== "string" || !turn.content.trim() || turn.content.length > MAX_CONTENT) return invalid
    total += turn.content.length
    if (total > MAX_TOTAL) return invalid
    messages.push({ role, content: turn.content })
  }
  return { ok: true, messages }
}
