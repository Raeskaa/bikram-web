import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Hash,
  Bell,
  BellOff,
  Users,
  Settings,
  LogOut,
  Star,
  Search,
  Pin,
  Calendar,
  Link as LinkIcon,
  FileText,
  ChevronLeft,
  MessageSquare,
  TrendingUp,
  Award,
  BookOpen,
  Video
} from 'lucide-react';
import { DiscussionChannelV2 } from './DiscussionChannelV2';

interface CommunityMemberViewProps {
  communityId: string;
  onBack: () => void;
}

export function CommunityMemberView({ communityId, onBack }: CommunityMemberViewProps) {
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [activeTab, setActiveTab] = useState<'feed' | 'members' | 'events' | 'resources'>('feed');
  const [isFavorite, setIsFavorite] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const community = {
    id: communityId,
    name: 'React Developers Hub',
    description: 'A community for React developers to share knowledge, tips, and build together.',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=300&fit=crop',
    owner: 'Sarah Chen',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    members: 12453,
    onlineMembers: 3421,
    createdDate: 'January 2024',
    category: 'Development',
    tags: ['React', 'JavaScript', 'Web Development', 'Frontend'],
    rules: [
      'Be respectful and professional',
      'No spam or self-promotion',
      'Share knowledge and help others',
      'Keep discussions on-topic',
      'Follow code of conduct'
    ],
    links: [
      { id: '1', title: 'Official React Docs', url: 'https://react.dev' },
      { id: '2', title: 'Community GitHub', url: 'https://github.com' },
      { id: '3', title: 'Weekly Newsletter', url: 'https://newsletter.com' }
    ]
  };

  const channels = [
    { id: 'announcements', name: 'announcements', description: 'Official community announcements', unread: 2, isPinned: true, icon: Pin },
    { id: 'general', name: 'general', description: 'General discussions', unread: 23, isPinned: false, icon: MessageSquare },
    { id: 'help', name: 'help', description: 'Get help with React', unread: 8, isPinned: false, icon: MessageSquare },
    { id: 'showcase', name: 'showcase', description: 'Show off your projects', unread: 5, isPinned: false, icon: TrendingUp },
    { id: 'jobs', name: 'jobs', description: 'Job opportunities', unread: 0, isPinned: false, icon: MessageSquare },
    { id: 'resources', name: 'resources', description: 'Useful resources and links', unread: 1, isPinned: false, icon: BookOpen },
    { id: 'events', name: 'events', description: 'Community events', unread: 0, isPinned: false, icon: Calendar }
  ];

  const members = [
    { id: '1', name: 'Sarah Chen', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', title: 'Senior React Developer', isOnline: true, joinedDate: 'Jan 2024' },
    { id: '2', name: 'Mike Ross', role: 'Moderator', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', title: 'Full Stack Engineer', isOnline: true, joinedDate: 'Feb 2024' },
    { id: '3', name: 'Emily Rodriguez', role: 'Member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', title: 'Frontend Developer', isOnline: true, joinedDate: 'Mar 2024' },
    { id: '4', name: 'James Wilson', role: 'Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', title: 'React Consultant', isOnline: false, joinedDate: 'Mar 2024' },
    { id: '5', name: 'Alex Kumar', role: 'Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', title: 'Software Engineer', isOnline: true, joinedDate: 'Apr 2024' }
  ];

  const upcomingEvents = [
    { id: '1', title: 'React 19 Deep Dive', date: 'Dec 28, 2024', time: '2:00 PM PST', attendees: 145, isRegistered: true },
    { id: '2', title: 'Build a Full-Stack App', date: 'Jan 5, 2025', time: '10:00 AM PST', attendees: 98, isRegistered: false }
  ];

  const resources = [
    { id: '1', title: 'React Best Practices Guide', type: 'document', author: 'Sarah Chen', downloads: 342, date: '2 days ago' },
    { id: '2', title: 'Advanced Hooks Workshop Recording', type: 'video', author: 'Mike Ross', downloads: 189, date: '1 week ago' },
    { id: '3', title: 'Component Library Starter', type: 'code', author: 'Emily Rodriguez', downloads: 267, date: '3 days ago' }
  ];

  const selectedChannelData = channels.find(c => c.id === selectedChannel);

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="border-b border-border">
        {/* Cover Image */}
        <div className="relative h-48">
          <img src={community.coverImage} alt={community.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          
          <Button variant="ghost" onClick={onBack} className="absolute top-4 left-4 text-white hover:bg-white/20">
            <ChevronLeft className="w-5 h-5 mr-1" />Back
          </Button>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsFavorite(!isFavorite)} className="text-white hover:bg-white/20 h-9 w-9 p-0">
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setNotificationsEnabled(!notificationsEnabled)} className="text-white hover:bg-white/20 h-9 w-9 p-0">
              {notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-9 w-9 p-0">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Community Info */}
        <div className="px-8 pb-6">
          <div className="flex items-start gap-6">
            <img src={community.avatar} alt={community.name} className="w-24 h-24 rounded-2xl object-cover -mt-12 border-4 border-card" />
            
            <div className="flex-1 pt-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">{community.name}</h1>
                  <p className="text-muted-foreground max-w-2xl">{community.description}</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Users className="w-4 h-4 mr-2" />Invite Members
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">{community.members.toLocaleString()}</span>
                  <span>members</span>
                  <span className="text-green-600">({community.onlineMembers.toLocaleString()} online)</span>
                </div>
                <span>-</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /><span>Created {community.createdDate}</span>
                </div>
                <span>-</span>
                <Badge variant="outline">{community.category}</Badge>
              </div>

              <div className="flex items-center gap-2 mt-3">
                {community.tags.map((tag) => (
                  <Badge key={tag} className="bg-primary/10 text-primary hover:bg-primary/15">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="px-8">
          <TabsList className="bg-transparent h-auto p-0 border-t border-border">
            {[
              { value: 'feed', icon: MessageSquare, label: 'Feed' },
              { value: 'members', icon: Users, label: `Members (${community.members.toLocaleString()})` },
              { value: 'events', icon: Calendar, label: `Events (${upcomingEvents.length})` },
              { value: 'resources', icon: FileText, label: `Resources (${resources.length})` },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
              >
                <tab.icon className="w-4 h-4 mr-2" />{tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 flex min-h-0">
        {/* Channels Sidebar (only for feed tab) */}
        {activeTab === 'feed' && (
          <div className="w-64 border-r border-border bg-muted">
            <div className="p-4 border-b border-border bg-card">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search channels..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <ScrollArea className="h-full">
              <div className="p-3 space-y-1">
                {channels.map((channel) => (
                  <Button
                    key={channel.id}
                    variant="ghost"
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full justify-start px-3 py-2 h-auto ${
                      selectedChannel === channel.id ? 'bg-card' : 'hover:bg-card/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Hash className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm truncate ${selectedChannel === channel.id ? 'font-semibold text-foreground' : 'text-foreground/80'}`}>
                            {channel.name}
                          </span>
                          {channel.isPinned && <Pin className="w-3 h-3 text-primary flex-shrink-0" />}
                        </div>
                        {selectedChannel === channel.id && (
                          <p className="text-xs text-muted-foreground truncate">{channel.description}</p>
                        )}
                      </div>
                      {channel.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground hover:bg-primary flex-shrink-0">{channel.unread}</Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TabsContent value="feed" className="flex-1 m-0">
            <DiscussionChannelV2 
              channelName={selectedChannelData?.name || 'general'}
              channelDescription={selectedChannelData?.description || 'General discussions'}
            />
          </TabsContent>

          <TabsContent value="members" className="flex-1 m-0">
            <ScrollArea className="h-full">
              <div className="p-8">
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Community Members</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {community.members.toLocaleString()} total - {community.onlineMembers.toLocaleString()} online
                      </p>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search members..."
                        className="pl-9 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {members.map((member) => (
                      <Card key={member.id} className="p-5 border-border hover:border-primary/30 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-xl object-cover" />
                            {member.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground">{member.name}</h4>
                            <p className="text-sm text-muted-foreground truncate">{member.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge 
                                variant={member.role === 'Owner' ? 'default' : member.role === 'Moderator' ? 'secondary' : 'outline'}
                                className={member.role === 'Owner' ? 'bg-amber-500 hover:bg-amber-500' : member.role === 'Moderator' ? 'bg-blue-500 hover:bg-blue-500' : ''}
                              >
                                {member.role}
                              </Badge>
                              <span className="text-xs text-muted-foreground">Joined {member.joinedDate}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Message</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="events" className="flex-1 m-0">
            <ScrollArea className="h-full">
              <div className="p-8">
                <div className="max-w-3xl mx-auto space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Upcoming Events</h3>
                    <p className="text-sm text-muted-foreground mt-1">Events hosted by this community</p>
                  </div>

                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="p-6 border-border hover:border-primary/30 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2">{event.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{event.date}</span></div>
                              <span>-</span>
                              <span>{event.time}</span>
                              <span>-</span>
                              <div className="flex items-center gap-1"><Users className="w-4 h-4" /><span>{event.attendees} attending</span></div>
                            </div>
                            {event.isRegistered && (
                              <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">Registered</Badge>
                            )}
                          </div>
                          <Button 
                            variant={event.isRegistered ? 'outline' : 'default'}
                            className={!event.isRegistered ? 'bg-primary hover:bg-primary/90' : ''}
                          >
                            {event.isRegistered ? 'View Event' : 'Register'}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="resources" className="flex-1 m-0">
            <ScrollArea className="h-full">
              <div className="p-8">
                <div className="max-w-3xl mx-auto space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Community Resources</h3>
                    <p className="text-sm text-muted-foreground mt-1">Shared files, documents, and links</p>
                  </div>

                  <div className="space-y-4">
                    {resources.map((resource) => (
                      <Card key={resource.id} className="p-5 border-border hover:border-primary/30 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                              {resource.type === 'document' && <FileText className="w-6 h-6 text-primary-foreground" />}
                              {resource.type === 'video' && <Video className="w-6 h-6 text-primary-foreground" />}
                              {resource.type === 'code' && <BookOpen className="w-6 h-6 text-primary-foreground" />}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">{resource.title}</h4>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>By {resource.author}</span>
                                <span>-</span>
                                <span>{resource.downloads} downloads</span>
                                <span>-</span>
                                <span>{resource.date}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                            Download
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>

        {/* Community Info Sidebar (for non-feed tabs) */}
        {activeTab !== 'feed' && (
          <div className="w-80 border-l border-border bg-muted">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">About</h4>
                  <p className="text-sm text-muted-foreground">{community.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Community Rules</h4>
                  <ul className="space-y-2">
                    {community.rules.map((rule, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary font-semibold">{index + 1}.</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Useful Links</h4>
                  <div className="space-y-2">
                    {community.links.map((link) => (
                      <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline">
                        <LinkIcon className="w-3.5 h-3.5" /><span>{link.title}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />Leave Community
                </Button>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
