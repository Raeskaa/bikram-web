import { WifiOff, RefreshCw, X } from 'lucide-react';

interface NetworkErrorModalProps {
  onRetry: () => void;
  onDismiss: () => void;
  action?: string; // e.g., "sign in", "create account", "verify code"
}

export function NetworkErrorModal({ 
  onRetry, 
  onDismiss,
  action = "complete this action"
}: NetworkErrorModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <WifiOff className="size-6 text-gray-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Connection Lost
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We couldn't {action}. Please check your internet connection and try again.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onRetry}
              className="w-full h-11 bg-purple-600 text-white rounded-lg font-medium text-sm
                hover:bg-purple-700 active:bg-purple-800 transition-all duration-200
                flex items-center justify-center gap-2"
            >
              <RefreshCw className="size-4" />
              Try Again
            </button>
            
            <button
              onClick={onDismiss}
              className="w-full h-11 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm
                hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-left">
            <p className="text-xs text-gray-700">
              <span className="font-medium text-gray-900">Troubleshooting tips:</span>
            </p>
            <ul className="text-xs text-gray-600 mt-1 space-y-1 list-disc list-inside">
              <li>Check your WiFi or mobile data connection</li>
              <li>Try turning airplane mode off and on</li>
              <li>Refresh the page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
