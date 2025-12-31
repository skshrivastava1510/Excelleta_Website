# Excelleta Website

A modern web application built with React (frontend) and FastAPI (backend), designed to be deployed on AWS.

## 🚀 Features

- **Frontend**: React 19 with Tailwind CSS and shadcn/ui components
- **Backend**: FastAPI with MongoDB integration
- **Deployment Ready**: Pre-configured for AWS deployment (S3, CloudFront, Elastic Beanstalk/ECS)

## 📁 Project Structure

```
Excelleta_Website/
├── backend/           # FastAPI backend
│   ├── server.py      # Main application file
│   ├── requirements.txt
│   ├── Dockerfile     # Docker configuration
│   └── .ebextensions/ # Elastic Beanstalk config
├── frontend/          # React frontend
│   ├── src/           # Source code
│   ├── public/        # Static files
│   └── package.json
├── scripts/           # Build and deployment scripts
└── DEPLOYMENT.md      # Detailed deployment guide
```

## 🏃 Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for a 5-minute setup guide.

> **Important**: If your website is a **static landing page** (no user data, forms, etc.), you may not need MongoDB or even a backend! See [NO_DATABASE_OPTION.md](./NO_DATABASE_OPTION.md) for a simpler deployment.

### Local Development

1. **Backend**:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   # Create .env file with MongoDB connection
   uvicorn server:app --reload
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   # Create .env file with API URL
   npm start
   ```

## 🛠️ Building

```bash
# Build both frontend and backend
chmod +x scripts/build.sh
./scripts/build.sh
```

## ☁️ AWS Deployment

### Frontend (S3 + CloudFront)
```bash
chmod +x scripts/setup-s3-cloudfront.sh
./scripts/setup-s3-cloudfront.sh
```

### Backend (Elastic Beanstalk)
```bash
cd backend
pip install awsebcli
eb init -p python-3.11 excelleta-backend
eb create excelleta-backend-env
eb deploy
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📚 Documentation

- [Quick Start Guide](./QUICKSTART.md) - Get started in 5 minutes
- [Deployment Guide](./DEPLOYMENT.md) - Complete AWS deployment instructions
- [Backend API Docs](http://localhost:8000/docs) - Interactive API documentation (when backend is running)

## 🔧 Technology Stack

### Frontend
- React 19
- Tailwind CSS
- shadcn/ui components
- React Router
- Axios

### Backend
- FastAPI
- MongoDB (via Motor)
- Pydantic
- Uvicorn

## 📝 Environment Variables

### Backend
Create `backend/.env`:
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
DB_NAME=excelleta_db
CORS_ORIGINS=http://localhost:3000
```

### Frontend
Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:8000
```

## 🐳 Docker Support

The backend includes a Dockerfile for containerized deployment:

```bash
cd backend
docker build -t excelleta-backend .
docker run -p 8000:8000 --env-file .env excelleta-backend
```

## 📦 Scripts

- `scripts/build.sh` - Build both frontend and backend
- `scripts/deploy-aws.sh` - Interactive AWS deployment
- `scripts/setup-s3-cloudfront.sh` - Set up S3 and CloudFront for frontend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

[Add your license here]

## 🆘 Support

For deployment issues, check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section.

For questions or issues, please open an issue on GitHub.
