import { useState } from 'react';

// Components
import {
  Header,
  Footer,
  TranscriptUpload,
  PromptSection,
  SummaryDisplay,
  EmailSection,
} from './components';

// Custom hooks
import { useTranscript } from './hooks/useTranscript';
import { useSummarizer } from './hooks/useSummarizer';
import { useEmailSender } from './hooks/useEmailSender';

/**
 * Main App component using DaisyUI components only
 */
function App() {
  // Custom prompt state
  const [customPrompt, setCustomPrompt] = useState('');

  // Custom hooks for functionality
  const { transcript, setTranscript, handleFileUpload } = useTranscript();
  const { summary, setSummary, isGenerating, generateSummary } =
    useSummarizer();
  const {
    recipients,
    setRecipients,
    subject,
    setSubject,
    isSending,
    sendEmail,
  } = useEmailSender();

  // Event handlers
  const handleGenerateSummary = () => {
    generateSummary(transcript, customPrompt);
  };

  const handleSendEmail = () => {
    sendEmail(summary);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Header />

      {/* Hero Section */}
      <div className="hero bg-base-200 py-8">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">Transform Your Meeting Notes</h2>
            <p className="py-4 text-lg">
              Upload your transcript, get AI-powered summaries, and share them
              instantly with your team.
            </p>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">AI Powered</div>
                <div className="stat-value text-primary">Groq</div>
                <div className="stat-desc">Lightning fast AI</div>
              </div>
              <div className="stat">
                <div className="stat-title">Email Service</div>
                <div className="stat-value text-secondary">Resend</div>
                <div className="stat-desc">Reliable delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <ul className="steps steps-horizontal w-full">
            <li className={`step ${transcript ? 'step-primary' : ''}`}>
              Upload Transcript
            </li>
            <li className={`step ${summary ? 'step-primary' : ''}`}>
              Generate Summary
            </li>
            <li className={`step ${summary ? 'step-primary' : ''}`}>
              Share via Email
            </li>
          </ul>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <TranscriptUpload
              transcript={transcript}
              onTranscriptChange={setTranscript}
              onFileUpload={handleFileUpload}
            />

            <PromptSection
              customPrompt={customPrompt}
              onPromptChange={setCustomPrompt}
              onGenerateSummary={handleGenerateSummary}
              isGenerating={isGenerating}
              transcript={transcript}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SummaryDisplay summary={summary} onSummaryChange={setSummary} />

            <EmailSection
              summary={summary}
              subject={subject}
              onSubjectChange={setSubject}
              recipients={recipients}
              onRecipientsChange={setRecipients}
              onSendEmail={handleSendEmail}
              isSending={isSending}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
