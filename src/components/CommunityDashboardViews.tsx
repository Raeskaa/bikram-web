import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  Calendar, UsersIcon, Activity, UserPlus, AlertCircle, Search, Filter, 
  Trophy, Star, Shield, MoreVertical, MessageCircle, Eye, UserMinus,
  TrendingUp, GraduationCap, Heart, Brain, Target, Plus, Upload,
  ImageIcon, Link, Check, X, Edit, Trash2, BarChart3, Mail, PlayCircle,
  Clock, Video, MapPin, Phone, Wand2, Settings, Palette, Zap, Globe,
  ChevronRight, CheckCircle
} from 'lucide-react';

import { useState } from 'react';

// Sample data types
interface Member {
  id: string;
  name: string;
  status: string;
  role: string;
  avatar: string;
  level: number;
  points: number;
  title: string;
  joinDate: string;
  bio: string;
  expertise: string[];
  sentiment: string;
  churnRisk: number;
  contributorScore: number;
}

interface Post {
  id: string;
  author: Member;
  content: string;
  timestamp: string;
  channel: string;
  reactions: Array<{ emoji: string; count: number; reacted: boolean }>;
  replies: Array<{ author: Member; preview: string }>;
  hasImage: boolean;
  isPinned: boolean;
  aiScore: number;
  sentiment: string;
}

interface AnalyticsProps {
  userRole: string;
  samplePosts: Post[];
}

interface SettingsProps {
  userRole: string;
  communityData: { title?: string };
  onNavigateToIntegrations?: () => void;
}

interface EventsProps {
  userRole: string;
}

