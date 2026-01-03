-- Resona Dashboard Database Schema
-- Compatible with Postgres / Neon / Supabase

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_type TEXT CHECK (actor_type IN ('human','agent')) NOT NULL,
  actor_id TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  ended_at TIMESTAMPTZ
);

CREATE INDEX idx_sessions_actor ON sessions(actor_type, actor_id);
CREATE INDEX idx_sessions_started ON sessions(started_at DESC);

-- Events table (the spine)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  ts TIMESTAMPTZ DEFAULT now() NOT NULL,
  actor TEXT NOT NULL,
  event_type TEXT NOT NULL,
  goal_id TEXT,
  state_hash_before TEXT,
  state_hash_after TEXT,
  payload JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_events_session ON events(session_id, ts DESC);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_goal ON events(goal_id) WHERE goal_id IS NOT NULL;

-- Checkpoints table
CREATE TABLE IF NOT EXISTS checkpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  ts TIMESTAMPTZ DEFAULT now() NOT NULL,
  goal_statement TEXT NOT NULL,
  constraints JSONB DEFAULT '[]'::jsonb,
  plan_step TEXT,
  summary TEXT,
  coherence_estimate FLOAT,
  coherence_confidence TEXT CHECK (coherence_confidence IN ('low','medium','high')),
  restore_instructions TEXT
);

CREATE INDEX idx_checkpoints_session ON checkpoints(session_id, ts DESC);

-- Return Mappings table
CREATE TABLE IF NOT EXISTS return_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  ts TIMESTAMPTZ DEFAULT now() NOT NULL,
  status TEXT CHECK (status IN ('valid','weak','failed')) NOT NULL,
  reconstruction JSONB NOT NULL,
  failure_reason TEXT
);

CREATE INDEX idx_return_mappings_session ON return_mappings(session_id, ts DESC);
CREATE INDEX idx_return_mappings_status ON return_mappings(status);

-- Incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  ts TIMESTAMPTZ DEFAULT now() NOT NULL,
  incident_type TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low','medium','high','critical')) NOT NULL,
  details JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_incidents_session ON incidents(session_id, ts DESC);
CREATE INDEX idx_incidents_severity ON incidents(severity);
