import { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { ArrowLeft, AlertCircle, Loader2, Mail, Check } from 'lucide-react';

interface ForgotPasswordProps {
  onBackToSignIn: () => void;
  onResetLinkSent: (email: string) => void;
}

export function ForgotPassword({ onBackToSignIn, onResetLinkSent }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setLinkSent(true);
      setIsLoading(false);
      // Wait 2 seconds then call the callback
      setTimeout(() => {
        onResetLinkSent(email);
      }, 2000);
    }, 1000);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 1000);
  };

  if (linkSent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you a password reset link"
      >
        <div className="space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
              <Mail className="size-8 text-green-600" />
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-900">
              We sent a password reset link to
            </p>
            <p className="text-sm font-medium text-purple-600">
              {email}
            </p>
            <p className="text-xs text-gray-600 pt-2">
              Click the link in the email to reset your password. The link will expire in 1 hour.
            </p>
          </div>

          {/* Resend Link */}
          <div className="pt-4 space-y-3">
            <button
              onClick={handleResend}
              disabled={isLoading}
              className="w-full h-10 border border-gray-300 rounded-lg font-medium text-sm text-gray-900
                hover:bg-gray-50 hover:border-gray-400
                disabled:bg-gray-100 disabled:cursor-not-allowed
                transition-all duration-200
                flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Resend email'
              )}
            </button>

            <button
              onClick={onBackToSignIn}
              className="w-full h-10 text-sm font-medium text-purple-600 hover:text-purple-700
                transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="size-4" />
              Back to sign in
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs text-gray-900 font-medium mb-1">Didn't receive the email?</p>
            <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
              <li>Check your spam folder</li>
              <li>Make sure you entered the correct email</li>
              <li>Wait a few minutes and check again</li>
            </ul>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBackToSignIn}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </button>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className={`w-full h-10 px-3 border rounded-lg text-sm text-gray-900 
              focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
              transition-all duration-200
              ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
            `}
            placeholder="you@example.com"
            disabled={isLoading}
          />
          {error && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3" />
              {error}
            </p>
          )}
        </div>

        {/* Send Reset Link Button */}
        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full h-10 bg-purple-600 text-white rounded-lg font-medium text-sm
            hover:bg-purple-700 active:bg-purple-800
            disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-all duration-200
            flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending link...
            </>
          ) : (
            'Send reset link'
          )}
        </button>

        {/* Help Text */}
        <div className="pt-4">
          <p className="text-xs text-gray-600 text-center">
            Remember your password?{' '}
            <button
              type="button"
              onClick={onBackToSignIn}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
