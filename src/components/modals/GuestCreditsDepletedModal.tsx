import { XCircle, Sparkles } from 'lucide-react';

interface GuestCreditsDepletedModalProps {
  onSignUp: () => void;
  onNewSession: () => void;
}

export function GuestCreditsDepletedModal({ 
  onSignUp, 
  onNewSession 
}: GuestCreditsDepletedModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
        {/* Header with Icon */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="size-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            You've Used All Your Credits
          </h2>
          <p className="text-sm text-gray-600">
            Sign up to continue using TrueLeap. It's completely free!
          </p>
        </div>

        {/* Progress saved notice */}
        <div className="px-6 pb-6">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">Don't lose your work!</p>
                <p className="text-blue-700">
                  Sign up now to save all your drafts and continue where you left off.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onSignUp}
              className="w-full h-12 bg-purple-600 text-white rounded-lg font-semibold text-sm
                hover:bg-purple-700 active:bg-purple-800 transition-all duration-200
                shadow-lg shadow-purple-600/20"
            >
              Sign Up Now – It's Free
            </button>
            
            <button
              onClick={onNewSession}
              className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors py-2"
            >
              Start a new guest session (loses current progress)
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Free forever • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
