import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Flag } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// ─── Types ──────────────────────────────────────────────────────

export interface FlagReport {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  reason: 'spam' | 'offensive' | 'harassment' | 'misinformation' | 'other';
  reasonText?: string;
  timestamp: string;
}

export const FLAG_REASON_LABELS: Record<string, string> = {
  spam: 'Spam or misleading',
  offensive: 'Offensive content',
  harassment: 'Harassment or bullying',
  misinformation: 'False information',
  other: 'Other concern',
};

// ─── Component ──────────────────────────────────────────────────

interface FlagReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (flag: Omit<FlagReport, 'id' | 'timestamp'>) => void;
  reviewId: string;
  reviewAuthor: string;
}

export function FlagReviewDialog({ 
  open, 
  onOpenChange, 
  onSubmit,
  reviewId,
  reviewAuthor 
}: FlagReviewDialogProps) {
  const [flagReason, setFlagReason] = useState<FlagReport['reason']>('spam');
  const [flagReasonText, setFlagReasonText] = useState('');

  const handleSubmit = () => {
    // Mock current user - in real app this would come from auth context
    const currentUser = { 
      id: 'u-current', 
      name: 'Current User', 
      email: 'user@example.com' 
    };

    onSubmit({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      reason: flagReason,
      reasonText: flagReason === 'other' ? flagReasonText : undefined,
    });

    // Reset form
    setFlagReason('spam');
    setFlagReasonText('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Flag Review</DialogTitle>
          <DialogDescription>
            Report {reviewAuthor}'s review if it violates community guidelines. The event creator will be notified and will review your report.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Reason for flagging</Label>
            {(['spam', 'offensive', 'harassment', 'misinformation', 'other'] as const).map(reason => (
              <label key={reason} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="flagReason"
                  value={reason}
                  checked={flagReason === reason}
                  onChange={() => setFlagReason(reason)}
                  className="size-4 accent-primary"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {FLAG_REASON_LABELS[reason]}
                </span>
              </label>
            ))}
          </div>
          {flagReason === 'other' && (
            <div>
              <Label className="text-xs mb-2 block text-muted-foreground">
                Please explain why you're flagging this review
              </Label>
              <Textarea
                value={flagReasonText}
                onChange={e => setFlagReasonText(e.target.value)}
                placeholder="Provide additional context..."
                className="rounded-lg text-sm min-h-[80px]"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-lg" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="rounded-lg"
            onClick={handleSubmit}
            disabled={flagReason === 'other' && !flagReasonText.trim()}
          >
            <Flag className="size-3.5 mr-2" />
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
