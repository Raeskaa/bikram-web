import TrueLeapLogo from '../../imports/Frame315115';
import { LanguageSelector } from '../LanguageSelector';
import { SupportDropdown } from '../SupportDropdown';

interface AuthHeaderProps {
  onLogoClick?: () => void;
}

export function AuthHeader({ onLogoClick }: AuthHeaderProps) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pb-px pt-0 px-0 relative w-full">
      <div className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      
      <div className="h-16 sm:h-[73px] relative shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-3 sm:px-6 py-0 relative size-full gap-3">
            {/* Logo */}
            <button 
              onClick={onLogoClick}
              className="h-12 w-[146px] sm:h-[60px] sm:w-[200px] shrink-0 transition-opacity hover:opacity-80"
            >
              <TrueLeapLogo />
            </button>

            {/* Right side: Support + Language Selector */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <SupportDropdown />
              </div>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
