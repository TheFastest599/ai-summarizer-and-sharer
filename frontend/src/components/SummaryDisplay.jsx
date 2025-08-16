import { FileText, Edit3, Copy, Check } from 'lucide-react';
import { useState } from 'react';

/**
 * Enhanced SummaryDisplay component with DaisyUI styling
 */
const SummaryDisplay = ({ summary, onSummaryChange }) => {
  const [copied, setCopied] = useState(false);

  if (!summary) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          <div className="badge badge-accent badge-lg">
            <FileText className="w-4 h-4 mr-1" />
            AI Summary
          </div>
          <div className="badge badge-success badge-sm">Ready</div>
        </h2>

        <div className="stats shadow mb-4">
          <div className="stat">
            <div className="stat-title">Words</div>
            <div className="stat-value text-primary">
              {summary.split(' ').length}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Characters</div>
            <div className="stat-value text-secondary">{summary.length}</div>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit your summary
            </span>
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-ghost"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </label>
          <textarea
            className="textarea textarea-bordered textarea-lg h-64 text-sm leading-relaxed"
            value={summary}
            onChange={e => onSummaryChange(e.target.value)}
            placeholder="Your AI-generated summary will appear here..."
          />
          <label className="label">
            <span className="label-text-alt">
              You can edit the summary before sending
            </span>
            <span className="label-text-alt text-success">Ready to share</span>
          </label>
        </div>

        <div className="alert alert-info mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            Review and edit your summary, then proceed to email sharing below.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryDisplay;
