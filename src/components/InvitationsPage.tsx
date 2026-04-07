import { useEffect, useState } from 'react';
import { ArrowRight, Inbox, Link2, Mail, Search, SlidersHorizontal, Users, X } from 'lucide-react';
import { AuthHeader } from './auth/AuthHeader';

export type InvitationScenario =
  | 'hub'
  | 'first-time'
  | 'existing-user'
  | 'success'
  | 'expired'
  | 'revoked'
  | 'wrong-account'
  | 'already-member';

interface InvitationsPageProps {
  scenario?: InvitationScenario;
  currentUser?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  isGuest?: boolean;
  onLogoClick?: () => void;
  onOpenWorkspace?: () => void;
  onCreateAccount?: () => void;
  onSignIn?: () => void;
  onNavigateToScenario?: (scenario: InvitationScenario) => void;
}

type TabId = 'workspaces' | 'open-invitations';

const workspaces = [
  {
    id: 'ws-1',
    name: 'TrueLeap Inc.',
    members: 27,
    activity: 'Last active',
    initials: 'TL',
  },
  {
    id: 'ws-2',
    name: 'Creator Studio',
    members: 14,
    activity: 'Last active yesterday',
    initials: 'CS',
  },
];

const invitations = [
  {
    id: 'inv-1',
    workspace: 'Founders Circle',
    invitedBy: 'Sarah Chen',
    email: 'mahesh@trueleap.io',
    role: 'Member',
    meta: 'Private LeapSpace for operators, founders, and community leads.',
    expiresLabel: 'Expires in 3 days',
    initials: 'FC',
  },
  {
    id: 'inv-2',
    workspace: 'Growth Operators',
    invitedBy: 'Ava Wilson',
    email: 'mahesh@trueleap.io',
    role: 'Moderator',
    meta: 'Workspace for growth teams, operators, and playbook sharing.',
    expiresLabel: 'Expires in 6 days',
    initials: 'GO',
  },
];

const stateLinks: Array<{ id: InvitationScenario; label: string; path: string }> = [
  { id: 'hub', label: 'Hub', path: '/invitations' },
  { id: 'first-time', label: 'First-time', path: '/first-time' },
  { id: 'existing-user', label: 'Existing user', path: '/existing-user' },
  { id: 'success', label: 'Success', path: '/success' },
  { id: 'expired', label: 'Expired', path: '/expired' },
  { id: 'revoked', label: 'Revoked', path: '/revoked' },
  { id: 'wrong-account', label: 'Wrong account', path: '/wrong-account' },
  { id: 'already-member', label: 'Already member', path: '/already-member' },
];

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[#111111] px-4 text-sm font-medium text-white transition-colors hover:bg-[#222222] sm:w-auto"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-full items-center justify-center rounded-md border border-[#d4d4d8] bg-white px-4 text-sm font-medium text-[#111111] transition-colors hover:bg-[#fafafa] sm:w-auto"
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-full items-center justify-center rounded-md border border-[#d4d4d8] bg-[#fafafa] px-4 text-sm font-medium text-[#111111] transition-colors hover:bg-[#f4f4f5] sm:w-auto"
    >
      {children}
    </button>
  );
}

