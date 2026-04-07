import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Settings as SettingsIcon, BarChart3, Mail, MessageSquare, Video, Link2, Plus, Edit, Trash2, Send, ChevronDown, ChevronRight, CheckCircle, AlertCircle, TrendingUp, Activity, Bell, Filter, Search, Download, Upload, ExternalLink, Copy, Share2, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Conversation, Message, AppVersion } from '../types';
import { CreateCommunityFromEventModal } from './LinkContentModals';

interface EventData {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: number;
  type?: 'virtual' | 'in-person' | 'hybrid';
}

interface EventBuilderViewProps {
  conversation: Conversation;
  onUpdateMessages: (messages: Message[]) => void;
  eventData: Partial<EventData>;
  onBack: () => void;
  appVersion?: AppVersion;
  onVersionChange?: (version: AppVersion) => void;
  userMode?: 'creator' | 'learner';
  onModeChange?: (mode: 'creator' | 'learner') => void;
}

// Sample attendee data
const sampleAttendees = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', status: 'confirmed', ticket: 'General', checkedIn: false, registeredAt: '2024-05-01' },
  { id: '2', name: 'Marcus Webb', email: 'marcus@example.com', status: 'confirmed', ticket: 'VIP', checkedIn: false, registeredAt: '2024-05-02' },
  { id: '3', name: 'Elena Rodriguez', email: 'elena@example.com', status: 'waitlist', ticket: 'General', checkedIn: false, registeredAt: '2024-05-03' },
  { id: '4', name: 'James Park', email: 'james@example.com', status: 'confirmed', ticket: 'General', checkedIn: true, registeredAt: '2024-05-01' },
  { id: '5', name: 'Aisha Kumar', email: 'aisha@example.com', status: 'confirmed', ticket: 'General', checkedIn: false, registeredAt: '2024-05-04' },
];

const scheduleItems = [
  { id: '1', time: '2:00 PM', title: 'Welcome & Introduction', description: 'Opening remarks and event overview', duration: '15 min' },
  { id: '2', time: '2:15 PM', title: 'Main Presentation', description: 'Core content and demonstrations', duration: '60 min' },
  { id: '3', time: '3:15 PM', title: 'Break & Networking', description: 'Coffee break and casual networking', duration: '15 min' },
  { id: '4', time: '3:30 PM', title: 'Q&A Session', description: 'Questions and open discussion', duration: '30 min' },
];

