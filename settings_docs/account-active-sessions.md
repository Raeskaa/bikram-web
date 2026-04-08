# My Account - Active Sessions

## Purpose

Device/session awareness and session control.

## Current backend support

No active session management API exists in the current OpenAPI slice.

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Current session label | text | yes | no | none | read-only from session endpoint | admin safety for events | cross-product account safety | future |
| Current session details | text | yes | no | none | read-only from session endpoint | admin safety for events | cross-product safety | future |
| Trusted devices summary | text | yes | no | none | device endpoint needed | event admin security | cross-product security | future |
| Review devices | action | yes | no | none | `GET /api/account/sessions` | event admin safety | cross-product security | future |
| Revoke other sessions | action | yes | no | none | `DELETE /api/account/sessions/{sessionId}` or bulk revoke | account safety | cross-product security | future |

## Recommended future endpoint

1. `GET /api/account/sessions`
2. `DELETE /api/account/sessions/{sessionId}`
3. `POST /api/account/sessions/revoke-others`

## Design note

This page is operational security, not profile.
