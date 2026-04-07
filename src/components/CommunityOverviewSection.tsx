import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import {
  Users, Hash, BookOpen, Calendar, TrendingUp, TrendingDown,
  Activity, UserPlus, Eye, Share2, Settings, MessageSquare,
  Zap, Edit, CheckCircle, Upload, Wand2, Copy, ExternalLink,
  BarChart3, Star, Target, Clock, ArrowUpRight, Plus,
  Heart, MessageCircle, Pin, MoreVertical, Sparkles
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  status: string;
  role: string;
  avatar: string;
  level: number;
  points: number;
  title: string;
}

interface Post {
  id: string;
  author: Member;
  content: string;
  timestamp: string;
  channel: string;
  reactions: Array<{ emoji: string; count: number; reacted: boolean }>;
  replies: Array<{ author: Member; preview: string }>;
  isPinned: boolean;
}

interface CommunityOverviewSectionProps {
  communityName: string;
  communityDescription?: string;
  memberCount: number;
  channelCount: number;
  courseCount: number;
  eventCount: number;
  onlineCount: number;
  engagementScore: number;
  growthRate: number;
  weeklyActiveMembers: number;
  recentPosts: Post[];
  topMembers: Member[];
  onNavigate: (tab: string) => void;
  onInviteMembers?: () => void;
  onCreateChannel?: () => void;
  onCreateCourse?: () => void;
  onCreateEvent?: () => void;
}

