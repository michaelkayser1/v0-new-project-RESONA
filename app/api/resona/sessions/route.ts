// Sessions API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '@/lib/db/client';
import type { Session } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('id');

    const sql = getDb();

    if (sessionId) {
      // Get specific session
      const result = await sql`
        SELECT * FROM sessions WHERE id = ${sessionId}
      `;

      if (result.length === 0) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(result[0]);
    } else {
      // List sessions (most recent first)
      const limit = parseInt(searchParams.get('limit') || '50');
      const result = await sql`
        SELECT * FROM sessions
        ORDER BY started_at DESC
        LIMIT ${limit}
      `;

      return NextResponse.json(result);
    }
  } catch (error) {
    console.error('Sessions GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { actor_type, actor_id } = body;

    if (!actor_type || !actor_id) {
      return NextResponse.json(
        { error: 'actor_type and actor_id are required' },
        { status: 400 }
      );
    }

    if (actor_type !== 'human' && actor_type !== 'agent') {
      return NextResponse.json(
        { error: 'actor_type must be "human" or "agent"' },
        { status: 400 }
      );
    }

    const sql = getDb();
    const id = uuidv4();

    const result = await sql`
      INSERT INTO sessions (id, actor_type, actor_id)
      VALUES (${id}, ${actor_type}, ${actor_id})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Sessions POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Session id is required' },
        { status: 400 }
      );
    }

    const sql = getDb();

    // End the session
    const result = await sql`
      UPDATE sessions
      SET ended_at = now()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Sessions PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
