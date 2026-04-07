import { Sparkles, X } from 'lucide-react';

interface GuestBannerProps {
  creditsRemaining: number;
  onSignUp: () => void;
  onDismiss?: () => void;
}

export function GuestBanner({ creditsRemaining, onSignUp, onDismiss }: GuestBannerProps) {
  const getCreditsColor = () => {
    if (creditsRemaining <= 2) return 'text-red-600 font-semibold';
    if (creditsRemaining <= 5) return 'text-orange-600 font-semibold';
    return 'text-purple-600 font-semibold';
  };

  const getProgressColor = () => {
    if (creditsRemaining <= 2) return 'bg-red-500';
    if (creditsRemaining <= 5) return 'bg-orange-500';
    return 'bg-purple-500';
  };

  const progressPercentage = (creditsRemaining / 10) * 100; // Assuming 10 total credits

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Info */}
          <div className="flex items-center gap-3 flex-1">
            <Sparkles className="size-5 text-purple-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">You're exploring as a guest</span>
                {' • '}
                <span className={getCreditsColor()}>
                  {creditsRemaining} {creditsRemaining === 1 ? 'credit' : 'credits'} left
                </span>
              </p>
              {/* Progress Bar */}
              <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden max-w-xs">
                <div
                  className={`h-full ${getProgressColor()} transition-all duration-300`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSignUp}
              className="px-4 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg
                hover:bg-purple-700 transition-all active:scale-95"
            >
              Sign up to unlock all features
            </button>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
