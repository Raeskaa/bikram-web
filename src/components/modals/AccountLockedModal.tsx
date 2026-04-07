import { X, ShieldAlert, Clock, Mail, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AccountLockedModalProps {
  retryAfterMinutes: number;
  onResetPassword: () => void;
  onContactSupport: () => void;
  onClose: () => void;
}

export function AccountLockedModal({ 
  retryAfterMinutes, 
  onResetPassword, 
  onContactSupport,
  onClose 
}: AccountLockedModalProps) {
  const [timeRemaining, setTimeRemaining] = useState(retryAfterMinutes * 60); // Convert to seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="size-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Account Temporarily Locked
          </h2>
          <p className="text-sm text-gray-600">
            Too many failed sign-in attempts. For your security, we've temporarily locked this account.
          </p>
        </div>

        {/* Countdown Timer */}
        {timeRemaining > 0 ? (
          <div className="px-6 pb-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-orange-900">Try again in</p>
                  <p className="text-2xl font-bold text-orange-600 tabular-nums">
                    {formatTime(timeRemaining)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 pb-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-900 text-center">
                You can now try signing in again
              </p>
            </div>
          </div>
        )}

        {/* Alternative Actions */}
        <div className="px-6 pb-6">
          <p className="text-sm text-gray-700 font-medium mb-3">What you can do:</p>
          
          <div className="space-y-2 mb-6">
            <button
              onClick={onResetPassword}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg text-left
                hover:bg-gray-50 hover:border-gray-400 transition-all duration-200
                flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="size-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Reset Your Password</p>
                <p className="text-xs text-gray-600">Get instant access by resetting</p>
              </div>
            </button>

            <button
              onClick={onContactSupport}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg text-left
                hover:bg-gray-50 hover:border-gray-400 transition-all duration-200
                flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <HelpCircle className="size-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Contact Support</p>
                <p className="text-xs text-gray-600">We're here to help</p>
              </div>
            </button>
          </div>

          {/* Security Notice */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <span className="font-medium text-gray-900">Security tip:</span> If you didn't make these sign-in attempts, 
              reset your password immediately and contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
