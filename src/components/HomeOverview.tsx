import { Users, BookOpen, Calendar, TrendingUp, Activity, Clock, Plus, Video, Sparkles, Mail, Share2, FlaskConical } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth, isEmptyStateUser } from '../contexts/AuthContext';
import { DraftEventsWidget } from './DraftEventsWidget';

interface HomeOverviewProps {
  onCreateClick: () => void;
  onJoinTestMeeting?: () => void;
  onOpenSocialPack?: () => void;
  onOpenNewsletter?: () => void;
  onOpenPhase1Demo?: () => void;
  onContinueBuildingDraft?: (eventId: string) => void;
}

export function HomeOverview({ onCreateClick, onJoinTestMeeting, onOpenSocialPack, onOpenNewsletter, onOpenPhase1Demo, onContinueBuildingDraft }: HomeOverviewProps) {
  const { currentUser } = useAuth();
  const isEmpty = isEmptyStateUser(currentUser);

  const stats = isEmpty
    ? [
        { label: 'Communities', value: '0', icon: Users, change: 'Create your first' },
        { label: 'Courses', value: '0', icon: BookOpen, change: 'Start teaching' },
        { label: 'Events', value: '0', icon: Calendar, change: 'Host an event' },
        { label: 'Total Members', value: '0', icon: TrendingUp, change: 'Invite people' },
      ]
    : [
        { label: 'Communities', value: '12', icon: Users, change: '+3 this month' },
        { label: 'Courses', value: '8', icon: BookOpen, change: '+2 this month' },
        { label: 'Events', value: '15', icon: Calendar, change: '+5 upcoming' },
        { label: 'Total Members', value: '3.2K', icon: TrendingUp, change: '+234 this week' },
      ];

  const recentActivity = isEmpty
    ? []
    : [
        { type: 'community', title: 'React Developers Hub', action: 'New member joined', time: '5 mins ago' },
        { type: 'course', title: 'Master React & TypeScript', action: 'Student completed module 3', time: '1 hour ago' },
        { type: 'event', title: 'React 18 Deep Dive Workshop', action: 'New registration', time: '2 hours ago' },
        { type: 'community', title: 'UI/UX Design Masters', action: 'New discussion post', time: '3 hours ago' },
        { type: 'course', title: 'AI & Machine Learning Bootcamp', action: '5 new enrollments', time: '5 hours ago' },
      ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-foreground">{isEmpty ? 'Welcome to LeapSpace' : 'Welcome back!'}</h1>
            <p className="text-muted-foreground mt-1">
              {isEmpty
                ? 'Your workspace is ready. Create your first community, course, or event to get started.'
                : "Here's what's happening with your content"}
            </p>
          </div>
          <Button
            onClick={onCreateClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="size-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="size-6" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-foreground text-3xl font-semibold">{stat.value}</p>
                <p className="text-muted-foreground text-xs">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Draft Events Widget — shown between stats and activity when user has drafts */}
        {!isEmpty && onContinueBuildingDraft && (
          <div className="mb-6">
            <DraftEventsWidget onContinueBuilding={onContinueBuildingDraft} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-foreground">Recent Activity</h2>
              <Activity className="size-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="size-12 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-4">
                    <Activity className="size-5 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">No activity yet</p>
                  <p className="text-muted-foreground/70 text-xs mb-4">
                    Activity from your communities, courses, and events will appear here.
                  </p>
                  <Button variant="outline" size="sm" onClick={onCreateClick}>
                    <Plus className="size-3 mr-1.5" />
                    Create something
                  </Button>
                </div>
              ) : (
                recentActivity.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {item.type === 'community' && <Users className="size-4" />}
                      {item.type === 'course' && <BookOpen className="size-4" />}
                      {item.type === 'event' && <Calendar className="size-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-sm font-medium truncate">{item.title}</p>
                      <p className="text-muted-foreground text-sm">{item.action}</p>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                        <Clock className="size-3" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Coming Soon */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="size-8 text-primary" />
            </div>
            <h3 className="text-foreground mb-2">Analytics Dashboard</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Advanced insights and analytics for all your communities, courses, and events are coming soon!
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-primary/20 rounded-lg text-primary text-sm font-medium">
              <span>Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-card border border-border rounded-xl p-6">
          <h2 className="text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Users, label: 'Create Community', desc: 'Start a new community', onClick: onCreateClick },
              { icon: BookOpen, label: 'Create Course', desc: 'Launch a new course', onClick: onCreateClick },
              { icon: Calendar, label: 'Create Event', desc: 'Plan a new event', onClick: onCreateClick },
            ].map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors">
                  <action.icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">{action.label}</p>
                  <p className="text-muted-foreground text-xs">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Automation Features */}
        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-5 text-primary" />
            <h2 className="text-foreground">Automation Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Share2, label: 'Instant Social Pack', desc: 'AI-generated social media assets', onClick: onOpenSocialPack },
              { icon: Mail, label: 'Auto Newsletter', desc: 'Intelligent email automation', onClick: onOpenNewsletter },
              { icon: FlaskConical, label: 'Phase 1 Demo', desc: 'See the first phase in action', onClick: onOpenPhase1Demo },
            ].map((feat) => (
              <button
                key={feat.label}
                onClick={feat.onClick}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-all text-left group"
              >
                <div className="p-2 bg-primary rounded-lg">
                  <feat.icon className="size-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">{feat.label}</p>
                  <p className="text-muted-foreground text-xs">{feat.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}