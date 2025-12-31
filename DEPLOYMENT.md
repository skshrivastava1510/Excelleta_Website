# Deployment Guide for Excelleta Website

This guide will help you build and deploy your Excelleta website to AWS.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
3. [Building the Application](#building-the-application)
4. [AWS Deployment Options](#aws-deployment-options)
5. [Frontend Deployment (S3 + CloudFront)](#frontend-deployment-s3--cloudfront)
6. [Backend Deployment (Elastic Beanstalk)](#backend-deployment-elastic-beanstalk)
7. [Backend Deployment (Docker + ECS)](#backend-deployment-docker--ecs)
8. [Environment Variables](#environment-variables)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```
3. **Node.js and npm/yarn** (for frontend)
4. **Python 3.11+** (for backend - only if you need a backend)
5. **MongoDB Atlas account** (only if you need database features - see [NO_DATABASE_OPTION.md](./NO_DATABASE_OPTION.md))

> **Note**: If your website is a static landing page, you may not need a backend or database at all! See [NO_DATABASE_OPTION.md](./NO_DATABASE_OPTION.md) for a simpler deployment option.

## Local Setup

### 1. Clone and Navigate to Project
```bash
cd Excelleta_Website
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env with your MongoDB connection string
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
# DB_NAME=excelleta_db
# CORS_ORIGINS=http://localhost:3000

# Run backend
uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
# or
yarn install

# Copy environment file
cp .env.example .env

# Edit .env with your backend API URL
# REACT_APP_API_URL=http://localhost:8000

# Run frontend
npm start
# or
yarn start
```

## Building the Application

### Option 1: Using Build Script

```bash
# Make script executable
chmod +x scripts/build.sh

# Run build script
./scripts/build.sh
```

### Option 2: Manual Build

**Frontend:**
```bash
cd frontend
npm run build  # or yarn build
# Output: frontend/build/
```

**Backend:**
The backend doesn't need a build step, but ensure all dependencies are installed:
```bash
cd backend
pip install -r requirements.txt
```

## AWS Deployment Options

### Architecture Overview

- **Frontend**: S3 (Static Hosting) + CloudFront (CDN)
- **Backend**: Elastic Beanstalk or ECS (Docker)
- **Database**: MongoDB Atlas (recommended) or EC2 instance

## Frontend Deployment (S3 + CloudFront)

### Method 1: Automated Script

```bash
chmod +x scripts/setup-s3-cloudfront.sh
./scripts/setup-s3-cloudfront.sh
```

### Method 2: Manual Steps

#### Step 1: Create S3 Bucket

```bash
# Replace 'your-bucket-name' with a unique name
aws s3 mb s3://your-bucket-name --region us-east-1
```

#### Step 2: Configure S3 for Static Website Hosting

```bash
aws s3 website s3://your-bucket-name \
    --index-document index.html \
    --error-document index.html
```

#### Step 3: Set Bucket Policy (Public Read Access)

Create `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

Apply policy:
```bash
aws s3api put-bucket-policy --bucket your-bucket-name --policy file://bucket-policy.json
```

#### Step 4: Remove Public Access Block

```bash
aws s3api put-public-access-block \
    --bucket your-bucket-name \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

#### Step 5: Build and Upload Frontend

```bash
cd frontend

# Update .env with production API URL
echo "REACT_APP_API_URL=https://your-backend-api.com" > .env.production

# Build
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name --delete
```

#### Step 6: Create CloudFront Distribution (Optional but Recommended)

1. Go to AWS Console → CloudFront
2. Create Distribution
3. Origin Domain: `your-bucket-name.s3-website-us-east-1.amazonaws.com`
4. Viewer Protocol Policy: Redirect HTTP to HTTPS
5. Default Root Object: `index.html`
6. Create Distribution

**Note**: CloudFront distribution takes 15-20 minutes to deploy.

### Updating Frontend

After making changes:

```bash
cd frontend
npm run build
aws s3 sync build/ s3://your-bucket-name --delete

# If using CloudFront, invalidate cache
aws cloudfront create-invalidation \
    --distribution-id YOUR_DISTRIBUTION_ID \
    --paths "/*"
```

## Backend Deployment (Elastic Beanstalk)

### Prerequisites

Install EB CLI:
```bash
pip install awsebcli
```

### Deployment Steps

#### Step 1: Initialize Elastic Beanstalk

```bash
cd backend
eb init -p python-3.11 excelleta-backend --region us-east-1
```

#### Step 2: Create Environment

```bash
eb create excelleta-backend-env
```

#### Step 3: Set Environment Variables

```bash
eb setenv \
    MONGO_URL="mongodb+srv://user:pass@cluster.mongodb.net/" \
    DB_NAME="excelleta_db" \
    CORS_ORIGINS="https://your-frontend-domain.com"
```

#### Step 4: Deploy Updates

```bash
eb deploy
```

#### Step 5: View Application

```bash
eb open
```

### Useful EB Commands

```bash
eb status          # Check environment status
eb logs            # View logs
eb health          # Check health
eb terminate       # Delete environment
```

## Backend Deployment (Docker + ECS)

### Step 1: Build Docker Image

```bash
cd backend
docker build -t excelleta-backend .
```

### Step 2: Tag and Push to ECR

```bash
# Create ECR repository
aws ecr create-repository --repository-name excelleta-backend

# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag excelleta-backend:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/excelleta-backend:latest

# Push image
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/excelleta-backend:latest
```

### Step 3: Create ECS Task Definition

Create `task-definition.json`:
```json
{
  "family": "excelleta-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "excelleta-backend",
      "image": "YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/excelleta-backend:latest",
      "portMappings": [
        {
          "containerPort": 8000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "MONGO_URL",
          "value": "mongodb+srv://user:pass@cluster.mongodb.net/"
        },
        {
          "name": "DB_NAME",
          "value": "excelleta_db"
        },
        {
          "name": "CORS_ORIGINS",
          "value": "https://your-frontend-domain.com"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/excelleta-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### Step 4: Register Task Definition

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

### Step 5: Create ECS Service

Use AWS Console or CLI to create an ECS service with the task definition.

## Environment Variables

### Backend (.env)

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=excelleta_db
CORS_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

### Frontend (.env.production)

```env
REACT_APP_API_URL=https://your-backend-api.com
```

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Add your IP address to whitelist
5. Update `MONGO_URL` in backend environment variables

### Option 2: EC2 Instance

1. Launch EC2 instance
2. Install MongoDB
3. Configure security groups
4. Update `MONGO_URL` to point to EC2 instance

## Troubleshooting

### Frontend Issues

**Build fails:**
- Check Node.js version (should be 16+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for syntax errors in code

**S3 upload fails:**
- Verify AWS credentials: `aws sts get-caller-identity`
- Check bucket permissions
- Ensure bucket policy allows public read

**CloudFront not updating:**
- Create invalidation: `aws cloudfront create-invalidation --distribution-id ID --paths "/*"`
- Wait 15-20 minutes for distribution to update

### Backend Issues

**Elastic Beanstalk deployment fails:**
- Check logs: `eb logs`
- Verify environment variables are set correctly
- Ensure MongoDB connection string is correct
- Check security groups allow traffic on port 8000

**Docker build fails:**
- Verify Dockerfile syntax
- Check Python version compatibility
- Ensure all dependencies are in requirements.txt

**Connection to MongoDB fails:**
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Ensure security groups allow outbound traffic

### Common Errors

**CORS errors:**
- Update `CORS_ORIGINS` in backend to include your frontend domain
- Ensure no trailing slashes in URLs

**API not reachable:**
- Check security groups
- Verify backend is running
- Check CloudFront/ALB configuration

## Cost Estimation

### Free Tier (First Year)
- S3: 5GB storage, 20,000 GET requests
- CloudFront: 50GB data transfer
- Elastic Beanstalk: 750 hours/month
- EC2: 750 hours/month (t2.micro)

### Estimated Monthly Cost (After Free Tier)
- S3: ~$0.50-2/month
- CloudFront: ~$1-5/month
- Elastic Beanstalk: ~$15-30/month
- MongoDB Atlas: Free tier available

## Next Steps

1. Set up custom domain with Route 53
2. Configure SSL certificates with ACM
3. Set up CI/CD with GitHub Actions or AWS CodePipeline
4. Configure monitoring with CloudWatch
5. Set up backup strategies for MongoDB

## Support

For issues or questions, please refer to:
- [AWS Documentation](https://docs.aws.amazon.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)

