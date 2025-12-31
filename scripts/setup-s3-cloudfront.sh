#!/bin/bash

# Script to set up S3 bucket and CloudFront distribution for frontend

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🌐 Setting up S3 and CloudFront for Frontend${NC}"
echo ""

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first."
    exit 1
fi

# Get inputs
read -p "Enter S3 bucket name (must be globally unique): " BUCKET_NAME
read -p "Enter your domain name (optional, press Enter to skip): " DOMAIN_NAME

AWS_REGION=$(aws configure get region || echo "us-east-1")

echo ""
echo -e "${BLUE}Creating S3 bucket...${NC}"

# Create bucket
if [ "$AWS_REGION" = "us-east-1" ]; then
    aws s3 mb s3://$BUCKET_NAME
else
    aws s3 mb s3://$BUCKET_NAME --region $AWS_REGION
fi

# Enable static website hosting
aws s3 website s3://$BUCKET_NAME \
    --index-document index.html \
    --error-document index.html

# Set bucket policy for public read access
cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/bucket-policy.json

# Remove public access block
aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo -e "${GREEN}✅ S3 bucket created and configured${NC}"

# Build and upload frontend
echo ""
echo -e "${BLUE}Building and uploading frontend...${NC}"
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    if command -v yarn &> /dev/null; then
        yarn install
    else
        npm install
    fi
fi

echo "Building React app..."
if command -v yarn &> /dev/null; then
    yarn build
else
    npm run build
fi

echo "Uploading to S3..."
aws s3 sync build/ s3://$BUCKET_NAME --delete

cd ..

echo -e "${GREEN}✅ Frontend uploaded to S3${NC}"

# CloudFront setup
echo ""
read -p "Create CloudFront distribution? (y/n): " CREATE_CF

if [ "$CREATE_CF" = "y" ]; then
    echo -e "${BLUE}Creating CloudFront distribution...${NC}"
    
    # Create CloudFront distribution config
    cat > /tmp/cloudfront-config.json <<EOF
{
  "CallerReference": "$(date +%s)",
  "Comment": "Excelleta Website Distribution",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-$BUCKET_NAME",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-$BUCKET_NAME",
        "DomainName": "$BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
EOF
    
    DISTRIBUTION_ID=$(aws cloudfront create-distribution \
        --distribution-config file:///tmp/cloudfront-config.json \
        --query 'Distribution.Id' \
        --output text)
    
    echo -e "${GREEN}✅ CloudFront distribution created: $DISTRIBUTION_ID${NC}"
    echo ""
    echo "⚠️  Note: CloudFront distribution may take 15-20 minutes to deploy."
    echo "   Distribution ID: $DISTRIBUTION_ID"
    echo "   You can check status with: aws cloudfront get-distribution --id $DISTRIBUTION_ID"
fi

# Cleanup
rm -f /tmp/bucket-policy.json /tmp/cloudfront-config.json

echo ""
echo -e "${GREEN}🎉 Setup completed!${NC}"
echo ""
echo "S3 Website URL: http://$BUCKET_NAME.s3-website-$AWS_REGION.amazonaws.com"
if [ -n "$DISTRIBUTION_ID" ]; then
    echo "CloudFront URL: https://$(aws cloudfront get-distribution --id $DISTRIBUTION_ID --query 'Distribution.DomainName' --output text)"
fi

