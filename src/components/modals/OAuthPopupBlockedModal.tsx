import { X, AlertTriangle, ExternalLink, Settings } from 'lucide-react';

interface OAuthPopupBlockedModalProps {
  provider: string;
  onTryRedirect: () => void;
  onTryEmail: () => void;
  onClose: () => void;
}

export function OAuthPopupBlockedModal({ 
  provider,
  onTryRedirect, 
  onTryEmail,
  onClose 
}: OAuthPopupBlockedModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="size-6 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Popup Was Blocked
          </h2>
          <p className="text-sm text-gray-600">
            Your browser blocked the {provider} sign-in popup. Try one of these alternatives:
          </p>
        </div>

        {/* Options */}
        <div className="px-6 pb-6">
          <div className="space-y-3 mb-6">
            {/* Try Redirect Method */}
            <button
              onClick={onTryRedirect}
              className="w-full p-4 bg-purple-50 border-2 border-purple-600 rounded-lg text-left
                hover:bg-purple-100 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="size-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-purple-900 mb-1">
                    Use Redirect Method (Recommended)
                  </p>
                  <p className="text-xs text-purple-700">
                    Sign in on a new page instead of a popup
                  </p>
                </div>
              </div>
            </button>

            {/* Try Email Instead */}
            <button
              onClick={onTryEmail}
              className="w-full p-4 bg-white border border-gray-300 rounded-lg text-left
                hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="size-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Use Email or Phone Instead
                  </p>
                  <p className="text-xs text-gray-600">
                    Sign in with a magic link or OTP code
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-4 py-2 mb-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Instructions to Enable Popups */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-xs font-medium text-blue-900 mb-2">
              How to allow popups for TrueLeap:
            </p>
            <ol className="text-xs text-blue-800 space-y-1.5 list-decimal list-inside">
              <li>Look for a popup blocked icon in your address bar</li>
              <li>Click it and select "Always allow popups from trueleap.com"</li>
              <li>Refresh the page and try signing in again</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
