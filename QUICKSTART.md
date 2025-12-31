# Quick Start Guide

Get your Excelleta website up and running quickly!

## Prerequisites

- Node.js 16+ and npm/yarn
- Python 3.11+
- MongoDB Atlas account (free tier available)

## 5-Minute Local Setup

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
MONGO_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/
DB_NAME=excelleta_db
CORS_ORIGINS=http://localhost:3000
EOF

# Start backend
uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install  # or yarn install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:8000
EOF

# Start frontend
npm start  # or yarn start
```

### 3. Access Your Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Building for Production

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Build everything
./scripts/build.sh
```

## Deploying to AWS

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

Quick deploy:

```bash
# Frontend to S3 + CloudFront
chmod +x scripts/setup-s3-cloudfront.sh
./scripts/setup-s3-cloudfront.sh

# Backend to Elastic Beanstalk
cd backend
pip install awsebcli
eb init -p python-3.11 excelleta-backend
eb create excelleta-backend-env
eb setenv MONGO_URL="your-mongo-url" DB_NAME="excelleta_db" CORS_ORIGINS="https://your-domain.com"
eb deploy
```

## Environment Variables

### Backend (.env)
- `MONGO_URL`: MongoDB connection string
- `DB_NAME`: Database name
- `CORS_ORIGINS`: Comma-separated list of allowed origins

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL

## Need Help?

Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions and troubleshooting.

