# Environment Setup — Commands Reference

## Quick Commands

```bash
# Check if environment is ready
pnpm run setup-check

# Create .env.local from template
pnpm run env:setup

# Test local setup
pnpm dev

# Check API health
curl http://localhost:3000/api/health
```

---

## Step-by-Step Setup

### 1. Clone and Install

```bash
git clone <repo-url>
cd v0-new-project-RESONA
pnpm install
```

### 2. Set Up Database

**Option A: Neon (Recommended)**

```bash
# 1. Create account at https://neon.tech
# 2. Create new project
# 3. Copy connection string

# 4. Create .env.local
pnpm run env:setup

# 5. Edit .env.local
echo 'DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"' > .env.local

# 6. Apply schema
psql $DATABASE_URL < lib/db/schema.sql
```

**Option B: Vercel Postgres**

```bash
# 1. Create database in Vercel dashboard
# 2. Copy connection string from "Connect" tab

# 3. Create .env.local
echo 'DATABASE_URL="<vercel-postgres-string>"' > .env.local

# 4. Apply schema (use Vercel's SQL editor or psql)
psql $DATABASE_URL < lib/db/schema.sql
```

### 3. Verify Setup

```bash
# Run verification script
pnpm run setup-check

# Should show:
# ✓ .env.local file exists
# ✓ All required environment variables are set
# ✓ Database connection successful
# ✓ All required database tables exist
```

### 4. Start Development

```bash
pnpm dev
# Open http://localhost:3000/dashboard
```

---

## Production Deployment (Vercel)

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Add environment variable
vercel env add DATABASE_URL production
# Paste your connection string when prompted

# Deploy
vercel --prod
```

### Method 2: Vercel Dashboard

```bash
# 1. Push to GitHub
git push origin main

# 2. Import in Vercel
# - Go to https://vercel.com/new
# - Import your GitHub repo

# 3. Add environment variable
# - Go to Settings → Environment Variables
# - Add DATABASE_URL with your connection string

# 4. Redeploy
# - Deployments tab → Redeploy
```

---

## Environment Variables

### Local (.env.local)

```bash
# Required
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# Optional
COHERENCE_WINDOW_MINUTES="30"
MIN_GOAL_SIMILARITY="0.7"
```

### Vercel (Production)

```bash
# Add via CLI
vercel env add DATABASE_URL production
vercel env add DATABASE_URL preview
vercel env add DATABASE_URL development

# Or add via Dashboard
# Settings → Environment Variables → Add
```

---

## Verification Commands

### Check Environment

```bash
# Full environment check (runs all tests)
pnpm run setup-check
```

### Check Database Connection

```bash
# Test database connection manually
psql $DATABASE_URL -c "SELECT 1 as test"

# List tables
psql $DATABASE_URL -c "\dt"

# Check table structure
psql $DATABASE_URL -c "\d sessions"
```

### Check API Health

```bash
# Local
curl http://localhost:3000/api/health

# Production
curl https://your-app.vercel.app/api/health

# Should return:
# {
#   "status": "healthy",
#   "checks": {
#     "api": "ok",
#     "database": "connected",
#     "tables": ["checkpoints", "events", "incidents", "return_mappings", "sessions"]
#   },
#   "missing_tables": []
# }
```

---

## Troubleshooting Commands

### DATABASE_URL Not Found

```bash
# Check if .env.local exists
ls -la .env.local

# Check if variable is loaded
node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env.DATABASE_URL ? 'Set' : 'Not set')"

# Recreate from template
pnpm run env:setup
```

### Tables Don't Exist

```bash
# Apply schema
psql $DATABASE_URL < lib/db/schema.sql

# Verify tables were created
psql $DATABASE_URL -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
```

### Connection Refused

```bash
# Test raw connection
psql $DATABASE_URL -c "SELECT version()"

# Check if database is running
# For Neon/Vercel: check dashboard status
# For local: pg_isready
```

---

## Build Commands

```bash
# Type check
pnpm run type-check

# Lint
pnpm run lint

# Build for production
pnpm run build

# Start production server (after build)
pnpm start
```

---

## Database Commands

### Apply Schema

```bash
# From file
psql $DATABASE_URL < lib/db/schema.sql

# Or copy-paste to SQL editor in:
# - Neon: https://console.neon.tech/app/projects
# - Supabase: https://app.supabase.com/project/_/sql
# - Vercel: https://vercel.com/storage
```

### Reset Database (⚠️ Deletes all data)

```bash
psql $DATABASE_URL << EOF
DROP TABLE IF EXISTS incidents CASCADE;
DROP TABLE IF EXISTS return_mappings CASCADE;
DROP TABLE IF EXISTS checkpoints CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
EOF

# Then reapply schema
psql $DATABASE_URL < lib/db/schema.sql
```

### Backup Database

```bash
# Export data
pg_dump $DATABASE_URL > backup.sql

# Restore data
psql $DATABASE_URL < backup.sql
```

---

## Development Workflow

```bash
# 1. Start dev server
pnpm dev

# 2. In another terminal, verify setup
pnpm run setup-check

# 3. Test API
curl http://localhost:3000/api/health

# 4. Open dashboard
open http://localhost:3000/dashboard

# 5. Make changes, test, commit
git add .
git commit -m "feat: your changes"
git push

# 6. Deploy to Vercel (auto-deploys from main)
```

---

## Useful Aliases (Optional)

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Resona aliases
alias resona-dev='cd /path/to/v0-new-project-RESONA && pnpm dev'
alias resona-check='cd /path/to/v0-new-project-RESONA && pnpm run setup-check'
alias resona-deploy='cd /path/to/v0-new-project-RESONA && vercel --prod'
alias resona-health='curl http://localhost:3000/api/health | jq'
```

---

## Next Steps

Once setup is complete:

1. **Test locally**: `pnpm dev` → http://localhost:3000/dashboard
2. **Deploy**: `vercel --prod`
3. **Monitor**: Check `/api/health` endpoint
4. **Iterate**: Build, test, deploy

All commands should work out of the box if environment is configured correctly.

Run `pnpm run setup-check` to verify everything is ready.
