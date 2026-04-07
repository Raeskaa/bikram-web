import { useState, useRef, useEffect } from 'react';
import { AuthLayout } from './AuthLayout';
import { AlertCircle, Loader2, ArrowLeft, Check } from 'lucide-react';

interface OTPVerificationProps {
  phone: string;
  countryCode: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  onResendCode: () => void;
  onLogoClick?: () => void;
}

export function OTPVerification({ 
  phone, 
  countryCode,
  onVerify, 
  onBack,
  onResendCode,
  onLogoClick
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [expiryTimer, setExpiryTimer] = useState(300); // 5 minutes = 300 seconds
  const [isExpired, setIsExpired] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [rateLimited, setRateLimited] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for resend cooldown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Timer for code expiry
  useEffect(() => {
    if (expiryTimer > 0 && !isExpired) {
      const timer = setTimeout(() => setExpiryTimer(expiryTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (expiryTimer === 0) {
      setIsExpired(true);
    }
  }, [expiryTimer, isExpired]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp);
    setError('');

    // Focus last filled input or last input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Mock verification - accept "123456" as valid OTP
      if (code === '123456') {
        onVerify(code);
      } else {
        setError('Invalid verification code. Please try again.');
        setIsLoading(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    handleVerify(code);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    // Check rate limiting (max 3 resends)
    if (resendCount >= 3) {
      setRateLimited(true);
      return;
    }
    
    setCanResend(false);
    setResendTimer(60);
    setResendCount(prev => prev + 1);
    setExpiryTimer(300); // Reset expiry timer
    setIsExpired(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    onResendCode();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AuthLayout
      title="Verify your phone"
      subtitle={`We sent a code to ${countryCode} ${phone}`}
      onLogoClick={onLogoClick}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Change phone number
        </button>

        {/* OTP Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            Verification code
          </label>
          <div className="flex gap-2 justify-between" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-full h-14 text-center text-2xl font-semibold border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
                  transition-all duration-200
                  ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'}
                  ${digit ? 'border-purple-600 bg-white' : ''}
                `}
                disabled={isLoading}
                autoFocus={index === 0}
              />
            ))}
          </div>
          {error && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3" />
              {error}
            </p>
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
              Resend code
            </button>
          ) : (
            <p className="text-sm text-gray-600">
              Resend code in <span className="font-medium text-gray-900">{resendTimer}s</span>
            </p>
          )}
          {rateLimited && (
            <p className="text-xs text-red-600 mt-1">
              You have reached the limit for resending codes. Please try again later.
            </p>
          )}
          {isExpired && (
            <p className="text-xs text-red-600 mt-1">
              The verification code has expired. Please request a new code.
            </p>
          )}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={isLoading || otp.some(digit => !digit)}
          className="w-full h-10 bg-purple-600 text-white rounded-lg font-medium text-sm
            hover:bg-purple-700 active:bg-purple-800
            disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-all duration-200
            flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Check className="size-4" />
              Verify code
            </>
          )}
        </button>

        {/* Help Text */}
        <p className="text-xs text-center text-gray-600">
          Didn't receive the code? Check your messages or try resending.
        </p>
      </form>
    </AuthLayout>
  );
}