import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Video, Users, Layers, ArrowLeft, ArrowRight, Check, Wand2, Globe, Lock, DollarSign, Repeat, Code, MonitorPlay, Coffee, Mic, GraduationCap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { TimeSelector, TimezoneSelector, calculateDuration } from './TimeSelector';
import { RecurrenceEditor, DEFAULT_RECURRENCE, configToRRule, type RecurrenceConfig } from './RecurrenceEditor';

type EventType = 'virtual' | 'in-person' | 'hybrid';
type ScheduleType = 'single' | 'multi-day' | 'recurring';
type VisibilityType = 'public' | 'private';
type AccessType = 'open' | 'waitlist' | 'screened' | 'paid';

// Template data (subset for quick-pick)
interface QuickTemplate {
  id: string;
  name: string;
  icon: any;
  duration: number; // minutes
  capacity: number;
  format: EventType;
  pricing: 'free' | 'paid';
  suggestedPrice?: number;
  category: string;
  description: string;
}

const QUICK_TEMPLATES: QuickTemplate[] = [
  { id: 'workshop', name: 'Workshop', icon: Code, duration: 120, capacity: 50, format: 'virtual', pricing: 'paid', suggestedPrice: 49, category: 'technology', description: 'Hands-on learning session with live exercises and Q&A' },
  { id: 'webinar', name: 'Webinar', icon: MonitorPlay, duration: 60, capacity: 500, format: 'virtual', pricing: 'free', category: 'business', description: 'Live presentation with audience interaction' },
  { id: 'meetup', name: 'Meetup', icon: Coffee, duration: 90, capacity: 30, format: 'in-person', pricing: 'free', category: 'networking', description: 'Casual gathering for networking and knowledge sharing' },
  { id: 'conference', name: 'Conference', icon: Mic, duration: 480, capacity: 300, format: 'hybrid', pricing: 'paid', suggestedPrice: 99, category: 'business', description: 'Multi-session event with speakers and networking' },
  { id: 'course', name: 'Course Session', icon: GraduationCap, duration: 90, capacity: 30, format: 'virtual', pricing: 'paid', suggestedPrice: 29, category: 'education', description: 'Structured learning session as part of a curriculum' },
  { id: 'networking', name: 'Networking', icon: Users, duration: 60, capacity: 100, format: 'in-person', pricing: 'free', category: 'networking', description: 'Professional networking event with icebreakers' },
];

const CATEGORIES = [
  'Technology', 'Design', 'Business', 'Marketing', 'Education', 
  'Health', 'Finance', 'Science', 'Arts', 'Networking',
];

export interface EventCreationData {
  title: string;
  description: string;
  category: string;
  type: EventType;
  date: string;
  time: string;
  endTime: string;
  endDate?: string;
  location?: string;
  capacity?: number;
  timezone: string;
  isMultiDay: boolean;
  isRecurring: boolean;
  recurrenceRule?: string;
  scheduleType: ScheduleType;
  visibility: VisibilityType;
  accessType: AccessType;
  isPaid: boolean;
  price?: number;
  templateId?: string;
  communityId?: string;
  communityName?: string;
  duplicatedFrom?: string;
}

interface EventCreationStepperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EventCreationData) => void;
  onSwitchToAI?: () => void;
  // Pre-fill support (duplicate, community context)
  prefill?: Partial<EventCreationData>;
  communityContext?: { id: string; name: string };
}

