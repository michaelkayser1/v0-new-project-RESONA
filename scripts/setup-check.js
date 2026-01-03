#!/usr/bin/env node

/**
 * Environment Setup Verification Script
 * Checks if all required environment variables are configured
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_ENV_VARS = ['DATABASE_URL'];

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');

  if (!fs.existsSync(envPath)) {
    log('\n❌ .env.local file not found!', 'red');
    log('\nTo fix this:', 'yellow');
    log('1. Copy .env.example to .env.local:', 'cyan');
    log('   cp .env.example .env.local', 'cyan');
    log('2. Edit .env.local and add your DATABASE_URL', 'cyan');
    return false;
  }

  log('✓ .env.local file exists', 'green');
  return true;
}

function checkEnvVars() {
  const missing = [];
  const invalid = [];

  for (const varName of REQUIRED_ENV_VARS) {
    const value = process.env[varName];

    if (!value) {
      missing.push(varName);
    } else if (varName === 'DATABASE_URL') {
      // Validate DATABASE_URL format
      if (!value.startsWith('postgres://') && !value.startsWith('postgresql://')) {
        invalid.push({
          name: varName,
          reason: 'Must start with postgres:// or postgresql://',
        });
      }
    }
  }

  if (missing.length > 0) {
    log('\n❌ Missing environment variables:', 'red');
    missing.forEach(v => log(`   - ${v}`, 'red'));
    return false;
  }

  if (invalid.length > 0) {
    log('\n❌ Invalid environment variables:', 'red');
    invalid.forEach(v => log(`   - ${v.name}: ${v.reason}`, 'red'));
    return false;
  }

  log('✓ All required environment variables are set', 'green');
  return true;
}

async function testDatabaseConnection() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    log('⊘ Skipping database connection test (no DATABASE_URL)', 'yellow');
    return false;
  }

  try {
    // Try to import the database client
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(dbUrl);

    // Test connection with a simple query
    const result = await sql`SELECT 1 as test`;

    if (result && result[0]?.test === 1) {
      log('✓ Database connection successful', 'green');

      // Check if tables exist
      const tables = await sql`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name IN ('sessions', 'events', 'checkpoints', 'return_mappings', 'incidents')
      `;

      const existingTables = tables.map(t => t.table_name);
      const requiredTables = ['sessions', 'events', 'checkpoints', 'return_mappings', 'incidents'];
      const missingTables = requiredTables.filter(t => !existingTables.includes(t));

      if (missingTables.length > 0) {
        log('\n⚠️  Database schema not applied!', 'yellow');
        log('Missing tables:', 'yellow');
        missingTables.forEach(t => log(`   - ${t}`, 'yellow'));
        log('\nTo fix this:', 'cyan');
        log('   psql $DATABASE_URL < lib/db/schema.sql', 'cyan');
        log('   Or paste lib/db/schema.sql into your database SQL editor', 'cyan');
        return false;
      } else {
        log('✓ All required database tables exist', 'green');
      }

      return true;
    }
  } catch (error) {
    log('\n❌ Database connection failed:', 'red');
    log(`   ${error.message}`, 'red');
    log('\nPossible fixes:', 'yellow');
    log('1. Check your DATABASE_URL is correct', 'cyan');
    log('2. Ensure your database is running', 'cyan');
    log('3. Check firewall/network settings', 'cyan');
    return false;
  }

  return false;
}

function printVercelInstructions() {
  log('\n' + '='.repeat(60), 'blue');
  log('VERCEL DEPLOYMENT SETUP', 'blue');
  log('='.repeat(60), 'blue');

  log('\n1. Add environment variable in Vercel:', 'cyan');
  log('   a. Go to: https://vercel.com/dashboard', 'cyan');
  log('   b. Select your project', 'cyan');
  log('   c. Go to Settings → Environment Variables', 'cyan');
  log('   d. Add:', 'cyan');
  log('      Name: DATABASE_URL', 'cyan');
  log('      Value: <your-postgres-connection-string>', 'cyan');
  log('      Environment: Production, Preview, Development', 'cyan');

  log('\n2. Redeploy your project:', 'cyan');
  log('   vercel --prod', 'cyan');

  log('\n3. Or use the Vercel CLI to set it:', 'cyan');
  log('   vercel env add DATABASE_URL', 'cyan');
  log('   (Then paste your connection string when prompted)', 'cyan');
}

function printQuickSetup() {
  log('\n' + '='.repeat(60), 'blue');
  log('QUICK SETUP GUIDE', 'blue');
  log('='.repeat(60), 'blue');

  log('\n1. Create a Postgres database:', 'cyan');
  log('   • Neon (recommended): https://neon.tech', 'cyan');
  log('   • Supabase: https://supabase.com', 'cyan');
  log('   • Vercel Postgres: https://vercel.com/storage/postgres', 'cyan');

  log('\n2. Get your connection string:', 'cyan');
  log('   Example: postgresql://user:pass@host:5432/db?sslmode=require', 'cyan');

  log('\n3. Set up locally:', 'cyan');
  log('   cp .env.example .env.local', 'cyan');
  log('   # Edit .env.local and add your DATABASE_URL', 'cyan');

  log('\n4. Apply database schema:', 'cyan');
  log('   psql $DATABASE_URL < lib/db/schema.sql', 'cyan');

  log('\n5. Test locally:', 'cyan');
  log('   pnpm dev', 'cyan');
  log('   # Open http://localhost:3000/dashboard', 'cyan');

  log('\n6. Deploy to Vercel:', 'cyan');
  log('   vercel --prod', 'cyan');
  log('   # Add DATABASE_URL in Vercel dashboard', 'cyan');
}

async function main() {
  log('\n' + '='.repeat(60), 'blue');
  log('RESONA DASHBOARD - ENVIRONMENT CHECK', 'blue');
  log('='.repeat(60) + '\n', 'blue');

  const envFileExists = checkEnvFile();

  if (!envFileExists) {
    printQuickSetup();
    process.exit(1);
  }

  // Load .env.local
  require('dotenv').config({ path: '.env.local' });

  const envVarsValid = checkEnvVars();

  if (!envVarsValid) {
    printQuickSetup();
    process.exit(1);
  }

  const dbConnected = await testDatabaseConnection();

  log('\n' + '='.repeat(60), 'blue');
  log('SUMMARY', 'blue');
  log('='.repeat(60), 'blue');

  if (envFileExists && envVarsValid && dbConnected) {
    log('\n✅ All checks passed! You\'re ready to go!', 'green');
    log('\nNext steps:', 'cyan');
    log('   pnpm dev              # Start local development', 'cyan');
    log('   vercel --prod         # Deploy to production', 'cyan');
  } else {
    log('\n⚠️  Some checks failed. Follow the instructions above.', 'yellow');
  }

  printVercelInstructions();

  log('\n');
}

main().catch(err => {
  log(`\n❌ Unexpected error: ${err.message}`, 'red');
  process.exit(1);
});
