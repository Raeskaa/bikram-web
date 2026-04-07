import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface LeapyCardProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'progress' | 'action';
  className?: string;
}

export function LeapyCard({ children, variant = 'default', className = '' }: LeapyCardProps) {
  // Clean, modern design - subtle background, no harsh borders
  const bgColor = variant === 'success' 
    ? 'bg-[var(--ai-accent)]' 
    : 'bg-muted/30';

  return (
    <div className={`rounded-xl ${bgColor} p-5 transition-all border border-border/40 ${className}`}>
      {children}
    </div>
  );
}

interface LeapyCardHeaderProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }> | ReactNode; // Can be icon component or JSX
  isLoading?: boolean;
}

export function LeapyCardHeader({ children, title, subtitle, icon, isLoading }: LeapyCardHeaderProps) {
  // Check if icon is a component or JSX element
  const IconComponent = icon && typeof icon === 'function' ? icon : null;
  const iconElement = icon && typeof icon !== 'function' ? icon : null;

  return (
    <div className="mb-3">
      <div className="flex items-start gap-3">
        {isLoading ? (
          <div className="size-8 rounded-full bg-[var(--ai-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Loader2 className="size-4 text-[var(--ai-primary)] animate-spin" />
          </div>
        ) : IconComponent ? (
          <div className="size-8 rounded-full bg-[var(--ai-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <IconComponent className="size-4 text-[var(--ai-primary)]" />
          </div>
        ) : iconElement ? (
          <div className="size-8 rounded-full bg-[var(--ai-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            {iconElement}
          </div>
        ) : null}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{title || children}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface LeapyCardContentProps {
  children: ReactNode;
  className?: string;
}

export function LeapyCardContent({ children, className = '' }: LeapyCardContentProps) {
  return (
    <div className={`text-sm text-foreground/80 space-y-3 ${className}`}>
      {children}
    </div>
  );
}

interface LeapyCardActionsProps {
  children: ReactNode;
  className?: string;
}

export function LeapyCardActions({ children, className = '' }: LeapyCardActionsProps) {
  return (
    <div className={`flex flex-wrap gap-2 mt-4 ${className}`}>
      {children}
    </div>
  );
}

interface LeapyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  className?: string;
}

export function LeapyButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = ''
}: LeapyButtonProps) {
  const baseStyles = "px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = variant === 'primary'
    ? "bg-[var(--ai-primary)] text-white hover:bg-[var(--ai-hover)] shadow-sm"
    : variant === 'secondary'
    ? "border border-border bg-background text-foreground hover:bg-muted"
    : "text-muted-foreground hover:text-foreground hover:bg-muted/50";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
}

interface LeapyProgressItemProps {
  label: string;
  status: 'pending' | 'loading' | 'complete';
}

export function LeapyProgressItem({ label, status }: LeapyProgressItemProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      {status === 'complete' && (
        <div className="size-5 rounded-full bg-[var(--ai-primary)] flex items-center justify-center flex-shrink-0">
          <svg className="size-3 text-white" fill="none" viewBox="0 0 10 8">
            <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {status === 'loading' && (
        <div className="size-5 rounded-full bg-[var(--ai-primary)]/10 flex items-center justify-center flex-shrink-0">
          <Loader2 className="size-3.5 text-[var(--ai-primary)] animate-spin" />
        </div>
      )}
      {status === 'pending' && (
        <div className="size-5 rounded-full border-2 border-border/50 flex-shrink-0" />
      )}
      <span className={`text-sm ${status === 'complete' ? 'text-foreground' : status === 'loading' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
}

interface LeapySchedulePreviewProps {
  items: Array<{
    time: string;
    title: string;
    duration?: string;
  }>;
}

export function LeapySchedulePreview({ items }: LeapySchedulePreviewProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-4 py-3 px-4 rounded-lg bg-background border border-border/60 hover:border-border transition-colors"
        >
          <div className="flex flex-col items-end gap-0.5 flex-shrink-0 min-w-[60px]">
            <span className="text-sm font-semibold text-foreground">
              {item.time}
            </span>
            {item.duration && (
              <span className="text-xs text-muted-foreground">{item.duration}</span>
            )}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-sm font-medium text-foreground">{item.title}</p>
          </div>
        </div>
      ))}\n    </div>
  );
}