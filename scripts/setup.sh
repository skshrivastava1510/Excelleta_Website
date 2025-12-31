#!/bin/bash

# Initial setup script for Excelleta Website
# This script helps set up the development environment

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Excelleta Website Setup${NC}"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js not found. Please install Node.js 16+${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo -e "${YELLOW}⚠️  Node.js version should be 16 or higher. Current: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}⚠️  Python 3 not found. Please install Python 3.11+${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
echo -e "${GREEN}✓ Python $PYTHON_VERSION${NC}"

# Setup Backend
echo ""
echo -e "${BLUE}📦 Setting up backend...${NC}"
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=excelleta_db
CORS_ORIGINS=http://localhost:3000
EOF
    echo -e "${YELLOW}⚠️  Please update backend/.env with your MongoDB connection string${NC}"
fi

deactivate
cd ..

# Setup Frontend
echo ""
echo -e "${BLUE}📦 Setting up frontend...${NC}"
cd frontend

# Check for package manager
if [ -f "yarn.lock" ]; then
    PACKAGE_MANAGER="yarn"
    if ! command -v yarn &> /dev/null; then
        echo -e "${YELLOW}⚠️  yarn.lock found but yarn not installed. Installing yarn...${NC}"
        npm install -g yarn
    fi
else
    PACKAGE_MANAGER="npm"
fi

echo "Installing dependencies with $PACKAGE_MANAGER..."
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn install
else
    npm install
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
REACT_APP_API_URL=http://localhost:8000
EOF
fi

cd ..

echo ""
echo -e "${GREEN}✅ Setup completed!${NC}"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your MongoDB connection string"
echo "2. Start backend: cd backend && ./start.sh"
echo "3. Start frontend: cd frontend && npm start (or yarn start)"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"

