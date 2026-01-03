// Research Export API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/client';
import { generateResearchExport, toJSONL, toCSV } from '@/lib/research/export-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      session_ids,
      start_date,
      end_date,
      format = 'json', // 'json' | 'jsonl' | 'csv'
      anonymize = true,
      include_payloads = false,
    } = body;

    const sql = getDb();

    // Generate export
    const exportData = await generateResearchExport(sql, {
      sessionIds: session_ids,
      startDate: start_date ? new Date(start_date) : undefined,
      endDate: end_date ? new Date(end_date) : undefined,
      anonymize,
      includePayloads: include_payloads,
    });

    // Return based on format
    if (format === 'jsonl') {
      // JSONL format (one JSON per line)
      const files = {
        'metadata.json': JSON.stringify(exportData.metadata, null, 2),
        'sessions.jsonl': toJSONL(exportData.sessions),
        'events.jsonl': toJSONL(exportData.events),
        'checkpoints.jsonl': toJSONL(exportData.checkpoints),
        'return_mappings.jsonl': toJSONL(exportData.return_mappings),
        'incidents.jsonl': toJSONL(exportData.incidents),
      };

      return NextResponse.json({
        format: 'jsonl',
        files,
        metadata: exportData.metadata,
      });
    } else if (format === 'csv') {
      // CSV format
      const files = {
        'metadata.json': JSON.stringify(exportData.metadata, null, 2),
        'sessions.csv': toCSV(exportData.sessions, ['id', 'actor_type', 'actor_id', 'started_at', 'ended_at']),
        'events.csv': toCSV(exportData.events, ['id', 'session_id', 'ts', 'actor', 'event_type', 'goal_id']),
        'checkpoints.csv': toCSV(exportData.checkpoints, ['id', 'session_id', 'ts', 'goal_statement', 'coherence_estimate', 'coherence_confidence']),
        'return_mappings.csv': toCSV(exportData.return_mappings, ['id', 'session_id', 'ts', 'status', 'failure_reason']),
        'incidents.csv': toCSV(exportData.incidents, ['id', 'session_id', 'ts', 'incident_type', 'severity']),
      };

      return NextResponse.json({
        format: 'csv',
        files,
        metadata: exportData.metadata,
      });
    } else {
      // JSON format (default)
      return NextResponse.json(exportData);
    }
  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Export failed', message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Get export metadata without full data
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    const sql = getDb();

    let sessions;
    if (sessionId) {
      sessions = await sql`
        SELECT id, actor_type, actor_id, started_at, ended_at
        FROM sessions
        WHERE id = ${sessionId}
      `;
    } else {
      sessions = await sql`
        SELECT id, actor_type, actor_id, started_at, ended_at
        FROM sessions
        ORDER BY started_at DESC
        LIMIT 100
      `;
    }

    // Get counts
    const counts = await Promise.all(
      sessions.map(async (session) => {
        const events = await sql`SELECT COUNT(*) as count FROM events WHERE session_id = ${session.id}`;
        const checkpoints = await sql`SELECT COUNT(*) as count FROM checkpoints WHERE session_id = ${session.id}`;
        const returnMappings = await sql`SELECT COUNT(*) as count FROM return_mappings WHERE session_id = ${session.id}`;
        const incidents = await sql`SELECT COUNT(*) as count FROM incidents WHERE session_id = ${session.id}`;

        return {
          session_id: session.id,
          actor_type: session.actor_type,
          actor_id: session.actor_id,
          started_at: session.started_at,
          ended_at: session.ended_at,
          counts: {
            events: parseInt(events[0].count),
            checkpoints: parseInt(checkpoints[0].count),
            return_mappings: parseInt(returnMappings[0].count),
            incidents: parseInt(incidents[0].count),
          },
        };
      })
    );

    return NextResponse.json({ sessions: counts });
  } catch (error: any) {
    console.error('Export metadata error:', error);
    return NextResponse.json(
      { error: 'Failed to get export metadata', message: error.message },
      { status: 500 }
    );
  }
}
