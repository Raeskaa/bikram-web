import { useState, useRef, useEffect } from 'react';
import { Sparkles, Search, Filter, Calendar, Users, BookOpen, MapPin, Clock, DollarSign, Star, TrendingUp, Zap, Send, ChevronDown, X, Heart, Share2, ExternalLink, Play, CheckCircle2, Award, Target, Palette, GraduationCap, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { AppVersion, Message, Conversation } from '../types';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface MarketplaceViewProps {
  conversation: Conversation;
  onUpdateConversation: (conversation: Conversation) => void;
  appVersion?: AppVersion;
  onVersionChange?: (version: AppVersion) => void;
  userMode: 'creator' | 'learner';
  onModeChange?: (mode: 'creator' | 'learner') => void;
  onBack: () => void;
}

type MarketplaceTab = 'courses' | 'events' | 'communities';
type FilterCategory = 'all' | 'trending' | 'new' | 'featured' | 'recommended';

interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  duration: string;
  level: string;
  category: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

interface Event {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  duration: string;
  attendees: number;
  price: number;
  location: string;
  category: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

interface Community {
  id: string;
  title: string;
  description: string;
  members: number;
  posts: number;
  category: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const versionDescriptions: Record<AppVersion, string> = {
  v1: 'Intent Detection',
  v2: 'Dual-Pane',
  v3: 'Smart Toggle',
  v4: 'Context Menu',
  v5: 'Tab-Based',
  v6: 'Command Palette',
  v7: 'Persona Selection',
  v8: 'Action Cards',
};

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Python Bootcamp: From Zero to Hero',
    instructor: 'Dr. Sarah Mitchell',
    price: 89.99,
    rating: 4.8,
    students: 12453,
    duration: '42 hours',
    level: 'Beginner',
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
    tags: ['Python', 'Programming', 'Beginner'],
    featured: true,
  },
  {
    id: '2',
    title: 'React & TypeScript: Build Modern Web Applications',
    instructor: 'Alex Johnson',
    price: 79.99,
    rating: 4.9,
    students: 8234,
    duration: '28 hours',
    level: 'Intermediate',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    tags: ['React', 'TypeScript', 'Web Dev'],
  },
  {
    id: '3',
    title: 'Machine Learning A-Z: Hands-On Python & R',
    instructor: 'Prof. David Chen',
    price: 99.99,
    rating: 4.7,
    students: 15632,
    duration: '44 hours',
    level: 'Advanced',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    tags: ['AI', 'Machine Learning', 'Python'],
    featured: true,
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Emma Williams',
    price: 69.99,
    rating: 4.6,
    students: 6789,
    duration: '18 hours',
    level: 'Beginner',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    tags: ['Design', 'UI/UX', 'Figma'],
  },
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AI & Future of Work Summit 2024',
    host: 'Tech Innovators Inc.',
    date: 'Dec 15, 2024',
    time: '10:00 AM PST',
    duration: '6 hours',
    attendees: 2453,
    price: 0,
    location: 'Virtual',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
    tags: ['AI', 'Future of Work', 'Technology'],
    featured: true,
  },
  {
    id: '2',
    title: 'Web Development Bootcamp Workshop',
    host: 'Code Masters Academy',
    date: 'Dec 20, 2024',
    time: '2:00 PM EST',
    duration: '4 hours',
    attendees: 567,
    price: 29.99,
    location: 'Virtual',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop',
    tags: ['Web Dev', 'Workshop', 'Live'],
  },
  {
    id: '3',
    title: 'Startup Founders Networking Mixer',
    host: 'Entrepreneur Hub',
    date: 'Dec 18, 2024',
    time: '6:00 PM PST',
    duration: '3 hours',
    attendees: 234,
    price: 15.00,
    location: 'San Francisco, CA',
    category: 'Networking',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop',
    tags: ['Networking', 'Startup', 'In-Person'],
  },
];

const mockCommunities: Community[] = [
  {
    id: '1',
    title: 'Python Developers Worldwide',
    description: 'A community for Python enthusiasts to share knowledge, projects, and help each other grow.',
    members: 45623,
    posts: 12453,
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop',
    tags: ['Python', 'Programming', 'Open Source'],
    featured: true,
  },
  {
    id: '2',
    title: 'UI/UX Design Circle',
    description: 'Share designs, get feedback, and connect with fellow designers.',
    members: 23456,
    posts: 8934,
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop',
    tags: ['Design', 'UI/UX', 'Creative'],
  },
  {
    id: '3',
    title: 'Indie Makers & Founders',
    description: 'For solo entrepreneurs building products and sharing the journey.',
    members: 18234,
    posts: 6745,
    category: 'Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
    tags: ['Startup', 'Indie', 'Business'],
  },
];

