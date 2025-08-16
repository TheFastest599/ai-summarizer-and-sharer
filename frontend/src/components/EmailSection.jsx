import { Mail, Send, Loader2, Users, MessageSquare } from 'lucide-react';

/**
 * Enhanced EmailSection component with DaisyUI styling
 */
const EmailSection = ({
  summary,
  subject,
  onSubjectChange,
  recipients,
  onRecipientsChange,
  onSendEmail,
  isSending,
}) => {
  if (!summary) return null;

  const emailCount = recipients
    ? recipients.split(',').filter(email => email.trim()).length
    : 0;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          <div className="badge badge-info badge-lg">
            <Mail className="w-4 h-4 mr-1" />
            Step 3
          </div>
          Share via Email
        </h2>

        <div className="alert alert-info mb-4">
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
          <span>Send your AI-generated summary to team members instantly</span>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Email Subject
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered input-lg"
              value={subject}
              onChange={e => onSubjectChange(e.target.value)}
              placeholder="Meeting Summary - [Date]"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Recipients
              </span>
              {emailCount > 0 && (
                <span className="label-text-alt">
                  <div className="badge badge-primary badge-sm">
                    {emailCount} recipient{emailCount > 1 ? 's' : ''}
                  </div>
                </span>
              )}
            </label>
            <input
              type="text"
              className="input input-bordered input-lg"
              value={recipients}
              onChange={e => onRecipientsChange(e.target.value)}
              placeholder="john@company.com, sarah@company.com, team@company.com"
            />
            <label className="label">
              <span className="label-text-alt">
                Separate multiple emails with commas
              </span>
            </label>
          </div>
        </div>

        <div className="mockup-window border bg-base-300 mb-4">
          <div className="flex justify-center px-4 py-16 bg-base-200">
            <div className="text-center">
              <h3 className="font-bold text-lg">Email Preview</h3>
              <p className="text-sm text-base-content/70 mt-2">
                Subject: {subject || 'Meeting Summary'}
              </p>
              <p className="text-sm text-base-content/70">
                To: {recipients || 'Recipients will appear here'}
              </p>
              <div className="badge badge-outline mt-2">
                Summary: {summary.split(' ').length} words
              </div>
            </div>
          </div>
        </div>

        <div className="card-actions justify-end">
          <button
            className={`btn btn-success btn-lg ${
              isSending ? 'btn-disabled' : ''
            }`}
            onClick={onSendEmail}
            disabled={!summary.trim() || !recipients.trim() || isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="loading loading-dots loading-sm"></span>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Email to {emailCount || '?'} Recipient
                {emailCount !== 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>

        {(!recipients || emailCount === 0) && (
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
            <span>Please enter at least one recipient email address</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailSection;
