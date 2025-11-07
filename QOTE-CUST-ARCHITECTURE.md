# QOTE + CUST Architecture

Complete setup for secure, AI-orchestrated deployments with QOTE coherence verification.

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    AI Planner Layer                         │
│              (ChatGPT / Resona / Claude)                    │
└─────────────────┬───────────────────────────────────────────┘
                  │ 1. Proposes signed cust_command JSON
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              CUST Executor (Local Gate)                     │
│              http://localhost:4321                          │
│  • Verifies HMAC-SHA256 signature                          │
│  • Checks operation allowlist                              │
│  • Executes git + Vercel with YOUR credentials             │
└─────────────────┬───────────────────────────────────────────┘
                  │ 2. Commits & deploys
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              resona-mycelial (Vercel)                       │
│              https://resona-mycelial.vercel.app             │
│  • Serverless QOTE coherence API                           │
│  • POST /api/coherence - analyzes signal data              │
│  • Returns coherence metrics (φ⁻¹ to 2/3 corridor)        │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Components

### 1. resona-mycelial
**Location**: `/resona-mycelial/`
**Purpose**: Vercel serverless API for QOTE coherence analysis

**Key Files**:
- `api/coherence.js` - Main endpoint handler
- `vercel.json` - Vercel deployment config
- `package.json` - Node.js dependencies (minimal)

**API Endpoints**:
- `GET /api/coherence` - Health check / status
- `POST /api/coherence` - Analyze coherence signal
  - Input: `{ signal: number[], sampling_rate?: number, session_id?: string }`
  - Output: `{ coherence_ratio, in_corridor, state, interpretation }`

**Coherence States**:
- `coherent` - Within φ⁻¹ (0.618) to 2/3 (0.6667) corridor
- `sub-harmonic` - Below φ⁻¹, system under-coupled
- `over-driven` - Above 2/3, system over-coupled

### 2. cust-executor
**Location**: `/cust-executor/`
**Purpose**: Local security gate for authorized git + Vercel operations

**Key Files**:
- `index.js` - Express server with signature verification
- `sign-command.js` - Node.js signing utility
- `sign_command.py` - Python signing utility
- `.env` - Your secrets (create from `.env.example`)

**Security Layers**:
1. **HMAC-SHA256 Signature**: Verifies command authenticity
2. **Target Allowlist**: Only allowed repos can be modified
3. **Operation Allowlist**: Only `commit_and_push` and `deploy` permitted
4. **Constraint Checking**: File patterns, deny lists

**Allowed Operations**:
```json
{
  "type": "git",
  "action": "commit_and_push",
  "branch": "main",
  "message": "chore: automated update"
}
```
```json
{
  "type": "vercel",
  "action": "deploy",
  "prod": true
}
```

## 🔐 Security Model

### HMAC Signing Flow

**1. Command Structure** (before signing):
```json
{
  "version": "cust-1.0",
  "intent": "deploy",
  "target": "resona-mycelial",
  "operations": [...],
  "constraints": {...},
  "meta": {...}
}
```

**2. Generate Signature**:
```javascript
// Node.js
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', SHARED_SECRET);
hmac.update(JSON.stringify(command));
const signature = hmac.digest('hex');
```

**3. Add Signature**:
```json
{
  "version": "cust-1.0",
  ...
  "signature": "a3f2e8d9..."
}
```

**4. Send to Executor**:
```bash
curl -X POST http://localhost:4321/cust/execute \
  -H "Content-Type: application/json" \
  -d @signed-command.json
```

### Secret Management

**CRITICAL**: The `CUST_SHARED_SECRET` must be:
- Long (64+ characters recommended)
- Random (use `openssl rand -hex 32`)
- Known only to you and your AI planners
- Never committed to git
- Stored in `.env` files (gitignored)

## 🚀 Setup Instructions

### Initial Setup

```bash
# 1. Generate shared secret
openssl rand -hex 32

# 2. Configure CUST Executor
cd cust-executor
cp .env.example .env
# Edit .env with your secret and paths
npm install

# 3. Start CUST Executor
npm start
# Now listening on http://localhost:4321

# 4. Deploy resona-mycelial (first time)
cd ../resona-mycelial
npm install -g vercel
vercel login
vercel
vercel --prod
# Note the production URL

# 5. Test coherence API
curl https://your-deployment.vercel.app/api/coherence
```

