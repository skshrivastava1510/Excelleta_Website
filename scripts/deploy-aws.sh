#!/bin/bash

# AWS Deployment Script for Excelleta Website
# This script helps deploy the application to AWS

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 AWS Deployment Script for Excelleta Website${NC}"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first:${NC}"
    echo "   https://aws.amazon.com/cli/"
    exit 1
fi

# Check if user is authenticated
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Please run:${NC}"
    echo "   aws configure"
    exit 1
fi

# Get AWS account info
AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=$(aws configure get region || echo "us-east-1")

echo -e "${GREEN}✓ AWS CLI configured${NC}"
echo -e "  Account: ${AWS_ACCOUNT}"
echo -e "  Region: ${AWS_REGION}"
echo ""

# Prompt for S3 bucket name
read -p "Enter S3 bucket name for frontend (or press Enter to skip): " S3_BUCKET

if [ -n "$S3_BUCKET" ]; then
    echo -e "${BLUE}📦 Deploying frontend to S3...${NC}"
    
    # Build frontend first
    cd frontend
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies..."
        if command -v yarn &> /dev/null; then
            yarn install
        else
            npm install
        fi
    fi
    
    # Build React app
    echo "Building React app..."
    if command -v yarn &> /dev/null; then
        yarn build
    else
        npm run build
    fi
    
    # Sync to S3
    echo "Uploading to S3..."
    aws s3 sync build/ s3://$S3_BUCKET --delete
    
    echo -e "${GREEN}✅ Frontend deployed to S3 bucket: $S3_BUCKET${NC}"
    cd ..
fi

# Prompt for Elastic Beanstalk
read -p "Deploy backend to Elastic Beanstalk? (y/n): " DEPLOY_BACKEND

if [ "$DEPLOY_BACKEND" = "y" ]; then
    read -p "Enter Elastic Beanstalk application name: " EB_APP_NAME
    read -p "Enter Elastic Beanstalk environment name: " EB_ENV_NAME
    
    echo -e "${BLUE}📦 Deploying backend to Elastic Beanstalk...${NC}"
    
    cd backend
    
    # Check if EB CLI is installed
    if ! command -v eb &> /dev/null; then
        echo -e "${YELLOW}⚠️  EB CLI not found. Installing...${NC}"
        pip install awsebcli
    fi
    
    # Initialize EB if not already done
    if [ ! -d ".elasticbeanstalk" ]; then
        eb init -p python-3.11 $EB_APP_NAME --region $AWS_REGION
    fi
    
    # Create environment if it doesn't exist
    if ! eb list | grep -q "$EB_ENV_NAME"; then
        echo "Creating Elastic Beanstalk environment..."
        eb create $EB_ENV_NAME
    else
        echo "Deploying to existing environment..."
        eb deploy $EB_ENV_NAME
    fi
    
    echo -e "${GREEN}✅ Backend deployed to Elastic Beanstalk${NC}"
    cd ..
fi

echo ""
echo -e "${GREEN}🎉 Deployment completed!${NC}"

