# LeapSpace Profile

## Purpose

Scoped member identity and privacy layer for one LeapSpace.

## Current backend support

No dedicated LeapSpace member-profile override endpoint exists today.

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Display name in this LeapSpace | text | yes | no | none | `GET/PUT /api/leapspaces/{leapspaceId}/my-profile` | event host/member identity inside tenant | community/course member identity | scoped override |
| Codename / alternate name | text | yes | no | none | add `codename` | pseudonymous event participation | pseudonymous community participation | important product rule |
| Role title | text | yes | no | none | add `roleTitle` | event-facing tenant role display | community/course role display | separate from RBAC role definition |
| Profile photo mode | select | yes | no | none | add `profilePhotoMode` and `avatarOverrideId` | event cards inside tenant | community/course member cards | future |
| Override mode | select | yes | no | none | add `overrideMode` | determines inheritance | determines inheritance | future |
| Override scope | text | yes | no | none | add `overrideScope[]` or summary | event surface clarity | child-scope identity inheritance | future |
| Bio in this LeapSpace | textarea | yes | no | none | add `bio` | scoped event-facing bio | community/course scoped bio | future |
| Anonymous mode in this LeapSpace | toggle | yes | no | none | add `anonymousMode` | event participation privacy | community privacy | admins must not see hidden identity |
| Use codename instead of full identity | toggle | yes | no | none | add `useCodename` | event participation privacy | community privacy | future |
| Show role badge on profile | toggle | yes | no | none | add `showRoleBadge` | event host/member trust signal | community/course trust signal | future |
| Appear in member directory | toggle | yes | no | none | add `appearInDirectory` | event staffing/member lookup | community/course directory | future |
| Allow direct messages from members | toggle | yes | no | none | add `allowDirectMessages` | event networking | community/course networking | global default + leapspace override |
| Appear in search inside this LeapSpace | toggle | yes | no | none | add `appearInSearch` | event/member search inside tenant | community/course search inside tenant | future |
| Allow connection requests | toggle | yes | no | none | add `allowConnections` | event networking | community/course networking | future |
| Allow mentoring requests | toggle | yes | no | none | add `allowMentoring` | mentor-heavy event spaces | course/community mentoring | future |
| Allow collaboration requests | toggle | yes | no | none | add `allowCollaboration` | event collaboration | course/community collaboration | future |

## Recommended future endpoint

1. `GET /api/leapspaces/{leapspaceId}/my-profile`
2. `PUT /api/leapspaces/{leapspaceId}/my-profile`

Recommended response/request fields:

1. `displayName`
2. `codename`
3. `roleTitle`
4. `bio`
5. `avatarOverrideId`
6. `profilePhotoMode`
7. `overrideMode`
8. `anonymousMode`
9. `useCodename`
10. `showRoleBadge`
11. `appearInDirectory`
12. `allowDirectMessages`
13. `appearInSearch`
14. `allowConnections`
15. `allowMentoring`
16. `allowCollaboration`

## Design note

This page is central to the future model because it bridges global identity and tenant-scoped participation.
