// Database types for Resona Dashboard

export type ActorType = 'human' | 'agent';

export type CoherenceConfidence = 'low' | 'medium' | 'high';

export type ReturnMappingStatus = 'valid' | 'weak' | 'failed';

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface Session {
  id: string;
  actor_type: ActorType;
  actor_id: string;
  started_at: string;
  ended_at: string | null;
}

export interface Event {
  id: string;
  session_id: string;
  ts: string;
  actor: string;
  event_type: string;
  goal_id: string | null;
  state_hash_before: string | null;
  state_hash_after: string | null;
  payload: Record<string, any>;
}

export interface Checkpoint {
  id: string;
  session_id: string;
  ts: string;
  goal_statement: string;
  constraints: string[];
  plan_step: string | null;
  summary: string | null;
  coherence_estimate: number | null;
  coherence_confidence: CoherenceConfidence | null;
  restore_instructions: string | null;
}

export interface ReturnMapping {
  id: string;
  session_id: string;
  ts: string;
  status: ReturnMappingStatus;
  reconstruction: {
    goal_reconstruction: string;
    constraints_reconstruction: string[];
    state_delta: string;
    why_next_action_follows: string;
    stop_condition: string;
  };
  failure_reason: string | null;
}

export interface Incident {
  id: string;
  session_id: string;
  ts: string;
  incident_type: string;
  severity: IncidentSeverity;
  details: Record<string, any>;
}

// Event payload types
export interface InterruptPayload {
  type: 'interrupt';
  source: string;
  duration_seconds: number;
  recovered: boolean;
}

export interface ToolCallPayload {
  type: 'tool_call';
  tool: string;
  query?: string;
  attempt: number;
  result?: any;
}

export interface CheckpointPayload {
  type: 'checkpoint';
  checkpoint_id: string;
}

export interface RollbackPayload {
  type: 'rollback';
  from_checkpoint_id: string;
  to_checkpoint_id: string;
  reason: string;
}

export interface AlertPayload {
  type: 'alert';
  alert_type: 'fragmentation' | 'rigidity' | 'return_failure';
  message: string;
}
