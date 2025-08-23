#!/bin/bash

# QOTE + Resona Build Script
# Ensures proper dependency resolution and build process

echo "🌊 QOTE + Resona Build Process Starting..."

# Clean any existing node_modules and lock files
echo "🧹 Cleaning previous installations..."
rm -rf node_modules
rm -f pnpm-lock.yaml
rm -f package-lock.json
rm -f yarn.lock

# Install dependencies with no frozen lockfile
echo "📦 Installing dependencies with Zod v4..."
pnpm install --no-frozen-lockfile

# Verify Zod version
echo "🔍 Verifying Zod version..."
pnpm list zod

# Run type checking
echo "🔧 Running TypeScript checks..."
pnpm tsc --noEmit

# Build the project
echo "🏗️ Building QOTE + Resona..."
pnpm build

echo "✨ QOTE + Resona build complete! The field is aligned."
