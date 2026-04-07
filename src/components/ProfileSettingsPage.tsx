import { useEffect, useState } from 'react';
import { ArrowLeft, Bell, Briefcase, Eye, KeyRound, Link2, Search, Shield, User, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
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

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        {description ? <div className="mt-1 text-sm text-muted-foreground">{description}</div> : null}
      </div>
      {children}
    </section>
  );
}

function Row({ label, value, action = 'Edit' }: { label: string; value: string; action?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-border py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="mt-1 text-sm text-muted-foreground">{value}</div>
      </div>
      <Button variant="outline" size="sm" className="rounded-lg border-border bg-card shadow-none">{action}</Button>
    </div>
  );
}

function ToggleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-border py-4 first:border-t-0 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="mt-1 text-sm text-muted-foreground">{value}</div>
      </div>
      <Button variant="outline" size="sm" className="rounded-lg border-border bg-card shadow-none">Manage</Button>
    </div>
  );
}

export function ProfileSettingsPage({ currentUser, onBack, initialSection = 'settings' }: ProfileSettingsPageProps) {
  const [section, setSection] = useState<SettingsSection>(mapInitialSection(initialSection));
  const userName = currentUser?.name || 'Google User';
  const email = currentUser?.email || 'user@google.com';

  useEffect(() => {
    setSection(mapInitialSection(initialSection));
  }, [initialSection]);

  const showingProfileSection = section === 'profile-basics' || section === 'professional-identity' || section === 'visibility';

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-80 border-r border-border bg-card flex-shrink-0 flex flex-col h-full">
        <div className="p-5 border-b border-border">
          <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80">
            <ArrowLeft className="size-4" />
            Back
          </button>

          <div className="mb-4">
            <h1 className="text-xl font-semibold text-foreground">Account Center</h1>
            <p className="mt-1 text-sm text-muted-foreground">Separate your professional profile from your internal account settings.</p>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search profile or account"
              className="h-11 w-full rounded-xl border border-border bg-muted pl-9 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-5">
            <div>
              <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">My Profile</div>
              <div className="space-y-1">
                {profileNav.map(item => {
                  const Icon = item.icon;
                  const active = section === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSection(item.id)}
                      className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors', active ? 'bg-sidebar-accent text-foreground border border-border' : 'text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent')}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">My Account</div>
              <div className="space-y-1">
                {accountNav.map(item => {
                  const Icon = item.icon;
                  const active = section === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSection(item.id)}
                      className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors', active ? 'bg-sidebar-accent text-foreground border border-border' : 'text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent')}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 pb-24 max-w-6xl mx-auto">
            <div className="mb-8 border-b border-border pb-5">
              <h2 className="text-3xl font-semibold text-foreground">{showingProfileSection ? 'My Profile' : 'My Account'}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {showingProfileSection
                  ? 'This is your professional identity across LeapSpace. It is distinct from your technical account settings.'
                  : `${email} · Internal account settings for login, billing, security, preferences, and connected providers.`}
              </p>
            </div>

            {section === 'profile-basics' ? (
              <div className="max-w-5xl space-y-4">
                <SectionCard title="Core identity" description="Public-facing identity fields that define your base profile across LeapSpaces.">
                  <Row label="Full name" value={userName} />
                  <Row label="Preferred name" value="Google" />
                  <Row label="Professional headline" value="AI systems operator building high-signal communities" />
                  <Row label="Short bio" value="I design, operate, and grow community-led learning systems for professionals." />
                  <Row label="Profile photo" value="Global profile photo used by default across LeapSpaces" action="Change" />
                  <Row label="Cover image" value="Professional banner shown on your public profile" action="Change" />
                </SectionCard>

                <SectionCard title="Global profile note" description="LeapSpace-specific profile pages can override selected presentation fields, but this remains your default identity.">
                  <div className="text-sm text-muted-foreground">Use this page for your global professional identity. Use a LeapSpace profile only when you want a different presentation, codename, or visibility inside one specific LeapSpace.</div>
                </SectionCard>
              </div>
            ) : null}

            {section === 'professional-identity' ? (
              <div className="max-w-5xl space-y-4">
                <SectionCard title="Professional identity" description="Profile fields used for discovery, matching, mentorship, and trust.">
                  <Row label="Current role / title" value="Community Systems Designer" />
                  <Row label="Company / organization" value="TrueLeap" />
                  <Row label="Industry" value="Professional learning and creator tools" />
                  <Row label="Primary expertise" value="Community design, event systems, growth operations" action="Edit" />
                  <Row label="Skills" value="Growth strategy, GTM, event operations, mentoring" action="Edit" />
                  <Row label="Work experience" value="3 roles added" action="Manage" />
                  <Row label="Education" value="2 entries added" action="Manage" />
                  <Row label="Featured links" value="LinkedIn, portfolio, case studies" action="Manage" />
                </SectionCard>
              </div>
            ) : null}

            {section === 'visibility' ? (
              <div className="max-w-5xl space-y-4">
                <SectionCard title="Global visibility" description="These are global profile visibility controls. LeapSpace-specific visibility is managed separately inside each LeapSpace profile.">
                  <Row label="Profile visibility" value="LeapSpace members only" action="Change" />
                  <ToggleRow label="Show company" value="Visible on global profile" />
                  <ToggleRow label="Show location" value="Hidden on global profile" />
                  <ToggleRow label="Show social links" value="Visible on global profile" />
                  <ToggleRow label="Search discoverability" value="Allow members to find this global profile" />
                  <ToggleRow label="Profile-based recommendations" value="Used for mentoring and matching suggestions" />
                </SectionCard>
              </div>
            ) : null}

            {section === 'settings' ? (
              <div className="max-w-5xl space-y-4">
                <SectionCard title="Preferences" description="Internal account preferences. These do not change your professional profile.">
                  <Row label="Language" value="English" action="Change" />
                  <Row label="Region" value="India" action="Change" />
                  <Row label="Timezone" value="GMT+5:30" action="Change" />
                  <Row label="Theme" value="Light" action="Change" />
                  <Row label="Default start page after login" value="Engagement feed" action="Change" />
                </SectionCard>
              </div>
            ) : null}

            {section === 'authentication' ? (
              <div className="max-w-5xl space-y-4">
                <SectionCard title="Authentication and security" description="Technical controls tied to sign-in, verification, sessions, and account security.">
                  <Row label="Account email" value={email} action="Update" />
                  <Row label="Password" value="Last updated 41 days ago" action="Change" />
                  <Row label="Two-factor authentication" value="Enabled with authenticator app" action="Manage" />
                  <Row label="Passkeys" value="1 registered device" action="Manage" />
                  <Row label="Security alerts" value="Email and push enabled" action="Change" />
                </SectionCard>
              </div>
            ) : null}

            {section === 'billing' ? (
              <div className="max-w-5xl space-y-4">
                <SectionCard title="Billing and subscription" description="Internal account billing controls. These are separate from your profile and separate from LeapSpace profile customization.">
                  <Row label="Current plan" value="Business plan billed monthly" action="Manage plan" />
                  <Row label="Payment method" value="Visa ending in 4242" action="Update" />
                  <Row label="Billing email" value={email} action="Change" />
                  <Row label="Upcoming renewal" value="April 28, 2026" action="View" />
                  <Row label="Invoices" value="12 invoices available" action="Open" />
                </SectionCard>
              </div>
            ) : null}

            {section === 'api-tokens' ? (
              <div className="max-w-5xl space-y-4">
                <SectionCard title="Connected accounts" description="Manage linked login providers and technical account connections.">
                  <Row label="Google" value="Connected and primary login" action="Primary" />
                  <Row label="LinkedIn" value="Connected for profile import" action="Disconnect" />
                  <Row label="Microsoft" value="Not connected" action="Connect" />
                  <Row label="GitHub" value="Not connected" action="Connect" />
                </SectionCard>
              </div>
            ) : null}

            {section === 'active-sessions' ? (
              <div className="max-w-5xl space-y-4">
                <SectionCard title="Active sessions" description="Review active devices and revoke access when needed.">
                  <Row label="Chrome on Mac" value="San Francisco, CA • Active now" action="Current" />
                  <Row label="Safari on iPhone" value="Last active yesterday" action="Revoke" />
                  <Row label="Trusted devices" value="3 devices marked trusted" action="Manage" />
                </SectionCard>
              </div>
            ) : null}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
