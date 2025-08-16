import { Wand2, Loader2, Sparkles, Brain } from 'lucide-react';

/**
 * Enhanced PromptSection component with DaisyUI styling
 */
const PromptSection = ({
  customPrompt,
  onPromptChange,
  onGenerateSummary,
  isGenerating,
  transcript,
}) => {
  const promptExamples = [
    'Summarize in bullet points with action items',
    'Focus on key decisions and next steps',
    'Create executive summary with highlights',
    'List all action items with owners',
    'Extract main topics and outcomes',
  ];

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          <div className="badge badge-secondary badge-lg">
            <Wand2 className="w-4 h-4 mr-1" />
            Step 2
          </div>
          Customize AI Instructions
        </h2>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">
              Custom prompt (optional)
            </span>
            <span className="label-text-alt">
              <Sparkles className="w-3 h-3 inline mr-1" />
              AI Enhancement
            </span>
          </label>
          <textarea
            className="textarea textarea-bordered textarea-lg h-24 text-sm"
            placeholder="Tell the AI how to summarize your meeting..."
            value={customPrompt}
            onChange={e => onPromptChange(e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt">
              Leave empty for default smart summarization
            </span>
          </label>
        </div>

        <div className="collapse collapse-arrow bg-base-200 mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium">
            💡 Quick Prompt Examples
          </div>
          <div className="collapse-content">
            <div className="space-y-2">
              {promptExamples.map((example, index) => (
                <div
                  key={index}
                  className="badge badge-outline cursor-pointer hover:badge-primary"
                  onClick={() => onPromptChange(example)}
                >
                  {example}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-actions justify-end">
          <button
            className={`btn btn-primary btn-lg ${
              isGenerating ? 'btn-disabled' : ''
            }`}
            onClick={onGenerateSummary}
            disabled={!transcript.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="loading loading-dots loading-sm"></span>
                Generating...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                Generate AI Summary
              </>
            )}
          </button>
        </div>

        {!transcript && (
          <div className="alert alert-warning mt-4">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.766 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span>Please upload or paste a transcript first</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptSection;
