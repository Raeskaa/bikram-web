// ════════════════════════════════════════════════════════════════
//  MOCK LEAPSPACES — Community/workspace entities for discovery
// ════════════════════════════════════════════════════════════════

import { mockEvents, mockRegistrations, isEventCreator, isEventSpeaker, type Event } from './mockEventData';

export interface LeapSpace {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  eventCount: number;
  category: string;
  /** 1–2 letter initial for avatar */
  initials: string;
  isGlobal?: boolean;
}

// ─── All known LeapSpaces (internal + external) ──────────────
export const allLeapSpaces: LeapSpace[] = [
  // Communities already referenced in mockEventData
  {
    id: 'comm-1',
    name: 'React Developers Hub',
    description: 'A community for React developers to share knowledge, pair-program, and attend workshops.',
    memberCount: 3420,
    eventCount: 0, // computed dynamically
    category: 'Technology',
    initials: 'RD',
  },
  {
    id: 'comm-2',
    name: 'Startup Founders Network',
    description: 'Connect with founders, investors, and advisors. Weekly firesides and pitch nights.',
    memberCount: 1890,
    eventCount: 0,
    category: 'Business',
    initials: 'SF',
  },
  {
    id: 'comm-3',
    name: 'Digital Marketers Guild',
    description: 'Strategies, tools, and case studies for modern digital marketing professionals.',
    memberCount: 2150,
    eventCount: 0,
    category: 'Marketing',
    initials: 'DM',
  },
  {
    id: 'comm-4',
    name: 'Design Engineers',
    description: 'Where design meets engineering. Figma deep-dives, design systems, and prototyping.',
    memberCount: 1640,
    eventCount: 0,
    category: 'Design',
    initials: 'DE',
  },
  {
    id: 'comm-5',
    name: 'DevOps Engineers',
    description: 'CI/CD pipelines, infrastructure as code, Kubernetes, and cloud-native tooling.',
    memberCount: 980,
    eventCount: 0,
    category: 'Technology',
    initials: 'DO',
  },

  // ─── NEW external LeapSpaces (user is NOT a member) ────────
  {
    id: 'comm-ext-1',
    name: 'AI Creators Collective',
    description: 'Exploring the frontier of generative AI — from LLMs to multimodal agents and AI art.',
    memberCount: 4210,
    eventCount: 0,
    category: 'AI & ML',
    initials: 'AI',
    isGlobal: true,
  },
  {
    id: 'comm-ext-2',
    name: 'Product Managers Circle',
    description: 'Product strategy, roadmapping, user research, and cross-functional leadership.',
    memberCount: 2780,
    eventCount: 0,
    category: 'Product',
    initials: 'PM',
    isGlobal: true,
  },
  {
    id: 'comm-ext-3',
    name: 'Data Science Guild',
    description: 'Statistics, ML engineering, data pipelines, and analytics best practices.',
    memberCount: 1520,
    eventCount: 0,
    category: 'Data',
    initials: 'DS',
    isGlobal: true,
  },
];

// Map communityName → parentCommunityId for lookup
const communityNameToId: Record<string, string> = {
  'React Developers Hub': 'comm-1',
  'Startup Founders Network': 'comm-2',
  'Digital Marketers Guild': 'comm-3',
  'Design Engineers': 'comm-4',
  'DevOps Engineers': 'comm-5',
  'AI Creators Collective': 'comm-ext-1',
  'Product Managers Circle': 'comm-ext-2',
  'Data Science Guild': 'comm-ext-3',
};

/**
 * Derive which LeapSpace IDs the user is a member of.
 * Membership = user is creator, speaker, or registered for any event in that community.
 */
export function getUserLeapSpaceIds(userEmail: string): Set<string> {
  const ids = new Set<string>();

  for (const event of mockEvents) {
    const communityId = event.parentCommunityId || (event.communityName ? communityNameToId[event.communityName] : null);
    if (!communityId) continue;

    // Creator or speaker?
    if (isEventCreator(event, userEmail) || isEventSpeaker(event, userEmail)) {
      ids.add(communityId);
      continue;
    }

    // Registered?
    const hasReg = mockRegistrations.some(
      r => r.eventId === event.id && r.userEmail === userEmail && r.status !== 'cancelled' && r.status !== 'cancelled-by-user'
    );
    if (hasReg) ids.add(communityId);
  }

  return ids;
}

/**
 * Get LeapSpaces the user IS in (with live event counts).
 */
export function getUserLeapSpaces(userEmail: string): LeapSpace[] {
  const memberIds = getUserLeapSpaceIds(userEmail);
  return allLeapSpaces
    .filter(ls => memberIds.has(ls.id))
    .map(ls => ({
      ...ls,
      eventCount: getLeapSpaceEventCount(ls.id),
    }));
}

/**
 * Get LeapSpaces the user is NOT in — for the discovery section.
 */
export function getExternalLeapSpaces(userEmail: string): LeapSpace[] {
  const memberIds = getUserLeapSpaceIds(userEmail);
  return allLeapSpaces
    .filter(ls => !memberIds.has(ls.id))
    .map(ls => ({
      ...ls,
      eventCount: getLeapSpaceEventCount(ls.id),
    }))
    .filter(ls => ls.eventCount > 0); // Only show if they have events
}

/**
 * Get upcoming public events for a specific LeapSpace.
 */
export function getLeapSpaceEvents(communityId: string): Event[] {
  return mockEvents.filter(e => {
    const eCommunityId = e.parentCommunityId || (e.communityName ? communityNameToId[e.communityName] : null);
    return eCommunityId === communityId
      && e.status !== 'draft'
      && e.status !== 'cancelled'
      && e.isPublic
      && (e.status === 'upcoming' || e.lifecycleStage === 'live');
  });
}

function getLeapSpaceEventCount(communityId: string): number {
  return getLeapSpaceEvents(communityId).length;
}

/**
 * Check if an event belongs to any of the user's LeapSpaces.
 */
export function isEventInUserLeapSpaces(event: Event, userEmail: string): boolean {
  const memberIds = getUserLeapSpaceIds(userEmail);
  const eCommunityId = event.parentCommunityId || (event.communityName ? communityNameToId[event.communityName] : null);
  // Standalone events (no community) are always shown in Zone 1
  if (!eCommunityId) return true;
  return memberIds.has(eCommunityId);
}

/**
 * Get the LeapSpace name for an event (returns null for standalone events).
 */
export function getEventLeapSpaceName(event: Event): string | null {
  if (event.communityName) return event.communityName;
  if (event.parentCommunityId) {
    const ls = allLeapSpaces.find(l => l.id === event.parentCommunityId);
    return ls?.name || null;
  }
  return null;
}
