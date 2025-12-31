#!/bin/bash

# Build script for Excelleta Website
# This script builds both frontend and backend

set -e  # Exit on error

echo "🚀 Starting build process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Build Backend
echo -e "${BLUE}📦 Building backend...${NC}"
cd backend
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found in backend. Using .env.example as template."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "📝 Please update backend/.env with your actual configuration"
    fi
fi
cd ..

# Build Frontend
echo -e "${BLUE}📦 Building frontend...${NC}"
cd frontend

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    if command -v yarn &> /dev/null; then
        yarn install
    else
        # Use --legacy-peer-deps to handle dependency conflicts
        npm install --legacy-peer-deps
    fi
fi

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found in frontend. Using .env.example as template."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "📝 Please update frontend/.env with your actual configuration"
    fi
fi

# Build React app
echo "🔨 Building React application..."
if command -v yarn &> /dev/null; then
    yarn build
else
    npm run build
fi

cd ..

echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo ""
echo "📁 Frontend build output: frontend/build/"
echo "📁 Backend is ready to run with: uvicorn server:app --host 0.0.0.0 --port 8000"

