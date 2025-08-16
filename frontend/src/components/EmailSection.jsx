import { Mail, Send, Loader2, Users, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

/**
 * Modern EmailSection component with clean design
 */
const EmailSection = () => {
  const {
    summary,
    subject,
    setSubject,
    recipients,
    setRecipients,
    sendEmail,
    isSending,
  } = useAppContext();

  const handleSendEmail = () => {
    sendEmail(summary);
  };

  if (!summary) return null;

  const emailCount = recipients
    ? recipients.split(',').filter(email => email.trim()).length
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-info text-info-content text-sm font-bold">
            4
          </div>
          <h2 className="text-2xl font-bold text-base-content">
            Share via Email
          </h2>
        </div>
        <p className="text-base-content/70 ml-11">
          Send your summary to team members and stakeholders
        </p>
      </div>

      {/* Content */}
      <div className="bg-base-100 rounded-lg border border-base-300 p-6 space-y-6">
        {/* Email Subject */}
        <div>
          <label className="block text-sm font-medium text-base-content mb-3">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Email Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            placeholder="Meeting Summary - [Date]"
          />
        </div>

        {/* Recipients */}
        <div>
          <label className="block text-sm font-medium text-base-content mb-3">
            <Users className="w-4 h-4 inline mr-2" />
            Recipients ({emailCount}{' '}
            {emailCount === 1 ? 'recipient' : 'recipients'})
          </label>
          <input
            type="text"
            value={recipients}
            onChange={e => setRecipients(e.target.value)}
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            placeholder="john@company.com, sarah@company.com, team@company.com"
          />
          <div className="text-xs text-base-content/70 mt-2">
            Separate multiple emails with commas
          </div>
        </div>

        {/* Email Preview */}
        <div className="p-4 bg-base-200 rounded-lg">
          <h4 className="font-medium text-base-content mb-2">Email Preview</h4>
          <div className="text-sm text-base-content/70 space-y-1">
            <div>
              <strong>Subject:</strong> {subject || 'Meeting Summary'}
            </div>
            <div>
              <strong>To:</strong> {recipients || 'Recipients will appear here'}
            </div>
            <div>
              <strong>Content:</strong> {summary.split(' ').length} words
              summary
            </div>
          </div>
        </div>

        {/* Send Button */}
        <div className="pt-4 border-t border-base-300">
          <button
            onClick={handleSendEmail}
            disabled={!summary.trim() || !recipients.trim() || isSending}
            className={`btn btn-success btn-lg w-full ${
              isSending ? 'btn-ghost' : ''
            }`}
          >
            {isSending ? (
              <>
                <span className="loading loading-spinner loading-lg">
                  Sending Email...
                </span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send to {emailCount || '?'} Recipient
                {emailCount !== 1 ? 's' : ''}
              </>
            )}
          </button>

          {(!recipients || emailCount === 0) && (
            <p className="text-center text-sm text-base-content/50 mt-2">
              Enter recipient email addresses to send
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSection;
