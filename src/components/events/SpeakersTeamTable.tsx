import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  UserPlus,
  MoreVertical,
  Mail,
  Check,
  X,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCw,
  Users,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { cn } from '../ui/utils';

export interface CustomRoleRef {
  id: string;
  name: string;
  slug: string;
  color: string;
  isCustom: true;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'invited' | 'accepted' | 'declined';
  bio?: string;
  invitedAt: string;
}

const ROLE_CONFIG: Record<string, { label: string; color: string }> = {
  speaker: { label: 'Speaker', color: 'bg-primary/10 text-primary border-primary/20' },
  'co-host': { label: 'Co-host', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  moderator: { label: 'Moderator', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  'tech-support': { label: 'Tech Support', color: 'bg-teal-50 text-teal-700 border-teal-100' },
  panelist: { label: 'Panelist', color: 'bg-violet-50 text-violet-700 border-violet-100' },
};

const STATUS_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
  invited: { label: 'Invited', icon: Clock, color: 'bg-orange-50 text-orange-700 border-orange-100' },
  accepted: { label: 'Accepted', icon: CheckCircle, color: 'bg-green-50 text-green-700 border-green-100' },
  declined: { label: 'Declined', icon: XCircle, color: 'bg-red-50 text-red-600 border-red-100' },
};

// Mock LeapSpace users for search
const LEAPSPACE_USERS = [
  { id: 'lp1', name: 'Priya Sharma', email: 'priya@leapspace.ai', avatar: 'PS' },
  { id: 'lp2', name: 'Alex Rivera', email: 'alex.r@leapspace.ai', avatar: 'AR' },
  { id: 'lp3', name: 'Jordan Kim', email: 'jordan.k@leapspace.ai', avatar: 'JK' },
  { id: 'lp4', name: 'Sam Okafor', email: 'sam.o@leapspace.ai', avatar: 'SO' },
  { id: 'lp5', name: 'Maya Chen', email: 'maya.c@leapspace.ai', avatar: 'MC' },
  { id: 'lp6', name: 'Diego Fernandez', email: 'diego.f@leapspace.ai', avatar: 'DF' },
];

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: 'speaker',
    status: 'accepted',
    bio: 'Design Systems Lead at Figma',
    invitedAt: '2026-01-15',
  },
  {
    id: '2',
    name: 'Marcus Webb',
    email: 'marcus.w@example.com',
    role: 'speaker',
    status: 'accepted',
    bio: 'Senior Frontend Engineer',
    invitedAt: '2026-01-16',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena.r@example.com',
    role: 'moderator',
    status: 'invited',
    invitedAt: '2026-02-01',
  },
  {
    id: '4',
    name: 'James Park',
    email: 'james.p@example.com',
    role: 'tech-support',
    status: 'declined',
    invitedAt: '2026-01-20',
  },
];

interface SpeakersTeamTableProps {
  eventSpeakers?: TeamMember[];
  onUpdate?: (members: TeamMember[]) => void;
  customRoles?: CustomRoleRef[];
}

