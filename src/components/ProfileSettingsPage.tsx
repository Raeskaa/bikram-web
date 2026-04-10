import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Briefcase,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  CreditCard,
  Eye,
  EyeOff,
  Globe,
  Image,
  KeyRound,
  Link2,
  Lock,
  LogOut,
  Monitor,
  Plus,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  Trash2,
  User,
  UserX,
  Wallet,
  X,
  Zap,
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
import { Badge } from './ui/badge';
import { cn } from './ui/utils';
import { TwoFactorSetup } from './settings/TwoFactorSetup';
import {
  CREDIT_PACKAGES,
  MOCK_CREDIT_DATA,
  dollarsToCredits,
  formatCredits,
  CREDITS_PER_DOLLAR,
} from './CreditSystem';

type AccountSection = 'settings' | 'authentication' | 'billing' | 'credits' | 'api-tokens' | 'active-sessions';
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
  skills: string[];
  experience: string;
  education: string;
  featuredLinks: Array<{ label: string; url: string }>;
  isAnonymous: boolean;
  discoverabilityMode: 'public' | 'anonymous-searchable' | 'anonymous-hidden';
  showCompany: boolean;
  showLocation: boolean;
  showSocialLinks: boolean;
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
  passkeys: Array<{ id: string; name: string; createdAt: string; lastUsed: string }>;
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
  sessions: Array<{
    id: string;
    label: string;
    device: string;
    location: string;
    lastActive: string;
    current: boolean;
  }>;
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
  { id: 'credits' as const, label: 'Credits', icon: Coins },
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
    <section className="rounded-xl border border-border bg-card p-6">
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
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/40 p-4">
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

// Mock credit history
const MOCK_CREDIT_HISTORY = [
  { id: '1', type: 'purchase' as const, description: 'Pro Pack purchased', amount: 5000, date: '2026-04-06', status: 'completed' as const },
  { id: '2', type: 'spend' as const, description: 'Event registration: AI Summit 2026', amount: -360, date: '2026-04-05', status: 'completed' as const },
  { id: '3', type: 'spend' as const, description: 'Course enrollment: Advanced React', amount: -180, date: '2026-04-03', status: 'completed' as const },
  { id: '4', type: 'earn' as const, description: 'Referral bonus: Invited 3 members', amount: 150, date: '2026-04-02', status: 'completed' as const },
  { id: '5', type: 'spend' as const, description: 'Event registration: Design Sprint', amount: -240, date: '2026-03-28', status: 'completed' as const },
  { id: '6', type: 'purchase' as const, description: 'Standard Pack purchased', amount: 1500, date: '2026-03-20', status: 'completed' as const },
  { id: '7', type: 'spend' as const, description: 'AI Assistant usage (March)', amount: -420, date: '2026-03-15', status: 'completed' as const },
  { id: '8', type: 'hold' as const, description: 'Pending: Workshop registration', amount: -360, date: '2026-04-07', status: 'pending' as const },
];