export function MarketplaceView({
  conversation,
  onUpdateConversation,
  appVersion = 'v1',
  onVersionChange,
  userMode,
  onModeChange,
  onBack,
}: MarketplaceViewProps) {
  const [activeTab, setActiveTab] = useState<MarketplaceTab>('courses');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [showVersionMenu, setShowVersionMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm here to help you discover the perfect courses, events, and communities. What are you interested in learning today?",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(chatInput, activeTab),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (query: string, tab: MarketplaceTab): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('python') || lowerQuery.includes('programming')) {
      return "Great choice! I found some excellent Python courses for you. I've highlighted the 'Complete Python Bootcamp' which has amazing reviews and is perfect for beginners. Would you like me to filter for a specific skill level?";
    } else if (lowerQuery.includes('event') || lowerQuery.includes('workshop')) {
      return "I see you're interested in events! The 'AI & Future of Work Summit' is coming up and it's completely free. There's also a hands-on Web Development Workshop if you prefer something more interactive. Which one sounds interesting?";
    } else if (lowerQuery.includes('community') || lowerQuery.includes('network')) {
      return "Perfect! Communities are a great way to learn. The 'Python Developers Worldwide' community is very active with over 45k members. They share projects, help each other debug, and organize virtual meetups. Want me to show you similar communities?";
    } else if (lowerQuery.includes('beginner') || lowerQuery.includes('start')) {
      return "For beginners, I'd recommend starting with foundational courses. I've filtered the results to show beginner-friendly options. The Python Bootcamp and UI/UX Fundamentals are both excellent starting points. What topic interests you most?";
    } else if (lowerQuery.includes('free')) {
      return "Looking for free options? I found several free events and communities you can join. The AI Summit is completely free, and all communities have free membership. Some courses offer free trial periods too. Want me to show only free content?";
    } else {
      return "I can help you find exactly what you're looking for! You can ask me to:\n• Filter by skill level (beginner, intermediate, advanced)\n• Find free or paid options\n• Recommend based on your goals\n• Show trending or featured content\n\nWhat would you like to explore?";
    }
  };

  const getFilteredItems = () => {
    let items: any[] = [];
    
    switch (activeTab) {
      case 'courses':
        items = mockCourses;
        break;
      case 'events':
        items = mockEvents;
        break;
      case 'communities':
        items = mockCommunities;
        break;
    }

    // Apply search filter
    if (searchQuery) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (filterCategory === 'featured') {
      items = items.filter(item => item.featured);
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
      {/* Left Panel - Marketplace */}
      <div className="flex-1 flex flex-col border-r border-gray-200 bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-4 sticky top-0 z-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowRight className="size-5 text-gray-600 rotate-180" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-lg shadow-purple-500/30">
                  <Sparkles className="size-5 text-white" />
                </div>
                <div>
                  <h1 className="text-gray-900 font-semibold">TrueLeap Marketplace</h1>
                  <p className="text-xs text-gray-500">Discover & Learn</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mode Toggle */}
              {onModeChange && (
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                  <button
                    onClick={() => onModeChange('creator')}
                    className={`px-3 py-1.5 rounded-md text-xs transition-all flex items-center gap-1 ${
                      userMode === 'creator'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Palette className="size-3" />
                    Creator
                  </button>
                  <button
                    onClick={() => onModeChange('learner')}
                    className={`px-3 py-1.5 rounded-md text-xs transition-all flex items-center gap-1 ${
                      userMode === 'learner'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <GraduationCap className="size-3" />
                    Learner
                  </button>
                </div>
              )}

              {/* Version Switcher */}
              {onVersionChange && (
                <Popover open={showVersionMenu} onOpenChange={setShowVersionMenu}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 border-gray-300">
                      <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 border-0">
                        {appVersion.toUpperCase()}
                      </Badge>
                      <ChevronDown className="size-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-2" align="end">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 px-2 py-1 font-medium">Switch UX Version</p>
                      {(Object.keys(versionDescriptions) as AppVersion[]).map((version) => (
                        <button
                          key={version}
                          onClick={() => {
                            onVersionChange(version);
                            setShowVersionMenu(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                            appVersion === version ? 'bg-purple-50 border border-purple-200' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={appVersion === version ? "default" : "secondary"} 
                                className={`text-xs ${appVersion === version ? 'bg-purple-600' : ''}`}
                              >
                                {version.toUpperCase()}
                              </Badge>
                              <span className="text-sm text-gray-900">{versionDescriptions[version]}</span>
                            </div>
                            {appVersion === version && (
                              <div className="size-2 rounded-full bg-purple-600" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, events, communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'courses'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="size-4" />
              Courses
              <Badge variant="secondary" className="text-xs">{mockCourses.length}</Badge>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calendar className="size-4" />
              Events
              <Badge variant="secondary" className="text-xs">{mockEvents.length}</Badge>
            </button>
            <button
              onClick={() => setActiveTab('communities')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'communities'
                  ? 'bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg shadow-pink-500/30'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="size-4" />
              Communities
              <Badge variant="secondary" className="text-xs">{mockCommunities.length}</Badge>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterCategory('featured')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                filterCategory === 'featured'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Star className="size-3" />
              Featured
            </button>
            <button
              onClick={() => setFilterCategory('trending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                filterCategory === 'trending'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <TrendingUp className="size-3" />
              Trending
            </button>
            <button
              onClick={() => setFilterCategory('recommended')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                filterCategory === 'recommended'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Zap className="size-3" />
              For You
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <Search className="size-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No results found. Try adjusting your filters.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id}>
                  {activeTab === 'courses' && <CourseCard course={item as Course} />}
                  {activeTab === 'events' && <EventCard event={item as Event} />}
                  {activeTab === 'communities' && <CommunityCard community={item as Community} />}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - AI Assistant */}
      <div className="w-[450px] flex flex-col bg-white border-l border-gray-200">
        {/* AI Header */}
        <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-500/30">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Leapy AI Assistant</h2>
              <p className="text-xs text-gray-600">Helping you discover & learn</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-full">
                <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-700 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-purple-200' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Suggestions */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-600 mb-2">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setChatInput('Show me beginner Python courses')}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              Beginner courses
            </button>
            <button
              onClick={() => setChatInput('Find free events')}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              Free events
            </button>
            <button
              onClick={() => setChatInput('Recommend active communities')}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              Active communities
            </button>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200 px-6 py-4 bg-white">
          <form onSubmit={handleSendMessage}>
            <div className="relative">
              <Textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Leapy to help you find courses, events, or communities..."
                className="pr-12 resize-none min-h-[60px] rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button
                type="submit"
                disabled={!chatInput.trim()}
                className="absolute right-2 bottom-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/30"
                size="sm"
              >
                <Send className="size-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-all overflow-hidden hover:shadow-xl">
      <div className="flex gap-4 p-4">
        <div className="relative w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          {course.featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0 text-white">
                <Star className="size-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600">{course.instructor}</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="size-5 text-gray-400 hover:text-red-500" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="size-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-gray-900">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="size-4" />
              {course.students.toLocaleString()} students
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="size-4" />
              {course.duration}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">{course.level}</Badge>
            {course.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-purple-600">${course.price}</span>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/30">
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Event Card Component
function EventCard({ event }: { event: Event }) {
  return (
    <div className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all overflow-hidden hover:shadow-xl">
      <div className="flex gap-4 p-4">
        <div className="relative w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          {event.featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0 text-white">
                <Star className="size-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600">{event.host}</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="size-5 text-gray-400" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="size-4" />
              {event.date}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="size-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="size-4" />
              {event.location}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="size-4" />
              {event.attendees.toLocaleString()} attending
            </div>
            {event.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {event.price === 0 ? (
                <Badge className="bg-green-100 text-green-700 border-0">FREE</Badge>
              ) : (
                <span className="text-2xl font-bold text-blue-600">${event.price}</span>
              )}
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30">
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Community Card Component
function CommunityCard({ community }: { community: Community }) {
  return (
    <div className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-pink-300 transition-all overflow-hidden hover:shadow-xl">
      <div className="flex gap-4 p-4">
        <div className="relative w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
          <img src={community.image} alt={community.title} className="w-full h-full object-cover" />
          {community.featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0 text-white">
                <Star className="size-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
                {community.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{community.description}</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ExternalLink className="size-5 text-gray-400" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="size-4" />
              {community.members.toLocaleString()} members
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <TrendingUp className="size-4" />
              {community.posts.toLocaleString()} posts
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">{community.category}</Badge>
            {community.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700 border-0">FREE</Badge>
            </div>
            <Button className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white shadow-lg shadow-pink-500/30">
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
