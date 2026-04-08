import React, { useEffect, useMemo, useState } from 'react';
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
  UserPlus,
  Users,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
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
  return <section className={cn('rounded-3xl border border-border bg-card shadow-sm', className)}>{children}</section>;
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
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-4">
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

export function GlobalSettingsPage({ initialTab = 'general', currentLeapSpace, currentUser }: GlobalSettingsPageProps) {
  const initialSpaceSection: SpaceSection = initialTab === 'profile' ? 'my-profile' : initialTab === 'integrations' ? 'integrations' : initialTab === 'notifications' ? 'notifications' : 'my-profile';
  const [spaceSection, setSpaceSection] = useState<SpaceSection>(initialSpaceSection);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLeapSpaceMenu, setShowLeapSpaceMenu] = useState(false);
  const [selectedLeapSpaceId, setSelectedLeapSpaceId] = useState(currentLeapSpace?.id || allLeapSpaces[0].id);

  const selectedLeapSpace = allLeapSpaces.find(space => space.id === selectedLeapSpaceId) || currentLeapSpace || allLeapSpaces[0];

  const initialProfileState = useMemo(() => defaultSpaceProfileForm(selectedLeapSpace, currentUser), [selectedLeapSpace, currentUser]);
  const initialNotificationState = useMemo(() => defaultSpaceNotificationForm(selectedLeapSpace), [selectedLeapSpace]);
  const initialSimpleState = useMemo(() => defaultSimpleSectionForm(spaceSection, selectedLeapSpace), [spaceSection, selectedLeapSpace]);

  const [spaceProfileForm, setSpaceProfileForm] = useState<SpaceProfileForm>(initialProfileState);
  const [spaceNotificationForm, setSpaceNotificationForm] = useState<SpaceNotificationForm>(initialNotificationState);
  const [simpleSectionForm, setSimpleSectionForm] = useState<SimpleSectionForm>(initialSimpleState);

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

  const headerMeta = `${roleLabels[selectedLeapSpace.role]} role • ${selectedLeapSpace.communitiesCount || 0} groups • ${selectedLeapSpace.eventsCount || 0} events`;

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
                  <div className="rounded-3xl border border-border bg-muted/40 p-4">
                    <div className="h-28 rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-primary/10 to-muted" />
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

                  <div className="rounded-3xl border border-border bg-muted/40 p-5">
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
        return (
          <SimpleEditableSection
            title="Members"
            description="Editable member management summary for admins and moderators."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('Members')}
          />
        );
      case 'teams':
        return (
          <SimpleEditableSection
            title="Teams"
            description="Reusable group definitions and management notes for access composition."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('Teams')}
          />
        );
      case 'roles':
        return (
          <SimpleEditableSection
            title="Roles"
            description="Permission bundle definitions that control who can do what in this LeapSpace."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('Roles')}
          />
        );
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
        return (
          <SimpleEditableSection
            title="Invitations"
            description="Invite review flow, default assignee team, and entry management for this LeapSpace."
            form={simpleSectionForm}
            onChange={setSimpleSectionForm}
            onReset={() => setSimpleSectionForm(initialSimpleState)}
            onSave={() => saveSimpleSection('Invitations')}
          />
        );
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
          <div className="rounded-2xl border border-border bg-muted/40 p-4">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-foreground">Manage LeapSpace</h1>
              <p className="mt-1 text-sm text-muted-foreground">Scoped settings for the selected LeapSpace. This is separate from My Profile and My Account.</p>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowLeapSpaceMenu(prev => !prev)}
                className="w-full rounded-2xl border border-border bg-card px-3 py-3 text-left hover:bg-accent"
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
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 rounded-2xl border border-border bg-popover p-2 shadow-lg">
                  {allLeapSpaces.map(space => (
                    <button
                      key={space.id}
                      onClick={() => {
                        setSelectedLeapSpaceId(space.id);
                        setShowLeapSpaceMenu(false);
                      }}
                      className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-accent', selectedLeapSpace.id === space.id && 'bg-accent')}
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
              <Input
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Search LeapSpace settings"
                className="h-11 rounded-xl border-border bg-card pl-9"
              />
            </div>
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
                        className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors', active ? 'bg-sidebar-accent text-foreground border border-border shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent')}
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
            <div className="mb-8 rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-lg border border-border bg-card text-secondary-foreground shadow-none">
                  <Building2 className="size-3 mr-1" />
                  {selectedLeapSpace.name}
                </Badge>
                <RoleBadge role={selectedLeapSpace.role} />
                <Badge variant="secondary" className="rounded-lg border border-border bg-card text-secondary-foreground shadow-none">
                  Scoped settings
                </Badge>
              </div>

              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    <Sparkles className="size-3.5" />
                    LeapSpace-specific controls
                  </div>
                  <h2 className="text-3xl font-semibold text-foreground">{selectedLeapSpace.name} Settings</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                    Your LeapSpace Profile inherits from your global profile by default, but identity presentation, privacy, anonymity, messaging permissions, and notification behavior can all be overridden here.
                  </p>
                </div>

                <div className="max-w-md text-sm leading-6 text-muted-foreground lg:text-right">
                  {headerMeta}
                </div>
              </div>
            </div>

            {renderSpaceSettingsContent()}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
