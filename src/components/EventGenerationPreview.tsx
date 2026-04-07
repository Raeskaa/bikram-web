import { useState, useEffect } from 'react';
import { Calendar, RotateCcw, ArrowRight, ArrowLeft, Check, Loader2, Wand2, MapPin, Clock, Users, Video, Globe, Tag } from 'lucide-react';
import { Button } from './ui/button';

interface EventData {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  endTime?: string;
  location?: string;
  capacity?: number;
  type?: 'virtual' | 'in-person' | 'hybrid';
  category?: string;
}

interface EventGenerationPreviewProps {
  eventData: Partial<EventData>;
  onComplete: () => void;
  onBack?: () => void;
}

const GENERATION_STEPS = [
  'Understanding your event details...',
  'Setting up event page...',
  'Configuring registration...',
  'Building event schedule...',
  'Setting up reminders...',
  'Almost ready...',
];

// Header visual variants that Regenerate cycles through
const HEADER_VARIANTS = [
  { bg: 'bg-muted', pattern: '45deg', icon: Calendar },
  { bg: 'bg-primary/5', pattern: '135deg', icon: Wand2 },
  { bg: 'bg-muted', pattern: '90deg', icon: Globe },
  { bg: 'bg-primary/10', pattern: '0deg', icon: Video },
];

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'TBD';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr?: string): string {
  if (!timeStr) return 'TBD';
  try {
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
  } catch {
    return timeStr;
  }
}

function getScheduleForEvent(eventData: Partial<EventData>) {
  const startTime = eventData.time || '14:00';
  const [h, m] = startTime.split(':').map(Number);

  const addMinutes = (hours: number, mins: number, add: number) => {
    const total = hours * 60 + mins + add;
    return [Math.floor(total / 60), total % 60] as const;
  };

  const fmtTime = (hours: number, mins: number) => {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHour}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  const [h1, m1] = addMinutes(h, m, 15);
  const [h2, m2] = addMinutes(h, m, 60);
  const [h3, m3] = addMinutes(h, m, 105);

  return [
    { time: fmtTime(h, m), title: 'Doors Open & Check-in', desc: 'Arrival and introductions' },
    { time: fmtTime(h1, m1), title: 'Opening Session', desc: 'Welcome and agenda overview' },
    { time: fmtTime(h2, m2), title: 'Main Session', desc: 'Core content and discussion' },
    { time: fmtTime(h3, m3), title: 'Wrap-up & Networking', desc: 'Closing remarks and open networking' },
  ];
}

// Secondary schedule variant for regeneration
function getAltScheduleForEvent(eventData: Partial<EventData>) {
  const startTime = eventData.time || '14:00';
  const [h, m] = startTime.split(':').map(Number);

  const addMinutes = (hours: number, mins: number, add: number) => {
    const total = hours * 60 + mins + add;
    return [Math.floor(total / 60), total % 60] as const;
  };

  const fmtTime = (hours: number, mins: number) => {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHour}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  const [h1, m1] = addMinutes(h, m, 10);
  const [h2, m2] = addMinutes(h, m, 40);
  const [h3, m3] = addMinutes(h, m, 55);
  const [h4, m4] = addMinutes(h, m, 95);
  const [h5, m5] = addMinutes(h, m, 120);

  return [
    { time: fmtTime(h, m), title: 'Welcome & Icebreaker', desc: 'Introductions and warm-up activity' },
    { time: fmtTime(h1, m1), title: 'Keynote Presentation', desc: 'Featured speaker and core topic' },
    { time: fmtTime(h2, m2), title: 'Interactive Workshop', desc: 'Hands-on exercises and group work' },
    { time: fmtTime(h3, m3), title: 'Break', desc: 'Refreshments and informal networking' },
    { time: fmtTime(h4, m4), title: 'Panel Discussion & Q&A', desc: 'Open floor for questions and discussion' },
    { time: fmtTime(h5, m5), title: 'Closing & Next Steps', desc: 'Summary, resources, and follow-up plan' },
  ];
}

const TYPE_LABELS: Record<string, { label: string; icon: typeof Video }> = {
  'virtual': { label: 'Virtual Event', icon: Video },
  'in-person': { label: 'In-Person Event', icon: MapPin },
  'hybrid': { label: 'Hybrid Event', icon: Globe },
};

