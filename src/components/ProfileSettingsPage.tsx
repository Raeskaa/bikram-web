import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Briefcase,
  CheckCircle2,
  Eye,
  KeyRound,
  Link2,
  Search,
  Shield,
  Sparkles,
  User,
  Wallet,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { cn } from './ui/utils';

type AccountSection = 'settings' | 'authentication' | 'billing' | 'api-tokens' | 'active-sessions';
type ProfileSection = 'profile-basics' | 'professional-identity' | 'visibility';
type SettingsSection = ProfileSection | AccountSection;

interface ProfileSettingsPageProps {
  currentUser?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onBack?: () => void;
  initialSection?: AccountSection;
}

type GlobalProfileForm = {
  fullName: string;
  preferredName: string;
  headline: string;
  bio: string;
  location: string;
  website: string;
  role: string;
  company: string;
  industry: string;
  expertise: string;
  skills: string;
  experience: string;
  education: string;
  featuredLinks: string;
  profileVisibility: string;
  showCompany: boolean;
  showLocation: boolean;
  showSocialLinks: boolean;
  searchDiscoverability: boolean;
  recommendationSignals: boolean;
};

type AccountForm = {
  language: string;
  region: string;
  timezone: string;
  theme: string;
  startPage: string;
  email: string;
  passwordState: string;
  twoFactor: boolean;
  passkeys: string;
  securityAlerts: boolean;
  plan: string;
  paymentMethod: string;
  billingEmail: string;
  renewalDate: string;
  invoiceDelivery: string;
  googleConnected: boolean;
  linkedInConnected: boolean;
  microsoftConnected: boolean;
  githubConnected: boolean;
  activeSessionLabel: string;
  activeSessionDevice: string;
  trustedDevices: string;
  sessionPolicy: string;
};

const profileNav = [
  { id: 'profile-basics' as const, label: 'Profile Basics', icon: User },
  { id: 'professional-identity' as const, label: 'Professional Identity', icon: Briefcase },
  { id: 'visibility' as const, label: 'Visibility', icon: Eye },
];

const accountNav = [
  { id: 'settings' as const, label: 'Preferences', icon: Bell },
  { id: 'authentication' as const, label: 'Authentication', icon: Shield },
  { id: 'billing' as const, label: 'Billing', icon: Wallet },
  { id: 'api-tokens' as const, label: 'Connected Accounts', icon: Link2 },
  { id: 'active-sessions' as const, label: 'Active Sessions', icon: KeyRound },
];

