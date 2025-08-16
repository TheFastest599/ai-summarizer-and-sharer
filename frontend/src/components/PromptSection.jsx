import { useAppContext } from '../context/AppContext';

/**
 * Modern PromptSection component with clean design
 */
const PromptSection = () => {
  const {
    customPrompt,
    setCustomPrompt,
    generateSummary,
    isGenerating,
    transcript,
  } = useAppContext();

  const handleGenerateSummary = () => {
    generateSummary(transcript, customPrompt);
  };

  const promptExamples = [
    'Create bullet points with action items',
    'Focus on key decisions and next steps',
    'Executive summary with highlights',
    'List action items with owners',
    'Extract main topics and outcomes',
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-content text-sm font-bold">
            2
          </div>
          <h2 className="text-2xl font-bold text-base-content">
            Customize AI Instructions
          </h2>
        </div>
        <p className="text-base-content/70 ml-11">
          Tell the AI how you want your transcript summarized
        </p>
      </div>

      {/* Content */}
      <div className="bg-base-100 rounded-lg border border-base-300 p-6 space-y-6">
        {/* Quick Examples */}
        <div>
          <label className="block text-sm font-medium text-base-content mb-3">
            Quick Templates
          </label>
          <div className="flex flex-wrap gap-2">
            {promptExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setCustomPrompt(example)}
                className="btn btn-sm btn-outline hover:btn-primary transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Prompt */}
        <div>
          <label className="block text-sm font-medium text-base-content mb-3">
            Custom Instructions (Optional)
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-24 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            placeholder="Tell the AI how to summarize your meeting...

Examples:
• Focus on technical decisions and implementation details
• Create a summary for executive presentation
• Extract all action items with deadlines and owners"
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
          />
          <div className="text-xs text-base-content/70 mt-2">
            Leave empty for default smart summarization
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4 border-t border-base-300">
          <button
            onClick={handleGenerateSummary}
            disabled={!transcript.trim() || isGenerating}
            className={`btn btn-primary btn-lg w-full ${
              isGenerating ? 'btn-ghost' : ''
            }`}
          >
            {isGenerating ? (
              <span className="loading loading-spinner loading-lg">
                Generating Summary...
              </span>
            ) : (
              <span>Generate AI Summary</span>
            )}
          </button>

          {!transcript.trim() && (
            <p className="text-center text-sm text-base-content/50 mt-2">
              Upload a transcript first to generate summary
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptSection;
