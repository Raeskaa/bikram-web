import { ReactNode } from 'react';
import {
  Home, Hash, Users, BookOpen, Calendar, BarChart3, Settings as SettingsIcon, Zap,
  MessageSquare, ArrowLeft, History, UserPlus, Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { cn } from './ui/utils';

export type CommunityRole = 'admin' | 'moderator' | 'member';

export type TabIndicator = 'complete' | 'partial' | 'empty' | 'warning' | 'none';

interface TabConfig {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

interface CommunityShellProps {
  role: CommunityRole;
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
    channels?: number;
    members?: number;
    courses?: number;
    events?: number;
    messages?: number;
  };
  sidebarBottom?: ReactNode;
  statusBanner?: ReactNode;
  tabIndicators?: Record<string, TabIndicator>;
  hiddenTabs?: string[];
}

const ADMIN_TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'channels', label: 'Channels', icon: Hash },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'ai-hub', label: 'AI & Automations', icon: Zap, badge: 'Pro', badgeColor: 'bg-primary text-primary-foreground' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

const MODERATOR_TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'channels', label: 'Channels', icon: Hash },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const MEMBER_TABS: TabConfig[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'channels', label: 'Channels', icon: Hash },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

function TabIndicatorDot({ indicator }: { indicator: TabIndicator }) {
  if (indicator === 'none') return null;
  if (indicator === 'complete') {
    return <div className="size-2 rounded-full bg-green-500 ml-auto flex-shrink-0" />;
  }
  if (indicator === 'warning') {
    return <div className="size-2 rounded-full bg-amber-500 ml-auto flex-shrink-0" />;
  }
  if (indicator === 'empty') {
    return <div className="size-2 rounded-full bg-muted-foreground/30 ml-auto flex-shrink-0" />;
  }
  if (indicator === 'partial') {
    return <div className="size-2 rounded-full bg-amber-400 ml-auto flex-shrink-0" />;
  }
  return null;
}

export function CommunityShell({
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
}: CommunityShellProps) {
  let tabs: TabConfig[];
  switch (role) {
    case 'admin':
      tabs = ADMIN_TABS;
      break;
    case 'moderator':
      tabs = MODERATOR_TABS;
      break;
    case 'member':
      tabs = MEMBER_TABS;
      break;
    default:
      tabs = MEMBER_TABS;
  }

  const visibleTabs = hiddenTabs && hiddenTabs.length > 0
    ? tabs.filter(t => !hiddenTabs.includes(t.id))
    : tabs;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Unified Header */}
      <div className="border-b border-border bg-card sticky top-0 z-20">
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
                let count: number | undefined = undefined;
                if (tab.id === 'channels') count = counts?.channels;
                if (tab.id === 'members') count = counts?.members;
                if (tab.id === 'courses') count = counts?.courses;
                if (tab.id === 'events') count = counts?.events;
                if (tab.id === 'messages') count = counts?.messages;

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
          {statusBanner}
          {children}
        </div>
      </div>
    </div>
  );
}
