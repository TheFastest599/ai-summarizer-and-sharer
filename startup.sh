#!/bin/bash

# AI Summarizer & Sharer - Startup Script
echo "🚀 Starting AI Summarizer & Sharer deployment..."



# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build:frontend

echo "✅ Deployment complete! Ready to start the server."
echo "💡 Run 'npm start' to start the backend server."
