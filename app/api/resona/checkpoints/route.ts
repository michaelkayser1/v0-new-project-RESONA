// Checkpoints API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '@/lib/db/client';
import { estimateCheckpointCoherence } from '@/lib/coherence/calculator';
import type { Checkpoint } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    const checkpointId = searchParams.get('id');
    const limit = parseInt(searchParams.get('limit') || '20');

    const sql = getDb();

    if (checkpointId) {
      // Get specific checkpoint
      const result = await sql`
        SELECT * FROM checkpoints WHERE id = ${checkpointId}
      `;

      if (result.length === 0) {
        return NextResponse.json(
          { error: 'Checkpoint not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(result[0]);
    } else if (sessionId) {
      // Get checkpoints for session
      const result = await sql`
        SELECT * FROM checkpoints
        WHERE session_id = ${sessionId}
        ORDER BY ts DESC
        LIMIT ${limit}
      `;

      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { error: 'session_id or id is required' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Checkpoints GET error:', error);
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
      goal_statement,
      constraints,
      plan_step,
      summary,
      restore_instructions,
    } = body;

    if (!session_id || !goal_statement) {
      return NextResponse.json(
        { error: 'session_id and goal_statement are required' },
        { status: 400 }
      );
    }

    const sql = getDb();

    // Get recent events for coherence estimate
    const recentEvents = await sql`
      SELECT * FROM events
      WHERE session_id = ${session_id}
      ORDER BY ts DESC
      LIMIT 50
    `;

    // Calculate coherence estimate
    const { score, confidence } = estimateCheckpointCoherence(recentEvents);

    const id = uuidv4();

    const result = await sql`
      INSERT INTO checkpoints (
        id, session_id, goal_statement, constraints, plan_step,
        summary, coherence_estimate, coherence_confidence, restore_instructions
      )
      VALUES (
        ${id}, ${session_id}, ${goal_statement}, ${JSON.stringify(constraints || [])},
        ${plan_step || null}, ${summary || null}, ${score}, ${confidence},
        ${restore_instructions || null}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Checkpoints POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