export function EventCreationStepper({ open, onOpenChange, onSubmit, onSwitchToAI, prefill, communityContext }: EventCreationStepperProps) {
  const [step, setStep] = useState(1);

  // Step 1 state
  const [title, setTitle] = useState(prefill?.title || '');
  const [description, setDescription] = useState(prefill?.description || '');
  const [category, setCategory] = useState(prefill?.category || '');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(prefill?.templateId || null);

  // Step 2 state
  const [scheduleType, setScheduleType] = useState<ScheduleType>(
    prefill?.isRecurring ? 'recurring' : prefill?.isMultiDay ? 'multi-day' : 'single'
  );
  const [date, setDate] = useState(prefill?.date || '');
  const [time, setTime] = useState(prefill?.time || '10:00');
  const [endTime, setEndTime] = useState(prefill?.endTime || '11:00');
  const [endDate, setEndDate] = useState(prefill?.endDate || '');
  const [eventType, setEventType] = useState<EventType>(prefill?.type || 'virtual');
  const [location, setLocation] = useState(prefill?.location || '');
  const [timezone, setTimezone] = useState(prefill?.timezone || 'America/New_York');
  const [recurrence, setRecurrence] = useState<RecurrenceConfig>(DEFAULT_RECURRENCE);

  // Step 3 state
  const [capacity, setCapacity] = useState(prefill?.capacity?.toString() || '');
  const [visibility, setVisibility] = useState<VisibilityType>('public');
  const [accessType, setAccessType] = useState<AccessType>('open');
  const [isPaid, setIsPaid] = useState(prefill?.isPaid || false);
  const [price, setPrice] = useState(prefill?.price?.toString() || '');

  // Sync prefill when it changes (e.g., different duplicate target)
  useEffect(() => {
    if (open && prefill) {
      setStep(1);
      setTitle(prefill.title || '');
      setDescription(prefill.description || '');
      setCategory(prefill.category || '');
      setSelectedTemplate(prefill.templateId || null);
      setEventType(prefill.type || 'virtual');
      setDate(prefill.date || '');
      setTime(prefill.time || '10:00');
      setEndTime(prefill.endTime || '11:00');
      setEndDate(prefill.endDate || '');
      setLocation(prefill.location || '');
      setTimezone(prefill.timezone || 'America/New_York');
      setCapacity(prefill.capacity?.toString() || '');
      setIsPaid(prefill.isPaid || false);
      setPrice(prefill.price?.toString() || '');
      setScheduleType(prefill.isRecurring ? 'recurring' : prefill.isMultiDay ? 'multi-day' : 'single');
    }
  }, [open, prefill]);

  const needsLocation = eventType === 'in-person' || eventType === 'hybrid';
  const duration = calculateDuration(time, endTime);

  // Validation per step
  const isStep1Valid = title.trim().length > 0;
  const isStep2Valid = date && time && (!needsLocation || location.trim());
  const isStep3Valid = true; // step 3 has no required fields

  const handleTemplateSelect = (template: QuickTemplate) => {
    if (selectedTemplate === template.id) {
      setSelectedTemplate(null);
      return;
    }
    setSelectedTemplate(template.id);
    if (!title) setTitle('');
    if (!description) setDescription(template.description);
    setCategory(template.category);
    setEventType(template.format);
    if (!capacity) setCapacity(template.capacity.toString());
    setIsPaid(template.pricing === 'paid');
    if (template.suggestedPrice) setPrice(template.suggestedPrice.toString());
    // Set end time based on template duration
    if (time) {
      const [h, m] = time.split(':').map(Number);
      const totalMin = h * 60 + m + template.duration;
      const eh = Math.floor(totalMin / 60) % 24;
      const em = totalMin % 60;
      setEndTime(`${eh.toString().padStart(2, '0')}:${em.toString().padStart(2, '0')}`);
    }
  };

  const handleSubmit = () => {
    const data: EventCreationData = {
      title: title.trim(),
      description: description.trim(),
      category,
      type: eventType,
      date,
      time,
      endTime,
      endDate: scheduleType === 'multi-day' ? endDate : undefined,
      location: needsLocation ? location.trim() : 'Virtual Event',
      capacity: capacity ? parseInt(capacity, 10) : undefined,
      timezone,
      isMultiDay: scheduleType === 'multi-day',
      isRecurring: scheduleType === 'recurring',
      recurrenceRule: scheduleType === 'recurring' ? configToRRule(recurrence) : undefined,
      scheduleType,
      visibility,
      accessType: isPaid ? 'paid' : accessType,
      isPaid,
      price: isPaid && price ? parseFloat(price) : undefined,
      templateId: selectedTemplate || undefined,
      communityId: communityContext?.id,
      communityName: communityContext?.name,
      duplicatedFrom: prefill?.duplicatedFrom,
    };
    onSubmit(data);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setTitle('');
    setDescription('');
    setCategory('');
    setSelectedTemplate(null);
    setDate('');
    setTime('10:00');
    setEndTime('11:00');
    setEndDate('');
    setEventType('virtual');
    setLocation('');
    setTimezone('America/New_York');
    setRecurrence(DEFAULT_RECURRENCE);
    setCapacity('');
    setVisibility('public');
    setAccessType('open');
    setIsPaid(false);
    setPrice('');
    setScheduleType('single');
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] gap-0 p-0 overflow-hidden max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-foreground">
                {prefill?.duplicatedFrom ? 'Duplicate Event' : 'Create Event'}
              </DialogTitle>
              <DialogDescription className="mt-1">
                {step === 1 ? 'Name and describe your event' : step === 2 ? 'Set the timeline and format' : 'Configure access and pricing'}
              </DialogDescription>
            </div>
            {onSwitchToAI && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { handleOpenChange(false); onSwitchToAI(); }}
                className="text-primary hover:text-primary/80 hover:bg-primary/5 gap-1.5"
              >
                <Wand2 className="size-3.5" />
                Use AI instead
              </Button>
            )}
          </div>

          {/* Community context banner */}
          {communityContext && (
            <div className="mt-3 px-3 py-2 bg-primary/5 border border-primary/10 rounded-lg flex items-center gap-2">
              <Users className="size-4 text-primary" />
              <span className="text-sm text-foreground">Creating for: <span className="font-medium">{communityContext.name}</span></span>
            </div>
          )}

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => s < step && setStep(s)}
                  disabled={s > step}
                  className={`size-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    s === step ? 'bg-primary text-primary-foreground'
                    : s < step ? 'bg-primary/20 text-primary cursor-pointer hover:bg-primary/30'
                    : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s < step ? <Check className="size-3.5" /> : s}
                </button>
                <span className={`text-xs hidden sm:block ${s === step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'What' : s === 2 ? 'When' : 'How'}
                </span>
                {s < 3 && <div className={`flex-1 h-px ${s < step ? 'bg-primary/30' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto max-h-[calc(90vh-220px)]">
          {/* ═══ STEP 1: WHAT ═══ */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Template quick-pick */}
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Start from a template</label>
                <div className="grid grid-cols-3 gap-2">
                  {QUICK_TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleTemplateSelect(t)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        selectedTemplate === t.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-input'
                      }`}
                    >
                      <div className="size-7 rounded-md bg-primary/10 flex items-center justify-center mb-1.5">
                        <t.icon className={`size-3.5 ${selectedTemplate === t.id ? 'text-primary' : 'text-primary/70'}`} />
                      </div>
                      <p className={`text-xs ${selectedTemplate === t.id ? 'text-primary font-medium' : 'text-foreground'}`}>{t.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{t.duration >= 60 ? `${Math.floor(t.duration / 60)}h${t.duration % 60 ? ` ${t.duration % 60}m` : ''}` : `${t.duration}m`} · {t.pricing === 'free' ? 'Free' : `$${t.suggestedPrice}`}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or start from scratch</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Event name */}
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                  Event name <span className="text-destructive">*</span>
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Product Launch Meetup"
                  className="shadow-none"
                  autoFocus
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this event about? (optional)"
                  className="min-h-[80px] resize-none shadow-none"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">Category</label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(category === cat.toLowerCase() ? '' : cat.toLowerCase())}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-colors cursor-pointer ${
                        category === cat.toLowerCase()
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-input hover:text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══ STEP 2: WHEN ═══ */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Schedule type toggle */}
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Event type</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: 'single' as const, label: 'Single Event', desc: 'One-time event' },
                    { value: 'multi-day' as const, label: 'Multi-Day', desc: 'Spans multiple days' },
                    { value: 'recurring' as const, label: 'Recurring', desc: 'Repeats on a schedule' },
                  ]).map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setScheduleType(opt.value)}
                      className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                        scheduleType === opt.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-input'
                      }`}
                    >
                      <p className={`text-sm ${scheduleType === opt.value ? 'text-primary font-medium' : 'text-foreground'}`}>{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className={scheduleType === 'multi-day' ? 'grid grid-cols-2 gap-3' : ''}>
                <div className="space-y-1.5">
                  <label className="text-sm text-muted-foreground">
                    {scheduleType === 'multi-day' ? 'Start date' : 'Date'} <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-9 shadow-none"
                    />
                  </div>
                </div>
                {scheduleType === 'multi-day' && (
                  <div className="space-y-1.5">
                    <label className="text-sm text-muted-foreground">
                      End date <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={date}
                        className="pl-9 shadow-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">
                  Time <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <TimeSelector value={time} onChange={setTime} placeholder="Start time" />
                  <TimeSelector value={endTime} onChange={setEndTime} placeholder="End time" />
                </div>
                {duration && (
                  <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                    <Clock className="size-3" />
                    Duration: <span className="font-medium text-foreground">{duration}</span>
                  </p>
                )}
              </div>

              {/* Timezone */}
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">Timezone</label>
                <TimezoneSelector value={timezone} onChange={setTimezone} />
              </div>

              {/* Recurrence editor */}
              {scheduleType === 'recurring' && (
                <div className="border border-border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Repeat className="size-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Recurrence Pattern</span>
                  </div>
                  <RecurrenceEditor
                    config={recurrence}
                    onChange={setRecurrence}
                    startDate={date}
                  />
                </div>
              )}

              {/* Format */}
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: 'virtual' as const, label: 'Virtual', icon: <Video className="size-4" /> },
                    { value: 'in-person' as const, label: 'In-Person', icon: <MapPin className="size-4" /> },
                    { value: 'hybrid' as const, label: 'Hybrid', icon: <Layers className="size-4" /> },
                  ]).map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setEventType(opt.value)}
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-colors cursor-pointer ${
                        eventType === opt.value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border bg-card text-muted-foreground hover:border-input hover:text-foreground'
                      }`}
                    >
                      {opt.icon}
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location (conditional) */}
              {needsLocation && (
                <div className="space-y-1.5">
                  <label className="text-sm text-muted-foreground">
                    Location <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Venue name or address"
                      className="pl-9 shadow-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ STEP 3: HOW ═══ */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Capacity */}
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">Capacity</label>
                <div className="relative w-44">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="Unlimited"
                    min={1}
                    className="pl-9 shadow-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Leave empty for unlimited</p>
              </div>

              {/* Visibility */}
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">Visibility</label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: 'public' as const, label: 'Public', desc: 'Visible on explore page', icon: <Globe className="size-4" /> },
                    { value: 'private' as const, label: 'Private', desc: 'Invite-only, hidden from explore', icon: <Lock className="size-4" /> },
                  ]).map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setVisibility(opt.value)}
                      className={`p-3 rounded-lg border text-left transition-colors cursor-pointer flex items-start gap-3 ${
                        visibility === opt.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-input'
                      }`}
                    >
                      <span className={visibility === opt.value ? 'text-primary' : 'text-muted-foreground'}>{opt.icon}</span>
                      <div>
                        <p className={`text-sm ${visibility === opt.value ? 'text-primary font-medium' : 'text-foreground'}`}>{opt.label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Access type */}
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">Registration access</label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: 'open' as const, label: 'Open', desc: 'Anyone can register' },
                    { value: 'waitlist' as const, label: 'Waitlist', desc: 'Register then get approved' },
                    { value: 'screened' as const, label: 'Application', desc: 'Must apply and be accepted' },
                  ]).map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAccessType(opt.value)}
                      className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                        accessType === opt.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-input'
                      }`}
                    >
                      <p className={`text-sm ${accessType === opt.value ? 'text-primary font-medium' : 'text-foreground'}`}>{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-3">
                <label className="text-sm text-muted-foreground">Pricing</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPaid(false)}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                      !isPaid ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-input'
                    }`}
                  >
                    <p className={`text-sm ${!isPaid ? 'text-primary font-medium' : 'text-foreground'}`}>Free</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">No charge to attend</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPaid(true)}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                      isPaid ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-input'
                    }`}
                  >
                    <p className={`text-sm ${isPaid ? 'text-primary font-medium' : 'text-foreground'}`}>Paid</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Set a ticket price</p>
                  </button>
                </div>
                {isPaid && (
                  <div className="relative w-40">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      min={0}
                      step={0.01}
                      className="pl-9 shadow-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">You can add multiple tiers in the builder</p>
                  </div>
                )}
              </div>

              {/* Summary card */}
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Summary</p>
                <div className="space-y-1.5">
                  {title && <p className="text-sm text-foreground font-medium">{title}</p>}
                  {date && <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="size-3" />{new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>}
                  {time && <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="size-3" />{calculateDuration(time, endTime) ? `${formatTime12(time)} - ${formatTime12(endTime)} (${calculateDuration(time, endTime)})` : formatTime12(time)}</p>}
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {eventType === 'virtual' ? <Video className="size-3" /> : eventType === 'in-person' ? <MapPin className="size-3" /> : <Layers className="size-3" />}
                    {eventType === 'in-person' ? 'In-Person' : eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                    {needsLocation && location ? ` · ${location}` : ''}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[10px] shadow-none">{visibility}</Badge>
                    <Badge variant="outline" className="text-[10px] shadow-none">{isPaid ? `$${price || '0'}` : 'Free'}</Badge>
                    {capacity && <Badge variant="outline" className="text-[10px] shadow-none">{capacity} spots</Badge>}
                    {scheduleType === 'recurring' && <Badge variant="outline" className="text-[10px] shadow-none">Recurring</Badge>}
                    {scheduleType === 'multi-day' && <Badge variant="outline" className="text-[10px] shadow-none">Multi-day</Badge>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between">
          <div>
            {step > 1 && (
              <Button variant="ghost" onClick={() => setStep(step - 1)} className="shadow-none gap-1.5">
                <ArrowLeft className="size-3.5" />
                Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleOpenChange(false)} className="shadow-none">
              Cancel
            </Button>
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                className="shadow-none gap-1.5"
              >
                Next
                <ArrowRight className="size-3.5" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="shadow-none">
                Create Event
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function formatTime12(time: string): string {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const ampm = h < 12 ? 'AM' : 'PM';
  return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
}