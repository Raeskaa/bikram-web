import { X, Zap, CheckCircle2, Sparkles } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: () => void;
  onSignIn: () => void;
  trigger: 'publish' | 'private' | 'download' | 'share' | 'credits' | 'paid';
}

export function UpgradeModal({ isOpen, onClose, onSignUp, onSignIn, trigger }: UpgradeModalProps) {
  if (!isOpen) return null;

  const getTriggerMessage = () => {
    switch (trigger) {
      case 'publish':
        return 'You need an account to publish your content';
      case 'private':
        return 'You need an account to join private communities';
      case 'download':
        return 'You need an account to download content';
      case 'share':
        return 'You need an account to share your work';
      case 'credits':
        return "You've run out of free credits";
      case 'paid':
        return 'You need an account to access paid content';
      default:
        return 'You need an account to continue';
    }
  };

  const benefits = [
    { icon: Sparkles, text: 'Unlimited credits for creating content' },
    { icon: CheckCircle2, text: 'Publish and share your work publicly' },
    { icon: CheckCircle2, text: 'Join private communities and events' },
    { icon: CheckCircle2, text: 'Download and export your content' },
    { icon: CheckCircle2, text: 'Access premium courses and resources' },
    { icon: CheckCircle2, text: 'Sync across all your devices' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 pb-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="size-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="size-12 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="size-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Upgrade Required</h2>
                <p className="text-sm text-purple-100 mt-0.5">{getTriggerMessage()}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Create a free account to unlock:
            </h3>

            <div className="space-y-3 mb-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <benefit.icon className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{benefit.text}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={onSignUp}
                className="w-full h-11 bg-purple-600 text-white rounded-lg font-medium text-sm
                  hover:bg-purple-700 active:bg-purple-800
                  transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Create free account
              </button>

              <button
                onClick={onSignIn}
                className="w-full h-11 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium text-sm
                  hover:bg-gray-50 hover:border-gray-400
                  transition-all duration-200"
              >
                I already have an account
              </button>
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-500 text-center mt-4">
              No credit card required • Free forever
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
