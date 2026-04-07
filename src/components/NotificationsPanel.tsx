import { X, Check, Clock, Users, Calendar, BookOpen, MessageSquare, UserPlus, Settings, Bell, Archive, Trash2, ChevronDown, Filter } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'community' | 'course' | 'event' | 'message' | 'member';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
  timestamp: Date;
  cta?: {
    label: string;
    action: string;
  };
  secondaryCta?: {
    label: string;
    action: string;
  };
}

type FilterType = 'all' | 'community' | 'course' | 'event' | 'message' | 'member';
type TimeFilter = 'all' | 'today' | 'week' | 'month';

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'member',
      title: 'New member joined',
      message: 'Sarah Chen joined "UX Design Masters" community',
      time: '2 minutes ago',
      read: false,
      icon: UserPlus,
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      cta: { label: 'View Profile', action: 'view_profile' }
    },
    {
      id: '2',
      type: 'event',
      title: 'Event starting soon',
      message: '"Design Sprint Workshop" starts in 30 minutes',
      time: '5 minutes ago',
      read: false,
      icon: Calendar,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      cta: { label: 'Join Now', action: 'join_event' },
      secondaryCta: { label: 'View Details', action: 'view_event' }
    },
    {
      id: '3',
      type: 'message',
      title: 'New comment on your course',
      message: 'Alex Martinez: "This module is really helpful! Can you elaborate on..."',
      time: '1 hour ago',
      read: false,
      icon: MessageSquare,
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      cta: { label: 'Reply', action: 'reply' }
    },
    {
      id: '4',
      type: 'course',
      title: 'Course completion milestone',
      message: '50 students completed "Advanced React Patterns"',
      time: '3 hours ago',
      read: true,
      icon: BookOpen,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      cta: { label: 'View Analytics', action: 'view_analytics' }
    },
    {
      id: '5',
      type: 'community',
      title: 'Community invitation',
      message: 'John invited you to join "Marketing Innovators" community',
      time: '5 hours ago',
      read: false,
      icon: Users,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      cta: { label: 'Accept', action: 'accept' },
      secondaryCta: { label: 'Decline', action: 'decline' }
    },
    {
      id: '6',
      type: 'event',
      title: 'Event feedback requested',
      message: 'Please share your feedback for "Weekly Standup"',
      time: '1 day ago',
      read: false,
      icon: Calendar,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      cta: { label: 'Give Feedback', action: 'feedback' }
    },
    {
      id: '7',
      type: 'course',
      title: 'New course enrollment',
      message: '15 new students enrolled in "Product Design Fundamentals"',
      time: '2 days ago',
      read: true,
      icon: BookOpen,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '8',
      type: 'community',
      title: 'New discussion post',
      message: 'Jamie Lee started "Best Practices for Onboarding" in Design Hub',
      time: '3 days ago',
      read: true,
      icon: Users,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      cta: { label: 'View Discussion', action: 'view_discussion' }
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Filter logic
  const filteredNotifications = notifications.filter(n => {
    // Read/unread filter
    if (filter === 'unread' && n.read) return false;
    
    // Type filter
    if (typeFilter !== 'all' && n.type !== typeFilter) return false;
    
    // Time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      const notifDate = n.timestamp;
      const diffMs = now.getTime() - notifDate.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      const diffDays = diffHours / 24;
      
      if (timeFilter === 'today' && diffHours > 24) return false;
      if (timeFilter === 'week' && diffDays > 7) return false;
      if (timeFilter === 'month' && diffDays > 30) return false;
    }
    
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const typeFilterOptions = [
    { id: 'all' as FilterType, label: 'All Types', icon: Bell },
    { id: 'community' as FilterType, label: 'Communities', icon: Users },
    { id: 'course' as FilterType, label: 'Courses', icon: BookOpen },
    { id: 'event' as FilterType, label: 'Events', icon: Calendar },
    { id: 'message' as FilterType, label: 'Messages', icon: MessageSquare },
  ];

  const timeFilterOptions = [
    { id: 'all' as TimeFilter, label: 'All Time' },
    { id: 'today' as TimeFilter, label: 'Today' },
    { id: 'week' as TimeFilter, label: 'This Week' },
    { id: 'month' as TimeFilter, label: 'This Month' },
  ];

  const hasActiveFilters = typeFilter !== 'all' || timeFilter !== 'all';

  if (!isOpen) return null;

  return (
    <div className="bg-card border-l border-border flex flex-col h-full overflow-hidden" style={{ width: '420px' }}>
      {/* Minimal Header */}
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
              <Bell className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="size-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
          >
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>

        {/* Filter Button + Tab Switcher Row */}
        <div className="flex gap-2 items-center">
          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`size-9 rounded-md flex items-center justify-center transition-all hover:bg-accent relative ${
                hasActiveFilters ? 'bg-accent' : ''
              }`}
              title="Filter notifications"
            >
              <Filter className="size-4 text-muted-foreground" />
              {hasActiveFilters && (
                <span className="absolute top-0.5 right-0.5 size-2 bg-primary rounded-full"></span>
              )}
            </button>

            {/* Filter Dropdown */}
            {showFilterMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowFilterMenu(false)}
                />
                <div 
                  className="absolute left-0 top-full mt-2 w-64 bg-popover rounded-lg border border-border p-3 z-20 animate-in fade-in slide-in-from-top-2 duration-200"
                  style={{ transformOrigin: 'top left' }}
                >
                  {/* Type Filter */}
                  <div className="mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Type</p>
                    <div className="space-y-1">
                      {typeFilterOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = typeFilter === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() => {
                              setTypeFilter(option.id);
                              setShowFilterMenu(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all ${
                              isActive
                                ? 'bg-accent text-foreground font-medium'
                                : 'text-muted-foreground hover:bg-accent'
                            }`}
                          >
                            <Icon className="size-4" />
                            {option.label}
                            {isActive && <Check className="size-3.5 ml-auto text-foreground" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="h-px bg-border my-3" />

                  {/* Time Filter */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Time</p>
                    <div className="space-y-1">
                      {timeFilterOptions.map((option) => {
                        const isActive = timeFilter === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() => {
                              setTimeFilter(option.id);
                              setShowFilterMenu(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all ${
                              isActive
                                ? 'bg-accent text-foreground font-medium'
                                : 'text-muted-foreground hover:bg-accent'
                            }`}
                          >
                            {option.label}
                            {isActive && <Check className="size-3.5 ml-auto text-foreground" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Switcher Style Filter Tabs */}
          <div className="flex-1 flex gap-1 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-all ${
                filter === 'all'
                  ? 'bg-card text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bell className="size-4" />
              <span className="text-xs font-medium">All</span>
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-all ${
                filter === 'unread'
                  ? 'bg-card text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-xs font-medium">Unread</span>
              {unreadCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Actions Bar - Only show if there are unread items */}
      {unreadCount > 0 && (
        <div className="px-6 py-3 bg-muted border-b border-border">
          <button
            onClick={markAllAsRead}
            className="text-xs text-foreground hover:text-foreground font-medium transition-colors flex items-center gap-1.5"
          >
            <Check className="size-3.5" />
            Mark all as read
          </button>
        </div>
      )}

      {/* Main Content - Matching Leapy's Spacing */}
      <ScrollArea className="flex-1 px-6 py-6">
        {/* Placeholder State */}
        <div className="text-center py-16">
          <div className="size-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Bell className="size-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-foreground font-medium mb-1">
            Notifications coming soon
          </p>
          <p className="text-xs text-muted-foreground">
            Your updates and alerts will appear here
          </p>
        </div>
      </ScrollArea>

      {/* Footer - Matching Leapy's Input Area Style */}
      <div className="px-6 py-5 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-xl border border-border transition-all">
          <Settings className="size-4" />
          Notification Settings
        </button>
      </div>
    </div>
  );
}