export function AnalyticsView({ userRole, samplePosts }: AnalyticsProps) {
  const canAccessAnalytics = userRole === 'admin' || userRole === 'moderator';
  
  if (!canAccessAnalytics) return null;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground">Analytics</h2>
            <p className="text-sm text-muted-foreground mt-1">Track your community's performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="size-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Members</span>
                <UsersIcon className="size-4 text-purple-600" />
              </div>
              <p className="text-2xl text-foreground mb-1">128</p>
              <p className="text-xs text-green-600">↑ 12% vs last month</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Engagement Rate</span>
                <Activity className="size-4 text-blue-600" />
              </div>
              <p className="text-2xl text-foreground mb-1">68%</p>
              <p className="text-xs text-green-600">↑ 5% vs last month</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Active Courses</span>
                <GraduationCap className="size-4 text-orange-600" />
              </div>
              <p className="text-2xl text-foreground mb-1">5</p>
              <p className="text-xs text-muted-foreground">2 published</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Revenue (MTD)</span>
                <TrendingUp className="size-4 text-emerald-600" />
              </div>
              <p className="text-2xl text-foreground mb-1">$12.4k</p>
              <p className="text-xs text-green-600">↑ 23% vs last month</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Member Growth Chart */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm text-foreground mb-4">Member Growth</h3>
              <div className="h-48 flex items-end justify-around gap-2">
                {[45, 52, 48, 63, 71, 68, 78, 85, 92, 98, 105, 128].map((value, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-purple-200 rounded-t" style={{ height: `${(value / 128) * 100}%` }}>
                      <div className="w-full bg-purple-600 rounded-t h-1/2" />
                    </div>
                    <span className="text-xs text-muted-foreground">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][idx]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Chart */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm text-foreground mb-4">Weekly Engagement</h3>
              <div className="h-48 flex items-end justify-around gap-2">
                {[65, 72, 68, 75, 71, 68, 78].map((value, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-blue-200 rounded-t" style={{ height: `${value}%` }}>
                      <div className="w-full bg-blue-600 rounded-t h-1/2" />
                    </div>
                    <span className="text-xs text-muted-foreground">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Performance */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-sm text-foreground mb-4">Top Performing Posts</h3>
            <div className="space-y-3">
              {samplePosts.slice(0, 3).map((post, idx) => (
                <div key={post.id} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-center size-8 bg-muted rounded text-sm text-muted-foreground">
                    #{idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{post.content}</p>
                    <p className="text-xs text-muted-foreground">by {post.author.name} • {post.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="size-4" />
                      <span>{post.reactions.reduce((sum, r) => sum + r.count, 0)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="size-4" />
                      <span>{post.replies.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="size-4" />
                      <span>{post.aiScore}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Completion */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-sm text-foreground mb-4">Course Completion Rates</h3>
            <div className="space-y-3">
              {[
                { name: 'Web Development Bootcamp', completion: 72 },
                { name: 'Digital Marketing Fundamentals', completion: 85 },
                { name: 'UI/UX Design Masterclass', completion: 56 }
              ].map((course, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{course.name}</span>
                    <span className="text-muted-foreground">{course.completion}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${course.completion}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          {userRole === 'admin' && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="size-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="size-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-foreground mb-1">AI Insights & Predictions</h3>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-start gap-2 text-sm">
                      <TrendingUp className="size-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-foreground">Engagement spike predicted for Thursday 2-4 PM</p>
                        <p className="text-xs text-muted-foreground">Best time to post announcements this week</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <AlertCircle className="size-4 text-orange-600 mt-0.5" />
                      <div>
                        <p className="text-foreground">8 members at risk of churning</p>
                        <p className="text-xs text-muted-foreground">Consider personalized re-engagement campaign</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Target className="size-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-foreground">Community health trending toward 85/100</p>
                        <p className="text-xs text-muted-foreground">On track to meet monthly goals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SettingsView({ userRole, communityData, onNavigateToIntegrations }: SettingsProps) {
  const canAccessSettings = userRole === 'admin' || userRole === 'moderator';
  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'permissions' | 'ai-autopilot' | 'integrations'>('general');
  
  if (!canAccessSettings) return null;

  const tabs = [
    { id: 'general' as const, label: 'General', icon: Settings },
    { id: 'branding' as const, label: 'Branding', icon: Palette },
    { id: 'permissions' as const, label: 'Permissions & Roles', icon: Shield },
    { id: 'ai-autopilot' as const, label: 'AI Autopilot', icon: Zap },
    { id: 'integrations' as const, label: 'Integrations', icon: Globe },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <h2 className="text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your community configuration</p>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border px-6">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-purple-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="size-4" />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto bg-muted">
        <div className="p-6">
          <div className="max-w-4xl space-y-6">
            {/* General Tab */}
            {activeTab === 'general' && (
              <>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm text-foreground mb-4">General Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-foreground mb-1 block">Community Name</label>
                      <input
                        type="text"
                        defaultValue={communityData.title || 'Design Professionals Hub'}
                        className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-foreground mb-1 block">Description</label>
                      <Textarea
                        defaultValue="A community for design professionals to learn, share, and grow together."
                        className="w-full resize-none"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-foreground mb-1 block">Privacy</label>
                      <select className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Public - Anyone can join</option>
                        <option>Private - Invite only</option>
                        <option>Hidden - Not discoverable</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-foreground mb-1 block">Category</label>
                      <select className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Design</option>
                        <option>Technology</option>
                        <option>Business</option>
                        <option>Marketing</option>
                        <option>Education</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Monetization */}
                {userRole === 'admin' && (
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="text-sm text-foreground mb-4">Monetization</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-foreground mb-1 block">Membership Fee</label>
                        <div className="flex items-center gap-2">
                          <select className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option>Free</option>
                            <option>One-time</option>
                            <option>Monthly</option>
                            <option>Yearly</option>
                          </select>
                          <input
                            type="number"
                            placeholder="0.00"
                            className="flex-1 px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-foreground mb-1 block">Payment Provider</label>
                        <select className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                          <option>Stripe</option>
                          <option>PayPal</option>
                          <option>Razorpay</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Branding Tab */}
            {activeTab === 'branding' && (
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm text-foreground mb-4">Branding</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Community Logo</label>
                    <div className="flex items-center gap-4">
                      <div className="size-16 bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="size-6 text-muted-foreground" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="size-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Header Image</label>
                    <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                      <ImageIcon className="size-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="size-4 mr-2" />
                      Upload Header
                    </Button>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-purple-600 rounded-lg border border-border" />
                      <input
                        type="text"
                        defaultValue="#420D74"
                        className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-foreground mb-2 block">Accent Color</label>
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-blue-600 rounded-lg border border-border" />
                      <input
                        type="text"
                        defaultValue="#3B82F6"
                        className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Permissions Tab */}
            {activeTab === 'permissions' && userRole === 'admin' && (
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm text-foreground mb-4">Permissions & Roles</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Members can create posts</p>
                      <p className="text-xs text-muted-foreground">Allow all members to post in channels</p>
                    </div>
                    <button className="size-10 bg-primary rounded-lg flex items-center justify-center">
                      <Check className="size-4 text-white" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Members can invite others</p>
                      <p className="text-xs text-muted-foreground">Allow members to send invites</p>
                    </div>
                    <button className="size-10 bg-muted rounded-lg flex items-center justify-center">
                      <X className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Require approval for new members</p>
                      <p className="text-xs text-muted-foreground">Manually approve join requests</p>
                    </div>
                    <button className="size-10 bg-primary rounded-lg flex items-center justify-center">
                      <Check className="size-4 text-white" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Members can create events</p>
                      <p className="text-xs text-muted-foreground">Allow members to create community events</p>
                    </div>
                    <button className="size-10 bg-muted rounded-lg flex items-center justify-center">
                      <X className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Members can create courses</p>
                      <p className="text-xs text-muted-foreground">Allow members to publish courses</p>
                    </div>
                    <button className="size-10 bg-muted rounded-lg flex items-center justify-center">
                      <X className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* AI Autopilot Tab */}
            {activeTab === 'ai-autopilot' && userRole === 'admin' && (
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm text-foreground mb-4">AI Autopilot</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Enable AI suggestions</p>
                      <p className="text-xs text-muted-foreground">Get AI-powered content and moderation suggestions</p>
                    </div>
                    <button className="size-10 bg-primary rounded-lg flex items-center justify-center">
                      <Check className="size-4 text-white" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Auto-moderate content</p>
                      <p className="text-xs text-muted-foreground">Automatically flag inappropriate content</p>
                    </div>
                    <button className="size-10 bg-primary rounded-lg flex items-center justify-center">
                      <Check className="size-4 text-white" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">AI content generation</p>
                      <p className="text-xs text-muted-foreground">Help create posts, courses, and announcements</p>
                    </div>
                    <button className="size-10 bg-primary rounded-lg flex items-center justify-center">
                      <Check className="size-4 text-white" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Auto-respond to common questions</p>
                      <p className="text-xs text-muted-foreground">AI will automatically answer frequently asked questions</p>
                    </div>
                    <button className="size-10 bg-muted rounded-lg flex items-center justify-center">
                      <X className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Smart member engagement</p>
                      <p className="text-xs text-muted-foreground">AI will proactively engage with at-risk members</p>
                    </div>
                    <button className="size-10 bg-primary rounded-lg flex items-center justify-center">
                      <Check className="size-4 text-white" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="text-sm text-foreground">Predictive analytics</p>
                      <p className="text-xs text-muted-foreground">Get insights on member behavior and community trends</p>
                    </div>
                    <button className="size-10 bg-primary rounded-lg flex items-center justify-center">
                      <Check className="size-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && userRole === 'admin' && (
              <>
                {/* Info Banner */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="size-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Globe className="size-5 text-white" />
                        </div>
                        <h3 className="text-lg font-medium">Integration Library</h3>
                      </div>
                      <p className="text-sm text-purple-100 mb-4">
                        Connect your favorite tools and automate your workflow. Browse 50+ integrations across multiple categories.
                      </p>
                      <Button 
                        onClick={() => onNavigateToIntegrations?.()}
                        className="bg-white text-purple-600 hover:bg-purple-50"
                        size="sm"
                      >
                        Browse All Integrations
                        <ChevronRight className="size-4 ml-1" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold mb-1">50+</div>
                      <div className="text-sm text-purple-200">Available</div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Connected Integrations</p>
                      <p className="text-2xl text-foreground">2 <span className="text-sm text-muted-foreground">/ 50+</span></p>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="size-10 bg-muted border-2 border-card rounded-lg flex items-center justify-center">
                          <Link className="size-4 text-muted-foreground" />
                        </div>
                      ))}
                      <div className="size-10 bg-purple-100 border-2 border-card rounded-lg flex items-center justify-center text-xs text-purple-600 font-medium">
                        +48
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connected Integrations */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm text-foreground">Connected</h3>
                    <Badge className="bg-green-100 text-green-700 border-green-200">2 Active</Badge>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Zoom', description: 'Video conferencing for events', connected: true, icon: Video },
                      { name: 'Stripe', description: 'Payment processing', connected: true, icon: Star },
                    ].map((integration, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <integration.icon className="size-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-foreground font-medium">{integration.name}</p>
                            <p className="text-xs text-muted-foreground">{integration.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <CheckCircle className="size-3 mr-1" />
                            Connected
                          </Badge>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Integrations */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm text-foreground">Recommended for You</h3>
                    <button 
                      onClick={() => onNavigateToIntegrations?.()}
                      className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                    >
                      View All
                      <ChevronRight className="size-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { name: 'Slack', description: 'Team communication', category: 'Communication', popular: true },
                      { name: 'Mailchimp', description: 'Email marketing', category: 'Marketing', popular: true },
                      { name: 'Google Calendar', description: 'Event sync', category: 'Productivity', popular: false },
                    ].map((integration, idx) => (
                      <div key={idx} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <div className="size-10 bg-muted rounded-lg flex items-center justify-center">
                            <Link className="size-4 text-muted-foreground" />
                          </div>
                          {integration.popular && (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">Popular</Badge>
                          )}
                        </div>
                        <p className="text-sm text-foreground font-medium mb-1">{integration.name}</p>
                        <p className="text-xs text-muted-foreground mb-3">{integration.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{integration.category}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onNavigateToIntegrations?.()}
                          >
                            Connect
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventsView({ userRole }: EventsProps) {
  // This is now a simple wrapper - the real implementation is in CommunityEventsView
  // For backwards compatibility, we'll keep showing a basic view here
  
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-foreground">Events</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage community events and gatherings</p>
          </div>
          {(userRole === 'admin' || userRole === 'moderator') && (
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="size-4 mr-2" />
              Create Event
            </Button>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <Calendar className="size-12 text-blue-600 mx-auto mb-3" />
            <h3 className="text-sm text-blue-900 font-medium mb-2">Events Module</h3>
            <p className="text-sm text-blue-700 mb-4">
              The enhanced events module with community integration is available in CommunityEventsView component.
            </p>
            <p className="text-xs text-blue-600">
              Import and use CommunityEventsView for full event management features including:
              sub-channels, RSVP tracking, AI suggestions, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}