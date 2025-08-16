import React from 'react';

// Components
import {
  Header,
  Footer,
  TranscriptUpload,
  PromptSection,
  SummaryDisplay,
  EmailSection,
} from './components';

// Context
import { useAppContext } from './context/AppContext';

/**
 * Main App component using DaisyUI components only
 */
function App() {
  // Get state from context for conditional rendering
  const { transcript, summary } = useAppContext();

  return (
    <div className="min-h-screen bg-base-100">
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-12 flex justify-center">
          <ul className="steps steps-horizontal w-full max-w-2xl">
            <li className={`step ${transcript ? 'step-primary' : ''}`}>
              <span className="hidden sm:inline">Upload Transcript</span>
              <span className="sm:hidden">Upload</span>
            </li>
            <li className={`step ${summary ? 'step-primary' : ''}`}>
              <span className="hidden sm:inline">Generate Summary</span>
              <span className="sm:hidden">Generate</span>
            </li>
            <li className={`step ${summary ? 'step-primary' : ''}`}>
              <span className="hidden sm:inline">Share via Email</span>
              <span className="sm:hidden">Share</span>
            </li>
          </ul>
        </div>

        {/* Step 1: Upload Transcript */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-4xl">
            <TranscriptUpload />
          </div>
        </div>

        {/* Step 2: Customize & Generate (Only show if transcript exists) */}
        {transcript && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="flex justify-center">
                <div className="w-full max-w-lg">
                  <PromptSection />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-lg">
                  <SummaryDisplay />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Email Section (Only show if summary exists) */}
        {summary && (
          <div className="mb-12 flex justify-center">
            <div className="w-full max-w-2xl">
              <EmailSection />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
