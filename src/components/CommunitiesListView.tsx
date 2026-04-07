import { useState } from 'react';
import { 
  Users, Search, Filter, Grid3x3, List, Plus, Crown, Shield, Star, Clock, TrendingUp, 
  ChevronRight, Heart, Share2, Copy, MoreVertical, Eye, MessageSquare, Calendar,
  Sparkles, Pin, X, ArrowUpRight, ArrowDownRight, Activity, Target, Zap,
  AlertCircle, CheckCircle2, PlayCircle, Bell, Send, ThumbsUp, UserPlus,
  FileText, Video, BookOpen, TrendingDown, Minus, AlertTriangle, Award, Mail
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth, isEmptyStateUser } from '../contexts/AuthContext';
import { SectionEmptyState } from './SectionEmptyState';

interface Community {
  id: string;
  title: string;
  description: string;
  memberCount: number;
  role?: 'owner' | 'admin' | 'moderator' | 'member';
  status: 'published' | 'draft';
  activityLevel: 'high' | 'medium' | 'low';
  createdAt: string;
  lastActive: string;
  isPinned?: boolean;
  engagementRate?: number;
  weeklyGrowth?: number;
  totalPosts?: number;
  activeToday?: number;
  category?: string;
}

// Mock data with enhanced fields
const mockCommunities: Community[] = [
  {
    id: '1', title: 'React Developers Hub',
    description: 'A community for React developers to share knowledge, collaborate on projects, and stay updated with the latest trends.',
    memberCount: 1247, role: 'owner', status: 'published', activityLevel: 'high',
    createdAt: '2024-01-15', lastActive: '2 hours ago', isPinned: true,
    engagementRate: 78, weeklyGrowth: 12, totalPosts: 342, activeToday: 89, category: 'Technology'
  },
  {
    id: '2', title: 'UI/UX Design Masters',
    description: 'Connect with fellow designers, get feedback on your work, and learn cutting-edge design techniques.',
    memberCount: 892, role: 'admin', status: 'published', activityLevel: 'high',
    createdAt: '2024-02-20', lastActive: '5 hours ago',
    engagementRate: 65, weeklyGrowth: 8, totalPosts: 234, activeToday: 52, category: 'Design'
  },
  {
    id: '3', title: 'Product Management Circle',
    description: 'For product managers looking to level up their skills and connect with industry leaders.',
    memberCount: 456, role: 'moderator', status: 'published', activityLevel: 'medium',
    createdAt: '2024-03-10', lastActive: '1 day ago', isPinned: true,
    engagementRate: 52, weeklyGrowth: 5, totalPosts: 156, activeToday: 23, category: 'Business'
  },
  {
    id: '4', title: 'AI & Machine Learning',
    description: 'Explore the latest in AI, ML, and deep learning with experts and enthusiasts.',
    memberCount: 2341, role: 'member', status: 'published', activityLevel: 'high',
    createdAt: '2024-01-05', lastActive: '30 mins ago',
    engagementRate: 82, weeklyGrowth: 15, totalPosts: 567, activeToday: 134, category: 'Technology'
  },
  {
    id: '5', title: 'Startup Founders Network',
    description: 'Building your startup? Join fellow founders for support, advice, and collaboration opportunities.',
    memberCount: 0, role: 'owner', status: 'draft', activityLevel: 'low',
    createdAt: '2024-04-01', lastActive: 'Never',
    engagementRate: 0, weeklyGrowth: 0, totalPosts: 0, activeToday: 0, category: 'Business'
  },
  {
    id: '6', title: 'Digital Marketing Pros',
    description: 'Master digital marketing strategies, SEO, content marketing, and social media growth.',
    memberCount: 678, status: 'published', activityLevel: 'medium',
    createdAt: '2024-02-14', lastActive: '3 days ago',
    engagementRate: 48, weeklyGrowth: -3, totalPosts: 189, activeToday: 31, category: 'Marketing'
  },
];

