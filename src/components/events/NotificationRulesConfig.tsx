import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  FileText,
  Calendar,
  MapPin,
  LayoutList,
  Ticket,
  ClipboardList,
  Users,
  UserCog,
  Radio,
  Megaphone,
  Settings,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info,
  Clock,
  Moon,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { cn } from '../ui/utils';

// ── Types ──

export interface NotificationRule {
  categoryId: string;
  emailAttendees: boolean;
  emailAdmin: boolean;
  urgent: boolean;
  adminRolesNotified: string[];
  changelogVisibleTo: string[];
}

export interface DigestSettings {
  enabled: boolean;
  frequency: '1h' | '4h' | 'daily' | 'weekly';
  sendTime: string;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  skipSelfChanges: boolean;
  attendeeThreshold: number;
}

interface NotificationCategory {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  actions: string[];
  attendeeEmailRelevant: boolean; // false = gray out attendee toggle
}

// ── Constants ──

const ADMIN_ROLES = [
  { id: 'co-host', label: 'Co-host' },
  { id: 'speaker', label: 'Speaker' },
  { id: 'moderator', label: 'Moderator' },
  { id: 'tech-support', label: 'Tech Support' },
];

const CATEGORIES: NotificationCategory[] = [
  {
    id: 'event-info',
    label: 'Event Info',
    description: 'Title, description, category, privacy, cover image, logo',
    icon: FileText,
    actions: ['Title changed', 'Description changed', 'Category changed', 'Privacy toggled', 'Cover image changed', 'Logo changed'],
    attendeeEmailRelevant: true,
  },
  {
    id: 'date-time',
    label: 'Date & Time',
    description: 'Event date, start/end time, timezone',
    icon: Calendar,
    actions: ['Event date changed', 'Start time changed', 'End time changed', 'Timezone changed'],
    attendeeEmailRelevant: true,
  },
  {
    id: 'location-format',
    label: 'Location & Format',
    description: 'Event format, venue/address, meeting link',
    icon: MapPin,
    actions: ['Format switched (virtual/in-person/hybrid)', 'Venue or address changed', 'Meeting link changed'],
    attendeeEmailRelevant: true,
  },
  {
    id: 'schedule-sessions',
    label: 'Schedule & Sessions',
    description: 'Session CRUD, speaker assignments, reordering',
    icon: LayoutList,
    actions: ['Session added', 'Session edited', 'Session deleted', 'Session reordered', 'Speaker assigned/unassigned'],
    attendeeEmailRelevant: true,
  },
  {
    id: 'tickets-pricing',
    label: 'Tickets & Pricing',
    description: 'Ticket tiers, pricing changes, discount codes',
    icon: Ticket,
    actions: ['Ticket tier created', 'Tier price/name/quantity changed', 'Tier deleted', 'Discount code created', 'Discount code edited', 'Discount code deactivated'],
    attendeeEmailRelevant: true,
  },
  {
    id: 'registration',
    label: 'Registration',
    description: 'Form fields, open/close, waitlist, capacity',
    icon: ClipboardList,
    actions: ['Reg form fields added/removed', 'Registration opened', 'Registration closed', 'Waitlist enabled/disabled', 'Capacity changed'],
    attendeeEmailRelevant: true,
  },
  {
    id: 'attendee-management',
    label: 'Attendee Management',
    description: 'Approvals, rejections, removals, refunds',
    icon: Users,
    actions: ['Attendee approved', 'Attendee rejected', 'Attendee removed/banned', 'Bulk waitlist approval', 'Check-in status changed', 'Refund issued'],
    attendeeEmailRelevant: false,
  },
  {
    id: 'team-roles',
    label: 'Team & Roles',
    description: 'Invitations, removals, role changes',
    icon: UserCog,
    actions: ['Team member invited', 'Team member removed', 'Role changed (promoted/demoted)', 'Speaker added', 'Speaker removed'],
    attendeeEmailRelevant: false,
  },
  {
    id: 'event-lifecycle',
    label: 'Event Lifecycle',
    description: 'Publish, unpublish, cancel, archive',
    icon: Radio,
    actions: ['Event published', 'Event unpublished', 'Event cancelled', 'Event archived', 'Event rescheduled'],
    attendeeEmailRelevant: true,
  },
  {
    id: 'communication',
    label: 'Communication',
    description: 'Announcements, custom reminders',
    icon: Megaphone,
    actions: ['Announcement sent', 'Custom reminder sent'],
    attendeeEmailRelevant: false, // these inherently go to attendees already
  },
  {
    id: 'settings-config',
    label: 'Settings & Config',
    description: 'Branding, integrations, permissions, notification rules',
    icon: Settings,
    actions: ['Branding updated', 'Integration connected/disconnected', 'Permission matrix changed', 'Notification rules changed'],
    attendeeEmailRelevant: false,
  },
];

