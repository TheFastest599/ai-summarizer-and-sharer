import { Upload, FileText, CheckCircle, Copy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';

/**
 * Modern TranscriptUpload component with clean design
 */
const TranscriptUpload = () => {
  const { transcript, setTranscript, handleFileUpload } = useAppContext();
  const [activeTab, setActiveTab] = useState('upload');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      handleFileUpload(file);
    }
  };

  const handleDragOver = e => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const wordCount = transcript ? transcript.trim().split(/\s+/).length : 0;
  const charCount = transcript ? transcript.length : 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-content text-sm font-bold">
            1
          </div>
          <h2 className="text-2xl font-bold text-base-content">
            Upload Your Transcript
          </h2>
        </div>
        <p className="text-base-content/70 ml-11">
          Upload a text file or paste your meeting transcript to get started
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'upload'
              ? 'bg-base-100 border-b-2 border-primary text-primary'
              : 'bg-base-200 text-base-content/70 hover:text-base-content'
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload File
        </button>
        <button
          onClick={() => setActiveTab('paste')}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
            activeTab === 'paste'
              ? 'bg-base-100 border-b-2 border-primary text-primary'
              : 'bg-base-200 text-base-content/70 hover:text-base-content'
          }`}
        >
          <FileText className="w-4 h-4" />
          Paste Text
        </button>
      </div>

      {/* Content */}
      <div className="bg-base-100 rounded-lg border border-base-300 p-6">
        {activeTab === 'upload' ? (
          /* Upload Tab */
          <div className="space-y-4">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-base-300 hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-base-content mb-2">
                    Drop your file here or click to browse
                  </p>
                  <p className="text-sm text-base-content/70">
                    Supports .txt files up to 10MB
                  </p>
                </div>
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileChange}
                  className="file-input file-input-primary file-input-bordered w-full max-w-xs"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Paste Tab */
          <div className="space-y-4">
            <div className="relative">
              <textarea
                className="textarea textarea-bordered w-full h-48 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                placeholder="Paste your meeting transcript here...

Example:
[09:00] John: Good morning everyone, let's start today's standup.
[09:01] Sarah: I completed the user authentication feature yesterday.
[09:02] Mike: I'm working on the database optimization, should be done by EOD."
                value={transcript}
                onChange={e => setTranscript(e.target.value)}
              />
              {transcript && (
                <button
                  onClick={() => navigator.clipboard.writeText(transcript)}
                  className="absolute top-3 right-3 btn btn-ghost btn-sm"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        {transcript && (
          <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium text-success">
                  Transcript loaded successfully!
                </span>
              </div>
              <div className="flex gap-4 text-sm text-base-content/70">
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptUpload;
