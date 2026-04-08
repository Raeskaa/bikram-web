# LeapSpace Teams

## Purpose

Reusable groups of members for governance and operational assignment.

## Current backend support

No team API exists yet.

## Field Table

| Field / capability | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Team name | text | generic placeholder now | no | none | `GET/POST/PUT /api/leapspaces/{leapspaceId}/teams` | event staffing groups later | parent grouping for course/community access | future |
| Team description | textarea | generic placeholder now | no | none | add `description` | event ops teams | course/community ops teams | future |
| Members in team | member picker | no | no | none | add `memberIds[]` or nested members subresource | event host/admin groups | child-scope inherited groups | future |
| Team role bindings | role picker | no | no | none | add role linkage | event access bundles | child-scope governance | future |
| Enable/disable team | toggle | generic placeholder now | no | none | add status field | admin hygiene | governance hygiene | future |

## Recommended future endpoint

1. `GET /api/leapspaces/{leapspaceId}/teams`
2. `POST /api/leapspaces/{leapspaceId}/teams`
3. `PUT /api/leapspaces/{leapspaceId}/teams/{teamId}`
4. `DELETE /api/leapspaces/{leapspaceId}/teams/{teamId}`

## Design note

Teams should sit between members and roles and later become very important for Communities and Courses.
