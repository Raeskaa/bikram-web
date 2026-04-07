import { useState } from 'react';
import { Check, Calendar, MapPin, Video, Users as UsersIcon, RotateCcw, Wand2, ThumbsUp, ThumbsDown, X, ArrowRight, MessageSquare, Clock, Code, Coffee, Mic, GraduationCap, Globe, Lock, DollarSign, Repeat, Layers } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { AICreditsIndicator } from './AICreditsIndicator';
import { TimeSelector, TimezoneSelector, calculateDuration } from './events/TimeSelector';
import { RecurrenceEditor, DEFAULT_RECURRENCE, configToRRule, type RecurrenceConfig } from './events/RecurrenceEditor';

interface EventData {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  endTime?: string;
  endDate?: string;
  location?: string;
  capacity?: number;
  type?: 'virtual' | 'in-person' | 'hybrid';
  category?: string;
  timezone?: string;
  scheduleType?: 'single' | 'multi-day' | 'recurring';
  isMultiDay?: boolean;
  isRecurring?: boolean;
  recurrenceRule?: string;
  visibility?: 'public' | 'private';
  accessType?: 'open' | 'waitlist' | 'screened';
  isPaid?: boolean;
  price?: number;
}

interface EventSetupStepsProps {
  interactiveType: 'event-title' | 'event-details' | 'event-description';
  eventData?: Partial<EventData>;
  onSubmit: (data: Partial<EventData>) => void;
}

// Suggestion pools for cycling through batches
const NAME_SUGGESTION_POOLS = [
  [
    'Design Leadership Summit 2026',
    'Product Strategy Masterclass',
    'Growth & Innovation Workshop',
    'Creator Economy Deep Dive',
    'Tech Founders Roundtable',
  ],
  [
    'Future of Work Conference',
    'Startup Pitch & Learn Night',
    'Data-Driven Marketing Lab',
    'UX Research Bootcamp',
    'Engineering Leadership Forum',
  ],
  [
    'AI Builders Collective',
    'Brand Strategy Intensive',
    'Revenue Growth Summit',
    'Design Systems Workshop',
    'Product-Led Growth Meetup',
  ],
];

const DESCRIPTION_SUGGESTION_POOLS = [
  [
    'Join us for an in-depth session covering the latest strategies and techniques. This event brings together practitioners and thought leaders for hands-on learning, live demos, and candid conversations about what actually works.',
    'A focused, no-fluff session designed for people who want real, actionable takeaways. Expect structured exercises, peer breakout discussions, and a closing Q&A with the host.',
    'Whether you are just getting started or looking to refine your approach, this event offers a clear framework, concrete examples, and a collaborative environment to learn alongside peers.',
    'An exclusive gathering for professionals ready to level up. Featuring case studies from industry leaders, interactive workshops, and dedicated networking time to forge meaningful connections.',
    'Dive deep into the topics that matter most. This event combines expert-led sessions with hands-on activities, giving you both the theory and the practical tools to drive real results.',
  ],
  [
    'A high-energy event designed to spark new ideas and accelerate your growth. Connect with like-minded professionals, learn from real-world case studies, and leave with a concrete action plan.',
    'This immersive experience goes beyond surface-level advice. Through guided exercises, live feedback sessions, and peer collaboration, you will gain the clarity and confidence to take your next big step.',
    'Built for doers, not just listeners. This event is structured around interactive problem-solving, group challenges, and expert mentorship to help you turn knowledge into action.',
    'Join a curated group of professionals for a day of focused learning and meaningful connection. Every session is designed to deliver practical value you can apply immediately.',
    'From keynote insights to breakout workshops, this event covers the full spectrum. Walk away with new frameworks, expanded networks, and the momentum to make your next move.',
  ],
];

// Thumbs-down feedback reasons
const FEEDBACK_REASONS = [
  'Too generic',
  'Too long',
  'Wrong tone',
  'Not relevant',
  'Too formal',
  'Too casual',
];

// Per-suggestion feedback state
interface SuggestionFeedback {
  type: 'up' | 'down';
  reason?: string;
  comment?: string;
}

