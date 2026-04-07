import { ReactNode } from 'react';
import TrueLeapLogo from '../../imports/Frame315115';
import { Sparkles } from 'lucide-react';
import { AuthHeader } from './AuthHeader';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showGuestOption?: boolean;
  onContinueAsGuest?: () => void;
  onLogoClick?: () => void;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle,
  showGuestOption = true,
  onContinueAsGuest,
  onLogoClick
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Header */}
      <AuthHeader onLogoClick={onLogoClick} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Main Container */}
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
            {/* Title Section - Moved inside the card */}
            {title && (
              <div className="text-center mb-8">
                <h1 className="mb-2 text-3xl font-semibold" style={{ color: '#420D74' }}>{title}</h1>
                {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
              </div>
            )}
            
            {children}
          </div>

          {/* Footer - Privacy, T&C, Support */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-xs text-gray-500">
              By continuing, I agree to Leapspace's{' '}
              <a 
                href="#" 
                className="text-purple-600 hover:text-purple-700 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                terms
              </a>
              ,{' '}
              <a 
                href="#" 
                className="text-purple-600 hover:text-purple-700 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                privacy policy
              </a>
              , and{' '}
              <a 
                href="#" 
                className="text-purple-600 hover:text-purple-700 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                cookie policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
