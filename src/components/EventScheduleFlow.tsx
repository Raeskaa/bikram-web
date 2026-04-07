import { useState, useEffect } from 'react';
import { 
  LeapyCard, 
  LeapyCardHeader, 
  LeapyCardContent, 
  LeapyCardActions, 
  LeapyButton,
  LeapyProgressItem,
  LeapySchedulePreview
} from './LeapyCard';
import { Sparkles, CheckCircle2, Clock, Users, FileText, Eye, Share2, Bell, Rocket } from 'lucide-react';

type FlowStep = 
  | 'greeting' 
  | 'analyzing' 
  | 'preview' 
  | 'editing'
  | 'adding' 
  | 'success' 
  | 'next-actions'
  | 'assigning-speakers'
  | 'speaker-options'
  | 'adding-descriptions'
  | 'complete';

interface ScheduleItem {
  time: string;
  title: string;
  duration: string;
}

interface EventScheduleFlowProps {
  eventTitle: string;
  eventDuration: number; // in minutes
  onAddScheduleItems: (items: ScheduleItem[]) => void;
  onAssignSpeakers?: (assignments: any) => void;
  onAddDescriptions?: (descriptions: any) => void;
}

export function EventScheduleFlow({ 
  eventTitle, 
  eventDuration,
  onAddScheduleItems,
  onAssignSpeakers,
  onAddDescriptions
}: EventScheduleFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('greeting');
  const [proposedSchedule, setProposedSchedule] = useState<ScheduleItem[]>([]);
  const [progressItems, setProgressItems] = useState<Array<{ label: string; status: 'pending' | 'loading' | 'complete' }>>([]);

  // Generate initial schedule based on event
  const generateSchedule = (): ScheduleItem[] => {
    // For a 90-minute webinar
    return [
      { time: '00:00', title: 'Welcome & Introduction', duration: '5 min' },
      { time: '00:05', title: 'Product Demo', duration: '30 min' },
      { time: '00:35', title: 'AI Capabilities Deep Dive', duration: '20 min' },
      { time: '00:55', title: 'Live Q&A Session', duration: '20 min' },
      { time: '01:15', title: 'Use Cases & Success Stories', duration: '10 min' },
      { time: '01:25', title: 'Closing Remarks & Next Steps', duration: '5 min' }
    ];
  };

  // Handle "Generate full schedule" action
  const handleGenerateSchedule = () => {
    setCurrentStep('analyzing');
    
    // Simulate analysis delay
    setTimeout(() => {
      const schedule = generateSchedule();
      setProposedSchedule(schedule);
      setCurrentStep('preview');
    }, 2000);
  };

  // Handle "Add to schedule" action
  const handleAddToSchedule = () => {
    setCurrentStep('adding');
    
    // Set up progress items
    const items = proposedSchedule.map(item => ({
      label: item.title,
      status: 'pending' as const
    }));
    setProgressItems(items);

    // Simulate adding items one by one
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < items.length) {
        setProgressItems(prev => 
          prev.map((item, idx) => ({
            ...item,
            status: idx === currentIndex ? 'loading' : idx < currentIndex ? 'complete' : 'pending'
          }))
        );
        currentIndex++;
      } else {
        clearInterval(interval);
        // Mark all as complete
        setProgressItems(prev => 
          prev.map(item => ({ ...item, status: 'complete' as const }))
        );
        
        // Actually add to the event schedule
        onAddScheduleItems(proposedSchedule);
        
        // Move to success after a brief moment
        setTimeout(() => {
          setCurrentStep('success');
        }, 500);
      }
    }, 600);
  };

  // Handle edit request (simulated)
  const handleEditSchedule = () => {
    setCurrentStep('editing');
    
    // Simulate editing delay
    setTimeout(() => {
      // Modify the schedule (e.g., extend demo time)
      const updatedSchedule: ScheduleItem[] = [
        { time: '00:00', title: 'Welcome & Introduction', duration: '5 min' },
        { time: '00:05', title: 'Product Demo (Extended)', duration: '35 min' },
        { time: '00:40', title: 'AI Capabilities Deep Dive', duration: '15 min' },
        { time: '00:55', title: 'Live Q&A Session', duration: '20 min' },
        { time: '01:15', title: 'Use Cases & Success Stories', duration: '10 min' },
        { time: '01:25', title: 'Closing Remarks & Next Steps', duration: '5 min' }
      ];
      setProposedSchedule(updatedSchedule);
      setCurrentStep('preview');
    }, 1800);
  };

  // Handle next actions
  const handleAssignSpeakers = () => {
    setCurrentStep('speaker-options');
  };

  const handleAutoAssignSpeakers = () => {
    setCurrentStep('assigning-speakers');
    
    setTimeout(() => {
      // Mock speaker assignment
      if (onAssignSpeakers) {
        onAssignSpeakers({
          'Welcome & Introduction': 'Sarah Chen',
          'Product Demo': 'Alex Rivera',
          'AI Capabilities Deep Dive': 'Dr. Marcus Johnson',
          'Live Q&A Session': 'Panel Discussion',
          'Use Cases & Success Stories': 'Emily Watson',
          'Closing Remarks & Next Steps': 'Sarah Chen'
        });
      }
      
      setTimeout(() => {
        setCurrentStep('next-actions');
      }, 2000);
    }, 2500);
  };

  const handleAddDescriptions = () => {
    setCurrentStep('adding-descriptions');
    
    setTimeout(() => {
      if (onAddDescriptions) {
        onAddDescriptions({
          'Welcome & Introduction': 'Kick off the webinar with a warm welcome and overview of what attendees will learn.',
          'Product Demo': 'Live demonstration of our latest AI features and capabilities.',
          'AI Capabilities Deep Dive': 'Technical deep dive into the AI architecture and implementation.',
          'Live Q&A Session': 'Open forum for attendees to ask questions directly to our team.',
          'Use Cases & Success Stories': 'Real-world examples of how customers are using our platform.',
          'Closing Remarks & Next Steps': 'Summary of key takeaways and information about trial access.'
        });
      }
      
      setTimeout(() => {
        setCurrentStep('complete');
      }, 2000);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      {/* Step 1: Greeting */}
      {currentStep === 'greeting' && (
        <LeapyCard variant="action">
          <LeapyCardHeader icon={<Sparkles className="size-4" />}>
            Let's build your event schedule
          </LeapyCardHeader>
          <LeapyCardContent>
            <p>I see you're planning a {eventDuration}-minute event: <span className="font-semibold text-foreground">"{eventTitle}"</span></p>
            <p>I can help you create a professional schedule optimized for engagement and time management.</p>
          </LeapyCardContent>
          <LeapyCardActions>
            <LeapyButton onClick={handleGenerateSchedule}>
              Generate full schedule
            </LeapyButton>
            <LeapyButton variant="secondary" onClick={() => {}}>
              Start from template
            </LeapyButton>
          </LeapyCardActions>
        </LeapyCard>
      )}

      {/* Step 2: Analyzing */}
      {currentStep === 'analyzing' && (
        <LeapyCard variant="progress">
          <LeapyCardHeader isLoading>
            Analyzing your event
          </LeapyCardHeader>
          <LeapyCardContent>
            <div className="space-y-2 py-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Event type</span>
                <span className="text-foreground font-medium">Webinar</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Topic</span>
                <span className="text-foreground font-medium">AI Product Launch</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="text-foreground font-medium">{eventDuration} minutes</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Best practices</span>
                <span className="text-[var(--ai-primary)] font-medium">Applied</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">Creating optimized schedule...</p>
            </div>
          </LeapyCardContent>
        </LeapyCard>
      )}

      {/* Step 3: Preview / Editing */}
      {(currentStep === 'preview' || currentStep === 'editing') && (
        <LeapyCard variant={currentStep === 'editing' ? 'progress' : 'default'}>
          <LeapyCardHeader 
            icon={currentStep === 'editing' ? undefined : <CheckCircle2 className="size-4" />}
            isLoading={currentStep === 'editing'}
          >
            {currentStep === 'editing' ? 'Adjusting schedule' : 'Schedule ready'}
          </LeapyCardHeader>
          <LeapyCardContent>
            {currentStep === 'editing' && (
              <p className="mb-3">I've extended the demo from 30 to 35 minutes and rebalanced other items.</p>
            )}
            {currentStep === 'preview' && (
              <p className="mb-3">Here's what I've created for your event:</p>
            )}
            <LeapySchedulePreview items={proposedSchedule} />
          </LeapyCardContent>
          {currentStep === 'preview' && (
            <LeapyCardActions>
              <LeapyButton onClick={handleAddToSchedule}>
                Add to schedule
              </LeapyButton>
              <LeapyButton variant="secondary" onClick={handleEditSchedule}>
                Make demo longer
              </LeapyButton>
            </LeapyCardActions>
          )}
        </LeapyCard>
      )}

      {/* Step 4: Adding to schedule */}
      {currentStep === 'adding' && (
        <LeapyCard variant="progress">
          <LeapyCardHeader isLoading>
            Adding schedule items
          </LeapyCardHeader>
          <LeapyCardContent>
            <div className="space-y-1">
              {progressItems.map((item, index) => (
                <LeapyProgressItem 
                  key={index} 
                  label={item.label} 
                  status={item.status} 
                />
              ))}
            </div>
          </LeapyCardContent>
        </LeapyCard>
      )}

      {/* Step 5: Success */}
      {currentStep === 'success' && (
        <LeapyCard>
          <LeapyCardHeader icon={<CheckCircle2 className="size-4" />}>
            Schedule added successfully
          </LeapyCardHeader>
          <LeapyCardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Agenda items created</span>
                <span className="text-foreground font-semibold">{proposedSchedule.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total duration</span>
                <span className="text-foreground font-semibold">{eventDuration} minutes</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--ai-border)]/20">
              <p className="text-sm font-medium text-foreground mb-3">What's next?</p>
              <div className="space-y-2">
                <button
                  onClick={handleAssignSpeakers}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--ai-muted)] hover:bg-[var(--ai-accent)] border border-[var(--ai-border)]/20 transition-all text-left group"
                >
                  <Users className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">Assign speakers</span>
                </button>
                <button
                  onClick={handleAddDescriptions}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--ai-muted)] hover:bg-[var(--ai-accent)] border border-[var(--ai-border)]/20 transition-all text-left group"
                >
                  <FileText className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">Add descriptions</span>
                </button>
              </div>
            </div>
          </LeapyCardContent>
        </LeapyCard>
      )}

      {/* Speaker Options */}
      {currentStep === 'speaker-options' && (
        <LeapyCard variant="action">
          <LeapyCardHeader icon={<Users className="size-4" />}>
            Let's assign speakers
          </LeapyCardHeader>
          <LeapyCardContent>
            <p className="mb-3">I can help you assign speakers to each session:</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <div className="size-1.5 rounded-full bg-[var(--ai-primary)] mt-1.5 flex-shrink-0" />
                <span className="text-muted-foreground">Auto-assign based on your team roster</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="size-1.5 rounded-full bg-[var(--ai-primary)] mt-1.5 flex-shrink-0" />
                <span className="text-muted-foreground">Let you manually pick for each session</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="size-1.5 rounded-full bg-[var(--ai-primary)] mt-1.5 flex-shrink-0" />
                <span className="text-muted-foreground">Import speaker assignments from previous events</span>
              </div>
            </div>
          </LeapyCardContent>
          <LeapyCardActions>
            <LeapyButton onClick={handleAutoAssignSpeakers}>
              Auto-assign speakers
            </LeapyButton>
            <LeapyButton variant="secondary" onClick={() => setCurrentStep('next-actions')}>
              Skip for now
            </LeapyButton>
          </LeapyCardActions>
        </LeapyCard>
      )}

      {/* Assigning Speakers */}
      {currentStep === 'assigning-speakers' && (
        <LeapyCard variant="progress">
          <LeapyCardHeader isLoading>
            Assigning speakers
          </LeapyCardHeader>
          <LeapyCardContent>
            <p className="mb-3">Analyzing team expertise and availability...</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm py-1.5">
                <span className="text-muted-foreground">Welcome & Introduction</span>
                <span className="text-[var(--ai-primary)] font-medium">Sarah Chen</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1.5">
                <span className="text-muted-foreground">Product Demo</span>
                <span className="text-[var(--ai-primary)] font-medium">Alex Rivera</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1.5">
                <span className="text-muted-foreground">AI Capabilities Deep Dive</span>
                <span className="text-[var(--ai-primary)] font-medium">Dr. Marcus Johnson</span>
              </div>
            </div>
          </LeapyCardContent>
        </LeapyCard>
      )}

      {/* Adding Descriptions */}
      {currentStep === 'adding-descriptions' && (
        <LeapyCard variant="progress">
          <LeapyCardHeader isLoading>
            Generating descriptions
          </LeapyCardHeader>
          <LeapyCardContent>
            <p className="mb-3">Creating engaging descriptions for each agenda item...</p>
            <div className="space-y-1.5">
              <LeapyProgressItem label="Welcome & Introduction" status="complete" />
              <LeapyProgressItem label="Product Demo" status="complete" />
              <LeapyProgressItem label="AI Capabilities Deep Dive" status="loading" />
              <LeapyProgressItem label="Live Q&A Session" status="pending" />
              <LeapyProgressItem label="Use Cases & Success Stories" status="pending" />
            </div>
          </LeapyCardContent>
        </LeapyCard>
      )}

      {/* Next Actions (after speaker assignment) */}
      {currentStep === 'next-actions' && (
        <LeapyCard>
          <LeapyCardHeader icon={<CheckCircle2 className="size-4" />}>
            Great progress
          </LeapyCardHeader>
          <LeapyCardContent>
            <p className="mb-3">Your event schedule is taking shape. Continue building:</p>
            <div className="space-y-2">
              <button
                onClick={handleAddDescriptions}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--ai-muted)] hover:bg-[var(--ai-accent)] border border-[var(--ai-border)]/20 transition-all text-left group"
              >
                <FileText className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">Add session descriptions</span>
              </button>
              <button
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--ai-muted)] hover:bg-[var(--ai-accent)] border border-[var(--ai-border)]/20 transition-all text-left group"
              >
                <Clock className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">Set up reminders</span>
              </button>
            </div>
          </LeapyCardContent>
          <LeapyCardActions className="mt-3">
            <LeapyButton variant="secondary" onClick={() => {}}>
              Done for now
            </LeapyButton>
          </LeapyCardActions>
        </LeapyCard>
      )}

      {/* Complete */}
      {currentStep === 'complete' && (
        <LeapyCard>
          <LeapyCardHeader icon={<CheckCircle2 className="size-4" />}>
            Event schedule complete
          </LeapyCardHeader>
          <LeapyCardContent>
            <p className="mb-2">Your event is ready with:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                <span className="text-foreground">{proposedSchedule.length} scheduled agenda items</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                <span className="text-foreground">Speaker assignments</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                <span className="text-foreground">Session descriptions</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--ai-border)]/20">
              <p className="text-sm font-medium text-foreground mb-3">What would you like to do next?</p>
              <div className="space-y-2">
                <button
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--ai-muted)] hover:bg-[var(--ai-accent)] border border-[var(--ai-border)]/20 transition-all text-left group"
                >
                  <Eye className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">Preview event page</span>
                </button>
                <button
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--ai-muted)] hover:bg-[var(--ai-accent)] border border-[var(--ai-border)]/20 transition-all text-left group"
                >
                  <Bell className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">Set up email reminders</span>
                </button>
                <button
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--ai-muted)] hover:bg-[var(--ai-accent)] border border-[var(--ai-border)]/20 transition-all text-left group"
                >
                  <Share2 className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">Share event link</span>
                </button>
                <button
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--ai-muted)] hover:bg-[var(--ai-accent)] border border-[var(--ai-border)]/20 transition-all text-left group"
                >
                  <Rocket className="size-4 text-[var(--ai-primary)] flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">Publish event</span>
                </button>
              </div>
            </div>
          </LeapyCardContent>
        </LeapyCard>
      )}
    </div>
  );
}