// Reusable feedback card component for thumbs-down
function FeedbackCard({ 
  onSubmit, 
  onDismiss 
}: { 
  onSubmit: (reason: string, comment: string) => void; 
  onDismiss: () => void; 
}) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  return (
    <div className="mt-2 ml-3 p-4 rounded-lg border border-border bg-muted/50">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <MessageSquare className="size-3" />
          What could be better?
        </p>
        <button
          onClick={onDismiss}
          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="size-3" />
        </button>
      </div>

      {/* Quick-select reason chips */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {FEEDBACK_REASONS.map((reason) => (
          <button
            key={reason}
            onClick={() => setSelectedReason(selectedReason === reason ? null : reason)}
            className={`px-2.5 py-1 rounded-full text-xs border transition-colors cursor-pointer ${
              selectedReason === reason
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground'
            }`}
          >
            {reason}
          </button>
        ))}
      </div>

      {/* Free-text comment */}
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell us more (optional)..."
        rows={2}
        className="resize-none text-xs mb-3"
      />

      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-muted-foreground"
          onClick={onDismiss}
        >
          Skip
        </Button>
        <Button
          size="sm"
          className="h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => onSubmit(selectedReason || '', comment)}
          disabled={!selectedReason && !comment.trim()}
        >
          Submit feedback
        </Button>
      </div>
    </div>
  );
}

