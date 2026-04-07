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
  Coins,
  Plus,
  CheckCircle,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Zap,
  Info,
  Loader2
} from 'lucide-react';

// ── Credit Conversion Constants ──
export const CREDITS_PER_DOLLAR = 60; // 1 USD = 60 credits → $2 = 120 credits

export function dollarsToCredits(dollars: number): number {
  return Math.round(dollars * CREDITS_PER_DOLLAR);
}

export function creditsToDollars(credits: number): number {
  return credits / CREDITS_PER_DOLLAR;
}

export function formatCredits(credits: number): string {
  if (credits >= 1000) {
    return `${(credits / 1000).toFixed(credits % 1000 === 0 ? 0 : 1)}k`;
  }
  return credits.toLocaleString();
}

// ── Credit Packages for Purchase ──
export const CREDIT_PACKAGES = [
  { id: 'starter', name: 'Starter', credits: 500, price: 8.33, popular: false, savings: 0 },
  { id: 'standard', name: 'Standard', credits: 1500, price: 22.50, popular: false, savings: 10 },
  { id: 'pro', name: 'Pro', credits: 5000, price: 66.67, popular: true, savings: 20 },
  { id: 'enterprise', name: 'Enterprise', credits: 15000, price: 175.00, popular: false, savings: 30 },
];

// ── Mock User Credit Data ──
export const MOCK_CREDIT_DATA = {
  totalCredits: 4_250,
  usedThisMonth: 1_820,
  pendingHolds: 360, // credits reserved for upcoming events
  lifetimeEarned: 12_500,
};

// ── Credit Balance Indicator (for header/sidebar) ──
interface CreditBalanceIndicatorProps {
  credits?: number;
  onBuyCredits?: () => void;
  compact?: boolean;
  className?: string;
}

