# AI Summarizer & Sharer

A modern web application that transforms meeting transcripts into AI-powered summaries and shares them via email.

🌐 **Live Demo:** [http://ai-summarizer.crabdance.com](http://ai-summarizer.crabdance.com) or [http://67.220.85.157:6216](http://67.220.85.157:6216)

## Features

- 📄 **Upload or paste** meeting transcripts
- 🤖 **AI-powered summarization** using Groq
- ✉️ **Email sharing** with Resend
- 🎨 **Clean, responsive UI** with DaisyUI
- 📱 **Mobile-friendly** design

## Quick Start

### 1. Clone & Install

```bash
git clone <repository-url>
cd ai-summarizer-and-sharer
npm install
npm run install:all
```

### 2. Environment Setup

Create `.env` in the root directory:

```env
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key
PORT=5000
FROM_EMAIL=your_email@domain.com
```

### 3. Get API Keys

- **Groq AI**: [console.groq.com](https://console.groq.com/) → API Keys
- **Resend**: [resend.com](https://resend.com/) → API Keys

### 4. Start Development

```bash
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
├── frontend/          # React + Vite + Tailwind
├── backend/           # Express API server
├── dist/              # Built frontend (after build)
└── .env              # Environment variables
```

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, DaisyUI  
**Backend:** Node.js, Express, Groq AI, Resend  
**State Management:** React Context API

## Commands

```bash
npm run dev              # Start both frontend & backend
npm run build:frontend   # Build for production
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only
```

## API Endpoints

- `POST /api/summarize` - Generate AI summary
- `POST /api/send-email` - Send email with summary
- `GET /api/health` - Health check

## Usage

1. Upload transcript or paste text
2. Optionally customize AI instructions
3. Generate summary with AI
4. Edit and review summary
5. Send via email to recipients

## Deployment

**Frontend:** Build with `npm run build:frontend` → Deploy `dist/` folder  
**Backend:** Deploy backend folder with environment variables

---

Built with ❤️ using modern web technologies
