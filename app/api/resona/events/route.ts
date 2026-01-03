// Events API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '@/lib/db/client';
import type { Event } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    const eventType = searchParams.get('event_type');
    const limit = parseInt(searchParams.get('limit') || '100');

    const sql = getDb();

    let query;
    if (sessionId && eventType) {
      query = sql`
        SELECT * FROM events
        WHERE session_id = ${sessionId} AND event_type = ${eventType}
        ORDER BY ts DESC
        LIMIT ${limit}
      `;
    } else if (sessionId) {
      query = sql`
        SELECT * FROM events
        WHERE session_id = ${sessionId}
        ORDER BY ts DESC
        LIMIT ${limit}
      `;
    } else {
      query = sql`
        SELECT * FROM events
        ORDER BY ts DESC
        LIMIT ${limit}
      `;
    }

    const result = await query;
    return NextResponse.json(result);
  } catch (error) {
    console.error('Events GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      session_id,
      actor,
      event_type,
      goal_id,
      state_hash_before,
      state_hash_after,
      payload,
    } = body;

    if (!session_id || !actor || !event_type) {
      return NextResponse.json(
        { error: 'session_id, actor, and event_type are required' },
        { status: 400 }
      );
    }

    const sql = getDb();
    const id = uuidv4();

    const result = await sql`
      INSERT INTO events (
        id, session_id, actor, event_type, goal_id,
        state_hash_before, state_hash_after, payload
      )
      VALUES (
        ${id}, ${session_id}, ${actor}, ${event_type}, ${goal_id || null},
        ${state_hash_before || null}, ${state_hash_after || null}, ${JSON.stringify(payload || {})}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Events POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
