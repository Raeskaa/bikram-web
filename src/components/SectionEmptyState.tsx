import { type LucideIcon, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface SectionEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
  /** Muted hint text below the CTA */
  hint?: string;
}

export function SectionEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
  hint,
}: SectionEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6">
      {/* Illustration ring */}
      <div className="size-20 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-6">
        <Icon className="size-8 text-muted-foreground/60" />
      </div>

      <h2 className="text-foreground mb-2 text-center">{title}</h2>
      <p className="text-muted-foreground text-sm text-center max-w-sm mb-8">
        {description}
      </p>

      <div className="flex items-center gap-3">
        <Button
          onClick={onAction}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="size-4" />
          {actionLabel}
        </Button>

        {secondaryLabel && onSecondaryAction && (
          <Button variant="outline" onClick={onSecondaryAction}>
            {secondaryLabel}
          </Button>
        )}
      </div>

      {hint && (
        <p className="text-xs text-muted-foreground mt-4">{hint}</p>
      )}
    </div>
  );
}
