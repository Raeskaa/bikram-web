// EventCTAModals — Manages all CTA-related modals for event cards + public pages
// Phase 1: Wire dead-end CTAs → complete registration/checkout flows

import { useState, useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  CheckCircle,
  Clock,
  Users,
  ShieldCheck,
  Ticket,
  Play,
  Loader2,
  ArrowRight,
  AlertCircle,
  Calendar,
  MapPin,
  Video,
  CreditCard,
  Coins,
  X,
  Link2,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Event } from '../../data/mockEventData';
import { isEventSoldOut, getEventWaitlist } from '../../data/mockEventData';
import { BuyCreditsModal } from '../CreditSystem';

// ═══════════════════════════════════════════════════════════════
//  TYPES
// ══════════════════════════════════════════════════════════════

type CTAFlow =
  | 'register-free'        // Free + open → form → done
  | 'buy-ticket'           // Paid → ticket select → form → credits checkout → done
  | 'apply-screened'       // Screened → application form → "under review"
  | 'join-waitlist'        // Waitlist or sold-out+waitlist → confirm → position shown
  | 'join-live'            // Live + registered → navigate to meeting room
  | null;

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'url';
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  description?: string;
}

// ═══════════════════════════════════════════════════════════════
//  FLOW DETERMINATION
// ═══════════════════════════════════════════════════════════════

function determineCTAFlow(event: Event): CTAFlow {
  const soldOut = isEventSoldOut(event);

  if (event.lifecycleStage === 'live') return 'join-live';
  if (soldOut && event.waitlistEnabled) return 'join-waitlist';
  if (soldOut) return null; // Sold out, no waitlist — no action
  if (event.accessType === 'screened') return 'apply-screened';
  if (event.accessType === 'waitlist') return 'join-waitlist';
  if (event.isPaid) return 'buy-ticket';
  return 'register-free';
}

// Default registration fields (used when event has no custom form)
const DEFAULT_REG_FIELDS: FormField[] = [
  { id: 'name', type: 'text', label: 'Full Name', placeholder: 'Jane Doe', required: true },
  { id: 'email', type: 'email', label: 'Email', placeholder: 'jane@example.com', required: true },
];

// Application-specific extra fields (for screened events)
const APPLICATION_FIELDS: FormField[] = [
  { id: 'name', type: 'text', label: 'Full Name', placeholder: 'Jane Doe', required: true },
  { id: 'email', type: 'email', label: 'Email', placeholder: 'jane@example.com', required: true },
  { id: 'company', type: 'text', label: 'Company / Organization', placeholder: 'Acme Inc.', required: false },
  { id: 'role', type: 'text', label: 'Current Role', placeholder: 'Product Designer', required: false },
  { id: 'motivation', type: 'textarea', label: 'Why do you want to attend?', placeholder: 'Tell us what you hope to get out of this event...', required: true, description: 'This helps the organizer review your application.' },
];

// ═══════════════════════════════════════════════════════════════
//  CREDIT SYSTEM (mock — matches CreditSystem.tsx conventions)
// ═══════════════════════════════════════════════════════════════

const CREDITS_PER_USD = 60;
const MOCK_USER_CREDITS = 3000; // User has 3000 credits = $50

function usdToCredits(usd: number): number {
  return Math.round(usd * CREDITS_PER_USD);
}

// ═══════════════════════════════════════════════════════════════
//  HOOK: useEventCTA
// ═══════════════════════════════════════════════════════════════

export function useEventCTA() {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openCTA = useCallback((event: Event) => {
    setActiveEvent(event);
    setIsOpen(true);
  }, []);

  const closeCTA = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setActiveEvent(null), 300); // let animation finish
  }, []);

  return { activeEvent, isOpen, openCTA, closeCTA, setIsOpen };
}

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT: EventCTAModals
// ═══════════════════════════════════════════════════════════════

interface EventCTAModalsProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (event: Event, flow: CTAFlow) => void;
  onJoinLive?: (eventTitle: string) => void;
  /** Current LeapSpace name for auto-join detection */
  currentLeapSpace?: string;
}

