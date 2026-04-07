import React, { useState } from 'react';
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
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  UserPlus,
  MoreVertical,
  Mail,
  Shield,
  Eye,
  Trash2,
  Check,
  X,
  Search,
  Crown,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CoHost {
  id: string;
  name: string;
  email: string;
  role: 'co-host' | 'moderator' | 'speaker-manager';
  status: 'active' | 'pending' | 'declined';
  avatar?: string;
  addedAt: string;
}

const ROLE_LABELS: Record<CoHost['role'], string> = {
  'co-host': 'Co-host',
  'moderator': 'Moderator',
  'speaker-manager': 'Speaker Manager',
};

const ROLE_DESCRIPTIONS: Record<CoHost['role'], string> = {
  'co-host': 'Full access to event settings, attendees, and analytics',
  'moderator': 'Can manage discussion, Q&A, and moderate attendees',
  'speaker-manager': 'Can manage speakers, schedule sessions, and speaker comms',
};

interface CoHostPanelProps {
  eventTitle: string;
}

export function CoHostPanel({ eventTitle }: CoHostPanelProps) {
  const [coHosts, setCoHosts] = useState<CoHost[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      role: 'co-host',
      status: 'active',
      addedAt: '2026-02-20',
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.j@example.com',
      role: 'moderator',
      status: 'pending',
      addedAt: '2026-02-24',
    },
  ]);

  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<CoHost['role']>('co-host');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoHosts = coHosts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    const newCoHost: CoHost = {
      id: Date.now().toString(),
      name: inviteName || inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'pending',
      addedAt: new Date().toISOString().split('T')[0],
    };
    setCoHosts((prev) => [...prev, newCoHost]);
    setShowInviteDialog(false);
    setInviteEmail('');
    setInviteName('');
    setInviteRole('co-host');
    toast.success('Invitation sent!', {
      description: `${newCoHost.name} has been invited as ${ROLE_LABELS[inviteRole]}.`,
    });
  };

  const handleRemove = (id: string) => {
    const host = coHosts.find((c) => c.id === id);
    setCoHosts((prev) => prev.filter((c) => c.id !== id));
    toast.success(`${host?.name || 'Co-host'} removed.`);
  };

  const handleResend = (id: string) => {
    const host = coHosts.find((c) => c.id === id);
    toast.success('Invitation resent!', { description: `Re-sent to ${host?.email}` });
  };

  const activeCount = coHosts.filter((c) => c.status === 'active').length;
  const pendingCount = coHosts.filter((c) => c.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-foreground">Co-hosts & Team</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {activeCount} active, {pendingCount} pending
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
          onClick={() => setShowInviteDialog(true)}
        >
          <UserPlus className="size-3.5 mr-2" />
          Invite Team Member
        </Button>
      </div>

      {/* Search */}
      {coHosts.length > 3 && (
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-lg"
          />
        </div>
      )}

      {/* Co-host List */}
      <div className="space-y-2">
        {/* Owner row (non-removable) */}
        <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
          <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Crown className="size-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground truncate">You (Organizer)</p>
            <p className="text-xs text-muted-foreground">Full ownership</p>
          </div>
          <Badge variant="secondary" className="rounded shadow-none text-xs bg-primary/10 text-primary border-primary/20">
            Owner
          </Badge>
        </div>

        {filteredCoHosts.map((host) => (
          <div
            key={host.id}
            className="flex items-center gap-4 p-3 border border-border rounded-lg"
          >
            <div className="size-9 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                {host.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm text-foreground truncate">{host.name}</p>
                {host.status === 'pending' && (
                  <Badge variant="secondary" className="rounded shadow-none text-xs bg-amber-50 text-amber-700 border-amber-200">
                    Pending
                  </Badge>
                )}
                {host.status === 'declined' && (
                  <Badge variant="secondary" className="rounded shadow-none text-xs bg-red-50 text-red-600 border-red-200">
                    Declined
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{host.email}</p>
            </div>
            <Badge variant="secondary" className="rounded shadow-none text-xs">
              {ROLE_LABELS[host.role]}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="size-8 p-0">
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-lg">
                <DropdownMenuItem onClick={() => toast('Permission details coming soon')}>
                  <Shield className="size-3.5 mr-2" />
                  Edit Permissions
                </DropdownMenuItem>
                {host.status === 'pending' && (
                  <DropdownMenuItem onClick={() => handleResend(host.id)}>
                    <Mail className="size-3.5 mr-2" />
                    Resend Invitation
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => handleRemove(host.id)}
                >
                  <Trash2 className="size-3.5 mr-2" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}

        {filteredCoHosts.length === 0 && coHosts.length > 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No team members match your search.
          </p>
        )}

        {coHosts.length === 0 && (
          <div className="text-center py-8 border border-dashed border-border rounded-lg">
            <UserPlus className="size-8 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No team members yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Invite co-hosts and moderators to help manage your event.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 rounded-lg"
              onClick={() => setShowInviteDialog(true)}
            >
              <UserPlus className="size-3.5 mr-2" />
              Invite First Member
            </Button>
          </div>
        )}
      </div>

      {/* Role Permissions Reference */}
      <div className="bg-muted rounded-lg p-4 space-y-3">
        <h4 className="text-sm text-foreground">Role Permissions</h4>
        <div className="space-y-2">
          {(Object.keys(ROLE_LABELS) as CoHost['role'][]).map((role) => (
            <div key={role} className="flex items-start gap-2">
              <Shield className="size-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-foreground">{ROLE_LABELS[role]}</p>
                <p className="text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[role]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Add a co-host, moderator, or speaker manager to "{eventTitle}".
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm">Email address</Label>
              <Input
                placeholder="name@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Name (optional)</Label>
              <Input
                placeholder="Their name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Role</Label>
              <div className="space-y-2">
                {(Object.keys(ROLE_LABELS) as CoHost['role'][]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setInviteRole(role)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      inviteRole === role
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <span className="text-sm text-foreground">{ROLE_LABELS[role]}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {ROLE_DESCRIPTIONS[role]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowInviteDialog(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={handleInvite}
              disabled={!inviteEmail.trim()}
            >
              <Mail className="size-3.5 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