export function EventSetupSteps({ 
  interactiveType, 
  eventData, 
  onSubmit 
}: EventSetupStepsProps) {
  // Step 1 state
  const [customName, setCustomName] = useState('');
  const [nameBatchIndex, setNameBatchIndex] = useState(0);
  const [nameFeedback, setNameFeedback] = useState<Record<string, SuggestionFeedback>>({});
  const [nameDownFeedbackOpen, setNameDownFeedbackOpen] = useState<string | null>(null);
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);

  // Step 2 state
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState<'virtual' | 'in-person' | 'hybrid'>('in-person');
  const [timezone, setTimezone] = useState('UTC');
  const [scheduleType, setScheduleType] = useState<'single' | 'multi-day' | 'recurring'>('single');
  const [isMultiDay, setIsMultiDay] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceRule, setRecurrenceRule] = useState('');
  const [recurrenceConfig, setRecurrenceConfig] = useState<RecurrenceConfig>(DEFAULT_RECURRENCE);
  const [endDate, setEndDate] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [accessType, setAccessType] = useState<'open' | 'waitlist' | 'screened'>('open');
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState('');

  // Step 3 state
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('100');
  const [descBatchIndex, setDescBatchIndex] = useState(0);
  const [descFeedback, setDescFeedback] = useState<Record<number, SuggestionFeedback>>({});
  const [descDownFeedbackOpen, setDescDownFeedbackOpen] = useState<number | null>(null);
  const [showDescSuggestions, setShowDescSuggestions] = useState(false);

  // Feedback helpers
  const getLikedCount = (feedback: Record<string | number, SuggestionFeedback>) => 
    Object.values(feedback).filter(f => f.type === 'up').length;
  const getDislikedCount = (feedback: Record<string | number, SuggestionFeedback>) => 
    Object.values(feedback).filter(f => f.type === 'down').length;

  // ─── Step 1: Event Name ─────────────────────────────────────
  if (interactiveType === 'event-title') {
    const currentNames = NAME_SUGGESTION_POOLS[nameBatchIndex % NAME_SUGGESTION_POOLS.length];
    const creditsUsed = 3 + nameBatchIndex;

    const handleSubmitName = () => {
      if (customName.trim()) {
        onSubmit({ title: customName.trim() });
      }
    };

    const handleSelectSuggestion = (name: string) => {
      setCustomName(name);
    };

    const handleNameFeedback = (name: string, type: 'up' | 'down') => {
      if (type === 'down') {
        setNameDownFeedbackOpen(nameDownFeedbackOpen === name ? null : name);
      } else {
        setNameDownFeedbackOpen(null);
      }
      setNameFeedback(prev => ({
        ...prev,
        [name]: { type }
      }));
    };

    const handleNameDownSubmit = (name: string, reason: string, comment: string) => {
      setNameFeedback(prev => ({
        ...prev,
        [name]: { type: 'down', reason, comment }
      }));
      setNameDownFeedbackOpen(null);
    };

    const handleMoreSuggestions = () => {
      setNameBatchIndex(prev => prev + 1);
      setNameDownFeedbackOpen(null);
    };

    const handleNameInput = (value: string) => {
      setCustomName(value);
      // Show suggestions after user starts typing (at least 1 character)
      if (value.trim().length > 0 && !showNameSuggestions) {
        setShowNameSuggestions(true);
      }
    };

    const likedCount = getLikedCount(nameFeedback);
    const dislikedCount = getDislikedCount(nameFeedback);

    return (
      <div className="mt-6 space-y-5">
        {/* ── Input Area (top) ── */}
        <div>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
            <Wand2 className="size-4 text-primary" />
            Name your event
          </p>
          <div className="flex gap-2">
            <Input
              value={customName}
              onChange={(e) => handleNameInput(e.target.value)}
              placeholder="Start typing to see AI suggestions..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customName.trim()) {
                  handleSubmitName();
                }
              }}
            />
            <Button
              onClick={handleSubmitName}
              disabled={!customName.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
            >
              Continue
              <ArrowRight className="size-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        {/* ── Template quick-picks (shown before typing) ── */}
        {!showNameSuggestions && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or start from a template</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'Workshop', Icon: Code, hint: '2h hands-on session' },
                { name: 'Webinar', Icon: Video, hint: '1h live presentation' },
                { name: 'Meetup', Icon: Coffee, hint: '90m casual networking' },
                { name: 'Conference', Icon: Mic, hint: 'Multi-session event' },
                { name: 'Course Session', Icon: GraduationCap, hint: '90m structured learning' },
                { name: 'Networking', Icon: UsersIcon, hint: '1h professional mixer' },
              ].map(t => (
                <button
                  key={t.name}
                  onClick={() => {
                    setCustomName(`My ${t.name}`);
                    setShowNameSuggestions(true);
                  }}
                  className="p-2.5 rounded-lg border border-border bg-card hover:border-primary/30 transition-all cursor-pointer text-left"
                >
                  <div className="size-6 rounded-md bg-primary/10 flex items-center justify-center mb-1">
                    <t.Icon className="size-3 text-primary" />
                  </div>
                  <p className="text-xs text-foreground">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.hint}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Suggestions (only after typing) ── */}
        {showNameSuggestions && (
          <>
            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or pick a suggestion</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* AI Suggestions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wand2 className="size-3.5 text-primary" />
                  <span className="text-sm text-muted-foreground">AI Suggestions</span>
                  <AICreditsIndicator credits={creditsUsed} />
                </div>
                <button
                  onClick={handleMoreSuggestions}
                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  <span>More</span>
                  <span className="text-muted-foreground">(1 credit)</span>
                </button>
              </div>

              <div className="space-y-2">
                {currentNames.map((name) => {
                  const feedback = nameFeedback[name];
                  const isSelected = customName === name;
                  const isDownOpen = nameDownFeedbackOpen === name;

                  return (
                    <div key={name}>
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-muted-foreground/30 bg-card'
                        }`}
                      >
                        {/* Suggestion text — click to fill input */}
                        <button
                          onClick={() => handleSelectSuggestion(name)}
                          className="flex-1 text-left min-w-0 cursor-pointer"
                        >
                          <span className="text-sm text-foreground">{name}</span>
                        </button>

                        {/* Feedback buttons */}
                        <div className="flex items-center gap-0.5 shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleNameFeedback(name, 'up'); }}
                            className={`p-1.5 rounded transition-colors cursor-pointer ${
                              feedback?.type === 'up'
                                ? 'text-green-600 bg-green-600/10'
                                : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted'
                            }`}
                            title="More like this"
                          >
                            <ThumbsUp className="size-3" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleNameFeedback(name, 'down'); }}
                            className={`p-1.5 rounded transition-colors cursor-pointer ${
                              feedback?.type === 'down'
                                ? 'text-red-600 bg-red-600/10'
                                : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted'
                            }`}
                            title="Not this direction"
                          >
                            <ThumbsDown className="size-3" />
                          </button>
                        </div>
                      </div>

                      {/* Thumbs-down feedback card */}
                      {isDownOpen && (
                        <FeedbackCard
                          onSubmit={(reason, comment) => handleNameDownSubmit(name, reason, comment)}
                          onDismiss={() => setNameDownFeedbackOpen(null)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Feedback summary */}
              {(likedCount > 0 || dislikedCount > 0) && (
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                  {likedCount > 0 && (
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="size-2.5 text-green-600" />
                      {likedCount} liked
                    </span>
                  )}
                  {likedCount > 0 && dislikedCount > 0 && <span>·</span>}
                  {dislikedCount > 0 && (
                    <span className="flex items-center gap-1">
                      <ThumbsDown className="size-2.5 text-red-600" />
                      {dislikedCount} disliked
                    </span>
                  )}
                  <span>— suggestions adapting</span>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  // ─── Step 2: Event Details ─────────────────────────────────────
  if (interactiveType === 'event-details') {
    const handleSubmitDetails = () => {
      if (date && time) {
        onSubmit({ 
          date, 
          time,
          endTime: endTime || undefined,
          location: eventType === 'virtual' ? 'Virtual Event' : location,
          type: eventType,
          timezone,
          scheduleType,
          isMultiDay,
          isRecurring,
          recurrenceRule: recurrenceRule || undefined,
          endDate: endDate || undefined,
          visibility,
          accessType,
          isPaid,
          price: price ? parseFloat(price) : undefined
        });
      }
    };

    return (
      <div className="mt-6 space-y-4">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Wand2 className="size-4 text-primary" />
            How will attendees join?
          </p>

          {/* Format */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Format</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: 'virtual' as const, label: 'Virtual', Icon: Video },
                { value: 'in-person' as const, label: 'In-Person', Icon: MapPin },
                { value: 'hybrid' as const, label: 'Hybrid', Icon: Layers },
              ]).map(({ value, label, Icon }) => (
                <button
                  key={value}
                  onClick={() => setEventType(value)}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-colors cursor-pointer ${
                    eventType === value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-input hover:text-foreground'
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule type */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Schedule</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: 'single' as const, label: 'Single', desc: 'One-time event' },
                { value: 'multi-day' as const, label: 'Multi-day', desc: 'Spans multiple days' },
                { value: 'recurring' as const, label: 'Recurring', desc: 'Repeats on a schedule' },
              ]).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setScheduleType(opt.value);
                    setIsMultiDay(opt.value === 'multi-day');
                    setIsRecurring(opt.value === 'recurring');
                  }}
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
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9"
                />
              </div>
            </div>
            {scheduleType === 'multi-day' && (
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">
                  End date <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={date}
                    className="w-full pl-9"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Time selectors */}
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">
              Time <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <TimeSelector value={time} onChange={setTime} placeholder="Start time" />
              <TimeSelector value={endTime} onChange={setEndTime} placeholder="End time" />
            </div>
            {time && endTime && calculateDuration(time, endTime) && (
              <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                <Clock className="size-3" />
                Duration: <span className="font-medium text-foreground">{calculateDuration(time, endTime)}</span>
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
                config={recurrenceConfig}
                onChange={(config) => {
                  setRecurrenceConfig(config);
                  setRecurrenceRule(configToRRule(config));
                }}
                startDate={date}
              />
            </div>
          )}

          {/* Location (only for in-person or hybrid) */}
          {eventType !== 'virtual' && (
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">Location <span className="text-destructive">*</span></label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., San Francisco Convention Center"
                className="w-full"
              />
            </div>
          )}

          {eventType === 'virtual' && (
            <div className="p-3 bg-muted border border-border rounded-lg">
              <p className="text-sm text-muted-foreground">
                <Video className="size-4 inline mr-1.5" />
                Meeting link will be generated after creation
              </p>
            </div>
          )}

          <Button
            onClick={handleSubmitDetails}
            disabled={!date || !time || (eventType !== 'virtual' && !location) || (scheduleType === 'multi-day' && !endDate)}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // ─── Step 3: Event Description & Capacity ─────────────────────
  if (interactiveType === 'event-description') {
    const currentDescriptions = DESCRIPTION_SUGGESTION_POOLS[descBatchIndex % DESCRIPTION_SUGGESTION_POOLS.length];
    const creditsUsed = 6 + descBatchIndex * 2;

    const handleSubmitDescription = () => {
      if (description.trim()) {
        onSubmit({ 
          description: description.trim(), 
          capacity: parseInt(capacity) || 100 
        });
      }
    };

    const handleDescFeedback = (index: number, type: 'up' | 'down') => {
      if (type === 'down') {
        setDescDownFeedbackOpen(descDownFeedbackOpen === index ? null : index);
      } else {
        setDescDownFeedbackOpen(null);
      }
      setDescFeedback(prev => ({
        ...prev,
        [index]: { type }
      }));
    };

    const handleDescDownSubmit = (index: number, reason: string, comment: string) => {
      setDescFeedback(prev => ({
        ...prev,
        [index]: { type: 'down', reason, comment }
      }));
      setDescDownFeedbackOpen(null);
    };

    const handleMoreDescriptions = () => {
      setDescBatchIndex(prev => prev + 1);
      setDescDownFeedbackOpen(null);
    };

    const handleDescInput = (value: string) => {
      setDescription(value);
      // Show suggestions after user starts typing
      if (value.trim().length > 0 && !showDescSuggestions) {
        setShowDescSuggestions(true);
      }
    };

    const likedCount = getLikedCount(descFeedback);
    const dislikedCount = getDislikedCount(descFeedback);

    return (
      <div className="mt-6 space-y-5">
        {/* ── Input Area (top) ── */}
        <div>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
            <Wand2 className="size-4 text-primary" />
            Describe your event
          </p>
          <Textarea
            value={description}
            onChange={(e) => handleDescInput(e.target.value)}
            placeholder="Start typing to see AI suggestions..."
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Capacity */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Capacity</label>
          <Input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="100"
            min="1"
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Suggested: 50 – 100 based on similar events
          </p>
        </div>

        {/* Continue button */}
        <Button
          onClick={handleSubmitDescription}
          disabled={!description.trim()}
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
        >
          Create Event
          <Wand2 className="size-4 ml-2" />
        </Button>

        {/* ── Suggestions (only after typing) ── */}
        {showDescSuggestions && (
          <>
            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or use an AI suggestion</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* AI Description Suggestions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wand2 className="size-3.5 text-primary" />
                  <span className="text-sm text-muted-foreground">AI Suggestions</span>
                  <AICreditsIndicator credits={creditsUsed} />
                </div>
                <button
                  onClick={handleMoreDescriptions}
                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  <span>More</span>
                  <span className="text-muted-foreground">(2 credits)</span>
                </button>
              </div>

              <div className="space-y-2">
                {currentDescriptions.map((suggestion, index) => {
                  const globalIndex = descBatchIndex * 5 + index;
                  const feedback = descFeedback[globalIndex];
                  const isDownOpen = descDownFeedbackOpen === globalIndex;

                  return (
                    <div key={`${descBatchIndex}-${index}`}>
                      <div className="p-4 rounded-lg border border-border bg-card hover:border-muted-foreground/30 transition-colors">
                        <p className="text-sm text-foreground leading-relaxed mb-3">{suggestion}</p>

                        <div className="flex items-center justify-between">
                          {/* Use / Customize actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => setDescription(suggestion)}
                              className="px-2.5 py-1 rounded border border-primary text-primary text-xs hover:bg-primary/5 transition-colors cursor-pointer"
                            >
                              Use this
                            </button>
                            <button
                              onClick={() => {
                                setDescription(suggestion);
                              }}
                              className="px-2.5 py-1 rounded border border-border text-muted-foreground text-xs hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                            >
                              Customize
                            </button>
                          </div>

                          {/* Feedback buttons */}
                          <div className="flex items-center gap-0.5">
                            <button
                              onClick={() => handleDescFeedback(globalIndex, 'up')}
                              className={`p-1.5 rounded transition-colors cursor-pointer ${
                                feedback?.type === 'up'
                                  ? 'text-green-600 bg-green-600/10'
                                  : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted'
                              }`}
                              title="More like this"
                            >
                              <ThumbsUp className="size-3" />
                            </button>
                            <button
                              onClick={() => handleDescFeedback(globalIndex, 'down')}
                              className={`p-1.5 rounded transition-colors cursor-pointer ${
                                feedback?.type === 'down'
                                  ? 'text-red-600 bg-red-600/10'
                                  : 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted'
                              }`}
                              title="Not this direction"
                            >
                              <ThumbsDown className="size-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Thumbs-down feedback card */}
                      {isDownOpen && (
                        <FeedbackCard
                          onSubmit={(reason, comment) => handleDescDownSubmit(globalIndex, reason, comment)}
                          onDismiss={() => setDescDownFeedbackOpen(null)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Feedback summary */}
              {(likedCount > 0 || dislikedCount > 0) && (
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                  {likedCount > 0 && (
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="size-2.5 text-green-600" />
                      {likedCount} liked
                    </span>
                  )}
                  {likedCount > 0 && dislikedCount > 0 && <span>·</span>}
                  {dislikedCount > 0 && (
                    <span className="flex items-center gap-1">
                      <ThumbsDown className="size-2.5 text-red-600" />
                      {dislikedCount} disliked
                    </span>
                  )}
                  <span>— suggestions adapting</span>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
}