import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  UserPlus,
  Upload,
  Download,
  FileText,
  Check,
  AlertCircle,
  Users,
  Ticket,
  X,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// ═══════════════════════════════════════════════════════════════
//  ADD ATTENDEE MODAL
// ═══════════════════════════════════════════════════════════════

interface TicketTier {
  id: string;
  name: string;
  type: 'free' | 'paid';
  price: number;
  quantity: number;
  sold: number;
}

interface AddAttendeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tickets: TicketTier[];
  isPaidEvent: boolean;
  onConfirm: (attendee: {
    name: string;
    email: string;
    ticket: string;
    status: 'confirmed' | 'pending';
    isComped: boolean;
    sendInvite: boolean;
  }) => void;
}

export function AddAttendeeModal({ open, onOpenChange, tickets, isPaidEvent, onConfirm }: AddAttendeeModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]?.name || 'General Admission');
  const [status, setStatus] = useState<'confirmed' | 'pending'>('confirmed');
  const [isComped, setIsComped] = useState(false);
  const [sendInvite, setSendInvite] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email address';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onConfirm({
      name: name.trim(),
      email: email.trim(),
      ticket: selectedTicket,
      status,
      isComped,
      sendInvite,
    });

    // Reset
    setName('');
    setEmail('');
    setSelectedTicket(tickets[0]?.name || 'General Admission');
    setStatus('confirmed');
    setIsComped(false);
    setSendInvite(true);
    setErrors({});
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setErrors({});
      setName('');
      setEmail('');
    }
    onOpenChange(isOpen);
  };

  const selectedTicketData = tickets.find(t => t.name === selectedTicket);
  const ticketPrice = selectedTicketData?.price || 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="size-5" />
            Add Attendee
          </DialogTitle>
          <DialogDescription>
            Manually add someone to this event. They'll receive a confirmation email if enabled.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="attendee-name">Full Name *</Label>
            <Input
              id="attendee-name"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: '' })); }}
              className={errors.name ? 'border-red-300' : ''}
            />
            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="attendee-email">Email Address *</Label>
            <Input
              id="attendee-email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
              className={errors.email ? 'border-red-300' : ''}
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* Ticket Tier */}
          {tickets.length > 0 && (
            <div className="space-y-1.5">
              <Label>Ticket Tier</Label>
              <Select value={selectedTicket} onValueChange={setSelectedTicket}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tickets.map(t => (
                    <SelectItem key={t.id} value={t.name}>
                      <div className="flex items-center gap-2">
                        <span>{t.name}</span>
                        {t.type === 'paid' && <span className="text-muted-foreground">— ${t.price}</span>}
                        <span className="text-xs text-muted-foreground">({t.quantity - t.sold} left)</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Comp ticket toggle (for paid events) */}
          {isPaidEvent && ticketPrice > 0 && !isComped && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Comp this ticket</p>
                <p className="text-xs text-muted-foreground">Grant free access (no payment required)</p>
              </div>
              <Switch checked={isComped} onCheckedChange={setIsComped} />
            </div>
          )}
          {isComped && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
              <Check className="size-4 text-green-600" />
              <p className="text-sm text-green-700">Complimentary ticket — no charge</p>
            </div>
          )}

          {/* Status */}
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as 'confirmed' | 'pending')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed (immediate access)</SelectItem>
                <SelectItem value="pending">Pending (requires review)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Send invite toggle */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Send invitation email</p>
              <p className="text-xs text-muted-foreground">Notify them with event details & ticket</p>
            </div>
            <Switch checked={sendInvite} onCheckedChange={setSendInvite} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSubmit}>
            <UserPlus className="size-3.5 mr-2" />
            Add Attendee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ═══════════════════════════════════════════════════════════════
//  BULK IMPORT MODAL
// ═══════════════════════════════════════════════════════════════

interface BulkImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tickets: TicketTier[];
  onConfirm: (entries: Array<{ name: string; email: string }>, ticketName: string) => void;
}