const DEFAULT_RULES: Record<string, NotificationRule> = {
  'event-info': {
    categoryId: 'event-info',
    emailAttendees: false,
    emailAdmin: true,
    urgent: false,
    adminRolesNotified: ['co-host'],
    changelogVisibleTo: ['co-host', 'speaker', 'moderator', 'tech-support'],
  },
  'date-time': {
    categoryId: 'date-time',
    emailAttendees: true,
    emailAdmin: true,
    urgent: true,
    adminRolesNotified: ['co-host', 'speaker', 'moderator', 'tech-support'],
    changelogVisibleTo: ['co-host', 'speaker', 'moderator', 'tech-support'],
  },
  'location-format': {
    categoryId: 'location-format',
    emailAttendees: true,
    emailAdmin: true,
    urgent: true,
    adminRolesNotified: ['co-host', 'speaker', 'moderator', 'tech-support'],
    changelogVisibleTo: ['co-host', 'speaker', 'moderator', 'tech-support'],
  },
  'schedule-sessions': {
    categoryId: 'schedule-sessions',
    emailAttendees: false,
    emailAdmin: true,
    urgent: false,
    adminRolesNotified: ['co-host', 'speaker'],
    changelogVisibleTo: ['co-host', 'speaker', 'moderator', 'tech-support'],
  },
  'tickets-pricing': {
    categoryId: 'tickets-pricing',
    emailAttendees: false,
    emailAdmin: true,
    urgent: false,
    adminRolesNotified: ['co-host'],
    changelogVisibleTo: ['co-host'],
  },
  'registration': {
    categoryId: 'registration',
    emailAttendees: false,
    emailAdmin: true,
    urgent: false,
    adminRolesNotified: ['co-host'],
    changelogVisibleTo: ['co-host', 'moderator'],
  },
  'attendee-management': {
    categoryId: 'attendee-management',
    emailAttendees: false,
    emailAdmin: true,
    urgent: false,
    adminRolesNotified: ['co-host', 'moderator'],
    changelogVisibleTo: ['co-host', 'moderator'],
  },
  'team-roles': {
    categoryId: 'team-roles',
    emailAttendees: false,
    emailAdmin: true,
    urgent: false,
    adminRolesNotified: [],
    changelogVisibleTo: ['co-host'],
  },
  'event-lifecycle': {
    categoryId: 'event-lifecycle',
    emailAttendees: true,
    emailAdmin: true,
    urgent: true,
    adminRolesNotified: ['co-host', 'speaker', 'moderator', 'tech-support'],
    changelogVisibleTo: ['co-host', 'speaker', 'moderator', 'tech-support'],
  },
  'communication': {
    categoryId: 'communication',
    emailAttendees: false,
    emailAdmin: true,
    urgent: false,
    adminRolesNotified: ['co-host', 'speaker', 'moderator', 'tech-support'],
    changelogVisibleTo: ['co-host', 'speaker', 'moderator', 'tech-support'],
  },
  'settings-config': {
    categoryId: 'settings-config',
    emailAttendees: false,
    emailAdmin: false,
    urgent: false,
    adminRolesNotified: [],
    changelogVisibleTo: [],
  },
};

const DEFAULT_DIGEST: DigestSettings = {
  enabled: true,
  frequency: 'daily',
  sendTime: '09:00',
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00',
  skipSelfChanges: true,
  attendeeThreshold: 0,
};