export function EventGenerationPreview({ 
  eventData, 
  onComplete,
  onBack
}: EventGenerationPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [headerVersion, setHeaderVersion] = useState(0);
  const [isRegeneratingHeader, setIsRegeneratingHeader] = useState(false);
  const [scheduleAccepted, setScheduleAccepted] = useState(false);
  const [scheduleVersion, setScheduleVersion] = useState(0);
  const [isRegeneratingSchedule, setIsRegeneratingSchedule] = useState(false);

  useEffect(() => {
    if (isGenerating && currentStep < GENERATION_STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentStep >= GENERATION_STEPS.length) {
      setIsGenerating(false);
    }
  }, [currentStep, isGenerating]);

  const handleRegenerateHeader = () => {
    setIsRegeneratingHeader(true);
    setTimeout(() => {
      setHeaderVersion((prev) => (prev + 1) % HEADER_VARIANTS.length);
      setIsRegeneratingHeader(false);
    }, 1200);
  };

  const handleRegenerateSchedule = () => {
    setIsRegeneratingSchedule(true);
    setScheduleAccepted(false);
    setTimeout(() => {
      setScheduleVersion((prev) => prev + 1);
      setIsRegeneratingSchedule(false);
    }, 1000);
  };

  const schedule = scheduleVersion % 2 === 0
    ? getScheduleForEvent(eventData)
    : getAltScheduleForEvent(eventData);

  const variant = HEADER_VARIANTS[headerVersion];
  const HeaderIcon = variant.icon;
  const typeInfo = TYPE_LABELS[eventData.type || 'virtual'];

  // Next-step chip config — each maps to an action
  const nextStepChips = [
    { label: 'Customise Schedule', action: () => onComplete() },
    { label: 'Add Speakers', action: () => onComplete() },
    { label: 'Set Up Tickets', action: () => onComplete() },
    { label: 'Configure Reminders', action: () => onComplete() },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">

        {/* Back Button */}
        {onBack && (
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back
            </Button>
          </div>
        )}

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            {isGenerating ? (
              <div className="size-12 bg-primary rounded-full flex items-center justify-center">
                <Loader2 className="size-6 text-white animate-spin" />
              </div>
            ) : (
              <div className="size-12 bg-primary rounded-full flex items-center justify-center">
                <Check className="size-6 text-white" />
              </div>
            )}
          </div>
          <h1 className="text-foreground text-3xl mb-3">
            {isGenerating ? 'Creating your event...' : 'Your event is ready'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isGenerating 
              ? 'Setting everything up for you' 
              : 'Review the preview below, then head to the builder to customise everything.'
            }
          </p>
        </div>

        {/* Loading Steps */}
        {isGenerating && (
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="space-y-3">
              {GENERATION_STEPS.map((step, index) => {
                const isComplete = index < currentStep;
                const isActive = index === currentStep;
                const isPending = index > currentStep;

                return (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 transition-all duration-300 ${
                      isPending ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <div className={`size-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isComplete ? 'bg-primary' :
                      isActive ? 'bg-primary animate-pulse' :
                      'bg-muted'
                    }`}>
                      {isComplete && <Check className="size-4 text-white" />}
                      {isActive && <Loader2 className="size-3 text-white animate-spin" />}
                    </div>
                    <span className={`text-foreground ${isActive ? 'font-medium' : ''}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Preview Section (shows after generation) */}
        {!isGenerating && (
          <div className="space-y-4">
            {/* Event Preview Card */}
            <div className="bg-card rounded-xl overflow-hidden border border-border">
              {/* Header — cycles through variants */}
              <div className={`relative h-48 ${variant.bg} flex items-center justify-center overflow-hidden transition-colors duration-500`}>
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.04]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(${variant.pattern}, transparent, transparent 35px, currentColor 35px, currentColor 70px)`,
                  }} />
                </div>
                
                {/* Event Name Overlay — single title location */}
                <div className="relative z-10 text-center px-6">
                  <div className="inline-flex items-center justify-center size-14 bg-primary/10 rounded-full mb-3">
                    <HeaderIcon className="size-7 text-primary" />
                  </div>
                  <h2 className="text-foreground text-2xl mb-2">
                    {eventData.title}
                  </h2>
                  {/* Badges: Type + Category */}
                  <div className="flex items-center justify-center gap-2">
                    {typeInfo && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs">
                        <typeInfo.icon className="size-3" />
                        {typeInfo.label}
                      </span>
                    )}
                    {eventData.category && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-card border border-border text-muted-foreground rounded-full text-xs">
                        <Tag className="size-3" />
                        {eventData.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Regenerate Header Button */}
                <div className="absolute top-4 right-4">
                  <Button
                    onClick={handleRegenerateHeader}
                    disabled={isRegeneratingHeader}
                    size="sm"
                    variant="outline"
                    className="bg-card hover:bg-muted text-foreground"
                  >
                    {isRegeneratingHeader ? (
                      <>
                        <Loader2 className="size-3 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="size-3 mr-2" />
                        Regenerate Header
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Event Info Section — NO duplicate title */}
              <div className="p-6">
                {/* Description only */}
                {eventData.description && (
                  <p className="text-muted-foreground text-sm mb-4">
                    {eventData.description}
                  </p>
                )}

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="size-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date & Time</p>
                      <p className="text-sm text-foreground">
                        {formatDate(eventData.date)} at {formatTime(eventData.time)}
                        {eventData.endTime ? ` - ${formatTime(eventData.endTime)}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    {eventData.type === 'virtual' ? (
                      <Video className="size-5 text-primary flex-shrink-0" />
                    ) : eventData.type === 'hybrid' ? (
                      <Globe className="size-5 text-primary flex-shrink-0" />
                    ) : (
                      <MapPin className="size-5 text-primary flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm text-foreground">
                        {eventData.type === 'virtual' 
                          ? 'Virtual Event (Leapcast meeting link will be generated)' 
                          : eventData.type === 'hybrid'
                          ? `${eventData.location || 'TBD'} + Virtual access`
                          : eventData.location || 'TBD'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Users className="size-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Capacity</p>
                      <p className="text-sm text-foreground">
                        {eventData.capacity || 100} attendees
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event Schedule Preview */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm text-muted-foreground">Suggested Schedule</h4>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        disabled={isRegeneratingSchedule}
                        onClick={handleRegenerateSchedule}
                      >
                        {isRegeneratingSchedule ? (
                          <>
                            <Loader2 className="size-3 mr-1.5 animate-spin" />
                            Regenerating...
                          </>
                        ) : (
                          <>
                            <RotateCcw className="size-3 mr-1.5" />
                            Regenerate
                          </>
                        )}
                      </Button>
                      <Button
                        variant={scheduleAccepted ? "default" : "outline"}
                        size="sm"
                        className={`h-7 text-xs ${scheduleAccepted ? 'bg-primary text-white pointer-events-none' : ''}`}
                        disabled={scheduleAccepted || isRegeneratingSchedule}
                        onClick={() => setScheduleAccepted(true)}
                      >
                        <Check className="size-3 mr-1.5" />
                        {scheduleAccepted ? 'Schedule Applied' : 'Use This'}
                      </Button>
                    </div>
                  </div>
                  {isRegeneratingSchedule ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="size-5 text-primary animate-spin mr-2" />
                      <span className="text-sm text-muted-foreground">Generating new schedule...</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {schedule.map((item, index) => (
                        <div key={`${scheduleVersion}-${index}`} className={`flex items-start gap-3 pb-3 ${
                          index < schedule.length - 1 ? 'border-b border-border' : ''
                        }`}>
                          <div className="text-xs text-muted-foreground w-20 flex-shrink-0 pt-0.5">{item.time}</div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Next Steps — actionable chips */}
            <div className="bg-muted border border-border rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="size-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wand2 className="size-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground mb-1">Next steps</h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Your event is ready. Jump into any section to start customising, or head straight to the builder.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {nextStepChips.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={chip.action}
                        className="px-3 py-1 bg-card border border-border rounded-full text-muted-foreground text-xs hover:border-primary hover:text-primary transition-colors cursor-pointer"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={onComplete}
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 px-8 text-lg h-12"
              >
                Continue to Builder
                <ArrowRight className="size-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Text — accurate timing */}
        {isGenerating && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              This usually takes a few seconds
            </p>
          </div>
        )}
      </div>
    </div>
  );
}