export function EventBuilderView({ conversation, onUpdateMessages, eventData, onBack, appVersion, onVersionChange, userMode, onModeChange }: EventBuilderViewProps) {
  const [mainView, setMainView] = useState<'overview' | 'details' | 'schedule' | 'attendees' | 'registration' | 'communication' | 'analytics' | 'settings'>('overview');
  const [emailComposer, setEmailComposer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [showCreateCommunityModal, setShowCreateCommunityModal] = useState(false);

  const [scheduleItems, setScheduleItems] = useState([
    { id: '1', time: '14:00', title: 'Welcome & Introduction', description: 'Opening remarks and event overview', duration: 15, type: 'session', speakers: ['1'] },
    { id: '2', time: '14:15', title: 'Main Presentation', description: 'Core content and demonstrations', duration: 60, type: 'session', speakers: ['2'] },
    { id: '3', time: '15:15', title: 'Break & Networking', description: 'Coffee break and casual networking', duration: 15, type: 'break', speakers: [] },
    { id: '4', time: '15:30', title: 'Q&A Session', description: 'Questions and open discussion', duration: 30, type: 'session', speakers: ['1', '2'] },
  ]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<any>(null); // For creating new items

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'details', label: 'Event Details', icon: Edit },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'attendees', label: 'Attendees', icon: Users },
    { id: 'registration', label: 'Registration', icon: CheckCircle },
    { id: 'communication', label: 'Communication', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const stats = [
    { label: 'Total Registered', value: '127', change: '+18 today', icon: Users, color: 'neutral' },
    { label: 'Confirmed', value: '108', change: '85%', icon: CheckCircle, color: 'green' },
    { label: 'Waitlist', value: '19', change: '15%', icon: Clock, color: 'orange' },
    { label: 'Checked In', value: '3', change: '2%', icon: Activity, color: 'blue' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      neutral: 'bg-muted text-foreground',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      blue: 'bg-muted text-foreground',
    };
    return colors[color as keyof typeof colors] || colors.neutral;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Event Header Card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-green-200 via-teal-200 to-cyan-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Calendar className="size-12 mx-auto mb-3 opacity-80" />
              <h2 className="text-3xl font-bold drop-shadow-lg">{eventData.title}</h2>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="size-5 text-foreground" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium text-gray-900">{eventData.date || 'May 15, 2024'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-foreground" />
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-sm font-medium text-gray-900">{eventData.time || '2:00 PM EST'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {eventData.type === 'virtual' ? (
                <Video className="size-5 text-foreground" />
              ) : (
                <MapPin className="size-5 text-foreground" />
              )}
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-900">
                  {eventData.type === 'virtual' ? 'Virtual (Zoom)' : eventData.location || 'TechHub'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="size-5 text-foreground" />
              <div>
                <p className="text-xs text-gray-500">Capacity</p>
                <p className="text-sm font-medium text-gray-900">{eventData.capacity || 100} people</p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">{eventData.description}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="size-5" />
              </div>
              <span className="text-xs text-gray-500">{stat.change}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-gray-900 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-gray-900 font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="justify-start" onClick={() => setMainView('communication')}>
            <Mail className="size-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => setMainView('attendees')}>
            <Users className="size-4 mr-2" />
            View Attendees
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => setMainView('schedule')}>
            <Clock className="size-4 mr-2" />
            Edit Schedule
          </Button>
          <Button variant="outline" className="justify-start">
            <Share2 className="size-4 mr-2" />
            Share Event
          </Button>
        </div>
      </div>

      {/* Community Hook Section - "THE HOOK" */}
      {parseInt(stats[0].value) >= 50 && (
        <div className="bg-muted border-2 border-border rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="size-12 bg-foreground rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="size-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-foreground font-medium">Great Turnout! Turn This Into a Community</h4>
                <Badge className="bg-muted text-foreground border-border">
                  Recommended
                </Badge>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                You have <strong>{stats[0].value} registered attendees</strong> - that's amazing! Why not keep the momentum going by creating a dedicated community? 
                Your attendees can stay connected, you can share follow-up content, and even launch courses or future events.
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setShowCreateCommunityModal(true)}
                >
                  <TrendingUp className="size-3 mr-2" />
                  Turn Into Community
                </Button>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Regular Community Link Option */}
      {parseInt(stats[0].value) < 50 && (
        <div className="bg-muted border border-border rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Link2 className="size-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900 font-medium mb-2">Community Integration</h4>
              <p className="text-gray-600 text-sm mb-4">
                Link this event to an existing community or create a new one to build lasting engagement.
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link2 className="size-3 mr-2" />
                  Link to Community
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowCreateCommunityModal(true)}
                >
                  Create New Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDetails = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-gray-900 font-medium mb-4">Event Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
            <input
              type="text"
              defaultValue={eventData.title}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea
              defaultValue={eventData.description}
              className="w-full min-h-[120px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                defaultValue={eventData.date}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                defaultValue={eventData.time}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location / Link</label>
            <input
              type="text"
              defaultValue={eventData.location}
              placeholder="Enter venue address or virtual meeting link"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
            <input
              type="number"
              defaultValue={eventData.capacity}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save Changes
            </Button>
            <Button variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleScheduleChange = (id: string, field: string, value: any) => {
    setScheduleItems(items => items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const moveScheduleItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === scheduleItems.length - 1) return;
    
    const newItems = [...scheduleItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setScheduleItems(newItems);
  };

  const addScheduleItem = () => {
    const newItem = {
      id: Date.now().toString(),
      time: '12:00',
      title: 'New Session',
      description: 'Session description',
      duration: 30,
      type: 'session',
      speakers: []
    };
    setScheduleItems([...scheduleItems, newItem]);
    setEditingItemId(newItem.id);
  };

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 font-medium">Event Schedule</h3>
            <p className="text-sm text-gray-500 mt-1">Build your event agenda. Times are calculated automatically.</p>
          </div>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={addScheduleItem}>
            <Plus className="size-4 mr-2" />
            Add Session
          </Button>
        </div>
        
        <div className="space-y-4">
          {scheduleItems.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Clock className="size-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No sessions yet</p>
              <p className="text-sm text-gray-400 mb-4">Start adding items to build your schedule</p>
              <Button size="sm" variant="outline" onClick={addScheduleItem}>Add First Session</Button>
            </div>
          )}

          {scheduleItems.map((item, index) => {
            const isEditing = editingItemId === item.id;
            
            // Calculate end time roughly
            const [hours, mins] = item.time.split(':').map(Number);
            const endDate = new Date();
            endDate.setHours(hours, mins + item.duration);
            const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div 
                key={item.id} 
                className={`flex flex-col md:flex-row items-start gap-4 p-4 border rounded-lg transition-all ${
                  isEditing ? 'border-foreground/50 bg-muted ring-1 ring-foreground/50' : 'border-gray-200 hover:border-border bg-white'
                }`}
              >
                {/* Time Column */}
                <div className="w-full md:w-32 flex-shrink-0 pt-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                       <input
                        type="time"
                        value={item.time}
                        onChange={(e) => handleScheduleChange(item.id, 'time', e.target.value)}
                        className="w-full text-sm font-medium border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                  ) : (
                    <div className="text-right md:text-left">
                      <div className="text-sm font-bold text-gray-900">{item.time}</div>
                      <div className="text-xs text-gray-500">{item.duration} min</div>
                    </div>
                  )}
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0 w-full space-y-3">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleScheduleChange(item.id, 'title', e.target.value)}
                        className="w-full font-medium text-gray-900 border border-gray-300 rounded px-2 py-1.5 focus:ring-2 focus:ring-foreground/50 focus:border-transparent"
                        placeholder="Session Title"
                      />
                      <Textarea
                        value={item.description}
                        onChange={(e) => handleScheduleChange(item.id, 'description', e.target.value)}
                        className="w-full text-sm min-h-[60px]"
                        placeholder="Session Description"
                      />
                      <div className="flex gap-4">
                        <div className="w-1/3">
                          <label className="text-xs font-medium text-gray-500 mb-1 block">Duration (min)</label>
                          <input
                            type="number"
                            value={item.duration}
                            onChange={(e) => handleScheduleChange(item.id, 'duration', parseInt(e.target.value) || 0)}
                            className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                          />
                        </div>
                         <div className="w-1/3">
                          <label className="text-xs font-medium text-gray-500 mb-1 block">Type</label>
                          <select 
                            value={item.type}
                            onChange={(e) => handleScheduleChange(item.id, 'type', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                          >
                            <option value="session">Session</option>
                            <option value="workshop">Workshop</option>
                            <option value="break">Break</option>
                            <option value="networking">Networking</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-900 font-medium truncate">{item.title}</h4>
                        {item.type === 'break' && <Badge variant="secondary" className="text-xs">Break</Badge>}
                        {item.type === 'workshop' && <Badge className="text-xs bg-muted text-foreground border-border">Workshop</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      
                      {item.speakers && item.speakers.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                           <div className="flex -space-x-2">
                            {item.speakers.map((sId: string) => (
                              <div key={sId} className="size-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-medium text-gray-600">
                                {sId}
                              </div>
                            ))}
                           </div>
                           <span className="text-xs text-gray-500">{item.speakers.length} Speaker(s)</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions Column */}
                <div className="flex flex-row md:flex-col gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity self-start md:self-center">
                   {isEditing ? (
                     <Button size="sm" className="bg-green-600 text-white hover:bg-green-700 h-8" onClick={() => setEditingItemId(null)}>
                       Done
                     </Button>
                   ) : (
                     <>
                        <div className="flex flex-col gap-1 bg-gray-50 rounded-lg p-1">
                          <button 
                            onClick={() => moveScheduleItem(index, 'up')}
                            disabled={index === 0}
                            className="p-1.5 hover:bg-white hover:shadow-sm rounded transition-all disabled:opacity-30 text-gray-500"
                            title="Move Up"
                          >
                            <ChevronDown className="size-3.5 rotate-180" />
                          </button>
                          <button 
                            onClick={() => moveScheduleItem(index, 'down')}
                            disabled={index === scheduleItems.length - 1}
                            className="p-1.5 hover:bg-white hover:shadow-sm rounded transition-all disabled:opacity-30 text-gray-500"
                            title="Move Down"
                          >
                            <ChevronDown className="size-3.5" />
                          </button>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                          <button 
                            onClick={() => setEditingItemId(item.id)}
                            className="p-1.5 hover:bg-muted text-foreground rounded transition-colors"
                            title="Edit"
                          >
                            <Edit className="size-3.5" />
                          </button>
                          <button 
                            onClick={() => {
                              if(confirm('Delete this session?')) {
                                setScheduleItems(items => items.filter(i => i.id !== item.id));
                              }
                            }}
                            className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                     </>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const [attendees, setAttendees] = useState(sampleAttendees);
  
  const handleCheckIn = (id: string) => {
    setAttendees(items => items.map(item => 
      item.id === id ? { ...item, checkedIn: !item.checkedIn } : item
    ));
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Status', 'Ticket', 'Registered At', 'Checked In'];
    const rows = attendees.map(a => [
      a.name, 
      a.email, 
      a.status, 
      a.ticket, 
      a.registeredAt, 
      a.checkedIn ? 'Yes' : 'No'
    ]);
    
    const csvContent = [
      headers.join(','), 
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendees-${eventData.title?.replace(/\s+/g, '-').toLowerCase() || 'event'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderAttendees = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 font-medium">Attendee Management</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search attendees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 h-9 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <Button size="sm" variant="outline">
              <Filter className="size-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" variant="outline" onClick={handleExportCSV}>
              <Download className="size-4 mr-2" />
              Export CSV
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="size-4 mr-2" />
              Add Attendee
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Ticket</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Check-In</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendees
                .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.email.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((attendee) => (
                <tr key={attendee.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${attendee.checkedIn ? 'bg-green-50/30' : ''}`}>
                  <td className="py-3 px-4">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={selectedAttendees.includes(attendee.id)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedAttendees([...selectedAttendees, attendee.id]);
                        else setSelectedAttendees(selectedAttendees.filter(id => id !== attendee.id));
                      }}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-muted text-foreground flex items-center justify-center text-xs font-medium">
                        {attendee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{attendee.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{attendee.email}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className={
                        attendee.status === 'confirmed'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-orange-50 text-orange-700 border-orange-200'
                      }
                    >
                      {attendee.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{attendee.ticket}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <button 
                      onClick={() => handleCheckIn(attendee.id)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors border ${
                        attendee.checkedIn 
                          ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {attendee.checkedIn ? (
                        <>
                          <CheckCircle className="size-3" />
                          Checked In
                        </>
                      ) : (
                        <>
                          <span className="size-3 rounded-full border border-current opacity-50"></span>
                          Check In
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-sm text-foreground hover:text-foreground/80 font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {attendees.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
            <div className="text-center py-12">
              <Search className="size-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No attendees found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommunication = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-gray-900 font-medium mb-4">Send Email to Attendees</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent">
              <option>All Attendees (87)</option>
              <option>Confirmed Only (72)</option>
              <option>Waitlist Only (15)</option>
              <option>Not Checked In (86)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              placeholder="Event reminder: 1 day to go!"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <Textarea
              value={emailComposer}
              onChange={(e) => setEmailComposer(e.target.value)}
              placeholder="Write your message..."
              className="w-full min-h-[200px]"
            />
          </div>
          <div className="flex gap-2">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="size-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline">
              Save Draft
            </Button>
          </div>
        </div>
      </div>

      {/* Email Templates */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-gray-900 font-medium mb-4">Email Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {['Confirmation Email', 'Reminder (1 day)', 'Reminder (1 hour)', 'Thank You Email', 'Feedback Request', 'Follow-up'].map((template) => (
            <button
              key={template}
              className="p-3 border border-gray-200 rounded-lg hover:border-border hover:bg-muted transition-colors text-left"
            >
              <p className="text-sm font-medium text-gray-900">{template}</p>
              <p className="text-xs text-gray-500 mt-1">Click to use this template</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-gray-900 font-medium mb-4">Registration Analytics</h3>
        <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50">
          <div className="text-center text-gray-500">
            <BarChart3 className="size-12 mx-auto mb-3 text-gray-400" />
            <p>Registration chart will appear here</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-gray-900 font-medium mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Direct Link</span>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Social Media</span>
              <span className="text-sm font-medium text-gray-900">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Email</span>
              <span className="text-sm font-medium text-gray-900">20%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Other</span>
              <span className="text-sm font-medium text-gray-900">5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-gray-900 font-medium mb-4">Registration Timeline</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Week 1</span>
              <span className="text-sm font-medium text-gray-900">23 registrations</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Week 2</span>
              <span className="text-sm font-medium text-gray-900">34 registrations</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Week 3</span>
              <span className="text-sm font-medium text-gray-900">21 registrations</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-sm font-medium text-gray-900">9 registrations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
          >
            <ArrowLeft className="size-4" />
            <span className="text-sm">Back to Events</span>
          </button>
          <h2 className="font-medium text-gray-900 truncate">{eventData.title}</h2>
          <p className="text-xs text-gray-500 mt-1">Event Builder</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setMainView(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                mainView === item.id
                  ? 'bg-muted text-foreground'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className={`size-[18px] ${mainView === item.id ? 'text-foreground' : 'text-gray-600'}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-gray-200">
          <Button size="sm" variant="outline" className="w-full justify-start mb-2">
            <ExternalLink className="size-4 mr-2" />
            View Public Page
          </Button>
          <Button size="sm" variant="outline" className="w-full justify-start">
            <Copy className="size-4 mr-2" />
            Copy Event Link
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {mainView === 'overview' && renderOverview()}
        {mainView === 'details' && renderDetails()}
        {mainView === 'schedule' && renderSchedule()}
        {mainView === 'attendees' && renderAttendees()}
        {mainView === 'communication' && renderCommunication()}
        {mainView === 'analytics' && renderAnalytics()}
        {mainView === 'registration' && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-gray-900 font-medium mb-4">Registration Settings</h3>
            <p className="text-gray-600">Registration form configuration will appear here</p>
          </div>
        )}
        {mainView === 'settings' && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-gray-900 font-medium mb-4">Event Settings</h3>
            <p className="text-gray-600">General event settings will appear here</p>
          </div>
        )}
      </div>

      {/* Create Community from Event Modal - "THE HOOK" */}
      <CreateCommunityFromEventModal
        isOpen={showCreateCommunityModal}
        onClose={() => setShowCreateCommunityModal(false)}
        eventTitle={eventData.title || 'Your Event'}
        eventDescription={eventData.description || ''}
        attendeeCount={parseInt(stats[0].value)}
        onConfirm={() => {
          console.log('Community created from event');
          // Navigate to new community
          setShowCreateCommunityModal(false);
        }}
      />
    </div>
  );
}