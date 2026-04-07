import { X, MessageSquare, Mail, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface SupportModalProps {
  onClose: () => void;
  prefilledContext?: {
    email?: string;
    issue?: string;
  };
}

export function SupportModal({ 
  onClose,
  prefilledContext 
}: SupportModalProps) {
  const [formData, setFormData] = useState({
    email: prefilledContext?.email || '',
    subject: prefilledContext?.issue || '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      
      // Auto-close after showing success
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  if (sent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center animate-in fade-in zoom-in duration-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="size-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Message Sent!
          </h2>
          <p className="text-sm text-gray-600">
            We'll get back to you within 24 hours at {formData.email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="size-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Contact Support
          </h2>
          <p className="text-sm text-gray-600">
            Having trouble signing in? We're here to help!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:bg-white
                  transition-all duration-200"
                placeholder="you@example.com"
                disabled={isSending}
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                Issue Type
              </label>
              <select
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:bg-white
                  transition-all duration-200"
                disabled={isSending}
              >
                <option value="">Select an issue...</option>
                <option value="cant-sign-in">Can't sign in to my account</option>
                <option value="forgot-method">Forgot which sign-in method I used</option>
                <option value="account-locked">Account is locked</option>
                <option value="didnt-receive-code">Didn't receive verification code</option>
                <option value="merge-issues">Account merging issues</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                Describe Your Issue
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:bg-white
                  transition-all duration-200 resize-none"
                placeholder="Please provide as much detail as possible..."
                disabled={isSending}
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-700">
              <span className="font-medium text-gray-900">Response time:</span> We typically respond within 24 hours. 
              For urgent issues, we aim to respond within 2-4 hours during business hours.
            </p>
          </div>

          {/* Submit */}
          <div className="mt-6 space-y-3">
            <button
              type="submit"
              disabled={isSending}
              className="w-full h-11 bg-purple-600 text-white rounded-lg font-medium text-sm
                hover:bg-purple-700 active:bg-purple-800
                disabled:bg-gray-300 disabled:cursor-not-allowed
                transition-all duration-200
                flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Message
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full h-11 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm
                hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              disabled={isSending}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
