import React, { useMemo, useState } from 'react';
import {
  Bell,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  EyeOff,
  FileClock,
  KeyRound,
  LayoutGrid,
  Link2,
  Search,
  Shield,
  Sparkles,
  User,
  UserCog,
  UserPlus,
  Users,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
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
    <div className="mb-5">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function SettingRow({ label, value, actionLabel = 'Edit' }: { label: string; value?: string; actionLabel?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-border py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {value ? <div className="mt-1 text-sm text-foreground/80">{value}</div> : null}
      </div>
      <Button variant="outline" size="sm" className="h-8 rounded-lg border-border bg-card text-foreground shadow-none">
        {actionLabel}
      </Button>
    </div>
  );
}

function ToggleRow({ label, enabled = false }: { label: string; enabled?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-border py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1 pr-2 text-sm font-medium text-foreground">{label}</div>
      <button className={cn('relative h-6 w-11 shrink-0 rounded-full border border-border transition-colors', enabled ? 'bg-primary' : 'bg-input-background')}>
        <span className={cn('absolute top-0.5 size-5 rounded-full bg-background transition-all', enabled ? 'right-0.5' : 'left-0.5')} />
      </button>
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

function SpaceProfileSection({ leapSpace }: { leapSpace: LeapSpaceSummary }) {
  return (
    <div className="space-y-6">
      <ShellCard>
        <div className="p-5">
          <PanelHeader title="LeapSpace Profile" description={`This profile is scoped only to ${leapSpace.name}. Your role here is ${roleLabels[leapSpace.role]}. This page is separate from your global profile and separate from My Account.`} />
          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="rounded-xl border border-border bg-muted p-4 self-start">
              <div className="h-28 rounded-lg border border-border bg-accent" />
              <div className="-mt-10 flex items-end gap-4 px-2">
                <div className="flex size-20 items-center justify-center rounded-full border-4 border-card bg-primary text-xl font-semibold text-primary-foreground">
                  GU
                </div>
                <div className="pb-2">
                  <div className="text-lg font-semibold text-foreground">Google User</div>
                  <div className="mt-1 flex items-center gap-2"><RoleBadge role={leapSpace.role} /></div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-xl border border-border bg-muted p-4">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <UserCog className="size-4" />
                  Inheritance model
                </div>
                <div className="rounded-xl border border-border bg-card px-4">
                  <SettingRow label="Global profile source" value="Inherits from My Profile by default" actionLabel="View" />
                  <SettingRow label="Override mode" value="Customized for this LeapSpace" actionLabel="Change" />
                  <SettingRow label="Override scope" value="Display name, bio, photo, visibility, and messaging permissions" actionLabel="Review" />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted p-4">
                <div className="mb-4 text-sm font-semibold text-foreground">Scoped identity</div>
                <div className="rounded-xl border border-border bg-card px-4">
                  <SettingRow label="Display name in this LeapSpace" value="Google User" />
                  <SettingRow label="Codename / alternate name" value="Not set" actionLabel="Set" />
                  <SettingRow label="Role title" value={roleLabels[leapSpace.role]} />
                  <SettingRow label="Bio in this LeapSpace" value="Helping creators and operators build structured, high-signal spaces." />
                  <SettingRow label="Profile photo override" value="Uses global avatar" actionLabel="Change" />
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <div className="rounded-xl border border-border bg-muted p-4">
                  <div className="mb-4 text-sm font-semibold text-foreground">Visibility</div>
                  <div className="rounded-xl border border-border bg-card px-4">
                    <ToggleRow label="Anonymous mode in this LeapSpace" />
                    <ToggleRow label="Use codename instead of full identity" />
                    <ToggleRow label="Show role badge on profile" enabled />
                    <ToggleRow label="Appear in member directory" enabled />
                    <ToggleRow label="Allow direct messages from members" enabled={leapSpace.role !== 'learner'} />
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted p-4">
                  <div className="mb-4 text-sm font-semibold text-foreground">Discovery and permissions</div>
                  <div className="rounded-xl border border-border bg-card px-4">
                    <ToggleRow label="Allow connection requests" enabled />
                    <ToggleRow label="Allow mentoring requests" enabled={leapSpace.role !== 'learner'} />
                    <ToggleRow label="Allow collaboration requests" enabled={leapSpace.role === 'admin' || leapSpace.role === 'creator'} />
                    <ToggleRow label="Appear in search inside this LeapSpace" enabled />
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted p-4">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <EyeOff className="size-4" />
                    Privacy rule
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                    Anonymity is available in all LeapSpaces. If you choose to be anonymous here, other members do not see your hidden identity and admins do not get an override view.
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted p-4">
                  <div className="mb-4 text-sm font-semibold text-foreground">Role-aware behavior</div>
                  <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                    {leapSpace.role === 'admin' && 'Admins can manage workspace settings, access, and branding in addition to their own LeapSpace profile preferences.'}
                    {leapSpace.role === 'moderator' && 'Moderators can manage safety and community controls, but not branding or billing.'}
                    {leapSpace.role === 'creator' && 'Creators can manage their content and scoped presentation, but not full workspace administration.'}
                    {leapSpace.role === 'learner' && 'Learners only see personal settings inside the LeapSpace: profile and notifications.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShellCard>
    </div>
  );
}

function SpaceNotificationsSection({ leapSpace }: { leapSpace: LeapSpaceSummary }) {
  return (
    <ShellCard>
      <div className="p-5">
        <PanelHeader title="LeapSpace notifications" description={`These settings apply only inside ${leapSpace.name}. They override your global notification defaults for this LeapSpace only.`} />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-xl border border-border bg-muted p-4">
            <div className="mb-4 text-sm font-semibold text-foreground">Delivery rules</div>
            <div className="rounded-xl border border-border bg-card px-4">
              <ToggleRow label={`Mute ${leapSpace.name}`} />
              <ToggleRow label="Mentions and replies" enabled />
              <ToggleRow label="Direct messages from members" enabled={leapSpace.role !== 'learner'} />
              <ToggleRow label="Mobile push notifications" enabled />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted p-4">
            <div className="mb-4 text-sm font-semibold text-foreground">Suppression</div>
            <div className="rounded-xl border border-border bg-card px-4">
              <ToggleRow label="Suppress @everyone and global announcements" enabled />
              <ToggleRow label="Suppress role mentions" />
              <ToggleRow label="Mute new event notifications" />
              <ToggleRow label="Inherit global defaults when no override exists" enabled />
            </div>
          </div>
        </div>
      </div>
    </ShellCard>
  );
}

function SpaceSettingsContent({ section, currentLeapSpace }: { section: SpaceSection; currentLeapSpace: LeapSpaceSummary }) {
  switch (section) {
    case 'my-profile':
      return <SpaceProfileSection leapSpace={currentLeapSpace} />;
    case 'notifications':
      return <SpaceNotificationsSection leapSpace={currentLeapSpace} />;
    case 'my-content':
      return <ShellCard><div className="p-5"><PanelHeader title="My content settings" description="Settings available because you have creator permissions in this LeapSpace." /><div className="rounded-xl border border-border bg-muted px-4"><SettingRow label="Publishing defaults" value="Review before publish" /><SettingRow label="Creator collaboration" value="Invite collaborators to owned content" /><SettingRow label="Content integrations" value="Slack, Zapier, Google Calendar" actionLabel="Manage" /></div></div></ShellCard>;
    case 'moderation':
      return <ShellCard><div className="p-5"><PanelHeader title="Moderation" description="Controls available because you have moderation permissions in this LeapSpace." /><div className="rounded-xl border border-border bg-muted px-4"><ToggleRow label="Prioritize reports assigned to me" enabled /><ToggleRow label="Show flagged content queue by default" enabled /><SettingRow label="Default moderation policy" value="Community safety baseline" actionLabel="Review" /></div></div></ShellCard>;
    case 'overview':
      return <ShellCard><div className="p-5"><PanelHeader title="LeapSpace overview" description="High-level controls for this workspace." /><div className="rounded-xl border border-border bg-muted px-4"><SettingRow label="LeapSpace name" value={currentLeapSpace.name} /><SettingRow label="Type" value={currentLeapSpace.type || 'Workspace'} /><SettingRow label="Role in this LeapSpace" value={roleLabels[currentLeapSpace.role]} actionLabel="View" /></div></div></ShellCard>;
    case 'branding':
      return <ShellCard><div className="p-5"><PanelHeader title="Branding" description="Workspace identity controls available because you are an admin here." /><div className="rounded-xl border border-border bg-muted px-4"><SettingRow label="Workspace name" value={currentLeapSpace.name} /><SettingRow label="Cover image" value="Hero image uploaded" actionLabel="Replace" /><SettingRow label="Member-facing description" value="Workspace for creators, moderators, operators, and invited partners." /></div></div></ShellCard>;
    case 'integrations':
      return <ShellCard><div className="p-5"><PanelHeader title="Integrations" description="Connections available to this LeapSpace." /><div className="rounded-xl border border-border bg-muted px-4"><SettingRow label="Slack" value="Connected to #community-ops" actionLabel="Manage" /><SettingRow label="Google Calendar" value="2 calendars synced" actionLabel="Manage" /><SettingRow label="Zapier" value="3 automations active" actionLabel="Open" /></div></div></ShellCard>;
    case 'members':
      return <ShellCard><div className="p-5"><PanelHeader title="Members" description="People with direct membership or inherited access in this LeapSpace." /><div className="rounded-xl border border-border bg-muted px-4"><SettingRow label="Sarah Chen" value="Owner • Core Admins" actionLabel="Manage" /><SettingRow label="Rae K." value="Admin • Event Ops" actionLabel="Manage" /><SettingRow label="Google User" value={`${roleLabels[currentLeapSpace.role]} • Current user`} actionLabel="Inspect" /></div></div></ShellCard>;
    case 'teams':
      return <ShellCard><div className="p-5"><PanelHeader title="Teams" description="Reusable user groups that carry policies in bulk." /><div className="rounded-xl border border-border bg-muted px-4"><SettingRow label="Core Admins" value="6 members • Full LeapSpace management" /><SettingRow label="Event Ops" value="14 members • Events scope" /><SettingRow label="External Partners" value="21 members • Viewer scope" /></div></div></ShellCard>;
    case 'roles':
      return <ShellCard><div className="p-5"><PanelHeader title="Roles" description="Named permission bundles attached to members or teams." /><div className="rounded-xl border border-border bg-muted px-4"><SettingRow label="LeapSpace Admin" value="Settings, access, billing, branding" actionLabel="Inspect" /><SettingRow label="Event Manager" value="Events edit, attendee access, reports" actionLabel="Inspect" /><SettingRow label="Viewer" value="Read-only access to scoped resources" actionLabel="Inspect" /></div></div></ShellCard>;
    case 'policies':
      return <ShellCard><div className="p-5"><PanelHeader title="Policies" description="Access is composed as actor + role + scope." /><div className="rounded-xl border border-border bg-muted p-4"><div className="grid grid-cols-[1.1fr_0.9fr_1fr] text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"><div>Actor</div><div>Role</div><div>Scope</div></div><div className="mt-3 space-y-3 text-sm text-foreground/85"><div className="grid grid-cols-[1.1fr_0.9fr_1fr] border-t border-border pt-3"><div>Core Admins</div><div>LeapSpace Admin</div><div>All resources</div></div><div className="grid grid-cols-[1.1fr_0.9fr_1fr] border-t border-border pt-3"><div>Event Ops</div><div>Event Manager</div><div>All events</div></div><div className="grid grid-cols-[1.1fr_0.9fr_1fr] border-t border-border pt-3"><div>External Partners</div><div>Viewer</div><div>Community: Startup Circle</div></div></div></div></div></ShellCard>;
    case 'invitations':
      return <ShellCard><div className="p-5"><PanelHeader title="Invitations" description="Manage pending access into this LeapSpace." /><div className="rounded-xl border border-border bg-muted px-4"><SettingRow label="Open invitations" value="18 pending invites" actionLabel="Review" /><SettingRow label="Invite approval flow" value="Admin approval required" actionLabel="Edit" /><SettingRow label="Default assignee team" value="Community Team" actionLabel="Change" /></div></div></ShellCard>;
    case 'audit-log':
      return <ShellCard><div className="p-5"><PanelHeader title="Audit log" description="Track member, role, and policy changes in this LeapSpace." /><div className="rounded-xl border border-border bg-muted px-4"><SettingRow label="Policy update" value="Sarah Chen granted Event Manager to Event Ops • 2 hours ago" actionLabel="View" /><SettingRow label="Member invite" value="Ava Wilson invited 12 users to External Partners • Yesterday" actionLabel="View" /><SettingRow label="Billing change" value="Plan upgraded to Business • Jan 12, 2026" actionLabel="View" /></div></div></ShellCard>;
  }
}

export function GlobalSettingsPage({ initialTab = 'general', currentLeapSpace }: GlobalSettingsPageProps) {
  const initialSpaceSection: SpaceSection = initialTab === 'profile' ? 'my-profile' : initialTab === 'integrations' ? 'integrations' : initialTab === 'notifications' ? 'notifications' : 'my-profile';
  const [spaceSection, setSpaceSection] = useState<SpaceSection>(initialSpaceSection);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLeapSpaceMenu, setShowLeapSpaceMenu] = useState(false);
  const [selectedLeapSpaceId, setSelectedLeapSpaceId] = useState(currentLeapSpace?.id || allLeapSpaces[0].id);

  const selectedLeapSpace = allLeapSpaces.find(space => space.id === selectedLeapSpaceId) || currentLeapSpace || allLeapSpaces[0];
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

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-72 border-r border-border bg-card flex-shrink-0 flex flex-col h-full">
        <div className="p-5 border-b border-border">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-foreground">Manage LeapSpace</h1>
            <p className="mt-1 text-sm text-muted-foreground">Scoped settings for the currently selected LeapSpace only. This page is not your global profile and not your global account settings.</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLeapSpaceMenu(prev => !prev)}
              className="w-full rounded-xl border border-border bg-muted px-3 py-3 text-left hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {getInitials(selectedLeapSpace.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">{selectedLeapSpace.name}</div>
                  <div className="mt-1"><RoleBadge role={selectedLeapSpace.role} /></div>
                </div>
                <ChevronDown className="size-4 text-muted-foreground" />
              </div>
            </button>

            {showLeapSpaceMenu ? (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 rounded-xl border border-border bg-popover p-2">
                {allLeapSpaces.map(space => (
                  <button
                    key={space.id}
                    onClick={() => {
                      setSelectedLeapSpaceId(space.id);
                      setShowLeapSpaceMenu(false);
                    }}
                    className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-accent', selectedLeapSpace.id === space.id && 'bg-accent')}
                  >
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {getInitials(space.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-popover-foreground">{space.name}</div>
                      <div className="mt-1"><RoleBadge role={space.role} /></div>
                    </div>
                    {selectedLeapSpace.id === space.id ? <Check className="size-4 text-foreground" /> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search LeapSpace settings"
              className="h-11 w-full rounded-xl border border-border bg-muted pl-9 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
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

        <div className="border-t border-border p-3 space-y-1">
          <button onClick={() => setSpaceSection('my-profile')} className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left text-sm text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground">
            <UserCog className="size-4" />
            <span>Edit My LeapSpace Profile</span>
          </button>
          <button onClick={() => setSpaceSection('notifications')} className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left text-sm text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground">
            <Bell className="size-4" />
            <span>LeapSpace Notifications</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 pb-24 max-w-5xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="rounded-lg border border-border bg-card text-secondary-foreground shadow-none">
                  <Building2 className="size-3 mr-1" />
                  {selectedLeapSpace.name}
                </Badge>
                <RoleBadge role={selectedLeapSpace.role} />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{selectedLeapSpace.name} Settings</h2>
              <p className="text-sm text-muted-foreground mt-1">
                LeapSpace settings change by role. Your LeapSpace Profile inherits from your global profile by default, but selected fields, privacy, anonymity, and notification behavior can be overridden here.
              </p>
            </div>

            <SpaceSettingsContent section={spaceSection} currentLeapSpace={selectedLeapSpace} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
