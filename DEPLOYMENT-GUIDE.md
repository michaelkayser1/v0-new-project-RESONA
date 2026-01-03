# Resona Dashboard — Quick Start Deployment Guide

## What You Now Have

A **production-ready, buildable, v0-compatible** QOTE coherence monitoring system.

### ✅ Complete Features

1. **Real-time Coherence Monitoring** — C(S) calculation with QOTE corridor
2. **Agent Audit Line** — Return Mapping (R) validation engine
3. **Session Management** — Full CRUD for human/agent sessions
4. **Event Logging** — Interrupts, tool calls, checkpoints, rollbacks, alerts
5. **Cockpit Dashboard** — 3-row layout (critical state, dynamics, interaction)
6. **SSE Streaming** — Live updates every 2 seconds
7. **Database Schema** — Postgres-compatible (Neon, Supabase, etc.)

### 📦 What Was Built

```
Backend (23 new files):
├── lib/db/
│   ├── schema.sql           # Postgres database schema
│   ├── types.ts             # TypeScript type definitions
│   └── client.ts            # Database client
├── lib/coherence/
│   ├── calculator.ts        # C(S) coherence score engine
│   └── return-mapping-validator.ts  # R validation logic
└── app/api/resona/
    ├── sessions/route.ts    # Session CRUD
    ├── events/route.ts      # Event logging
    ├── checkpoints/route.ts # Checkpoint creation
    ├── return-mappings/route.ts # R validation
    ├── incidents/route.ts   # Incident logging
    └── stream/route.ts      # SSE real-time stream

Frontend:
├── app/dashboard/page.tsx   # Main cockpit interface
└── components/resona/
    ├── coherence-gauge.tsx  # C(S) dial with corridor
    ├── return-mapping-status.tsx  # R validation display
    ├── active-checkpoint-panel.tsx # Checkpoint viewer
    ├── interrupt-cost-chart.tsx   # Recharts visualization
    ├── volatility-panel.tsx       # Dynamics metrics
    ├── timeline.tsx               # Event stream
    ├── return-summary-input.tsx   # R submission form
    └── alerts-panel.tsx           # Risk warnings
```

## Deployment Steps

### 1. Database Setup

Choose a Postgres provider (Neon recommended):

