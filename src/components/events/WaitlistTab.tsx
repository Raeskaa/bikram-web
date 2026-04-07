import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Clock, Check, X, Users, Settings, Lock, Unlock, AlertCircle, ListChecks } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';

interface WaitlistEntry {
  id: string;
  userName: string;
  userEmail: string;
  addedAt: string;
  message?: string;
  priority: number;
}

export interface WaitlistConfig {
  enabled: boolean;
  mode: 'use-existing' | 'create-new';
  ticketIds: string[];
  hasLimit: boolean;
  limit: number;
  isManuallyLocked: boolean;
}

interface WaitlistTabProps {
  waitlistEntries: WaitlistEntry[];
  onApprove: (entryId: string) => void;
  onBulkApprove?: () => void;
  onReject: (entryId: string) => void;
  confirmedCount: number;
  capacity: string;
  waitlistConfig?: WaitlistConfig | null;
  onToggleWaitlistLock?: () => void;
  onConfigureWaitlist?: () => void;
}

export function WaitlistTab({ 
  waitlistEntries, 
  onApprove, 
  onBulkApprove,
  onReject, 
  confirmedCount, 
  capacity,
  waitlistConfig,
  onToggleWaitlistLock,
  onConfigureWaitlist
}: WaitlistTabProps) {
  const [showLockConfirm, setShowLockConfirm] = useState(false);
  
  const cap = parseInt(capacity || '100');
  const spotsRemaining = Math.max(0, cap - confirmedCount);
  const fillPercent = Math.min(100, (confirmedCount / cap) * 100);
  const atCapacity = confirmedCount >= cap;

  const waitlistEnabled = waitlistConfig?.enabled ?? false;
  const waitlistHasLimit = waitlistConfig?.hasLimit ?? false;
  const waitlistLimit = waitlistConfig?.limit ?? 0;
  const waitlistLocked = waitlistConfig?.isManuallyLocked ?? false;
  const waitlistAtLimit = waitlistHasLimit && waitlistEntries.length >= waitlistLimit;

  const handleToggleLock = () => {
    if (!waitlistLocked) {
      setShowLockConfirm(true);
    } else {
      onToggleWaitlistLock?.();
      toast.success('Waitlist reopened', { description: 'New registrations can join the waitlist again.' });
    }
  };

  const confirmLock = () => {
    onToggleWaitlistLock?.();
    setShowLockConfirm(false);
    toast.success('Waitlist closed', { description: 'No new registrations will be accepted.' });
  };

  return (
    <div className="space-y-4">
      {/* Capacity bar */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-foreground font-semibold">Capacity & Waitlist</h3>
            <p className="text-sm text-muted-foreground">
              {confirmedCount} / {cap} spots filled
            </p>
          </div>
          <Badge variant="secondary" className={`rounded-md text-xs px-2 py-0.5 border ${
            atCapacity
              ? 'bg-red-50 text-red-700 border-red-100'
              : 'bg-green-50 text-green-700 border-green-100'
          }`}>
            {atCapacity ? 'At Capacity' : 'Spots Available'}
          </Badge>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{spotsRemaining} spots remaining</span>
          <span>{waitlistEntries.length} on waitlist</span>
        </div>
      </div>

      {/* Waitlist Configuration Status */}
      {waitlistEnabled && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <ListChecks className="size-4" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold">Waitlist Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Waitlist is {waitlistLocked ? 'closed' : 'active'}
                  {waitlistHasLimit && ` • ${waitlistEntries.length}/${waitlistLimit} capacity`}
                  {!waitlistHasLimit && ' • Unlimited capacity'}
                </p>
              </div>
            </div>
            {onConfigureWaitlist && (
              <Button
                size="sm"
                variant="outline"
                onClick={onConfigureWaitlist}
                className="rounded-lg h-8"
              >
                <Settings className="size-3.5 mr-1.5" />
                Configure
              </Button>
            )}
          </div>

          {/* Status Indicators */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <div className={`size-2 rounded-full ${waitlistLocked ? 'bg-red-500' : 'bg-green-500'}`} />
              <span className="text-xs text-muted-foreground">
                Status: <span className="font-medium text-foreground">
                  {waitlistLocked ? 'Closed' : 'Open'}
                </span>
              </span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <Users className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Mode: <span className="font-medium text-foreground">
                  {waitlistConfig?.mode === 'use-existing' ? 'Existing Tickets' : 'Custom Tickets'}
                </span>
              </span>
            </div>
          </div>

          {/* Manual Lock Toggle (only for unlimited waitlists) */}
          {!waitlistHasLimit && onToggleWaitlistLock && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`size-9 rounded-lg flex items-center justify-center ${
                    waitlistLocked 
                      ? 'bg-red-50 text-red-700' 
                      : 'bg-green-50 text-green-700'
                  }`}>
                    {waitlistLocked ? <Lock className="size-4" /> : <Unlock className="size-4" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground mb-0.5">
                      {waitlistLocked ? 'Waitlist is Closed' : 'Waitlist is Open'}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {waitlistLocked 
                        ? 'No new registrations can join the waitlist. Click to reopen.'
                        : 'New registrations are being added to the waitlist. Click to close.'
                      }
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={waitlistLocked ? "outline" : "destructive"}
                  onClick={handleToggleLock}
                  className="rounded-lg ml-3"
                >
                  {waitlistLocked ? (
                    <>
                      <Unlock className="size-3.5 mr-1.5" />
                      Reopen
                    </>
                  ) : (
                    <>
                      <Lock className="size-3.5 mr-1.5" />
                      Close Waitlist
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* At Limit Warning */}
          {waitlistHasLimit && waitlistAtLimit && (
            <div className="mt-4 flex items-start gap-2 px-3 py-2.5 bg-amber-50 border border-amber-100 rounded-lg">
              <AlertCircle className="size-4 text-amber-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-900">Waitlist Limit Reached</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  The waitlist has reached its maximum capacity ({waitlistLimit}). New registrations are now blocked.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No waitlist enabled state */}
      {!waitlistEnabled && atCapacity && (
        <div className="bg-card border-2 border-dashed border-border rounded-xl p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="size-12 rounded-xl bg-muted flex items-center justify-center mb-3">
              <AlertCircle className="size-6 text-muted-foreground" />
            </div>
            <h3 className="text-foreground font-semibold mb-1">Waitlist Not Enabled</h3>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Your event is at capacity. Enable a waitlist to allow people to register when spots open up.
            </p>
            {onConfigureWaitlist && (
              <Button
                size="sm"
                onClick={onConfigureWaitlist}
                className="rounded-lg bg-primary hover:bg-primary/90"
              >
                <ListChecks className="size-4 mr-2" />
                Enable Waitlist
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Waitlist entries */}
      {waitlistEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="size-20 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-6">
            <Clock className="size-9 text-muted-foreground/40" />
          </div>
          <h3 className="text-foreground mb-2">No one on the waitlist</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {waitlistEnabled 
              ? 'When your event reaches capacity, people who try to register will be added here automatically.'
              : 'Enable waitlist to allow people to register when your event is full.'
            }
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Waitlist Queue</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Approve people individually or move as many as possible into open spots.
              </p>
            </div>
            {onBulkApprove && (
              <Button
                size="sm"
                className="rounded-lg bg-green-600 hover:bg-green-700 text-white"
                onClick={onBulkApprove}
              >
                <Check className="size-3.5 mr-1.5" />
                Bulk Approve
              </Button>
            )}
          </div>
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">#</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Person</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Joined</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {waitlistEntries.map((entry, idx) => (
                <tr key={entry.id} className="hover:bg-accent transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-muted-foreground">#{idx + 1}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/10">
                        {entry.userName?.[0] || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{entry.userName}</p>
                        <p className="text-xs text-muted-foreground">{entry.userEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {entry.addedAt ? new Date(entry.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground italic line-clamp-1">{entry.message || '—'}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="h-7 px-2 bg-green-600 hover:bg-green-700 text-white text-xs"
                        onClick={() => onApprove(entry.id)}
                      >
                        <Check className="size-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-red-600 border-red-200 hover:bg-red-50 text-xs"
                        onClick={() => onReject(entry.id)}
                      >
                        <X className="size-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lock Confirmation Dialog */}
      <Dialog open={showLockConfirm} onOpenChange={setShowLockConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="size-5 text-amber-600" />
              Close Waitlist?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-2">
              This will prevent any new registrations from joining the waitlist. People already on the waitlist will remain.
              You can reopen the waitlist at any time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowLockConfirm(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmLock}
              className="rounded-lg"
            >
              <Lock className="size-4 mr-2" />
              Close Waitlist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
