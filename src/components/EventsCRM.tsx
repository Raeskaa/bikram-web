import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  Users, Search, Filter, Download, Mail, MessageCircle, 
  MoreVertical, TrendingUp, Calendar, Clock, Star, Target,
  CheckCircle, XCircle, AlertCircle, Eye, Send, Share2,
  Zap, BarChart3, Phone, Briefcase, MapPin, Tag, ArrowUpRight,
  UserPlus, UserMinus, Edit, Trash2, FileText, Activity
} from 'lucide-react';

interface Lead {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  role?: string;
  phone?: string;
  eventId: string;
  eventTitle: string;
  registeredAt: string;
  status: 'registered' | 'attended' | 'no-show' | 'cancelled';
  communityMemberStatus: 'active' | 'inactive' | 'pending';
  engagementScore: number;
  source: 'organic' | 'linkedin' | 'instagram' | 'email' | 'referral';
  tags: string[];
  notes: string;
  lastActivity?: string;
}

interface EventsCRMProps {
  eventId?: string;
  eventTitle?: string;
}

export function EventsCRM({ eventId, eventTitle }: EventsCRMProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Sample leads data
  const sampleLeads: Lead[] = [
    {
      id: '1',
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      company: 'Tech Corp',
      role: 'Software Engineer',
      phone: '+1 (555) 123-4567',
      eventId: 'evt1',
      eventTitle: 'Backend Dev Crash Course',
      registeredAt: '2025-01-10T14:30:00Z',
      status: 'registered',
      communityMemberStatus: 'active',
      engagementScore: 85,
      source: 'linkedin',
      tags: ['high-potential', 'developer'],
      notes: 'Very interested in Node.js topics',
      lastActivity: '2 hours ago',
    },
    {
      id: '2',
      fullName: 'Sarah Johnson',
      email: 'sarah.j@design.co',
      company: 'Design Studio',
      role: 'UI Designer',
      eventId: 'evt2',
      eventTitle: 'UI/UX Masterclass',
      registeredAt: '2025-01-09T10:15:00Z',
      status: 'attended',
      communityMemberStatus: 'active',
      engagementScore: 92,
      source: 'instagram',
      tags: ['engaged', 'designer', 'vip'],
      notes: 'Posted positive feedback on social media',
      lastActivity: '1 day ago',
    },
    {
      id: '3',
      fullName: 'Mike Chen',
      email: 'mike.chen@startup.io',
      company: 'StartupXYZ',
      role: 'Founder',
      phone: '+1 (555) 987-6543',
      eventId: 'evt1',
      eventTitle: 'Backend Dev Crash Course',
      registeredAt: '2025-01-08T16:45:00Z',
      status: 'no-show',
      communityMemberStatus: 'inactive',
      engagementScore: 35,
      source: 'email',
      tags: ['follow-up-needed'],
      notes: 'Requested recording',
      lastActivity: '5 days ago',
    },
    {
      id: '4',
      fullName: 'Emily Rodriguez',
      email: 'emily.r@marketing.com',
      company: 'Marketing Agency',
      role: 'Digital Marketer',
      eventId: 'evt3',
      eventTitle: 'Digital Marketing 2025',
      registeredAt: '2025-01-11T09:00:00Z',
      status: 'registered',
      communityMemberStatus: 'active',
      engagementScore: 78,
      source: 'organic',
      tags: ['marketer', 'potential-customer'],
      notes: 'Interested in SEO tools',
      lastActivity: '3 hours ago',
    },
  ];

  const filteredLeads = sampleLeads.filter(lead => {
    const matchesSearch = lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    const matchesEvent = !eventId || lead.eventId === eventId;
    
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const stats = {
    totalLeads: sampleLeads.length,
    registered: sampleLeads.filter(l => l.status === 'registered').length,
    attended: sampleLeads.filter(l => l.status === 'attended').length,
    noShow: sampleLeads.filter(l => l.status === 'no-show').length,
    activeMembers: sampleLeads.filter(l => l.communityMemberStatus === 'active').length,
    avgEngagement: Math.round(sampleLeads.reduce((sum, l) => sum + l.engagementScore, 0) / sampleLeads.length),
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(l => l.id));
    }
  };

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'registered': return 'bg-muted text-foreground border-border';
      case 'attended': return 'bg-green-100 text-green-700 border-green-200';
      case 'no-show': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-foreground';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-gray-900">Event Leads & CRM</h2>
            <p className="text-sm text-gray-600 mt-1">
              {eventTitle ? `Leads for ${eventTitle}` : 'All event leads across your events'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              Export CSV
            </Button>
            {selectedLeads.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Send className="size-4 mr-2" />
                    Bulk Actions ({selectedLeads.length})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-1" align="end">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    <Mail className="size-4" />
                    Send Email Campaign
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    <Tag className="size-4" />
                    Add Tags
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    <MessageCircle className="size-4" />
                    Send WhatsApp Message
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                    <Trash2 className="size-4" />
                    Delete Selected
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-6 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="size-4 text-gray-400" />
              <span className="text-xs text-gray-600">Total Leads</span>
            </div>
            <p className="text-xl text-gray-900">{stats.totalLeads}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="size-4 text-foreground" />
              <span className="text-xs text-foreground">Registered</span>
            </div>
            <p className="text-xl text-foreground">{stats.registered}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="size-4 text-green-600" />
              <span className="text-xs text-green-600">Attended</span>
            </div>
            <p className="text-xl text-green-900">{stats.attended}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="size-4 text-orange-600" />
              <span className="text-xs text-orange-600">No-Show</span>
            </div>
            <p className="text-xl text-orange-900">{stats.noShow}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <UserPlus className="size-4 text-foreground" />
              <span className="text-xs text-foreground">Active Members</span>
            </div>
            <p className="text-xl text-foreground">{stats.activeMembers}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="size-4 text-foreground" />
              <span className="text-xs text-foreground">Avg Engagement</span>
            </div>
            <p className="text-xl text-foreground">{stats.avgEngagement}%</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-gray-400" />
            <select
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="registered">Registered</option>
              <option value="attended">Attended</option>
              <option value="no-show">No-Show</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded text-sm ${
                viewMode === 'table' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded text-sm ${
                viewMode === 'cards' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
              }`}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <ScrollArea className="flex-1 bg-gray-50">
        <div className="p-6">
          {viewMode === 'table' ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                        onChange={handleSelectAll}
                        className="size-4 rounded border-gray-300 text-foreground focus:ring-ring"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">Name</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">Contact</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">Event</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">Engagement</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">Source</th>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">Member</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead.id)}
                          onChange={() => handleSelectLead(lead.id)}
                          className="size-4 rounded border-gray-300 text-foreground focus:ring-ring"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-900 font-medium">{lead.fullName}</p>
                          {lead.company && (
                            <p className="text-xs text-gray-500">{lead.company} • {lead.role}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Mail className="size-3" />
                            <span>{lead.email}</span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Phone className="size-3" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-900">{lead.eventTitle}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(lead.registeredAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                lead.engagementScore >= 80 ? 'bg-green-500' :
                                lead.engagementScore >= 60 ? 'bg-primary' :
                                lead.engagementScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${lead.engagementScore}%` }}
                            />
                          </div>
                          <span className={`text-sm font-medium ${getEngagementColor(lead.engagementScore)}`}>
                            {lead.engagementScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-xs">
                          {lead.source}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {lead.communityMemberStatus === 'active' ? (
                            <CheckCircle className="size-4 text-green-600" />
                          ) : lead.communityMemberStatus === 'inactive' ? (
                            <AlertCircle className="size-4 text-orange-600" />
                          ) : (
                            <Clock className="size-4 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="size-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 p-1" align="end">
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                              <Eye className="size-4" />
                              View Details
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                              <Mail className="size-4" />
                              Send Email
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                              <Edit className="size-4" />
                              Edit Notes
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                              <Tag className="size-4" />
                              Add Tags
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                              <Trash2 className="size-4" />
                              Delete Lead
                            </button>
                          </PopoverContent>
                        </Popover>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="text-center py-12">
                  <Users className="size-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No leads found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-border transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-900 font-medium">{lead.fullName}</h3>
                      {lead.company && (
                        <p className="text-xs text-gray-500">{lead.company} • {lead.role}</p>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectLead(lead.id)}
                      className="size-4 rounded border-gray-300 text-foreground focus:ring-ring"
                    />
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Mail className="size-3" />
                      <span className="truncate">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="size-3" />
                      <span>{lead.eventTitle}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                    <Badge variant="secondary" className="text-xs">{lead.source}</Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-600">Engagement:</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          lead.engagementScore >= 80 ? 'bg-green-500' :
                          lead.engagementScore >= 60 ? 'bg-primary' :
                          lead.engagementScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${lead.engagementScore}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${getEngagementColor(lead.engagementScore)}`}>
                      {lead.engagementScore}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="size-3 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="size-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}