# Vercel Deployment Guide — Resona Dashboard

## Quick Setup (3 Steps)

### Step 1: Create Database

Choose **one** provider:

#### Option A: Neon (Recommended - Free tier)

1. Go to https://neon.tech
2. Sign up / Login
3. Click "Create Project"
4. Copy your connection string (looks like):
   ```
   postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

#### Option B: Vercel Postgres

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to "Storage" tab
4. Click "Create Database" → Postgres
5. Click "Connect" → Copy connection string

#### Option C: Supabase

1. Go to https://supabase.com
2. Create project
3. Go to Settings → Database → Connection String
4. Use "Connection Pooling" mode for Vercel

---

### Step 2: Apply Database Schema

**Method A: Using psql (command line)**

```bash
# Set your connection string
export DATABASE_URL="postgresql://..."

# Apply schema
psql $DATABASE_URL < lib/db/schema.sql

# Verify tables were created
psql $DATABASE_URL -c "\dt"
```

**Method B: Using SQL Editor (Neon/Supabase)**

1. Open your database provider's SQL editor
2. Copy the contents of `lib/db/schema.sql`
3. Paste and run
4. Verify 5 tables were created: `sessions`, `events`, `checkpoints`, `return_mappings`, `incidents`

---

### Step 3: Deploy to Vercel

#### 3A: Add Environment Variable

**Via Vercel Dashboard:**

1. Go to https://vercel.com/dashboard
2. Select your project (`v0-new-project-RESONA`)
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name:** `DATABASE_URL`
   - **Value:** `<your-postgres-connection-string>`
   - **Environments:** Check all (Production, Preview, Development)
5. Click "Save"

**Via Vercel CLI:**

```bash
# Install Vercel CLI if needed
pnpm add -g vercel

# Add environment variable
vercel env add DATABASE_URL production
# Paste your connection string when prompted

# Also add for preview/development
vercel env add DATABASE_URL preview
vercel env add DATABASE_URL development
```

#### 3B: Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch (auto-deploys)
git push origin main
```

---

## Verification

### 1. Check Build Logs

After deploying, check Vercel deployment logs for errors:

```
https://vercel.com/your-username/v0-new-project-RESONA/deployments
```

Look for:
- ✓ Build successful
- ✓ No DATABASE_URL errors

### 2. Test API Endpoints

```bash
# Replace with your Vercel URL
VERCEL_URL="https://v0-new-project-resona.vercel.app"

# Health check
curl "$VERCEL_URL/api/resona/sessions"

# Should return: [] (empty array, not error)
```

### 3. Open Dashboard

```
https://v0-new-project-resona.vercel.app/dashboard
```

You should see:
- Session start form
- No database connection errors

---

## Local Development Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Create local env file
pnpm run env:setup

# 3. Edit .env.local with your DATABASE_URL
nano .env.local  # or use your editor

# 4. Verify setup
pnpm run setup-check

# 5. Start dev server
pnpm dev

# 6. Open http://localhost:3000/dashboard
```

---

## Troubleshooting

### Error: "DATABASE_URL is not set"

**Cause:** Environment variable not configured in Vercel

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Add `DATABASE_URL`
3. Redeploy: `vercel --prod`

---

### Error: "relation 'sessions' does not exist"

**Cause:** Database schema not applied

**Fix:**
```bash
psql $DATABASE_URL < lib/db/schema.sql
```

---

### Error: "no pg_hba.conf entry"

**Cause:** IP not allowed to connect to database

**Fix:**
- **Neon:** Should work automatically (serverless)
- **Supabase:** Enable "connection pooling" mode
- **Other:** Add Vercel IPs to allowlist (or use connection pooler)

---

### Error: "too many connections"

**Cause:** Connection pooling not enabled

**Fix:**
- Use Neon (built-in pooling)
- Or add `?pgbouncer=true` to connection string
- Or use Supabase connection pooling mode

---

## Environment Variables Reference

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Postgres connection string | `postgresql://user:pass@host:5432/db` |

### Optional (for future extensions)

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Your app URL | Auto-detected |
| `COHERENCE_WINDOW_MINUTES` | Time window for C(S) | `30` |
| `MIN_GOAL_SIMILARITY` | R validation threshold | `0.7` |

---

## Database Providers Comparison

| Provider | Free Tier | Serverless | Setup Time | Vercel Integration |
|----------|-----------|------------|------------|-------------------|
| **Neon** | ✅ 0.5GB | ✅ Yes | 2 min | ⭐⭐⭐⭐⭐ |
| **Vercel Postgres** | ✅ 256MB | ✅ Yes | 1 min | ⭐⭐⭐⭐⭐ |
| **Supabase** | ✅ 500MB | ✅ Yes | 3 min | ⭐⭐⭐⭐ |
| **Railway** | ✅ 500MB | ❌ No | 5 min | ⭐⭐⭐ |

**Recommendation:** Use **Neon** for easiest setup with Vercel.

---

## Vercel CLI Commands

```bash
# Check environment variables
vercel env ls

# Pull environment variables locally
vercel env pull .env.local

# Remove environment variable
vercel env rm DATABASE_URL production

# View deployment logs
vercel logs <deployment-url>

# Redeploy last deployment
vercel --prod --force
```

---

## Next Steps After Deployment

1. **Test the dashboard:**
   - Go to `/dashboard`
   - Start a session
   - Monitor coherence in real-time

2. **Set up monitoring:**
   - Add Vercel Analytics
   - Monitor API response times
   - Track error rates

3. **Customize:**
   - Adjust coherence corridor bounds
   - Add custom event types
   - Extend UI with more panels

---

## Production Checklist

- [ ] Database created
- [ ] Schema applied (`sessions`, `events`, etc. tables exist)
- [ ] `DATABASE_URL` set in Vercel
- [ ] Deployment successful (no build errors)
- [ ] API endpoints respond (test `/api/resona/sessions`)
- [ ] Dashboard loads without errors
- [ ] Can start/end sessions
- [ ] Coherence gauge updates in real-time
- [ ] Return mapping validation works

---

## Support

If you encounter issues:

1. Run local verification: `pnpm run setup-check`
2. Check Vercel deployment logs
3. Verify database connection: `psql $DATABASE_URL -c "SELECT 1"`
4. Test API: `curl <your-url>/api/resona/sessions`

All checks passing? You're live with QOTE coherence monitoring.

---

**Built with QOTE principles**
*No mysticism. Just deployable intelligence.*