// ── Toggle Switch Component ──

function Toggle({
  checked,
  onChange,
  disabled,
  size = 'default',
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  size?: 'default' | 'sm';
}) {
  const h = size === 'sm' ? 'h-5 w-9' : 'h-6 w-11';
  const dot = size === 'sm' ? 'size-3.5' : 'size-4';
  const translate = size === 'sm' ? 'translate-x-[18px]' : 'translate-x-6';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors',
        h,
        disabled && 'opacity-40 cursor-not-allowed',
        checked ? 'bg-primary' : 'bg-muted border border-border'
      )}
    >
      <span
        className={cn(
          'inline-block transform rounded-full bg-white transition-transform',
          dot,
          checked ? translate : 'translate-x-1'
        )}
      />
    </button>
  );
}

// ── Role Chip Selector ──

function RoleChips({
  selected,
  onChange,
  label,
}: {
  selected: string[];
  onChange: (roles: string[]) => void;
  label: string;
}) {
  const toggleRole = (roleId: string) => {
    if (selected.includes(roleId)) {
      onChange(selected.filter((r) => r !== roleId));
    } else {
      onChange([...selected, roleId]);
    }
  };

  const allSelected = ADMIN_ROLES.every((r) => selected.includes(r.id));
  const toggleAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(ADMIN_ROLES.map((r) => r.id));
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <button
          onClick={toggleAll}
          className="text-[10px] text-primary hover:underline"
        >
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <Badge
          variant="outline"
          className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border-primary/20 cursor-default"
        >
          Host (always)
        </Badge>
        {ADMIN_ROLES.map((role) => (
          <button
            key={role.id}
            onClick={() => toggleRole(role.id)}
            className={cn(
              'inline-flex items-center px-2 py-0.5 rounded-md text-[10px] border transition-all',
              selected.includes(role.id)
                ? 'bg-primary/10 text-primary border-primary/20'
                : 'bg-card text-muted-foreground/50 border-border hover:border-border'
            )}
          >
            {role.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Category Card ──

function CategoryCard({
  category,
  rule,
  onUpdate,
}: {
  category: NotificationCategory;
  rule: NotificationRule;
  onUpdate: (rule: NotificationRule) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = category.icon;

  const update = (patch: Partial<NotificationRule>) => {
    onUpdate({ ...rule, ...patch });
  };

  const hasAnyEmail = rule.emailAttendees || rule.emailAdmin;

  return (
    <div
      className={cn(
        'bg-card rounded-xl border transition-all',
        rule.urgent ? 'border-primary/40' : 'border-border'
      )}
    >
      {/* Main row */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={cn(
              'size-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
              rule.urgent ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            )}
          >
            <Icon className="size-4" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className="text-sm text-foreground">{category.label}</h4>
              {rule.urgent && (
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] px-1.5 py-0 h-4 hover:bg-primary/10">
                  Urgent
                </Badge>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {category.description}
            </p>

            {/* Toggle row */}
            <div className="flex items-center gap-5 mt-3">
              {/* Email Attendees */}
              <div
                className={cn(
                  'flex items-center gap-2',
                  !category.attendeeEmailRelevant && 'opacity-40'
                )}
              >
                <Toggle
                  checked={rule.emailAttendees}
                  onChange={(v) => update({ emailAttendees: v })}
                  disabled={!category.attendeeEmailRelevant}
                  size="sm"
                />
                <span className="text-xs text-muted-foreground">Email attendees</span>
              </div>

              {/* Email Admin */}
              <div className="flex items-center gap-2">
                <Toggle
                  checked={rule.emailAdmin}
                  onChange={(v) => update({ emailAdmin: v })}
                  size="sm"
                />
                <span className="text-xs text-muted-foreground">Email admin</span>
              </div>

              {/* Urgent */}
              <div className="flex items-center gap-2">
                <Toggle
                  checked={rule.urgent}
                  onChange={(v) => update({ urgent: v })}
                  size="sm"
                />
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertTriangle className="size-3" />
                  Urgent
                </span>
              </div>
            </div>
          </div>

          {/* Expand button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors flex-shrink-0"
          >
            {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-border px-4 py-4 bg-muted/30 space-y-4 rounded-b-xl">
          {/* Admin Roles Notified */}
          <RoleChips
            label="Admin roles notified (email)"
            selected={rule.adminRolesNotified}
            onChange={(roles) => update({ adminRolesNotified: roles })}
          />

          <Separator className="bg-border" />

          {/* Changelog Visibility */}
          <RoleChips
            label="Change Log visible to"
            selected={rule.changelogVisibleTo}
            onChange={(roles) => update({ changelogVisibleTo: roles })}
          />

          <Separator className="bg-border" />

          {/* Actions list */}
          <div className="space-y-1.5">
            <span className="text-xs text-muted-foreground">Actions in this category</span>
            <div className="flex flex-wrap gap-1">
              {category.actions.map((action) => (
                <Badge
                  key={action}
                  variant="outline"
                  className="text-[10px] font-normal border-border text-muted-foreground"
                >
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Digest Settings Card ──

function DigestSettingsCard({
  settings,
  onUpdate,
}: {
  settings: DigestSettings;
  onUpdate: (s: DigestSettings) => void;
}) {
  const update = (patch: Partial<DigestSettings>) => {
    onUpdate({ ...settings, ...patch });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-primary" />
          <div>
            <h3 className="text-sm text-foreground">Digest & Delivery</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Bundle non-urgent changes instead of sending individual emails
            </p>
          </div>
        </div>
        <Toggle
          checked={settings.enabled}
          onChange={(v) => update({ enabled: v })}
        />
      </div>

      {settings.enabled && (
        <>
          <Separator className="bg-border" />

          <div className="grid grid-cols-2 gap-6">
            {/* Frequency */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground font-normal">Digest frequency</Label>
              <Select
                value={settings.frequency}
                onValueChange={(v: DigestSettings['frequency']) => update({ frequency: v })}
              >
                <SelectTrigger className="border-border h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Every hour</SelectItem>
                  <SelectItem value="4h">Every 4 hours</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Send time (for daily/weekly) */}
            {(settings.frequency === 'daily' || settings.frequency === 'weekly') && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-normal">Send time</Label>
                <Input
                  type="time"
                  value={settings.sendTime}
                  onChange={(e) => update({ sendTime: e.target.value })}
                  className="border-border h-9 text-sm"
                />
              </div>
            )}
          </div>

          <Separator className="bg-border" />

          {/* Quiet Hours */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="size-3.5 text-muted-foreground" />
                <div>
                  <span className="text-sm text-foreground">Quiet hours</span>
                  <p className="text-[10px] text-muted-foreground">
                    Defer non-urgent emails during these hours
                  </p>
                </div>
              </div>
              <Toggle
                checked={settings.quietHoursEnabled}
                onChange={(v) => update({ quietHoursEnabled: v })}
                size="sm"
              />
            </div>
            {settings.quietHoursEnabled && (
              <div className="flex items-center gap-3 pl-6">
                <Input
                  type="time"
                  value={settings.quietHoursStart}
                  onChange={(e) => update({ quietHoursStart: e.target.value })}
                  className="border-border h-8 text-xs w-28"
                />
                <span className="text-xs text-muted-foreground">to</span>
                <Input
                  type="time"
                  value={settings.quietHoursEnd}
                  onChange={(e) => update({ quietHoursEnd: e.target.value })}
                  className="border-border h-8 text-xs w-28"
                />
              </div>
            )}
          </div>

          <Separator className="bg-border" />

          {/* Skip self-changes */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-foreground">Skip self-changes</span>
              <p className="text-[10px] text-muted-foreground">
                Don't send me emails about changes I made myself
              </p>
            </div>
            <Toggle
              checked={settings.skipSelfChanges}
              onChange={(v) => update({ skipSelfChanges: v })}
              size="sm"
            />
          </div>

          <Separator className="bg-border" />

          {/* Attendee email threshold */}
          <div className="space-y-2">
            <div>
              <span className="text-sm text-foreground">Attendee email threshold</span>
              <p className="text-[10px] text-muted-foreground">
                Only send attendee emails if more than N attendees are registered (0 = always send)
              </p>
            </div>
            <Input
              type="number"
              min={0}
              value={settings.attendeeThreshold}
              onChange={(e) =>
                update({ attendeeThreshold: Math.max(0, parseInt(e.target.value) || 0) })
              }
              className="border-border h-9 text-sm w-24"
            />
          </div>
        </>
      )}
    </div>
  );
}

// ── Summary Stats ──

function RulesSummary({ rules }: { rules: Record<string, NotificationRule> }) {
  const entries = Object.values(rules);
  const emailAttendeeCount = entries.filter((r) => r.emailAttendees).length;
  const emailAdminCount = entries.filter((r) => r.emailAdmin).length;
  const urgentCount = entries.filter((r) => r.urgent).length;

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-card rounded-xl border border-border p-4 text-center">
        <div className="text-2xl text-foreground">{emailAttendeeCount}</div>
        <p className="text-[10px] text-muted-foreground mt-0.5">Email attendees</p>
      </div>
      <div className="bg-card rounded-xl border border-border p-4 text-center">
        <div className="text-2xl text-foreground">{emailAdminCount}</div>
        <p className="text-[10px] text-muted-foreground mt-0.5">Email admin</p>
      </div>
      <div className="bg-card rounded-xl border border-border p-4 text-center">
        <div className={cn("text-2xl", urgentCount > 0 ? "text-primary" : "text-foreground")}>
          {urgentCount}
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">Marked urgent</p>
      </div>
    </div>
  );
}

// ── Main Export ──

interface NotificationRulesConfigProps {
  rules?: Record<string, NotificationRule>;
  digest?: DigestSettings;
  onRulesChange?: (rules: Record<string, NotificationRule>) => void;
  onDigestChange?: (digest: DigestSettings) => void;
  onSave?: () => void;
  isSaving?: boolean;
}

export function NotificationRulesConfig({
  rules: externalRules,
  digest: externalDigest,
  onRulesChange,
  onDigestChange,
  onSave,
  isSaving,
}: NotificationRulesConfigProps) {
  const [rules, setRules] = useState<Record<string, NotificationRule>>(
    externalRules || { ...DEFAULT_RULES }
  );
  const [digest, setDigest] = useState<DigestSettings>(
    externalDigest || { ...DEFAULT_DIGEST }
  );

  const updateRule = (categoryId: string, rule: NotificationRule) => {
    const next = { ...rules, [categoryId]: rule };
    setRules(next);
    onRulesChange?.(next);
  };

  const updateDigest = (d: DigestSettings) => {
    setDigest(d);
    onDigestChange?.(d);
  };

  const resetToDefaults = () => {
    setRules({ ...DEFAULT_RULES });
    setDigest({ ...DEFAULT_DIGEST });
    onRulesChange?.({ ...DEFAULT_RULES });
    onDigestChange?.({ ...DEFAULT_DIGEST });
    toast.success('Reset to default notification rules');
  };

  return (
    <div className="space-y-6">
      {/* Info banner */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm text-foreground">Change Notification Rules</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Configure which changes trigger email notifications, who receives them, and who can see
              each category in the Change Log. The event Host always receives all notifications and
              has full Change Log visibility. Changes marked <strong>Urgent</strong> bypass digest
              settings and send immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <RulesSummary rules={rules} />

      {/* Category cards */}
      <div className="space-y-3">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            rule={rules[category.id]}
            onUpdate={(rule) => updateRule(category.id, rule)}
          />
        ))}
      </div>

      {/* Digest settings */}
      <DigestSettingsCard settings={digest} onUpdate={updateDigest} />

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          className="text-muted-foreground border-border h-9"
          onClick={resetToDefaults}
        >
          <RotateCcw className="size-3.5 mr-2" />
          Reset to Defaults
        </Button>
        {onSave && (
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-white min-w-[100px]"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </div>
    </div>
  );
}