import { useEffect, useState } from 'react';
import { Shield, Loader2, Link as LinkIcon, Chrome, Facebook, Linkedin, Apple, Mail, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import TrueLeapLogo from '../../imports/Frame315115';
import { AuthLayout } from './AuthLayout';
import { motion, AnimatePresence } from 'motion/react';

interface SocialConnectingScreenProps {
  provider: string;
  onComplete: () => void;
}

export function SocialConnectingScreen({ provider, onComplete }: SocialConnectingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const providerConfig: { [key: string]: { icon: any; name: string; color: string } } = {
    google: { icon: Chrome, name: 'Google', color: '#4285F4' },
    facebook: { icon: Facebook, name: 'Facebook', color: '#1877F2' },
    linkedin: { icon: Linkedin, name: 'LinkedIn', color: '#0A66C2' },
    apple: { icon: Apple, name: 'Apple', color: '#000000' },
    slack: { icon: MessageSquare, name: 'Slack', color: '#4A154B' },
    microsoft: { icon: Mail, name: 'Microsoft', color: '#00A4EF' },
    whatsapp: { icon: MessageSquare, name: 'WhatsApp', color: '#25D366' },
    wechat: { icon: MessageSquare, name: 'WeChat', color: '#07C160' },
  };

  const config = providerConfig[provider.toLowerCase()] || { icon: LinkIcon, name: provider, color: '#420D74' };
  const ProviderIcon = config.icon;

  const steps = [
    'Handshaking with provider...',
    'Verifying credentials...',
    'Updating profile data...',
    'Finalizing session...'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        // Non-linear progress for a more "organic" feel
        const diff = 100 - prev;
        return prev + (diff * 0.05);
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);

    const timeout = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AuthLayout
      title="Signing in"
      subtitle={`Connecting your ${config.name} account securely.`}
    >
      <div className="flex flex-col items-center py-4 space-y-12">
        {/* Connection Bridge - Mirrored from Merge UI for consistency */}
        <div className="flex items-center justify-center relative w-[240px] h-[64px]">
          {/* App Logo */}
          <div className="size-16 rounded-full bg-white border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex items-center justify-center relative z-10 p-4">
            <TrueLeapLogo className="w-full h-full object-contain" />
          </div>

          {/* Animated Connector */}
          <div className="absolute left-[64px] right-[64px] h-px bg-gray-200 top-1/2 -translate-y-1/2 z-0 flex items-center justify-center overflow-hidden">
            <motion.div 
              className="absolute h-px bg-[#420D74]"
              initial={{ left: '-100%', width: '100%' }}
              animate={{ left: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            
            {/* Center Status Icon */}
            <div className="size-6 rounded-full bg-white border border-gray-200 flex items-center justify-center relative z-10">
              <Loader2 className="size-3 text-[#420D74] animate-spin" />
            </div>
          </div>

          {/* Provider Logo */}
          <div className="size-16 rounded-full bg-white border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex items-center justify-center relative z-10 ml-auto p-4">
            <ProviderIcon className="size-full" style={{ color: config.color }} />
          </div>
        </div>

        {/* Functional Progress Section */}
        <div className="w-full space-y-6">
          <div className="text-center space-y-1.5">
            <AnimatePresence mode="wait">
              <motion.p
                key={steps[currentStep]}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm font-medium text-gray-900"
              >
                {steps[currentStep]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="px-4">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#420D74]"
                style={{ width: `${progress}%` }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              />
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-gray-400">
               <ShieldCheck className="size-3.5 text-green-500" />
               <span className="text-[11px] font-medium tracking-wide uppercase">Secure encrypted handshake</span>
            </div>
          </div>
        </div>

        {/* Info Text */}
        <p className="text-[11px] text-gray-400 text-center leading-normal px-8 pt-4">
          Please keep this window open while we authorize your session with {config.name}.
        </p>
      </div>
    </AuthLayout>
  );
}
