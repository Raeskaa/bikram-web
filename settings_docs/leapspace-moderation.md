# LeapSpace Moderation

## Purpose

Tenant-level moderation tools for moderators and admins.

## Current backend support

No LeapSpace moderation endpoint exists today.

## Field Table

| Field / capability | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Community safety baseline | text | generic placeholder now | no | none | moderation settings endpoint | event moderation inheritance later | community moderation later | future |
| Report prioritization | filter/rules | generic placeholder now | no | none | moderation queue endpoint | event incidents later | community moderation queue | future |
| Section enabled | toggle | generic placeholder now | no | none | future moderation settings state | optional | optional | placeholder today |

## Recommended future endpoint

1. `GET /api/leapspaces/{leapspaceId}/moderation`
2. `PUT /api/leapspaces/{leapspaceId}/moderation`
3. `GET /api/leapspaces/{leapspaceId}/moderation-queue`

## Design note

This is future-facing and should eventually align with community moderation and event moderation models.
