import { useState, useRef, useEffect } from 'react';
import { AuthLayout } from './AuthLayout';
import { AlertCircle, Loader2, Chrome, Facebook, Linkedin, Apple, Phone, Mail, MessageSquare, ArrowLeft, X, User, Link as LinkIcon, Info, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SignInProps {
  onContinue: (identifier: string, type: 'email' | 'phone', countryCode?: string) => void;
  onAuthComplete?: (user: any) => void; 
  onNavigateToRegister: () => void;
  onSocialAuth: (provider: 'google' | 'facebook' | 'linkedin' | 'apple' | 'whatsapp' | 'wechat' | 'microsoft') => void;
  onContinueAsGuest?: () => void;
  onShowAllMethods?: () => void;
  onLogoClick?: () => void;
}

const MOCK_DETECTED_USER = {
  name: 'Raeskaaa',
  email: 'mahesh@trueleap.io',
  avatar: null, 
};

const MOCK_MERGE_USER = {
  name: 'Sarah Chen',
  email: 'sarah.chen@gmail.com',
  existingProvider: 'Slack',
  newProvider: 'Google',
};

export function SignIn({ 
  onContinue, 
  onAuthComplete,
  onNavigateToRegister, 
  onSocialAuth,
  onContinueAsGuest,
  onShowAllMethods,
  onLogoClick,
}: SignInProps) {
  const [step, setStep] = useState<'detecting' | 'detected' | 'input' | 'otp' | 'merge'>('detecting');
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [errors, setErrors] = useState<{ email?: string; otp?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('detected'); 
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
    { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
  ];

  const getSocialProviders = () => [
    { id: 'google', name: 'Continue with Google', icon: Chrome },
    { id: 'apple', name: 'Continue with Apple', icon: Apple },
    { id: 'microsoft', name: 'Continue with Microsoft', icon: Linkedin },
  ];

  const validateIdentifier = () => {
    const newErrors: { email?: string } = {};
    if (loginType === 'email') {
      if (!email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email address';
    } else {
      if (!phone) newErrors.email = 'Phone number is required';
      else if (!/^[\d\s-]{7,15}$/.test(phone)) newErrors.email = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateIdentifier()) return;
    setIsLoading(true);
    setErrors({});
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      setErrors({ otp: 'Please enter the complete 6-digit code' });
      return;
    }
    setIsLoading(true);
    setErrors({});
    setTimeout(() => {
      setIsLoading(false);
      console.log('🔑 OTP Verification simulate success for:', email);
      if (email.toLowerCase() === 'sarah.chen@gmail.com') {
        console.log('🔄 Triggering account merge flow');
        setStep('merge');
      } else {
        const identifier = loginType === 'email' ? email : phone;
        if (onAuthComplete) {
          // If it's the specific test email, we treat it as a new user with no name yet
          const isNewUser = identifier.toLowerCase() === 'new@email.com';
          console.log('👤 Auth Complete triggered. isNewUser:', isNewUser, 'identifier:', identifier);
          onAuthComplete({ 
            name: isNewUser ? '' : identifier.split('@')[0], 
            email: identifier, 
            id: 'mock-id-' + Date.now(),
            isNewUser
          });
        } else {
          onContinue(identifier, loginType, loginType === 'phone' ? countryCode : undefined);
        }
      }
    }, 1200);
  };

  const handleMergeAction = (merge: boolean) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onAuthComplete) {
        onAuthComplete({ name: MOCK_MERGE_USER.name, email: MOCK_MERGE_USER.email, id: 'merged-id-123', merged: merge });
      }
    }, 1500);
  };

  const handleSocialAuth = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      onSocialAuth(provider as any);
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) otpInputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) otpInputRefs.current[index - 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.every(char => !isNaN(Number(char)))) {
      const newOtp = [...otp];
      pastedData.forEach((char, index) => { if (index < 6) newOtp[index] = char; });
      setOtp(newOtp);
      otpInputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const getTitle = () => {
    if (step === 'detecting') return 'Checking account...';
    if (step === 'detected') return 'Log back in';
    if (step === 'otp') return 'Check your inbox';
    if (step === 'merge') return 'Merge accounts';
    return 'Welcome back';
  };

  const getSubtitle = () => {
    if (step === 'detected') return 'Choose an account to continue.';
    if (step === 'otp') return `We've sent a 6-digit code to ${loginType === 'email' ? email : `${countryCode} ${phone}`}`;
    if (step === 'merge') return 'We found another account with the same email. This is your only chance to combine them.';
    return 'Log in or sign up to get smarter responses, upload files and images, and more.';
  };

  return (
    <AuthLayout
      title={getTitle()}
      subtitle={getSubtitle()}
      onContinueAsGuest={step === 'input' ? onContinueAsGuest : undefined}
      onLogoClick={onLogoClick}
    >
      <AnimatePresence mode="wait">
        
        {step === 'detecting' && (
           <motion.div
             key="detecting"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="flex flex-col items-center justify-center py-12"
           >
             <Loader2 className="size-8 animate-spin text-[#420D74]" />
           </motion.div>
        )}

        {step === 'detected' && (
          <motion.div
            key="detected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="relative group p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-4"
                 onClick={() => {
                   setLoginType('email');
                   setEmail(MOCK_DETECTED_USER.email);
                   handleRequestOtp({ preventDefault: () => {} } as any);
                 }}
            >
              <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-lg">
                {MOCK_DETECTED_USER.name.charAt(0)}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{MOCK_DETECTED_USER.name}</p>
                <p className="text-xs text-gray-500">{MOCK_DETECTED_USER.email}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setStep('input'); }} className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                <X className="size-4" />
              </button>
            </div>

            <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="text-xs text-gray-500 font-medium">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="space-y-3">
              <button type="button" onClick={() => setStep('input')} className="w-full h-12 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all duration-200">Log in to another account</button>
              <button type="button" onClick={() => setStep('input')} className="w-full h-12 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all duration-200">Create account</button>
            </div>
            
            <button type="button" onClick={() => onContinueAsGuest?.()} className="w-full pt-1 underline text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors">Stay logged out</button>
          </motion.div>
        )}

        {step === 'input' && (
          <motion.div
            key="input-step"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="space-y-3">
              {getSocialProviders().map(provider => (
                <button key={provider.id} type="button" onClick={() => handleSocialAuth(provider.id)} disabled={isLoading} className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative group">
                  <provider.icon className="size-5 absolute left-4" />
                  <span className="text-sm text-gray-900 font-medium">{provider.name}</span>
                </button>
              ))}
              <button type="button" onClick={() => { setLoginType(loginType === 'email' ? 'phone' : 'email'); setErrors({}); }} className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 relative">
                {loginType === 'email' ? <><Phone className="size-5 absolute left-4" /><span className="text-sm text-gray-900 font-medium">Continue with phone</span></> : <><Mail className="size-5 absolute left-4" /><span className="text-sm text-gray-900 font-medium">Continue with email</span></>}
              </button>
            </div>

            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-xs text-gray-500 font-medium">OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="space-y-1">
                {loginType === 'email' ? <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full h-14 px-4 bg-white border rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#420D74] focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} placeholder="Email address" disabled={isLoading} /> : 
                  <div className="space-y-2">
                    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-[#420D74]">{countryCodes.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}</select>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-14 px-4 bg-white border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#420D74]" placeholder="Phone number" />
                  </div>
                }
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
              <button type="submit" disabled={isLoading} className="w-full h-12 bg-[#420D74] text-white rounded-lg font-medium text-base hover:bg-[#2e0952] transition-all flex items-center justify-center gap-2">{isLoading ? <Loader2 className="size-5 animate-spin" /> : 'Continue'}</button>
              {onShowAllMethods && <button type="button" onClick={onShowAllMethods} className="w-full text-sm text-[#420D74] hover:text-[#2e0952] font-medium transition-colors py-2 mt-4" disabled={isLoading}>+ 97 more login methods</button>}
            </form>
            
            <button type="button" onClick={() => onContinueAsGuest?.()} className="w-full pt-1 underline text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors">Stay logged out</button>
          </motion.div>
        )}

        {step === 'otp' && (
          <motion.div
            key="otp-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleVerifyOtp} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-6 text-center">Enter the code we just sent you.</label>
                <div className="flex justify-between gap-2 px-2">{otp.map((digit, idx) => <input key={idx} ref={el => otpInputRefs.current[idx] = el} type="text" maxLength={1} value={digit} onChange={(e) => handleOtpChange(idx, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(idx, e)} onPaste={handleOtpPaste} className={`w-12 h-14 text-center text-2xl font-bold bg-white border rounded-lg focus:ring-2 focus:ring-[#420D74] transition-all ${errors.otp ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} disabled={isLoading} />)}</div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full h-12 bg-[#420D74] text-white rounded-lg font-medium text-base hover:bg-[#2e0952] transition-all flex items-center justify-center">{isLoading ? <Loader2 className="size-5 animate-spin" /> : 'Verify'}</button>
              <div className="space-y-4 text-center">
                <p className="text-sm text-gray-600">Didn't receive it? <button type="button" onClick={() => setOtp(['','','','','',''])} className="text-[#420D74] font-medium">Resend code</button></p>
                <button type="button" onClick={() => setStep('input')} className="text-xs text-gray-500 flex items-center justify-center gap-1 w-full"><ArrowLeft className="size-3" /> Edit address</button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 'merge' && (
          <motion.div
            key="merge-step"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="space-y-8 flex flex-col items-center"
          >
            {/* Connection Visual */}
            <div className="flex items-center justify-center relative w-[200px] h-[64px]">
              {/* Slack Circle */}
              <div className="size-16 rounded-full bg-white border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex items-center justify-center relative z-10">
                <svg className="size-8" viewBox="0 0 32 32">
                  <path d="M6.66667 20.6667V18.6667H4.66667C3.55553 18.6667 2.66667 19.5555 2.66667 20.6667C2.66667 21.7778 3.55553 22.6667 4.66667 22.6667C5.77781 22.6667 6.66667 21.7778 6.66667 20.6667Z" fill="#36C5F0" />
                  <path d="M11.3333 10.6667H4.66667C3.5621 10.6667 2.66667 11.5621 2.66667 12.6667C2.66667 13.7712 3.5621 14.6667 4.66667 14.6667H11.3333C12.4379 14.6667 13.3333 13.7712 13.3333 12.6667C13.3333 11.5621 12.4379 10.6667 11.3333 10.6667Z" fill="#36C5F0" />
                  <path d="M11.3333 6.66667H13.3333V4.66667C13.3333 3.55553 12.4444 2.66667 11.3333 2.66667C10.2222 2.66667 9.33333 3.55553 9.33333 4.66667C9.33333 5.77781 10.2222 6.66667 11.3333 6.66667Z" fill="#2EB67D" />
                  <path d="M14.6667 20.6667C14.6667 19.5621 13.7712 18.6667 12.6667 18.6667C11.5621 18.6667 10.6667 19.5621 10.6667 20.6667V27.3333C10.6667 28.4379 11.5621 29.3333 12.6667 29.3333C13.7712 29.3333 14.6667 28.4379 14.6667 27.3333V20.6667Z" fill="#2EB67D" />
                  <path d="M25.3333 11.3333V13.3333H27.3333C28.4444 13.3333 29.3333 12.4444 29.3333 11.3333C29.3333 10.2222 28.4444 9.33333 27.3333 9.33333C26.2222 9.33333 25.3333 10.2222 25.3333 11.3333Z" fill="#E01E5A" />
                  <path d="M20.6667 19.3333H27.3333C28.4379 19.3333 29.3333 18.4379 29.3333 17.3333C29.3333 16.2288 28.4379 15.3333 27.3333 15.3333H20.6667C19.5621 15.3333 18.6667 16.2288 18.6667 17.3333C18.6667 18.4379 19.5621 19.3333 20.6667 19.3333Z" fill="#E01E5A" />
                  <path d="M20.6667 25.3333H18.6667V27.3333C18.6667 28.4444 19.5555 29.3333 20.6667 29.3333C21.7778 29.3333 22.6667 28.4444 22.6667 27.3333C22.6667 26.2222 21.7778 25.3333 20.6667 25.3333Z" fill="#ECB22E" />
                  <path d="M17.3333 11.3333C17.3333 12.4379 18.2288 13.3333 19.3333 13.3333C20.4379 13.3333 21.3333 12.4379 21.3333 11.3333V4.66667C21.3333 3.5621 20.4379 2.66667 19.3333 2.66667C18.2288 2.66667 17.3333 3.5621 17.3333 4.66667V11.3333Z" fill="#ECB22E" />
                </svg>
              </div>

              {/* Connector */}
              <div className="absolute left-[64px] right-[64px] h-px bg-gray-200 top-1/2 -translate-y-1/2 z-0 flex items-center justify-center">
                <div className="size-5 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                  <LinkIcon className="size-3 text-gray-400" />
                </div>
              </div>

              {/* Google Circle */}
              <div className="size-16 rounded-full bg-white border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex items-center justify-center relative z-10 ml-auto">
                <svg className="size-8" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
            </div>

            <div className="text-center px-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                You previously signed in with <span className="font-bold text-gray-900">Slack</span>. Merge it with your <span className="font-bold text-gray-900">Google</span> login to keep all your data in one place.
              </p>
            </div>

            <div className="w-full space-y-3">
              <button
                type="button"
                onClick={() => handleMergeAction(true)}
                disabled={isLoading}
                className="w-full h-12 bg-[#420D74] text-white rounded-lg font-semibold text-base hover:bg-[#2e0952] transition-all flex items-center justify-center shadow-sm"
              >
                {isLoading ? <Loader2 className="size-5 animate-spin" /> : 'Merge accounts'}
              </button>

              <button
                type="button"
                onClick={() => handleMergeAction(false)}
                disabled={isLoading}
                className="w-full h-12 bg-white border border-gray-300 text-gray-900 rounded-lg font-semibold text-base hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                I want to not do it
              </button>

              <p className="text-[11px] text-gray-400 text-center leading-normal px-4 pt-2">
                This action cannot be undone and this is your only opportunity to merge these accounts.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
