import { qoteOverview } from "@/lib/qote-overview"

export async function GET() {
  return Response.json(qoteOverview)
}