**Neon (Free tier available):**
1. Go to [neon.tech](https://neon.tech)
2. Create account + project
3. Copy connection string

**Supabase:**
1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Go to Settings → Database → Connection string

**Run the schema:**

```bash
# Copy connection string to .env.local
echo "DATABASE_URL='your-connection-string'" > .env.local

# Option 1: Use psql
psql $DATABASE_URL < lib/db/schema.sql

# Option 2: Use provider's SQL editor
# Paste contents of lib/db/schema.sql into Neon/Supabase SQL editor
```

### 2. Local Development

```bash
# Install dependencies (already done)
pnpm install

# Start dev server
pnpm dev

# Open dashboard
open http://localhost:3000/dashboard
```

### 3. Vercel Deployment

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

**Add environment variable in Vercel:**
1. Go to project settings
2. Environment Variables
3. Add `DATABASE_URL` with your connection string
4. Redeploy

### 4. Test the System

**Start a session:**
1. Go to `/dashboard`
2. Enter actor type (human/agent) and ID
3. Click "Start Session"

**Test features:**
- Watch coherence gauge update in real-time
- Create a checkpoint (via API or UI extension)
- Submit a return mapping
- Log interrupts and tool calls
- Monitor alerts for corridor violations

## API Usage Examples

### Start a Session

```bash
curl -X POST https://your-deployment.vercel.app/api/resona/sessions \
  -H "Content-Type: application/json" \
  -d '{"actor_type": "human", "actor_id": "alice"}'
```

### Log an Interrupt

```bash
curl -X POST https://your-deployment.vercel.app/api/resona/events \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid-here",
    "actor": "alice",
    "event_type": "interrupt",
    "payload": {
      "type": "interrupt",
      "source": "email",
      "duration_seconds": 300,
      "recovered": true
    }
  }'
```

### Create Checkpoint

```bash
curl -X POST https://your-deployment.vercel.app/api/resona/checkpoints \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid-here",
    "goal_statement": "Complete user authentication",
    "constraints": ["Use bcrypt", "Rate limiting"],
    "plan_step": "Implementing password reset"
  }'
```

### Submit Return Mapping (Agent Audit)

```bash
curl -X POST https://your-deployment.vercel.app/api/resona/return-mappings \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "uuid-here",
    "reconstruction": {
      "goal_reconstruction": "Complete user authentication",
      "constraints_reconstruction": ["Use bcrypt", "Rate limiting"],
      "state_delta": "Added password reset endpoint with email verification",
      "why_next_action_follows": "Need to test reset flow",
      "stop_condition": "Reset emails deliver successfully"
    },
    "original_goal": "Complete user authentication",
    "original_constraints": ["Use bcrypt", "Rate limiting"]
  }'
```

## Coherence Metrics

### C(S) Formula

```
C(S) = (orientation × interruptResistance × stability) - drift - contradictions
```

**Components:**
- **Orientation**: Goal alignment (0-1)
- **Interrupt Resistance**: 1 - normalized interrupt cost
- **Stability**: 1 - volatility (coefficient of variation)
- **Drift**: Goal changes over time
- **Contradictions**: Retry loops and tool call conflicts

**Corridor:**
- Lower bound: **0.618** (φ⁻¹) — fragmentation threshold
- Upper bound: **0.6667** (2/3) — rigidity threshold

### Return Mapping Validation

**Checks:**
1. Goal similarity > 70%
2. Constraints present and overlapping
3. State delta explainable (non-trivial, no "unknown")
4. Logical continuity > 60%
5. Stop condition clear (contains when/until/complete)

**Results:**
- `valid`: All checks passed
- `weak`: Minor issues (constraints weak, stop condition unclear)
- `failed`: Critical issues (goal divergent, logical contradictions)

## Agent Integration

To make your AI agent QOTE-compliant:

**1. Emit events for every action:**

```typescript
await fetch('/api/resona/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    session_id: AGENT_SESSION_ID,
    actor: 'agent-gpt4',
    event_type: 'tool_call',
    payload: {
      type: 'tool_call',
      tool: 'browser.search',
      query: 'latest JWST findings',
      attempt: 1
    }
  })
});
```

**2. Submit return mapping after significant steps:**

```typescript
const returnMapping = {
  goal_reconstruction: "Summarize JWST research findings",
  constraints_reconstruction: ["Peer-reviewed only", "No speculation"],
  state_delta: "Found 3 papers, extracted key findings",
  why_next_action_follows: "Need to cross-reference results",
  stop_condition: "All sources agree on key points"
};

const response = await fetch('/api/resona/return-mappings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    session_id: AGENT_SESSION_ID,
    reconstruction: returnMapping,
    original_goal: AGENT_GOAL,
    original_constraints: AGENT_CONSTRAINTS
  })
});

const result = await response.json();
if (result.validation.status === 'failed') {
  // Rollback or adjust approach
}
```

## What's Next

### Immediate Extensions

1. **Add more event types:**
   - `context_switch`, `goal_change`, `constraint_violation`

2. **Enhance UI:**
   - Add checkpoint creation from dashboard
   - Add manual event logging
   - Add historical coherence charts

3. **Agent templates:**
   - Create QOTE-compliant agent wrapper
   - Auto-emit events for LangChain/AutoGPT
   - Build agent behavior scorecards

### Advanced Features (Future)

- **Multi-session comparison**: Compare coherence across agents
- **Coherence forecasting**: Predict corridor violations
- **Adaptive corridor**: Learn optimal bounds per user/agent
- **WebSocket support**: Replace SSE with bi-directional streams
- **Export/replay**: Save sessions for analysis

## Files Reference

- `RESONA-DASHBOARD.md` — Full documentation
- `lib/db/schema.sql` — Database schema
- `.env.example` — Environment variables template
- `app/dashboard/page.tsx` — Main cockpit UI

## Support

All code is production-ready and buildable. If you encounter issues:

1. Check DATABASE_URL is set correctly
2. Verify schema is applied to database
3. Check browser console for SSE connection errors
4. Verify session ID is valid

---

**Built on QOTE principles**
*No mysticism. Just recoverable intelligence.*
