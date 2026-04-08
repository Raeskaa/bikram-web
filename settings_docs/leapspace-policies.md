# LeapSpace Policies

## Purpose

Explicit governance rules and access behavior at tenant level.

## Current backend support

No dedicated policy endpoint exists today.
`GET /grants` only exposes effective permissions for current user.

## Field Table

| Field / capability | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Policy title / summary | text | generic placeholder now | no | none | `GET/PUT /api/leapspaces/{leapspaceId}/policies` | event governance inheritance | community/course governance inheritance | future |
| Actor + role + scope rules | structured editor | generic placeholder now | no | none | add structured policy objects | event admin permission logic | child-scope governance | future |
| Approval requirements | toggle/rules | generic placeholder now | no | none | add policy flags | event creation/invitation approvals later | community/course approvals | future |
| Default access rules | toggles | generic placeholder now | no | none | add defaults object | event setup defaults | community/course setup defaults | future |

## Related current endpoint

`GET /api/leapspaces/{leapspaceId}/grants`

This only tells the current user what they can do.
It does not model policies themselves.

## Recommended future endpoint

1. `GET /api/leapspaces/{leapspaceId}/policies`
2. `PUT /api/leapspaces/{leapspaceId}/policies`

## Design note

Policies should be designed as the parent governance layer that later affects Communities, Courses, and Events.
