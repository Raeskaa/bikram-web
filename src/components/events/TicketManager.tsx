import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Ticket,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Lock,
  DollarSign,
  Users,
  Pause,
  Play,
  XCircle,
  EyeOff,
  Info,
  BarChart3,
  TrendingUp,
  Calendar,
  Ban,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { cn } from '../ui/utils';

// ── Types ──

export interface TicketTier {
  id: string;
  name: string;
  type: 'free' | 'paid';
  price: number;
  quantity: number;
  sold: number;
  description: string;
  status: 'active' | 'paused' | 'sold-out' | 'closed';
  visibility: 'public' | 'hidden';
  salesStart?: string;
  salesEnd?: string;
  maxPerOrder: number;
  minPerOrder: number;
  sortOrder: number;
}

export type EventPricingMode = 'free' | 'paid';

export interface TicketManagerProps {
  tickets: TicketTier[];
  onTicketsChange: (tickets: TicketTier[]) => void;
  discountCodes: any[];
  onDiscountCodesChange: (codes: any[]) => void;
  // Event state
  isDraft: boolean;
  isPublished: boolean;
  pricingMode: EventPricingMode;
  pricingModeLocked: boolean;
  eventCapacity: number;
  registeredCount: number;
  // Changelog integration
  onLogChange?: (field: string, label: string, oldVal: string, newVal: string, notify: boolean, role?: string) => void;
  onRequestConfirmation?: (config: any) => void;
  getCurrentUserRole?: () => string;
  currentUser?: { name: string; email: string } | null;
  createEditWarningConfig?: (field: string, oldVal: string, newVal: string, count: number) => any;
}

// ── Helpers ──

function createDefaultTier(overrides?: Partial<TicketTier>): TicketTier {
  return {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
    name: '',
    type: 'paid',
    price: 0,
    quantity: 100,
    sold: 0,
    description: '',
    status: 'active',
    visibility: 'public',
    maxPerOrder: 10,
    minPerOrder: 1,
    sortOrder: 0,
    ...overrides,
  };
}

export function createFreeAdmissionTier(capacity: number): TicketTier {
  return createDefaultTier({
    name: 'General Admission',
    type: 'free',
    price: 0,
    quantity: capacity || 100,
    description: 'Free entry to the event',
    status: 'active',
    visibility: 'public',
  });
}

export function derivePricingMode(tickets: TicketTier[]): EventPricingMode {
  if (tickets.length === 0) return 'free';
  return tickets.some(t => t.price > 0) ? 'paid' : 'free';
}

const STATUS_CONFIG = {
  active: { label: 'Active', icon: CheckCircle, className: 'text-primary' },
  paused: { label: 'Paused', icon: Pause, className: 'text-muted-foreground' },
  'sold-out': { label: 'Sold Out', icon: Ban, className: 'text-destructive' },
  closed: { label: 'Closed', icon: XCircle, className: 'text-muted-foreground' },
} as const;

// ── Ticket Edit Modal ──