export function CommunityOverviewSection({
  communityName,
  communityDescription,
  memberCount,
  channelCount,
  courseCount,
  eventCount,
  onlineCount,
  engagementScore,
  growthRate,
  weeklyActiveMembers,
  recentPosts,
  topMembers,
  onNavigate,
  onInviteMembers,
  onCreateChannel,
  onCreateCourse,
  onCreateEvent,
}: CommunityOverviewSectionProps) {

  const retentionRate = 87;
  const postsThisWeek = 42;
  const postsChange = 12;

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Members', value: memberCount, icon: Users, change: `+${growthRate}%`, positive: true, onClick: () => onNavigate('members') },
          { label: 'Online Now', value: onlineCount, icon: Activity, change: null, positive: true, onClick: () => onNavigate('members') },
          { label: 'Posts This Week', value: postsThisWeek, icon: MessageSquare, change: `+${postsChange}%`, positive: true, onClick: () => onNavigate('channels') },
          { label: 'Engagement Score', value: `${engagementScore}/100`, icon: Target, change: '+5 pts', positive: true, onClick: () => onNavigate('analytics') },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={stat.onClick}
            className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary/20 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              {stat.change && (
                <span className={`text-[10px] font-medium ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-foreground text-lg">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Main Content Grid — 2 + 1 layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column — Main Info */}
        <div className="col-span-2 space-y-6">

          {/* Community Info Card */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-none">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground flex items-center gap-2 font-semibold">
                <Activity className="size-5 text-primary" />
                Community Overview
              </h3>
              <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/5 rounded-lg font-semibold">
                <Wand2 className="size-3.5 mr-2" />
                AI Insights
              </Button>
            </div>

            {communityDescription && (
              <div className="mb-5">
                <label className="text-sm font-semibold text-foreground block mb-2">About</label>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {communityDescription}
                </p>
              </div>
            )}

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-normal mb-1">Weekly Active</p>
                <p className="text-foreground text-lg">{weeklyActiveMembers}</p>
                <p className="text-[10px] text-green-600 font-medium mt-0.5">
                  {Math.round((weeklyActiveMembers / memberCount) * 100)}% of members
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-normal mb-1">Retention</p>
                <p className="text-foreground text-lg">{retentionRate}%</p>
                <p className="text-[10px] text-green-600 font-medium mt-0.5">+2% vs last month</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-normal mb-1">Growth</p>
                <p className="text-foreground text-lg">+{growthRate}%</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-0.5">This month</p>
              </div>
            </div>
          </div>

          {/* Content Snapshot */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-none">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground flex items-center gap-2 font-semibold">
                <BarChart3 className="size-5 text-primary" />
                Content Snapshot
              </h3>
              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground rounded-lg font-semibold" onClick={() => onNavigate('analytics')}>
                View Analytics
                <ArrowUpRight className="size-3.5 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => onNavigate('channels')} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors text-left group">
                <div className="size-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Hash className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{channelCount} Channels</p>
                  <p className="text-[10px] text-muted-foreground">3 active today</p>
                </div>
                <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => onNavigate('courses')} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors text-left group">
                <div className="size-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{courseCount} Courses</p>
                  <p className="text-[10px] text-muted-foreground">2 in progress</p>
                </div>
                <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => onNavigate('events')} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors text-left group">
                <div className="size-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{eventCount} Events</p>
                  <p className="text-[10px] text-muted-foreground">1 upcoming</p>
                </div>
                <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button onClick={() => onNavigate('members')} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors text-left group">
                <div className="size-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{memberCount} Members</p>
                  <p className="text-[10px] text-muted-foreground">{onlineCount} online now</p>
                </div>
                <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-none">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground flex items-center gap-2 font-semibold">
                <MessageCircle className="size-5 text-primary" />
                Recent Activity
              </h3>
              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground rounded-lg font-semibold" onClick={() => onNavigate('channels')}>
                View All
                <ArrowUpRight className="size-3.5 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="flex gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition-colors">
                  <img src={post.author.avatar} alt={post.author.name} className="size-9 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-foreground font-medium truncate">{post.author.name}</span>
                      {post.isPinned && <Pin className="size-3 text-muted-foreground" />}
                      <span className="text-[10px] text-muted-foreground ml-auto flex-shrink-0">{post.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Hash className="size-3" />
                        {post.channel}
                      </span>
                      {post.reactions.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                          {post.reactions.reduce((sum, r) => sum + r.count, 0)} reactions
                        </span>
                      )}
                      {post.replies.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                          {post.replies.length} replies
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Contributors */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-none">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground flex items-center gap-2 font-semibold">
                <Star className="size-5 text-primary" />
                Top Contributors
              </h3>
              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground rounded-lg font-semibold" onClick={() => onNavigate('members')}>
                All Members
                <ArrowUpRight className="size-3.5 ml-1" />
              </Button>
            </div>

            <div className="space-y-2">
              {topMembers.slice(0, 5).map((member, i) => (
                <div key={member.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors">
                  <span className="text-xs text-muted-foreground w-5 text-center font-medium">#{i + 1}</span>
                  <img src={member.avatar} alt={member.name} className="size-8 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{member.name}</p>
                    <p className="text-[10px] text-muted-foreground">{member.title}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm text-foreground font-medium">{member.points}</p>
                    <p className="text-[10px] text-muted-foreground">points</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-none rounded-lg shadow-none text-[10px] flex-shrink-0"
                  >
                    Lv.{member.level}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-none">
            <h3 className="text-foreground text-sm font-semibold mb-4 uppercase tracking-normal">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none font-semibold"
                onClick={onInviteMembers}
              >
                <UserPlus className="size-4 mr-2" />
                Invite Members
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground"
                onClick={onCreateChannel}
              >
                <Hash className="size-4 mr-2 text-muted-foreground" />
                Create Channel
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground"
                onClick={onCreateCourse}
              >
                <BookOpen className="size-4 mr-2 text-muted-foreground" />
                Add Course
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground"
                onClick={onCreateEvent}
              >
                <Calendar className="size-4 mr-2 text-muted-foreground" />
                Create Event
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground"
              >
                <Share2 className="size-4 mr-2 text-muted-foreground" />
                Share Community
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground"
                onClick={() => onNavigate('settings')}
              >
                <Settings className="size-4 mr-2 text-muted-foreground" />
                Settings
              </Button>
            </div>
          </div>

          {/* Community Health */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 shadow-none">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="size-5 text-primary" />
              <h3 className="text-foreground text-sm font-semibold">Community Health</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-semibold">OVERALL SCORE</span>
                  <span className="text-sm font-bold text-primary">{engagementScore}/100</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${engagementScore}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-primary/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Member Retention</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">{retentionRate}%</span>
                    <TrendingUp className="size-3 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Growth Rate</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">{growthRate}%</span>
                    <TrendingUp className="size-3 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Active Ratio</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      {Math.round((weeklyActiveMembers / memberCount) * 100)}%
                    </span>
                    <TrendingUp className="size-3 text-green-600" />
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="w-full mt-3 border-primary/20 bg-card hover:bg-primary/5 rounded-lg text-primary font-semibold"
                onClick={() => onNavigate('analytics')}
              >
                <BarChart3 className="size-3.5 mr-2" />
                Full Analytics
              </Button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground text-sm font-semibold">Upcoming Events</h3>
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs rounded-lg font-semibold text-muted-foreground" onClick={() => onNavigate('events')}>
                View All
              </Button>
            </div>

            {eventCount > 0 ? (
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="size-3.5 text-primary" />
                    <span className="text-sm text-foreground font-medium">Community Call</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground ml-5.5">Tomorrow, 3:00 PM EST</p>
                  <div className="flex items-center gap-2 mt-2 ml-5.5">
                    <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-none shadow-none rounded-lg">
                      24 RSVPs
                    </Badge>
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="size-3.5 text-primary" />
                    <span className="text-sm text-foreground font-medium">Design Workshop</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground ml-5.5">Fri, Mar 20, 2:00 PM</p>
                  <div className="flex items-center gap-2 mt-2 ml-5.5">
                    <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-none shadow-none rounded-lg">
                      12 RSVPs
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-muted-foreground mb-2">No upcoming events</p>
                <Button size="sm" variant="outline" className="text-xs border-border rounded-lg" onClick={onCreateEvent}>
                  <Plus className="size-3 mr-1" />
                  Create Event
                </Button>
              </div>
            )}
          </div>

          {/* AI Suggestions */}
          <div className="bg-card border border-primary/10 rounded-xl p-5 shadow-none">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="size-4 text-primary" />
              <h3 className="text-foreground text-sm font-semibold">AI Suggestions</h3>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs text-foreground/80">
                  4 members haven't been active in 7+ days. Send a re-engagement nudge?
                </p>
                <Button size="sm" className="mt-2 h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground shadow-none">
                  Send Nudge
                </Button>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs text-foreground/80">
                  Your best posting time is Tue/Thu 2-4 PM. Schedule a post?
                </p>
                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-primary/20 text-primary">
                  Schedule Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}