import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import { 
  AlertCircle, 
  Users, 
  Lock, 
  ListChecks,
  Ticket,
  CheckCircle
} from 'lucide-react';
import { cn } from '../ui/utils';

export interface WaitlistConfig {
  enabled: boolean;
  mode: 'use-existing' | 'create-new'; // Use existing tickets or create new
  ticketIds: string[]; // Which ticket types can be used for waitlist
  hasLimit: boolean; // Whether waitlist has a capacity limit
  limit: number; // Waitlist capacity (only if hasLimit is true)
  isManuallyLocked: boolean; // If unlimited waitlist is manually closed by admin
}

export interface TicketTierOption {
  id: string;
  name: string;
  type: 'free' | 'paid';
  price: number;
  quantity: number;
  sold: number;
}

interface WaitlistConfigModalProps {
  open: boolean;
  onClose: () => void;
  onConfigureWaitlist: (config: WaitlistConfig) => void;
  onLockEvent: () => void;
  currentCapacity: number;
  confirmedCount: number;
  availableTickets: TicketTierOption[];
  eventIsPaid: boolean;
}

export function WaitlistConfigModal({
  open,
  onClose,
  onConfigureWaitlist,
  onLockEvent,
  currentCapacity,
  confirmedCount,
  availableTickets,
  eventIsPaid,
}: WaitlistConfigModalProps) {
  const [decision, setDecision] = useState<'waitlist' | 'lock' | null>(null);
  const [mode, setMode] = useState<'use-existing' | 'create-new'>('use-existing');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [limit, setLimit] = useState('50');

  // Auto-select all available tickets by default
  useEffect(() => {
    if (availableTickets.length > 0 && selectedTickets.length === 0) {
      setSelectedTickets(availableTickets.map(t => t.id));
    }
  }, [availableTickets]);

  const handleToggleTicket = (ticketId: string) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleConfirm = () => {
    if (decision === 'lock') {
      onLockEvent();
      onClose();
      return;
    }

    if (decision === 'waitlist') {
      const config: WaitlistConfig = {
        enabled: true,
        mode,
        ticketIds: mode === 'use-existing' ? selectedTickets : [],
        hasLimit: true,
        limit: parseInt(limit) || 0,
        isManuallyLocked: false,
      };
      onConfigureWaitlist(config);
      onClose();
    }
  };

  const canConfirm = () => {
    if (!decision) return false;
    if (decision === 'lock') return true;
    if ((parseInt(limit) || 0) <= 0) return false;
    if (decision === 'waitlist' && mode === 'use-existing') {
      return selectedTickets.length > 0;
    }
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertCircle className="size-5" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">Event Capacity Reached</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Your event has reached maximum capacity ({confirmedCount}/{currentCapacity} confirmed).
                Choose how you'd like to handle new registrations.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Decision: Waitlist or Lock */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">What would you like to do?</Label>
            
            <div className="grid gap-3">
              {/* Enable Waitlist Option */}
              <button
                type="button"
                onClick={() => setDecision('waitlist')}
                className={cn(
                  "relative p-4 border-2 rounded-xl text-left transition-all hover:border-primary/40",
                  decision === 'waitlist' 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "size-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all",
                    decision === 'waitlist' 
                      ? "border-primary bg-primary" 
                      : "border-border bg-background"
                  )}>
                    {decision === 'waitlist' && (
                      <div className="size-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <ListChecks className="size-4 text-primary" />
                      <span className="font-semibold text-foreground">Enable Waitlist</span>
                      <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-100">
                        Recommended
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Allow people to join a waitlist when spots become available. You can approve them manually or set automatic approval rules.
                    </p>
                  </div>
                </div>
              </button>

              {/* Lock Event Option */}
              <button
                type="button"
                onClick={() => setDecision('lock')}
                className={cn(
                  "relative p-4 border-2 rounded-xl text-left transition-all hover:border-primary/40",
                  decision === 'lock' 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "size-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all",
                    decision === 'lock' 
                      ? "border-primary bg-primary" 
                      : "border-border bg-background"
                  )}>
                    {decision === 'lock' && (
                      <div className="size-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Lock className="size-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">Lock Registrations</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Stop accepting new registrations entirely. No one else will be able to register for this event.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Waitlist Configuration (only shown if waitlist is chosen) */}
          {decision === 'waitlist' && (
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="size-3.5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Waitlist Settings</h3>
              </div>

              {/* Ticket Selection Mode */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Ticket Options for Waitlist</Label>
                
                <RadioGroup value={mode} onValueChange={(val) => setMode(val as 'use-existing' | 'create-new')}>
                  <div className="space-y-2">
                    {/* Use Existing Tickets */}
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="use-existing" id="use-existing" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="use-existing" className="text-sm font-medium cursor-pointer">
                          Use existing ticket types
                        </Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Waitlist attendees can purchase the same tickets currently available
                        </p>
                      </div>
                    </div>

                    {/* Create New Tickets */}
                    <div className="flex items-start gap-3 opacity-60">
                      <RadioGroupItem value="create-new" id="create-new" className="mt-1" disabled />
                      <div className="flex-1">
                        <Label htmlFor="create-new" className="text-sm font-medium cursor-pointer">
                          Create new waitlist-specific tickets
                        </Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Define different pricing or terms for waitlist attendees
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1">Coming Soon</Badge>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Ticket Selection (if using existing) */}
              {mode === 'use-existing' && availableTickets.length > 0 && (
                <div className="space-y-2 bg-muted/50 p-4 rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Ticket className="size-4 text-muted-foreground" />
                    <Label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Select Tickets Available for Waitlist
                    </Label>
                  </div>
                  <div className="space-y-2">
                    {availableTickets.map(ticket => (
                      <div
                        key={ticket.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/40",
                          selectedTickets.includes(ticket.id)
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card"
                        )}
                        onClick={() => handleToggleTicket(ticket.id)}
                      >
                        <div className={cn(
                          "size-4 rounded border-2 flex items-center justify-center transition-all",
                          selectedTickets.includes(ticket.id)
                            ? "border-primary bg-primary"
                            : "border-border bg-background"
                        )}>
                          {selectedTickets.includes(ticket.id) && (
                            <CheckCircle className="size-3 text-white fill-current" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{ticket.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {ticket.type === 'free' ? 'Free' : `$${ticket.price}`}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {ticket.sold}/{ticket.quantity} sold
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3 bg-muted/50 p-4 rounded-xl border border-border">
                <div>
                  <Label className="text-sm font-medium text-foreground">Waitlist Capacity Limit</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Required. This is the maximum number of people who can join the waitlist.
                  </p>
                </div>
                <Input
                  type="number"
                  min="1"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="e.g. 50"
                  className="h-10"
                />
                <div className="flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-lg">
                  <AlertCircle className="size-4 text-amber-700 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    Once this waitlist limit is reached, new registrations will be blocked until you increase the limit or reopen space.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!canConfirm()}
            className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {decision === 'lock' ? 'Lock Registrations' : 'Enable Waitlist'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
