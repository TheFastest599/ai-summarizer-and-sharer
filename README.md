# AI Meeting Summarizer & Sharer

A full-stack application that uses AI to summarize meeting transcripts and share them via email. Built with a modern monorepo structure using React, Tailwind CSS, DaisyUI, Groq AI, and Resend.

## 🚀 Features

- **📝 Transcript Input**: Upload .txt files or paste transcript text
- **🤖 AI Summarization**: Generate summaries using Groq AI with custom prompts
- **✉️ Email Sharing**: Send summaries to multiple recipients via Resend
- **🎨 Modern UI**: Clean, responsive design with DaisyUI components
- **🔄 Real-time Feedback**: Toast notifications for all user actions
- **📱 Mobile Friendly**: Responsive design that works on all devices

## 🏗️ Architecture

### Monorepo Structure

```
ai-meeting-summarizer/
├── frontend/          # React + Vite + DaisyUI
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Main application
├── backend/           # Express + Groq AI + Resend
│   ├── routes/        # API route handlers
│   └── server.js      # Express server
├── .env              # Environment variables
├── package.json      # Root package.json for scripts
└── README.md
```

### Frontend Architecture

#### Components (`src/components/`)

- **Header.jsx**: Application header with branding
- **Footer.jsx**: Application footer
- **TranscriptUpload.jsx**: File upload and text input
- **PromptSection.jsx**: Custom prompt input and summary generation
- **SummaryDisplay.jsx**: Display and edit generated summaries
- **EmailSection.jsx**: Email configuration and sending

#### Custom Hooks (`src/hooks/`)

- **useTranscript.js**: Manages transcript state and file upload
- **useSummarizer.js**: Handles AI summarization logic
- **useEmailSender.js**: Manages email functionality

#### Services (`src/services/`)

- **apiService.js**: Centralized API communication layer

#### Utilities (`src/utils/`)

- **fileUtils.js**: File handling and validation
- **validation.js**: Input validation functions

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Groq SDK** - AI summarization
- **Resend** - Email service
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Groq API key
- Resend API key

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-meeting-summarizer
```

### 2. Install Dependencies

```bash
# Install root dependencies for convenience scripts
npm install

# Install all dependencies for both frontend and backend
npm run install:all
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# AI & Email API Keys
GROQ_API_KEY=your_groq_api_key_here
RESEND_API_KEY=your_resend_api_key_here

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Email Configuration
FROM_EMAIL=your_email@domain.com
```

### 4. Get API Keys

#### Groq AI API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up/Sign in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key to your `.env` file

#### Resend API Key

1. Visit [Resend](https://resend.com/)
2. Sign up/Sign in
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file
6. Verify your domain or use their test domain

### 5. Start Development Servers

#### Option 1: Start both servers simultaneously

```bash
npm run dev
```

#### Option 2: Start servers individually

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

## 🔧 Available Scripts

### Root Level Scripts

```bash
npm run install:all      # Install dependencies for both frontend and backend
npm run dev             # Start both frontend and backend in development mode
npm run dev:frontend    # Start only frontend development server
npm run dev:backend     # Start only backend development server
npm run build:frontend  # Build frontend for production
npm run start          # Start backend in production mode
```

### Frontend Scripts

```bash
cd frontend
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

### Backend Scripts

```bash
cd backend
npm run dev            # Start with nodemon (auto-restart)
npm start              # Start in production mode
```

## 🌐 API Endpoints

### POST `/api/summarize`

Generates AI summary from transcript.

**Request Body:**

```json
{
  "transcript": "string (required)",
  "customPrompt": "string (optional)"
}
```

**Response:**

```json
{
  "summary": "string",
  "success": true,
  "message": "Summary generated successfully"
}
```

### POST `/api/send-email`

Sends summary via email.

**Request Body:**

```json
{
  "summary": "string (required)",
  "recipients": ["email1", "email2"],
  "subject": "string (optional)"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Email sent successfully to X recipient(s)",
  "sent": 2,
  "failed": 0
}
```

### GET `/api/health`

Health check endpoint.

**Response:**

```json
{
  "status": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🎯 Usage

1. **Upload Transcript**: Either upload a .txt file or paste your meeting transcript
2. **Add Custom Instructions** (Optional): Specify how you want the summary formatted
3. **Generate Summary**: Click "Generate Summary" to create an AI-powered summary
4. **Edit Summary**: Review and edit the generated summary as needed
5. **Send Email**: Enter recipient emails and click "Send Email" to share

## 🔒 Security Features

- Input validation for all user inputs
- File type and size validation
- Email format validation
- Error handling with user-friendly messages
- Environment variable protection

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend: `npm run build:frontend`
2. Deploy the `frontend/dist` folder
3. Configure environment variables in your hosting platform

### Backend (Railway/Heroku/DigitalOcean)

1. Deploy the entire project or just the backend folder
2. Set environment variables
3. Ensure the backend URL is correctly configured in frontend

### Full Stack (Docker)

```dockerfile
# Dockerfile example for full deployment
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:frontend
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com/) for AI summarization
- [Resend](https://resend.com/) for email delivery
- [DaisyUI](https://daisyui.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
