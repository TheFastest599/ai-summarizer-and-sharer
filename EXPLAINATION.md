# **AI Meeting Notes Summarizer & Sharer – Approach,Process & Tech Stack**

## **Problem Statement**

In modern workplaces, meetings often generate lengthy transcripts or notes that are difficult to digest and share. Professionals need a tool that can:

- Ingest transcripts (uploaded or pasted).
- Generate summaries based on **custom instructions**.
- Provide **editable summaries** with **markdown preview**.
- Share final notes via **email** with a clean interface.

The solution should be **lightweight, functional, and user-friendly**, prioritizing functionality over design.

---

## **Tech Stack**

- **Frontend**: React (Vite) + TailwindCSS + DaisyUI
- **Backend**: Node.js + Express.js
- **AI Service**: Groq API (for summarization)
- **Email Service**: Resend (for sending summaries via email)
- **UI Enhancements**: Toast notifications, Markdown preview, Responsive layout

---

## **Process & Approach**

1. **Monorepo Setup**

   - Create a monorepo with `/frontend` and `/backend`.
   - Root `.env` file for managing API keys (Groq, Resend).
   - Scripts in root `package.json` to start both frontend and backend.

2. **Frontend Development**

   - **Transcript Input**:

     - Support `.txt` upload + text paste.
     - Display transcript in an editable textarea.

   - **Custom Prompt Input**:

     - Input field for summarization instructions.

   - **Generate Summary Flow**:

     - Send transcript + prompt → `/api/summarize`.
     - Display summary in an editable textarea.
     - Add **Markdown preview toggle** for formatted view.

   - **Email Sending**:

     - Input for recipient email(s).
     - Send request → `/api/send-email`.

   - **Notifications**:

     - Show toast success/error for summary generation and email sending.

   - **Responsiveness**:

     - Use DaisyUI responsive components to make it look good on mobile/desktop.

3. **Backend Development**

   - `POST /api/summarize`:

     - Accept transcript + prompt.
     - Call **Groq API** for summarization.
     - Return structured summary.

   - `POST /api/send-email`:

     - Accept summary + recipients.
     - Use **Resend API** to send emails.
     - Return success/error.

   - Error handling & validation for input data.

4. **Testing & Iteration**

   - Test frontend/backend integration.
   - Debug and refine prompts to ensure Groq AI gives concise, useful summaries.
   - Adjust styling & layout for better UX.
   - Validate email sending and notification flow.

5. **Deployment**

   - Deploy **frontend** (Netlify/Vercel).
   - Deploy **backend** (Render/Railway/Heroku).
   - Ensure `.env` keys are securely managed.

---

## **Agentic AI Prompt**

```
ai-meeting-summarizer/
│
├── frontend/      ← Vite + React + DaisyUI + toast notifications
├── backend/       ← Express + Groq AI + Resend
├── .env           ← GROQ_API_KEY, RESEND_API_KEY, etc.
├── package.json   ← optional root package.json for scripts
├── README.md
```

---

**Task:**
Build a **full-stack AI Meeting Notes Summarizer & Sharer** with a **monorepo** structure.

---

## Features

1. **Transcript Input**

   - Upload `.txt` file **or** paste transcript text
   - Display transcript in editable textarea

2. **Custom Prompt Input**

   - Input field for instructions (e.g., _“Summarize in bullet points”_)

3. **AI Summary Generation**

   - Button: **"Generate Summary"**
   - Sends transcript + prompt to backend route `/api/summarize`
   - Backend calls **Groq API** → returns structured summary
   - Display editable summary in textarea

4. **Editable Summary + Sharing**

   - Users can edit summary
   - Input field for recipient email(s)
   - Button: **"Send Email"** → backend calls **Resend API**
   - Toast notifications for success/error

5. **Notification System**

   - Success: ✅ Summary generated / Email sent
   - Error: ❌ API or validation errors

---

## Tech Stack

### Frontend (`frontend/`)

- **Vite + React.js**
- **Tailwind CSS + DaisyUI**
- Components:

  - File upload + paste transcript
  - Textarea for transcript & summary
  - Edit and Preview tab for summary.
  - Preview summary in markdown format.
  - Input for custom prompt & recipient email(s)
  - Buttons for actions
  - Toast notification system

### Backend (`backend/`)

- **Node.js + Express.js**
- Routes:

  - `POST /api/summarize` → Groq AI summarization
  - `POST /api/send-email` → Resend API email sending

- Environment variables read from root `.env`:

  - `GROQ_API_KEY` → Groq AI key
  - `RESEND_API_KEY` → Resend API key

---

## Monorepo Setup

- Root folder:

  - `.env` → store all secrets
  - Optional root `package.json` for convenience (e.g., `npm run start:frontend`, `npm run start:backend`)

- `frontend/` → Vite + React + DaisyUI
- `backend/` → Express + AI/email services

---

## Implementation Notes

1. **Frontend Flow**

   - Upload `.txt` file or paste → show in textarea
   - Enter custom prompt → click **Generate Summary** → fetch `/api/summarize` → display editable summary
   - Enter recipient email(s) → click **Send Email** → toast notifications

2. **Backend Flow**

   - `/api/summarize`: transcript + prompt → call Groq API → return summary
   - `/api/send-email`: summary + recipient(s) → call Resend → return success/error

3. **UI/UX**

   - Minimal, clean, polished with **DaisyUI**
   - Toasts for feedback

---

## Deliverables

- **Monorepo** with `frontend/` and `backend/`
- Fully working **React frontend + Express backend**
- Integration with **Groq AI + Resend**
- **Notifications system**
- Ready to run locally & deploy
- Include **README.md** with setup instructions

---
