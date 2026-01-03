// Research Export Service
// Generates anonymized, reproducible research datasets from session data

import type { DbClient } from '../db/client';
import type { Session, Event, Checkpoint, ReturnMapping, Incident } from '../db/types';
import { COHERENCE_LOWER_BOUND, COHERENCE_UPPER_BOUND } from '../coherence/calculator';
import { v4 as uuidv4 } from 'uuid';

export interface ExportMetadata {
  export_id: string;
  export_timestamp: string;
  system_version: string;
  data_version: string;
  anonymization_applied: boolean;
  session_count: number;
  event_count: number;
  time_range: {
    start: string;
    end: string;
  };
  coherence_parameters: {
    lower_bound: number;
    upper_bound: number;
    corridor_type: string;
  };
  metric_definitions: {
    coherence: string;
    orientation: string;
    interrupt_cost: string;
    volatility: string;
    drift: string;
    contradiction_rate: string;
  };
  validation_thresholds: {
    min_goal_similarity: number;
    min_continuity_score: number;
  };
}

export interface ExportOptions {
  sessionIds?: string[];
  startDate?: Date;
  endDate?: Date;
  anonymize?: boolean;
  includePayloads?: boolean;
}

export interface ResearchExport {
  metadata: ExportMetadata;
  sessions: Session[];
  events: Event[];
  checkpoints: Checkpoint[];
  return_mappings: ReturnMapping[];
  incidents: Incident[];
}

/**
 * Generate complete research export with metadata
 */
export async function generateResearchExport(
  sql: DbClient,
  options: ExportOptions = {}
): Promise<ResearchExport> {
  const {
    sessionIds,
    startDate,
    endDate,
    anonymize = true,
    includePayloads = false,
  } = options;

  // Fetch data
  let sessions: Session[];
  let events: Event[];
  let checkpoints: Checkpoint[];
  let returnMappings: ReturnMapping[];
  let incidents: Incident[];

  if (sessionIds && sessionIds.length > 0) {
    // Export specific sessions
    sessions = await sql`
      SELECT * FROM sessions
      WHERE id = ANY(${sessionIds})
      ORDER BY started_at
    `;

    events = await sql`
      SELECT * FROM events
      WHERE session_id = ANY(${sessionIds})
      ORDER BY ts
    `;

    checkpoints = await sql`
      SELECT * FROM checkpoints
      WHERE session_id = ANY(${sessionIds})
      ORDER BY ts
    `;

    returnMappings = await sql`
      SELECT * FROM return_mappings
      WHERE session_id = ANY(${sessionIds})
      ORDER BY ts
    `;

    incidents = await sql`
      SELECT * FROM incidents
      WHERE session_id = ANY(${sessionIds})
      ORDER BY ts
    `;
  } else {
    // Export by date range
    const start = startDate || new Date(0);
    const end = endDate || new Date();

    sessions = await sql`
      SELECT * FROM sessions
      WHERE started_at >= ${start.toISOString()}
        AND started_at <= ${end.toISOString()}
      ORDER BY started_at
    `;

    const sessionIdsFromRange = sessions.map(s => s.id);

    if (sessionIdsFromRange.length > 0) {
      events = await sql`
        SELECT * FROM events
        WHERE session_id = ANY(${sessionIdsFromRange})
        ORDER BY ts
      `;

      checkpoints = await sql`
        SELECT * FROM checkpoints
        WHERE session_id = ANY(${sessionIdsFromRange})
        ORDER BY ts
      `;

      returnMappings = await sql`
        SELECT * FROM return_mappings
        WHERE session_id = ANY(${sessionIdsFromRange})
        ORDER BY ts
      `;

      incidents = await sql`
        SELECT * FROM incidents
        WHERE session_id = ANY(${sessionIdsFromRange})
        ORDER BY ts
      `;
    } else {
      events = [];
      checkpoints = [];
      returnMappings = [];
      incidents = [];
    }
  }

  // Anonymize if requested
  if (anonymize) {
    sessions = anonymizeSessions(sessions);
    events = anonymizeEvents(events, includePayloads);
    checkpoints = anonymizeCheckpoints(checkpoints);
    returnMappings = anonymizeReturnMappings(returnMappings);
    incidents = anonymizeIncidents(incidents);
  }

  // Generate metadata
  const metadata = generateMetadata(sessions, events);

  return {
    metadata,
    sessions,
    events,
    checkpoints,
    return_mappings: returnMappings,
    incidents,
  };
}

/**
 * Anonymize sessions (replace actor_id with hash)
 */
function anonymizeSessions(sessions: Session[]): Session[] {
  const actorMap = new Map<string, string>();
  let actorCounter = 1;

  return sessions.map(session => {
    if (!actorMap.has(session.actor_id)) {
      actorMap.set(session.actor_id, `actor_${actorCounter++}`);
    }

    return {
      ...session,
      actor_id: actorMap.get(session.actor_id)!,
    };
  });
}