function FooterStateLinks({
  active,
  onNavigateToScenario,
}: {
  active: InvitationScenario;
  onNavigateToScenario?: (scenario: InvitationScenario) => void;
}) {
  return (
    <div className="mt-8 hidden w-full overflow-x-auto text-center text-xs text-[#71717a] sm:block">
      <div className="mx-auto min-w-max whitespace-nowrap px-2">
      <span className="mr-2 inline-flex items-center gap-1 font-medium text-[#52525b]">
        <Link2 className="size-3" />
        States:
      </span>
      {stateLinks.map((link, index) => (
        <span key={link.id}>
          <a
            href={link.path}
            onClick={(event) => {
              if (!onNavigateToScenario) return;
              event.preventDefault();
              onNavigateToScenario(link.id);
            }}
            className={active === link.id ? 'font-semibold text-[#111111]' : 'hover:text-[#111111]'}
          >
            {link.label}
          </a>
          {index < stateLinks.length - 1 ? <span className="px-2 text-[#d4d4d8]">/</span> : null}
        </span>
      ))}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#111111]">{children}</div>;
}

function Notice({
  title,
  description,
  dotClassName = 'bg-[#a1a1aa]',
}: {
  title: string;
  description: string;
  dotClassName?: string;
}) {
  return (
    <div className="mb-4 rounded-xl border border-[#e4e4e7] bg-[#fafafa] px-3 py-3 sm:px-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
        <span className={`size-2 rounded-full ${dotClassName}`} />
        {title}
      </div>
      <div className="mt-1 text-xs leading-5 text-[#52525b] sm:text-sm sm:leading-6">{description}</div>
    </div>
  );
}

function WorkspaceList({ visibleWorkspaces, onOpenWorkspace }: { visibleWorkspaces: typeof workspaces; onOpenWorkspace?: () => void }) {
  return (
    <>
      <div className="mb-3 text-sm font-medium text-[#52525b]">Ready to launch</div>
      <div className="space-y-1">
        {visibleWorkspaces.map((workspace) => (
          <button
            key={workspace.id}
            type="button"
            onClick={onOpenWorkspace}
            className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition-colors hover:bg-[#fafafa] sm:gap-4 sm:px-3 sm:py-4"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#e4e4e7] bg-white text-sm font-semibold text-[#111111] sm:size-12">
              {workspace.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-[#111111] sm:text-base">{workspace.name}</div>
              <div className="mt-0.5 text-xs text-[#71717a] sm:mt-1 sm:text-sm">{workspace.members} members • {workspace.activity}</div>
            </div>
            <ArrowRight className="size-4 shrink-0 text-[#71717a] sm:size-5" />
          </button>
        ))}
      </div>
    </>
  );
}

function EmptyWorkspaceState({ onCreateAccount, onSignIn }: { onCreateAccount?: () => void; onSignIn?: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-[#d4d4d8] bg-[#fafafa] px-4 py-6 text-center sm:px-5 sm:py-8">
      <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full border border-[#e4e4e7] bg-white">
        <Users className="size-5 text-[#111111]" />
      </div>
      <div className="text-base font-semibold text-[#111111]">No workspaces yet</div>
      <div className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#71717a] sm:text-sm sm:leading-6">
        Create an account or sign in with the invited email to see your LeapSpaces here.
      </div>
      <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
        <PrimaryButton onClick={onCreateAccount}>Create account</PrimaryButton>
        <SecondaryButton onClick={onSignIn}>Sign in</SecondaryButton>
      </div>
    </div>
  );
}

function InvitationRow({
  invitation,
  scenario,
  onOpenWorkspace,
  onCreateAccount,
  onSignIn,
}: {
  invitation: (typeof invitations)[number];
  scenario: InvitationScenario;
  onOpenWorkspace?: () => void;
  onCreateAccount?: () => void;
  onSignIn?: () => void;
}) {
  const scenarioContent = {
    hub: {
      title: null,
      description: invitation.meta,
      dotClassName: 'bg-[#a1a1aa]',
      primary: 'View invitation',
      secondary: 'Accept',
      primaryAction: onSignIn,
      secondaryAction: onOpenWorkspace,
    },
    'first-time': {
      title: 'This invitation is waiting for you.',
      description: 'Create your LeapSpace account with the invited email to join this workspace.',
      dotClassName: 'bg-[#a1a1aa]',
      primary: 'Accept',
      secondary: null,
      primaryAction: onCreateAccount,
      secondaryAction: undefined,
    },
    'existing-user': {
      title: 'You can accept this invitation now.',
      description: 'You are already on LeapSpace, so this state should let you move directly into the workspace.',
      dotClassName: 'bg-[#a1a1aa]',
      primary: 'Accept',
      secondary: null,
      primaryAction: onOpenWorkspace,
      secondaryAction: undefined,
    },
    success: {
      title: 'Invitation accepted.',
      description: 'You already have access to this workspace now. The next step is to enter it.',
      dotClassName: 'bg-[#22c55e]',
      primary: 'Open workspace',
      secondary: null,
      primaryAction: onOpenWorkspace,
      secondaryAction: undefined,
    },
    expired: {
      title: 'This invitation link has expired.',
      description: 'Show the invite details, but make it clear that the user needs a fresh invitation before they can join.',
      dotClassName: 'bg-[#f59e0b]',
      primary: 'Request a new invitation',
      secondary: 'Sign in',
      primaryAction: onSignIn,
      secondaryAction: onSignIn,
    },
    revoked: {
      title: 'Your access has been revoked.',
      description: 'Keep the message factual: the invitation was cancelled by the sender or workspace admin before it was used.',
      dotClassName: 'bg-[#ef4444]',
      primary: 'Contact workspace admin',
      secondary: 'Back to workspaces',
      primaryAction: onSignIn,
      secondaryAction: onSignIn,
    },
    'wrong-account': {
      title: 'You are signed in with a different account.',
      description: `This invitation was sent to ${invitation.email}. To accept it, switch to that email or create a matching account.`,
      dotClassName: 'bg-[#f59e0b]',
      primary: 'Sign in with invited email',
      secondary: 'Create new account',
      primaryAction: onSignIn,
      secondaryAction: onCreateAccount,
    },
    'already-member': {
      title: 'You already belong to this workspace.',
      description: 'Do not block the user with an error. Treat this as a successful access state and let them continue.',
      dotClassName: 'bg-[#22c55e]',
      primary: 'Open workspace',
      secondary: null,
      primaryAction: onOpenWorkspace,
      secondaryAction: undefined,
    },
  }[scenario];

  return (
    <div className="rounded-xl border border-[#e4e4e7] bg-white px-3 py-3 sm:px-4 sm:py-4">
      {scenarioContent.title ? (
        <Notice
          title={scenarioContent.title}
          description={scenarioContent.description}
          dotClassName={scenarioContent.dotClassName}
        />
      ) : null}

      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#e4e4e7] bg-white text-sm font-semibold text-[#111111] sm:size-12">
          {invitation.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="break-words text-sm font-semibold text-[#111111] sm:text-base">{invitation.workspace}</div>
            <span className="rounded-full border border-[#e4e4e7] bg-[#fafafa] px-2.5 py-0.5 text-xs font-medium text-[#52525b]">
              {invitation.role}
            </span>
          </div>
          <div className="mt-1 break-words text-xs text-[#71717a] sm:text-sm">Invited by {invitation.invitedBy} • {invitation.email}</div>
          <div className="mt-1 line-clamp-2 text-xs leading-5 text-[#52525b] sm:text-sm sm:leading-6">{invitation.meta}</div>
          <div className="mt-2 text-xs font-medium text-[#71717a]">{invitation.expiresLabel}</div>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:gap-3">
        <PrimaryButton onClick={scenarioContent.primaryAction}>{scenarioContent.primary}</PrimaryButton>
        {scenarioContent.secondary ? <SecondaryButton onClick={scenarioContent.secondaryAction}>{scenarioContent.secondary}</SecondaryButton> : null}
      </div>
    </div>
  );
}

export function InvitationsPage({
  scenario = 'hub',
  currentUser,
  isGuest,
  onLogoClick,
  onOpenWorkspace,
  onCreateAccount,
  onSignIn,
  onNavigateToScenario,
}: InvitationsPageProps) {
  const [activeTab, setActiveTab] = useState<TabId>('workspaces');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (scenario === 'hub') {
      setActiveTab('workspaces');
      return;
    }

    setActiveTab('open-invitations');
  }, [scenario]);

  const visibleWorkspaces = currentUser && !isGuest ? workspaces : [];
  const showWorkspaceTab = scenario !== 'first-time';
  const filteredInvitations = invitations.filter((invitation) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return [invitation.workspace, invitation.invitedBy, invitation.email, invitation.role, invitation.meta]
      .join(' ')
      .toLowerCase()
      .includes(query);
  });

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <AuthHeader onLogoClick={onLogoClick} />

      <main className="px-3 pb-10 pt-6 sm:px-4 sm:pb-16 sm:pt-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <div className="mb-4 px-2 text-center sm:mb-6">
            <h1 className="text-[28px] font-semibold tracking-tight text-[#111111] sm:text-4xl">Welcome back</h1>
            <p className="mt-2 text-xs leading-5 text-[#71717a] sm:mt-3 sm:text-sm sm:leading-6">
              Review workspaces and invitations.
            </p>
          </div>

          <div className="w-full max-w-3xl">
            <SectionTitle>
              <Users className="size-4 text-[#111111]" />
              My Workspaces
            </SectionTitle>

            <div className="overflow-hidden rounded-[20px] border border-[#e4e4e7] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="border-b border-[#e4e4e7] px-3 pt-3 sm:px-5 sm:pt-4">
                <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {showWorkspaceTab ? (
                    <button
                      type="button"
                      onClick={() => setActiveTab('workspaces')}
                      className={`shrink-0 border-b-2 pb-3 text-sm font-medium transition-colors ${
                        activeTab === 'workspaces'
                          ? 'border-[#111111] text-[#111111]'
                          : 'border-transparent text-[#71717a] hover:text-[#111111]'
                      }`}
                    >
                      Workspaces {visibleWorkspaces.length ? `(${visibleWorkspaces.length})` : ''}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setActiveTab('open-invitations')}
                    className={`shrink-0 border-b-2 pb-3 text-sm font-medium transition-colors ${
                      activeTab === 'open-invitations'
                        ? 'border-[#111111] text-[#111111]'
                        : 'border-transparent text-[#71717a] hover:text-[#111111]'
                    }`}
                  >
                    Open invitations ({invitations.length})
                  </button>
                </div>
              </div>

              <div className="px-3 py-3 sm:px-5 sm:py-5">
                {activeTab === 'workspaces' && showWorkspaceTab ? (
                  visibleWorkspaces.length ? (
                    <WorkspaceList visibleWorkspaces={visibleWorkspaces} onOpenWorkspace={onOpenWorkspace} />
                  ) : (
                    <EmptyWorkspaceState onCreateAccount={onCreateAccount} onSignIn={onSignIn} />
                  )
                ) : (
                  <div>
                    <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:gap-3">
                      <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#71717a]" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          placeholder="Search invitations"
                          className="h-10 w-full rounded-md border border-[#d4d4d8] bg-white pl-9 pr-10 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#a1a1aa] focus:border-[#111111]"
                        />
                        {searchQuery ? (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-[#111111]"
                            aria-label="Clear search"
                          >
                            <X className="size-4" />
                          </button>
                        ) : null}
                      </div>

                      <GhostButton>
                        <SlidersHorizontal className="mr-2 size-4" />
                        Filter
                      </GhostButton>
                    </div>

                    <div className="space-y-4">
                      {filteredInvitations.length ? (
                        filteredInvitations.map((invitation) => (
                          <InvitationRow
                            key={invitation.id}
                            invitation={invitation}
                            scenario={scenario}
                            onOpenWorkspace={onOpenWorkspace}
                            onCreateAccount={onCreateAccount}
                            onSignIn={onSignIn}
                          />
                        ))
                      ) : (
                        <div className="rounded-xl border border-dashed border-[#d4d4d8] bg-[#fafafa] px-4 py-6 text-center text-sm text-[#71717a] sm:px-5 sm:py-8">
                          No invitations match your search.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-[#e4e4e7] bg-[#fafafa] px-3 py-3 sm:px-5 sm:py-4">
                <button type="button" onClick={onSignIn} className="text-left text-xs font-medium text-[#111111] underline-offset-4 hover:underline sm:text-sm">
                  Not seeing your workspace? Try a different email address
                </button>
              </div>
            </div>
          </div>

          <FooterStateLinks active={scenario} onNavigateToScenario={onNavigateToScenario} />
        </div>
      </main>
    </div>
  );
}
