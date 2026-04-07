import { ReactNode } from 'react';
import { 
  Calendar, Clock, Users, Ticket, MessageSquare, BarChart3, Settings as SettingsIcon, Zap, 
  Eye, Award, Download, Star, MessageCircle, ArrowLeft, Play, FileText,
  AlertCircle, CheckCircle2, History
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { cn } from './ui/utils';

// Phase 2: Added 'speaker' role per MOCK_EVENTS_MASTER_PLAN.md §Part 2 Event L
export type EventRole = 'admin' | 'learner' | 'post-event' | 'speaker';

// Tab indicator status for lifecycle-aware rendering
export type TabIndicator = 'complete' | 'partial' | 'empty' | 'warning' | 'none';

interface TabConfig {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

interface EventShellProps {
  role: EventRole;
  title: string;
  subtitle?: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  headerActions?: ReactNode;
  subHeader?: ReactNode;
  children: ReactNode;
  onBack?: () => void;
  badge?: ReactNode;
  counts?: {
    agenda?: number;
    attendees?: number;
    discussion?: number;
    reviews?: number;
    resources?: number;
  };
  sidebarBottom?: ReactNode;
  // Phase 2: Status banner above content area
  statusBanner?: ReactNode;
  // Phase 2: Tab indicators keyed by tab id
  tabIndicators?: Record<string, TabIndicator>;
  // Phase 5/6: Hide specific tabs based on registration status (anonymous, rejected, etc.)
  hiddenTabs?: string[];
}

const ADMIN_TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: Calendar },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'attendees', label: 'Speakers & Attendees', icon: Users },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'resources', label: 'Resources', icon: FileText },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'discussion', label: 'Discussion', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'changelog', label: 'Change Log', icon: History },
  { id: 'ai-hub', label: 'AI & Automations', icon: Zap, badge: 'Pro', badgeColor: 'bg-primary text-primary-foreground' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

const LEARNER_TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: Eye },
  { id: 'agenda', label: 'Agenda', icon: Clock },
  { id: 'learn', label: 'Learn', icon: Award },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'resources', label: 'Resources', icon: Download },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
];

const POST_EVENT_TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: Eye },
  { id: 'recording', label: 'Recording', icon: Play },
  { id: 'resources', label: 'Resources', icon: FileText },
  { id: 'certificate', label: 'Certificate', icon: Award },
  { id: 'discussion', label: 'Discussion', icon: MessageSquare },
  { id: 'reviews', label: 'Reviews', icon: Star },
];

// Speaker/co-host: subset of admin tabs
// Per MOCK_EVENTS_MASTER_PLAN.md §Event L — can see overview, schedule (own sessions), attendees (read-only), discussion (moderate)
const SPEAKER_TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: Calendar },
  { id: 'schedule', label: 'Schedule', icon: Clock },
  { id: 'attendees', label: 'Speakers & Attendees', icon: Users },
  { id: 'discussion', label: 'Discussion', icon: MessageSquare },
  { id: 'ai-hub', label: 'AI & Automations', icon: Zap, badge: 'Pro', badgeColor: 'bg-primary text-primary-foreground' },
];

function TabIndicatorDot({ indicator }: { indicator: TabIndicator }) {
  if (indicator === 'none') return null;
  
  if (indicator === 'complete') {
    return <CheckCircle2 className="size-3 text-green-600 ml-auto flex-shrink-0" />;
  }
  if (indicator === 'warning') {
    return <AlertCircle className="size-3 text-amber-500 ml-auto flex-shrink-0" />;
  }
  if (indicator === 'empty') {
    return <div className="size-2 rounded-full bg-muted-foreground/30 ml-auto flex-shrink-0" />;
  }
  if (indicator === 'partial') {
    return <div className="size-2 rounded-full bg-amber-400 ml-auto flex-shrink-0" />;
  }
  return null;
}

export function EventShell({
  role,
  title,
  subtitle,
  activeTab,
  onTabChange,
  headerActions,
  subHeader,
  children,
  onBack,
  badge,
  counts,
  sidebarBottom,
  statusBanner,
  tabIndicators,
  hiddenTabs,
}: EventShellProps) {
  let tabs: TabConfig[];
  switch (role) {
    case 'admin':
      tabs = ADMIN_TABS;
      break;
    case 'speaker':
      tabs = SPEAKER_TABS;
      break;
    case 'learner':
      tabs = LEARNER_TABS;
      break;
    case 'post-event':
      tabs = POST_EVENT_TABS;
      break;
    default:
      tabs = LEARNER_TABS;
  }

  const showHeader = role === 'admin' || role === 'post-event' || role === 'speaker';

  // Phase 5/6: Filter out hidden tabs
  const visibleTabs = hiddenTabs && hiddenTabs.length > 0
    ? tabs.filter(t => !hiddenTabs.includes(t.id))
    : tabs;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Unified Header */}
      <div className="border-b border-border bg-card sticky top-0 z-20">
        {showHeader && (
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onBack}
                  className="h-9 w-9 -ml-2 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="size-5" />
                </Button>
              )}
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-foreground font-semibold text-lg leading-tight truncate max-w-xl">
                    {title}
                  </h1>
                  {badge}
                </div>
                {subtitle && (
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">
                    {subtitle}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {headerActions}
            </div>
          </div>
        )}
        {subHeader}
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Unified Sidebar */}
        <div className="w-64 border-r border-border bg-card flex-shrink-0 z-10 flex flex-col h-full">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-1">
              {visibleTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                // Determine count based on tab id mapping
                let count: number | undefined = undefined;
                if (tab.id === 'agenda' || tab.id === 'schedule') count = counts?.agenda;
                if (tab.id === 'community' || tab.id === 'attendees') count = counts?.attendees;
                if (tab.id === 'chat' || tab.id === 'discussion') count = counts?.discussion;
                if (tab.id === 'reviews') count = counts?.reviews;

                const indicator = tabIndicators?.[tab.id] || 'none';
                const hasBadge = !!(tab as any).badge;
                const hasCount = count !== undefined && count > 0;
                const hasIndicator = indicator !== 'none';

                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 font-medium group",
                      isActive 
                        ? "bg-primary/5 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <tab.icon className={cn("size-4 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                    <span>{tab.label}</span>
                    
                    {/* Priority: badge > count > indicator */}
                    {hasBadge ? (
                      <Badge className={cn("ml-auto text-[9px] border-none px-1.5 rounded-md h-5", (tab as any).badgeColor)}>
                        {(tab as any).badge}
                      </Badge>
                    ) : hasCount ? (
                      <Badge variant="secondary" className="ml-auto text-xs rounded-lg shadow-none text-muted-foreground bg-muted group-hover:bg-muted/80">
                        {count}
                      </Badge>
                    ) : hasIndicator ? (
                      <TabIndicatorDot indicator={indicator} />
                    ) : null}
                  </button>
                );
              })}
            </div>
            {sidebarBottom && (
              <div className="px-4 pb-4 mt-auto border-t border-border pt-4">
                {sidebarBottom}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col bg-background">
          {/* Phase 2: Status banner slot — live, cancelled, ready-to-publish, etc. */}
          {statusBanner}
          {children}
        </div>
      </div>
    </div>
  );
}
