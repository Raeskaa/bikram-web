import { useState, useEffect } from 'react';
import { AuthLayout } from './AuthLayout';
import { Mail, Phone, Shield, Loader2, CheckCircle2 } from 'lucide-react';

interface AccountMergeVerificationProps {
  originalAccount: {
    provider: string;
    identifier: string; // email or phone
    type: 'email' | 'phone';
  };
  newProvider: string;
  onVerified: () => void;
  onCancel: () => void;
}

export function AccountMergeVerification({
  originalAccount,
  newProvider,
  onVerified,
  onCancel
}: AccountMergeVerificationProps) {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Simulate sending verification code on mount
  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setCodeSent(true);
    }, 500);

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);

    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      // In prototype, any 6-digit code works
      onVerified();
    }, 1500);
  };

  const handleResend = () => {
    setCanResend(false);
    setCountdown(60);
    setCodeSent(false);
    setError('');
    
    // Simulate resending
    setTimeout(() => {
      setCodeSent(true);
    }, 500);
  };

  const maskIdentifier = (identifier: string, type: 'email' | 'phone') => {
    if (type === 'email') {
      const [name, domain] = identifier.split('@');
      return `${name[0]}***@${domain}`;
    } else {
      return `+1 *** *** **${identifier.slice(-2)}`;
    }
  };

  return (
    <AuthLayout
      title="Verify Your Identity"
      subtitle="To merge accounts, please verify your original sign-in method"
      showGuestOption={false}
    >
      {/* Security Notice */}
      <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-purple-900 mb-1">Security Check</p>
            <p className="text-purple-700">
              We're verifying that you own both accounts to prevent unauthorized access.
            </p>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-gray-600 mb-1">Connecting</p>
            <p className="font-medium text-gray-900">{newProvider}</p>
          </div>
          <div className="text-gray-400">→</div>
          <div>
            <p className="text-gray-600 mb-1">Existing Account</p>
            <p className="font-medium text-gray-900">{originalAccount.provider}</p>
          </div>
        </div>
      </div>

      {/* Verification Code Sent */}
      {codeSent ? (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="size-4 text-green-600" />
          <p className="text-sm text-green-700">
            Verification code sent to{' '}
            <span className="font-medium">
              {maskIdentifier(originalAccount.identifier, originalAccount.type)}
            </span>
          </p>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2">
          <Loader2 className="size-4 text-gray-600 animate-spin" />
          <p className="text-sm text-gray-700">Sending verification code...</p>
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-5">
        {/* Code Input */}
        <div className="space-y-2">
          <label htmlFor="code" className="block text-sm font-medium text-gray-900">
            Enter 6-digit code
          </label>
          <div className="flex items-center gap-2">
            {originalAccount.type === 'email' ? (
              <Mail className="size-5 text-gray-400" />
            ) : (
              <Phone className="size-5 text-gray-400" />
            )}
            <input
              id="code"
              type="text"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => {
                setError('');
                setVerificationCode(e.target.value.replace(/\D/g, ''));
              }}
              className={`flex-1 h-11 px-4 bg-gray-50 border rounded-lg text-center text-lg font-mono tracking-widest
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:bg-white
                transition-all duration-200
                ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}
              `}
              placeholder="000000"
              disabled={isVerifying || !codeSent}
            />
          </div>
          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}
        </div>

        {/* Resend Code */}
        <div className="text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Didn't receive the code? Resend
            </button>
          ) : (
            <p className="text-sm text-gray-600">
              Resend code in {countdown}s
            </p>
          )}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={isVerifying || !codeSent || verificationCode.length !== 6}
          className="w-full h-11 bg-purple-600 text-white rounded-lg font-medium text-sm
            hover:bg-purple-700 active:bg-purple-800
            disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-all duration-200
            flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify & Merge Accounts'
          )}
        </button>

        {/* Cancel */}
        <button
          type="button"
          onClick={onCancel}
          className="w-full h-11 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium text-sm
            hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          disabled={isVerifying}
        >
          Cancel
        </button>
      </form>

      {/* Help Text */}
      <p className="text-xs text-gray-500 text-center mt-4">
        This is a one-time verification to ensure account security
      </p>
    </AuthLayout>
  );
}
