import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
// Calendar grid is now inline below
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  ChevronDown,
  MoreVertical,
  Download,
  Share2,
  X,
  CalendarPlus,
  Bell,
  BellOff,
  Grid3x3,
  List as ListIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface MyRegisteredEventsProps {
  onSelectEvent: (eventId: string) => void;
  onBack: () => void;
}

export function MyRegisteredEvents({ onSelectEvent, onBack }: MyRegisteredEventsProps) {
  const [filterTab, setFilterTab] = useState<'upcoming' | 'past'>('upcoming');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [eventTypeFilter, setEventTypeFilter] = useState<'all' | 'virtual' | 'in-person' | 'hybrid'>('all');

  const upcomingEvents = [
    {
      id: '1',
      title: 'React 19 Launch Event',
      description: 'Join us for the official React 19 launch with live demos and Q&A',
      date: 'Dec 24, 2024',
      time: '2:00 PM PST',
      endTime: '4:00 PM PST',
      type: 'virtual' as const,
      host: 'React Team',
      hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
      attendees: 1243,
      maxCapacity: 2000,
      startsIn: '2 days',
      category: 'Development',
      tags: ['React', 'JavaScript', 'Frontend'],
      hasReminder: true,
      calendarAdded: true,
      community: 'React Developers Hub'
    },
    {
      id: '2',
      title: 'Web Performance Workshop',
      description: 'Hands-on workshop on optimizing web performance and Core Web Vitals',
      date: 'Dec 28, 2024',
      time: '10:00 AM PST',
      endTime: '2:00 PM PST',
      type: 'hybrid' as const,
      location: 'Google Building 43, Mountain View + Online',
      host: 'Google Chrome Team',
      hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
      attendees: 856,
      maxCapacity: 1000,
      startsIn: '6 days',
      category: 'Development',
      tags: ['Performance', 'Web Vitals', 'Optimization'],
      hasReminder: true,
      calendarAdded: true,
      community: null
    },
    {
      id: '3',
      title: 'Design Systems Meetup',
      description: 'Monthly meetup to discuss design systems and component libraries',
      date: 'Jan 5, 2025',
      time: '6:00 PM PST',
      endTime: '8:00 PM PST',
      type: 'in-person' as const,
      location: 'WeWork, San Francisco',
      host: 'Emily Rodriguez',
      hostAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
      attendees: 45,
      maxCapacity: 50,
      startsIn: '14 days',
      category: 'Design',
      tags: ['Design Systems', 'UI/UX', 'Figma'],
      hasReminder: false,
      calendarAdded: false,
      community: 'Design Systems Weekly'
    },
    {
      id: '4',
      title: 'TypeScript 5.3 Release Party',
      description: 'Celebrate the new TypeScript release with the core team',
      date: 'Jan 10, 2025',
      time: '3:00 PM PST',
      endTime: '5:00 PM PST',
      type: 'virtual' as const,
      host: 'Microsoft TypeScript Team',
      hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
      attendees: 2145,
      maxCapacity: 5000,
      startsIn: '19 days',
      category: 'Development',
      tags: ['TypeScript', 'Programming'],
      hasReminder: true,
      calendarAdded: true,
      community: 'TypeScript Masters'
    }
  ];

  const pastEvents = [
    {
      id: '5',
      title: 'Node.js 21 Deep Dive',
      description: 'Explored new features in Node.js 21',
      date: 'Dec 10, 2024',
      time: '11:00 AM PST',
      type: 'virtual' as const,
      host: 'Node.js Foundation',
      hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
      attendees: 987,
      attended: true,
      recording: true,
      certificate: false,
      category: 'Development'
    },
    {
      id: '6',
      title: 'GraphQL Summit',
      description: 'Annual GraphQL conference with industry leaders',
      date: 'Nov 15, 2024',
      time: '9:00 AM PST',
      type: 'hybrid' as const,
      location: 'Moscone Center, San Francisco',
      host: 'Apollo GraphQL',
      hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop',
      attendees: 1543,
      attended: true,
      recording: true,
      certificate: true,
      category: 'Development'
    },
    {
      id: '7',
      title: 'Indie Makers Showcase',
      description: 'Monthly showcase of indie projects and products',
      date: 'Oct 28, 2024',
      time: '5:00 PM PST',
      type: 'virtual' as const,
      host: 'Indie Makers Community',
      hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop',
      attendees: 234,
      attended: false,
      recording: false,
      certificate: false,
      category: 'Business'
    }
  ];

  const currentEvents = filterTab === 'upcoming' ? upcomingEvents : pastEvents;
  
  const filteredEvents = currentEvents.filter(event => {
    if (eventTypeFilter !== 'all' && event.type !== eventTypeFilter) return false;
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const stats = {
    upcoming: upcomingEvents.length,
    past: pastEvents.length,
    attended: pastEvents.filter(e => e.attended).length,
    certificates: pastEvents.filter(e => e.certificate).length
  };

  const getTypeIcon = (type: string) => {
    if (type === 'virtual') return <Video className="w-4 h-4" />;
    if (type === 'in-person') return <MapPin className="w-4 h-4" />;
    return <Video className="w-4 h-4" />;
  };

  const getTypeColor = (type: string) => {
    if (type === 'virtual') return 'bg-blue-500/10 text-blue-700 border-blue-200';
    if (type === 'in-person') return 'bg-green-500/10 text-green-700 border-green-200';
    return 'bg-purple-500/10 text-purple-700 border-purple-200';
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-muted via-background to-purple-50/30">
      {/* Header */}
      <div className="border-b bg-card/80 backdrop-blur-sm px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-700 to-purple-900 bg-clip-text text-transparent">
                My Events
              </h1>
              <p className="text-muted-foreground mt-1">
                {stats.upcoming} upcoming • {stats.attended} attended • {stats.certificates} certificates earned
              </p>
            </div>
            <Button onClick={onBack} variant="outline">
              Back to Dashboard
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.upcoming}</div>
                  <div className="text-sm text-muted-foreground mt-1">Upcoming</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.past}</div>
                  <div className="text-sm text-muted-foreground mt-1">Past Events</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-muted-foreground to-muted-foreground/80 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.attended}</div>
                  <div className="text-sm text-muted-foreground mt-1">Attended</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.certificates}</div>
                  <div className="text-sm text-muted-foreground mt-1">Certificates</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>
          </div>

          {/* Filters & Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={filterTab === 'upcoming' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterTab('upcoming')}
                className={filterTab === 'upcoming' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                Upcoming ({stats.upcoming})
              </Button>
              <Button
                variant={filterTab === 'past' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterTab('past')}
                className={filterTab === 'past' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                Past ({stats.past})
              </Button>

              <div className="h-6 w-px bg-border mx-2" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Type: {eventTypeFilter === 'all' ? 'All' : eventTypeFilter}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setEventTypeFilter('all')}>
                    All Types
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEventTypeFilter('virtual')}>
                    Virtual Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEventTypeFilter('in-person')}>
                    In-Person Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setEventTypeFilter('hybrid')}>
                    Hybrid Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>

              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <ListIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                  className="h-8 w-8 p-0"
                >
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {viewMode === 'calendar' ? (
            <RegisteredEventsCalendar
              events={filteredEvents}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onSelectEvent={onSelectEvent}
            />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-6">
              {filteredEvents.map((event: any) => (
                <Card 
                  key={event.id}
                  className="group cursor-pointer border-border hover:border-primary/30 hover:shadow-xl transition-all overflow-hidden"
                  onClick={() => onSelectEvent(event.id)}
                >
                  <div className="relative h-44">
                    <img 
                      src={event.thumbnail} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <Badge className={`absolute top-3 left-3 ${getTypeColor(event.type)}`}>
                      {getTypeIcon(event.type)}
                      <span className="ml-1.5 capitalize">{event.type}</span>
                    </Badge>

                    {filterTab === 'upcoming' && event.startsIn && (
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground hover:bg-primary">
                        Starts in {event.startsIn}
                      </Badge>
                    )}

                    {filterTab === 'past' && event.certificate && (
                      <Badge className="absolute top-3 right-3 bg-amber-500 text-white hover:bg-amber-500">
                        Certificate Earned
                      </Badge>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {event.description}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {filterTab === 'upcoming' ? (
                            <>
                              {!event.calendarAdded && (
                                <DropdownMenuItem>
                                  <CalendarPlus className="w-4 h-4 mr-2" />
                                  Add to Calendar
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                {event.hasReminder ? (
                                  <>
                                    <BellOff className="w-4 h-4 mr-2" />
                                    Remove Reminder
                                  </>
                                ) : (
                                  <>
                                    <Bell className="w-4 h-4 mr-2" />
                                    Set Reminder
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Event
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <X className="w-4 h-4 mr-2" />
                                Cancel Registration
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              {event.recording && (
                                <DropdownMenuItem>
                                  <Video className="w-4 h-4 mr-2" />
                                  Watch Recording
                                </DropdownMenuItem>
                              )}
                              {event.certificate && (
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download Certificate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Event
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <img 
                        src={event.hostAvatar} 
                        alt={event.host}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">{event.host}</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}{event.endTime && ` - ${event.endTime}`}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      )}
                      {filterTab === 'upcoming' && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees.toLocaleString()} / {event.maxCapacity?.toLocaleString()} attending</span>
                        </div>
                      )}
                    </div>

                    {filterTab === 'upcoming' ? (
                      <div className="flex items-center gap-2">
                        {event.calendarAdded && (
                          <Badge variant="outline" className="text-xs">
                            <CalendarPlus className="w-3 h-3 mr-1" />
                            In Calendar
                          </Badge>
                        )}
                        {event.hasReminder && (
                          <Badge variant="outline" className="text-xs">
                            <Bell className="w-3 h-3 mr-1" />
                            Reminder Set
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {event.attended ? (
                          <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 text-xs">
                            ✓ Attended
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Not Attended
                          </Badge>
                        )}
                        {event.recording && (
                          <Badge variant="outline" className="text-xs">
                            <Video className="w-3 h-3 mr-1" />
                            Recording
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event: any) => (
                <Card 
                  key={event.id}
                  className="group cursor-pointer border-border hover:border-primary/30 hover:shadow-lg transition-all"
                  onClick={() => onSelectEvent(event.id)}
                >
                  <div className="flex items-center gap-6 p-5">
                    <div className="relative w-60 h-36 flex-shrink-0 rounded-lg overflow-hidden">
                      <img 
                        src={event.thumbnail} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className={`absolute top-2 left-2 ${getTypeColor(event.type)}`}>
                        {getTypeIcon(event.type)}
                        <span className="ml-1.5 capitalize">{event.type}</span>
                      </Badge>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                        {filterTab === 'upcoming' && event.startsIn && (
                          <Badge className="bg-primary text-primary-foreground hover:bg-primary ml-4">
                            Starts in {event.startsIn}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <img 
                            src={event.hostAvatar} 
                            alt={event.host}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{event.host}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        {filterTab === 'upcoming' && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees.toLocaleString()} attending</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {filterTab === 'upcoming' ? (
                          <>
                            {event.calendarAdded && (
                              <Badge variant="outline" className="text-xs">
                                <CalendarPlus className="w-3 h-3 mr-1" />
                                In Calendar
                              </Badge>
                            )}
                            {event.hasReminder && (
                              <Badge variant="outline" className="text-xs">
                                <Bell className="w-3 h-3 mr-1" />
                                Reminder Set
                              </Badge>
                            )}
                          </>
                        ) : (
                          <>
                            {event.attended && (
                              <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 text-xs">
                                ✓ Attended
                              </Badge>
                            )}
                            {event.recording && (
                              <Badge variant="outline" className="text-xs">
                                <Video className="w-3 h-3 mr-1" />
                                Recording Available
                              </Badge>
                            )}
                            {event.certificate && (
                              <Badge className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 text-xs">
                                Certificate Earned
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Calendar view for registered events ───

const CAL_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const CAL_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function RegisteredEventsCalendar({
  events,
  selectedDate,
  onSelectDate,
  onSelectEvent,
}: {
  events: any[];
  selectedDate: Date | undefined;
  onSelectDate: (d: Date | undefined) => void;
  onSelectEvent: (id: string) => void;
}) {
  const [calDate, setCalDate] = useState(new Date(2026, 2)); // March 2026
  const year = calDate.getFullYear();
  const month = calDate.getMonth();

  // Parse event dates into a map
  const eventsByDate = useMemo(() => {
    const map = new Map<string, typeof events>();
    events.forEach(ev => {
      // Parse dates like "Dec 24, 2024" or "Jan 5, 2025"
      const d = new Date(ev.date);
      if (isNaN(d.getTime())) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const arr = map.get(key) || [];
      arr.push(ev);
      map.set(key, arr);
    });
    return map;
  }, [events]);

  const fmtKey = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const selectedKey = selectedDate
    ? fmtKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    : null;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const prevDays = new Date(year, month, 0).getDate();
  const totalCells = Math.ceil((firstDow + daysInMonth) / 7) * 7;

  const cells: Array<{ day: number; key: string; cur: boolean }> = [];
  for (let i = firstDow - 1; i >= 0; i--) {
    const d = prevDays - i;
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    cells.push({ day: d, key: fmtKey(y, m, d), cur: false });
  }
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, key: fmtKey(year, month, d), cur: true });
  for (let d = 1; cells.length < totalCells; d++) {
    const m = month === 11 ? 0 : month + 1;
    const y = month === 11 ? year + 1 : year;
    cells.push({ day: d, key: fmtKey(y, m, d), cur: false });
  }

  const selectedEvents = selectedKey ? (eventsByDate.get(selectedKey) || []) : [];

  return (
    <div className="flex gap-6">
      {/* Calendar grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">{CAL_MONTHS[month]} {year}</h3>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="size-8 p-0" onClick={() => setCalDate(new Date(year, month - 1))}>
              <ChevronDown className="size-4 rotate-90" />
            </Button>
            <Button variant="ghost" size="sm" className="size-8 p-0 text-xs text-muted-foreground" onClick={() => setCalDate(new Date(2026, 2))}>
              Today
            </Button>
            <Button variant="ghost" size="sm" className="size-8 p-0" onClick={() => setCalDate(new Date(year, month + 1))}>
              <ChevronDown className="size-4 -rotate-90" />
            </Button>
          </div>
        </div>
        <div className="border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-7 bg-muted/50 border-b border-border">
            {CAL_DAYS.map(d => (
              <div key={d} className="py-2.5 text-center text-xs text-muted-foreground">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((cell, i) => {
              const dayEvts = eventsByDate.get(cell.key) || [];
              const isSel = cell.key === selectedKey;
              const isToday = cell.key === '2026-03-18';

              return (
                <button
                  key={i}
                  onClick={() => {
                    const [y, m, d] = cell.key.split('-').map(Number);
                    onSelectDate(new Date(y, m - 1, d));
                  }}
                  className={`min-h-[80px] p-1.5 border-b border-r border-border text-left transition-colors cursor-pointer
                    ${!cell.cur ? 'bg-muted/30' : 'bg-card hover:bg-muted/40'}
                    ${isSel ? 'bg-primary/5 ring-1 ring-inset ring-primary/20' : ''}
                  `}
                >
                  <span className={`inline-flex items-center justify-center size-6 text-xs rounded-full
                    ${isToday ? 'bg-primary text-primary-foreground' : ''}
                    ${!cell.cur ? 'text-muted-foreground/40' : 'text-foreground'}
                  `}>
                    {cell.day}
                  </span>
                  <div className="mt-0.5 space-y-px">
                    {dayEvts.slice(0, 2).map((ev: any) => (
                      <div key={ev.id} className="flex items-center gap-1 px-1 py-0.5 rounded bg-green-600/5 text-[10px]">
                        <span className="size-1.5 rounded-full bg-green-600 flex-shrink-0" />
                        <span className="truncate text-foreground/70">{ev.title}</span>
                      </div>
                    ))}
                    {dayEvts.length > 2 && (
                      <span className="text-[10px] text-muted-foreground pl-1">+{dayEvts.length - 2} more</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side panel */}
      <Card className="w-[300px] flex-shrink-0 p-5 self-start">
        <h3 className="text-sm text-foreground mb-1">
          {selectedDate
            ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
            : 'Select a date'}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''}
        </p>
        {selectedEvents.length === 0 ? (
          <div className="py-8 text-center">
            <Calendar className="size-6 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">{selectedDate ? 'No events on this day' : 'Click a date to see events'}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedEvents.map((ev: any) => (
              <div
                key={ev.id}
                onClick={() => onSelectEvent(ev.id)}
                className="p-3 border border-border rounded-lg hover:border-primary/20 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="size-2 rounded-full bg-green-600" />
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />{ev.time}
                  </span>
                </div>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors">{ev.title}</p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                  {ev.type === 'virtual' ? <Video className="size-3" /> : <MapPin className="size-3" />}
                  <span className="capitalize">{ev.type}</span>
                  <span>·</span>
                  <Users className="size-3" />
                  <span>{ev.attendees}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}