/**
 * Anonymize events (remove PII from payloads)
 */
function anonymizeEvents(events: Event[], includePayloads: boolean): Event[] {
  return events.map(event => ({
    ...event,
    actor: anonymizeActorName(event.actor),
    payload: includePayloads ? sanitizePayload(event.payload) : {},
  }));
}

/**
 * Anonymize checkpoints (sanitize goal statements)
 */
function anonymizeCheckpoints(checkpoints: Checkpoint[]): Checkpoint[] {
  return checkpoints.map(checkpoint => ({
    ...checkpoint,
    goal_statement: sanitizeText(checkpoint.goal_statement),
    summary: checkpoint.summary ? sanitizeText(checkpoint.summary) : null,
    restore_instructions: checkpoint.restore_instructions
      ? sanitizeText(checkpoint.restore_instructions)
      : null,
  }));
}

/**
 * Anonymize return mappings
 */
function anonymizeReturnMappings(mappings: ReturnMapping[]): ReturnMapping[] {
  return mappings.map(mapping => ({
    ...mapping,
    reconstruction: {
      ...mapping.reconstruction,
      goal_reconstruction: sanitizeText(mapping.reconstruction.goal_reconstruction),
      state_delta: sanitizeText(mapping.reconstruction.state_delta),
      why_next_action_follows: sanitizeText(mapping.reconstruction.why_next_action_follows),
      stop_condition: sanitizeText(mapping.reconstruction.stop_condition),
    },
  }));
}

/**
 * Anonymize incidents
 */
function anonymizeIncidents(incidents: Incident[]): Incident[] {
  return incidents.map(incident => ({
    ...incident,
    details: sanitizePayload(incident.details),
  }));
}

/**
 * Sanitize text by removing potential PII
 */
function sanitizeText(text: string): string {
  // Remove email addresses
  let sanitized = text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]');

  // Remove phone numbers
  sanitized = sanitized.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]');

  // Remove URLs (but keep structure)
  sanitized = sanitized.replace(/https?:\/\/[^\s]+/g, '[URL]');

  // Remove potential names (simple heuristic: capitalized words)
  // This is conservative - only removes obvious patterns
  sanitized = sanitized.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, '[NAME]');

  return sanitized;
}

/**
 * Sanitize payload objects
 */
function sanitizePayload(payload: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizePayload(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Anonymize actor names
 */
function anonymizeActorName(actor: string): string {
  // Simple hash-based anonymization
  const hash = actor.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);

  return `actor_${Math.abs(hash) % 10000}`;
}

/**
 * Generate export metadata
 */
function generateMetadata(sessions: Session[], events: Event[]): ExportMetadata {
  const now = new Date().toISOString();

  // Calculate time range
  const timestamps = [
    ...sessions.map(s => new Date(s.started_at).getTime()),
    ...events.map(e => new Date(e.ts).getTime()),
  ].filter(t => !isNaN(t));

  const startTime = timestamps.length > 0 ? Math.min(...timestamps) : Date.now();
  const endTime = timestamps.length > 0 ? Math.max(...timestamps) : Date.now();

  return {
    export_id: uuidv4(),
    export_timestamp: now,
    system_version: '2.0.0',
    data_version: '1.0.0',
    anonymization_applied: true,
    session_count: sessions.length,
    event_count: events.length,
    time_range: {
      start: new Date(startTime).toISOString(),
      end: new Date(endTime).toISOString(),
    },
    coherence_parameters: {
      lower_bound: COHERENCE_LOWER_BOUND,
      upper_bound: COHERENCE_UPPER_BOUND,
      corridor_type: 'QOTE (φ⁻¹ to 2/3)',
    },
    metric_definitions: {
      coherence: 'C(S) = (orientation × interruptResistance × stability) - drift - contradictions',
      orientation: 'Goal alignment ratio [0,1]',
      interrupt_cost: 'Normalized average interrupt duration [0,1]',
      volatility: 'Coefficient of variation of event rate [0,1]',
      drift: 'Goal change frequency over time [0,1]',
      contradiction_rate: 'Tool call retry loop frequency [0,1]',
    },
    validation_thresholds: {
      min_goal_similarity: 0.7,
      min_continuity_score: 0.6,
    },
  };
}

/**
 * Convert export to JSONL format (one JSON object per line)
 */
export function toJSONL(data: any[]): string {
  return data.map(item => JSON.stringify(item)).join('\n');
}

/**
 * Convert export to CSV format
 */
export function toCSV(data: any[], columns: string[]): string {
  const header = columns.join(',');
  const rows = data.map(item => {
    return columns.map(col => {
      const value = item[col];
      if (value === null || value === undefined) return '';
      if (typeof value === 'object') return JSON.stringify(value).replace(/"/g, '""');
      return String(value).replace(/"/g, '""');
    }).map(v => `"${v}"`).join(',');
  });

  return [header, ...rows].join('\n');
}
