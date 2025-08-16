import {
  FileText,
  Edit3,
  Copy,
  Check,
  Sparkles,
  Eye,
  Code,
} from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

/**
 * Modern SummaryDisplay component with clean design and markdown support
 */
const SummaryDisplay = () => {
  const { summary, setSummary } = useAppContext();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'preview'

  // Function to clean text by removing think tags
  const cleanThinkTags = text => {
    return text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  };

  // Handle summary change and clean think tags
  const handleSummaryChange = value => {
    const cleanedValue = cleanThinkTags(value);
    setSummary(cleanedValue);
  };

  // Simple markdown renderer for preview
  const renderMarkdown = text => {
    if (!text) return '';

    // Remove content within <think> tags first
    const cleanedText = cleanThinkTags(text);

    return (
      cleanedText
        // Bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Bullet points
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        // Headers
        .replace(
          /^#{1}\s+(.*$)/gm,
          '<h1 class="text-xl font-bold mb-2">$1</h1>'
        )
        .replace(
          /^#{2}\s+(.*$)/gm,
          '<h2 class="text-lg font-bold mb-2">$1</h2>'
        )
        .replace(
          /^#{3}\s+(.*$)/gm,
          '<h3 class="text-base font-bold mb-1">$1</h3>'
        )
        // Links
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="link link-primary" target="_blank" rel="noopener noreferrer">$1</a>'
        )
        // Line breaks
        .replace(/\n/g, '<br/>')
        // Wrap list items in ul
        .replace(
          /(<li>.*<\/li>)/gs,
          '<ul class="list-disc list-inside space-y-1 ml-4">$1</ul>'
        )
    );
  };

  if (!summary) {
    return (
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-content text-sm font-bold">
              3
            </div>
            <h2 className="text-2xl font-bold text-base-content">AI Summary</h2>
          </div>
          <p className="text-base-content/70 ml-11">
            Your AI-generated summary will appear here
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-base-100 rounded-lg border border-base-300 p-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-base-content/50" />
            </div>
            <h3 className="text-lg font-medium text-base-content/70 mb-2">
              Waiting for summary
            </h3>
            <p className="text-sm text-base-content/50">
              Generate a summary from your transcript to see results here
            </p>
          </div>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = summary.trim().split(/\s+/).length;
  const charCount = summary.length;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-content text-sm font-bold">
            3
          </div>
          <h2 className="text-2xl font-bold text-base-content">AI Summary</h2>
          <div className="badge badge-success">Ready</div>
        </div>
        <p className="text-base-content/70 ml-11">
          Review and edit your AI-generated summary
        </p>
      </div>

      {/* Content */}
      <div className="bg-base-100 rounded-lg border border-base-300 p-6 space-y-4">
        {/* Stats */}
        <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-base-content/70">Words:</span>
              <span className="font-medium ml-1">{wordCount}</span>
            </div>
            <div>
              <span className="text-base-content/70">Characters:</span>
              <span className="font-medium ml-1">{charCount}</span>
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className="btn btn-sm btn-ghost"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Summary Text */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center text-sm font-medium text-base-content">
              <Edit3 className="w-4 h-4 inline mr-2" />
              {viewMode === 'edit' ? 'Edit Summary' : 'Preview Summary'}
            </label>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('edit')}
                className={`btn btn-xs ${
                  viewMode === 'edit' ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                <Code className="w-3 h-3 mr-1" />
                Edit
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`btn btn-xs ${
                  viewMode === 'preview' ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </button>
            </div>
          </div>

          {viewMode === 'edit' ? (
            <textarea
              className="textarea textarea-bordered w-full h-64 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-mono"
              value={cleanThinkTags(summary)}
              onChange={e => handleSummaryChange(e.target.value)}
              placeholder="Your AI-generated summary will appear here..."
              style={{
                lineHeight: '1.6',
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Cascadia, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              }}
            />
          ) : (
            <div
              className="border border-base-300 rounded-lg p-4 h-64 overflow-y-auto bg-base-50 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(summary) }}
            />
          )}

          <div className="text-xs text-base-content/70 mt-2 flex items-center gap-2">
            <span>You can edit the summary before sharing via email</span>
            <div className="badge badge-ghost badge-xs">Markdown supported</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDisplay;
