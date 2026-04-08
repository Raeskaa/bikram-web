# My Account - Connected Accounts

## Purpose

Global sign-in and linked account providers.

## Current backend support

The current backend has tenant-scoped integrations, not a real user-level connected-auth-provider settings API.

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Google | toggle/status | yes | no | none | add user provider linkage endpoint | event/admin sign-in continuity | cross-product auth | future |
| LinkedIn | toggle/status | yes | no | none | add provider linkage or enrichment endpoint | event trust import | course/community profile enrichment | future |
| Microsoft | toggle/status | yes | no | none | add user provider linkage endpoint | org event admin workflows | enterprise usage later | future |
| GitHub | toggle/status | yes | no | none | add user provider linkage endpoint | dev-focused event identity | creator/community identity | future |

## Important distinction

These are not the same as LeapSpace integrations.

Current integration APIs are tenant-scoped:

1. `POST /api/integrations/onboarding`
2. `POST /api/integrations/oauth/{provider}`
3. `GET /api/integrations/oauth/callback/{provider}`
4. `GET /api/integrations/{installationId}/slack-channels`

Those belong under LeapSpace `Integrations`, not global connected accounts.

## Recommended future endpoint

1. `GET /api/account/connected-providers`
2. `POST /api/account/connected-providers/{provider}`
3. `DELETE /api/account/connected-providers/{provider}`

## Design note

Keep this page distinct from tenant integrations to avoid mixing account auth with workspace tooling.
