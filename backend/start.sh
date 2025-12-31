#!/bin/bash

# Start script for backend
# This script helps start the backend with proper environment setup

set -e

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
if [ ! -f "venv/.installed" ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
    touch venv/.installed
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Please create .env file with the following variables:"
    echo "  MONGO_URL=your_mongodb_connection_string"
    echo "  DB_NAME=excelleta_db"
    echo "  CORS_ORIGINS=http://localhost:3000"
    exit 1
fi

# Start the server
echo "🚀 Starting FastAPI server..."
uvicorn server:app --host 0.0.0.0 --port 8000 --reload

