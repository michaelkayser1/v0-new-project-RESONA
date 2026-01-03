# Resona Dashboard — QOTE Coherence Cockpit

A real-time coherence monitoring system for both human and AI agents, built on QOTE principles.

## Overview

The Resona Dashboard continuously estimates a **Coherence Score C(S)**, enforces a **Coherence Corridor [L, U]**, and validates a **Return Mapping (R)** after meaningful actions.

The system feels like an aircraft cockpit: **minimal, calm, precise, audit-ready**.

## Features

### Core Metrics
- **C(S) Coherence Score**: Real-time calculation based on:
  - Orientation (goal alignment)
  - Interrupt cost (context switching penalty)
  - Volatility (action rate stability)
  - Drift (goal/context changes)
  - Contradiction rate (for agents)

### Coherence Corridor
- Lower bound: **φ⁻¹ (0.618)** — Golden ratio inverse
- Upper bound: **2/3 (0.6667)** — Tertiary stability point
- Below corridor: **Fragmentation risk** (under-coupled)
- Above corridor: **Rigidity risk** (over-coupled)

### Return Mapping Validation
Agent audit line that validates:
1. Goal similarity above threshold
2. Constraints present and accounted for
3. State delta explainable in plain language
4. No contradictions with tool results
5. Stop condition clear and measurable

### Dashboard Layout

#### Top Row — Critical State
- **Coherence Gauge**: Large circular dial with corridor visualization
- **Return Mapping Status**: Valid/Weak/Failed indicator
- **Active Checkpoint Panel**: Goal, constraints, plan step, rollback button

#### Middle Row — Dynamics
- **Interrupt Cost Chart**: Line chart showing interrupt duration over time
- **Volatility & Drift Panel**: Action rate, retry loop detection, drift scores
- **Timeline / Flight Recorder**: Color-coded event stream

#### Bottom Row — Interaction
- **Return Summary Input**: Submit goal, next step, stop condition, constraints
- **Alerts Panel**: Fragmentation, rigidity, return failures, incidents

## Setup

### 1. Database Setup

Create a Postgres database (Neon, Supabase, or any Postgres provider):

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your DATABASE_URL
```

### 2. Run Database Migrations

```bash
# Connect to your database and run the schema
psql $DATABASE_URL < lib/db/schema.sql
```

Or use your provider's SQL editor to paste the contents of `lib/db/schema.sql`.

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Run Development Server

```bash
pnpm dev
```

Navigate to `http://localhost:3000/dashboard`

## Architecture

### Backend

- **API Routes** (`/api/resona/*`):
  - `sessions` — Start/end monitoring sessions
  - `events` — Log events (interrupts, tool calls, checkpoints, etc.)
  - `checkpoints` — Create restore points with coherence estimates
  - `return-mappings` — Validate agent return mappings
  - `incidents` — Log coherence violations
  - `stream` — Server-Sent Events for real-time updates

- **Coherence Engine** (`lib/coherence/`):
  - `calculator.ts` — C(S) computation
  - `return-mapping-validator.ts` — R validation engine

- **Database** (`lib/db/`):
  - Postgres schema with sessions, events, checkpoints, return mappings, incidents
  - Full audit trail of all actions

### Frontend

- **Components** (`components/resona/`):
  - `coherence-gauge.tsx` — Real-time C(S) dial
  - `return-mapping-status.tsx` — R validation status
  - `active-checkpoint-panel.tsx` — Current checkpoint display
  - `interrupt-cost-chart.tsx` — Recharts line chart
  - `volatility-panel.tsx` — Dynamics metrics
  - `timeline.tsx` — Event stream
  - `return-summary-input.tsx` — R submission form
  - `alerts-panel.tsx` — Risk indicators

- **Dashboard** (`app/dashboard/page.tsx`):
  - Real-time SSE subscription
  - Session management
  - 3-row cockpit layout

## Usage

### For Humans

1. Start a session with your ID
2. Monitor coherence in real-time
3. Log interrupts manually or automatically
4. Create checkpoints at key decision points
5. Submit return summaries to validate your thinking
6. Rollback to previous checkpoints if needed

### For AI Agents

Agents must emit a Return Mapping after each significant action:

```typescript
{
  "goal_reconstruction": "Summarize recent research findings accurately",
  "constraints_reconstruction": [
    "Use only cited sources",
    "No speculation",
    "Remain concise"
  ],
  "state_delta": "Added two peer-reviewed sources; discarded one blog post",
  "why_next_action_follows": "Need to verify consistency between sources",
  "stop_condition": "Sources agree within tolerance"
}
```

POST this to `/api/resona/return-mappings` for validation.

## Event Types

- `interrupt` — Context switch (payload: `{ duration_seconds, source, recovered }`)
- `tool_call` — Agent tool invocation (payload: `{ tool, query, attempt }`)
- `checkpoint` — Restore point created (payload: `{ checkpoint_id }`)
- `rollback` — Restoration to previous state (payload: `{ from_checkpoint_id, to_checkpoint_id, reason }`)
- `alert` — Coherence violation (payload: `{ alert_type, message }`)

## API Examples

### Start a Session

```bash
curl -X POST http://localhost:3000/api/resona/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "actor_type": "human",
    "actor_id": "alice"
  }'
```

### Log an Interrupt

```bash
curl -X POST http://localhost:3000/api/resona/events \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid-here",
    "actor": "alice",
    "event_type": "interrupt",
    "payload": {
      "type": "interrupt",
      "source": "email",
      "duration_seconds": 420,
      "recovered": true
    }
  }'
```

### Create a Checkpoint

```bash
curl -X POST http://localhost:3000/api/resona/checkpoints \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid-here",
    "goal_statement": "Complete user authentication implementation",
    "constraints": [
      "Use bcrypt for password hashing",
      "Implement rate limiting",
      "No passwords in logs"
    ],
    "plan_step": "Implementing password reset flow"
  }'
```

### Submit a Return Mapping

```bash
curl -X POST http://localhost:3000/api/resona/return-mappings \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid-here",
    "reconstruction": {
      "goal_reconstruction": "Complete user authentication",
      "constraints_reconstruction": ["Use bcrypt", "Rate limiting", "No passwords in logs"],
      "state_delta": "Added password reset endpoint with email verification",
      "why_next_action_follows": "Need to test reset flow with real email service",
      "stop_condition": "Reset emails deliver and passwords update successfully"
    },
    "original_goal": "Complete user authentication implementation",
    "original_constraints": ["Use bcrypt for password hashing", "Implement rate limiting"]
  }'
```

## Philosophy

### What is QOTE?

**Quantum Orthogonal Tertiary Encoding** operates on the principle that coherence exists in a narrow corridor between under-coupling and over-coupling.

This dashboard is a **coherence prosthetic**:
- For thinking
- For building
- For aligning AI
- For staying human inside complexity

### No Mysticism

- No gamification
- No motivational fluff
- Just continuous, recoverable intelligence

### Grounding Statement

> "If you can't measure coherence, you can't maintain it. If you can't maintain it, you can't trust it. If you can't trust it, you shouldn't deploy it."

## License

MIT — Part of the QOTE/Resona ecosystem

---

**Built with QOTE principles**
*Coherence through continuous measurement*