export function EventCTAModals({
  event,
  open,
  onOpenChange,
  onSuccess,
  onJoinLive,
  currentLeapSpace = 'AI Creators',
}: EventCTAModalsProps) {
  // ── State ──
  const [phase, setPhase] = useState<
    'auto-join' | 'form' | 'ticket-select' | 'checkout' | 'waitlist-confirm' | 'processing' | 'success' | 'applied'
  >('form');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; value: number; type: 'percent' | 'fixed' } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [waitlistPosition, setWaitlistPosition] = useState(0);
  const [creditsDeducted, setCreditDeducted] = useState(0);
  const [showBuyCredits, setShowBuyCredits] = useState(false);
  const [bonusCredits, setBonusCredits] = useState(0); // credits added via top-up during checkout

  // ── Reset all state when event changes or modal opens externally ──
  // This fixes stale phase (e.g., "applied" from previous flow) persisting
  // when a new CTA is opened via openCTA() which sets open=true from parent
  useEffect(() => {
    if (open && event) {
      const currentFlow = determineCTAFlow(event);
      if (!currentFlow) return;

      // Reset form state
      setFormData({});
      setFormErrors({});
      setPromoCode('');
      setAppliedDiscount(null);
      setPromoError('');
      setAgreeToTerms(false);
      setIsProcessing(false);
      setSelectedTicketId(null);
      setCreditDeducted(0);
      setBonusCredits(0);
      setWaitlistPosition(0);
      setShowBuyCredits(false);

      // Determine initial phase for the NEW event
      const crossLeapSpace = event.communityName && event.communityName !== currentLeapSpace && !event.isStandalone;

      if (currentFlow === 'join-live') {
        onJoinLive?.(event.title);
        onOpenChange(false);
        return;
      }
      if (currentFlow === 'join-waitlist') {
        setPhase(crossLeapSpace ? 'auto-join' : 'waitlist-confirm');
      } else if (currentFlow === 'buy-ticket') {
        const tickets = event.tickets || [];
        if (tickets.length <= 1) {
          setSelectedTicketId(tickets[0]?.id || null);
          setPhase(crossLeapSpace ? 'auto-join' : 'form');
        } else {
          setPhase(crossLeapSpace ? 'auto-join' : 'ticket-select');
        }
      } else if (currentFlow === 'apply-screened') {
        setPhase(crossLeapSpace ? 'auto-join' : 'form');
      } else {
        setPhase(crossLeapSpace ? 'auto-join' : 'form');
      }
    }
  }, [open, event?.id]);

  if (!event) return null;

  const flow = determineCTAFlow(event);
  if (!flow) return null;

  // Determine if cross-LeapSpace (event belongs to a different LeapSpace)
  const isCrossLeapSpace = event.communityName && event.communityName !== currentLeapSpace && !event.isStandalone;

  // ── Reset on open ──
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      // Reset state first
      setFormData({});
      setFormErrors({});
      setPromoCode('');
      setAppliedDiscount(null);
      setPromoError('');
      setAgreeToTerms(false);
      setIsProcessing(false);
      setSelectedTicketId(null);

      // Determine initial phase
      if (flow === 'join-live') {
        onJoinLive?.(event.title);
        return;
      }
      if (flow === 'join-waitlist') {
        setPhase(isCrossLeapSpace ? 'auto-join' : 'waitlist-confirm');
      } else if (flow === 'buy-ticket') {
        const tickets = event.tickets || [];
        if (tickets.length <= 1) {
          // Single ticket — skip ticket selection, auto-select and go to form
          setSelectedTicketId(tickets[0]?.id || null);
          setPhase(isCrossLeapSpace ? 'auto-join' : 'form');
        } else {
          setPhase(isCrossLeapSpace ? 'auto-join' : 'ticket-select');
        }
      } else if (flow === 'apply-screened') {
        setPhase(isCrossLeapSpace ? 'auto-join' : 'form');
      } else {
        setPhase(isCrossLeapSpace ? 'auto-join' : 'form');
      }
    }
    onOpenChange(isOpen);
  };

  // ── Get form fields based on flow ──
  const getFormFields = (): FormField[] => {
    // Use custom registration fields from event if admin configured them
    if (event.customRegistrationFields && event.customRegistrationFields.length > 0) {
      return event.customRegistrationFields.map((f: any) => ({
        id: f.id,
        type: f.type || 'text',
        label: f.label,
        placeholder: f.placeholder || '',
        required: f.required ?? false,
        options: f.options,
        description: f.description,
      }));
    }
    if (flow === 'apply-screened') return APPLICATION_FIELDS;
    return DEFAULT_REG_FIELDS;
  };

  // ── Validation ──
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    const fields = getFormFields();
    fields.forEach(f => {
      if (f.required && !formData[f.id]) {
        errors[f.id] = `${f.label} is required`;
      }
      if (f.type === 'email' && formData[f.id] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[f.id])) {
        errors[f.id] = 'Invalid email address';
      }
    });
    if (!agreeToTerms) errors.terms = 'Required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── After auto-join confirmation ──
  const handleAutoJoinContinue = () => {
    if (flow === 'join-waitlist') setPhase('waitlist-confirm');
    else if (flow === 'buy-ticket') {
      const tickets = event.tickets || [];
      if (tickets.length <= 1) {
        setSelectedTicketId(tickets[0]?.id || null);
        setPhase('form');
      } else {
        setPhase('ticket-select');
      }
    }
    else setPhase('form');
  };

  // ── Submit registration form ──
  const handleFormSubmit = () => {
    if (!validateForm()) return;
    if (flow === 'apply-screened') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setPhase('applied');
      }, 1200);
      return;
    }
    if (flow === 'buy-ticket') {
      if (selectedTicketId) {
        // Already have a ticket selected (single-ticket auto-select), go to checkout
        setPhase('checkout');
      } else {
        setPhase('ticket-select');
      }
      return;
    }
    // Free registration
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPhase('success');
      toast.success('Registration confirmed!', { description: `You're registered for ${event.title}` });
    }, 1200);
  };

  // ── Ticket selection → checkout ──
  const handleTicketContinue = () => {
    if (!selectedTicketId) return;
    setPhase('form');
  };

  // ── After form in buy-ticket flow → checkout ──
  const handleFormThenCheckout = () => {
    if (!validateForm()) return;
    setPhase('checkout');
  };

  // ── Credits payment ──
  const getSelectedTicket = () => event.tickets?.find(t => t.id === selectedTicketId) || (event.tickets?.[0]);
  
  const getTicketPriceUSD = (): number => {
    const ticket = getSelectedTicket();
    if (!ticket) return event.price || 0;
    let price = ticket.price;
    if (appliedDiscount) {
      if (appliedDiscount.type === 'percent') price = price - (price * appliedDiscount.value / 100);
      else price = Math.max(0, price - appliedDiscount.value);
    }
    return price;
  };

  const getTicketPriceCredits = (): number => usdToCredits(getTicketPriceUSD());

  const handleApplyPromo = () => {
    setPromoError('');
    if (!promoCode.trim()) return;
    const code = event.discountCodes?.find(c => c.code.toUpperCase() === promoCode.toUpperCase());
    if (code) {
      if (code.used >= code.limit) { setPromoError('Code has reached its usage limit'); return; }
      setAppliedDiscount({ code: code.code, value: code.value, type: code.type });
    } else if (promoCode.toUpperCase() === 'SAVE20') {
      setAppliedDiscount({ code: 'SAVE20', value: 20, type: 'percent' });
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handlePayWithCredits = () => {
    const cost = getTicketPriceCredits();
    const effectiveBalance = MOCK_USER_CREDITS + bonusCredits;
    if (effectiveBalance < cost) {
      toast.error('Insufficient credits', { description: 'Please purchase more credits to continue.' });
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCreditDeducted(cost);
      setPhase('success');
      toast.success('Payment successful!', { description: `${cost} credits deducted` });
    }, 1800);
  };

  // ── Join waitlist ──
  const handleJoinWaitlist = () => {
    setIsProcessing(true);
    const existingWaitlist = getEventWaitlist(event.id);
    setTimeout(() => {
      setIsProcessing(false);
      setWaitlistPosition(existingWaitlist.length + 1);
      setPhase('success');
      toast.success('Added to waitlist!', { description: `You're #${existingWaitlist.length + 1} on the waitlist` });
    }, 1000);
  };

  const handleClose = () => {
    onOpenChange(false);
    if (phase === 'success' || phase === 'applied') {
      onSuccess?.(event, flow);
    }
  };

  // ═══════════════════════════════════════════════════════════
  //  RENDER HELPERS
  // ═══════════════════════════════════════════════════════════

  const renderFormField = (field: FormField) => {
    const hasError = !!formErrors[field.id];
    return (
      <div key={field.id} className="space-y-1.5">
        <Label className="text-sm text-foreground">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
        {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
        {field.type === 'textarea' ? (
          <Textarea
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={e => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
            className={hasError ? 'border-red-500' : ''}
          />
        ) : field.type === 'select' ? (
          <Select value={formData[field.id] || ''} onValueChange={v => setFormData(prev => ({ ...prev, [field.id]: v }))}>
            <SelectTrigger className={hasError ? 'border-red-500' : ''}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        ) : field.type === 'checkbox' ? (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData[field.id] || false}
              onCheckedChange={checked => setFormData(prev => ({ ...prev, [field.id]: checked }))}
            />
            <span className="text-sm text-muted-foreground">{field.placeholder}</span>
          </div>
        ) : (
          <Input
            type={field.type === 'phone' ? 'tel' : field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={e => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
            className={hasError ? 'border-red-500' : ''}
          />
        )}
        {hasError && <p className="text-xs text-red-500">{formErrors[field.id]}</p>}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  //  PHASE RENDERS
  // ═══════════════════════════════════════════════════════════

  const renderAutoJoin = () => (
    <div className="space-y-4 py-4">
      <div className="p-4 bg-muted rounded-xl border border-border space-y-3">
        <div className="flex items-center gap-2">
          <Link2 className="size-5 text-muted-foreground" />
          <span className="text-sm text-foreground">
            This event belongs to <strong>{event.communityName}</strong>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          By registering, you'll automatically join the <strong>{event.communityName}</strong> LeapSpace. You can leave anytime from your settings.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 shadow-none" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-none" onClick={handleAutoJoinContinue}>
          Continue & Join
          <ArrowRight className="size-4 ml-1.5" />
        </Button>
      </div>
    </div>
  );

  const renderRegistrationForm = () => {
    const fields = getFormFields();
    const isApplicationFlow = flow === 'apply-screened';
    // In buy-ticket flow, if we already selected a ticket, submitting goes to checkout
    const isBuyTicketFormStep = flow === 'buy-ticket' && selectedTicketId;

    return (
      <div className="space-y-4 py-4">
        {/* Event summary */}
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="size-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-foreground truncate">{event.title}</p>
            <p className="text-xs text-muted-foreground">{event.date} · {event.time}</p>
          </div>
        </div>

        {isApplicationFlow && (
          <div className="flex items-start gap-2 p-3 bg-muted rounded-lg border border-border">
            <ShieldCheck className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              This event requires organizer approval. Complete the application below and you'll be notified when reviewed.
            </p>
          </div>
        )}

        {/* Form fields */}
        <div className="space-y-3">
          {fields.map(renderFormField)}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <Checkbox
            checked={agreeToTerms}
            onCheckedChange={checked => { setAgreeToTerms(!!checked); if (formErrors.terms) setFormErrors(prev => { const n = { ...prev }; delete n.terms; return n; }); }}
            className="mt-0.5"
          />
          <span className="text-xs text-muted-foreground">
            I agree to the <button className="text-primary underline">Terms of Service</button> and <button className="text-primary underline">Privacy Policy</button>
          </span>
        </div>
        {formErrors.terms && <p className="text-xs text-red-500">{formErrors.terms}</p>}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 shadow-none" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
            disabled={isProcessing}
            onClick={isBuyTicketFormStep ? handleFormThenCheckout : handleFormSubmit}
          >
            {isProcessing ? (
              <><Loader2 className="size-4 mr-1.5 animate-spin" />Submitting...</>
            ) : isApplicationFlow ? (
              <><ShieldCheck className="size-4 mr-1.5" />Submit Application</>
            ) : isBuyTicketFormStep ? (
              <>Continue to Payment<ArrowRight className="size-4 ml-1.5" /></>
            ) : (
              <><CheckCircle className="size-4 mr-1.5" />Register</>
            )}
          </Button>
        </div>
      </div>
    );
  };

  const renderTicketSelect = () => {
    const tickets = event.tickets || [];
    const singleTicket = tickets.length <= 1;

    if (singleTicket) {
      // Auto-select the single ticket - handled in phase init instead
      return null;
    }

    return (
      <div className="space-y-4 py-4">
        <div className="space-y-3">
          {tickets.map((ticket: any) => {
            const isSelected = selectedTicketId === ticket.id;
            const soldOut = ticket.remaining !== undefined && ticket.remaining === 0;
            return (
              <button
                key={ticket.id}
                onClick={() => !soldOut && setSelectedTicketId(ticket.id)}
                disabled={soldOut}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  soldOut ? 'border-border bg-muted opacity-60 cursor-not-allowed'
                  : isSelected ? 'border-primary bg-primary/5 cursor-pointer'
                  : 'border-border hover:border-muted-foreground/30 hover:bg-muted cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">{ticket.name}</span>
                      {soldOut && <Badge className="bg-muted text-muted-foreground border border-border text-[10px] shadow-none">Sold Out</Badge>}
                      {!soldOut && ticket.remaining !== undefined && ticket.remaining <= 10 && (
                        <Badge className="bg-muted text-muted-foreground border border-border text-[10px] shadow-none">
                          {ticket.remaining} left
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{ticket.description}</p>
                    {ticket.perks && ticket.perks.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ticket.perks.slice(0, 3).map((perk: string) => (
                          <span key={perk} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                            <CheckCircle className="size-2.5 text-green-600" />{perk}
                          </span>
                        ))}
                        {ticket.perks.length > 3 && <span className="text-[10px] text-muted-foreground">+{ticket.perks.length - 3} more</span>}
                      </div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className="text-lg text-foreground">${ticket.price}</span>
                    <p className="text-[10px] text-muted-foreground">{usdToCredits(ticket.price)} credits</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {event.earlyBird?.active && (
          <div className="flex items-start gap-2 p-3 bg-muted rounded-lg border border-border">
            <Clock className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              <strong>{event.earlyBird.discountPercent}% early bird discount</strong> ends {new Date(event.earlyBird.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 shadow-none" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
            disabled={!selectedTicketId}
            onClick={() => setPhase('form')}
          >
            Continue<ArrowRight className="size-4 ml-1.5" />
          </Button>
        </div>
      </div>
    );
  };

  const renderCheckout = () => {
    const ticket = getSelectedTicket();
    const priceUSD = getTicketPriceUSD();
    const priceCredits = getTicketPriceCredits();
    const effectiveBalance = MOCK_USER_CREDITS + bonusCredits;
    const hasEnough = effectiveBalance >= priceCredits;

    return (
      <div className="space-y-5 py-4">
        {/* Order summary */}
        <div className="p-4 bg-muted rounded-xl border border-border space-y-3">
          <h3 className="text-sm text-foreground">Order Summary</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{ticket?.name || 'Ticket'}</span>
            <span className="text-foreground">${ticket?.price || event.price}</span>
          </div>
          {appliedDiscount && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({appliedDiscount.code})</span>
              <span>-${((ticket?.price || event.price || 0) - priceUSD).toFixed(2)}</span>
            </div>
          )}
          <div className="h-px bg-border" />
          <div className="flex justify-between text-foreground">
            <span>Total</span>
            <div className="text-right">
              <span className="text-lg">${priceUSD.toFixed(2)}</span>
              <p className="text-xs text-muted-foreground">{priceCredits} credits</p>
            </div>
          </div>

          {/* Promo code */}
          <div className="pt-2 space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Promo Code"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="h-8 text-sm"
              />
              <Button size="sm" variant="outline" className="h-8 shadow-none" onClick={handleApplyPromo}>Apply</Button>
            </div>
            {promoError && <p className="text-xs text-red-500">{promoError}</p>}
            {appliedDiscount && !promoError && (
              <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle className="size-3" />Code applied!</p>
            )}
          </div>
        </div>

        {/* Credits payment */}
        <div className="space-y-3">
          <h3 className="text-sm text-foreground">Pay with Credits</h3>
          <div className="p-4 rounded-xl border-2 border-primary bg-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="size-5 text-primary" />
                <div>
                  <p className="text-sm text-foreground">Your Balance</p>
                  <p className="text-xs text-muted-foreground">
                    {effectiveBalance.toLocaleString()} credits
                    {bonusCredits > 0 && <span className="text-green-600 ml-1">(+{bonusCredits.toLocaleString()} added)</span>}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground">Cost</p>
                <p className="text-sm text-primary">{priceCredits} credits</p>
              </div>
            </div>
            {!hasEnough && (
              <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="size-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-red-700">Insufficient credits. You need {priceCredits - effectiveBalance} more.</p>
                  <button
                    onClick={() => {
                      onOpenChange(false);
                      toast.info('Navigate to Credits page from the sidebar to top up your balance.', { duration: 5000 });
                    }}
                    className="text-xs text-primary underline mt-1 cursor-pointer"
                  >
                    Buy more credits
                  </button>
                </div>
              </div>
            )}
            {hasEnough && (
              <p className="text-xs text-muted-foreground mt-2">
                Remaining after purchase: {(effectiveBalance - priceCredits).toLocaleString()} credits
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="shadow-none" onClick={() => setPhase('form')}>Back</Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
            disabled={isProcessing || !hasEnough}
            onClick={handlePayWithCredits}
          >
            {isProcessing ? (
              <><Loader2 className="size-4 mr-1.5 animate-spin" />Processing...</>
            ) : (
              <>Pay {priceCredits} Credits<ArrowRight className="size-4 ml-1.5" /></>
            )}
          </Button>
        </div>
      </div>
    );
  };

  const renderWaitlistConfirm = () => (
    <div className="space-y-4 py-4">
      <div className="flex flex-col items-center text-center py-4">
        <div className="size-14 rounded-full bg-muted flex items-center justify-center mb-4">
          <Clock className="size-7 text-muted-foreground" />
        </div>
        <h3 className="text-foreground mb-2">Join the Waitlist</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          {isEventSoldOut(event)
            ? `${event.title} is sold out. Join the waitlist and you'll be notified when a spot opens up.`
            : `${event.title} uses a waitlist. You'll be notified when your spot is confirmed.`
          }
        </p>
        {getEventWaitlist(event.id).length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            Currently {getEventWaitlist(event.id).length} people on the waitlist
          </p>
        )}
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 shadow-none" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
          disabled={isProcessing}
          onClick={handleJoinWaitlist}
        >
          {isProcessing ? <><Loader2 className="size-4 mr-1.5 animate-spin" />Joining...</> : <><Clock className="size-4 mr-1.5" />Join Waitlist</>}
        </Button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="py-10 flex flex-col items-center text-center space-y-4">
      <div className="size-16 rounded-full bg-green-50 flex items-center justify-center mb-2">
        <CheckCircle className="size-8 text-green-600" />
      </div>
      {flow === 'join-waitlist' ? (
        <>
          <h2 className="text-xl text-foreground">You're on the waitlist!</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            You're #{waitlistPosition} on the waitlist for <strong>{event.title}</strong>. We'll notify you when a spot opens.
          </p>
        </>
      ) : flow === 'buy-ticket' ? (
        <>
          <h2 className="text-xl text-foreground">You're going!</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            {creditsDeducted} credits deducted. Remaining balance: {(MOCK_USER_CREDITS - creditsDeducted).toLocaleString()} credits.
          </p>
          <p className="text-sm text-muted-foreground">
            A confirmation has been sent to your email.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-xl text-foreground">You're registered!</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            You're confirmed for <strong>{event.title}</strong>. A confirmation email has been sent.
          </p>
        </>
      )}
      <div className="flex flex-col gap-2 w-full max-w-xs pt-2">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-none" onClick={handleClose}>
          <Calendar className="size-4 mr-1.5" />Add to Calendar
        </Button>
        <Button variant="outline" className="w-full shadow-none" onClick={handleClose}>
          Done
        </Button>
      </div>
    </div>
  );

  const renderApplied = () => (
    <div className="py-10 flex flex-col items-center text-center space-y-4">
      <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-2">
        <ShieldCheck className="size-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl text-foreground">Application Submitted</h2>
      <p className="text-sm text-muted-foreground max-w-xs">
        Your application for <strong>{event.title}</strong> is under review. The organizer will notify you once a decision is made.
      </p>
      <Badge className="bg-muted text-muted-foreground border border-border shadow-none">
        <Clock className="size-3 mr-1" />Pending Review
      </Badge>
      <div className="pt-2">
        <Button variant="outline" className="shadow-none" onClick={handleClose}>
          Done
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  //  DIALOG TITLES
  // ═══════════════════════════════════════════════════════════

  const getTitle = () => {
    switch (phase) {
      case 'auto-join': return 'Join LeapSpace';
      case 'form': return flow === 'apply-screened' ? 'Apply to Join' : 'Registration';
      case 'ticket-select': return 'Select Ticket';
      case 'checkout': return 'Checkout';
      case 'waitlist-confirm': return 'Join Waitlist';
      case 'success': return '';
      case 'applied': return '';
      default: return 'Register';
    }
  };

  const getStepIndicator = () => {
    if (flow === 'buy-ticket') {
      const steps = ['ticket-select', 'form', 'checkout'];
      const current = steps.indexOf(phase);
      if (current < 0) return null;
      return (
        <div className="flex items-center gap-1">
          {steps.map((s, i) => (
            <div key={s} className={`size-2 rounded-full ${i <= current ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>
      );
    }
    return null;
  };

  // ═══════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════

  const isTerminalPhase = phase === 'success' || phase === 'applied';

  return (
    <>
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden gap-0">
        {!isTerminalPhase ? (
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center justify-between mb-1">
              <DialogTitle className="text-lg text-foreground">{getTitle()}</DialogTitle>
              {getStepIndicator()}
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              {event.title} · {event.date}
            </DialogDescription>
          </DialogHeader>
        ) : (
          <div className="sr-only">
            <DialogTitle>{phase === 'success' ? 'Success' : 'Application Submitted'}</DialogTitle>
            <DialogDescription>Your action has been completed.</DialogDescription>
          </div>
        )}

        <div className="px-6 max-h-[70vh] overflow-auto">
          {phase === 'auto-join' && renderAutoJoin()}
          {phase === 'form' && renderRegistrationForm()}
          {phase === 'ticket-select' && renderTicketSelect()}
          {phase === 'checkout' && renderCheckout()}
          {phase === 'waitlist-confirm' && renderWaitlistConfirm()}
          {phase === 'success' && renderSuccess()}
          {phase === 'applied' && renderApplied()}
        </div>
      </DialogContent>
    </Dialog>

    {/* Buy Credits Modal — overlays on top when user needs more credits */}
    <BuyCreditsModal
      open={showBuyCredits}
      onOpenChange={setShowBuyCredits}
      currentBalance={MOCK_USER_CREDITS + bonusCredits}
      onPurchase={(credits) => {
        setBonusCredits(prev => prev + credits);
        setShowBuyCredits(false);
        toast.success(`${credits.toLocaleString()} credits added!`, { description: 'You can now complete your purchase.' });
      }}
    />
    </>
  );
}