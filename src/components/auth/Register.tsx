import { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { AlertCircle, Loader2, Chrome, Facebook, Linkedin, Apple, Phone, Mail, MessageSquare } from 'lucide-react';

interface RegisterProps {
  onContinue: (data: { name: string; identifier: string; type: 'email' | 'phone'; countryCode?: string }) => void;
  onNavigateToSignIn: () => void;
  onSocialAuth: (provider: 'google' | 'facebook' | 'linkedin' | 'apple' | 'whatsapp' | 'wechat' | 'microsoft') => void;
  onContinueAsGuest?: () => void;
  onShowAllMethods?: () => void;
  onLogoClick?: () => void;
}

export function Register({ 
  onContinue, 
  onNavigateToSignIn, 
  onSocialAuth, 
  onContinueAsGuest, 
  onShowAllMethods,
  onLogoClick 
}: RegisterProps) {
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [countryCode, setCountryCode] = useState('+1');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Simulated geographic detection
  const [userLocation] = useState<'US' | 'IN' | 'CN' | 'EU'>('US');

  // Country codes with flags
  const countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
    { code: '+1', country: 'CA', flag: '🇨🇦', name: 'Canada' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
    { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
    { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
    { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
    { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
    { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
    { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' },
    { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
    { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
    { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
    { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
  ];

  // Get social providers based on location
  const getSocialProviders = () => {
    const baseProviders = [
      { id: 'google', name: 'Google', icon: Chrome, color: 'text-gray-700' },
      { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-[#1877F2]' },
      { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-[#0A66C2]' },
      { id: 'apple', name: 'Apple', icon: Apple, color: 'text-gray-900' },
    ];

    // Geographic-specific providers
    if (userLocation === 'IN') {
      baseProviders.splice(2, 0, { 
        id: 'whatsapp', 
        name: 'WhatsApp', 
        icon: MessageSquare, 
        color: 'text-[#25D366]'
      });
    } else if (userLocation === 'CN') {
      baseProviders.unshift({ 
        id: 'wechat', 
        name: 'WeChat', 
        icon: MessageSquare, 
        color: 'text-[#07C160]'
      });
    }

    return baseProviders.slice(0, 4); // Show top 4
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (loginType === 'email' && !formData.email) {
      newErrors.email = 'Email is required';
    } else if (loginType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (loginType === 'phone' && !formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (loginType === 'phone' && !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      onContinue({
        name: formData.name,
        identifier: loginType === 'email' ? formData.email : formData.phone,
        type: loginType,
        countryCode: loginType === 'phone' ? countryCode : undefined
      });
    }, 1000);
  };

  const handleSocialAuth = (provider: 'google' | 'facebook' | 'linkedin' | 'apple' | 'whatsapp' | 'wechat' | 'microsoft') => {
    setIsLoading(true);
    setTimeout(() => {
      onSocialAuth(provider);
    }, 800);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start building amazing communities today"
      onContinueAsGuest={onContinueAsGuest}
      onLogoClick={onLogoClick}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full h-10 px-3 border rounded-lg text-sm text-gray-900 
              focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
              transition-all duration-200
              ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
            `}
            placeholder="Sarah Chen"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email or Phone */}
        <div className="space-y-2">
          {/* Email/Phone Toggle */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-2">
            <button
              type="button"
              onClick={() => setLoginType('email')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                loginType === 'email'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mail className="size-4 inline mr-2" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginType('phone')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                loginType === 'phone'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Phone className="size-4 inline mr-2" />
              Phone
            </button>
          </div>

          <label className="block text-sm font-medium text-gray-900">
            {loginType === 'email' ? 'Email address' : 'Phone number'}
          </label>
          
          {loginType === 'email' ? (
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full h-10 px-3 border rounded-lg text-sm text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
                transition-all duration-200
                ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
              `}
              placeholder="you@example.com"
              disabled={isLoading}
            />
          ) : (
            <div className="flex">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className={`h-10 px-3 bg-gray-50 border rounded-l-lg text-sm text-gray-900 
                  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:bg-white
                  transition-all duration-200
                  ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                `}
                disabled={isLoading}
              >
                {countryCodes.map((code, idx) => (
                  <option key={`${code.code}-${code.country}-${idx}`} value={code.code}>
                    {code.flag} {code.code} {code.name}
                  </option>
                ))}
              </select>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`flex-1 h-10 px-3 bg-gray-50 border-l-0 rounded-r-lg text-sm text-gray-900 
                  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:bg-white
                  transition-all duration-200
                  ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                `}
                placeholder="555-000-0000"
                disabled={isLoading}
              />
            </div>
          )}
          
          {(errors.email || errors.phone) && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3" />
              {errors.email || errors.phone}
            </p>
          )}
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 bg-purple-600 text-white rounded-lg font-medium text-sm
            hover:bg-purple-700 active:bg-purple-800
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60
            transition-all duration-200
            flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </button>

        {/* Divider */}
        <div className="relative flex items-center gap-4">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="text-xs text-gray-500 font-medium">OR SIGN UP WITH</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {getSocialProviders().map(provider => (
            <button
              key={provider.id}
              type="button"
              onClick={() => handleSocialAuth(provider.id as 'google' | 'facebook' | 'linkedin' | 'apple' | 'whatsapp' | 'wechat' | 'microsoft')}
              disabled={isLoading}
              className="h-10 px-4 border border-gray-300 rounded-lg
                flex items-center justify-center gap-2
                hover:bg-gray-50 hover:border-gray-400
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              <provider.icon className="size-5" style={{ color: provider.color }} />
              <span className="text-sm text-gray-900 font-medium">{provider.name}</span>
            </button>
          ))}
        </div>

        {/* Show All Methods Button */}
        {onShowAllMethods && (
          <button
            type="button"
            onClick={onShowAllMethods}
            className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors py-2"
            disabled={isLoading}
          >
            + 97 more login methods
          </button>
        )}

        {/* Sign In Link */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToSignIn}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}