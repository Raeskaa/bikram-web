import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Search, Filter, TrendingUp, Calendar, Users, Video, MapPin, 
  Clock, Star, Sparkles, ChevronRight, Globe, Plus, Flame,
  Heart, BookOpen, Code, Palette, Briefcase, Music, Zap,
  ArrowRight, CheckCircle, Target, Rocket
} from 'lucide-react';

interface StandaloneEvent {
  id: string;
  type: 'standalone';
  title: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  hostName: string;
  hostAvatar: string;
  hostBio: string;
  startDate: string;
  time: string;
  timezone: string;
  duration: number;
  eventType: 'virtual' | 'in-person' | 'hybrid';
  category: string[];
  isPaid: boolean;
  price?: number;
  registrationCount: number;
  capacity: number;
  communityName?: string; // Target community to auto-join
  autoCreateCommunity: boolean;
  featured: boolean;
  trending: boolean;
  tags: string[];
  slug: string;
}

interface EventsMarketplaceProps {
  onEventClick: (event: StandaloneEvent) => void;
  onCreateEvent?: () => void;
  isCreator?: boolean;
}

export function EventsMarketplace({ onEventClick, onCreateEvent, isCreator = false }: EventsMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'free' | 'paid'>('all');

  // Sample events data
  const sampleEvents: StandaloneEvent[] = [
    {
      id: '1',
      type: 'standalone',
      title: 'Backend Development Crash Course',
      description: 'Master the fundamentals of backend development with Node.js, Express, and PostgreSQL. Perfect for beginners looking to start their backend journey.',
      shortDescription: 'Learn Node.js, Express & PostgreSQL from scratch',
      coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      hostName: 'John Smith',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      hostBio: 'Senior Backend Engineer @ Google',
      startDate: 'Jan 20, 2025',
      time: '6:00 PM',
      timezone: 'EST',
      duration: 120,
      eventType: 'virtual',
      category: ['Technology', 'Development'],
      isPaid: false,
      registrationCount: 247,
      capacity: 500,
      communityName: 'Backend Dev Hub',
      autoCreateCommunity: true,
      featured: true,
      trending: true,
      tags: ['Node.js', 'Express', 'PostgreSQL', 'Backend'],
      slug: 'backend-dev-crash-course',
    },
    {
      id: '2',
      type: 'standalone',
      title: 'UI/UX Design Masterclass',
      description: 'Learn modern UI/UX principles, design systems, and how to create beautiful, user-friendly interfaces.',
      shortDescription: 'Modern UI/UX design principles & best practices',
      coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      hostName: 'Emma Wilson',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      hostBio: 'Lead Designer @ Figma',
      startDate: 'Jan 22, 2025',
      time: '2:00 PM',
      timezone: 'PST',
      duration: 90,
      eventType: 'virtual',
      category: ['Design', 'Creative'],
      isPaid: true,
      price: 29,
      registrationCount: 156,
      capacity: 200,
      communityName: 'Design Professionals',
      autoCreateCommunity: true,
      featured: true,
      trending: false,
      tags: ['UI/UX', 'Figma', 'Design Systems'],
      slug: 'uiux-design-masterclass',
    },
    {
      id: '3',
      type: 'standalone',
      title: 'AI & Machine Learning Bootcamp',
      description: 'Dive into AI and ML with hands-on projects. Learn Python, TensorFlow, and deploy your first ML model.',
      shortDescription: 'Hands-on AI/ML with Python & TensorFlow',
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      hostName: 'Dr. Sarah Chen',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      hostBio: 'AI Researcher @ MIT',
      startDate: 'Jan 25, 2025',
      time: '4:00 PM',
      timezone: 'EST',
      duration: 180,
      eventType: 'virtual',
      category: ['Technology', 'AI/ML'],
      isPaid: false,
      registrationCount: 423,
      capacity: 1000,
      communityName: 'AI Learning Community',
      autoCreateCommunity: true,
      featured: true,
      trending: true,
      tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow'],
      slug: 'ai-ml-bootcamp',
    },
    {
      id: '4',
      type: 'standalone',
      title: 'Digital Marketing Strategies 2025',
      description: 'Latest digital marketing tactics, SEO strategies, and social media best practices for 2025.',
      shortDescription: 'Master digital marketing for 2025',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      hostName: 'Michael Rodriguez',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      hostBio: 'Marketing Director @ HubSpot',
      startDate: 'Jan 28, 2025',
      time: '11:00 AM',
      timezone: 'EST',
      duration: 120,
      eventType: 'virtual',
      category: ['Marketing', 'Business'],
      isPaid: true,
      price: 49,
      registrationCount: 189,
      capacity: 300,
      communityName: 'Digital Marketers Hub',
      autoCreateCommunity: true,
      featured: false,
      trending: false,
      tags: ['Marketing', 'SEO', 'Social Media'],
      slug: 'digital-marketing-2025',
    },
    {
      id: '5',
      type: 'standalone',
      title: 'Startup Founder Meetup (NYC)',
      description: 'Network with fellow startup founders in NYC. Share experiences, challenges, and opportunities.',
      shortDescription: 'Connect with startup founders in NYC',
      coverImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop',
      hostName: 'Alex Kim',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      hostBio: 'Founder @ TechStartup Inc',
      startDate: 'Feb 1, 2025',
      time: '6:30 PM',
      timezone: 'EST',
      duration: 150,
      eventType: 'in-person',
      category: ['Business', 'Networking'],
      isPaid: false,
      registrationCount: 67,
      capacity: 100,
      communityName: 'NYC Startup Community',
      autoCreateCommunity: true,
      featured: false,
      trending: false,
      tags: ['Startups', 'Networking', 'NYC'],
      slug: 'startup-founder-meetup-nyc',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Events', icon: Globe },
    { id: 'technology', label: 'Technology', icon: Code },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'marketing', label: 'Marketing', icon: Target },
    { id: 'creative', label: 'Creative', icon: Music },
  ];

  const filteredEvents = sampleEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           event.category.some(cat => cat.toLowerCase() === selectedCategory);
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'free' && !event.isPaid) ||
                         (selectedFilter === 'paid' && event.isPaid);
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const featuredEvents = sampleEvents.filter(e => e.featured);
  const trendingEvents = sampleEvents.filter(e => e.trending);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl mb-2">Discover Events</h1>
              <p className="text-gray-300">
                Join free workshops, webinars, and networking events. Learn from experts and grow your network.
              </p>
            </div>
            {isCreator && onCreateEvent && (
              <Button 
                size="lg" 
                className="bg-white text-foreground hover:bg-gray-50"
                onClick={onCreateEvent}
              >
                <Plus className="size-5 mr-2" />
                Create Event
              </Button>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events, topics, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-base bg-white border-0 shadow-lg"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="flex items-center gap-2 text-sm mb-1">
                <Calendar className="size-4" />
                <span>Events This Month</span>
              </div>
              <p className="text-2xl">127</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="flex items-center gap-2 text-sm mb-1">
                <Users className="size-4" />
                <span>Total Registrations</span>
              </div>
              <p className="text-2xl">12.4K</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="flex items-center gap-2 text-sm mb-1">
                <Sparkles className="size-4" />
                <span>Communities</span>
              </div>
              <p className="text-2xl">48</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Categories */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-400" />
              <span className="text-sm text-gray-700">Filter:</span>
            </div>
            <Button
              size="sm"
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
            >
              All Events
            </Button>
            <Button
              size="sm"
              variant={selectedFilter === 'free' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('free')}
            >
              Free
            </Button>
            <Button
              size="sm"
              variant={selectedFilter === 'paid' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('paid')}
            >
              Paid
            </Button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-muted text-foreground border border-border'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="size-4" />
                  <span className="text-sm">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-8">
          {/* Featured Events */}
          {featuredEvents.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Star className="size-5 text-yellow-500" />
                <h2 className="text-xl text-gray-900">Featured Events</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredEvents.map((event) => (
                  <FeaturedEventCard
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Trending Events */}
          {trendingEvents.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Flame className="size-5 text-orange-500" />
                <h2 className="text-xl text-gray-900">Trending Now</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trendingEvents.map((event) => (
                  <TrendingEventCard
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* All Events */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-gray-900">
                {selectedCategory === 'all' ? 'All Events' : `${selectedCategory} Events`}
              </h2>
              <span className="text-sm text-gray-600">{filteredEvents.length} events</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {filteredEvents.map((event) => (
                <StandardEventCard
                  key={event.id}
                  event={event}
                  onClick={() => onEventClick(event)}
                />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="size-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No events found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
              </div>
            )}
          </section>

          {/* Call to Action for Creators */}
          {isCreator && (
            <section className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg p-8 text-white text-center">
              <Rocket className="size-12 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">Ready to Host Your Own Event?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Create a standalone event, attract attendees, and grow your community automatically. 
                Our AI promotion engine will help you reach the right audience.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-foreground hover:bg-gray-50"
                onClick={onCreateEvent}
              >
                <Plus className="size-5 mr-2" />
                Create Your Event
              </Button>
            </section>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// Featured Event Card (Large format)
function FeaturedEventCard({ event, onClick }: { event: StandaloneEvent; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-border transition-all cursor-pointer group shadow-sm hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {!event.isPaid && (
            <Badge className="bg-green-500 text-white border-0">Free</Badge>
          )}
          {event.trending && (
            <Badge className="bg-orange-500 text-white border-0">
              <Flame className="size-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img src={event.hostAvatar} alt={event.hostName} className="size-8 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 truncate">{event.hostName}</p>
            <p className="text-xs text-gray-500 truncate">{event.hostBio}</p>
          </div>
          {event.isPaid && (
            <span className="text-lg text-foreground font-semibold">${event.price}</span>
          )}
        </div>
        <h3 className="text-base text-gray-900 mb-2 group-hover:text-foreground transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.shortDescription}</p>
        <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="size-3" />
            <span>{event.startDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span>{event.time} {event.timezone}</span>
          </div>
          <div className="flex items-center gap-1">
            {event.eventType === 'virtual' ? <Video className="size-3" /> : <MapPin className="size-3" />}
            <span className="capitalize">{event.eventType}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <Users className="size-4" />
            <span>{event.registrationCount} registered</span>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Register
            <ArrowRight className="size-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Trending Event Card (Medium format)
function TrendingEventCard({ event, onClick }: { event: StandaloneEvent; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-border transition-all cursor-pointer group"
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!event.isPaid && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">Free</Badge>
        )}
      </div>
      <div className="p-3">
        <h4 className="text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-foreground transition-colors">
          {event.title}
        </h4>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          <Calendar className="size-3" />
          <span>{event.startDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Users className="size-3" />
            <span>{event.registrationCount}</span>
          </div>
          {event.isPaid && (
            <span className="text-sm text-foreground font-semibold">${event.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Standard Event Card (List format)
function StandardEventCard({ event, onClick }: { event: StandaloneEvent; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 hover:border-border transition-all cursor-pointer group p-4"
    >
      <div className="flex gap-4">
        <div className="relative w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-base text-gray-900 mb-1 group-hover:text-foreground transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{event.shortDescription}</p>
            </div>
            {event.isPaid && (
              <span className="text-xl text-foreground font-semibold ml-4">${event.price}</span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <img src={event.hostAvatar} alt={event.hostName} className="size-6 rounded-full" />
            <span className="text-sm text-gray-700">{event.hostName}</span>
            <span className="text-xs text-gray-500">• {event.hostBio}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              <span>{event.startDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{event.time} {event.timezone}</span>
            </div>
            <div className="flex items-center gap-1">
              {event.eventType === 'virtual' ? <Video className="size-4" /> : <MapPin className="size-4" />}
              <span className="capitalize">{event.eventType}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="size-4" />
              <span>{event.registrationCount} registered</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!event.isPaid && (
                <Badge className="bg-green-100 text-green-700 border-green-200">Free</Badge>
              )}
              {event.autoCreateCommunity && (
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle className="size-3 mr-1" />
                  Join {event.communityName}
                </Badge>
              )}
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Register Now
              <ArrowRight className="size-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}