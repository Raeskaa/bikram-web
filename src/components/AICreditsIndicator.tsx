import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface AICreditsIndicatorProps {
  credits: number;
  className?: string;
}

export function AICreditsIndicator({ 
  credits,
  className = '' 
}: AICreditsIndicatorProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`relative inline-flex ${className}`}>
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="size-5 rounded-full flex items-center justify-center hover:bg-chart-1/10 transition-colors group"
      >
        <Sparkles className="size-3.5 text-muted-foreground group-hover:text-chart-1 transition-colors" />
      </button>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#10B981] rounded-lg whitespace-nowrap z-50 pointer-events-none shadow-lg">
          <span className="text-xs text-white font-medium">Used {credits} AI credits</span>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="border-4 border-transparent border-t-[#10B981]"></div>
          </div>
        </div>
      )}
    </div>
  );
}