function TicketEditModal({
  open,
  onOpenChange,
  ticket,
  onSave,
  isPublished,
  pricingMode,
  pricingModeLocked,
  existingSold,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: TicketTier | null;
  onSave: (ticket: TicketTier) => void;
  isPublished: boolean;
  pricingMode: EventPricingMode;
  pricingModeLocked: boolean;
  existingSold: number;
}) {
  const [form, setForm] = useState<TicketTier | null>(null);

  // Sync form when ticket changes
  useEffect(() => {
    if (ticket) setForm({ ...ticket });
  }, [ticket]);

  // Reset form when modal opens with new ticket
  const handleOpenChange = (v: boolean) => {
    if (v && ticket) {
      setForm({ ...ticket });
    }
    onOpenChange(v);
  };

  if (!form) return null;

  const isNew = existingSold === 0 && !form.salesStart;
  const isEditing = !isNew;
  const minQuantity = existingSold;
  const canChangeType = !pricingModeLocked || pricingMode === 'paid';

  const update = (patch: Partial<TicketTier>) => {
    setForm(prev => prev ? { ...prev, ...patch } : prev);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      toast.error('Ticket name is required');
      return;
    }
    if (form.quantity < minQuantity) {
      toast.error(`Quantity can't be less than ${minQuantity} (already sold)`);
      return;
    }
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Ticket Tier' : 'Create Ticket Tier'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update pricing, availability, and details for this tier.'
              : 'Set up a new ticket tier for your event.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-2 max-h-[60vh] overflow-y-auto pr-1">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="tier-name">Ticket Name</Label>
            <Input
              id="tier-name"
              value={form.name}
              onChange={e => update({ name: e.target.value })}
              placeholder="e.g. Early Bird, VIP, General Admission"
            />
          </div>

          {/* Type + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Ticket Type</Label>
              <Select
                value={form.type}
                onValueChange={(v: 'free' | 'paid') => {
                  update({
                    type: v,
                    price: v === 'free' ? 0 : form.price,
                  });
                }}
                disabled={pricingModeLocked && pricingMode === 'free'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              {pricingModeLocked && pricingMode === 'free' && (
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Lock className="size-2.5" /> Locked — published as free
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tier-price">Price ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  id="tier-price"
                  type="number"
                  min={0}
                  step={0.01}
                  value={form.price}
                  onChange={e => update({ price: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="pl-8"
                  disabled={form.type === 'free'}
                />
              </div>
            </div>
          </div>

          {/* Price change warning */}
          {isPublished && existingSold > 0 && isEditing && (
            <div className="bg-muted rounded-lg p-3 border border-border">
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <AlertTriangle className="size-3.5 flex-shrink-0 mt-0.5 text-primary" />
                <span>
                  <strong>{existingSold} attendee{existingSold !== 1 ? 's' : ''}</strong> already
                  hold this ticket. Changing the price won't auto-refund existing holders.
                </span>
              </p>
            </div>
          )}

          {/* Quantity + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tier-qty">Quantity</Label>
              <Input
                id="tier-qty"
                type="number"
                min={minQuantity}
                value={form.quantity}
                onChange={e => update({ quantity: Math.max(minQuantity, parseInt(e.target.value) || 0) })}
              />
              {minQuantity > 0 && (
                <p className="text-[10px] text-muted-foreground">
                  Min {minQuantity} ({existingSold} sold)
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v: TicketTier['status']) => update({ status: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Visibility + Per-order limits */}
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Visibility</Label>
              <Select
                value={form.visibility}
                onValueChange={(v: 'public' | 'hidden') => update({ visibility: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tier-min">Min / order</Label>
              <Input
                id="tier-min"
                type="number"
                min={1}
                max={form.maxPerOrder}
                value={form.minPerOrder}
                onChange={e => update({ minPerOrder: Math.max(1, parseInt(e.target.value) || 1) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tier-max">Max / order</Label>
              <Input
                id="tier-max"
                type="number"
                min={form.minPerOrder}
                value={form.maxPerOrder}
                onChange={e => update({ maxPerOrder: Math.max(form.minPerOrder, parseInt(e.target.value) || 1) })}
              />
            </div>
          </div>

          {/* Sales Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tier-sales-start">Sales Start</Label>
              <Input
                id="tier-sales-start"
                type="datetime-local"
                value={form.salesStart || ''}
                onChange={e => update({ salesStart: e.target.value || undefined })}
              />
              <p className="text-[10px] text-muted-foreground">Leave blank for immediately</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tier-sales-end">Sales End</Label>
              <Input
                id="tier-sales-end"
                type="datetime-local"
                value={form.salesEnd || ''}
                onChange={e => update({ salesEnd: e.target.value || undefined })}
              />
              <p className="text-[10px] text-muted-foreground">Leave blank for no limit</p>
            </div>
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="tier-desc">Description</Label>
            <Textarea
              id="tier-desc"
              value={form.description}
              onChange={e => update({ description: e.target.value })}
              placeholder="What's included with this ticket..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSubmit}
          >
            {isEditing ? 'Save Changes' : 'Create Ticket'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Delete Confirmation ──

function DeleteTierDialog({
  open,
  onOpenChange,
  tier,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tier: TicketTier | null;
  onConfirm: () => void;
}) {
  if (!tier) return null;

  const hasSold = tier.sold > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Delete "{tier.name}"?</DialogTitle>
          <DialogDescription>
            {hasSold
              ? `${tier.sold} attendee${tier.sold !== 1 ? 's' : ''} already hold this ticket. This action cannot be undone.`
              : 'This ticket tier will be permanently removed.'}
          </DialogDescription>
        </DialogHeader>
        {hasSold && (
          <div className="bg-muted rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground flex items-start gap-2">
              <AlertTriangle className="size-3.5 flex-shrink-0 mt-0.5 text-primary" />
              <span>
                Existing ticket holders will need to be reassigned to another tier or refunded
                manually.
              </span>
            </p>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            <Trash2 className="size-3.5 mr-2" />
            Delete Tier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Tier Card ──

function TierCard({
  tier,
  onEdit,
  onDelete,
  onStatusChange,
  isPublished,
  isFreeLocked,
  isLastTier,
}: {
  tier: TicketTier;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: TicketTier['status']) => void;
  isPublished: boolean;
  isFreeLocked: boolean;
  isLastTier: boolean;
}) {
  const remaining = tier.quantity - tier.sold;
  const soldPercent = tier.quantity > 0 ? Math.round((tier.sold / tier.quantity) * 100) : 0;
  const statusCfg = STATUS_CONFIG[tier.status];
  const StatusIcon = statusCfg.icon;

  const canDelete = !(isPublished && isLastTier);

  return (
    <div
      className={cn(
        'bg-card p-5 rounded-xl border transition-colors relative group',
        tier.status === 'paused' ? 'border-border opacity-70' : 'border-border hover:border-primary/20'
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
            <Ticket className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-foreground truncate">{tier.name || 'Untitled'}</h3>
              {tier.visibility === 'hidden' && (
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-border text-muted-foreground">
                  <EyeOff className="size-2.5 mr-1" />
                  Hidden
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {tier.description || 'No description'}
            </p>
          </div>
        </div>

        {/* Price badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {tier.type === 'free' || tier.price === 0 ? (
            <Badge variant="secondary" className="text-sm px-2.5 py-0.5">
              Free
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-sm px-2.5 py-0.5 bg-primary/10 text-primary border-primary/20">
              ${tier.price.toFixed(2)}
            </Badge>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="bg-muted p-3 rounded-lg border border-border mb-4">
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Quantity</p>
            <p className="text-sm text-foreground">{tier.quantity}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Sold</p>
            <p className="text-sm text-foreground">{tier.sold}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Remaining</p>
            <p className={cn('text-sm', remaining <= 5 && remaining > 0 ? 'text-primary' : 'text-foreground')}>
              {remaining}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Status</p>
            <div className={cn('flex items-center justify-center gap-1 text-sm', statusCfg.className)}>
              <StatusIcon className="size-3" />
              <span className="text-xs">{statusCfg.label}</span>
            </div>
          </div>
        </div>

        {/* Sales progress bar */}
        {tier.quantity > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
              <span>{soldPercent}% sold</span>
              <span>{remaining} left</span>
            </div>
            <Progress
              value={soldPercent}
              className="h-1.5"
            />
          </div>
        )}
      </div>

      {/* Sales date range (if set) */}
      {(tier.salesStart || tier.salesEnd) && (
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3 px-1">
          <Calendar className="size-3 flex-shrink-0" />
          <span>
            {tier.salesStart
              ? new Date(tier.salesStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
              : 'Now'}
            {' — '}
            {tier.salesEnd
              ? new Date(tier.salesEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
              : 'No end'}
          </span>
        </div>
      )}

      {/* Per-order limits */}
      <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-4 px-1">
        <Users className="size-3 flex-shrink-0" />
        <span>
          {tier.minPerOrder}–{tier.maxPerOrder} per order
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 text-xs h-8 border-border hover:bg-accent text-foreground"
          onClick={onEdit}
        >
          <Edit className="size-3.5 mr-1.5" />
          Edit Details
        </Button>

        {/* Status toggle */}
        {isPublished && (
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 px-2.5 border-border"
            onClick={() => {
              const next = tier.status === 'active' ? 'paused' : 'active';
              onStatusChange(next);
              toast.success(`Ticket "${tier.name}" ${next === 'paused' ? 'paused' : 'resumed'}`);
            }}
          >
            {tier.status === 'active' ? (
              <Pause className="size-3.5" />
            ) : (
              <Play className="size-3.5" />
            )}
          </Button>
        )}

        {/* Delete */}
        <Button
          size="sm"
          variant="outline"
          className={cn(
            'text-xs h-8 w-8 px-0 border-border transition-colors',
            canDelete
              ? 'text-destructive hover:bg-destructive/5 hover:border-destructive/20'
              : 'text-muted-foreground cursor-not-allowed opacity-40'
          )}
          disabled={!canDelete}
          onClick={canDelete ? onDelete : undefined}
          title={!canDelete ? 'Cannot delete the last tier of a published event' : 'Delete tier'}
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ── Revenue Summary ──

function RevenueSummary({ tickets }: { tickets: TicketTier[] }) {
  const totalSold = tickets.reduce((s, t) => s + t.sold, 0);
  const totalCapacity = tickets.reduce((s, t) => s + t.quantity, 0);
  const totalRevenue = tickets.reduce((s, t) => s + t.sold * t.price, 0);
  const activeTiers = tickets.filter(t => t.status === 'active').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { label: 'Total Sold', value: totalSold.toString(), sub: `of ${totalCapacity}`, icon: Ticket },
        { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, sub: totalSold > 0 ? `~$${Math.round(totalRevenue / totalSold)}/avg` : 'No sales', icon: DollarSign },
        { label: 'Active Tiers', value: activeTiers.toString(), sub: `of ${tickets.length}`, icon: BarChart3 },
        { label: 'Sell-through', value: totalCapacity > 0 ? `${Math.round((totalSold / totalCapacity) * 100)}%` : '0%', sub: `${totalCapacity - totalSold} remaining`, icon: TrendingUp },
      ].map(stat => (
        <div key={stat.label} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            <stat.icon className="size-3.5 text-primary" />
          </div>
          <p className="text-xl text-foreground">{stat.value}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ── Pricing Mode Banner ──

function PricingBanner({
  pricingMode,
  pricingModeLocked,
  isDraft,
  tickets,
}: {
  pricingMode: EventPricingMode;
  pricingModeLocked: boolean;
  isDraft: boolean;
  tickets: TicketTier[];
}) {
  if (isDraft && tickets.length > 0) {
    const derived = derivePricingMode(tickets);
    return (
      <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <Info className="size-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground">
            This event will publish as: <strong className="text-primary">{derived === 'paid' ? 'Paid Event' : 'Free Event'}</strong>
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {derived === 'paid'
              ? 'At least one tier has a price above $0. Pricing mode will be locked after publishing.'
              : 'All tiers are free. After publishing as free, you won\'t be able to add paid tickets.'}
          </p>
        </div>
      </div>
    );
  }

  if (pricingModeLocked && pricingMode === 'free') {
    return (
      <div className="bg-muted rounded-xl border border-border p-4 flex items-center gap-3">
        <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
          <Lock className="size-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground flex items-center gap-2">
            Published as Free Event
            <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-border text-muted-foreground">
              <Lock className="size-2 mr-1" />
              Locked
            </Badge>
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Paid tickets cannot be added to a published free event. You can adjust the free tier's capacity.
          </p>
        </div>
      </div>
    );
  }

  if (pricingModeLocked && pricingMode === 'paid') {
    return (
      <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <DollarSign className="size-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground">
            Published as <strong className="text-primary">Paid Event</strong>
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            You can add new tiers, change prices (including to $0), and manage sales. Must keep at least one tier.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

// ── Main Component ──

export function TicketManager({
  tickets,
  onTicketsChange,
  discountCodes,
  onDiscountCodesChange,
  isDraft,
  isPublished,
  pricingMode,
  pricingModeLocked,
  eventCapacity,
  registeredCount,
  onLogChange,
  onRequestConfirmation,
  getCurrentUserRole,
  currentUser,
  createEditWarningConfig: createWarning,
}: TicketManagerProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<TicketTier | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingTier, setDeletingTier] = useState<TicketTier | null>(null);

  const canAddTickets = isDraft || (pricingModeLocked && pricingMode === 'paid');
  const canAddPaidTickets = !pricingModeLocked || pricingMode === 'paid';

  // ── Actions ──

  const handleAddTier = (type: 'free' | 'paid' = 'paid') => {
    const tier = createDefaultTier({
      type,
      price: type === 'free' ? 0 : 0,
      sortOrder: tickets.length,
    });
    setEditingTier(tier);
    setEditModalOpen(true);
  };

  const handleEditTier = (tier: TicketTier) => {
    setEditingTier({ ...tier });
    setEditModalOpen(true);
  };

  const handleSaveTier = (tier: TicketTier) => {
    // Auto-set type based on price
    if (tier.price > 0) tier.type = 'paid';
    if (tier.price === 0) tier.type = 'free';

    // Auto-detect sold-out
    if (tier.sold >= tier.quantity && tier.quantity > 0) {
      tier.status = 'sold-out';
    }

    const existingIndex = tickets.findIndex(t => t.id === tier.id);
    const isUpdate = existingIndex >= 0;
    const oldTier = isUpdate ? tickets[existingIndex] : null;

    const applyChange = () => {
      if (isUpdate) {
        const updated = [...tickets];
        updated[existingIndex] = tier;
        onTicketsChange(updated);
      } else {
        onTicketsChange([...tickets, tier]);
      }
    };

    // Published event — use confirmation dialog
    if (isPublished && onRequestConfirmation && createWarning) {
      const role = getCurrentUserRole?.() || 'host';
      const fieldLabel = isUpdate ? `Ticket "${tier.name}"` : `New Ticket "${tier.name}"`;
      const oldVal = isUpdate ? `$${oldTier?.price} / ${oldTier?.quantity} qty` : 'None';
      const newVal = `$${tier.price} / ${tier.quantity} qty`;
      const config = createWarning('ticket_price', oldVal, newVal, registeredCount);
      config.fieldLabel = fieldLabel;
      config.changedBy = {
        name: currentUser?.name || 'You',
        email: currentUser?.email || 'you@example.com',
        role,
      };

      // If price changed and has sold tickets, increase severity
      if (isUpdate && oldTier && oldTier.price !== tier.price && tier.sold > 0) {
        config.severity = 'high';
        config.fieldLabel = `${fieldLabel} — price change affects ${tier.sold} holder${tier.sold !== 1 ? 's' : ''}`;
      }

      onRequestConfirmation({
        config,
        onConfirm: (sendNotification: boolean) => {
          applyChange();
          onLogChange?.('ticket', fieldLabel, oldVal, newVal, sendNotification, role);
          toast.success(isUpdate ? 'Ticket updated & logged' : 'Ticket added & logged');
        },
      });
    } else {
      applyChange();
      if (isUpdate && onLogChange) {
        onLogChange('ticket', `Ticket "${tier.name}"`, `$${oldTier?.price}`, `$${tier.price}`, false);
      }
      toast.success(isUpdate ? 'Ticket tier updated' : 'Ticket tier created');
    }
  };

  const handleDeleteTier = (tier: TicketTier) => {
    // Published: can't delete the last tier
    if (isPublished && tickets.length <= 1) {
      toast.error('Cannot delete the last tier of a published event. Set price to $0 instead.');
      return;
    }

    setDeletingTier(tier);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!deletingTier) return;

    const apply = () => {
      onTicketsChange(tickets.filter(t => t.id !== deletingTier.id));
    };

    if (isPublished && onRequestConfirmation && createWarning) {
      const role = getCurrentUserRole?.() || 'host';
      const config = createWarning('ticket_delete', deletingTier.name, 'Deleted', registeredCount);
      config.fieldLabel = `Delete Ticket "${deletingTier.name}"`;
      config.severity = deletingTier.sold > 0 ? 'high' : 'medium';
      config.changedBy = {
        name: currentUser?.name || 'You',
        email: currentUser?.email || 'you@example.com',
        role,
      };

      onRequestConfirmation({
        config,
        onConfirm: (sendNotification: boolean) => {
          apply();
          onLogChange?.('ticket_delete', `Ticket "${deletingTier.name}"`, `$${deletingTier.price}`, 'Deleted', sendNotification, role);
          toast.success('Ticket deleted & logged');
        },
      });
    } else {
      apply();
      toast.success(`Ticket "${deletingTier.name}" deleted`);
    }
  };

  const handleStatusChange = (tierId: string, status: TicketTier['status']) => {
    const updated = tickets.map(t => (t.id === tierId ? { ...t, status } : t));
    onTicketsChange(updated);
  };

  const handleKeepFree = () => {
    const freeTier = createFreeAdmissionTier(eventCapacity);
    onTicketsChange([freeTier]);
    toast.success('Free admission tier created. Your event will publish as free.');
  };

  // ── Render: Empty State (Draft, no tickets) ──

  if (isDraft && tickets.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="size-16 bg-muted rounded-xl flex items-center justify-center mb-5">
            <Ticket className="size-8 text-muted-foreground/40" />
          </div>
          <h3 className="text-foreground mb-2">Pricing not configured</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-2">
            Currently set to: <span className="text-foreground">Free Event</span>
          </p>
          <p className="text-sm text-muted-foreground max-w-md mb-2">
            All events start as free. Add paid tickets to monetize, or keep it free.
          </p>
          <p className="text-xs text-muted-foreground max-w-md mb-6 bg-muted rounded-lg px-4 py-2.5 border border-border">
            <AlertTriangle className="size-3 inline mr-1.5 -mt-0.5" />
            Once published as free, you <strong>cannot</strong> add paid tickets later. Decide before publishing.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-lg border-border"
              onClick={handleKeepFree}
            >
              <CheckCircle className="size-3.5 mr-2" />
              Keep Free
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={() => handleAddTier('paid')}
            >
              <Plus className="size-3.5 mr-2" />
              Add Paid Tickets
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render: Published Free — Locked ──

  if (pricingModeLocked && pricingMode === 'free') {
    return (
      <div className="space-y-6">
        <PricingBanner
          pricingMode={pricingMode}
          pricingModeLocked={pricingModeLocked}
          isDraft={isDraft}
          tickets={tickets}
        />

        {/* Show existing free tiers */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-foreground text-lg">Free Admission</h2>
              <p className="text-sm text-muted-foreground">
                Manage capacity for your free event
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map(tier => (
              <TierCard
                key={tier.id}
                tier={tier}
                onEdit={() => handleEditTier(tier)}
                onDelete={() => {}}
                onStatusChange={status => handleStatusChange(tier.id, status)}
                isPublished={isPublished}
                isFreeLocked={true}
                isLastTier={tickets.length <= 1}
              />
            ))}
          </div>
        </div>

        {/* Attendee registration stats */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <Users className="size-4 text-primary" />
            <h3 className="text-sm text-foreground">Registration Summary</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl text-foreground">{registeredCount}</p>
              <p className="text-[10px] text-muted-foreground">Registered</p>
            </div>
            <div>
              <p className="text-xl text-foreground">{tickets.reduce((s, t) => s + t.quantity, 0)}</p>
              <p className="text-[10px] text-muted-foreground">Capacity</p>
            </div>
            <div>
              <p className="text-xl text-foreground">
                {Math.max(0, tickets.reduce((s, t) => s + t.quantity, 0) - registeredCount)}
              </p>
              <p className="text-[10px] text-muted-foreground">Available</p>
            </div>
          </div>
        </div>

        <TicketEditModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          ticket={editingTier}
          onSave={handleSaveTier}
          isPublished={isPublished}
          pricingMode={pricingMode}
          pricingModeLocked={pricingModeLocked}
          existingSold={editingTier ? editingTier.sold : 0}
        />
      </div>
    );
  }

  // ── Render: Full Ticket Manager (Draft with tickets, or Published Paid) ──

  const hasPaidTiers = tickets.some(t => t.price > 0);

  return (
    <div className="space-y-6">
      {/* Pricing banner */}
      <PricingBanner
        pricingMode={pricingMode}
        pricingModeLocked={pricingModeLocked}
        isDraft={isDraft}
        tickets={tickets}
      />

      {/* Revenue summary (only if there are sales) */}
      {tickets.some(t => t.sold > 0) && <RevenueSummary tickets={tickets} />}

      {/* Ticket Tiers */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-lg">Ticket Tiers</h2>
            <p className="text-sm text-muted-foreground">
              {isPublished
                ? 'Manage ticket types, pricing, and availability'
                : 'Set up ticket types and pricing for your event'}
            </p>
          </div>
          {canAddTickets && (
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={() => handleAddTier(canAddPaidTickets ? 'paid' : 'free')}
            >
              <Plus className="size-3.5 mr-2" />
              Add Ticket Type
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map(tier => (
            <TierCard
              key={tier.id}
              tier={tier}
              onEdit={() => handleEditTier(tier)}
              onDelete={() => handleDeleteTier(tier)}
              onStatusChange={status => handleStatusChange(tier.id, status)}
              isPublished={isPublished}
              isFreeLocked={pricingModeLocked && pricingMode === 'free'}
              isLastTier={tickets.length <= 1}
            />
          ))}

          {/* Add new tier placeholder card */}
          {canAddTickets && (
            <button
              onClick={() => handleAddTier(canAddPaidTickets ? 'paid' : 'free')}
              className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all group min-h-[200px]"
            >
              <div className="size-12 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Plus className="size-6 text-muted-foreground/40 group-hover:text-primary" />
              </div>
              <span className="text-sm">Create New Ticket Tier</span>
            </button>
          )}
        </div>
      </div>

      {/* Capacity alignment warning */}
      {(() => {
        const totalTierQty = tickets.reduce((s, t) => s + t.quantity, 0);
        if (eventCapacity > 0 && totalTierQty !== eventCapacity) {
          return (
            <div className="bg-muted rounded-xl border border-border p-4 flex items-start gap-3">
              <AlertTriangle className="size-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground">Capacity mismatch</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Event capacity is <strong>{eventCapacity}</strong> but total ticket quantity is{' '}
                  <strong>{totalTierQty}</strong>. These should ideally match.
                </p>
              </div>
            </div>
          );
        }
        return null;
      })()}

      {/* Discount Codes — only for paid events */}
      {hasPaidTiers && (
        <div className="space-y-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-foreground text-lg">Discount Codes</h2>
              <p className="text-sm text-muted-foreground">
                Create promo codes for marketing campaigns
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-border"
              onClick={() => {
                onDiscountCodesChange([
                  ...discountCodes,
                  {
                    id: Date.now().toString(),
                    code: '',
                    type: 'percent',
                    value: 10,
                    limit: 100,
                    used: 0,
                  },
                ]);
              }}
            >
              <Plus className="size-3.5 mr-2" />
              New Code
            </Button>
          </div>

          {discountCodes.length > 0 ? (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs text-muted-foreground uppercase tracking-wider">Code</th>
                    <th className="text-left px-6 py-3 text-xs text-muted-foreground uppercase tracking-wider">Discount</th>
                    <th className="text-left px-6 py-3 text-xs text-muted-foreground uppercase tracking-wider">Usage</th>
                    <th className="text-right px-6 py-3 text-xs text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {discountCodes.map(discount => (
                    <tr key={discount.id} className="hover:bg-accent">
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10 font-mono">
                          {discount.code || 'NEWCODE'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {discount.type === 'percent' ? `${discount.value}%` : `$${discount.value}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {discount.used} / {discount.limit}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs h-7 text-destructive hover:text-destructive"
                          onClick={() => onDiscountCodesChange(discountCodes.filter(d => d.id !== discount.id))}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-muted rounded-xl border border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">No discount codes yet</p>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <TicketEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        ticket={editingTier}
        onSave={handleSaveTier}
        isPublished={isPublished}
        pricingMode={pricingMode}
        pricingModeLocked={pricingModeLocked}
        existingSold={editingTier ? editingTier.sold : 0}
      />

      <DeleteTierDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        tier={deletingTier}
        onConfirm={confirmDelete}
      />
    </div>
  );
}