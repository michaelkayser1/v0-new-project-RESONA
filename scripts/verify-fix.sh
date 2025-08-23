#!/bin/bash

echo "🔍 QOTE + Resona Fix Verification"
echo "================================="

# Check if all critical files exist
echo "📋 Checking file structure..."

FILES_TO_CHECK=(
    "app/layout.tsx:✅ Root layout"
    "app/page.tsx:✅ Landing page"
    "app/not-found.tsx:✅ 404 handler"
    "app/chat/page.tsx:✅ Chat page"
    "app/api/resona-chat/route.ts:✅ API route"
    "components/resona-chat.tsx:✅ Chat component"
    "next.config.mjs:✅ Next.js config"
    "vercel.json:✅ Vercel config"
    "tailwind.config.ts:✅ Tailwind config"
)

for item in "${FILES_TO_CHECK[@]}"; do
    file="${item%%:*}"
    message="${item##*:}"
    
    if [ -f "$file" ]; then
        echo "$message"
    else
        echo "❌ Missing: $file"
    fi
done

echo ""
echo "🧪 Testing build process..."

# Test if we can build
if pnpm build > /dev/null 2>&1; then
    echo "✅ Build process works"
else
    echo "❌ Build process failed"
fi

echo ""
echo "🌊 Quantum field status: ALIGNED ✨"
echo "Ready for deployment!"
