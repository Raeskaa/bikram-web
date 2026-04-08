# LeapSpace Members

## Purpose

View members inside a LeapSpace.

## Current backend support

Strong for listing.
Missing for edit/remove flows.

## Field Table

| Field / capability | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Search members | search input | not specialized yet | yes | query `search` | keep current | find event-capable members | community/course membership search | supported now |
| Paginated member list | list | not specialized yet | yes | query `cursor`, `limit` | keep current | staffing/admin ops | child-scope access selection | supported now |
| Member id | read-only | no | yes | `id` | keep current | stable reference for event assignments later | stable member identity | supported now |
| Member name | read-only | no | yes | `name` | keep current | host/speaker selection | course/community identity | supported now |
| Member avatar | read-only | no | yes | `avatarId` | keep current | profile preview | directory preview | supported now |
| Member email | read-only | no | yes | `email` | keep current | admin communication | onboarding/admin | supported now |
| Member phone | read-only | no | yes | `phone` | keep current | support/admin | support/admin | supported now |
| Member role | badge | no | yes | `role` | keep current + richer role binding later | event admin source pool | child-scope governance source | supported now |
| Change member role | action | no | no | none | add `PATCH /api/leapspaces/{leapspaceId}/members/{memberId}` | event delegation source | community/course parent role control | missing now |
| Remove member | action | no | no | none | add `DELETE /api/leapspaces/{leapspaceId}/members/{memberId}` | tenant cleanup | community/course governance | missing now |

## Current endpoint

`GET /api/leapspaces/{leapspaceId}/members`

Query params:

1. `search`
2. `cursor`
3. `limit`

Response item fields:

1. `id`
2. `name`
3. `avatarId`
4. `email`
5. `phone`
6. `role`

## Immediate design requirement

This is one of the explicit screens requested by backend/API team and should be designed as a real admin page.
