import { useState } from 'react';
import { 
  Search, Filter, Download, UserPlus, MoreVertical, Shield, Star, 
  Trophy, MessageCircle, Eye, UserMinus, Tag, ChevronDown, 
  Calendar, Activity, AlertCircle, TrendingUp, X, Check,
  Mail, CheckSquare, Square
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

// Helper function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

interface Member {
  id: string;
  name: string;
  status: 'online' | 'idle' | 'offline';
  role: string;
  level: number;
  points: number;
  title: string;
  joinDate: string;
  expertise: string[];
  churnRisk: number;
  email: string;
  lastActive: string;
  postsCount: number;
  commentsCount: number;
  likesReceived: number;
  joinedDate: string;
  tags: string[];
}

interface EnhancedMembersPanelProps {
  members: Member[];
  userRole: 'admin' | 'moderator' | 'member';
  onViewProfile: (member: Member) => void;
  onInvite: () => void;
}

export function EnhancedMembersPanel({ 
  members, 
  userRole, 
  onViewProfile,
  onInvite 
}: EnhancedMembersPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);

  const canManage = userRole === 'admin' || userRole === 'moderator';

  // Get all unique tags
  const allTags = Array.from(new Set(members.flatMap(m => m.tags)));

  // Filter members
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || member.status === selectedStatus;
    const matchesTag = selectedTag === 'all' || member.tags.includes(selectedTag);

    return matchesSearch && matchesRole && matchesStatus && matchesTag;
  });

  // Sort members
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
      case 'active':
        return b.postsCount - a.postsCount;
      case 'level':
        return b.level - a.level;
      case 'points':
        return b.points - a.points;
      case 'risk':
        return b.churnRisk - a.churnRisk;
      default:
        return 0;
    }
  });

  const toggleMemberSelection = (memberId: string) => {
    const newSelection = new Set(selectedMembers);
    if (newSelection.has(memberId)) {
      newSelection.delete(memberId);
    } else {
      newSelection.add(memberId);
    }
    setSelectedMembers(newSelection);
    setShowBulkActions(newSelection.size > 0);
  };

  const selectAll = () => {
    setSelectedMembers(new Set(sortedMembers.map(m => m.id)));
    setShowBulkActions(true);
  };

  const deselectAll = () => {
    setSelectedMembers(new Set());
    setShowBulkActions(false);
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting members:', selectedMembers.size > 0 ? Array.from(selectedMembers) : 'all');
    alert(`Exporting ${selectedMembers.size > 0 ? selectedMembers.size : sortedMembers.length} members to CSV`);
  };

  const handleBulkMessage = () => {
    console.log('Sending bulk message to:', Array.from(selectedMembers));
    alert(`Sending message to ${selectedMembers.size} selected members`);
  };

  const handleBulkTag = () => {
    console.log('Adding tag to:', Array.from(selectedMembers));
    alert(`Adding tag to ${selectedMembers.size} selected members`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-foreground">Members</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {sortedMembers.length} {sortedMembers.length === 1 ? 'member' : 'members'}
                {filteredMembers.length !== members.length && ` (filtered from ${members.length})`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExport}
              >
                <Download className="size-4 mr-2" />
                Export
              </Button>
              {canManage && (
                <Button 
                  size="sm" 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={onInvite}
                >
                  <UserPlus className="size-4 mr-2" />
                  Invite
                </Button>
              )}
            </div>
          </div>

          {/* Member Stats - Admin/Mod Only */}
          {canManage && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-card border border-border rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Total Members</span>
                  <Activity className="size-4 text-muted-foreground" />
                </div>
                <p className="text-xl text-foreground">{members.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Active Today</span>
                  <TrendingUp className="size-4 text-muted-foreground" />
                </div>
                <p className="text-xl text-foreground">{members.filter(m => m.status === 'online').length}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{Math.round(members.filter(m => m.status === 'online').length / members.length * 100)}% of total</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">New This Month</span>
                  <UserPlus className="size-4 text-muted-foreground" />
                </div>
                <p className="text-xl text-foreground">23</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">At Risk</span>
                  <AlertCircle className="size-4 text-muted-foreground" />
                </div>
                <p className="text-xl text-foreground">{members.filter(m => m.churnRisk > 50).length}</p>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search members by name, email, role, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              {/* Role Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="size-4" />
                    Role
                    {selectedRole !== 'all' && (
                      <Badge className="ml-1 bg-purple-100 text-purple-700 text-xs px-1.5 py-0">1</Badge>
                    )}
                    <ChevronDown className="size-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="end">
                  <button
                    onClick={() => setSelectedRole('all')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      selectedRole === 'all' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    All Roles
                  </button>
                  <button
                    onClick={() => setSelectedRole('Admin')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      selectedRole === 'Admin' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => setSelectedRole('Moderator')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      selectedRole === 'Moderator' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Moderator
                  </button>
                  <button
                    onClick={() => setSelectedRole('Member')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      selectedRole === 'Member' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Member
                  </button>
                </PopoverContent>
              </Popover>

              {/* Status Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    Status
                    {selectedStatus !== 'all' && (
                      <Badge className="ml-1 bg-purple-100 text-purple-700 text-xs px-1.5 py-0">1</Badge>
                    )}
                    <ChevronDown className="size-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="end">
                  <button
                    onClick={() => setSelectedStatus('all')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      selectedStatus === 'all' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    All Status
                  </button>
                  <button
                    onClick={() => setSelectedStatus('online')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center gap-2 ${
                      selectedStatus === 'online' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="size-2 rounded-full bg-green-500" />
                    Online
                  </button>
                  <button
                    onClick={() => setSelectedStatus('idle')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center gap-2 ${
                      selectedStatus === 'idle' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="size-2 rounded-full bg-yellow-500" />
                    Idle
                  </button>
                  <button
                    onClick={() => setSelectedStatus('offline')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center gap-2 ${
                      selectedStatus === 'offline' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="size-2 rounded-full bg-muted-foreground" />
                    Offline
                  </button>
                </PopoverContent>
              </Popover>

              {/* Tag Filter */}
              {allTags.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Tag className="size-4" />
                      Tags
                      {selectedTag !== 'all' && (
                        <Badge className="ml-1 bg-purple-100 text-purple-700 text-xs px-1.5 py-0">1</Badge>
                      )}
                      <ChevronDown className="size-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2 max-h-64 overflow-y-auto" align="end">
                    <button
                      onClick={() => setSelectedTag('all')}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                        selectedTag === 'all' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      All Tags
                    </button>
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                          selectedTag === tag ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              )}

              {/* Sort */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    Sort
                    <ChevronDown className="size-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="end">
                  <button
                    onClick={() => setSortBy('recent')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      sortBy === 'recent' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Recently Joined
                  </button>
                  <button
                    onClick={() => setSortBy('active')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      sortBy === 'active' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Most Active
                  </button>
                  <button
                    onClick={() => setSortBy('level')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      sortBy === 'level' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Highest Level
                  </button>
                  <button
                    onClick={() => setSortBy('points')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      sortBy === 'points' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Most Points
                  </button>
                  {canManage && (
                    <button
                      onClick={() => setSortBy('risk')}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                        sortBy === 'risk' ? 'bg-purple-50 text-purple-700' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      Churn Risk
                    </button>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedRole !== 'all' || selectedStatus !== 'all' || selectedTag !== 'all') && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-foreground">
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              {selectedRole !== 'all' && (
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  Role: {selectedRole}
                  <button onClick={() => setSelectedRole('all')} className="ml-1 hover:text-foreground">
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              {selectedStatus !== 'all' && (
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  Status: {selectedStatus}
                  <button onClick={() => setSelectedStatus('all')} className="ml-1 hover:text-foreground">
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              {selectedTag !== 'all' && (
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  Tag: {selectedTag}
                  <button onClick={() => setSelectedTag('all')} className="ml-1 hover:text-foreground">
                    <X className="size-3" />
                  </button>
                </Badge>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRole('all');
                  setSelectedStatus('all');
                  setSelectedTag('all');
                }}
                className="text-xs text-purple-600 hover:text-purple-700 ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Bulk Actions Bar */}
        {showBulkActions && canManage && (
          <div className="px-6 py-3 bg-purple-50 border-t border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-purple-900">
                  {selectedMembers.size} {selectedMembers.size === 1 ? 'member' : 'members'} selected
                </span>
                <button
                  onClick={deselectAll}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Deselect all
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handleBulkMessage}>
                  <Mail className="size-4 mr-2" />
                  Send Message
                </Button>
                <Button size="sm" variant="outline" onClick={handleBulkTag}>
                  <Tag className="size-4 mr-2" />
                  Add Tag
                </Button>
                <Button size="sm" variant="outline" onClick={handleExport}>
                  <Download className="size-4 mr-2" />
                  Export Selected
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Members Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {sortedMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Search className="size-12 mb-4 text-muted-foreground" />
            <p className="text-sm">No members found matching your filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRole('all');
                setSelectedStatus('all');
                setSelectedTag('all');
              }}
              className="mt-2 text-sm text-purple-600 hover:text-purple-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Bulk Select Header */}
            {canManage && (
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                <button
                  onClick={selectedMembers.size === sortedMembers.length ? deselectAll : selectAll}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {selectedMembers.size === sortedMembers.length ? (
                    <CheckSquare className="size-4 text-purple-600" />
                  ) : (
                    <Square className="size-4" />
                  )}
                  Select all
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedMembers.map((member) => (
                <div
                  key={member.id}
                  className={`bg-card border-2 rounded-lg p-4 transition-all ${
                    selectedMembers.has(member.id)
                      ? 'border-purple-600 bg-purple-50/30'
                      : 'border-border hover:border-border'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {/* Selection Checkbox */}
                    {canManage && (
                      <button
                        onClick={() => toggleMemberSelection(member.id)}
                        className="mt-1"
                      >
                        {selectedMembers.has(member.id) ? (
                          <CheckSquare className="size-5 text-purple-600" />
                        ) : (
                          <Square className="size-5 text-muted-foreground hover:text-foreground" />
                        )}
                      </button>
                    )}

                    {/* Avatar */}
                    <div className="relative">
                      <div className="size-12 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                        {getInitials(member.name)}
                      </div>
                      <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white ${
                        member.status === 'online' ? 'bg-green-500' : member.status === 'idle' ? 'bg-yellow-500' : 'bg-muted-foreground'
                      }`} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-sm text-foreground truncate font-medium">{member.name}</span>
                        {member.role === 'Admin' && <Star className="size-3 text-yellow-500 flex-shrink-0" />}
                        {member.role === 'Moderator' && <Shield className="size-3 text-blue-500 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{member.title}</p>
                    </div>

                    {/* Menu */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="text-muted-foreground hover:text-foreground">
                          <MoreVertical className="size-4" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-1" align="end">
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md">
                          <MessageCircle className="size-4" />
                          Send Message
                        </button>
                        <button 
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"
                          onClick={() => onViewProfile(member)}
                        >
                          <Eye className="size-4" />
                          View Profile
                        </button>
                        {canManage && (
                          <>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md">
                              <Tag className="size-4" />
                              Add Tag
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md">
                              <Shield className="size-4" />
                              Change Role
                            </button>
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                              <UserMinus className="size-4" />
                              Remove
                            </button>
                          </>
                        )}
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Tags */}
                  {member.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {member.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Expertise */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {member.expertise.slice(0, 2).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.expertise.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.expertise.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Trophy className="size-3" />
                      <span>Lvl {member.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="size-3" />
                      <span>{member.points}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="size-3" />
                      <span>{member.postsCount}</span>
                    </div>
                  </div>

                  {/* AI Insights - Admin Only */}
                  {userRole === 'admin' && member.churnRisk > 50 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-orange-600">
                        <AlertCircle className="size-3" />
                        <span>High churn risk ({member.churnRisk}%)</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}