import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Bell,
  BookmarkPlus,
  Briefcase,
  Building2,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Crown,
  EyeOff,
  FileClock,
  KeyRound,
  LayoutGrid,
  Link2,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  Trash2,
  User,
  UserMinus,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { cn } from './ui/utils';

type SpaceSection =
  | 'my-profile'
  | 'notifications'
  | 'my-content'
  | 'moderation'
  | 'overview'
  | 'branding'
  | 'integrations'
  | 'members'
  | 'teams'
  | 'roles'
  | 'policies'
  | 'invitations'
  | 'audit-log';

type LeapSpaceRole = 'admin' | 'moderator' | 'creator' | 'learner';

export interface LeapSpaceSummary {
  id: string;
  name: string;
  type?: string;
  role: LeapSpaceRole;
  communitiesCount?: number;
  coursesCount?: number;
  eventsCount?: number;
}

interface GlobalSettingsPageProps {
  initialTab?: 'general' | 'integrations' | 'notifications' | 'billing' | 'profile' | 'security' | 'connected-accounts' | 'privacy' | 'accessibility' | 'advanced';
  currentLeapSpace?: LeapSpaceSummary;
  currentUser?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

type SpaceProfileForm = {
  displayName: string;
  codename: string;
  roleTitle: string;
  bio: string;
  profilePhotoMode: string;
  overrideMode: string;
  overrideScope: string;
  anonymousMode: boolean;
  useCodename: boolean;
  showRoleBadge: boolean;
  appearInDirectory: boolean;
  allowDirectMessages: boolean;
  allowConnections: boolean;
  allowMentoring: boolean;
  allowCollaboration: boolean;
  appearInSearch: boolean;
};

type SpaceNotificationForm = {
  muteSpace: boolean;
  mentions: boolean;
  directMessages: boolean;
  push: boolean;
  suppressAnnouncements: boolean;
  suppressRoleMentions: boolean;
  muteEvents: boolean;
  inheritGlobalDefaults: boolean;
  digestFrequency: string;
};

type SimpleSectionForm = {
  primary: string;
  secondary: string;
  notes: string;
  enabled: boolean;
};

const spaceSectionDefs: Array<{ id: SpaceSection; label: string; icon: React.ElementType }> = [
  { id: 'my-profile', label: 'My Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'my-content', label: 'My Content', icon: LayoutGrid },
  { id: 'moderation', label: 'Moderation', icon: Shield },
  { id: 'overview', label: 'Overview', icon: Building2 },
  { id: 'branding', label: 'Branding', icon: Sparkles },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'teams', label: 'Teams', icon: Briefcase },
  { id: 'roles', label: 'Roles', icon: KeyRound },
  { id: 'policies', label: 'Policies', icon: Shield },
  { id: 'invitations', label: 'Invitations', icon: UserPlus },
  { id: 'audit-log', label: 'Audit Log', icon: FileClock },
];

const allLeapSpaces: LeapSpaceSummary[] = [
  { id: '1', name: 'TrueLeap Inc.', type: 'work', role: 'admin', communitiesCount: 10, coursesCount: 24, eventsCount: 15 },
  { id: '2', name: 'Creator Studio', type: 'custom', role: 'creator', communitiesCount: 4, coursesCount: 7, eventsCount: 3 },
  { id: '3', name: 'Community Circle', type: 'community', role: 'moderator', communitiesCount: 6, coursesCount: 2, eventsCount: 8 },
  { id: '4', name: 'AI Learners Hub', type: 'school', role: 'learner', communitiesCount: 3, coursesCount: 11, eventsCount: 5 },
];

const roleLabels: Record<LeapSpaceRole, string> = {
  admin: 'Admin',
  moderator: 'Moderator',
  creator: 'Creator',
  learner: 'Learner',
};

const spaceNavByRole: Record<LeapSpaceRole, Array<{ group: string; items: SpaceSection[] }>> = {
  admin: [
    { group: 'Personal', items: ['my-profile', 'notifications'] },
    { group: 'Workspace', items: ['overview', 'branding', 'integrations'] },
    { group: 'Access', items: ['members', 'teams', 'roles', 'policies', 'invitations', 'audit-log'] },
  ],
  moderator: [
    { group: 'Personal', items: ['my-profile', 'notifications'] },
    { group: 'Moderation', items: ['moderation', 'members', 'invitations'] },
  ],
  creator: [
    { group: 'Personal', items: ['my-profile', 'notifications'] },
    { group: 'Creation', items: ['my-content', 'integrations'] },
    { group: 'Workspace', items: ['overview'] },
  ],
  learner: [{ group: 'Personal', items: ['my-profile', 'notifications'] }],
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function ShellCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return <section className={cn('rounded-xl border border-border bg-card', className)}>{children}</section>;
}

function PanelHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      {description ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {hint ? <p className="text-xs leading-5 text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function ToggleField({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/40 p-4">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="mt-1 text-sm leading-6 text-muted-foreground">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function RoleBadge({ role }: { role: LeapSpaceRole }) {
  return (
    <Badge variant="secondary" className="rounded-lg border border-border bg-muted text-secondary-foreground shadow-none">
      {roleLabels[role]}
    </Badge>
  );
}

const digestOptions = [
  { value: 'live', label: 'Live notifications' },
  { value: 'hourly', label: 'Hourly digest' },
  { value: 'daily', label: 'Daily digest' },
];

const overrideOptions = [
  { value: 'customized', label: 'Customized for this LeapSpace' },
  { value: 'inherit-global', label: 'Fully inherit global profile' },
];

const photoModeOptions = [
  { value: 'global-avatar', label: 'Use global avatar' },
  { value: 'space-avatar', label: 'Use LeapSpace-specific avatar' },
];

/* ─────────────────────────────────────────────
   Members – mock data matching GET /api/leapspaces/{id}/members
   ───────────────────────────────────────────── */
interface SpaceMember {
  id: string;
  name: string;
  avatarId: string | null;
  email: string;
  phone: string | null;
  role: string;
}

const MOCK_MEMBERS: SpaceMember[] = [
  { id: 'm1', name: 'Sarah Chen', avatarId: null, email: 'sarah@trueleap.ai', phone: '+1 415-555-1001', role: 'Admin' },
  { id: 'm2', name: 'Marcus Webb', avatarId: null, email: 'marcus@trueleap.ai', phone: '+1 415-555-1002', role: 'Admin' },
  { id: 'm3', name: 'Elena Rodriguez', avatarId: null, email: 'elena@gmail.com', phone: '+1 310-555-2003', role: 'Moderator' },
  { id: 'm4', name: 'James Park', avatarId: null, email: 'james@gmail.com', phone: null, role: 'Creator' },
  { id: 'm5', name: 'Aisha Patel', avatarId: null, email: 'aisha@outlook.com', phone: '+44 7700-900111', role: 'Learner' },
  { id: 'm6', name: 'Tom Nakamura', avatarId: null, email: 'tom.n@proton.me', phone: null, role: 'Learner' },
  { id: 'm7', name: 'Priya Sharma', avatarId: null, email: 'priya.s@yahoo.com', phone: '+91 98765-43210', role: 'Creator' },
  { id: 'm8', name: 'Daniel Okafor', avatarId: null, email: 'daniel.o@gmail.com', phone: null, role: 'Moderator' },
  { id: 'm9', name: 'Lucia Fernandez', avatarId: null, email: 'lucia.f@hotmail.com', phone: '+34 612-345-678', role: 'Learner' },
  { id: 'm10', name: 'Kai Williams', avatarId: null, email: 'kai.w@trueleap.ai', phone: '+1 212-555-3004', role: 'Admin' },
];

const ALL_MEMBER_ROLES = ['Admin', 'Moderator', 'Creator', 'Learner'];

/* ─────────────────────────────────────────────
   Invitations – mock data matching GET /api/leapspaces/{id}/invitations
   ───────────────────────────────────────────── */
type InvitationStatus = 'pending' | 'accepted' | 'cancelled' | 'expired';

interface SpaceInvitation {
  id: string;
  name: string;
  avatarId: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  status: InvitationStatus;
  createdAt: string;
}

const MOCK_INVITATIONS: SpaceInvitation[] = [
  { id: 'inv1', name: 'Alex Kim', avatarId: null, email: 'alex.k@gmail.com', phone: null, role: 'Moderator', status: 'pending', createdAt: '2026-04-06' },
  { id: 'inv2', name: 'Beatrice Mwangi', avatarId: null, email: 'bea@trueleap.ai', phone: '+254 722-111222', role: 'Creator', status: 'accepted', createdAt: '2026-04-02' },
  { id: 'inv3', name: 'Carlos Ruiz', avatarId: null, email: null, phone: '+52 55-1234-5678', role: 'Learner', status: 'pending', createdAt: '2026-04-05' },
  { id: 'inv4', name: 'Diana Novak', avatarId: null, email: 'diana.n@outlook.com', phone: null, role: 'Admin', status: 'cancelled', createdAt: '2026-03-28' },
  { id: 'inv5', name: 'Ethan Brooks', avatarId: null, email: 'ethan@gmail.com', phone: '+1 503-555-8899', role: 'Learner', status: 'expired', createdAt: '2026-03-15' },
  { id: 'inv6', name: 'Fatima Al-Hassan', avatarId: null, email: 'fatima.h@proton.me', phone: null, role: 'Moderator', status: 'accepted', createdAt: '2026-03-30' },
  { id: 'inv7', name: 'George Tanaka', avatarId: null, email: null, phone: '+81 90-1234-5678', role: 'Creator', status: 'pending', createdAt: '2026-04-07' },
];

/* ─────────────────────────────────────────────
   Roles & Permissions – matching GET /api/leapspaces/{id}/access-control
   ───────────────────────────────────────────── */
interface RoleDefinition {
  role: string;
  roleDefinitionId: string;
  permissions: string[];
  isBuiltIn: boolean;
}

interface PermissionGroup {
  category: string;
  permissions: Array<{ id: string; label: string; description: string }>;
}

const LEAPSPACE_PERMISSION_GROUPS: PermissionGroup[] = [
  {
    category: 'Content',
    permissions: [
      { id: 'content.view', label: 'View content', description: 'See posts, articles, and shared resources' },
      { id: 'content.create', label: 'Create content', description: 'Publish posts, articles, and resources' },
      { id: 'content.edit', label: 'Edit any content', description: 'Modify content created by others' },
      { id: 'content.delete', label: 'Delete any content', description: 'Remove content created by others' },
    ],
  },
  {
    category: 'Members',
    permissions: [
      { id: 'members.view', label: 'View members', description: 'See the member directory' },
      { id: 'members.invite', label: 'Invite members', description: 'Send invitations to new people' },
      { id: 'members.remove', label: 'Remove members', description: 'Revoke membership from the LeapSpace' },
      { id: 'members.manage-roles', label: 'Change member roles', description: 'Promote or demote members' },
    ],
  },
  {
    category: 'Events',
    permissions: [
      { id: 'events.view', label: 'View events', description: 'See event listings and details' },
      { id: 'events.create', label: 'Create events', description: 'Start new events in this LeapSpace' },
      { id: 'events.manage', label: 'Manage events', description: 'Edit or cancel any event' },
      { id: 'events.manage-attendees', label: 'Manage attendees', description: 'Approve, reject, or check in attendees' },
    ],
  },
  {
    category: 'Courses',
    permissions: [
      { id: 'courses.view', label: 'View courses', description: 'See course listings and materials' },
      { id: 'courses.create', label: 'Create courses', description: 'Author new courses' },
      { id: 'courses.manage', label: 'Manage courses', description: 'Edit or archive any course' },
    ],
  },
  {
    category: 'Communities',
    permissions: [
      { id: 'communities.view', label: 'View communities', description: 'See community spaces and channels' },
      { id: 'communities.create', label: 'Create communities', description: 'Start new community spaces' },
      { id: 'communities.moderate', label: 'Moderate communities', description: 'Pin, lock, or delete community threads' },
    ],
  },
  {
    category: 'Settings & Admin',
    permissions: [
      { id: 'settings.view', label: 'View settings', description: 'See LeapSpace configuration' },
      { id: 'settings.manage', label: 'Manage settings', description: 'Change branding, integrations, and config' },
      { id: 'settings.manage-roles', label: 'Manage roles', description: 'Create, edit, or delete role definitions' },
      { id: 'settings.manage-teams', label: 'Manage teams', description: 'Create and configure teams' },
      { id: 'settings.view-audit', label: 'View audit log', description: 'Access operational change history' },
    ],
  },
];

const ALL_PERMISSION_IDS = LEAPSPACE_PERMISSION_GROUPS.flatMap(g => g.permissions.map(p => p.id));

const MOCK_ROLES: RoleDefinition[] = [
  {
    role: 'LeapSpace Admin',
    roleDefinitionId: 'rd-admin',
    permissions: [...ALL_PERMISSION_IDS],
    isBuiltIn: true,
  },
  {
    role: 'Moderator',
    roleDefinitionId: 'rd-moderator',
    permissions: [
      'content.view', 'content.create', 'content.edit', 'content.delete',
      'members.view', 'members.invite',
      'events.view', 'events.manage-attendees',
      'courses.view',
      'communities.view', 'communities.moderate',
      'settings.view',
    ],
    isBuiltIn: true,
  },
  {
    role: 'Creator',
    roleDefinitionId: 'rd-creator',
    permissions: [
      'content.view', 'content.create',
      'members.view',
      'events.view', 'events.create',
      'courses.view', 'courses.create',
      'communities.view', 'communities.create',
      'settings.view',
    ],
    isBuiltIn: true,
  },
  {
    role: 'Learner',
    roleDefinitionId: 'rd-learner',
    permissions: [
      'content.view',
      'members.view',
      'events.view',
      'courses.view',
      'communities.view',
    ],
    isBuiltIn: true,
  },
  {
    role: 'Event Manager',
    roleDefinitionId: 'rd-event-mgr',
    permissions: [
      'content.view', 'content.create',
      'members.view', 'members.invite',
      'events.view', 'events.create', 'events.manage', 'events.manage-attendees',
      'courses.view',
      'communities.view',
      'settings.view',
    ],
    isBuiltIn: false,
  },
];

/* ─────────────────────────────────────────────
   Teams – mock data (no backend API yet)
   ───────────────────────────────────────────── */
interface SpaceTeam {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  roleDefinitionId: string | null;
  customPermissions: string[] | null; // null = inherit role as-is, array = customized set
  enabled: boolean;
}

const MOCK_TEAMS: SpaceTeam[] = [
  { id: 't1', name: 'Core Admins', description: 'Primary administrators for this LeapSpace', memberIds: ['m1', 'm2', 'm10'], roleDefinitionId: 'rd-admin', customPermissions: null, enabled: true },
  { id: 't2', name: 'Event Ops', description: 'Handles event creation, management, and attendee coordination', memberIds: ['m3', 'm4', 'm7'], roleDefinitionId: 'rd-event-mgr', customPermissions: null, enabled: true },
  { id: 't3', name: 'Community Moderators', description: 'Moderates discussions and community channels', memberIds: ['m3', 'm8'], roleDefinitionId: 'rd-moderator', customPermissions: null, enabled: true },
  { id: 't4', name: 'Content Creators', description: 'Publishes courses, articles, and resources', memberIds: ['m4', 'm7'], roleDefinitionId: 'rd-creator', customPermissions: null, enabled: false },
];

function defaultSpaceProfileForm(leapSpace: LeapSpaceSummary, currentUser?: { name: string; email: string; avatar?: string } | null): SpaceProfileForm {
  return {
    displayName: currentUser?.name || 'Google User',
    codename: '',
    roleTitle: roleLabels[leapSpace.role],
    bio: 'Helping creators and operators build structured, high-signal spaces.',
    profilePhotoMode: 'global-avatar',
    overrideMode: 'customized',
    overrideScope: 'Display name, bio, photo, visibility, and messaging permissions',
    anonymousMode: false,
    useCodename: false,
    showRoleBadge: true,
    appearInDirectory: true,
    allowDirectMessages: leapSpace.role !== 'learner',
    allowConnections: true,
    allowMentoring: leapSpace.role !== 'learner',
    allowCollaboration: leapSpace.role === 'admin' || leapSpace.role === 'creator',
    appearInSearch: true,
  };
}

function defaultSpaceNotificationForm(leapSpace: LeapSpaceSummary): SpaceNotificationForm {
  return {
    muteSpace: false,
    mentions: true,
    directMessages: leapSpace.role !== 'learner',
    push: true,
    suppressAnnouncements: true,
    suppressRoleMentions: false,
    muteEvents: false,
    inheritGlobalDefaults: true,
    digestFrequency: 'live',
  };
}

function defaultSimpleSectionForm(section: SpaceSection, leapSpace: LeapSpaceSummary): SimpleSectionForm {
  switch (section) {
    case 'my-content':
      return {
        primary: 'Review before publish',
        secondary: 'Slack, Zapier, Google Calendar',
        notes: `Creator defaults for content built inside ${leapSpace.name}.`,
        enabled: true,
      };
    case 'moderation':
      return {
        primary: 'Community safety baseline',
        secondary: 'Prioritize reports assigned to me',
        notes: 'Moderators can manage safety and member-level enforcement, but not workspace identity or billing.',
        enabled: true,
      };
    case 'overview':
      return {
        primary: leapSpace.name,
        secondary: leapSpace.type || 'Workspace',
        notes: 'High-level description, default member promise, and workspace orientation copy.',
        enabled: true,
      };
    case 'branding':
      return {
        primary: leapSpace.name,
        secondary: 'Hero image uploaded',
        notes: 'Workspace for creators, moderators, operators, and invited partners.',
        enabled: true,
      };
    case 'integrations':
      return {
        primary: 'Slack connected to #community-ops',
        secondary: '2 calendars synced',
        notes: '3 automations active in Zapier.',
        enabled: true,
      };
    case 'members':
      return {
        primary: '246 active members',
        secondary: '18 pending invites',
        notes: 'People with direct membership or inherited access in this LeapSpace.',
        enabled: true,
      };
    case 'teams':
      return {
        primary: 'Core Admins',
        secondary: 'Event Ops',
        notes: 'Reusable groups that carry policies in bulk and make access composable.',
        enabled: true,
      };
    case 'roles':
      return {
        primary: 'LeapSpace Admin',
        secondary: 'Event Manager',
        notes: 'Named permission bundles attached to members or teams.',
        enabled: true,
      };
    case 'policies':
      return {
        primary: 'Actor + role + scope',
        secondary: 'Admin approval required',
        notes: 'Keep policies legible so the workspace access model feels intentional.',
        enabled: true,
      };
    case 'invitations':
      return {
        primary: '18 pending invites',
        secondary: 'Community Team',
        notes: 'Default assignee team and invite review process for this workspace.',
        enabled: true,
      };
    case 'audit-log':
      return {
        primary: 'Policy changes retained 180 days',
        secondary: 'Member and billing changes tracked',
        notes: 'Operational log for admins reviewing access and workflow changes.',
        enabled: true,
      };
    default:
      return {
        primary: leapSpace.name,
        secondary: roleLabels[leapSpace.role],
        notes: 'Editable LeapSpace section settings.',
        enabled: true,
      };
  }
}

function SimpleEditableSection({
  title,
  description,
  form,
  onChange,
  onSave,
  onReset,
}: {
  title: string;
  description: string;
  form: SimpleSectionForm;
  onChange: (form: SimpleSectionForm) => void;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <ShellCard>
      <div className="p-6">
        <PanelHeader title={title} description={description} />
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Primary setting">
            <Input value={form.primary} onChange={event => onChange({ ...form, primary: event.target.value })} />
          </Field>
          <Field label="Secondary setting">
            <Input value={form.secondary} onChange={event => onChange({ ...form, secondary: event.target.value })} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Operational notes">
              <Textarea value={form.notes} onChange={event => onChange({ ...form, notes: event.target.value })} className="min-h-28" />
            </Field>
          </div>
          <div className="md:col-span-2">
            <ToggleField
              label="Section enabled"
              description="Lets the UI feel complete even for admin surfaces that are still prototype-backed."
              checked={form.enabled}
              onCheckedChange={checked => onChange({ ...form, enabled: checked })}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" className="rounded-xl border-border" onClick={onReset}>Discard</Button>
          <Button className="rounded-xl" onClick={onSave}>Save section</Button>
        </div>
      </div>
    </ShellCard>
  );
}

/* ═══════════════════════════════════════════════
   MEMBERS SECTION
   Real admin page matching GET /api/leapspaces/{id}/members
   ═══════════════════════════════════════════════ */
function MembersSection({ leapSpace }: { leapSpace: LeapSpaceSummary }) {
  const [members, setMembers] = useState<SpaceMember[]>(MOCK_MEMBERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [changingRoleFor, setChangingRoleFor] = useState<string | null>(null);
  const [removingMember, setRemovingMember] = useState<SpaceMember | null>(null);

  const filtered = members.filter(m => {
    const matchesSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()) || (m.phone && m.phone.includes(search));
    const matchesRole = roleFilter === 'all' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: members.length,
    admins: members.filter(m => m.role === 'Admin').length,
    moderators: members.filter(m => m.role === 'Moderator').length,
    creators: members.filter(m => m.role === 'Creator').length,
    learners: members.filter(m => m.role === 'Learner').length,
  };

  const handleChangeRole = (memberId: string, newRole: string) => {
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, role: newRole } : m));
    setChangingRoleFor(null);
    toast.success('Role updated', { description: `Member role changed to ${newRole}.` });
  };

  const handleRemoveMember = (member: SpaceMember) => {
    setMembers(prev => prev.filter(m => m.id !== member.id));
    setRemovingMember(null);
    toast.success('Member removed', { description: `${member.name} has been removed from ${leapSpace.name}.` });
  };

  const roleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-primary/10 text-primary border-primary/20';
      case 'Moderator': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'Creator': return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
      case 'Learner': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          { label: 'Total', value: stats.total, icon: Users },
          { label: 'Admins', value: stats.admins, icon: Crown },
          { label: 'Moderators', value: stats.moderators, icon: Shield },
          { label: 'Creators', value: stats.creators, icon: Sparkles },
          { label: 'Learners', value: stats.learners, icon: User },
        ].map(s => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <s.icon className="size-3.5" />
              {s.label}
            </div>
            <div className="mt-1 text-2xl font-semibold text-foreground">{s.value}</div>
          </div>
        ))}
      </div>

      <ShellCard>
        <div className="p-6">
          <PanelHeader title="Members" description={`People with direct membership or inherited access in ${leapSpace.name}. Members are listed via GET /api/leapspaces/{id}/members.`} />

          {/* Search + filter */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, or phone..." className="h-11 rounded-xl border-border bg-input-background pl-9" />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="h-11 w-44 rounded-xl border-border bg-input-background"><SelectValue placeholder="Filter by role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                {ALL_MEMBER_ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Member table */}
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Member</th>
                  <th className="hidden px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground md:table-cell">Email</th>
                  <th className="hidden px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground lg:table-cell">Phone</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Role</th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(member => (
                  <tr key={member.id} className="group transition-colors hover:bg-primary/5">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                          {getInitials(member.name)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{member.name}</div>
                          <div className="text-xs text-muted-foreground md:hidden">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{member.email}</td>
                    <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">{member.phone || '—'}</td>
                    <td className="px-4 py-3">
                      {changingRoleFor === member.id ? (
                        <Select defaultValue={member.role} onValueChange={v => handleChangeRole(member.id, v)}>
                          <SelectTrigger className="h-8 w-32 rounded-lg border-border text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {ALL_MEMBER_ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge variant="outline" className={cn('rounded-lg border text-[11px] font-semibold shadow-none', roleBadgeColor(member.role))}>{member.role}</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg px-2 text-xs" onClick={() => setChangingRoleFor(changingRoleFor === member.id ? null : member.id)}>
                          <KeyRound className="mr-1 size-3" />
                          Role
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg px-2 text-xs text-destructive hover:text-destructive" onClick={() => setRemovingMember(member)}>
                          <UserMinus className="mr-1 size-3" />
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                      <Users className="mx-auto mb-2 size-8 opacity-40" />
                      No members match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* API integration hints */}
          <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-xs leading-5 text-muted-foreground">
            <div className="font-semibold text-foreground">API integration notes</div>
            <ul className="mt-1.5 list-inside list-disc space-y-1">
              <li><code className="rounded bg-muted px-1 py-0.5">GET /api/leapspaces/{'{leapspaceId}'}/members</code> — search, cursor, limit supported now</li>
              <li><strong>Change role:</strong> Needs <code className="rounded bg-muted px-1 py-0.5">PATCH /api/leapspaces/{'{leapspaceId}'}/members/{'{memberId}'}</code> — not yet available</li>
              <li><strong>Remove member:</strong> Needs <code className="rounded bg-muted px-1 py-0.5">DELETE /api/leapspaces/{'{leapspaceId}'}/members/{'{memberId}'}</code> — not yet available</li>
            </ul>
          </div>
        </div>
      </ShellCard>

      {/* Remove confirmation dialog */}
      {removingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setRemovingMember(null)}>
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="size-5 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Remove member</h3>
                <p className="text-sm text-muted-foreground">This cannot be undone.</p>
              </div>
            </div>
            <p className="mb-6 text-sm leading-6 text-muted-foreground">
              Are you sure you want to remove <strong className="text-foreground">{removingMember.name}</strong> from <strong className="text-foreground">{leapSpace.name}</strong>? They will lose access to all resources in this LeapSpace.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="rounded-xl" onClick={() => setRemovingMember(null)}>Cancel</Button>
              <Button variant="destructive" className="rounded-xl" onClick={() => handleRemoveMember(removingMember)}>Remove Member</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   INVITATIONS SECTION
   Real admin page matching GET/POST/PUT /api/leapspaces/{id}/invitations
   ═══════════════════════════════════════════════ */
function InvitationsSection({ leapSpace }: { leapSpace: LeapSpaceSummary }) {
  const [invitations, setInvitations] = useState<SpaceInvitation[]>(MOCK_INVITATIONS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvitationStatus | 'all'>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Create single invite form
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePhone, setInvitePhone] = useState('');
  const [inviteeName, setInviteeName] = useState('');
  const [inviteRole, setInviteRole] = useState('rd-learner');

  // Bulk invite form
  const [bulkEmails, setBulkEmails] = useState('');
  const [bulkRole, setBulkRole] = useState('rd-learner');

  const filtered = invitations.filter(inv => {
    const matchesSearch = !search || inv.name.toLowerCase().includes(search.toLowerCase()) || (inv.email && inv.email.toLowerCase().includes(search.toLowerCase())) || (inv.phone && inv.phone.includes(search));
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: invitations.length,
    pending: invitations.filter(i => i.status === 'pending').length,
    accepted: invitations.filter(i => i.status === 'accepted').length,
    cancelled: invitations.filter(i => i.status === 'cancelled').length,
    expired: invitations.filter(i => i.status === 'expired').length,
  };

  const statusBadgeStyle = (status: InvitationStatus) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      case 'accepted': return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'cancelled': return 'bg-muted text-muted-foreground border-border';
      case 'expired': return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
    }
  };

  const handleCreateInvite = () => {
    if (!inviteEmail && !invitePhone) {
      toast.error('Please provide an email or phone number');
      return;
    }
    const newInv: SpaceInvitation = {
      id: `inv-new-${Date.now()}`,
      name: inviteeName || (inviteEmail ? inviteEmail.split('@')[0] : 'Invitee'),
      avatarId: null,
      email: inviteEmail || null,
      phone: invitePhone || null,
      role: MOCK_ROLES.find(r => r.roleDefinitionId === inviteRole)?.role || 'Learner',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setInvitations(prev => [newInv, ...prev]);
    setInviteEmail('');
    setInvitePhone('');
    setInviteeName('');
    setInviteRole('rd-learner');
    setShowCreateForm(false);
    toast.success('Invitation sent', { description: `Invited ${newInv.name} as ${newInv.role}.` });
  };

  const handleBulkInvite = () => {
    const emails = bulkEmails.split(',').map(e => e.trim()).filter(e => e.length > 0);
    if (emails.length === 0) {
      toast.error('Please enter at least one email');
      return;
    }
    const roleName = MOCK_ROLES.find(r => r.roleDefinitionId === bulkRole)?.role || 'Learner';
    const newInvs: SpaceInvitation[] = emails.map((email, i) => ({
      id: `inv-bulk-${Date.now()}-${i}`,
      name: email.split('@')[0],
      avatarId: null,
      email,
      phone: null,
      role: roleName,
      status: 'pending' as InvitationStatus,
      createdAt: new Date().toISOString().split('T')[0],
    }));
    setInvitations(prev => [...newInvs, ...prev]);
    setBulkEmails('');
    setBulkRole('rd-learner');
    setShowBulkForm(false);
    toast.success(`${emails.length} invitations sent`, { description: `All invited as ${roleName}.` });
  };

  const handleCancel = (invId: string) => {
    setInvitations(prev => prev.map(inv => inv.id === invId ? { ...inv, status: 'cancelled' as InvitationStatus } : inv));
    setCancellingId(null);
    toast.success('Invitation cancelled');
  };

  return (
    <div className="space-y-6">
      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'pending', 'accepted', 'cancelled', 'expired'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              'rounded-xl px-4 py-2 text-sm font-medium transition-colors border',
              statusFilter === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:bg-accent'
            )}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="ml-1.5 text-xs opacity-70">{statusCounts[s]}</span>
          </button>
        ))}
      </div>

      {/* Create invite form */}
      {showCreateForm && (
        <ShellCard>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <PanelHeader title="Invite a member" description="Send an invitation via email or phone. Both channels are supported by the backend." />
              <Button variant="ghost" size="sm" className="rounded-xl" onClick={() => setShowCreateForm(false)}><X className="size-4" /></Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Invitee name" hint="Maps to POST /invitations body: inviteeName">
                <Input value={inviteeName} onChange={e => setInviteeName(e.target.value)} placeholder="Full name" className="h-11 rounded-xl border-border bg-input-background" />
              </Field>
              <Field label="Role" hint="Maps to POST /invitations body: roleDefinitionId">
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger className="h-11 rounded-xl border-border bg-input-background"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {MOCK_ROLES.map(r => <SelectItem key={r.roleDefinitionId} value={r.roleDefinitionId}>{r.role}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Email address" hint="Maps to POST /invitations body: email">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="name@example.com" className="h-11 rounded-xl border-border bg-input-background pl-9" />
                </div>
              </Field>
              <Field label="Phone number" hint="Maps to POST /invitations body: phone">
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={invitePhone} onChange={e => setInvitePhone(e.target.value)} placeholder="+1 555-000-0000" className="h-11 rounded-xl border-border bg-input-background pl-9" />
                </div>
              </Field>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="outline" className="rounded-xl" onClick={() => setShowCreateForm(false)}>Cancel</Button>
              <Button className="rounded-xl" onClick={handleCreateInvite}>
                <UserPlus className="mr-2 size-4" />
                Send Invitation
              </Button>
            </div>
          </div>
        </ShellCard>
      )}

      {/* Bulk invite form */}
      {showBulkForm && (
        <ShellCard>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <PanelHeader title="Bulk invite" description="Paste comma-separated email addresses. Each will receive an invitation with the selected role." />
              <Button variant="ghost" size="sm" className="rounded-xl" onClick={() => setShowBulkForm(false)}><X className="size-4" /></Button>
            </div>
            <div className="space-y-4">
              <Field label="Email addresses" hint="Comma-separated list. Each creates a separate POST /invitations call.">
                <Textarea value={bulkEmails} onChange={e => setBulkEmails(e.target.value)} placeholder="alice@example.com, bob@example.com, carol@example.com" className="min-h-28 rounded-xl border-border bg-input-background" />
                {bulkEmails.trim() && (
                  <p className="text-xs text-muted-foreground">{bulkEmails.split(',').map(e => e.trim()).filter(e => e).length} people will be invited</p>
                )}
              </Field>
              <Field label="Role for all invitees">
                <Select value={bulkRole} onValueChange={setBulkRole}>
                  <SelectTrigger className="h-11 w-56 rounded-xl border-border bg-input-background"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {MOCK_ROLES.map(r => <SelectItem key={r.roleDefinitionId} value={r.roleDefinitionId}>{r.role}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="outline" className="rounded-xl" onClick={() => setShowBulkForm(false)}>Cancel</Button>
              <Button className="rounded-xl" onClick={handleBulkInvite}>
                <Users className="mr-2 size-4" />
                Send Bulk Invitations
              </Button>
            </div>
          </div>
        </ShellCard>
      )}

      <ShellCard>
        <div className="p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <PanelHeader title="Invitations" description={`All invitations sent for ${leapSpace.name}. Invite by email or phone, assign roles, and monitor status.`} />
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl" onClick={() => { setShowBulkForm(true); setShowCreateForm(false); }}>
                <Users className="mr-2 size-4" />
                Bulk Invite
              </Button>
              <Button className="rounded-xl" onClick={() => { setShowCreateForm(true); setShowBulkForm(false); }}>
                <UserPlus className="mr-2 size-4" />
                Invite Member
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-5">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search invitations..." className="h-11 rounded-xl border-border bg-input-background pl-9" />
            </div>
          </div>

          {/* Invitation list */}
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Invitee</th>
                  <th className="hidden px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">Contact</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Role</th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="hidden px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground md:table-cell">Sent</th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(inv => (
                  <tr key={inv.id} className="group transition-colors hover:bg-primary/5">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                          {getInitials(inv.name)}
                        </div>
                        <div className="font-medium text-foreground">{inv.name}</div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {inv.email && <div className="flex items-center gap-1"><Mail className="size-3" />{inv.email}</div>}
                        {inv.phone && <div className="flex items-center gap-1"><Phone className="size-3" />{inv.phone}</div>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="rounded-lg border text-[11px] font-semibold shadow-none bg-muted text-muted-foreground border-border">{inv.role}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn('rounded-lg border text-[11px] font-semibold shadow-none', statusBadgeStyle(inv.status))}>
                        {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-muted-foreground md:table-cell">{inv.createdAt}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        {inv.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="sm" className="h-8 rounded-lg px-2 text-xs" onClick={() => toast.info('Resend is not yet supported by the API')}>
                              <Mail className="mr-1 size-3" />
                              Resend
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 rounded-lg px-2 text-xs text-destructive hover:text-destructive" onClick={() => setCancellingId(inv.id)}>
                              <X className="mr-1 size-3" />
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      <UserPlus className="mx-auto mb-2 size-8 opacity-40" />
                      No invitations match your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* API integration hints */}
          <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-xs leading-5 text-muted-foreground">
            <div className="font-semibold text-foreground">API integration notes</div>
            <ul className="mt-1.5 list-inside list-disc space-y-1">
              <li><code className="rounded bg-muted px-1 py-0.5">GET /api/leapspaces/{'{leapspaceId}'}/invitations</code> — list with search supported now</li>
              <li><code className="rounded bg-muted px-1 py-0.5">POST /api/leapspaces/{'{leapspaceId}'}/invitations</code> — body: email, phone, roleDefinitionId, inviteeName — supported now</li>
              <li><code className="rounded bg-muted px-1 py-0.5">PUT /api/leapspaces/{'{leapspaceId}'}/invitations/{'{invitationId}'}</code> — body: {'{action: "cancel"}'} — supported now</li>
              <li><strong>Resend invitation:</strong> Not yet available in API</li>
              <li><strong>Edit invitation role:</strong> Not yet available in API</li>
            </ul>
          </div>
        </div>
      </ShellCard>

      {/* Cancel confirmation dialog */}
      {cancellingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setCancellingId(null)}>
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6" onClick={e => e.stopPropagation()}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-amber-500/10">
                <AlertCircle className="size-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Cancel invitation</h3>
                <p className="text-sm text-muted-foreground">The invitee will no longer be able to accept.</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="rounded-xl" onClick={() => setCancellingId(null)}>Keep</Button>
              <Button variant="destructive" className="rounded-xl" onClick={() => handleCancel(cancellingId)}>Cancel Invitation</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ROLES & PERMISSIONS SECTION
   Real admin page matching GET/POST/PUT /api/leapspaces/{id}/access-control
   ═══════════════════════════════════════════════ */
function RolesSection({ leapSpace, roles, setRoles }: { leapSpace: LeapSpaceSummary; roles: RoleDefinition[]; setRoles: React.Dispatch<React.SetStateAction<RoleDefinition[]>> }) {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleDefinition | null>(null);

  // Create role form
  const [newRoleName, setNewRoleName] = useState('');
  const [newRolePermissions, setNewRolePermissions] = useState<Set<string>>(new Set());

  // Edit role form
  const [editPermissions, setEditPermissions] = useState<Set<string>>(new Set());

  // Save as Template dialog state
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [pendingTemplateRole, setPendingTemplateRole] = useState<RoleDefinition | null>(null);

  const togglePermission = (set: Set<string>, setFn: React.Dispatch<React.SetStateAction<Set<string>>>, permId: string) => {
    setFn(prev => {
      const next = new Set(prev);
      if (next.has(permId)) next.delete(permId);
      else next.add(permId);
      return next;
    });
  };

  const handleCreateRole = () => {
    if (!newRoleName.trim()) {
      toast.error('Role name is required');
      return;
    }
    const newRole: RoleDefinition = {
      role: newRoleName.trim(),
      roleDefinitionId: `rd-custom-${Date.now()}`,
      permissions: Array.from(newRolePermissions),
      isBuiltIn: false,
    };
    setRoles(prev => [...prev, newRole]);
    setNewRoleName('');
    setNewRolePermissions(new Set());
    setShowCreateForm(false);
    toast.success('Custom role created', { description: `${newRole.role} with ${newRole.permissions.length} permissions.` });

    // Prompt to save as template
    setPendingTemplateRole(newRole);
    setShowTemplateDialog(true);
  };

  const handleSaveAsTemplate = () => {
    if (pendingTemplateRole) {
      toast.success('Role saved as template', {
        description: `"${pendingTemplateRole.role}" is now available as a preset across all events and communities in ${leapSpace.name}.`,
      });
    }
    setShowTemplateDialog(false);
    setPendingTemplateRole(null);
  };

  const handleSkipTemplate = () => {
    setShowTemplateDialog(false);
    setPendingTemplateRole(null);
  };

  const handleSaveRoleEdit = () => {
    if (!editingRole) return;
    const originalPerms = new Set(editingRole.permissions);
    const addedPermissions = Array.from(editPermissions).filter(p => !originalPerms.has(p));
    const removedPermissions = editingRole.permissions.filter(p => !editPermissions.has(p));

    setRoles(prev => prev.map(r => r.roleDefinitionId === editingRole.roleDefinitionId
      ? { ...r, permissions: Array.from(editPermissions) }
      : r
    ));
    setEditingRole(null);
    toast.success('Role updated', {
      description: `+${addedPermissions.length} added, -${removedPermissions.length} removed.`,
    });
  };

  const startEditRole = (role: RoleDefinition) => {
    setEditingRole(role);
    setEditPermissions(new Set(role.permissions));
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <ShellCard>
        <div className="p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <PanelHeader title="Roles & Permissions" description={`Permission bundles that control who can do what in ${leapSpace.name}. These roles are also available when assigning event, course, and community access.`} />
            <Button className="rounded-xl" onClick={() => { setShowCreateForm(true); setEditingRole(null); }}>
              <Plus className="mr-2 size-4" />
              Create Role
            </Button>
          </div>

          {/* Role list */}
          <div className="space-y-3">
            {roles.map(role => (
              <div key={role.roleDefinitionId} className="rounded-lg border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setExpandedRole(expandedRole === role.roleDefinitionId ? null : role.roleDefinitionId)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-accent/50 transition-colors"
                >
                  <ChevronRight className={cn('size-4 text-muted-foreground transition-transform', expandedRole === role.roleDefinitionId && 'rotate-90')} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{role.role}</span>
                      {role.isBuiltIn && <Badge variant="outline" className="rounded-md border-border bg-muted/50 text-[10px] font-medium text-muted-foreground shadow-none">Built-in</Badge>}
                      {!role.isBuiltIn && <Badge variant="outline" className="rounded-md border-purple-500/20 bg-purple-500/10 text-[10px] font-medium text-purple-700 dark:text-purple-400 shadow-none">Custom</Badge>}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{role.permissions.length} of {ALL_PERMISSION_IDS.length} permissions</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!role.isBuiltIn && (
                      <Button variant="ghost" size="sm" className="h-8 rounded-lg px-3 text-xs" onClick={e => { e.stopPropagation(); startEditRole(role); }}>
                        Edit
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg px-3 text-xs" onClick={e => { e.stopPropagation(); startEditRole(role); }}>
                      <KeyRound className="mr-1 size-3" />
                      Permissions
                    </Button>
                  </div>
                </button>

                {expandedRole === role.roleDefinitionId && (
                  <div className="border-t border-border bg-muted/20 px-5 py-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {LEAPSPACE_PERMISSION_GROUPS.map(group => {
                        const groupPerms = group.permissions.filter(p => role.permissions.includes(p.id));
                        if (groupPerms.length === 0) return null;
                        return (
                          <div key={group.category}>
                            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{group.category}</div>
                            <div className="space-y-1">
                              {groupPerms.map(p => (
                                <div key={p.id} className="flex items-center gap-2 text-xs text-foreground">
                                  <Check className="size-3 text-green-600" />
                                  {p.label}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {role.permissions.length === 0 && (
                      <p className="text-sm text-muted-foreground">No permissions assigned.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* API integration hints */}
          <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 p-4 text-xs leading-5 text-muted-foreground">
            <div className="font-semibold text-foreground">API integration notes</div>
            <ul className="mt-1.5 list-inside list-disc space-y-1">
              <li><code className="rounded bg-muted px-1 py-0.5">GET /api/leapspaces/{'{leapspaceId}'}/access-control</code> — returns role, roleDefinitionId, permissions[] for each role</li>
              <li><code className="rounded bg-muted px-1 py-0.5">POST /api/leapspaces/{'{leapspaceId}'}/access-control</code> — body: roleName, permissions[] — supported now</li>
              <li><code className="rounded bg-muted px-1 py-0.5">PUT /api/leapspaces/{'{leapspaceId}'}/access-control</code> — body: roleId, addedPermissions[], removedPermissions[] — supported now</li>
              <li><code className="rounded bg-muted px-1 py-0.5">GET /api/leapspaces/{'{leapspaceId}'}/grants</code> — gates whether user can manage roles</li>
              <li><strong>Rename role / Delete role:</strong> Not yet available in API</li>
            </ul>
          </div>
        </div>
      </ShellCard>

      {/* Create role form */}
      {showCreateForm && (
        <ShellCard>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <PanelHeader title="Create custom role" description="Define a new permission bundle. This role will be available when inviting members and assigning team access." />
              <Button variant="ghost" size="sm" className="rounded-xl" onClick={() => setShowCreateForm(false)}><X className="size-4" /></Button>
            </div>
            <div className="mb-5">
              <Field label="Role name" hint="Maps to POST /access-control body: roleName">
                <Input value={newRoleName} onChange={e => setNewRoleName(e.target.value)} placeholder="e.g. Community Lead, Course Author..." className="h-11 max-w-md rounded-xl border-border bg-input-background" />
              </Field>
            </div>
            <PermissionCheckboxGrid
              permissions={newRolePermissions}
              onToggle={permId => togglePermission(newRolePermissions, setNewRolePermissions, permId)}
            />
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{newRolePermissions.size} of {ALL_PERMISSION_IDS.length} permissions selected</span>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                <Button className="rounded-xl" onClick={handleCreateRole}>Create Role</Button>
              </div>
            </div>
          </div>
        </ShellCard>
      )}

      {/* Edit role form */}
      {editingRole && (
        <ShellCard>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <PanelHeader title={`Edit: ${editingRole.role}`} description={editingRole.isBuiltIn ? 'Built-in roles use PUT /access-control with addedPermissions[] and removedPermissions[] diff.' : 'Custom role — modify permissions below.'} />
              <Button variant="ghost" size="sm" className="rounded-xl" onClick={() => setEditingRole(null)}><X className="size-4" /></Button>
            </div>
            <PermissionCheckboxGrid
              permissions={editPermissions}
              onToggle={permId => togglePermission(editPermissions, setEditPermissions, permId)}
            />
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{editPermissions.size} of {ALL_PERMISSION_IDS.length} permissions selected</span>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl" onClick={() => setEditingRole(null)}>Cancel</Button>
                <Button className="rounded-xl" onClick={handleSaveRoleEdit}>Save Changes</Button>
              </div>
            </div>
          </div>
        </ShellCard>
      )}

      {/* Save as Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookmarkPlus className="size-5" />
              </div>
              <div>
                <DialogTitle>Save as template?</DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-sm leading-relaxed">
              Save <strong>"{pendingTemplateRole?.role}"</strong> as a reusable preset. This template will be available across all events, communities, and nested content inside <strong>{leapSpace.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground leading-relaxed">
            <div className="font-medium text-foreground mb-2">What this means:</div>
            <ul className="list-disc list-inside space-y-1.5">
              <li>This role will appear as a preset when assigning roles in events and communities</li>
              <li>Team leads can pick this template instead of configuring permissions from scratch</li>
              <li>Changes to the template will not retroactively affect existing assignments</li>
            </ul>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="rounded-xl" onClick={handleSkipTemplate}>
              Skip
            </Button>
            <Button className="rounded-xl" onClick={handleSaveAsTemplate}>
              <BookmarkPlus className="mr-2 size-4" />
              Save as template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PermissionCheckboxGrid({ permissions, onToggle }: { permissions: Set<string>; onToggle: (id: string) => void }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {LEAPSPACE_PERMISSION_GROUPS.map(group => (
        <div key={group.category} className="rounded-lg border border-border bg-muted/20 p-4">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{group.category}</div>
          <div className="space-y-2">
            {group.permissions.map(perm => (
              <label key={perm.id} className="flex cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-accent/50 transition-colors">
                <div className={cn(
                  'mt-0.5 flex size-5 items-center justify-center rounded-md border transition-colors',
                  permissions.has(perm.id) ? 'bg-primary border-primary text-primary-foreground' : 'border-border bg-card'
                )} onClick={() => onToggle(perm.id)}>
                  {permissions.has(perm.id) && <Check className="size-3" />}
                </div>
                <div className="min-w-0 flex-1" onClick={() => onToggle(perm.id)}>
                  <div className="text-sm font-medium text-foreground">{perm.label}</div>
                  <div className="text-xs text-muted-foreground">{perm.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TEAMS SECTION
   Prototype UI — no backend API exists yet
   ═══════════════════════════════════════════════ */
function TeamsSection({ leapSpace, roles, onAddRole }: { leapSpace: LeapSpaceSummary; roles: RoleDefinition[]; onAddRole: (role: RoleDefinition) => void }) {
  const [teams, setTeams] = useState<SpaceTeam[]>(MOCK_TEAMS);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  // Create form state
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [newTeamRole, setNewTeamRole] = useState('');
  const [newTeamMemberSearch, setNewTeamMemberSearch] = useState('');
  const [newTeamMembers, setNewTeamMembers] = useState<Set<string>>(new Set());

  // Inline permission customization
  const [newTeamPermissions, setNewTeamPermissions] = useState<Set<string>>(new Set());
  const [permissionsCustomized, setPermissionsCustomized] = useState(false);
  const [showPermissionGrid, setShowPermissionGrid] = useState(false);

  // Save as preset
  const [saveAsPreset, setSaveAsPreset] = useState(false);
  const [presetName, setPresetName] = useState('');

  // Sync permissions when role binding changes
  useEffect(() => {
    if (newTeamRole) {
      const role = roles.find(r => r.roleDefinitionId === newTeamRole);
      if (role) {
        setNewTeamPermissions(new Set(role.permissions));
        setPermissionsCustomized(false);
        setShowPermissionGrid(false);
        setSaveAsPreset(false);
        setPresetName('');
      }
    } else {
      setNewTeamPermissions(new Set());
      setPermissionsCustomized(false);
      setShowPermissionGrid(false);
      setSaveAsPreset(false);
      setPresetName('');
    }
  }, [newTeamRole, roles]);

  const handleTogglePermission = (permId: string) => {
    setNewTeamPermissions(prev => {
      const next = new Set(prev);
      if (next.has(permId)) next.delete(permId);
      else next.add(permId);
      return next;
    });
    setPermissionsCustomized(true);
  };

  // Check if current permissions differ from the bound role's defaults
  const boundRole = roles.find(r => r.roleDefinitionId === newTeamRole);
  const permsDifferFromRole = boundRole
    ? boundRole.permissions.length !== newTeamPermissions.size ||
      boundRole.permissions.some(p => !newTeamPermissions.has(p)) ||
      Array.from(newTeamPermissions).some(p => !boundRole.permissions.includes(p))
    : false;

  const memberSearchResults = MOCK_MEMBERS.filter(m =>
    newTeamMemberSearch && (m.name.toLowerCase().includes(newTeamMemberSearch.toLowerCase()) || m.email.toLowerCase().includes(newTeamMemberSearch.toLowerCase()))
  ).slice(0, 5);

  const handleCreateTeam = () => {
    if (!newTeamName.trim()) {
      toast.error('Team name is required');
      return;
    }
    if (saveAsPreset && !presetName.trim()) {
      toast.error('Preset name is required when saving as a reusable role');
      return;
    }

    // If saving as preset, create the new role first
    let teamRoleId = newTeamRole || null;
    if (saveAsPreset && presetName.trim()) {
      const newRole: RoleDefinition = {
        role: presetName.trim(),
        roleDefinitionId: `rd-custom-${Date.now()}`,
        permissions: Array.from(newTeamPermissions),
        isBuiltIn: false,
      };
      onAddRole(newRole);
      teamRoleId = newRole.roleDefinitionId;
      toast.success('Role preset saved', { description: `"${newRole.role}" with ${newRole.permissions.length} permissions is now available as a reusable role.` });
    }

    const newTeam: SpaceTeam = {
      id: `t-new-${Date.now()}`,
      name: newTeamName.trim(),
      description: newTeamDescription.trim(),
      memberIds: Array.from(newTeamMembers),
      roleDefinitionId: teamRoleId,
      customPermissions: permsDifferFromRole && !saveAsPreset ? Array.from(newTeamPermissions) : null,
      enabled: true,
    };
    setTeams(prev => [...prev, newTeam]);
    setNewTeamName('');
    setNewTeamDescription('');
    setNewTeamRole('');
    setNewTeamMembers(new Set());
    setNewTeamMemberSearch('');
    setNewTeamPermissions(new Set());
    setPermissionsCustomized(false);
    setShowPermissionGrid(false);
    setSaveAsPreset(false);
    setPresetName('');
    setShowCreateForm(false);
    toast.success('Team created', { description: `${newTeam.name} with ${newTeam.memberIds.length} members${newTeam.customPermissions ? ' and custom permissions' : ''}.` });
  };

  const handleToggleTeam = (teamId: string) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, enabled: !t.enabled } : t));
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeams(prev => prev.filter(t => t.id !== teamId));
    toast.success('Team deleted');
  };

  const getMemberName = (id: string) => MOCK_MEMBERS.find(m => m.id === id)?.name || id;
  const getRoleName = (rdId: string | null) => roles.find(r => r.roleDefinitionId === rdId)?.role || 'No role';
  const getTeamPermissions = (team: SpaceTeam): string[] => {
    if (team.customPermissions) return team.customPermissions;
    if (team.roleDefinitionId) {
      const role = roles.find(r => r.roleDefinitionId === team.roleDefinitionId);
      return role?.permissions || [];
    }
    return [];
  };

  return (
    <div className="space-y-6">
      {/* Future API banner */}
      <div className="rounded-lg border border-dashed border-amber-500/30 bg-amber-500/5 p-4">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 size-5 text-amber-600" />
          <div>
            <div className="text-sm font-semibold text-foreground">Teams API is not yet available</div>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              This section is a prototype. Teams will become very important for composable access in Communities and Courses.
              Proposed endpoints: <code className="rounded bg-muted px-1">GET/POST/PUT/DELETE /api/leapspaces/{'{leapspaceId}'}/teams</code>
            </p>
          </div>
        </div>
      </div>

      <ShellCard>
        <div className="p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <PanelHeader title="Teams" description={`Reusable groups that carry roles and make access composable across ${leapSpace.name}.`} />
            <Button className="rounded-xl" onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-2 size-4" />
              Create Team
            </Button>
          </div>

          {/* Team list */}
          <div className="space-y-3">
            {teams.map(team => (
              <div key={team.id} className={cn('rounded-lg border border-border bg-card overflow-hidden', !team.enabled && 'opacity-60')}>
                <button
                  onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-accent/50 transition-colors"
                >
                  <ChevronRight className={cn('size-4 text-muted-foreground transition-transform', expandedTeam === team.id && 'rotate-90')} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{team.name}</span>
                      {!team.enabled && <Badge variant="outline" className="rounded-md border-border bg-muted/50 text-[10px] font-medium text-muted-foreground shadow-none">Disabled</Badge>}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{team.memberIds.length} members · {getRoleName(team.roleDefinitionId)}</div>
                  </div>
                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <Switch checked={team.enabled} onCheckedChange={() => handleToggleTeam(team.id)} />
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg px-2 text-xs text-destructive hover:text-destructive" onClick={() => handleDeleteTeam(team.id)}>
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </button>

                {expandedTeam === team.id && (
                  <div className="border-t border-border bg-muted/20 px-5 py-4">
                    {team.description && <p className="mb-3 text-sm text-muted-foreground">{team.description}</p>}
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Members</div>
                    <div className="flex flex-wrap gap-2">
                      {team.memberIds.map(mId => (
                        <div key={mId} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm">
                          <div className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                            {getInitials(getMemberName(mId))}
                          </div>
                          {getMemberName(mId)}
                        </div>
                      ))}
                      {team.memberIds.length === 0 && <span className="text-sm text-muted-foreground">No members added yet.</span>}
                    </div>
                    {team.roleDefinitionId && (
                      <div className="mt-3">
                        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Bound role
                          {team.customPermissions && (
                            <span className="ml-2 inline-flex items-center rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium normal-case tracking-normal text-amber-700 dark:text-amber-400">
                              Customized
                            </span>
                          )}
                        </div>
                        <Badge variant="outline" className="rounded-lg border-border bg-muted text-xs font-medium text-muted-foreground shadow-none">
                          <KeyRound className="mr-1 size-3" />
                          {getRoleName(team.roleDefinitionId)}
                        </Badge>
                      </div>
                    )}
                    {/* Show effective permissions */}
                    {(() => {
                      const perms = getTeamPermissions(team);
                      if (perms.length === 0) return null;
                      return (
                        <div className="mt-3">
                          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Effective permissions ({perms.length})
                          </div>
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {LEAPSPACE_PERMISSION_GROUPS.map(group => {
                              const groupPerms = group.permissions.filter(p => perms.includes(p.id));
                              if (groupPerms.length === 0) return null;
                              return (
                                <div key={group.category}>
                                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">{group.category}</div>
                                  <div className="space-y-0.5">
                                    {groupPerms.map(p => (
                                      <div key={p.id} className="flex items-center gap-1.5 text-xs text-foreground">
                                        <Check className="size-3 text-green-600" />
                                        {p.label}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            ))}

            {teams.length === 0 && (
              <div className="rounded-lg border border-dashed border-border py-12 text-center text-muted-foreground">
                <Briefcase className="mx-auto mb-2 size-8 opacity-40" />
                <p className="text-sm">No teams created yet.</p>
                <p className="mt-1 text-xs">Teams let you group members and assign access in bulk.</p>
              </div>
            )}
          </div>
        </div>
      </ShellCard>

      {/* Create team form */}
      {showCreateForm && (
        <ShellCard>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <PanelHeader title="Create team" description="Define a reusable group of members. Bind a role so every team member inherits that access level, or customize permissions inline." />
              <Button variant="ghost" size="sm" className="rounded-xl" onClick={() => setShowCreateForm(false)}><X className="size-4" /></Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Team name">
                <Input value={newTeamName} onChange={e => setNewTeamName(e.target.value)} placeholder="e.g. Event Ops, Community Mods..." className="h-11 rounded-xl border-border bg-input-background" />
              </Field>
              <Field label="Role binding" hint="All team members inherit this role's permissions">
                <Select value={newTeamRole} onValueChange={setNewTeamRole}>
                  <SelectTrigger className="h-11 rounded-xl border-border bg-input-background"><SelectValue placeholder="Select a role..." /></SelectTrigger>
                  <SelectContent>
                    {roles.map(r => <SelectItem key={r.roleDefinitionId} value={r.roleDefinitionId}>{r.role}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Description">
                  <Textarea value={newTeamDescription} onChange={e => setNewTeamDescription(e.target.value)} placeholder="What does this team do?" className="min-h-20 rounded-xl border-border bg-input-background" />
                </Field>
              </div>

              {/* Inline permission customization — only visible when a role is selected */}
              {newTeamRole && (
                <div className="md:col-span-2">
                  <div className="rounded-lg border border-border bg-muted/20 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Shield className="size-4 text-primary" />
                          Team Permissions
                          <Badge variant="outline" className="rounded-md border-border bg-muted/50 text-[10px] font-medium text-muted-foreground shadow-none">
                            {newTeamPermissions.size} of {ALL_PERMISSION_IDS.length}
                          </Badge>
                          {permsDifferFromRole && (
                            <Badge variant="outline" className="rounded-md border-amber-500/20 bg-amber-500/10 text-[10px] font-medium text-amber-700 dark:text-amber-400 shadow-none">
                              Customized
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {showPermissionGrid
                            ? 'Toggle individual permissions to customize access for this team.'
                            : `Inheriting ${newTeamPermissions.size} permissions from "${boundRole?.role}". Click to customize.`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {permsDifferFromRole && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 rounded-lg px-3 text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              if (boundRole) {
                                setNewTeamPermissions(new Set(boundRole.permissions));
                                setPermissionsCustomized(false);
                              }
                            }}
                          >
                            Reset to default
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-lg px-3 text-xs"
                          onClick={() => setShowPermissionGrid(!showPermissionGrid)}
                        >
                          <KeyRound className="mr-1.5 size-3" />
                          {showPermissionGrid ? 'Collapse' : 'Customize'}
                        </Button>
                      </div>
                    </div>

                    {/* Quick permission summary (always visible) */}
                    {!showPermissionGrid && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {LEAPSPACE_PERMISSION_GROUPS.map(group => {
                          const count = group.permissions.filter(p => newTeamPermissions.has(p.id)).length;
                          if (count === 0) return null;
                          return (
                            <span key={group.category} className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-1 text-[11px] text-muted-foreground">
                              <Check className="size-2.5 text-green-600" />
                              {group.category} ({count})
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Full permission grid (expandable) */}
                    {showPermissionGrid && (
                      <div className="mt-4">
                        <PermissionCheckboxGrid
                          permissions={newTeamPermissions}
                          onToggle={handleTogglePermission}
                        />
                      </div>
                    )}

                    {/* Save as preset — only shown when permissions have been customized */}
                    {permsDifferFromRole && (
                      <div className="mt-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4">
                        <label className="flex cursor-pointer items-start gap-3">
                          <div
                            className={cn(
                              'mt-0.5 flex size-5 items-center justify-center rounded-md border transition-colors',
                              saveAsPreset ? 'bg-primary border-primary text-primary-foreground' : 'border-border bg-card'
                            )}
                            onClick={() => setSaveAsPreset(!saveAsPreset)}
                          >
                            {saveAsPreset && <Check className="size-3" />}
                          </div>
                          <div className="flex-1" onClick={() => setSaveAsPreset(!saveAsPreset)}>
                            <div className="text-sm font-medium text-foreground">Save this as a reusable role preset</div>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              The customized permission set will be saved as a new role definition, available in Roles & Permissions and when inviting or assigning access elsewhere.
                            </p>
                          </div>
                        </label>
                        {saveAsPreset && (
                          <div className="mt-3 pl-8">
                            <Field label="Preset name" hint="This name will appear in the roles list">
                              <Input
                                value={presetName}
                                onChange={e => setPresetName(e.target.value)}
                                placeholder="e.g. Event Ops Lead, Custom Moderator..."
                                className="h-10 max-w-md rounded-xl border-border bg-input-background"
                              />
                            </Field>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="md:col-span-2">
                <Field label="Add members">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input value={newTeamMemberSearch} onChange={e => setNewTeamMemberSearch(e.target.value)} placeholder="Search members by name or email..." className="h-11 rounded-xl border-border bg-input-background pl-9" />
                  </div>
                  {memberSearchResults.length > 0 && (
                    <div className="mt-2 rounded-xl border border-border bg-popover p-1">
                      {memberSearchResults.map(m => (
                        <button
                          key={m.id}
                          onClick={() => setNewTeamMembers(prev => {
                            const next = new Set(prev);
                            if (next.has(m.id)) next.delete(m.id);
                            else next.add(m.id);
                            return next;
                          })}
                          className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-accent', newTeamMembers.has(m.id) && 'bg-accent')}
                        >
                          <div className="flex size-7 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                            {getInitials(m.name)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{m.name}</div>
                            <div className="text-xs text-muted-foreground">{m.email}</div>
                          </div>
                          {newTeamMembers.has(m.id) && <Check className="size-4 text-primary" />}
                        </button>
                      ))}
                    </div>
                  )}
                  {newTeamMembers.size > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {Array.from(newTeamMembers).map(mId => (
                        <div key={mId} className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-2.5 py-1 text-xs">
                          {getMemberName(mId)}
                          <button onClick={() => setNewTeamMembers(prev => { const next = new Set(prev); next.delete(mId); return next; })} className="text-muted-foreground hover:text-foreground">
                            <X className="size-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Field>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {newTeamRole && (
                  <span>{newTeamPermissions.size} permissions{permsDifferFromRole ? ' (customized)' : ''}{saveAsPreset && presetName ? ` · Will save "${presetName}" as preset` : ''}</span>
                )}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                <Button className="rounded-xl" onClick={handleCreateTeam}>
                  <Briefcase className="mr-2 size-4" />
                  Create Team
                </Button>
              </div>
            </div>
          </div>
        </ShellCard>
      )}
    </div>
  );
}

export function GlobalSettingsPage({ initialTab = 'general', currentLeapSpace, currentUser }: GlobalSettingsPageProps) {
  const initialSpaceSection: SpaceSection = initialTab === 'profile' ? 'my-profile' : initialTab === 'integrations' ? 'integrations' : initialTab === 'notifications' ? 'notifications' : 'my-profile';
  const [spaceSection, setSpaceSection] = useState<SpaceSection>(initialSpaceSection);
  const [searchQuery, setSearchQuery] = useState('');
  const selectedLeapSpaceId = currentLeapSpace?.id || allLeapSpaces[0].id;

  const selectedLeapSpace = allLeapSpaces.find(space => space.id === selectedLeapSpaceId) || currentLeapSpace || allLeapSpaces[0];

  const initialProfileState = useMemo(() => defaultSpaceProfileForm(selectedLeapSpace, currentUser), [selectedLeapSpace, currentUser]);
  const initialNotificationState = useMemo(() => defaultSpaceNotificationForm(selectedLeapSpace), [selectedLeapSpace]);
  const initialSimpleState = useMemo(() => defaultSimpleSectionForm(spaceSection, selectedLeapSpace), [spaceSection, selectedLeapSpace]);

  const [spaceProfileForm, setSpaceProfileForm] = useState<SpaceProfileForm>(initialProfileState);
  const [spaceNotificationForm, setSpaceNotificationForm] = useState<SpaceNotificationForm>(initialNotificationState);
  const [simpleSectionForm, setSimpleSectionForm] = useState<SimpleSectionForm>(initialSimpleState);

  // Shared roles state — used by both RolesSection and TeamsSection
  const [roles, setRoles] = useState<RoleDefinition[]>(MOCK_ROLES);
  const handleAddRole = (role: RoleDefinition) => setRoles(prev => [...prev, role]);

  useEffect(() => {
    setSpaceSection(initialSpaceSection);
  }, [initialSpaceSection]);

  useEffect(() => {
    setSpaceProfileForm(initialProfileState);
    setSpaceNotificationForm(initialNotificationState);
  }, [initialProfileState, initialNotificationState]);

  useEffect(() => {
    setSimpleSectionForm(initialSimpleState);
  }, [initialSimpleState]);

  const visibleSpaceGroups = useMemo(() => {
    return spaceNavByRole[selectedLeapSpace.role].map(group => ({
      group: group.group,
      items: group.items
        .map(id => spaceSectionDefs.find(section => section.id === id))
        .filter(Boolean) as Array<(typeof spaceSectionDefs)[number]>,
    }));
  }, [selectedLeapSpace]);

  const filteredSpaceGroups = visibleSpaceGroups
    .map(group => ({
      ...group,
      items: group.items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter(group => group.items.length > 0);

  const saveProfile = () => {
    toast.success('LeapSpace profile updated', { description: `${selectedLeapSpace.name} now has fresh scoped profile settings.` });
  };

  const saveNotifications = () => {
    toast.success('Notification overrides updated', { description: `Delivery rules for ${selectedLeapSpace.name} were saved.` });
  };

  const saveSimpleSection = (title: string) => {
    toast.success(`${title} updated`, { description: `Changes for ${selectedLeapSpace.name} were saved.` });
  };

  const renderSpaceSettingsContent = () => {
    switch (spaceSection) {
      case 'my-profile':
        return (
          <ShellCard>
            <div className="p-6">
              <PanelHeader title="LeapSpace Profile" description={`This profile only exists inside ${selectedLeapSpace.name}. It inherits from My Profile by default, but selected presentation and privacy fields can be overridden here.`} />

              <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-muted/40 p-4">
                    <div className="h-28 rounded-lg border border-border bg-gradient-to-br from-primary/20 via-primary/10 to-muted" />
                    <div className="-mt-10 flex items-end gap-4 px-2">
                      <div className="flex size-20 items-center justify-center rounded-full border-4 border-card bg-primary text-xl font-semibold text-primary-foreground">
                        {getInitials(spaceProfileForm.displayName || currentUser?.name || 'Google User')}
                      </div>
                      <div className="pb-2">
                        <div className="text-lg font-semibold text-foreground">{spaceProfileForm.useCodename && spaceProfileForm.codename ? spaceProfileForm.codename : spaceProfileForm.displayName}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <RoleBadge role={selectedLeapSpace.role} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm leading-6 text-muted-foreground">{spaceProfileForm.bio}</div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/40 p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <EyeOff className="size-4" />
                      Privacy rule
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Anonymity is available in all LeapSpaces. If a member turns on anonymous mode here, admins do not get an override view of the hidden identity.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Display name in this LeapSpace">
                      <Input value={spaceProfileForm.displayName} onChange={event => setSpaceProfileForm(prev => ({ ...prev, displayName: event.target.value }))} />
                    </Field>
                    <Field label="Codename / alternate name">
                      <Input value={spaceProfileForm.codename} onChange={event => setSpaceProfileForm(prev => ({ ...prev, codename: event.target.value }))} placeholder="Optional when anonymous mode is used" />
                    </Field>
                    <Field label="Role title">
                      <Input value={spaceProfileForm.roleTitle} onChange={event => setSpaceProfileForm(prev => ({ ...prev, roleTitle: event.target.value }))} />
                    </Field>
                    <Field label="Profile photo mode">
                      <Select value={spaceProfileForm.profilePhotoMode} onValueChange={value => setSpaceProfileForm(prev => ({ ...prev, profilePhotoMode: value }))}>
                        <SelectTrigger className="h-11 rounded-xl border-border bg-input-background"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {photoModeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Override mode">
                      <Select value={spaceProfileForm.overrideMode} onValueChange={value => setSpaceProfileForm(prev => ({ ...prev, overrideMode: value }))}>
                        <SelectTrigger className="h-11 rounded-xl border-border bg-input-background"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {overrideOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Override scope">
                      <Input value={spaceProfileForm.overrideScope} onChange={event => setSpaceProfileForm(prev => ({ ...prev, overrideScope: event.target.value }))} />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Bio in this LeapSpace">
                        <Textarea value={spaceProfileForm.bio} onChange={event => setSpaceProfileForm(prev => ({ ...prev, bio: event.target.value }))} className="min-h-28" />
                      </Field>
                    </div>
                  </div>

                  <div className="grid gap-4 xl:grid-cols-2">
                    <ToggleField
                      label="Anonymous mode in this LeapSpace"
                      description="Hide real identity in this space. No admin override reveals the hidden identity."
                      checked={spaceProfileForm.anonymousMode}
                      onCheckedChange={checked => setSpaceProfileForm(prev => ({ ...prev, anonymousMode: checked }))}
                    />
                    <ToggleField
                      label="Use codename instead of full identity"
                      description="Only relevant when anonymous presentation is wanted for this LeapSpace."
                      checked={spaceProfileForm.useCodename}
                      onCheckedChange={checked => setSpaceProfileForm(prev => ({ ...prev, useCodename: checked }))}
                    />
                    <ToggleField
                      label="Show role badge on profile"
                      description="Lets other members see your scoped function or trust marker in this space."
                      checked={spaceProfileForm.showRoleBadge}
                      onCheckedChange={checked => setSpaceProfileForm(prev => ({ ...prev, showRoleBadge: checked }))}
                    />
                    <ToggleField
                      label="Appear in member directory"
                      description="Directory visibility is space-scoped so it does not change your global profile."
                      checked={spaceProfileForm.appearInDirectory}
                      onCheckedChange={checked => setSpaceProfileForm(prev => ({ ...prev, appearInDirectory: checked }))}
                    />
                    <ToggleField
                      label="Allow direct messages from members"
                      description="This is a LeapSpace override on top of the global default messaging policy."
                      checked={spaceProfileForm.allowDirectMessages}
                      onCheckedChange={checked => setSpaceProfileForm(prev => ({ ...prev, allowDirectMessages: checked }))}
                    />
                    <ToggleField
                      label="Appear in search inside this LeapSpace"
                      description="Search visibility is handled here rather than on the global profile."
                      checked={spaceProfileForm.appearInSearch}
                      onCheckedChange={checked => setSpaceProfileForm(prev => ({ ...prev, appearInSearch: checked }))}
                    />
                    <ToggleField
                      label="Allow connection requests"
                      description="Controls who can try to connect with you inside this space."
                      checked={spaceProfileForm.allowConnections}
                      onCheckedChange={checked => setSpaceProfileForm(prev => ({ ...prev, allowConnections: checked }))}
                    />
                    <ToggleField
                      label="Allow mentoring requests"
                      description="Useful for expert-heavy spaces where mentoring is part of the member experience."
                      checked={spaceProfileForm.allowMentoring}
                      onCheckedChange={checked => setSpaceProfileForm(prev => ({ ...prev, allowMentoring: checked }))}
                    />
                    <ToggleField
                      label="Allow collaboration requests"
                      description="Scoped collaboration controls belong here instead of your global account."
                      checked={spaceProfileForm.allowCollaboration}
                      onCheckedChange={checked => setSpaceProfileForm(prev => ({ ...prev, allowCollaboration: checked }))}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" className="rounded-xl border-border" onClick={() => setSpaceProfileForm(initialProfileState)}>Discard</Button>
                    <Button className="rounded-xl" onClick={saveProfile}>Save LeapSpace Profile</Button>
                  </div>
                </div>
              </div>
            </div>
          </ShellCard>
        );
      case 'notifications':
        return (
          <ShellCard>
            <div className="p-6">
              <PanelHeader title="LeapSpace Notifications" description={`These settings apply only inside ${selectedLeapSpace.name}. They override global notification defaults where needed.`} />
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="space-y-4">
                  <ToggleField label={`Mute ${selectedLeapSpace.name}`} description="Suppress most activity from this space without affecting the rest of your account." checked={spaceNotificationForm.muteSpace} onCheckedChange={checked => setSpaceNotificationForm(prev => ({ ...prev, muteSpace: checked }))} />
                  <ToggleField label="Mentions and replies" description="Stay alerted when your name or contribution gets direct engagement." checked={spaceNotificationForm.mentions} onCheckedChange={checked => setSpaceNotificationForm(prev => ({ ...prev, mentions: checked }))} />
                  <ToggleField label="Direct messages from members" description="Space-scoped override for direct messaging access." checked={spaceNotificationForm.directMessages} onCheckedChange={checked => setSpaceNotificationForm(prev => ({ ...prev, directMessages: checked }))} />
                  <ToggleField label="Mobile push notifications" description="Push behavior for this specific LeapSpace only." checked={spaceNotificationForm.push} onCheckedChange={checked => setSpaceNotificationForm(prev => ({ ...prev, push: checked }))} />
                </div>

                <div className="space-y-4">
                  <ToggleField label="Suppress @everyone and announcements" description="Reduce broad notification noise while still receiving high-signal messages." checked={spaceNotificationForm.suppressAnnouncements} onCheckedChange={checked => setSpaceNotificationForm(prev => ({ ...prev, suppressAnnouncements: checked }))} />
                  <ToggleField label="Suppress role mentions" description="Useful in spaces where role-based notifications are noisy." checked={spaceNotificationForm.suppressRoleMentions} onCheckedChange={checked => setSpaceNotificationForm(prev => ({ ...prev, suppressRoleMentions: checked }))} />
                  <ToggleField label="Mute new event notifications" description="Stops event marketing noise while keeping conversation and DM rules intact." checked={spaceNotificationForm.muteEvents} onCheckedChange={checked => setSpaceNotificationForm(prev => ({ ...prev, muteEvents: checked }))} />
                  <ToggleField label="Inherit global defaults when no override exists" description="Keeps this page scoped and avoids unnecessary duplication of account-level defaults." checked={spaceNotificationForm.inheritGlobalDefaults} onCheckedChange={checked => setSpaceNotificationForm(prev => ({ ...prev, inheritGlobalDefaults: checked }))} />
                  <Field label="Digest frequency">
                    <Select value={spaceNotificationForm.digestFrequency} onValueChange={value => setSpaceNotificationForm(prev => ({ ...prev, digestFrequency: value }))}>
                      <SelectTrigger className="h-11 rounded-xl border-border bg-input-background"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {digestOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" className="rounded-xl border-border" onClick={() => setSpaceNotificationForm(initialNotificationState)}>Discard</Button>
                <Button className="rounded-xl" onClick={saveNotifications}>Save notifications</Button>
              </div>
            </div>
          </ShellCard>
        );
      case 'my-content':
        return (
          <SimpleEditableSection
            title="My Content Settings"
            description="Editable creator defaults for publishing, collaboration, and connected creation workflows in this LeapSpace."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('My content settings')}
          />
        );
      case 'moderation':
        return (
          <SimpleEditableSection
            title="Moderation"
            description="Controls available because you have moderation permissions in this LeapSpace."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('Moderation')}
          />
        );
      case 'overview':
        return (
          <SimpleEditableSection
            title="LeapSpace Overview"
            description="High-level controls and copy for how this workspace presents itself."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('Overview')}
          />
        );
      case 'branding':
        return (
          <SimpleEditableSection
            title="Branding"
            description="Workspace identity controls for admins, including core descriptive and visual direction."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('Branding')}
          />
        );
      case 'integrations':
        return (
          <SimpleEditableSection
            title="Integrations"
            description="Editable connection summary and operational notes for this LeapSpace."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('Integrations')}
          />
        );
      case 'members':
        return <MembersSection leapSpace={selectedLeapSpace} />;
      case 'teams':
        return <TeamsSection leapSpace={selectedLeapSpace} roles={roles} onAddRole={handleAddRole} />;
      case 'roles':
        return <RolesSection leapSpace={selectedLeapSpace} roles={roles} setRoles={setRoles} />;
      case 'policies':
        return (
          <SimpleEditableSection
            title="Policies"
            description="Actor + role + scope policy controls for this workspace."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('Policies')}
          />
        );
      case 'invitations':
        return <InvitationsSection leapSpace={selectedLeapSpace} />;
      case 'audit-log':
        return (
          <SimpleEditableSection
            title="Audit Log"
            description="Track and configure operational logging surfaces for member, role, and billing changes."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('Audit log')}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-80 border-r border-border bg-card flex-shrink-0 flex flex-col h-full">
        <div className="p-5 border-b border-border">
          <div className="mb-3">
            <h1 className="text-lg font-semibold text-foreground">{selectedLeapSpace.name}</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">LeapSpace settings</p>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search settings"
              className="h-10 rounded-lg border-border bg-card pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-5">
            {filteredSpaceGroups.map(group => (
              <div key={group.group}>
                <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{group.group}</div>
                <div className="space-y-1">
                  {group.items.map(item => {
                    const Icon = item.icon;
                    const active = spaceSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSpaceSection(item.id as SpaceSection)}
                        className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors', active ? 'bg-sidebar-accent text-foreground border border-border' : 'text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent')}
                      >
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-6xl p-6 pb-24">
            <div className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>Settings</span>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-foreground">{spaceSectionDefs.find(s => s.id === spaceSection)?.label || 'Settings'}</span>
            </div>

            {renderSpaceSettingsContent()}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
