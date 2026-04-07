import { useState, useEffect } from 'react';
import { AuthLayout } from './AuthLayout';
import { Mail, ArrowLeft, Check, ExternalLink, Loader2 } from 'lucide-react';

interface MagicLinkSentProps {
  email: string;
  onBack: () => void;
  onResendLink: () => void;
  onVerify?: () => void;
  onLogoClick?: () => void;
}

export function MagicLinkSent({ 
  email, 
  onBack,
  onResendLink,
  onVerify,
  onLogoClick
}: MagicLinkSentProps) {
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  // Timer for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleResend = () => {
    if (!canResend || isResending) return;
    
    setIsResending(true);
    setLinkSent(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setLinkSent(true);
      setCanResend(false);
      setResendTimer(60);
      onResendLink();
      
      // Hide success message after 3 seconds
      setTimeout(() => setLinkSent(false), 3000);
    }, 1000);
  };

  // Popular email providers
  const getEmailProvider = () => {
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (domain?.includes('gmail')) {
      return { name: 'Gmail', url: 'https://mail.google.com' };
    } else if (domain?.includes('yahoo')) {
      return { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' };
    } else if (domain?.includes('outlook') || domain?.includes('hotmail')) {
      return { name: 'Outlook', url: 'https://outlook.live.com' };
    } else if (domain?.includes('icloud') || domain?.includes('me.com')) {
      return { name: 'iCloud Mail', url: 'https://www.icloud.com/mail' };
    }
    return null;
  };

  const emailProvider = getEmailProvider();

  return (
    <AuthLayout
      title="Check your email"
      subtitle="We sent a magic link to sign in"
      onLogoClick={onLogoClick}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Change email address
        </button>

        {/* Email Icon */}
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="size-20 bg-purple-100 rounded-full flex items-center justify-center">
            <Mail className="size-10 text-purple-600" />
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-900 font-medium mb-1">
              Magic link sent to
            </p>
            <p className="text-sm text-purple-600 font-semibold">
              {email}
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
          <p className="text-sm text-gray-900 font-medium">
            To complete sign in:
          </p>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 size-5 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-semibold">
                1
              </span>
              <span>Open the email we just sent you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 size-5 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-semibold">
                2
              </span>
              <span>Click the "Sign in to LeapSpace" button</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 size-5 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-semibold">
                3
              </span>
              <span>You'll be automatically signed in</span>
            </li>
          </ol>
          
          {onVerify && (
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={onVerify}
                className="w-full h-11 bg-white border-2 border-[#420D74] text-[#420D74] rounded-xl font-bold text-sm
                  hover:bg-[#420D74]/5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Check className="size-4" />
                Simulate Clicking Link
              </button>
            </div>
          )}
        </div>

        {/* Open Email App Button */}
        {emailProvider && (
          <a
            href={emailProvider.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-10 bg-purple-600 text-white rounded-lg font-medium text-sm
              hover:bg-purple-700 active:bg-purple-800
              transition-all duration-200
              flex items-center justify-center gap-2"
          >
            <Mail className="size-4" />
            Open {emailProvider.name}
            <ExternalLink className="size-3" />
          </a>
        )}

        {/* Resend Link */}
        <div className="text-center space-y-3">
          {linkSent && (
            <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium">
              <Check className="size-4" />
              New magic link sent!
            </div>
          )}
          
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors disabled:opacity-50"
            >
              {isResending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-3 animate-spin" />
                  Sending...
                </span>
              ) : (
                'Resend magic link'
              )}
            </button>
          ) : (
            <p className="text-sm text-gray-600">
              Resend link in <span className="font-medium text-gray-900">{resendTimer}s</span>
            </p>
          )}
        </div>

        {/* Help Text */}
        <div className="pt-4 space-y-2 text-xs text-center text-gray-600">
          <p>
            Didn't receive the email? Check your spam folder.
          </p>
          <p>
            The magic link will expire in 15 minutes.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
