// Return Mappings API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '@/lib/db/client';
import { validateReturnMapping } from '@/lib/coherence/return-mapping-validator';
import type { ReturnMapping } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    const limit = parseInt(searchParams.get('limit') || '20');

    const sql = getDb();

    if (sessionId) {
      const result = await sql`
        SELECT * FROM return_mappings
        WHERE session_id = ${sessionId}
        ORDER BY ts DESC
        LIMIT ${limit}
      `;

      return NextResponse.json(result);
    } else {
      const result = await sql`
        SELECT * FROM return_mappings
        ORDER BY ts DESC
        LIMIT ${limit}
      `;

      return NextResponse.json(result);
    }
  } catch (error) {
    console.error('Return Mappings GET error:', error);
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
      reconstruction,
      original_goal,
      original_constraints,
      recent_tool_results,
    } = body;

    if (!session_id || !reconstruction) {
      return NextResponse.json(
        { error: 'session_id and reconstruction are required' },
        { status: 400 }
      );
    }

    // Validate the return mapping
    const validation = validateReturnMapping(reconstruction, {
      originalGoal: original_goal || '',
      originalConstraints: original_constraints || [],
      recentToolResults: recent_tool_results,
    });

    const sql = getDb();
    const id = uuidv4();

    const result = await sql`
      INSERT INTO return_mappings (
        id, session_id, status, reconstruction, failure_reason
      )
      VALUES (
        ${id}, ${session_id}, ${validation.status},
        ${JSON.stringify(reconstruction)}, ${validation.failureReason || null}
      )
      RETURNING *
    `;

    // Log incident if validation failed
    if (validation.status === 'failed') {
      await sql`
        INSERT INTO incidents (session_id, incident_type, severity, details)
        VALUES (
          ${session_id},
          'return_mapping_failure',
          'high',
          ${JSON.stringify({ validation })}
        )
      `;
    }

    return NextResponse.json({
      ...result[0],
      validation,
    }, { status: 201 });
  } catch (error) {
    console.error('Return Mappings POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
