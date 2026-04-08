# LeapSpace Audit Log

## Purpose

Operational history for tenant changes.

## Current backend support

No LeapSpace audit-log endpoint exists today.
There is only a generic `change-log-modules` helper and deeper event changed logs elsewhere.

## Field Table

| Field / capability | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| View audit entries | list | generic placeholder now | no | none | `GET /api/leapspaces/{leapspaceId}/changed-logs` | event changed logs are precedent | future community/course changed logs | future |
| Filter by actor | filter | no | no | none | add `user_id` query style like event changed logs | admin investigations | governance audit | future |
| Filter by module | filter | no | partial precedent | `GET /api/change-log-modules` | add leapspace changed logs endpoint | event precedent exists | cross-resource audit | future |
| See action type | badge | no | no | none | add `added/updated/deleted` style entries | admin investigations | governance audit | future |

## Relevant precedent

1. `GET /api/change-log-modules`
2. event changed log patterns in events API

## Recommended future endpoint

1. `GET /api/leapspaces/{leapspaceId}/changed-logs`

## Design note

Audit log is a future page, but it should mimic the event changed-log model because that is already a strong backend precedent.
