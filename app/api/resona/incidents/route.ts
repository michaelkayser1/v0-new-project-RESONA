// Incidents API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '@/lib/db/client';
import type { Incident } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    const severity = searchParams.get('severity');
    const limit = parseInt(searchParams.get('limit') || '50');

    const sql = getDb();

    let query;
    if (sessionId && severity) {
      query = sql`
        SELECT * FROM incidents
        WHERE session_id = ${sessionId} AND severity = ${severity}
        ORDER BY ts DESC
        LIMIT ${limit}
      `;
    } else if (sessionId) {
      query = sql`
        SELECT * FROM incidents
        WHERE session_id = ${sessionId}
        ORDER BY ts DESC
        LIMIT ${limit}
      `;
    } else {
      query = sql`
        SELECT * FROM incidents
        ORDER BY ts DESC
        LIMIT ${limit}
      `;
    }

    const result = await query;
    return NextResponse.json(result);
  } catch (error) {
    console.error('Incidents GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, incident_type, severity, details } = body;

    if (!session_id || !incident_type || !severity) {
      return NextResponse.json(
        { error: 'session_id, incident_type, and severity are required' },
        { status: 400 }
      );
    }

    if (!['low', 'medium', 'high', 'critical'].includes(severity)) {
      return NextResponse.json(
        { error: 'severity must be low, medium, high, or critical' },
        { status: 400 }
      );
    }

    const sql = getDb();
    const id = uuidv4();

    const result = await sql`
      INSERT INTO incidents (id, session_id, incident_type, severity, details)
      VALUES (${id}, ${session_id}, ${incident_type}, ${severity}, ${JSON.stringify(details || {})})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Incidents POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
