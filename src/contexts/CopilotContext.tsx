import { createContext, useContext, useState, ReactNode } from 'react';

interface CurrentFocus {
  type: 'field' | 'section' | 'page';
  name: string;
  value?: string;
}

export interface EventCopilotContext {
  lifecycleStage: 'skeleton' | 'building' | 'ready' | 'published' | 'live' | 'ended' | 'cancelled';
  eventTitle: string;
  eventId?: string;
  currentView?: string; // Track which tab/view user is on
  completionDone: number;
  completionTotal: number;
  registrationCount: number;
  capacity: number;
  waitlistCount: number;
  isPaid: boolean;
  price?: number;
  hasAgenda: boolean;
  hasSpeakers: boolean;
  hasCoverImage: boolean;
  hasRegistrationForm: boolean;
  hasTickets: boolean;
  sessionCount: number;
  totalDuration: number;
  attendeeCount?: number;
  liveViewers?: number;
  unansweredQuestions?: number;
}

interface CopilotContextType {
  currentFocus: CurrentFocus | undefined;
  setCurrentFocus: (focus: CurrentFocus | undefined) => void;
  applySuggestion: (suggestion: any) => void;
  onSuggestionApplied?: (suggestion: any) => void;
  eventContext: EventCopilotContext | undefined;
  setEventContext: (ctx: EventCopilotContext | undefined) => void;
}

const CopilotContext = createContext<CopilotContextType | undefined>(undefined);

export function CopilotProvider({ children, onSuggestionApplied }: { children: ReactNode; onSuggestionApplied?: (suggestion: any) => void }) {
  const [currentFocus, setCurrentFocus] = useState<CurrentFocus | undefined>();
  const [eventContext, setEventContext] = useState<EventCopilotContext | undefined>();

  const applySuggestion = (suggestion: any) => {
    if (onSuggestionApplied) {
      onSuggestionApplied(suggestion);
    }
  };

  return (
    <CopilotContext.Provider value={{ currentFocus, setCurrentFocus, applySuggestion, onSuggestionApplied, eventContext, setEventContext }}>
      {children}
    </CopilotContext.Provider>
  );
}

export function useCopilot() {
  const context = useContext(CopilotContext);
  if (!context) {
    // Return safe defaults instead of throwing — handles HMR and edge cases
    return {
      currentFocus: undefined,
      setCurrentFocus: () => {},
      applySuggestion: () => {},
      onSuggestionApplied: undefined,
      eventContext: undefined,
      setEventContext: () => {},
    } as CopilotContextType;
  }
  return context;
}