export function BulkImportModal({ open, onOpenChange, tickets, onConfirm }: BulkImportModalProps) {
  const [step, setStep] = useState<'upload' | 'preview'>('upload');
  const [csvText, setCsvText] = useState('');
  const [parsed, setParsed] = useState<Array<{ name: string; email: string }>>([]);
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]?.name || 'General Admission');
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleParse = (text: string) => {
    const lines = text.trim().split('\n').filter(l => l.trim());
    const entries: Array<{ name: string; email: string }> = [];
    const errors: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip header row
      if (i === 0 && (line.toLowerCase().includes('name') && line.toLowerCase().includes('email'))) continue;
      
      const parts = line.split(',').map(p => p.trim().replace(/^["']|["']$/g, ''));
      if (parts.length < 2) {
        errors.push(`Line ${i + 1}: Not enough columns`);
        continue;
      }
      if (!parts[1].includes('@')) {
        errors.push(`Line ${i + 1}: Invalid email "${parts[1]}"`);
        continue;
      }
      entries.push({ name: parts[0], email: parts[1] });
    }

    setParsed(entries);
    setParseErrors(errors);

    if (entries.length > 0) {
      setStep('preview');
    } else {
      toast.error('No valid entries found. Check your CSV format.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setCsvText(text);
      handleParse(text);
    };
    reader.readAsText(file);
  };

  const handleConfirm = () => {
    onConfirm(parsed, selectedTicket);
    // Reset
    setStep('upload');
    setCsvText('');
    setParsed([]);
    setParseErrors([]);
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setStep('upload');
      setCsvText('');
      setParsed([]);
      setParseErrors([]);
    }
    onOpenChange(isOpen);
  };

  const downloadTemplate = () => {
    const csv = 'Name,Email\nJane Doe,jane@example.com\nJohn Smith,john@example.com';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendee-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Template downloaded');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="size-5" />
            Bulk Import Attendees
          </DialogTitle>
          <DialogDescription>
            Import multiple attendees at once from a CSV file or paste data directly.
          </DialogDescription>
        </DialogHeader>

        {step === 'upload' && (
          <div className="space-y-4 py-2">
            {/* File upload area */}
            <div
              className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="size-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">Upload CSV file</p>
              <p className="text-xs text-muted-foreground">Click to browse or drag & drop</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or paste directly</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Paste area */}
            <Textarea
              placeholder="Name, Email (one per line)&#10;Jane Doe, jane@example.com&#10;John Smith, john@example.com"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              rows={5}
              className="font-mono text-xs"
            />

            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" className="border-border" onClick={downloadTemplate}>
                <Download className="size-3.5 mr-2" />
                Download Template
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => handleParse(csvText)}
                disabled={!csvText.trim()}
              >
                Parse & Preview
              </Button>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-4 py-2">
            {/* Summary */}
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border border-border">
              <Users className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{parsed.length} attendees ready to import</p>
                {parseErrors.length > 0 && (
                  <p className="text-xs text-orange-600">{parseErrors.length} rows skipped due to errors</p>
                )}
              </div>
            </div>

            {/* Errors */}
            {parseErrors.length > 0 && (
              <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
                <div className="flex items-center gap-2 mb-1.5">
                  <AlertCircle className="size-4 text-orange-600" />
                  <p className="text-xs font-semibold text-orange-700">Skipped rows</p>
                </div>
                <div className="space-y-0.5">
                  {parseErrors.slice(0, 5).map((err, i) => (
                    <p key={i} className="text-xs text-orange-600">{err}</p>
                  ))}
                  {parseErrors.length > 5 && (
                    <p className="text-xs text-orange-600">...and {parseErrors.length - 5} more</p>
                  )}
                </div>
              </div>
            )}

            {/* Preview table */}
            <div className="border border-border rounded-lg overflow-hidden max-h-48 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border sticky top-0">
                  <tr>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {parsed.slice(0, 20).map((entry, i) => (
                    <tr key={i} className="hover:bg-accent">
                      <td className="px-4 py-2 text-foreground">{entry.name}</td>
                      <td className="px-4 py-2 text-muted-foreground">{entry.email}</td>
                    </tr>
                  ))}
                  {parsed.length > 20 && (
                    <tr>
                      <td colSpan={2} className="px-4 py-2 text-xs text-muted-foreground text-center">
                        ...and {parsed.length - 20} more
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Ticket assignment */}
            {tickets.length > 0 && (
              <div className="space-y-1.5">
                <Label>Assign ticket tier</Label>
                <Select value={selectedTicket} onValueChange={setSelectedTicket}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tickets.map(t => (
                      <SelectItem key={t.id} value={t.name}>
                        {t.name} {t.type === 'paid' ? `— $${t.price}` : '(Free)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {step === 'preview' && (
            <Button variant="outline" onClick={() => setStep('upload')}>Back</Button>
          )}
          <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
          {step === 'preview' && (
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleConfirm}>
              <Upload className="size-3.5 mr-2" />
              Import {parsed.length} Attendees
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
