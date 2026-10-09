import { POST as chatPost } from "../resona-chat/route"
export const maxDuration = 30
export const POST = chatPost

export async function GET(request: Request) {
  if (new URL(request.url).searchParams.has("action")) {
    return Response.json({ error: "Legacy persistent sessions and analytics are retired. Use /chat for temporary conversation context.", retryable: false }, { status: 410 })
  }
  return Response.json({ status: "Compatibility alias for /api/resona-chat", version: "1.4.0", durableMemory: false })
}
