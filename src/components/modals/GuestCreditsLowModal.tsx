import { X, AlertCircle, Zap, Infinity, Users, BookOpen, Calendar } from 'lucide-react';

interface GuestCreditsLowModalProps {
  creditsRemaining: number;
  onSignUp: () => void;
  onDismiss: () => void;
}

export function GuestCreditsLowModal({ 
  creditsRemaining, 
  onSignUp, 
  onDismiss 
}: GuestCreditsLowModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="size-6 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            You're Running Low on Credits!
          </h2>
          <p className="text-sm text-gray-600">
            You have <span className="font-semibold text-yellow-600">{creditsRemaining} credits</span> remaining. 
            Sign up for free to get unlimited access.
          </p>
        </div>

        {/* Benefits */}
        <div className="px-6 pb-6">
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Infinity className="size-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Unlimited Credits</p>
                <p className="text-xs text-gray-600">Create as many courses and events as you want</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="size-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Publish Courses</p>
                <p className="text-xs text-gray-600">Share your knowledge with the world</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="size-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Create Communities</p>
                <p className="text-xs text-gray-600">Build and manage your own communities</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="size-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Host Events</p>
                <p className="text-xs text-gray-600">Organize workshops and meetups</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onSignUp}
              className="w-full h-11 bg-purple-600 text-white rounded-lg font-medium text-sm
                hover:bg-purple-700 active:bg-purple-800 transition-all duration-200
                flex items-center justify-center gap-2"
            >
              <Zap className="size-4" />
              Sign Up Free
            </button>
            
            <button
              onClick={onDismiss}
              className="w-full h-11 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm
                hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Continue as Guest
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Sign up takes less than 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
