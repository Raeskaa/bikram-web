import { useState, useMemo } from 'react';
import {
  Search, ArrowLeft, Clock, Users, DollarSign, Video, MapPin, Layers,
  Code, Mic, Palette, BarChart3, GraduationCap, Briefcase, Coffee,
  Heart, BookOpen, Megaphone, Shield, Globe, Lightbulb, Zap,
  Target, Award, Headphones, MonitorPlay, PenTool, Rocket,
  Eye, Plus, Wand2, ChevronRight, TrendingUp, ArrowUpDown
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

// ─── Template Data ─────────────────────────────────────────────

export interface EventTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  duration: number;
  capacity: number;
  pricing: 'free' | 'paid';
  suggestedPrice?: number;
  format: 'virtual' | 'in-person' | 'hybrid';
  features: string[];
  popular?: boolean;
  usageCount: number;
}

export const ALL_TEMPLATES: EventTemplate[] = [
  // ── Workshops ──
  {
    id: 'workshop-tech',
    name: 'Technical Workshop',
    category: 'workshop',
    description: 'Hands-on technical training with live coding, exercises, and Q&A',
    icon: Code,
    duration: 120,
    capacity: 50,
    pricing: 'paid',
    suggestedPrice: 49,
    format: 'virtual',
    features: ['Live coding', 'Q&A session', 'Recording', 'Certificate'],
    popular: true,
    usageCount: 1247,
  },
  {
    id: 'workshop-design',
    name: 'Design Workshop',
    category: 'workshop',
    description: 'Creative session focused on design principles and hands-on practice',
    icon: Palette,
    duration: 150,
    capacity: 25,
    pricing: 'paid',
    suggestedPrice: 79,
    format: 'virtual',
    features: ['Live design session', 'Feedback', 'Portfolio review'],
    usageCount: 678,
  },
  {
    id: 'workshop-writing',
    name: 'Writing Workshop',
    category: 'workshop',
    description: 'Structured writing exercises with peer review and expert feedback',
    icon: PenTool,
    duration: 90,
    capacity: 20,
    pricing: 'paid',
    suggestedPrice: 39,
    format: 'virtual',
    features: ['Writing prompts', 'Peer review', 'Expert feedback'],
    usageCount: 412,
  },
  {
    id: 'workshop-leadership',
    name: 'Leadership Workshop',
    category: 'workshop',
    description: 'Interactive session on management skills, team dynamics, and decision-making',
    icon: Target,
    duration: 180,
    capacity: 30,
    pricing: 'paid',
    suggestedPrice: 99,
    format: 'hybrid',
    features: ['Case studies', 'Role play', 'Peer coaching', 'Action plan'],
    usageCount: 534,
  },

  // ── Webinars ──
  {
    id: 'webinar-product',
    name: 'Product Webinar',
    category: 'webinar',
    description: 'Live product demonstration with audience interaction and Q&A',
    icon: MonitorPlay,
    duration: 60,
    capacity: 500,
    pricing: 'free',
    format: 'virtual',
    features: ['Screen sharing', 'Polls', 'Q&A', 'Recording'],
    popular: true,
    usageCount: 2891,
  },
  {
    id: 'webinar-thought-leadership',
    name: 'Thought Leadership Webinar',
    category: 'webinar',
    description: 'Expert-led presentation sharing industry insights and trends',
    icon: Lightbulb,
    duration: 45,
    capacity: 1000,
    pricing: 'free',
    format: 'virtual',
    features: ['Expert speaker', 'Slides', 'Q&A', 'Recording'],
    popular: true,
    usageCount: 1823,
  },
  {
    id: 'webinar-panel',
    name: 'Panel Discussion',
    category: 'webinar',
    description: 'Moderated discussion with multiple speakers on a focused topic',
    icon: Users,
    duration: 75,
    capacity: 300,
    pricing: 'free',
    format: 'virtual',
    features: ['Multiple speakers', 'Moderated Q&A', 'Recording'],
    usageCount: 967,
  },
  {
    id: 'webinar-demo-day',
    name: 'Demo Day',
    category: 'webinar',
    description: 'Showcase multiple projects or products in short back-to-back presentations',
    icon: Rocket,
    duration: 90,
    capacity: 200,
    pricing: 'free',
    format: 'virtual',
    features: ['Timed demos', 'Audience voting', 'Q&A', 'Recording'],
    usageCount: 456,
  },

  // ── Networking ──
  {
    id: 'networking-mixer',
    name: 'Networking Mixer',
    category: 'networking',
    description: 'Casual networking event for professionals to connect and share ideas',
    icon: Users,
    duration: 90,
    capacity: 100,
    pricing: 'free',
    format: 'in-person',
    features: ['Icebreakers', 'Name tags', 'Contact exchange'],
    popular: true,
    usageCount: 1543,
  },
  {
    id: 'networking-speed',
    name: 'Speed Networking',
    category: 'networking',
    description: 'Structured rapid-fire introductions with rotating 5-minute conversations',
    icon: Zap,
    duration: 60,
    capacity: 40,
    pricing: 'free',
    format: 'hybrid',
    features: ['Timed rounds', 'Breakout rooms', 'Contact exchange'],
    usageCount: 723,
  },
  {
    id: 'networking-industry',
    name: 'Industry Roundtable',
    category: 'networking',
    description: 'Small-group discussion among peers in the same industry vertical',
    icon: Briefcase,
    duration: 120,
    capacity: 20,
    pricing: 'paid',
    suggestedPrice: 25,
    format: 'in-person',
    features: ['Curated attendees', 'Discussion topics', 'Follow-up intros'],
    usageCount: 389,
  },

  // ── Meetups ──
  {
    id: 'meetup-coffee',
    name: 'Coffee Chat Meetup',
    category: 'meetup',
    description: 'Informal gathering for casual conversations and knowledge sharing',
    icon: Coffee,
    duration: 60,
    capacity: 20,
    pricing: 'free',
    format: 'in-person',
    features: ['Casual conversation', 'Open discussion'],
    usageCount: 832,
  },
  {
    id: 'meetup-book-club',
    name: 'Book Club Meetup',
    category: 'meetup',
    description: 'Monthly book discussion with curated reading list and group conversation',
    icon: BookOpen,
    duration: 90,
    capacity: 15,
    pricing: 'free',
    format: 'hybrid',
    features: ['Reading list', 'Discussion guide', 'Notes shared'],
    usageCount: 267,
  },
  {
    id: 'meetup-hack-night',
    name: 'Hack Night',
    category: 'meetup',
    description: 'Collaborative building session where participants work on projects together',
    icon: Code,
    duration: 180,
    capacity: 30,
    pricing: 'free',
    format: 'in-person',
    features: ['Project pitches', 'Team formation', 'Demos'],
    usageCount: 534,
  },

  // ── Conferences ──
  {
    id: 'conference-virtual',
    name: 'Virtual Conference',
    category: 'conference',
    description: 'Multi-session conference with speakers, panels, and breakout rooms',
    icon: Globe,
    duration: 480,
    capacity: 1000,
    pricing: 'paid',
    suggestedPrice: 199,
    format: 'virtual',
    features: ['Multiple tracks', 'Speakers', 'Breakout rooms', 'Networking'],
    popular: true,
    usageCount: 456,
  },
  {
    id: 'conference-summit',
    name: 'Industry Summit',
    category: 'conference',
    description: 'Full-day in-person summit with keynotes, workshops, and exhibition',
    icon: Award,
    duration: 600,
    capacity: 500,
    pricing: 'paid',
    suggestedPrice: 349,
    format: 'in-person',
    features: ['Keynotes', 'Workshops', 'Exhibition', 'Networking dinner'],
    usageCount: 178,
  },
  {
    id: 'conference-unconference',
    name: 'Unconference',
    category: 'conference',
    description: 'Participant-driven conference where attendees propose and vote on sessions',
    icon: Megaphone,
    duration: 360,
    capacity: 100,
    pricing: 'paid',
    suggestedPrice: 75,
    format: 'in-person',
    features: ['Session voting', 'Open space', 'Lightning talks', 'Retrospective'],
    usageCount: 234,
  },

  // ── Courses ──
  {
    id: 'course-online',
    name: 'Online Course Session',
    category: 'course',
    description: 'Structured learning session as part of a course curriculum',
    icon: GraduationCap,
    duration: 90,
    capacity: 30,
    pricing: 'paid',
    suggestedPrice: 99,
    format: 'virtual',
    features: ['Assignments', 'Certificate', 'Recording', 'Materials'],
    popular: true,
    usageCount: 1789,
  },
  {
    id: 'course-bootcamp',
    name: 'Bootcamp Session',
    category: 'course',
    description: 'Intensive multi-day training with daily sessions and homework',
    icon: Zap,
    duration: 240,
    capacity: 25,
    pricing: 'paid',
    suggestedPrice: 299,
    format: 'virtual',
    features: ['Daily sessions', 'Homework', 'Mentorship', 'Certificate'],
    usageCount: 567,
  },
  {
    id: 'course-masterclass',
    name: 'Masterclass',
    category: 'course',
    description: 'Deep-dive session taught by an industry expert with advanced content',
    icon: Award,
    duration: 120,
    capacity: 50,
    pricing: 'paid',
    suggestedPrice: 149,
    format: 'virtual',
    features: ['Expert instructor', 'Advanced content', 'Recording', 'Resources'],
    usageCount: 892,
  },

  // ── Wellness ──
  {
    id: 'wellness-meditation',
    name: 'Guided Meditation',
    category: 'wellness',
    description: 'Relaxation and mindfulness session with guided breathing exercises',
    icon: Heart,
    duration: 30,
    capacity: 100,
    pricing: 'free',
    format: 'virtual',
    features: ['Guided session', 'Calming audio', 'Replay available'],
    usageCount: 1234,
  },
  {
    id: 'wellness-fitness',
    name: 'Group Fitness Class',
    category: 'wellness',
    description: 'Live fitness class with instructor guidance and community energy',
    icon: Zap,
    duration: 45,
    capacity: 50,
    pricing: 'paid',
    suggestedPrice: 15,
    format: 'hybrid',
    features: ['Live instruction', 'Modifications offered', 'Community chat'],
    usageCount: 678,
  },

  // ── Analytics / Data ──
  {
    id: 'analytics-review',
    name: 'Analytics Review',
    category: 'workshop',
    description: 'Data analysis and insights sharing session with live dashboards',
    icon: BarChart3,
    duration: 90,
    capacity: 40,
    pricing: 'paid',
    suggestedPrice: 59,
    format: 'virtual',
    features: ['Data visualization', 'Report sharing', 'Q&A'],
    usageCount: 334,
  },

  // ── AMA / Community ──
  {
    id: 'ama-session',
    name: 'Ask Me Anything',
    category: 'meetup',
    description: 'Open Q&A session with an expert or community leader',
    icon: Headphones,
    duration: 60,
    capacity: 200,
    pricing: 'free',
    format: 'virtual',
    features: ['Live Q&A', 'Upvoted questions', 'Recording'],
    popular: true,
    usageCount: 1456,
  },
  {
    id: 'community-onboarding',
    name: 'Community Onboarding',
    category: 'meetup',
    description: 'Welcome session for new community members with introductions and orientation',
    icon: Shield,
    duration: 45,
    capacity: 50,
    pricing: 'free',
    format: 'virtual',
    features: ['Introductions', 'Community tour', 'Q&A', 'Resource sharing'],
    usageCount: 567,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: null },
  { id: 'workshop', label: 'Workshops', icon: Code },
  { id: 'webinar', label: 'Webinars', icon: MonitorPlay },
  { id: 'networking', label: 'Networking', icon: Users },
  { id: 'meetup', label: 'Meetups', icon: Coffee },
  { id: 'conference', label: 'Conferences', icon: Globe },
  { id: 'course', label: 'Courses', icon: GraduationCap },
  { id: 'wellness', label: 'Wellness', icon: Heart },
];