function mapInitialSection(initialSection: AccountSection): SettingsSection {
  if (initialSection === 'settings') return 'profile-basics';
  return initialSection;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5">
        <div className="text-base font-semibold text-foreground">{title}</div>
        {description ? <div className="mt-1 text-sm text-muted-foreground">{description}</div> : null}
      </div>
      {children}
    </section>
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

const regionOptions = [
  { value: 'india', label: 'India' },
  { value: 'united-states', label: 'United States' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'united-kingdom', label: 'United Kingdom' },
];

const timezoneOptions = [
  { value: 'gmt-5-30', label: 'GMT+5:30' },
  { value: 'utc', label: 'UTC' },
  { value: 'pst', label: 'Pacific Time' },
  { value: 'est', label: 'Eastern Time' },
];

const startPageOptions = [
  { value: 'engagement-feed', label: 'Engagement feed' },
  { value: 'home-overview', label: 'Home overview' },
  { value: 'events', label: 'Events' },
  { value: 'communities', label: 'Communities' },
];

const visibilityOptions = [
  { value: 'members-only', label: 'LeapSpace members only' },
  { value: 'connections-only', label: 'Connections only' },
  { value: 'public', label: 'Public profile' },
];

export function ProfileSettingsPage({ currentUser, onBack, initialSection = 'settings' }: ProfileSettingsPageProps) {
  const [section, setSection] = useState<SettingsSection>(mapInitialSection(initialSection));
  const userName = currentUser?.name || 'Google User';
  const email = currentUser?.email || 'user@google.com';

  const initialProfileForm = useMemo<GlobalProfileForm>(() => ({
    fullName: userName,
    preferredName: 'Google',
    headline: 'AI systems operator building high-signal communities',
    bio: 'I design, operate, and grow community-led learning systems for professionals.',
    location: 'Bengaluru, India',
    website: 'https://trueleap.io/rae',
    role: 'Community Systems Designer',
    company: 'TrueLeap',
    industry: 'Professional learning and creator tools',
    expertise: 'Community design, event systems, growth operations',
    skills: 'Growth strategy, GTM, event operations, mentoring',
    experience: '3 roles added across community, learning, and growth functions.',
    education: '2 entries added with design and systems focus.',
    featuredLinks: 'LinkedIn, portfolio, case studies',
    profileVisibility: 'members-only',
    showCompany: true,
    showLocation: false,
    showSocialLinks: true,
    searchDiscoverability: true,
    recommendationSignals: true,
  }), [userName]);

  const initialAccountForm = useMemo<AccountForm>(() => ({
    language: 'English',
    region: 'india',
    timezone: 'gmt-5-30',
    theme: 'light',
    startPage: 'engagement-feed',
    email,
    passwordState: 'Updated 41 days ago',
    twoFactor: true,
    passkeys: '1 registered device',
    securityAlerts: true,
    plan: 'Business plan billed monthly',
    paymentMethod: 'Visa ending in 4242',
    billingEmail: email,
    renewalDate: 'April 28, 2026',
    invoiceDelivery: 'Monthly summary to finance and account owner',
    googleConnected: true,
    linkedInConnected: true,
    microsoftConnected: false,
    githubConnected: false,
    activeSessionLabel: 'Chrome on Mac',
    activeSessionDevice: 'San Francisco, CA • Active now',
    trustedDevices: '3 devices marked trusted',
    sessionPolicy: 'Challenge sign-in when device or region changes',
  }), [email]);

  const [profileForm, setProfileForm] = useState<GlobalProfileForm>(initialProfileForm);
  const [accountForm, setAccountForm] = useState<AccountForm>(initialAccountForm);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSection(mapInitialSection(initialSection));
  }, [initialSection]);

  useEffect(() => {
    setProfileForm(initialProfileForm);
  }, [initialProfileForm]);

  useEffect(() => {
    setAccountForm(initialAccountForm);
  }, [initialAccountForm]);

  const showingProfileSection = section === 'profile-basics' || section === 'professional-identity' || section === 'visibility';
  const query = searchQuery.trim().toLowerCase();
  const filteredProfileNav = profileNav.filter(item => item.label.toLowerCase().includes(query));
  const filteredAccountNav = accountNav.filter(item => item.label.toLowerCase().includes(query));
  const profileDirty = JSON.stringify(profileForm) !== JSON.stringify(initialProfileForm);
  const accountDirty = JSON.stringify(accountForm) !== JSON.stringify(initialAccountForm);
  const pageDirty = showingProfileSection ? profileDirty : accountDirty;
  const headerMeta = showingProfileSection
    ? `Completion 86% • Default reach Members only • ${pageDirty ? 'Draft state Unsaved changes' : 'Draft state All changes saved'}`
    : `Completion 92% • Security 2FA on • ${pageDirty ? 'Draft state Unsaved changes' : 'Draft state All changes saved'}`;

  const handleProfileReset = () => {
    setProfileForm(initialProfileForm);
    toast.success('My Profile reset', { description: 'Unsaved profile edits were discarded.' });
  };

  const handleAccountReset = () => {
    setAccountForm(initialAccountForm);
    toast.success('My Account reset', { description: 'Unsaved account edits were discarded.' });
  };

  const handleProfileSave = () => {
    toast.success('My Profile updated', { description: 'Global professional identity changes are saved.' });
  };

  const handleAccountSave = () => {
    toast.success('My Account updated', { description: 'Preferences, security, and billing changes are saved.' });
  };

  const updateProfile = <K extends keyof GlobalProfileForm,>(key: K, value: GlobalProfileForm[K]) => {
    setProfileForm(prev => ({ ...prev, [key]: value }));
  };

  const updateAccount = <K extends keyof AccountForm,>(key: K, value: AccountForm[K]) => {
    setAccountForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-80 border-r border-border bg-card flex-shrink-0 flex flex-col h-full">
        <div className="p-5 border-b border-border">
          <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80">
            <ArrowLeft className="size-4" />
            Back
          </button>

          <div className="rounded-2xl border border-border bg-muted/40 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                {getInitials(userName)}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-lg font-semibold text-foreground">Account Center</h1>
                <p className="mt-1 text-sm text-muted-foreground">Editable global profile and account controls.</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-card p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Profile</div>
                <div className="mt-1 text-sm text-foreground">Global identity</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Account</div>
                <div className="mt-1 text-sm text-foreground">Security, billing, prefs</div>
              </div>
            </div>
          </div>

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search profile or account"
              className="h-11 rounded-xl border-border bg-muted pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-5">
            {filteredProfileNav.length > 0 ? (
              <div>
                <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">My Profile</div>
                <div className="space-y-1">
                  {filteredProfileNav.map(item => {
                    const Icon = item.icon;
                    const active = section === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSection(item.id)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors',
                          active ? 'bg-sidebar-accent text-foreground border border-border shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent',
                        )}
                      >
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {filteredAccountNav.length > 0 ? (
              <div>
                <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">My Account</div>
                <div className="space-y-1">
                  {filteredAccountNav.map(item => {
                    const Icon = item.icon;
                    const active = section === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSection(item.id)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors',
                          active ? 'bg-sidebar-accent text-foreground border border-border shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent',
                        )}
                      >
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-6xl p-6 pb-28">
            <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles className="size-3.5" />
                  {showingProfileSection ? 'Global profile' : 'Internal account controls'}
                </div>
                <h2 className="text-3xl font-semibold text-foreground">{showingProfileSection ? 'My Profile' : 'My Account'}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {showingProfileSection
                    ? 'This is your default professional identity across LeapSpace. Space-specific profiles can override presentation and privacy without changing this base profile.'
                    : `${email} is the account owner. Use this area for preferences, sign-in, billing, linked providers, and device control.`}
                </p>
              </div>

              <div className="max-w-md text-sm leading-6 text-muted-foreground lg:text-right">
                {headerMeta}
              </div>
            </div>

            {section === 'profile-basics' ? (
              <div className="space-y-5">
                <SectionCard title="Profile Basics" description="These are the default identity fields LeapSpaces inherit from unless a scoped profile overrides them.">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Full name">
                      <Input value={profileForm.fullName} onChange={event => updateProfile('fullName', event.target.value)} />
                    </Field>
                    <Field label="Preferred name">
                      <Input value={profileForm.preferredName} onChange={event => updateProfile('preferredName', event.target.value)} />
                    </Field>
                    <Field label="Professional headline" hint="Shows in profile headers, discovery cards, and member matching.">
                      <Input value={profileForm.headline} onChange={event => updateProfile('headline', event.target.value)} />
                    </Field>
                    <Field label="Primary location">
                      <Input value={profileForm.location} onChange={event => updateProfile('location', event.target.value)} />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Short bio" hint="Keep this portable. LeapSpace-specific context belongs in the LeapSpace Profile.">
                        <Textarea value={profileForm.bio} onChange={event => updateProfile('bio', event.target.value)} className="min-h-28" />
                      </Field>
                    </div>
                    <Field label="Personal website">
                      <Input value={profileForm.website} onChange={event => updateProfile('website', event.target.value)} />
                    </Field>
                    <Field label="Profile assets" hint="Avatar and banner stay global by default and can be overridden inside a LeapSpace.">
                      <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl border-border">Change avatar</Button>
                        <Button variant="outline" className="rounded-xl border-border">Change banner</Button>
                      </div>
                    </Field>
                  </div>
                </SectionCard>

                <SectionCard title="How this works" description="Keep the split explicit so users understand where to edit what.">
                  <div className="grid gap-4 lg:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-muted/40 p-4">
                      <div className="text-sm font-semibold text-foreground">My Profile</div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">Professional identity shared across LeapSpaces by default.</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-muted/40 p-4">
                      <div className="text-sm font-semibold text-foreground">My Account</div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">Technical controls like sign-in, billing, sessions, and preferences.</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-muted/40 p-4">
                      <div className="text-sm font-semibold text-foreground">LeapSpace Profile</div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">Scoped override layer for name, bio, visibility, anonymity, and message access.</p>
                    </div>
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {section === 'professional-identity' ? (
              <div className="space-y-5">
                <SectionCard title="Professional Identity" description="Use richer fields here so the profile feels complete in discovery, trust, and matching surfaces.">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Current role / title">
                      <Input value={profileForm.role} onChange={event => updateProfile('role', event.target.value)} />
                    </Field>
                    <Field label="Company / organization">
                      <Input value={profileForm.company} onChange={event => updateProfile('company', event.target.value)} />
                    </Field>
                    <Field label="Industry">
                      <Input value={profileForm.industry} onChange={event => updateProfile('industry', event.target.value)} />
                    </Field>
                    <Field label="Primary expertise">
                      <Input value={profileForm.expertise} onChange={event => updateProfile('expertise', event.target.value)} />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Skills and strengths" hint="Comma-separated works fine for this prototype.">
                        <Textarea value={profileForm.skills} onChange={event => updateProfile('skills', event.target.value)} className="min-h-24" />
                      </Field>
                    </div>
                    <div className="md:col-span-2">
                      <Field label="Work experience summary">
                        <Textarea value={profileForm.experience} onChange={event => updateProfile('experience', event.target.value)} className="min-h-24" />
                      </Field>
                    </div>
                    <Field label="Education summary">
                      <Textarea value={profileForm.education} onChange={event => updateProfile('education', event.target.value)} className="min-h-24" />
                    </Field>
                    <Field label="Featured links">
                      <Textarea value={profileForm.featuredLinks} onChange={event => updateProfile('featuredLinks', event.target.value)} className="min-h-24" />
                    </Field>
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {section === 'visibility' ? (
              <div className="space-y-5">
                <SectionCard title="Global Visibility" description="These are global defaults only. Scoped privacy and anonymity still belong to each LeapSpace Profile.">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="space-y-4">
                      <Field label="Profile visibility">
                        <Select value={profileForm.profileVisibility} onValueChange={value => updateProfile('profileVisibility', value)}>
                          <SelectTrigger className="h-11 rounded-xl border-border bg-input-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {visibilityOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>

                      <ToggleField
                        label="Show company on global profile"
                        description="Useful for trust and professional context, but this is still a global default."
                        checked={profileForm.showCompany}
                        onCheckedChange={checked => updateProfile('showCompany', checked)}
                      />
                      <ToggleField
                        label="Show location on global profile"
                        description="Keep this off if you want scoped spaces to decide when location is relevant."
                        checked={profileForm.showLocation}
                        onCheckedChange={checked => updateProfile('showLocation', checked)}
                      />
                      <ToggleField
                        label="Show social links"
                        description="Controls whether linked websites and profiles appear publicly on the global profile."
                        checked={profileForm.showSocialLinks}
                        onCheckedChange={checked => updateProfile('showSocialLinks', checked)}
                      />
                      <ToggleField
                        label="Allow member search discovery"
                        description="Makes the global profile searchable for matching, mentoring, and member directory flows."
                        checked={profileForm.searchDiscoverability}
                        onCheckedChange={checked => updateProfile('searchDiscoverability', checked)}
                      />
                      <ToggleField
                        label="Use profile for recommendations"
                        description="Feeds matching, mentoring, and collaboration suggestions using your global defaults."
                        checked={profileForm.recommendationSignals}
                        onCheckedChange={checked => updateProfile('recommendationSignals', checked)}
                      />
                    </div>

                    <div className="rounded-2xl border border-border bg-muted/40 p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <CheckCircle2 className="size-4 text-primary" />
                        What stays out of My Profile
                      </div>
                      <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                        <p>Billing, invoices, payment methods, sessions, passwords, and provider connections remain in My Account.</p>
                        <p>Anonymity rules do not belong here either. They are handled inside each LeapSpace Profile so privacy stays scoped.</p>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {section === 'settings' ? (
              <div className="space-y-5">
                <SectionCard title="Preferences" description="These affect the account experience, not the public profile.">
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <Field label="Language">
                      <Input value={accountForm.language} onChange={event => updateAccount('language', event.target.value)} />
                    </Field>
                    <Field label="Region">
                      <Select value={accountForm.region} onValueChange={value => updateAccount('region', value)}>
                        <SelectTrigger className="h-11 rounded-xl border-border bg-input-background"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {regionOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Timezone">
                      <Select value={accountForm.timezone} onValueChange={value => updateAccount('timezone', value)}>
                        <SelectTrigger className="h-11 rounded-xl border-border bg-input-background"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {timezoneOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <Field label="Theme preference">
                      <Tabs value={accountForm.theme} onValueChange={value => updateAccount('theme', value)} className="w-full">
                        <TabsList className="h-11 w-full rounded-xl bg-muted p-1">
                          <TabsTrigger value="light" className="rounded-lg">Light</TabsTrigger>
                          <TabsTrigger value="system" className="rounded-lg">System</TabsTrigger>
                          <TabsTrigger value="dark" className="rounded-lg">Dark</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </Field>
                    <Field label="Default start page">
                      <Select value={accountForm.startPage} onValueChange={value => updateAccount('startPage', value)}>
                        <SelectTrigger className="h-11 rounded-xl border-border bg-input-background"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {startPageOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {section === 'authentication' ? (
              <div className="space-y-5">
                <SectionCard title="Authentication and Security" description="This needs to feel operational, not just descriptive.">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Account email">
                      <Input value={accountForm.email} onChange={event => updateAccount('email', event.target.value)} />
                    </Field>
                    <Field label="Password state">
                      <Input value={accountForm.passwordState} onChange={event => updateAccount('passwordState', event.target.value)} />
                    </Field>
                    <Field label="Passkeys">
                      <Input value={accountForm.passkeys} onChange={event => updateAccount('passkeys', event.target.value)} />
                    </Field>
                    <Field label="Session challenge policy">
                      <Input value={accountForm.sessionPolicy} onChange={event => updateAccount('sessionPolicy', event.target.value)} />
                    </Field>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <ToggleField
                      label="Two-factor authentication"
                      description="Require a second factor for sign-in and sensitive account actions."
                      checked={accountForm.twoFactor}
                      onCheckedChange={checked => updateAccount('twoFactor', checked)}
                    />
                    <ToggleField
                      label="Security alerts"
                      description="Send alerts for new devices, unusual login attempts, and account recovery events."
                      checked={accountForm.securityAlerts}
                      onCheckedChange={checked => updateAccount('securityAlerts', checked)}
                    />
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {section === 'billing' ? (
              <div className="space-y-5">
                <SectionCard title="Billing and Subscription" description="Billing belongs here so it never gets mixed into the profile experience.">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Current plan">
                      <Input value={accountForm.plan} onChange={event => updateAccount('plan', event.target.value)} />
                    </Field>
                    <Field label="Payment method">
                      <Input value={accountForm.paymentMethod} onChange={event => updateAccount('paymentMethod', event.target.value)} />
                    </Field>
                    <Field label="Billing email">
                      <Input value={accountForm.billingEmail} onChange={event => updateAccount('billingEmail', event.target.value)} />
                    </Field>
                    <Field label="Renewal date">
                      <Input value={accountForm.renewalDate} onChange={event => updateAccount('renewalDate', event.target.value)} />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Invoice delivery">
                        <Textarea value={accountForm.invoiceDelivery} onChange={event => updateAccount('invoiceDelivery', event.target.value)} className="min-h-24" />
                      </Field>
                    </div>
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {section === 'api-tokens' ? (
              <div className="space-y-5">
                <SectionCard title="Connected Accounts" description="Real connection state makes this page feel finished even in prototype form.">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <ToggleField
                      label="Google"
                      description="Primary sign-in provider and recovery path."
                      checked={accountForm.googleConnected}
                      onCheckedChange={checked => updateAccount('googleConnected', checked)}
                    />
                    <ToggleField
                      label="LinkedIn"
                      description="Used for profile import and professional proof signals."
                      checked={accountForm.linkedInConnected}
                      onCheckedChange={checked => updateAccount('linkedInConnected', checked)}
                    />
                    <ToggleField
                      label="Microsoft"
                      description="Optional work account connection for organization users."
                      checked={accountForm.microsoftConnected}
                      onCheckedChange={checked => updateAccount('microsoftConnected', checked)}
                    />
                    <ToggleField
                      label="GitHub"
                      description="Optional developer identity connection and import source."
                      checked={accountForm.githubConnected}
                      onCheckedChange={checked => updateAccount('githubConnected', checked)}
                    />
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {section === 'active-sessions' ? (
              <div className="space-y-5">
                <SectionCard title="Active Sessions" description="Let this area feel actionable instead of like a static list.">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Current session label">
                      <Input value={accountForm.activeSessionLabel} onChange={event => updateAccount('activeSessionLabel', event.target.value)} />
                    </Field>
                    <Field label="Current session details">
                      <Input value={accountForm.activeSessionDevice} onChange={event => updateAccount('activeSessionDevice', event.target.value)} />
                    </Field>
                    <Field label="Trusted devices summary">
                      <Input value={accountForm.trustedDevices} onChange={event => updateAccount('trustedDevices', event.target.value)} />
                    </Field>
                    <Field label="Session control">
                      <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl border-border">Review devices</Button>
                        <Button variant="outline" className="rounded-xl border-border">Revoke other sessions</Button>
                      </div>
                    </Field>
                  </div>
                </SectionCard>
              </div>
            ) : null}
          </div>
        </ScrollArea>

        <div className="border-t border-border bg-card/95 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-foreground">{pageDirty ? 'You have unsaved changes' : 'All changes saved'}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {showingProfileSection
                  ? 'Saving here updates your global default profile only.'
                  : 'Saving here updates only account-level controls.'}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-xl border-border"
                onClick={showingProfileSection ? handleProfileReset : handleAccountReset}
                disabled={!pageDirty}
              >
                Discard changes
              </Button>
              <Button className="rounded-xl" onClick={showingProfileSection ? handleProfileSave : handleAccountSave}>
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