export function CreditBalanceIndicator({
  credits = MOCK_CREDIT_DATA.totalCredits,
  onBuyCredits,
  compact = false,
  className = ''
}: CreditBalanceIndicatorProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (compact) {
    return (
      <button
        onClick={onBuyCredits}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/8 hover:bg-primary/12 border border-primary/15 transition-colors cursor-pointer ${className}`}
      >
        <Coins className="size-3.5 text-primary" />
        <span className="text-xs text-primary font-semibold">{formatCredits(credits)}</span>

        {showTooltip && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 rounded-lg whitespace-nowrap z-50 pointer-events-none shadow-lg">
            <p className="text-xs text-white font-medium">{credits.toLocaleString()} credits available</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Click to buy more</p>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-px">
              <div className="border-4 border-transparent border-b-gray-900"></div>
            </div>
          </div>
        )}
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/8 border border-primary/15">
        <Coins className="size-4 text-primary" />
        <div className="flex flex-col">
          <span className="text-sm text-primary font-semibold">{credits.toLocaleString()}</span>
          <span className="text-[10px] text-primary/60 -mt-0.5">credits</span>
        </div>
      </div>
      {onBuyCredits && (
        <Button
          size="sm"
          variant="outline"
          onClick={onBuyCredits}
          className="h-7 text-xs border-primary/20 text-primary hover:bg-primary/5 rounded-lg"
        >
          <Plus className="size-3 mr-1" />
          Buy
        </Button>
      )}
    </div>
  );
}

// ── Credit Conversion Preview (inline for admin ticket pricing) ──
interface CreditConversionPreviewProps {
  dollars: number;
  className?: string;
}

export function CreditConversionPreview({ dollars, className = '' }: CreditConversionPreviewProps) {
  const credits = dollarsToCredits(dollars);
  if (!dollars || dollars <= 0) return null;

  return (
    <div className={`flex items-center gap-2 mt-1.5 px-2.5 py-1.5 rounded-lg bg-primary/5 border border-primary/10 ${className}`}>
      <Coins className="size-3.5 text-primary flex-shrink-0" />
      <span className="text-xs text-primary/80">
        <span className="font-semibold text-primary">{credits.toLocaleString()} credits</span>
        {' '}= ${dollars.toFixed(2)} USD
      </span>
      <span className="text-[10px] text-primary/50 ml-auto">@{CREDITS_PER_DOLLAR}/USD</span>
    </div>
  );
}

// ── Credit Price Badge (learner-facing, replaces dollar price) ──
interface CreditPriceBadgeProps {
  dollars: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CreditPriceBadge({ dollars, className = '', size = 'md' }: CreditPriceBadgeProps) {
  const credits = dollarsToCredits(dollars);

  if (dollars <= 0) {
    return (
      <Badge variant="secondary" className={`bg-green-50 text-green-700 border-green-100 font-semibold ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : size === 'lg' ? 'text-base px-3 py-1' : 'text-sm px-2.5 py-0.5'
      } ${className}`}>
        Free
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className={`bg-primary/8 text-primary border-primary/15 font-semibold ${
      size === 'sm' ? 'text-xs px-2 py-0.5' : size === 'lg' ? 'text-base px-3 py-1' : 'text-sm px-2.5 py-0.5'
    } ${className}`}>
      <Coins className={`${size === 'sm' ? 'size-3' : size === 'lg' ? 'size-4' : 'size-3.5'} mr-1`} />
      {credits.toLocaleString()}
    </Badge>
  );
}

// ── Buy Credits Modal ──
interface BuyCreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance?: number;
  onPurchase?: (credits: number) => void;
}

export function BuyCreditsModal({
  open,
  onOpenChange,
  currentBalance = MOCK_CREDIT_DATA.totalCredits,
  onPurchase
}: BuyCreditsModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>('pro');
  const [customAmount, setCustomAmount] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const getSelectedCredits = (): number => {
    if (useCustom) {
      const amount = parseFloat(customAmount);
      return amount > 0 ? dollarsToCredits(amount) : 0;
    }
    const pkg = CREDIT_PACKAGES.find(p => p.id === selectedPackage);
    return pkg?.credits || 0;
  };

  const getSelectedPrice = (): number => {
    if (useCustom) {
      return parseFloat(customAmount) || 0;
    }
    const pkg = CREDIT_PACKAGES.find(p => p.id === selectedPackage);
    return pkg?.price || 0;
  };

  const handlePurchase = () => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      setPurchaseComplete(true);
      onPurchase?.(getSelectedCredits());
    }, 1500);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setPurchaseComplete(false);
      setIsPurchasing(false);
    }, 200);
  };

  if (purchaseComplete) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[420px]">
          <div className="py-10 flex flex-col items-center text-center space-y-4">
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h2 className="text-xl text-foreground">Credits Added!</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              <span className="font-semibold text-primary">{getSelectedCredits().toLocaleString()} credits</span> have been added to your balance.
            </p>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg border border-primary/10">
              <Coins className="size-4 text-primary" />
              <span className="text-sm text-primary font-semibold">
                New Balance: {(currentBalance + getSelectedCredits()).toLocaleString()} credits
              </span>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none mt-2" onClick={handleClose}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Coins className="size-5 text-primary" />
            Buy Credits
          </DialogTitle>
          <DialogDescription>
            Credits are used to register for events and courses on LeapSpace.
          </DialogDescription>
        </DialogHeader>

        {/* Current Balance */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Coins className="size-4 text-primary" />
            <span className="text-sm text-muted-foreground">Current Balance</span>
          </div>
          <span className="text-sm text-foreground font-semibold">{currentBalance.toLocaleString()} credits</span>
        </div>

        {/* Package Selection */}
        <div className="space-y-3 py-2">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Select a package</p>
          <div className="grid grid-cols-2 gap-3">
            {CREDIT_PACKAGES.map(pkg => (
              <button
                key={pkg.id}
                onClick={() => { setSelectedPackage(pkg.id); setUseCustom(false); }}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  selectedPackage === pkg.id && !useCustom
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-2 right-3 bg-primary text-primary-foreground text-[10px] px-2 py-0 shadow-none rounded">
                    Best Value
                  </Badge>
                )}
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="size-3.5 text-primary" />
                  <span className="text-xs text-muted-foreground">{pkg.name}</span>
                </div>
                <p className="text-lg text-foreground font-semibold">{pkg.credits.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">credits</p>
                <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border">
                  <span className="text-sm text-foreground font-medium">${pkg.price.toFixed(2)}</span>
                  {pkg.savings > 0 && (
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100 text-[10px] px-1.5 py-0">
                      {pkg.savings}% off
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <button
            onClick={() => setUseCustom(true)}
            className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
              useCustom
                ? 'border-primary bg-primary/5'
                : 'border-dashed border-border hover:border-primary/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Custom amount</span>
              {useCustom && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">$</span>
                  <Input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-24 h-7 text-sm"
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                  {customAmount && parseFloat(customAmount) > 0 && (
                    <span className="text-xs text-primary font-medium">
                      = {dollarsToCredits(parseFloat(customAmount)).toLocaleString()} credits
                    </span>
                  )}
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Rate Info */}
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg text-xs text-blue-700">
          <Info className="size-3.5 flex-shrink-0" />
          <span>Rate: <strong>1 USD = {CREDITS_PER_DOLLAR} credits</strong>. Bulk packages include bonus credits.</span>
        </div>

        <DialogFooter className="flex-row gap-2">
          <Button variant="outline" onClick={handleClose} className="rounded-lg flex-1">
            Cancel
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 text-white rounded-lg shadow-none flex-1"
            disabled={getSelectedCredits() === 0 || isPurchasing}
            onClick={handlePurchase}
          >
            {isPurchasing ? (
              <>
                <Loader2 className="size-3.5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap className="size-3.5 mr-2" />
                Buy {getSelectedCredits().toLocaleString()} credits — ${getSelectedPrice().toFixed(2)}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Credit Usage Summary (for dashboard/overview) ──
interface CreditUsageSummaryProps {
  className?: string;
}

export function CreditUsageSummary({ className = '' }: CreditUsageSummaryProps) {
  const data = MOCK_CREDIT_DATA;
  const availablePercent = Math.round((data.totalCredits / data.lifetimeEarned) * 100);

  return (
    <div className={`bg-card rounded-xl border border-border p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Coins className="size-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm text-foreground font-semibold">Credit Balance</h3>
            <p className="text-xs text-muted-foreground">LeapSpace credits</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl text-primary font-semibold">{data.totalCredits.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">available</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${availablePercent}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="px-2 py-1.5 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Used this month</p>
          <p className="text-sm text-foreground font-semibold">{data.usedThisMonth.toLocaleString()}</p>
        </div>
        <div className="px-2 py-1.5 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Pending holds</p>
          <p className="text-sm text-foreground font-semibold">{data.pendingHolds.toLocaleString()}</p>
        </div>
        <div className="px-2 py-1.5 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Lifetime</p>
          <p className="text-sm text-foreground font-semibold">{data.lifetimeEarned.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}