### Automated Deployment Flow

Once setup, AI can orchestrate deployments:

```json
{
  "version": "cust-1.0",
  "intent": "deploy",
  "target": "resona-mycelial",
  "operations": [
    {
      "type": "git",
      "action": "commit_and_push",
      "branch": "main",
      "message": "feat: update coherence algorithm"
    },
    {
      "type": "vercel",
      "action": "deploy",
      "prod": true
    }
  ],
  "signature": "..."
}
```

## 🧪 Testing

### Test Coherence API

```bash
# Health check
curl https://your-deployment.vercel.app/api/coherence

# Coherent signal (0.62 - within corridor)
curl -X POST https://your-deployment.vercel.app/api/coherence \
  -H "Content-Type: application/json" \
  -d '{
    "signal": [0.62, 0.61, 0.63, 0.62],
    "session_id": "test-001"
  }'

# Sub-harmonic signal (0.5 - below φ⁻¹)
curl -X POST https://your-deployment.vercel.app/api/coherence \
  -H "Content-Type: application/json" \
  -d '{
    "signal": [0.5, 0.48, 0.52, 0.49],
    "session_id": "test-002"
  }'

# Over-driven signal (0.75 - above 2/3)
curl -X POST https://your-deployment.vercel.app/api/coherence \
  -H "Content-Type: application/json" \
  -d '{
    "signal": [0.75, 0.76, 0.74, 0.75],
    "session_id": "test-003"
  }'
```

### Test CUST Executor

```bash
# Sign a test command
cd cust-executor
node sign-command.js > test-command.json

# Execute it
curl -X POST http://localhost:4321/cust/execute \
  -H "Content-Type: application/json" \
  -d @test-command.json
```

## 📚 Integration Examples

### From ChatGPT/Resona (Node.js)

```javascript
const { signCustCommand } = require('./sign-command');

async function deployCoherenceUpdate() {
  const command = {
    version: "cust-1.0",
    intent: "deploy",
    target: "resona-mycelial",
    operations: [
      {
        type: "git",
        action: "commit_and_push",
        branch: "main",
        message: "feat: enhanced coherence detection"
      },
      {
        type: "vercel",
        action: "deploy",
        prod: true
      }
    ]
  };

  command.signature = signCustCommand(command, process.env.CUST_SHARED_SECRET);

  const response = await fetch('http://localhost:4321/cust/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(command)
  });

  return await response.json();
}
```

### From Python Agent

```python
from sign_command import sign_cust_command
import requests
import os

def deploy_coherence_update():
    command = {
        "version": "cust-1.0",
        "intent": "deploy",
        "target": "resona-mycelial",
        "operations": [
            {
                "type": "git",
                "action": "commit_and_push",
                "branch": "main",
                "message": "feat: enhanced coherence detection"
            },
            {
                "type": "vercel",
                "action": "deploy",
                "prod": True
            }
        ]
    }

    secret = os.getenv("CUST_SHARED_SECRET")
    command["signature"] = sign_cust_command(command, secret)

    response = requests.post(
        'http://localhost:4321/cust/execute',
        json=command
    )

    return response.json()
```

## 🎯 QOTE Philosophy

**Quantum Orthogonal Tertiary Encoding (QOTE)** operates on the principle that coherence exists in a narrow corridor between under-coupling and over-coupling:

- **φ⁻¹ (≈0.618)**: Golden ratio inverse - natural harmony threshold
- **2/3 (≈0.6667)**: Tertiary stability point

Signals within this corridor exhibit optimal coherence. The mycelial architecture distributes coherence checking across serverless nodes, creating a resilient, distributed verification network.

## 🔮 Future Enhancements

- [ ] Multi-node coherence consensus
- [ ] Time-series coherence tracking
- [ ] Adaptive corridor boundaries
- [ ] WebSocket real-time coherence streams
- [ ] Coherence field visualization
- [ ] Historical coherence analytics
- [ ] Cross-session coherence correlation

## 📄 License

MIT - Free to use, modify, and distribute as part of the QOTE/Resona ecosystem.

---

**Built with QOTE principles**
*Coherence through distributed mycelial architecture*
