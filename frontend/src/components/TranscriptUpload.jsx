import { Upload, FileText, Type } from 'lucide-react';

/**
 * Enhanced TranscriptUpload component with DaisyUI styling
 */
const TranscriptUpload = ({ transcript, onTranscriptChange, onFileUpload }) => {
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          <div className="badge badge-primary badge-lg">
            <Upload className="w-4 h-4 mr-1" />
            Step 1
          </div>
          Upload Your Transcript
        </h2>

        <div className="tabs tabs-boxed mb-4">
          <a className="tab tab-active">
            <FileText className="w-4 h-4 mr-2" />
            Upload File
          </a>
          <a className="tab">
            <Type className="w-4 h-4 mr-2" />
            Paste Text
          </a>
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-semibold">Choose .txt file</span>
            <span className="label-text-alt">Max 10MB</span>
          </label>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="file-input file-input-bordered file-input-primary w-full"
          />
          <label className="label">
            <span className="label-text-alt">
              Supported formats: .txt files only
            </span>
          </label>
        </div>

        <div className="divider">OR</div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Paste transcript text
            </span>
            {transcript && (
              <span className="label-text-alt text-success font-medium">
                {transcript.length} characters
              </span>
            )}
          </label>
          <textarea
            className="textarea textarea-bordered textarea-lg h-40 text-sm leading-relaxed"
            placeholder="Paste your meeting transcript here... 

Example:
John: Welcome everyone to today's meeting.
Sarah: Thanks John. Let's start with the quarterly review.
Mike: I have the numbers ready..."
            value={transcript}
            onChange={e => onTranscriptChange(e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt">
              {transcript
                ? `${transcript.split(' ').length} words`
                : 'No content yet'}
            </span>
            {transcript && (
              <span className="label-text-alt text-primary">
                Ready for AI processing
              </span>
            )}
          </label>
        </div>

        {transcript && (
          <div className="alert alert-success mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Transcript loaded successfully! Ready to generate summary.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptUpload;
