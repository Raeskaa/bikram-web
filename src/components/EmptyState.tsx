import { Sparkles, FileText, Layers, BookOpen, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  title: string;
  description?: string;
  type?: 'modules' | 'lessons' | 'content' | 'building';
  prompts?: string[];
  onPromptClick?: (prompt: string) => void;
}

export function EmptyState({ title, description, type = 'content', prompts = [], onPromptClick }: EmptyStateProps) {
  
  // Building/Loading state
  if (type === 'building') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="relative mb-6">
          {/* Animated circles */}
          <div className="size-24 rounded-full border-2 border-border flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-2 border-t-purple-600 animate-spin" />
            <Sparkles className="size-8 text-purple-600 animate-pulse" />
          </div>
        </div>
        <h3 className="text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 text-center max-w-md">{description}</p>
        <div className="flex items-center gap-2 text-xs text-purple-600">
          <Loader2 className="size-3 animate-spin" />
          <span>AI is working on this...</span>
        </div>
      </div>
    );
  }

  // B&W Illustration based on type
  const renderIllustration = () => {
    if (type === 'modules') {
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mb-6">
          {/* Stacked cards illustration */}
          <rect x="20" y="40" width="60" height="8" rx="2" fill="#E5E7EB" />
          <rect x="20" y="52" width="80" height="8" rx="2" fill="#D1D5DB" />
          <rect x="20" y="64" width="70" height="8" rx="2" fill="#E5E7EB" />
          <rect x="20" y="76" width="65" height="8" rx="2" fill="#D1D5DB" />
          
          {/* Plus icon */}
          <circle cx="90" cy="30" r="12" fill="#9CA3AF" opacity="0.5" />
          <path d="M90 24 L90 36 M84 30 L96 30" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }
    
    if (type === 'lessons') {
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mb-6">
          {/* Book/document illustration */}
          <rect x="30" y="30" width="60" height="70" rx="4" fill="none" stroke="#D1D5DB" strokeWidth="2" />
          <line x1="40" y1="45" x2="70" y2="45" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="55" x2="75" y2="55" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="65" x2="65" y2="65" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="75" x2="70" y2="75" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
          <circle cx="80" cy="80" r="10" fill="#9CA3AF" opacity="0.5" />
          <path d="M80 76 L80 84 M76 80 L84 80" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    }

    // Default content illustration
    return (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mb-6">
        {/* Empty folder illustration */}
        <path d="M30 40 L50 40 L55 35 L90 35 L90 85 L30 85 Z" fill="none" stroke="#D1D5DB" strokeWidth="2" />
        <rect x="35" y="45" width="50" height="35" rx="2" fill="#F3F4F6" />
        <circle cx="60" cy="62.5" r="8" fill="#E5E7EB" />
        <path d="M60 58.5 L60 66.5 M56 62.5 L64 62.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {renderIllustration()}
      
      <h3 className="text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm mb-6 text-center max-w-md">{description}</p>
      )}

      {/* Prompt Cards */}
      {prompts.length > 0 && (
        <div className="mt-4 space-y-2 w-full max-w-md">
          <p className="text-xs text-muted-foreground mb-3 text-center">Try asking AI:</p>
          <div className="grid gap-2">
            {prompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onPromptClick?.(prompt)}
                className="group relative bg-card border border-border rounded-lg p-4 text-left hover:border-purple-300 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                    <Sparkles className="size-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground group-hover:text-purple-900">{prompt}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="size-6 rounded-full bg-purple-600 flex items-center justify-center">
                      <svg className="size-3 text-white" fill="none" viewBox="0 0 12 12">
                        <path d="M3 6h6M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Alternative: Simple action button */}
      {prompts.length === 0 && (
        <Button variant="outline" className="mt-4">
          <Sparkles className="size-4 mr-2" />
          Get AI Help
        </Button>
      )}
    </div>
  );
}