type SortOption = 'popular' | 'name' | 'duration-asc' | 'duration-desc' | 'price-low' | 'price-high';

// ─── Component ─────────────────────────────────────────────────

interface EventTemplatesPageProps {
  onBack: () => void;
  onSelectTemplate: (template: EventTemplate) => void;
  onCreateBlank?: () => void;
  onCreateWithAI?: () => void;
}

export function EventTemplatesPage({ onBack, onSelectTemplate, onCreateBlank, onCreateWithAI }: EventTemplatesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<EventTemplate | null>(null);

  const filteredTemplates = useMemo(() => {
    let templates = ALL_TEMPLATES;

    // Filter by category
    if (selectedCategory !== 'all') {
      templates = templates.filter(t => t.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      templates = templates.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.features.some(f => f.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'popular': return [...templates].sort((a, b) => b.usageCount - a.usageCount);
      case 'name': return [...templates].sort((a, b) => a.name.localeCompare(b.name));
      case 'duration-asc': return [...templates].sort((a, b) => a.duration - b.duration);
      case 'duration-desc': return [...templates].sort((a, b) => b.duration - a.duration);
      case 'price-low': return [...templates].sort((a, b) => (a.suggestedPrice || 0) - (b.suggestedPrice || 0));
      case 'price-high': return [...templates].sort((a, b) => (b.suggestedPrice || 0) - (a.suggestedPrice || 0));
      default: return templates;
    }
  }, [searchQuery, selectedCategory, sortBy]);

  const popularTemplates = ALL_TEMPLATES.filter(t => t.popular).sort((a, b) => b.usageCount - a.usageCount);

  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  const formatIcon = (location: string) => {
    if (location === 'virtual') return <Video className="size-3" />;
    if (location === 'in-person') return <MapPin className="size-3" />;
    return <Layers className="size-3" />;
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'duration-asc', label: 'Duration (Short)' },
    { value: 'duration-desc', label: 'Duration (Long)' },
    { value: 'price-low', label: 'Price (Low)' },
    { value: 'price-high', label: 'Price (High)' },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* ─── HEADER ──────────────────────────────────────────── */}
      <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 pt-6 pb-0">
        {/* Row 1: Back + Title + Actions */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <ArrowLeft className="size-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-foreground font-semibold text-2xl">Event Templates</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{ALL_TEMPLATES.length} templates to get you started</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onCreateBlank && (
              <Button onClick={onCreateBlank} variant="outline" className="rounded-lg shadow-none h-9 border-border text-foreground hover:bg-accent">
                <Plus className="size-4 mr-1.5" />
                <span className="hidden sm:inline">Blank Event</span>
              </Button>
            )}
            {onCreateWithAI && (
              <Button onClick={onCreateWithAI} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none h-9">
                <Wand2 className="size-4 mr-1.5" />
                <span className="hidden sm:inline">Create with AI</span>
              </Button>
            )}
          </div>
        </div>

        {/* Row 2: Search + Sort */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search templates by name, category, features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-9 pr-4 w-full bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className={`h-9 px-3 flex items-center gap-1.5 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                showSortMenu ? 'bg-primary/10 text-primary border-primary/30' : 'bg-card text-muted-foreground border-border hover:bg-accent'
              }`}
            >
              <ArrowUpDown className="size-3.5" />
              <span className="hidden sm:inline">Sort</span>
            </button>
            {showSortMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-xl z-50 py-1 overflow-hidden">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                      sortBy === opt.value ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {CATEGORIES.map((cat) => {
            const count = cat.id === 'all' ? ALL_TEMPLATES.length : ALL_TEMPLATES.filter(t => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-3 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCategory === cat.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.icon && <cat.icon className="size-3.5" />}
                {cat.label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                  selectedCategory === cat.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {count}
                </span>
                {selectedCategory === cat.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── CONTENT ──────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Popular banner (only on "all" with no search) */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Most Popular</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {popularTemplates.slice(0, 4).map((template) => {
                const Icon = template.icon;
                return (
                  <button
                    key={`pop-${template.id}`}
                    onClick={() => onSelectTemplate(template)}
                    className="p-4 rounded-xl border border-primary/15 bg-primary/[0.02] hover:border-primary/30 transition-all cursor-pointer text-left group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-foreground font-medium truncate group-hover:text-primary transition-colors">{template.name}</p>
                        <p className="text-[10px] text-muted-foreground">{template.usageCount.toLocaleString()} uses</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </p>
        </div>

        {/* Template grid */}
        {filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Search className="size-10 text-muted-foreground/30 mb-4" />
            <p className="text-sm text-foreground font-medium mb-1">No templates found</p>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or category</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="shadow-none">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  className="rounded-xl border border-border bg-card hover:border-primary/25 transition-all group"
                >
                  {/* Card header */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-sm text-foreground font-semibold truncate">{template.name}</h3>
                          {template.popular && (
                            <Badge className="bg-primary/10 text-primary border-none text-[10px] font-medium rounded-md px-1.5 py-0 shadow-none flex-shrink-0">Popular</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground capitalize">{template.category}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{template.description}</p>
                  </div>

                  {/* Meta row */}
                  <div className="px-5 pb-3 flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {formatDuration(template.duration)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="size-3" />
                      {template.capacity}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {formatIcon(template.format)}
                      <span className="capitalize">{template.format === 'in-person' ? 'In-Person' : template.format}</span>
                    </span>
                    {template.pricing === 'paid' && template.suggestedPrice ? (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <DollarSign className="size-3" />
                        ${template.suggestedPrice}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Free</span>
                    )}
                  </div>

                  {/* Feature tags */}
                  <div className="px-5 pb-3 flex flex-wrap gap-1">
                    {template.features.slice(0, 3).map((f) => (
                      <span key={f} className="px-2 py-0.5 text-[10px] text-muted-foreground bg-muted border border-border rounded-full">{f}</span>
                    ))}
                    {template.features.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] text-muted-foreground bg-muted border border-border rounded-full">+{template.features.length - 3}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="px-5 py-3 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{template.usageCount.toLocaleString()} uses</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewTemplate(previewTemplate?.id === template.id ? null : template)}
                        className="h-7 px-2.5 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        <Eye className="size-3" />
                        Preview
                      </button>
                      <button
                        onClick={() => onSelectTemplate(template)}
                        className="h-7 px-3 flex items-center gap-1 text-xs bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors cursor-pointer"
                      >
                        Use Template
                        <ChevronRight className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── PREVIEW PANEL (slide-up) ────────────────────────── */}
      {previewTemplate && (
        <div className="border-t border-border bg-card px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-start gap-4 max-w-4xl">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <previewTemplate.icon className="size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-foreground">{previewTemplate.name}</h3>
                {previewTemplate.popular && (
                  <Badge className="bg-primary/10 text-primary border-none text-xs shadow-none">Popular</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{previewTemplate.description}</p>

              <div className="grid grid-cols-4 gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-muted border border-border">
                  <p className="text-[10px] text-muted-foreground font-medium mb-0.5">Duration</p>
                  <p className="text-sm text-foreground font-medium">{formatDuration(previewTemplate.duration)}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted border border-border">
                  <p className="text-[10px] text-muted-foreground font-medium mb-0.5">Capacity</p>
                  <p className="text-sm text-foreground font-medium">{previewTemplate.capacity}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted border border-border">
                  <p className="text-[10px] text-muted-foreground font-medium mb-0.5">Format</p>
                  <p className="text-sm text-foreground font-medium capitalize">{previewTemplate.format === 'in-person' ? 'In-Person' : previewTemplate.format}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted border border-border">
                  <p className="text-[10px] text-muted-foreground font-medium mb-0.5">Price</p>
                  <p className="text-sm text-foreground font-medium">{previewTemplate.pricing === 'paid' && previewTemplate.suggestedPrice ? `$${previewTemplate.suggestedPrice}` : 'Free'}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {previewTemplate.features.map((f) => (
                  <span key={f} className="px-2.5 py-1 text-xs text-muted-foreground bg-muted border border-border rounded-full">{f}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Button onClick={() => onSelectTemplate(previewTemplate)} className="shadow-none">
                Use Template
                <ChevronRight className="size-3.5 ml-1" />
              </Button>
              <Button variant="outline" onClick={() => setPreviewTemplate(null)} className="shadow-none">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
