// Health check endpoint for Resona API
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const checks = {
    api: 'ok',
    timestamp: new Date().toISOString(),
    database: 'unknown',
    tables: [] as string[],
  };

  // Check database connection
  try {
    const { getDb } = await import('@/lib/db/client');
    const sql = getDb();

    // Test query
    await sql`SELECT 1 as test`;
    checks.database = 'connected';

    // Check if tables exist
    const result = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('sessions', 'events', 'checkpoints', 'return_mappings', 'incidents')
      ORDER BY table_name
    `;

    checks.tables = result.map((row: any) => row.table_name);
  } catch (error: any) {
    checks.database = `error: ${error.message}`;
  }

  const allTablesExist = checks.tables.length === 5;
  const status = checks.database === 'connected' && allTablesExist ? 200 : 503;

  return NextResponse.json({
    status: status === 200 ? 'healthy' : 'degraded',
    checks,
    required_tables: ['sessions', 'events', 'checkpoints', 'return_mappings', 'incidents'],
    missing_tables: ['sessions', 'events', 'checkpoints', 'return_mappings', 'incidents'].filter(
      t => !checks.tables.includes(t)
    ),
  }, { status });
}