export function SpeakersTeamTable({ eventSpeakers, onUpdate, customRoles = [] }: SpeakersTeamTableProps) {
  // Merge built-in + custom roles
  const allRoleConfig: Record<string, { label: string; color: string }> = { ...ROLE_CONFIG };
  customRoles.forEach(r => {
    allRoleConfig[r.slug] = { label: r.name, color: r.color };
  });

  const [members, setMembers] = useState<TeamMember[]>(eventSpeakers || DEFAULT_TEAM);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteMode, setInviteMode] = useState<'email' | 'leapspace'>('leapspace');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<string>('speaker');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const updateMembers = (updated: TeamMember[]) => {
    setMembers(updated);
    onUpdate?.(updated);
  };

  const filteredMembers = members.filter(m => {
    if (roleFilter !== 'all' && m.role !== roleFilter) return false;
    return true;
  });

  const filteredLeapSpaceUsers = LEAPSPACE_USERS.filter(u => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  }).filter(u => !members.some(m => m.email === u.email));

  const handleInviteByEmail = () => {
    if (!inviteEmail.trim()) return;
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteName || inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'invited',
      invitedAt: new Date().toISOString().split('T')[0],
    };
    updateMembers([...members, newMember]);
    toast.success(`Invitation sent to ${inviteEmail}`);
    resetInviteForm();
  };

  const handleInviteLeapSpaceUser = (user: typeof LEAPSPACE_USERS[0]) => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: user.name,
      email: user.email,
      role: inviteRole,
      status: 'invited',
      invitedAt: new Date().toISOString().split('T')[0],
    };
    updateMembers([...members, newMember]);
    toast.success(`Invitation sent to ${user.name}`);
  };

  const handleResendInvite = (member: TeamMember) => {
    toast.success(`Invitation resent to ${member.email}`);
  };

  const handleRemoveMember = (id: string) => {
    updateMembers(members.filter(m => m.id !== id));
    toast('Team member removed');
  };

  const handleChangeRole = (id: string, newRole: string) => {
    updateMembers(members.map(m => m.id === id ? { ...m, role: newRole } : m));
    toast.success('Role updated');
  };

  const resetInviteForm = () => {
    setInviteEmail('');
    setInviteName('');
    setInviteRole('speaker');
    setSearchQuery('');
    setShowInviteModal(false);
  };

  const acceptedCount = members.filter(m => m.status === 'accepted').length;
  const invitedCount = members.filter(m => m.status === 'invited').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-semibold text-lg">Speakers & Team</h2>
          <p className="text-sm text-muted-foreground">
            {acceptedCount} confirmed, {invitedCount} pending
          </p>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
          onClick={() => setShowInviteModal(true)}
        >
          <UserPlus className="size-3.5 mr-2" />
          Invite
        </Button>
      </div>

      {/* Role Filter Pills */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'all', label: 'All' },
          { id: 'speaker', label: 'Speakers' },
          { id: 'co-host', label: 'Co-hosts' },
          { id: 'moderator', label: 'Moderators' },
          { id: 'tech-support', label: 'Tech Support' },
          { id: 'panelist', label: 'Panelists' },
          ...customRoles.map(r => ({ id: r.slug, label: r.name })),
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setRoleFilter(f.id)}
            className={cn(
              'px-3 py-1.5 text-xs rounded-full border transition-colors',
              roleFilter === f.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground'
            )}
          >
            {f.label}
            {f.id !== 'all' && (
              <span className="ml-1.5 opacity-70">
                {members.filter(m => m.role === f.id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Person</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Invited</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredMembers.map((member) => {
              const roleConf = allRoleConfig[member.role] || { label: member.role, color: 'bg-muted text-foreground border-border' };
              const statusConf = STATUS_CONFIG[member.status];
              const StatusIcon = statusConf.icon;
              return (
                <tr key={member.id} className="hover:bg-accent transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/10">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Select
                      value={member.role}
                      onValueChange={(v) => handleChangeRole(member.id, v as TeamMember['role'])}
                    >
                      <SelectTrigger className="h-7 w-[130px] text-xs border-border bg-transparent">
                        <Badge variant="secondary" className={cn('rounded-md font-medium text-[10px] px-2 py-0.5 border', roleConf.color)}>
                          {roleConf.label}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(allRoleConfig).map(([key, conf]) => (
                          <SelectItem key={key} value={key}>
                            <span className="text-xs">{conf.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className={cn('rounded-md font-medium text-[10px] px-2 py-0.5 border gap-1', statusConf.color)}>
                      <StatusIcon className="size-3" />
                      {statusConf.label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-muted-foreground">{member.invitedAt}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {member.status === 'invited' && (
                          <DropdownMenuItem onClick={() => handleResendInvite(member)}>
                            <RefreshCw className="size-4 mr-2" />
                            Resend Invite
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => {
                          toast.success(`Email opened for ${member.name}`);
                        }}>
                          <Mail className="size-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleRemoveMember(member.id)}>
                          <Trash2 className="size-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="size-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">No team members in this filter</p>
            <Button
              size="sm"
              variant="outline"
              className="mt-3 border-border"
              onClick={() => setShowInviteModal(true)}
            >
              <UserPlus className="size-3.5 mr-2" />
              Invite Someone
            </Button>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="sm:max-w-[480px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Invite Team Member</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Search your LeapSpace contacts or invite by email.
            </DialogDescription>
          </DialogHeader>

          {/* Mode Switcher */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setInviteMode('leapspace')}
              className={cn(
                'flex-1 px-4 py-2 text-sm font-medium transition-colors',
                inviteMode === 'leapspace'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              )}
            >
              LeapSpace Users
            </button>
            <button
              onClick={() => setInviteMode('email')}
              className={cn(
                'flex-1 px-4 py-2 text-sm font-medium transition-colors border-l border-border',
                inviteMode === 'email'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground'
              )}
            >
              Invite by Email
            </button>
          </div>

          {/* Role Selector */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Role</Label>
            <Select value={inviteRole} onValueChange={(v) => setInviteRole(v)}>
              <SelectTrigger className="border-border h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(allRoleConfig).map(([key, conf]) => (
                  <SelectItem key={key} value={key}>{conf.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {inviteMode === 'leapspace' ? (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  className="pl-9 border-border h-9"
                />
              </div>
              <div className="max-h-[240px] overflow-y-auto space-y-1 border border-border rounded-lg p-1">
                {filteredLeapSpaceUsers.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground">No users found</p>
                    <button
                      onClick={() => setInviteMode('email')}
                      className="text-xs text-primary hover:underline mt-1"
                    >
                      Try inviting by email instead
                    </button>
                  </div>
                ) : (
                  filteredLeapSpaceUsers.map(user => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/10">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs border-primary/20 text-primary hover:bg-primary/10"
                        onClick={() => handleInviteLeapSpaceUser(user)}
                      >
                        Invite
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Full Name</Label>
                <Input
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="border-border h-9"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Email Address</Label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="border-border h-9"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={resetInviteForm} className="border-border text-foreground">
              Cancel
            </Button>
            {inviteMode === 'email' && (
              <Button
                onClick={handleInviteByEmail}
                disabled={!inviteEmail.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
              >
                <Mail className="size-3.5 mr-2" />
                Send Invitation
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}