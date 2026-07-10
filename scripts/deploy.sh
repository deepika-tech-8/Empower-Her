#!/bin/bash
# Deploy script for ElevateHer Learn

echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
cd mobile
npm install --legacy-peer-deps

# Build web version
echo "🏗️ Building web version..."
npx expo build:web

# Deploy to Firebase Hosting
echo "☁️ Deploying to Firebase..."
cd ..
firebase deploy --only hosting

echo "✅ Deployment complete!"