export function ProfileSettingsPage({ currentUser, onBack, initialSection = 'settings' }: ProfileSettingsPageProps) {
  const [section, setSection] = useState<SettingsSection>(mapInitialSection(initialSection));
  const userName = currentUser?.name || 'Google User';
  const email = currentUser?.email || 'user@google.com';
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [selectedCreditPack, setSelectedCreditPack] = useState<string>('pro');
  const [creditBalance, setCreditBalance] = useState(MOCK_CREDIT_DATA.totalCredits);

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
    skills: ['Growth strategy', 'GTM', 'Event operations', 'Mentoring', 'Community design'],
    experience: '3 roles added across community, learning, and growth functions.',
    education: '2 entries added with design and systems focus.',
    featuredLinks: [
      { label: 'LinkedIn', url: 'https://linkedin.com/in/example' },
      { label: 'Portfolio', url: 'https://portfolio.example.com' },
      { label: 'Case Studies', url: 'https://trueleap.io/cases' },
    ],
    isAnonymous: false,
    discoverabilityMode: 'public',
    showCompany: true,
    showLocation: false,
    showSocialLinks: true,
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
    passkeys: [
      { id: 'pk1', name: 'MacBook Pro Touch ID', createdAt: '2026-02-15', lastUsed: '2026-04-08' },
      { id: 'pk2', name: 'iPhone Face ID', createdAt: '2026-03-01', lastUsed: '2026-04-07' },
    ],
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
    sessions: [
      { id: 's1', label: 'Chrome on Mac', device: 'MacBook Pro', location: 'Bengaluru, India', lastActive: 'Active now', current: true },
      { id: 's2', label: 'Safari on iPhone', device: 'iPhone 15 Pro', location: 'Bengaluru, India', lastActive: '2 hours ago', current: false },
      { id: 's3', label: 'Firefox on Windows', device: 'Dell XPS 15', location: 'San Francisco, CA', lastActive: '3 days ago', current: false },
    ],
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

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !profileForm.skills.includes(trimmed)) {
      updateProfile('skills', [...profileForm.skills, trimmed]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    updateProfile('skills', profileForm.skills.filter(s => s !== skill));
  };

  const addFeaturedLink = () => {
    if (newLinkLabel.trim() && newLinkUrl.trim()) {
      updateProfile('featuredLinks', [...profileForm.featuredLinks, { label: newLinkLabel.trim(), url: newLinkUrl.trim() }]);
      setNewLinkLabel('');
      setNewLinkUrl('');
    }
  };

  const removeFeaturedLink = (index: number) => {
    updateProfile('featuredLinks', profileForm.featuredLinks.filter((_, i) => i !== index));
  };

  const revokeSession = (sessionId: string) => {
    updateAccount('sessions', accountForm.sessions.filter(s => s.id !== sessionId));
    toast.success('Session revoked', { description: 'The device has been signed out.' });
  };

  const removePasskey = (passkeyId: string) => {
    updateAccount('passkeys', accountForm.passkeys.filter(p => p.id !== passkeyId));
    toast.success('Passkey removed', { description: 'The passkey has been deleted.' });
  };

  const handleBuyCredits = (credits: number) => {
    setCreditBalance(prev => prev + credits);
    toast.success('Credits purchased', { description: `${credits.toLocaleString()} credits added to your balance.` });
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card flex-shrink-0 flex flex-col h-full">
        <div className="p-5 border-b border-border">
          <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80">
            <ArrowLeft className="size-4" />
            Back
          </button>

          <div className="mb-3">
            <h1 className="text-lg font-semibold text-foreground">{userName || 'My Settings'}</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">Profile &amp; account settings</p>
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
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                          active ? 'bg-sidebar-accent text-foreground border border-border' : 'text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent',
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
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                          active ? 'bg-sidebar-accent text-foreground border border-border' : 'text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent',
                        )}
                      >
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                        {item.id === 'credits' ? (
                          <Badge variant="secondary" className="ml-auto rounded-lg border border-border bg-primary/10 text-primary text-[10px] px-2 shadow-none">
                            {formatCredits(creditBalance)}
                          </Badge>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="mx-auto max-w-6xl p-6 pb-28">
            {/* Breadcrumb */}
            <div className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>Settings</span>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-foreground">{[...profileNav, ...accountNav].find(s => s.id === section)?.label || 'Settings'}</span>
            </div>

            {/* ─── Profile Basics ─── */}
            {section === 'profile-basics' ? (
              <div className="space-y-5">
                <SectionCard title="Profile Basics" description="These are the default identity fields LeapSpaces inherit from unless a scoped profile overrides them.">
                  {/* Avatar & Banner with Anonymous Toggle */}
                  <div className="mb-6 rounded-lg border border-border bg-muted/40 overflow-hidden">
                    <div className="relative h-28 bg-gradient-to-br from-primary/30 via-primary/15 to-muted">
                      <Button variant="outline" size="sm" className="absolute bottom-3 right-3 rounded-lg border-border bg-card/80 backdrop-blur text-xs gap-1.5">
                        <Image className="size-3.5" />
                        Change banner
                      </Button>
                    </div>
                    <div className="px-5 pb-5">
                      <div className="-mt-10 flex items-end justify-between gap-4">
                        <div className="flex items-end gap-4">
                          <div className="relative">
                            {profileForm.isAnonymous ? (
                              <div className="flex size-20 items-center justify-center rounded-full border-4 border-card bg-muted text-muted-foreground">
                                <UserX className="size-8" />
                              </div>
                            ) : (
                              <div className="flex size-20 items-center justify-center rounded-full border-4 border-card bg-primary text-xl font-semibold text-primary-foreground">
                                {getInitials(profileForm.fullName)}
                              </div>
                            )}
                            {!profileForm.isAnonymous && (
                              <button className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-card bg-foreground text-background hover:bg-foreground/90">
                                <Camera className="size-3.5" />
                              </button>
                            )}
                          </div>
                          <div className="pb-1">
                            <div className="text-base font-semibold text-foreground">
                              {profileForm.isAnonymous ? 'Anonymous User' : profileForm.fullName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {profileForm.isAnonymous ? 'Your identity is hidden from other members' : (profileForm.headline || 'Add a professional headline')}
                            </div>
                          </div>
                        </div>

                        {/* Anonymous Toggle */}
                        <div className="flex-shrink-0 pb-1">
                          <button
                            onClick={() => updateProfile('isAnonymous', !profileForm.isAnonymous)}
                            className={cn(
                              'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                              profileForm.isAnonymous
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground',
                            )}
                          >
                            {profileForm.isAnonymous ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            {profileForm.isAnonymous ? 'Anonymous' : 'Go Anonymous'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Full name" hint="Maps to GET/PUT /api/profile -> name. Supported now.">
                      <Input value={profileForm.fullName} onChange={event => updateProfile('fullName', event.target.value)} />
                    </Field>
                    <Field label="Preferred name" hint="Future API: add preferredName to /api/profile.">
                      <Input value={profileForm.preferredName} onChange={event => updateProfile('preferredName', event.target.value)} />
                    </Field>
                    <Field label="Professional headline" hint="Shows in profile headers, discovery cards, and member matching. Future API: add headline.">
                      <Input value={profileForm.headline} onChange={event => updateProfile('headline', event.target.value)} />
                    </Field>
                    <Field label="Primary location" hint="Future API: add location to /api/profile.">
                      <Input value={profileForm.location} onChange={event => updateProfile('location', event.target.value)} />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Short bio" hint="Maps to GET/PUT /api/profile -> bio. Supported now.">
                        <Textarea value={profileForm.bio} onChange={event => updateProfile('bio', event.target.value)} className="min-h-28" maxLength={400} />
                        <div className="mt-1 flex justify-end">
                          <span className={cn('text-xs', profileForm.bio.length > 350 ? 'text-destructive' : 'text-muted-foreground')}>
                            {profileForm.bio.length}/400
                          </span>
                        </div>
                      </Field>
                    </div>
                    <Field label="Personal website" hint="Future API: add websiteUrl. URL validation needed.">
                      <Input value={profileForm.website} onChange={event => updateProfile('website', event.target.value)} type="url" placeholder="https://" />
                    </Field>
                  </div>
                </SectionCard>

                <SectionCard title="How this works" description="Keep the split explicit so users understand where to edit what.">
                  <div className="grid gap-4 lg:grid-cols-3">
                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                      <div className="text-sm font-semibold text-foreground">My Profile</div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">Professional identity shared across LeapSpaces by default.</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                      <div className="text-sm font-semibold text-foreground">My Account</div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">Technical controls like sign-in, billing, sessions, and preferences.</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                      <div className="text-sm font-semibold text-foreground">LeapSpace Profile</div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">Scoped override layer for name, bio, visibility, anonymity, and message access.</p>
                    </div>
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {/* ─── Professional Identity ─── */}
            {section === 'professional-identity' ? (
              <div className="space-y-5">
                <SectionCard title="Professional Identity" description="Use richer fields here so the profile feels complete in discovery, trust, and matching surfaces.">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Current role / title" hint="Future API: add professionalTitle (distinct from app role).">
                      <Input value={profileForm.role} onChange={event => updateProfile('role', event.target.value)} />
                    </Field>
                    <Field label="Company / organization" hint="Future API: add company.">
                      <Input value={profileForm.company} onChange={event => updateProfile('company', event.target.value)} />
                    </Field>
                    <Field label="Industry" hint="Future API: add industry.">
                      <Input value={profileForm.industry} onChange={event => updateProfile('industry', event.target.value)} />
                    </Field>
                    <Field label="Primary expertise" hint="Future API: add expertisePrimary.">
                      <Input value={profileForm.expertise} onChange={event => updateProfile('expertise', event.target.value)} />
                    </Field>

                    {/* Skills as tags */}
                    <div className="md:col-span-2">
                      <Field label="Skills and strengths" hint="Future API: add skills[] array. Click to remove.">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {profileForm.skills.map(skill => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="rounded-lg border border-border bg-muted text-foreground text-sm px-3 py-1.5 cursor-pointer hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors gap-1.5"
                              onClick={() => removeSkill(skill)}
                            >
                              {skill}
                              <X className="size-3" />
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={newSkill}
                            onChange={event => setNewSkill(event.target.value)}
                            placeholder="Add a skill..."
                            className="flex-1"
                            onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); addSkill(); } }}
                          />
                          <Button variant="outline" className="rounded-lg border-border" onClick={addSkill} disabled={!newSkill.trim()}>
                            <Plus className="size-4" />
                          </Button>
                        </div>
                      </Field>
                    </div>

                    <div className="md:col-span-2">
                      <Field label="Work experience summary" hint="Future: experienceEntries[] for structured entries.">
                        <Textarea value={profileForm.experience} onChange={event => updateProfile('experience', event.target.value)} className="min-h-24" />
                      </Field>
                    </div>
                    <div className="md:col-span-2">
                      <Field label="Education summary" hint="Future: educationEntries[] for structured entries.">
                        <Textarea value={profileForm.education} onChange={event => updateProfile('education', event.target.value)} className="min-h-24" />
                      </Field>
                    </div>

                    {/* Featured links as structured entries */}
                    <div className="md:col-span-2">
                      <Field label="Featured links" hint="Future API: featuredLinks[] array of {label, url}.">
                        <div className="space-y-2 mb-3">
                          {profileForm.featuredLinks.map((link, idx) => (
                            <div key={idx} className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-4 py-2.5">
                              <Globe className="size-4 text-muted-foreground flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium text-foreground">{link.label}</span>
                                <span className="mx-2 text-muted-foreground">·</span>
                                <span className="text-sm text-muted-foreground truncate">{link.url}</span>
                              </div>
                              <button onClick={() => removeFeaturedLink(idx)} className="text-muted-foreground hover:text-destructive">
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={newLinkLabel}
                            onChange={event => setNewLinkLabel(event.target.value)}
                            placeholder="Label"
                            className="w-32"
                          />
                          <Input
                            value={newLinkUrl}
                            onChange={event => setNewLinkUrl(event.target.value)}
                            placeholder="https://..."
                            className="flex-1"
                            onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); addFeaturedLink(); } }}
                          />
                          <Button variant="outline" className="rounded-lg border-border" onClick={addFeaturedLink} disabled={!newLinkLabel.trim() || !newLinkUrl.trim()}>
                            <Plus className="size-4" />
                          </Button>
                        </div>
                      </Field>
                    </div>
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {/* ─── Visibility ─── */}
            {section === 'visibility' ? (
              <div className="space-y-5">
                <SectionCard title="Profile Discoverability" description="Control how others see and find you across LeapSpace. These are global defaults -- individual LeapSpaces can override them.">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="space-y-4">
                      {/* 3-State Discoverability Selector */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">Profile mode</Label>
                        <div className="space-y-3">
                          {([
                            {
                              value: 'public' as const,
                              label: 'Public profile',
                              description: 'Your full name, avatar, and professional details are visible. Anyone can find you in search, recommendations, and member directories.',
                              icon: Globe,
                            },
                            {
                              value: 'anonymous-searchable' as const,
                              label: 'Anonymous but searchable',
                              description: 'Your identity is hidden (shown as "Anonymous User"), but your profile still appears in search results, matching, and member directories based on your skills and interests.',
                              icon: Eye,
                            },
                            {
                              value: 'anonymous-hidden' as const,
                              label: 'Anonymous and hidden',
                              description: 'Your identity is fully hidden and you will not appear in any search results, recommendations, or member directories.',
                              icon: EyeOff,
                            },
                          ] as const).map(option => {
                            const Icon = option.icon;
                            const selected = profileForm.discoverabilityMode === option.value;
                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                  updateProfile('discoverabilityMode', option.value);
                                  // Sync anonymous state with discoverability
                                  if (option.value === 'public') {
                                    updateProfile('isAnonymous', false);
                                  } else {
                                    updateProfile('isAnonymous', true);
                                  }
                                }}
                                className={cn(
                                  'flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all',
                                  selected
                                    ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                                    : 'border-border bg-muted/40 hover:bg-accent/50',
                                )}
                              >
                                <div className={cn(
                                  'mt-0.5 flex size-8 flex-shrink-0 items-center justify-center rounded-lg',
                                  selected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
                                )}>
                                  <Icon className="size-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className={cn('text-sm font-medium', selected ? 'text-foreground' : 'text-foreground/80')}>{option.label}</span>
                                    {selected && (
                                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">Active</span>
                                    )}
                                  </div>
                                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{option.description}</p>
                                </div>
                                <div className={cn(
                                  'mt-1 flex size-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                                  selected ? 'border-primary bg-primary' : 'border-muted-foreground/30',
                                )}>
                                  {selected && <div className="size-2 rounded-full bg-primary-foreground" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-2 border-t border-border pt-4">
                        <div className="mb-3 text-sm font-medium text-foreground">Additional display preferences</div>
                        <div className="space-y-3">
                          <ToggleField
                            label="Show company on global profile"
                            description="Useful for trust and professional context. Only visible when profile is public."
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
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Current status info panel */}
                      <div className="rounded-lg border border-border bg-muted/40 p-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          {profileForm.discoverabilityMode === 'public' ? (
                            <><Globe className="size-4 text-primary" /> Your profile is public</>
                          ) : profileForm.discoverabilityMode === 'anonymous-searchable' ? (
                            <><Eye className="size-4 text-yellow-500" /> You are anonymous but searchable</>
                          ) : (
                            <><EyeOff className="size-4 text-destructive" /> You are fully hidden</>
                          )}
                        </div>
                        <div className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                          {profileForm.discoverabilityMode === 'public' ? (
                            <>
                              <p>Members can see your name, photo, and professional details. You appear in search results and recommendations.</p>
                              <p>Individual LeapSpaces may still apply their own scoped anonymity rules.</p>
                            </>
                          ) : profileForm.discoverabilityMode === 'anonymous-searchable' ? (
                            <>
                              <p>Your name and photo are replaced with "Anonymous User" across the platform. Members can still find your profile via search based on skills and interests.</p>
                              <p>Useful when you want to participate in communities without revealing your identity.</p>
                            </>
                          ) : (
                            <>
                              <p>You are completely invisible -- no search results, no directory listings, no recommendations. Only direct invitations can reach you.</p>
                              <p>You can still browse and participate, but others cannot discover you.</p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="rounded-lg border border-border bg-muted/40 p-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <CheckCircle2 className="size-4 text-primary" />
                          What stays out of My Profile
                        </div>
                        <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                          <p>Billing, invoices, payment methods, sessions, passwords, and provider connections remain in My Account.</p>
                          <p>Per-LeapSpace anonymity overrides are managed inside each LeapSpace's scoped profile settings.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {/* ─── Preferences ─── */}
            {section === 'settings' ? (
              <div className="space-y-5">
                <SectionCard title="Preferences" description="These affect the account experience, not the public profile.">
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <Field label="Language">
                      <Input value={accountForm.language} onChange={event => updateAccount('language', event.target.value)} />
                    </Field>
                    <Field label="Region">
                      <Select value={accountForm.region} onValueChange={value => updateAccount('region', value)}>
                        <SelectTrigger className="h-11 rounded-lg border-border bg-input-background"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {regionOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Timezone">
                      <Select value={accountForm.timezone} onValueChange={value => updateAccount('timezone', value)}>
                        <SelectTrigger className="h-11 rounded-lg border-border bg-input-background"><SelectValue /></SelectTrigger>
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
                        <TabsList className="h-11 w-full rounded-lg bg-muted p-1">
                          <TabsTrigger value="light" className="rounded-lg">Light</TabsTrigger>
                          <TabsTrigger value="system" className="rounded-lg">System</TabsTrigger>
                          <TabsTrigger value="dark" className="rounded-lg">Dark</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </Field>
                    <Field label="Default start page">
                      <Select value={accountForm.startPage} onValueChange={value => updateAccount('startPage', value)}>
                        <SelectTrigger className="h-11 rounded-lg border-border bg-input-background"><SelectValue /></SelectTrigger>
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

            {/* ─── Authentication ─── */}
            {section === 'authentication' ? (
              <div className="space-y-5">
                <SectionCard title="Authentication and Security" description="Manage how you sign in and protect your account. Future API: GET/PUT /api/account/security.">
                  {/* Email & Password */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Account email" hint="Maps to /api/profile.email. Separate auth endpoint preferred.">
                      <div className="flex gap-2">
                        <Input value={accountForm.email} readOnly className="flex-1 bg-muted/40" />
                        <Button variant="outline" className="rounded-lg border-border" onClick={() => toast.info('Email change flow', { description: 'Verification email will be sent to your new address.' })}>
                          Change
                        </Button>
                      </div>
                    </Field>
                    <Field label="Password" hint="Future API: passwordLastChangedAt on /api/account/security.">
                      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2.5">
                        <Lock className="size-4 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm text-foreground">Password set</div>
                          <div className="text-xs text-muted-foreground">{accountForm.passwordState}</div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-lg border-border text-xs" onClick={() => toast.info('Password change', { description: 'A password reset link has been sent to your email.' })}>
                          Change password
                        </Button>
                      </div>
                    </Field>
                  </div>

                  {/* 2FA & Security Alerts */}
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <Shield className="size-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">Two-factor authentication</span>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">Require a second factor for sign-in and sensitive account actions.</p>
                          {accountForm.twoFactor ? (
                            <Badge variant="secondary" className="mt-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-xs shadow-none">
                              <CheckCircle2 className="size-3 mr-1" /> Enabled
                            </Badge>
                          ) : (
                            <Button variant="outline" size="sm" className="mt-2 rounded-lg border-border text-xs" onClick={() => setShow2FASetup(true)}>
                              Set up 2FA
                            </Button>
                          )}
                        </div>
                        <Switch checked={accountForm.twoFactor} onCheckedChange={checked => {
                          if (!checked) {
                            updateAccount('twoFactor', false);
                          } else {
                            setShow2FASetup(true);
                          }
                        }} />
                      </div>
                    </div>
                    <ToggleField
                      label="Security alerts"
                      description="Send alerts for new devices, unusual login attempts, and account recovery events."
                      checked={accountForm.securityAlerts}
                      onCheckedChange={checked => updateAccount('securityAlerts', checked)}
                    />
                  </div>

                  {/* Session Challenge Policy */}
                  <div className="mt-5">
                    <Field label="Session challenge policy" hint="Future API: sessionChallengePolicy on /api/account/security.">
                      <Input value={accountForm.sessionPolicy} onChange={event => updateAccount('sessionPolicy', event.target.value)} />
                    </Field>
                  </div>
                </SectionCard>

                {/* Passkeys */}
                <SectionCard title="Passkeys" description="FIDO2 security keys and biometric authenticators registered to this account.">
                  <div className="space-y-3">
                    {accountForm.passkeys.map(passkey => (
                      <div key={passkey.id} className="flex items-center gap-4 rounded-lg border border-border bg-muted/40 px-4 py-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                          <KeyRound className="size-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground">{passkey.name}</div>
                          <div className="text-xs text-muted-foreground">Added {passkey.createdAt} · Last used {passkey.lastUsed}</div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive rounded-lg" onClick={() => removePasskey(passkey.id)}>
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full rounded-lg border-dashed border-border text-muted-foreground hover:text-foreground" onClick={() => toast.info('Add passkey', { description: 'Follow your browser prompts to register a new passkey.' })}>
                      <Plus className="size-4 mr-2" />
                      Add a passkey
                    </Button>
                  </div>
                </SectionCard>

                {/* Active Sessions */}
                <SectionCard title="Active Sessions" description="Devices currently signed in to your account. Revoke any session you do not recognize.">
                  <div className="space-y-3">
                    {accountForm.sessions.map(session => (
                      <div key={session.id} className="flex items-center gap-4 rounded-lg border border-border bg-muted/40 px-4 py-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                          {session.device.includes('iPhone') || session.device.includes('Android') ? (
                            <Smartphone className="size-5 text-muted-foreground" />
                          ) : (
                            <Monitor className="size-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{session.label}</span>
                            {session.current ? (
                              <Badge variant="secondary" className="rounded-md border border-green-200 bg-green-50 text-green-700 text-[10px] px-1.5 shadow-none">This device</Badge>
                            ) : null}
                          </div>
                          <div className="text-xs text-muted-foreground">{session.device} · {session.location} · {session.lastActive}</div>
                        </div>
                        {!session.current ? (
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive rounded-lg" onClick={() => revokeSession(session.id)}>
                            <LogOut className="size-4 mr-1" />
                            Revoke
                          </Button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {/* ─── Credits ─── */}
            {section === 'credits' ? (
              <div className="space-y-5">
                {/* Balance Card */}
                <SectionCard title="Credit Balance" description="Credits are used for event registrations, course enrollments, and AI features on LeapSpace.">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="rounded-lg border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-muted/40 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20">
                          <Coins className="size-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-3xl font-semibold text-foreground">{creditBalance.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">credits available</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-lg bg-card border border-border p-3">
                          <div className="text-xs text-muted-foreground">Used this month</div>
                          <div className="text-sm font-semibold text-foreground mt-1">{MOCK_CREDIT_DATA.usedThisMonth.toLocaleString()}</div>
                        </div>
                        <div className="rounded-lg bg-card border border-border p-3">
                          <div className="text-xs text-muted-foreground">Pending holds</div>
                          <div className="text-sm font-semibold text-foreground mt-1">{MOCK_CREDIT_DATA.pendingHolds.toLocaleString()}</div>
                        </div>
                        <div className="rounded-lg bg-card border border-border p-3">
                          <div className="text-xs text-muted-foreground">Lifetime</div>
                          <div className="text-sm font-semibold text-foreground mt-1">{MOCK_CREDIT_DATA.lifetimeEarned.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Buy */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-foreground mb-2">Buy credits</div>
                      <div className="grid grid-cols-2 gap-3">
                        {CREDIT_PACKAGES.map(pkg => (
                          <button
                            key={pkg.id}
                            onClick={() => setSelectedCreditPack(pkg.id)}
                            className={cn(
                              'relative rounded-lg border-2 p-3 text-left transition-all',
                              selectedCreditPack === pkg.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30',
                            )}
                          >
                            {pkg.popular ? (
                              <Badge className="absolute -top-2 right-2 bg-primary text-primary-foreground text-[10px] px-2 py-0 shadow-none rounded">Best Value</Badge>
                            ) : null}
                            <div className="text-xs text-muted-foreground">{pkg.name}</div>
                            <div className="text-lg font-semibold text-foreground">{pkg.credits.toLocaleString()}</div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-sm text-foreground">${pkg.price.toFixed(2)}</span>
                              {pkg.savings > 0 ? (
                                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100 text-[10px] px-1.5 py-0">{pkg.savings}% off</Badge>
                              ) : null}
                            </div>
                          </button>
                        ))}
                      </div>
                      <Button
                        className="w-full rounded-lg"
                        onClick={() => {
                          const pkg = CREDIT_PACKAGES.find(p => p.id === selectedCreditPack);
                          if (pkg) handleBuyCredits(pkg.credits);
                        }}
                      >
                        <Zap className="size-4 mr-2" />
                        Buy {CREDIT_PACKAGES.find(p => p.id === selectedCreditPack)?.credits.toLocaleString() || '0'} credits
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">Rate: 1 USD = {CREDITS_PER_DOLLAR} credits</p>
                    </div>
                  </div>
                </SectionCard>

                {/* Credit History */}
                <SectionCard title="Credit History" description="API: GET /api/credits/history. Full transaction log.">
                  <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-muted border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Transaction</th>
                          <th className="px-4 py-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider text-right">Amount</th>
                          <th className="px-4 py-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {MOCK_CREDIT_HISTORY.map(tx => (
                          <tr key={tx.id} className="hover:bg-muted/40 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  'flex size-8 items-center justify-center rounded-lg',
                                  tx.type === 'purchase' ? 'bg-green-50' : tx.type === 'earn' ? 'bg-blue-50' : tx.type === 'hold' ? 'bg-amber-50' : 'bg-muted',
                                )}>
                                  {tx.type === 'purchase' ? <CreditCard className="size-4 text-green-600" /> :
                                   tx.type === 'earn' ? <Sparkles className="size-4 text-blue-600" /> :
                                   tx.type === 'hold' ? <Clock className="size-4 text-amber-600" /> :
                                   <Coins className="size-4 text-muted-foreground" />}
                                </div>
                                <span className="text-sm text-foreground">{tx.description}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{tx.date}</td>
                            <td className={cn('px-4 py-3 text-sm font-semibold text-right', tx.amount > 0 ? 'text-green-600' : 'text-foreground')}>
                              {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Badge variant="secondary" className={cn(
                                'rounded-md text-[10px] shadow-none',
                                tx.status === 'completed' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100',
                              )}>
                                {tx.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>
              </div>
            ) : null}

            {/* ─── Billing ─── */}
            {section === 'billing' ? (
              <div className="space-y-5">
                <SectionCard title="Billing and Subscription" description="Billing belongs here so it never gets mixed into the profile experience. Future API: GET/PUT /api/account/billing.">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Current plan">
                      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{accountForm.plan}</div>
                          <div className="text-xs text-muted-foreground">Renews {accountForm.renewalDate}</div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-lg border-border text-xs">Change plan</Button>
                      </div>
                    </Field>
                    <Field label="Payment method">
                      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
                        <CreditCard className="size-5 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{accountForm.paymentMethod}</div>
                          <div className="text-xs text-muted-foreground">Default payment method</div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-lg border-border text-xs">Update</Button>
                      </div>
                    </Field>
                    <Field label="Billing email">
                      <Input value={accountForm.billingEmail} onChange={event => updateAccount('billingEmail', event.target.value)} />
                    </Field>
                    <Field label="Renewal date">
                      <Input value={accountForm.renewalDate} readOnly className="bg-muted/40" />
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

            {/* ─── Connected Accounts ─── */}
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

            {/* ─── Active Sessions (standalone) ─── */}
            {section === 'active-sessions' ? (
              <div className="space-y-5">
                <SectionCard title="Active Sessions" description="Devices currently signed in to your account.">
                  <div className="space-y-3">
                    {accountForm.sessions.map(session => (
                      <div key={session.id} className="flex items-center gap-4 rounded-lg border border-border bg-muted/40 px-4 py-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                          {session.device.includes('iPhone') || session.device.includes('Android') ? (
                            <Smartphone className="size-5 text-muted-foreground" />
                          ) : (
                            <Monitor className="size-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{session.label}</span>
                            {session.current ? (
                              <Badge variant="secondary" className="rounded-md border border-green-200 bg-green-50 text-green-700 text-[10px] px-1.5 shadow-none">This device</Badge>
                            ) : null}
                          </div>
                          <div className="text-xs text-muted-foreground">{session.device} · {session.location} · {session.lastActive}</div>
                        </div>
                        {!session.current ? (
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive rounded-lg" onClick={() => revokeSession(session.id)}>
                            <LogOut className="size-4 mr-1" />
                            Revoke
                          </Button>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg border border-border bg-muted/40 p-4">
                    <Field label="Session challenge policy" hint="Controls when re-authentication is required.">
                      <Input value={accountForm.sessionPolicy} onChange={event => updateAccount('sessionPolicy', event.target.value)} />
                    </Field>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Button variant="outline" className="rounded-lg border-border" onClick={() => toast.info('Reviewing trusted devices...')}>
                      Review trusted devices
                    </Button>
                    <Button variant="outline" className="rounded-lg border-destructive/30 text-destructive hover:bg-destructive/5" onClick={() => {
                      updateAccount('sessions', accountForm.sessions.filter(s => s.current));
                      toast.success('All other sessions revoked');
                    }}>
                      Revoke all other sessions
                    </Button>
                  </div>
                </SectionCard>
              </div>
            ) : null}
          </div>
        </ScrollArea>

        {/* Save Bar */}
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
                className="rounded-lg border-border"
                onClick={showingProfileSection ? handleProfileReset : handleAccountReset}
                disabled={!pageDirty}
              >
                Discard changes
              </Button>
              <Button className="rounded-lg" onClick={showingProfileSection ? handleProfileSave : handleAccountSave}>
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Setup Modal */}
      <TwoFactorSetup
        isOpen={show2FASetup}
        onClose={() => setShow2FASetup(false)}
        onComplete={() => {
          updateAccount('twoFactor', true);
          toast.success('Two-factor authentication enabled', { description: 'Your account is now more secure.' });
        }}
      />
    </div>
  );
}
