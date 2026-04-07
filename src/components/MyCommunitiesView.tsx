import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import {
  Search,
  Filter,
  Users,
  MessageSquare,
  Bell,
  BellOff,
  Star,
  Settings,
  LogOut,
  MoreVertical,
  TrendingUp,
  Calendar,
  Hash,
  Crown,
  Shield,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface MyCommunitiesViewProps {
  onSelectCommunity: (communityId: string) => void;
  onBack: () => void;
}

export function MyCommunitiesView({ onSelectCommunity, onBack }: MyCommunitiesViewProps) {
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'favorites' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'members' | 'activity'>('recent');

  const communities = [
    {
      id: '1',
      name: 'React Developers Hub',
      description: 'A community for React developers to share knowledge, tips, and build together.',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=200&fit=crop',
      members: 12453,
      channels: 24,
      unreadMessages: 23,
      lastActivity: 'Active now',
      role: 'member' as const,
      joined: 'Jan 15, 2024',
      isFavorite: true,
      notifications: true,
      activityLevel: 'high' as const,
      owner: 'Sarah Chen',
      category: 'Development'
    },
    {
      id: '2',
      name: 'Design Systems Weekly',
      description: 'Learn and discuss design systems, component libraries, and design tokens.',
      avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=200&fit=crop',
      members: 8921,
      channels: 15,
      unreadMessages: 5,
      lastActivity: '12m ago',
      role: 'moderator' as const,
      joined: 'Feb 3, 2024',
      isFavorite: true,
      notifications: true,
      activityLevel: 'high' as const,
      owner: 'Emily Rodriguez',
      category: 'Design'
    },
    {
      id: '3',
      name: 'Indie Makers',
      description: 'For indie hackers and solopreneurs building products and sharing the journey.',
      avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=200&fit=crop',
      members: 6234,
      channels: 18,
      unreadMessages: 0,
      lastActivity: '2h ago',
      role: 'member' as const,
      joined: 'Mar 10, 2024',
      isFavorite: false,
      notifications: true,
      activityLevel: 'medium' as const,
      owner: 'James Wilson',
      category: 'Business'
    },
    {
      id: '4',
      name: 'TypeScript Masters',
      description: 'Advanced TypeScript patterns, best practices, and type-level programming.',
      avatar: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&h=200&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=200&fit=crop',
      members: 5432,
      channels: 12,
      unreadMessages: 8,
      lastActivity: '1h ago',
      role: 'member' as const,
      joined: 'Apr 5, 2024',
      isFavorite: false,
      notifications: true,
      activityLevel: 'medium' as const,
      owner: 'Mike Ross',
      category: 'Development'
    },
    {
      id: '5',
      name: 'Web3 Builders',
      description: 'Building the decentralized web together. NFTs, DeFi, DAOs, and more.',
      avatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=200&fit=crop',
      members: 3876,
      channels: 20,
      unreadMessages: 0,
      lastActivity: '1 day ago',
      role: 'member' as const,
      joined: 'May 12, 2024',
      isFavorite: false,
      notifications: false,
      activityLevel: 'low' as const,
      owner: 'Alex Kumar',
      category: 'Technology'
    }
  ];

  const filteredCommunities = communities.filter(community => {
    if (filterTab === 'favorites' && !community.isFavorite) return false;
    if (filterTab === 'active' && community.activityLevel === 'low') return false;

    if (searchQuery && !community.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !community.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const stats = {
    total: communities.length,
    active: communities.filter(c => c.activityLevel !== 'low').length,
    favorites: communities.filter(c => c.isFavorite).length,
    totalMembers: communities.reduce((acc, c) => acc + c.members, 0),
    unreadTotal: communities.reduce((acc, c) => acc + c.unreadMessages, 0)
  };

  const getRoleIcon = (role: string) => {
    if (role === 'owner') return <Crown className="w-4 h-4 text-amber-500" />;
    if (role === 'moderator') return <Shield className="w-4 h-4 text-blue-500" />;
    return null;
  };

  const getRoleBadge = (role: string) => {
    if (role === 'owner') return <Badge className="bg-amber-500 text-white hover:bg-amber-500">Owner</Badge>;
    if (role === 'moderator') return <Badge className="bg-blue-500 text-white hover:bg-blue-500">Moderator</Badge>;
    return <Badge variant="outline">Member</Badge>;
  };

  const getActivityColor = (level: string) => {
    if (level === 'high') return 'text-green-600';
    if (level === 'medium') return 'text-yellow-600';
    return 'text-muted-foreground/60';
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-muted via-background to-purple-50/30">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-700 to-purple-900 bg-clip-text text-transparent">
                My Communities
              </h1>
              <p className="text-muted-foreground mt-1">{stats.total} communities • {stats.unreadTotal} unread messages</p>
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
                  <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                  <div className="text-sm text-muted-foreground mt-1">Total Communities</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.active}</div>
                  <div className="text-sm text-muted-foreground mt-1">Active</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.favorites}</div>
                  <div className="text-sm text-muted-foreground mt-1">Favorites</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.unreadTotal}</div>
                  <div className="text-sm text-muted-foreground mt-1">Unread Messages</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>
          </div>

          {/* Filters & Search */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={filterTab === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterTab('all')}
                className={filterTab === 'all' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                All ({stats.total})
              </Button>
              <Button
                variant={filterTab === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterTab('active')}
                className={filterTab === 'active' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                Active ({stats.active})
              </Button>
              <Button
                variant={filterTab === 'favorites' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterTab('favorites')}
                className={filterTab === 'favorites' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <Star className="w-3.5 h-3.5 mr-1.5" />
                Favorites ({stats.favorites})
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <Input
                  placeholder="Search communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Sort: {sortBy === 'recent' ? 'Recent' : sortBy === 'name' ? 'Name' : sortBy === 'members' ? 'Members' : 'Activity'}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy('recent')}>
                    Recent Activity
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('name')}>
                    Name (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('members')}>
                    Most Members
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('activity')}>
                    Most Active
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Communities Grid */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {filteredCommunities.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-muted-foreground/60" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No communities found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {filteredCommunities.map((community) => (
                <Card 
                  key={community.id}
                  className="group cursor-pointer border-border hover:border-primary/30 hover:shadow-xl transition-all overflow-hidden"
                  onClick={() => onSelectCommunity(community.id)}
                >
                  {/* Cover Image */}
                  <div className="relative h-32">
                    <img 
                      src={community.coverImage} 
                      alt={community.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Favorite Star */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle favorite
                      }}
                      className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <Star 
                        className={`w-4 h-4 ${community.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`}
                      />
                    </Button>

                    {/* Unread Badge */}
                    {community.unreadMessages > 0 && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground hover:bg-primary">
                        {community.unreadMessages} new
                      </Badge>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Avatar & Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={community.avatar} 
                        alt={community.name}
                        className="w-16 h-16 rounded-xl object-cover -mt-8 border-4 border-white shadow-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                            {community.name}
                          </h3>
                          {getRoleIcon(community.role)}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {community.description}
                        </p>
                        {getRoleBadge(community.role)}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            {community.isFavorite ? (
                              <>
                                <Star className="w-4 h-4 mr-2" />
                                Remove from Favorites
                              </>
                            ) : (
                              <>
                                <Star className="w-4 h-4 mr-2" />
                                Add to Favorites
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {community.notifications ? (
                              <>
                                <BellOff className="w-4 h-4 mr-2" />
                                Mute Notifications
                              </>
                            ) : (
                              <>
                                <Bell className="w-4 h-4 mr-2" />
                                Enable Notifications
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            Community Settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <LogOut className="w-4 h-4 mr-2" />
                            Leave Community
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-5 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{community.members.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Hash className="w-4 h-4" />
                        <span>{community.channels} channels</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4" />
                        <span className={getActivityColor(community.activityLevel)}>
                          {community.lastActivity}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Joined {community.joined}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {community.category}
                      </Badge>
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