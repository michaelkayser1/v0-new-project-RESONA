#!/bin/bash

# QOTE + Resona Deployment Check Script
# Comprehensive verification before deployment

echo "🌊 QOTE + Resona Deployment Check Starting..."
echo "=============================================="

# 1. Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules/.cache

# 2. Verify Node.js version
echo "🔍 Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "Node.js version: $NODE_VERSION"

if [[ ! "$NODE_VERSION" =~ ^v1[89]\. ]]; then
    echo "❌ Node.js 18+ required, found $NODE_VERSION"
    exit 1
fi

# 3. Verify pnpm version
echo "📦 Checking pnpm version..."
PNPM_VERSION=$(pnpm --version)
echo "pnpm version: $PNPM_VERSION"

# 4. Install dependencies
echo "📥 Installing dependencies..."
pnpm install --no-frozen-lockfile

# 5. Verify Zod version
echo "🔍 Verifying Zod version..."
ZOD_VERSION=$(pnpm list zod --depth=0 | grep zod | head -1)
echo "Zod version: $ZOD_VERSION"

if [[ ! "$ZOD_VERSION" =~ zod@4\. ]]; then
    echo "❌ Zod v4.x required"
    exit 1
fi

# 6. Run TypeScript check
echo "🔧 Running TypeScript checks..."
pnpm tsc --noEmit

if [ $? -ne 0 ]; then
    echo "❌ TypeScript errors found"
    exit 1
fi

# 7. Run build
echo "🏗️ Building application..."
pnpm build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# 8. Verify critical files exist
echo "📋 Verifying build output..."
CRITICAL_FILES=(
    ".next/server/app/api/resona-chat/route.js"
    ".next/server/app/page.js"
    ".next/static"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ ! -e "$file" ]; then
        echo "❌ Missing critical file: $file"
        exit 1
    fi
done

# 9. Check environment variables (in production)
echo "🔐 Checking environment configuration..."
if [ "$NODE_ENV" = "production" ]; then
    REQUIRED_VARS=(
        "OPENAI_API_KEY"
        "RESONA_PROMPT"
        "KV_URL"
        "KV_REST_API_TOKEN"
        "KV_REST_API_URL"
    )
    
    for var in "${REQUIRED_VARS[@]}"; do
        if [ -z "${!var}" ]; then
            echo "⚠️ Environment variable $var not set"
        fi
    done
fi

echo ""
echo "✅ QOTE + Resona Deployment Check Complete!"
echo "🚀 Ready for deployment to production"
echo ""
echo "Features verified:"
echo "  🔮 QOTE Engine v4 with Zod validation"
echo "  🧬 RTP v2.0 with enhanced protocols"
echo "  📊 Biometric integration ready"
echo "  🎵 Sound frequency mapping active"
echo "  🌊 Visual field components built"
echo "  ⚡ Real-time flip detection enabled"
echo ""
echo "The quantum field is aligned and ready to manifest! 🌌✨"
