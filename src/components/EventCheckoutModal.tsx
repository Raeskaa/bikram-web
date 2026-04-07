import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from './ui/dialog';
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface DiscountCode {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  limit: number;
  used: number;
}

interface EventCheckoutModalProps {
  event: any; // Using any for flexibility with different event shapes
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  tickets?: any[];
  discountCodes?: DiscountCode[];
}

export function EventCheckoutModal({ 
  event, 
  open, 
  onOpenChange, 
  onSuccess, 
  tickets: propTickets,
  discountCodes = [] 
}: EventCheckoutModalProps) {
  const [step, setStep] = useState<'tickets' | 'details' | 'payment' | 'confirmation'>('tickets');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; value: number; type: 'percent' | 'fixed' } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const defaultTickets = [
    { id: 'early', name: 'Early Bird', price: 50, remaining: 15, description: 'Limited time offer' },
    { id: 'general', name: 'General Admission', price: 99, remaining: 180, description: 'Full access to all sessions' },
    { id: 'vip', name: 'VIP Access', price: 199, remaining: 35, description: 'Priority seating + Backstage pass' }
  ];

  const tickets = propTickets && propTickets.length > 0 ? propTickets : defaultTickets;

  const handleApplyPromo = () => {
    setPromoError(null);
    if (!promoCode.trim()) return;

    // Check against provided discount codes first
    const code = discountCodes.find(c => c.code.toUpperCase() === promoCode.toUpperCase());
    
    if (code) {
      if (code.used >= code.limit) {
        setPromoError('This code has reached its usage limit.');
        return;
      }
      setAppliedDiscount({ code: code.code, value: code.value, type: code.type });
      return;
    }

    // Fallback for hardcoded demo codes if no props provided or not found
    if (promoCode.toUpperCase() === 'SAVE20') {
      setAppliedDiscount({ code: 'SAVE20', value: 20, type: 'percent' });
    } else {
      setPromoError('Invalid promo code.');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 2000);
  };

  const getPrice = () => {
    const ticket = tickets.find(t => t.id === selectedTicket);
    if (!ticket) return 0;
    
    let finalPrice = ticket.price;
    
    if (appliedDiscount) {
      if (appliedDiscount.type === 'percent') {
        finalPrice = ticket.price - (ticket.price * appliedDiscount.value / 100);
      } else {
        finalPrice = Math.max(0, ticket.price - appliedDiscount.value);
      }
    }
    
    return finalPrice;
  };

  const renderContent = () => {
    switch (step) {
      case 'tickets':
        return (
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              {tickets.map((ticket: any) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    selectedTicket === ticket.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground/30 hover:bg-muted'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{ticket.name}</h3>
                      {ticket.remaining < 20 && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-[10px]">
                          Only {ticket.remaining} left
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{ticket.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">${ticket.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-muted p-3 rounded-lg flex items-start gap-3">
              <AlertCircle className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong>Satisfaction Guarantee:</strong> Full refund if you cancel within 24 hours of the event.
              </p>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">First Name</label>
                <Input placeholder="Jane" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Email Address</label>
              <Input placeholder="jane@example.com" type="email" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Job Title</label>
              <Input placeholder="Product Designer" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Company</label>
              <Input placeholder="Acme Inc." />
            </div>
            
            <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-xs text-muted-foreground">I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a>.</span>
                </label>
            </div>
          </div>
        );

      case 'payment':
        const ticket = tickets.find(t => t.id === selectedTicket);
        return (
          <div className="space-y-6 py-4">
            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Order Summary</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{ticket?.name}</span>
                <span className="font-medium">${ticket?.price}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({appliedDiscount.code})</span>
                  <span>-${(ticket!.price - getPrice()).toFixed(2)}</span>
                </div>
              )}
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>${getPrice().toFixed(2)}</span>
              </div>
              
              <div className="pt-2 space-y-2">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Promo Code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="h-8 text-sm bg-white"
                  />
                  <Button size="sm" variant="outline" className="h-8" onClick={handleApplyPromo}>Apply</Button>
                </div>
                {promoError && (
                  <p className="text-xs text-red-600">{promoError}</p>
                )}
                {appliedDiscount && !promoError && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="size-3" />
                    Code applied successfully!
                  </p>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
               <h3 className="text-sm font-semibold text-gray-900">Payment Method</h3>
               <div className="space-y-3">
                 <div className="relative">
                   <CreditCard className="absolute left-3 top-2.5 size-4 text-gray-400" />
                   <Input className="pl-9" placeholder="Card number" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <Input placeholder="MM / YY" />
                   <Input placeholder="CVC" />
                 </div>
               </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
                <ShieldCheck className="size-3.5 text-green-600" />
                <span>Secure 256-bit SSL Encrypted Payment</span>
            </div>
          </div>
        );

      case 'confirmation':
        return (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mb-2 animate-bounce">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">You're going!</h2>
            <p className="text-gray-600 max-w-xs">
              A confirmation email with your ticket has been sent to <strong>jane@example.com</strong>.
            </p>
            <div className="pt-4 flex flex-col gap-2 w-full max-w-xs">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onSuccess}>
                Add to Calendar
              </Button>
              <Button variant="outline" className="w-full" onClick={onSuccess}>
                View Ticket
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden gap-0">
        {step !== 'confirmation' ? (
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <DialogTitle className="text-xl font-bold text-gray-900">
                {step === 'tickets' && 'Select Ticket'}
                {step === 'details' && 'Attendee Details'}
                {step === 'payment' && 'Secure Checkout'}
              </DialogTitle>
              <div className="flex items-center gap-1">
                  <div className={`size-2 rounded-full ${step === 'tickets' ? 'bg-primary' : 'bg-muted'}`} />
                  <div className={`size-2 rounded-full ${step === 'details' ? 'bg-primary' : 'bg-muted'}`} />
                  <div className={`size-2 rounded-full ${step === 'payment' ? 'bg-primary' : 'bg-muted'}`} />
              </div>
            </div>
            <DialogDescription className="text-sm text-gray-500">
              {event.title} • {new Date(event.startDate || Date.now()).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
        ) : (
          <div className="sr-only">
            <DialogTitle>Order Confirmed</DialogTitle>
            <DialogDescription>Your ticket has been booked successfully.</DialogDescription>
          </div>
        )}

        <div className="px-6">
          {renderContent()}
        </div>

        {step !== 'confirmation' && (
          <DialogFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex-row gap-3 justify-between sm:justify-between items-center">
             {step !== 'tickets' ? (
                 <Button variant="ghost" onClick={() => setStep(step === 'payment' ? 'details' : 'tickets')}>
                     Back
                 </Button>
             ) : (
                 <div className="text-xs text-gray-500">
                     Prices in USD
                 </div>
             )}
             
             <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]" 
                disabled={!selectedTicket || isProcessing}
                onClick={() => {
                    if (step === 'tickets') setStep('details');
                    if (step === 'details') setStep('payment');
                    if (step === 'payment') handlePayment();
                }}
             >
                {isProcessing ? (
                    <>
                        <Loader2 className="size-4 mr-2 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        {step === 'payment' ? `Pay $${getPrice().toFixed(2)}` : 'Continue'}
                        <ArrowRight className="size-4 ml-2" />
                    </>
                )}
             </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}