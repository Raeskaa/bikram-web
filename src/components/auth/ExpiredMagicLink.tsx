import { AuthLayout } from './AuthLayout';
import { Clock, Mail, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ExpiredMagicLinkProps {
  email: string;
  onRequestNew: (email: string) => void;
  onBackToSignIn: () => void;
}

export function ExpiredMagicLink({ 
  email, 
  onRequestNew, 
  onBackToSignIn 
}: ExpiredMagicLinkProps) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [emailInput, setEmailInput] = useState(email);

  const handleRequestNew = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequesting(true);

    // Simulate API call
    setTimeout(() => {
      onRequestNew(emailInput);
    }, 1000);
  };

  return (
    <AuthLayout
      title="Link Expired"
      subtitle="This sign-in link has expired or already been used"
      showGuestOption={false}
    >
      {/* Expired Notice */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Clock className="size-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-yellow-900 mb-1">Magic links expire after 15 minutes</p>
            <p className="text-yellow-700">
              For security reasons, sign-in links are only valid for a short time.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleRequestNew} className="space-y-5">
        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email address
          </label>
          <div className="flex items-center gap-2">
            <Mail className="size-5 text-gray-400" />
            <input
              id="email"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:bg-white
                transition-all duration-200"
              placeholder="you@example.com"
              disabled={isRequesting}
            />
          </div>
        </div>

        {/* Request New Link Button */}
        <button
          type="submit"
          disabled={isRequesting || !emailInput}
          className="w-full h-11 bg-purple-600 text-white rounded-lg font-medium text-sm
            hover:bg-purple-700 active:bg-purple-800
            disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-all duration-200
            flex items-center justify-center gap-2"
        >
          {isRequesting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="size-4" />
              Send New Magic Link
            </>
          )}
        </button>

        {/* Back to Sign In */}
        <button
          type="button"
          onClick={onBackToSignIn}
          className="w-full h-11 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium text-sm
            hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          disabled={isRequesting}
        >
          Back to Sign In
        </button>
      </form>

      {/* Help Text */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Tip: Check your spam folder if you don't see the email
      </p>
    </AuthLayout>
  );
}
