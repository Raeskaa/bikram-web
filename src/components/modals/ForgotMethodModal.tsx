import { X, HelpCircle, Chrome, Facebook, Linkedin, Mail, Phone, MessageSquare } from 'lucide-react';

interface ForgotMethodModalProps {
  onClose: () => void;
  onTryMethod: (method: string) => void;
  onContactSupport: () => void;
}

export function ForgotMethodModal({ 
  onClose, 
  onTryMethod,
  onContactSupport 
}: ForgotMethodModalProps) {
  const popularMethods = [
    { id: 'google', name: 'Google', icon: Chrome, color: 'text-gray-700' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-[#1877F2]' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-[#0A66C2]' },
    { id: 'email', name: 'Email (magic link)', icon: Mail, color: 'text-gray-700' },
    { id: 'phone', name: 'Phone (OTP)', icon: Phone, color: 'text-gray-700' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <HelpCircle className="size-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Can't Remember How You Signed Up?
          </h2>
          <p className="text-sm text-gray-600">
            No worries! Try one of these common sign-in methods.
          </p>
        </div>

        {/* Try These Methods */}
        <div className="px-6 pb-6">
          <p className="text-sm font-medium text-gray-900 mb-3">Try these popular methods:</p>
          
          <div className="space-y-2 mb-6">
            {popularMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => onTryMethod(method.id)}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-left
                  hover:bg-gray-50 hover:border-gray-400 transition-all duration-200
                  flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <method.icon className={`size-5 ${method.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{method.name}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-4 py-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-xs text-gray-500 font-medium">STILL CAN'T ACCESS?</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Support Option */}
          <button
            onClick={onContactSupport}
            className="w-full p-4 bg-purple-50 border border-purple-200 rounded-lg text-left
              hover:bg-purple-100 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <MessageSquare className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-purple-900 mb-1">Contact Support</p>
                <p className="text-xs text-purple-700">
                  We'll help you recover your account. Have your email address or phone number ready.
                </p>
              </div>
            </div>
          </button>

          {/* Help Text */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-700">
              <span className="font-medium text-gray-900">Tip:</span> Check your email inbox for past sign-in 
              emails from TrueLeap to see which method you used.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