// Mock trend data for sparklines
const getTrendData = (growth: number) => {
  const baseValue = 50;
  const points = 12;
  return Array.from({ length: points }, (_, i) => {
    const progress = i / (points - 1);
    const trend = growth > 0 ? progress * growth * 0.8 : progress * growth * 0.8;
    const smoothNoise = Math.sin(i * 0.5) * 3;
    return { value: baseValue + trend + smoothNoise };
  });
};

type Tab = 'all' | 'my-communities' | 'member-of' | 'moderator' | 'admin' | 'drafts';
type SortOption = 'recent' | 'popular' | 'alphabetical' | 'engagement';

interface CommunitiesListViewProps {
  onCommunityClick: (communityId: string) => void;
  onCreateClick: () => void;
}

// Shared styles
const sidebarCard = "w-full bg-card hover:bg-accent border border-border rounded-lg p-3 text-left transition-colors";
const scheduleBtn = "w-full text-left hover:bg-accent rounded-lg p-2 -mx-2 transition-colors";

export function CommunitiesListView({ onCommunityClick, onCreateClick }: CommunitiesListViewProps) {
  const { currentUser } = useAuth();
  const isEmpty = isEmptyStateUser(currentUser);
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [pinnedCommunities, setPinnedCommunities] = useState<string[]>(isEmpty ? [] : ['1', '3']);

  const sourceCommunities = isEmpty ? [] : mockCommunities;

  // Calculate analytics
  const publishedCommunities = sourceCommunities.filter(c => c.status === 'published');
  const totalMembers = publishedCommunities.reduce((sum, c) => sum + c.memberCount, 0);
  const avgEngagement = publishedCommunities.length ? Math.round(publishedCommunities.reduce((sum, c) => sum + (c.engagementRate || 0), 0) / publishedCommunities.length) : 0;
  const totalPosts = publishedCommunities.reduce((sum, c) => sum + (c.totalPosts || 0), 0);
  const weeklyGrowthRate = publishedCommunities.length ? Math.round(publishedCommunities.reduce((sum, c) => sum + (c.weeklyGrowth || 0), 0) / publishedCommunities.length) : 0;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all', label: 'All Communities', count: sourceCommunities.filter(c => c.status === 'published').length },
    { id: 'my-communities', label: 'My Communities', count: sourceCommunities.filter(c => c.role === 'owner').length },
    { id: 'member-of', label: 'Member Of', count: sourceCommunities.filter(c => c.role && c.status === 'published').length },
    { id: 'moderator', label: 'Moderator', count: sourceCommunities.filter(c => c.role === 'moderator').length },
    { id: 'admin', label: 'Admin', count: sourceCommunities.filter(c => c.role === 'admin').length },
    { id: 'drafts', label: 'Drafts', count: sourceCommunities.filter(c => c.status === 'draft').length },
  ];

  const categories = ['Technology', 'Design', 'Business', 'Marketing'];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const togglePin = (communityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinnedCommunities(prev =>
      prev.includes(communityId) ? prev.filter(id => id !== communityId) : [...prev, communityId]
    );
  };

  const filterCommunities = (communities: Community[]): Community[] => {
    let filtered = communities;
    switch (activeTab) {
      case 'all': filtered = filtered.filter(c => c.status === 'published'); break;
      case 'my-communities': filtered = filtered.filter(c => c.role === 'owner'); break;
      case 'member-of': filtered = filtered.filter(c => c.role && c.status === 'published'); break;
      case 'moderator': filtered = filtered.filter(c => c.role === 'moderator'); break;
      case 'admin': filtered = filtered.filter(c => c.role === 'admin'); break;
      case 'drafts': filtered = filtered.filter(c => c.status === 'draft'); break;
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(c => c.category && selectedCategories.includes(c.category));
    }
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    switch (sortBy) {
      case 'popular': filtered.sort((a, b) => b.memberCount - a.memberCount); break;
      case 'alphabetical': filtered.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'engagement': filtered.sort((a, b) => (b.engagementRate || 0) - (a.engagementRate || 0)); break;
      default: filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }
    return filtered;
  };

  const filteredCommunities = filterCommunities(sourceCommunities);
  const pinnedItems = filteredCommunities.filter(c => pinnedCommunities.includes(c.id));
  const recentItems = filteredCommunities.slice(0, 4);
  const trendingItems = filteredCommunities.filter(c => c.status === 'published').sort((a, b) => (b.weeklyGrowth || 0) - (a.weeklyGrowth || 0)).slice(0, 4);
  const recommendedItems = filteredCommunities.filter(c => c.status === 'published' && !c.role).slice(0, 4);

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'owner': return <Crown className="size-3" />;
      case 'admin': return <Shield className="size-3" />;
      case 'moderator': return <Star className="size-3" />;
      default: return null;
    }
  };

  const getRoleBadge = (role?: string) => {
    if (!role) return null;
    const colors: Record<string, string> = {
      owner: 'bg-primary/10 text-primary border-primary/20',
      admin: 'bg-accent text-accent-foreground border-border',
      moderator: 'bg-chart-1/10 text-chart-1 border-chart-1/20',
      member: 'bg-muted text-muted-foreground border-border',
    };
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${colors[role] || ''}`}>
        {getRoleIcon(role)}
        <span className="capitalize">{role}</span>
      </div>
    );
  };

  const getActivityBadge = (level: string) => {
    const colors: Record<string, string> = {
      high: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-muted text-muted-foreground',
    };
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[level] || ''}`}>
        <TrendingUp className="size-3" />
        <span className="capitalize">{level}</span>
      </div>
    );
  };

  const CommunityCard = ({ community }: { community: Community }) => {
    const isPinned = pinnedCommunities.includes(community.id);
    return (
      <div className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all">
        {/* Pin Button */}
        <button
          onClick={(e) => togglePin(community.id, e)}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-all z-10 ${
            isPinned 
              ? 'bg-primary/10 text-primary' 
              : 'bg-muted text-muted-foreground opacity-0 group-hover:opacity-100'
          }`}
        >
          <Pin className="size-4" />
        </button>

        <button onClick={() => onCommunityClick(community.id)} className="w-full text-left">
          {/* Image Placeholder */}
          <div className="w-full aspect-video bg-primary/10 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
            <Users className="size-8 text-primary/40" />
            {community.status === 'published' && community.activeToday && community.activeToday > 0 && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <div className="size-1.5 bg-white rounded-full animate-pulse" />
                {community.activeToday} active
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2 pr-8">
              <h3 className="text-foreground line-clamp-1">{community.title}</h3>
              {community.status === 'draft' && (
                <Badge variant="outline" className="bg-muted text-muted-foreground border-border flex-shrink-0">Draft</Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>

            <div className="flex items-center gap-2 flex-wrap">
              {community.role && getRoleBadge(community.role)}
              {community.status === 'published' && getActivityBadge(community.activityLevel)}
              {community.category && (
                <Badge variant="outline" className="bg-muted text-muted-foreground">{community.category}</Badge>
              )}
            </div>

            {community.status === 'published' && (
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Users className="size-3" /><span>Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{community.memberCount.toLocaleString()}</span>
                    {community.weeklyGrowth !== undefined && community.weeklyGrowth !== 0 && (
                      <span className={`text-xs flex items-center gap-0.5 ${community.weeklyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {community.weeklyGrowth > 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                        {Math.abs(community.weeklyGrowth)}%
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Activity className="size-3" /><span>Engagement</span>
                  </div>
                  <div className="font-semibold text-foreground">{community.engagementRate}%</div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="size-4" /><span>{community.lastActive}</span>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </div>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-4 right-4 p-1.5 rounded-lg bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
            >
              <MoreVertical className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}><Eye className="size-4 mr-2" />Quick Preview</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}><Share2 className="size-4 mr-2" />Share Link</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}><Copy className="size-4 mr-2" />Duplicate</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}><Heart className="size-4 mr-2" />Add to Favorites</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  // Analytics card helper
  const AnalyticsCard = ({ icon: Icon, value, label, growth, trendGrowth }: { icon: any; value: string; label: string; growth: string; trendGrowth: number }) => (
    <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/20 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="size-5 text-primary" />
        </div>
        <div style={{ width: 80, height: 40 }}>
          <ResponsiveContainer width={80} height={40}>
            <LineChart data={getTrendData(trendGrowth)}>
              <Line type="natural" dataKey="value" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-xs flex items-center gap-1 text-green-600">
          <ArrowUpRight className="size-3" />{growth}
        </div>
      </div>
    </div>
  );

  // Section header helper
  const SectionHeader = ({ icon: Icon, title, iconColor = 'text-primary' }: { icon: any; title: string; iconColor?: string }) => (
    <div className="flex items-center gap-2 mb-4">
      <Icon className={`size-4 ${iconColor}`} />
      <h2 className="font-semibold text-foreground">{title}</h2>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Hero Analytics Section */}
      <div className="bg-card border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-0">
          {/* ── Row 1: Title + Create buttons ── */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="min-w-0">
              <h1 className="text-foreground font-semibold text-2xl">Communities</h1>
              <p className="text-sm text-muted-foreground mt-1">Build, manage, and grow your communities</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" onClick={onCreateClick} className="rounded-lg shadow-none h-9 border-border text-foreground hover:bg-accent">
                <Plus className="size-4 mr-1.5" />
                <span className="hidden sm:inline">Create</span>
              </Button>
              <Button onClick={onCreateClick} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none h-9">
                <Sparkles className="size-4 mr-1.5" />
                <span className="hidden sm:inline">Create with AI</span>
                <span className="sm:hidden">AI</span>
              </Button>
            </div>
          </div>

          {/* ── Row 2: Compact Stats Bar ── */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="size-3.5" />
              <span className="font-medium text-foreground">{publishedCommunities.length}</span>
              <span>communities</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Target className="size-3.5" />
              <span className="font-medium text-foreground">{totalMembers.toLocaleString()}</span>
              <span>members</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Zap className="size-3.5" />
              <span className="font-medium text-foreground">{avgEngagement}%</span>
              <span>engagement</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MessageSquare className="size-3.5" />
              <span className="font-medium text-foreground">{totalPosts.toLocaleString()}</span>
              <span>posts</span>
            </div>
            {weeklyGrowthRate !== 0 && (
              <>
                <div className="h-4 w-px bg-border" />
                <div className={`flex items-center gap-1 text-xs font-medium ${weeklyGrowthRate >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {weeklyGrowthRate >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {Math.abs(weeklyGrowthRate)}% this week
                </div>
              </>
            )}
          </div>

          {/* ── Row 3: Search + Filter/Sort/View ── */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search communities, topics, members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9 pr-4 w-full bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer">
                  <X className="size-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`h-9 px-3 flex items-center gap-1.5 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                selectedCategories.length > 0 || showFilters
                  ? 'bg-primary/10 text-primary border-primary/30'
                  : 'bg-card text-muted-foreground border-border hover:bg-accent'
              }`}
            >
              <Filter className="size-3.5" />
              <span className="hidden sm:inline">Filter</span>
              {selectedCategories.length > 0 && (
                <span className="size-5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
                  {selectedCategories.length}
                </span>
              )}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 px-3 flex items-center gap-1.5 text-sm font-medium rounded-lg border bg-card text-muted-foreground border-border hover:bg-accent transition-colors cursor-pointer">
                  <Activity className="size-3.5" />
                  <span className="hidden sm:inline">Sort</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {[
                  { value: 'recent' as SortOption, label: 'Most Recent', icon: Clock },
                  { value: 'popular' as SortOption, label: 'Most Popular', icon: Users },
                  { value: 'alphabetical' as SortOption, label: 'Alphabetical', icon: FileText },
                  { value: 'engagement' as SortOption, label: 'Highest Engagement', icon: TrendingUp },
                ].map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={sortBy === opt.value ? 'bg-primary/10 text-primary' : ''}
                  >
                    <opt.icon className="size-4 mr-2" />{opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center p-0.5 bg-muted rounded-lg border border-border/50 h-9">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <Grid3x3 className="size-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all cursor-pointer ${viewMode === 'list' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <List className="size-4" />
              </button>
            </div>
          </div>

          {/* Inline active filter chips */}
          {selectedCategories.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-xs text-muted-foreground mr-1">Active:</span>
              {selectedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20 hover:bg-primary/15 transition-colors cursor-pointer"
                >
                  {cat}
                  <X className="size-3" />
                </button>
              ))}
              <button onClick={() => setSelectedCategories([])} className="text-xs text-muted-foreground hover:text-foreground ml-1 cursor-pointer">
                Clear all
              </button>
            </div>
          )}

          {/* Filter panel dropdown */}
          {showFilters && (
            <div className="mb-4 p-4 bg-muted/50 rounded-xl border border-border">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        selectedCategories.includes(category)
                          ? 'bg-primary/10 text-primary border border-primary/30'
                          : 'bg-card border border-border text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Row 4: Tab bar (inline) ── */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - 2/3 + 1/3 Layout */}
      <div className="flex-1 overflow-hidden flex">
        {/* LEFT SIDE - Communities (2/3) */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {pinnedItems.length > 0 && activeTab === 'all' && (
            <div className="mb-8">
              <SectionHeader icon={Pin} title="Pinned Communities" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pinnedItems.map((c) => <CommunityCard key={c.id} community={c} />)}
              </div>
            </div>
          )}

          {recentItems.length > 0 && activeTab === 'all' && (
            <div className="mb-8">
              <SectionHeader icon={Clock} title="Recent Activity" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recentItems.slice(0, 2).map((c) => <CommunityCard key={`recent-${c.id}`} community={c} />)}
              </div>
            </div>
          )}

          {trendingItems.length > 0 && activeTab === 'all' && (
            <div className="mb-8">
              <SectionHeader icon={TrendingUp} title="Trending Now" iconColor="text-green-600" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trendingItems.slice(0, 2).map((c) => <CommunityCard key={`trending-${c.id}`} community={c} />)}
              </div>
            </div>
          )}

          {recommendedItems.length > 0 && activeTab === 'all' && (
            <div className="mb-8">
              <SectionHeader icon={Sparkles} title="Recommended for You" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recommendedItems.slice(0, 2).map((c) => <CommunityCard key={`recommended-${c.id}`} community={c} />)}
              </div>
            </div>
          )}

          {isEmpty && activeTab === 'all' && (
            <SectionEmptyState
              icon={Users}
              title="No communities yet"
              description="Build a space for your audience to connect, discuss, and learn together. Communities are the heart of LeapSpace."
              actionLabel="Build Your First Community"
              onAction={onCreateClick}
              hint="AI can help you set up channels, roles, and onboarding flows"
            />
          )}

          {activeTab !== 'all' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">{tabs.find(t => t.id === activeTab)?.label}</h2>
                <span className="text-sm text-muted-foreground">{filteredCommunities.length} results</span>
              </div>
              {filteredCommunities.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Users className="size-12 text-muted-foreground/40 mb-4" />
                  <h3 className="text-foreground mb-2">No communities found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery ? 'Try adjusting your search or filters' : activeTab === 'drafts' ? "You don't have any draft communities" : 'Get started by creating your first community'}
                  </p>
                  {activeTab !== 'all' && !searchQuery && (
                    <Button onClick={onCreateClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Plus className="size-4 mr-2" />Create Community
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredCommunities.map((c) => <CommunityCard key={c.id} community={c} />)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR - Actionable Items (1/3) */}
        <div className="w-[420px] border-l border-border bg-card overflow-auto">
          <div className="p-6 space-y-6">
            {isEmpty ? (
              <>
                {/* Empty sidebar: Getting Started */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Getting Started</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Users, title: 'Create a community', detail: 'Set up discussion channels, roles, and invite members' },
                      { icon: MessageSquare, title: 'Start a discussion', detail: 'Post your first topic to spark conversation' },
                      { icon: Calendar, title: 'Schedule an event', detail: 'Host a live session for your community' },
                      { icon: BookOpen, title: 'Launch a course', detail: 'Share knowledge with structured lessons' },
                    ].map((item) => (
                      <button key={item.title} className={sidebarCard} onClick={onCreateClick}>
                        <div className="flex items-start gap-3">
                          <item.icon className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground mb-0.5">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.detail}</div>
                          </div>
                          <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Today's Schedule</h3>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Calendar className="size-8 text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">Nothing scheduled today</p>
                  </div>
                </div>
              </>
            ) : (
            <>
            {/* Needs Attention */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-foreground">Needs Attention</h3>
                <span className="text-xs text-muted-foreground ml-auto">5 items</span>
              </div>
              <div className="space-y-2">
                {[
                  { icon: Video, title: 'React 18 Workshop', detail: 'Starts in 45 min \u2022 87/100 attendees' },
                  { icon: MessageSquare, title: '12 unanswered questions', detail: 'Over 24 hours old' },
                  { icon: UserPlus, title: '8 pending approvals', detail: 'Product Management Circle' },
                  { icon: AlertCircle, title: 'Low activity in Marketing Pros', detail: 'No posts in 3 days' },
                ].map((item) => (
                  <button key={item.title} className={sidebarCard}>
                    <div className="flex items-start gap-3">
                      <item.icon className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground mb-1">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.detail}</div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-foreground">Today's Schedule</h3>
                <span className="text-xs text-muted-foreground ml-auto">Dec 18</span>
              </div>
              <div className="space-y-3">
                {[
                  { time: '2:00 PM', label: 'Now', title: 'React 18 Deep Dive', detail: '87/100 attendees' },
                  { time: '4:00 PM', label: 'in 2h', title: 'Design Critique', detail: 'Office Hours \u2022 23 registered' },
                  { time: '6:00 PM', label: 'in 4h', title: 'Weekly React Tips', detail: 'Scheduled Post' },
                ].map((item, idx) => (
                  <div key={item.title}>
                    {idx > 0 && <div className="border-t border-border mb-3" />}
                    <button className={scheduleBtn}>
                      <div className="flex gap-3">
                        <div className="text-center flex-shrink-0 w-16">
                          <div className="text-sm font-semibold text-foreground">{item.time}</div>
                          <div className="text-xs text-muted-foreground">{item.label}</div>
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="text-sm font-medium text-foreground mb-0.5">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.detail}</div>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-foreground">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                {[
                  { icon: Mail, title: 'Welcome 12 new members', detail: 'React Developers Hub' },
                  { icon: MessageSquare, title: 'Reply to trending topics', detail: '3 hot discussions' },
                  { icon: Pin, title: 'Pin TypeScript guide', detail: '150+ upvotes in React Hub' },
                ].map((item) => (
                  <button key={item.title} className={sidebarCard}>
                    <div className="flex items-start gap-3">
                      <item.icon className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground mb-0.5">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.detail}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Community Health */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-foreground">Community Health</h3>
              </div>
              <div className="space-y-2">
                {[
                  { title: 'React Developers Hub', dot: 'bg-green-500', stat1: { label: 'Members', value: '1,247' }, stat2: { label: 'Engagement', value: '78%' } },
                  { title: 'PM Circle', dot: 'bg-yellow-500', stat1: { label: 'Members', value: '456' }, stat2: { label: 'Engagement', value: '52%' } },
                  { title: 'Marketing Pros', dot: 'bg-red-500', stat1: { label: 'Members', value: '678' }, stat2: { label: 'Last post', value: '3 days ago' } },
                ].map((item) => (
                  <button key={item.title} className={sidebarCard}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-foreground">{item.title}</div>
                      <div className={`size-2 ${item.dot} rounded-full`} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-muted-foreground">{item.stat1.label}</div>
                        <div className="font-semibold text-foreground">{item.stat1.value}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">{item.stat2.label}</div>
                        <div className="font-semibold text-foreground">{item.stat2.value}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}