import { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { ArrowLeft, AlertCircle, Loader2, Eye, EyeOff, Check } from 'lucide-react';

interface ResetPasswordProps {
  email: string;
  token: string; // In real app, this would come from URL params
  onPasswordReset: () => void;
  onBackToSignIn: () => void;
}

export function ResetPassword({ email, token, onPasswordReset, onBackToSignIn }: ResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 8) return 'weak';
    
    let strength = 0;
    if (password.length >= 12) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[!@#$%^&*])/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setResetComplete(true);
      setIsLoading(false);
      
      // Auto-redirect after 2 seconds
      setTimeout(() => {
        onPasswordReset();
      }, 2000);
    }, 1000);
  };

  if (resetComplete) {
    return (
      <AuthLayout
        title="Password reset successful"
        subtitle="You can now sign in with your new password"
      >
        <div className="space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="size-8 text-green-600" />
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-900">
              Your password has been successfully reset.
            </p>
            <p className="text-xs text-gray-600">
              Redirecting you to sign in...
            </p>
          </div>

          {/* Manual Sign In Button */}
          <button
            onClick={onBackToSignIn}
            className="w-full h-10 bg-purple-600 text-white rounded-lg font-medium text-sm
              hover:bg-purple-700 active:bg-purple-800
              transition-all duration-200
              flex items-center justify-center gap-2"
          >
            Sign in now
          </button>
        </div>
      </AuthLayout>
    );
  }

  const passwordStrength = password ? getPasswordStrength(password) : null;

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter a new password for your account"
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

        {/* Email Display */}
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-600 mb-1">Resetting password for</p>
          <p className="text-sm font-medium text-gray-900">{email}</p>
        </div>

        {/* New Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">
            New password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className={`w-full h-10 pl-3 pr-10 border rounded-lg text-sm text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
                transition-all duration-200
                ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
              `}
              placeholder="Enter new password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                <div className={`h-1 flex-1 rounded-full transition-colors ${
                  passwordStrength === 'weak' ? 'bg-red-500' : 
                  passwordStrength === 'medium' ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`} />
                <div className={`h-1 flex-1 rounded-full transition-colors ${
                  passwordStrength === 'medium' || passwordStrength === 'strong' ? 
                  (passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500') : 
                  'bg-gray-200'
                }`} />
                <div className={`h-1 flex-1 rounded-full transition-colors ${
                  passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              </div>
              <p className={`text-xs font-medium ${
                passwordStrength === 'weak' ? 'text-red-600' : 
                passwordStrength === 'medium' ? 'text-yellow-600' : 
                'text-green-600'
              }`}>
                {passwordStrength === 'weak' ? 'Weak password' : 
                 passwordStrength === 'medium' ? 'Medium password' : 
                 'Strong password'}
              </p>
            </div>
          )}

          {/* Password Requirements */}
          <div className="pt-2 space-y-1">
            <p className="text-xs text-gray-600">Password must contain:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className={`flex items-center gap-1 ${password.length >= 8 ? 'text-green-600' : ''}`}>
                {password.length >= 8 ? <Check className="size-3" /> : <span className="size-3 inline-block" />}
                At least 8 characters
              </li>
              <li className={`flex items-center gap-1 ${/(?=.*[a-z])/.test(password) ? 'text-green-600' : ''}`}>
                {/(?=.*[a-z])/.test(password) ? <Check className="size-3" /> : <span className="size-3 inline-block" />}
                One lowercase letter
              </li>
              <li className={`flex items-center gap-1 ${/(?=.*[A-Z])/.test(password) ? 'text-green-600' : ''}`}>
                {/(?=.*[A-Z])/.test(password) ? <Check className="size-3" /> : <span className="size-3 inline-block" />}
                One uppercase letter
              </li>
              <li className={`flex items-center gap-1 ${/(?=.*\d)/.test(password) ? 'text-green-600' : ''}`}>
                {/(?=.*\d)/.test(password) ? <Check className="size-3" /> : <span className="size-3 inline-block" />}
                One number
              </li>
            </ul>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
            Confirm new password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              className={`w-full h-10 pl-3 pr-10 border rounded-lg text-sm text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
                transition-all duration-200
                ${error && error.includes('match') ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
              `}
              placeholder="Re-enter new password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          
          {/* Password Match Indicator */}
          {confirmPassword && password === confirmPassword && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <Check className="size-3" />
              Passwords match
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3" />
              {error}
            </p>
          </div>
        )}

        {/* Reset Password Button */}
        <button
          type="submit"
          disabled={isLoading || !password || !confirmPassword}
          className="w-full h-10 bg-purple-600 text-white rounded-lg font-medium text-sm
            hover:bg-purple-700 active:bg-purple-800
            disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-all duration-200
            flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            'Reset password'
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
