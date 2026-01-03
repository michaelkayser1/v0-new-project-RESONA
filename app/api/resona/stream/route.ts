// Real-time SSE stream for dashboard updates
import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db/client';
import { calculateCoherence } from '@/lib/coherence/calculator';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return new Response('session_id is required', { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = async () => {
        try {
          const sql = getDb();

          // Fetch latest events
          const events = await sql`
            SELECT * FROM events
            WHERE session_id = ${sessionId}
            ORDER BY ts DESC
            LIMIT 100
          `;

          // Calculate coherence
          const coherence = calculateCoherence({ events });

          // Fetch latest checkpoint
          const checkpoints = await sql`
            SELECT * FROM checkpoints
            WHERE session_id = ${sessionId}
            ORDER BY ts DESC
            LIMIT 1
          `;

          // Fetch latest return mapping
          const returnMappings = await sql`
            SELECT * FROM return_mappings
            WHERE session_id = ${sessionId}
            ORDER BY ts DESC
            LIMIT 1
          `;

          // Fetch recent incidents
          const incidents = await sql`
            SELECT * FROM incidents
            WHERE session_id = ${sessionId}
            ORDER BY ts DESC
            LIMIT 10
          `;

          const data = {
            coherence,
            latest_checkpoint: checkpoints[0] || null,
            latest_return_mapping: returnMappings[0] || null,
            recent_incidents: incidents,
            event_count: events.length,
            timestamp: new Date().toISOString(),
          };

          const message = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(message));
        } catch (error) {
          console.error('Stream error:', error);
        }
      };

      // Send initial update
      await sendUpdate();

      // Send updates every 2 seconds
      const interval = setInterval(sendUpdate, 2000);

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
