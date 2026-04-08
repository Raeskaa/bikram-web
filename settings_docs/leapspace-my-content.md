# LeapSpace My Content

## Purpose

Creator-oriented defaults for content operations within a LeapSpace.

## Current backend support

No direct tenant content-defaults endpoint exists today.

## Field Table

| Field / capability | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Review before publish | toggle/rule | generic placeholder now | no | none | content defaults endpoint | event publishing workflows | course/community publishing workflows | future |
| Connected content tools summary | list | generic placeholder now | partial via integrations | integrations endpoints only | tie to tenant integrations | event creation ops | course/community creation ops | future |
| Operational notes | textarea | generic placeholder now | no | none | add notes/defaults endpoint | creator productivity | creator productivity across modules | future |

## Recommended future endpoint

1. `GET /api/leapspaces/{leapspaceId}/content-defaults`
2. `PUT /api/leapspaces/{leapspaceId}/content-defaults`

## Design note

This page should eventually centralize creator defaults that first affect Events, then Courses and Communities.
