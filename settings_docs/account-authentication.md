# My Account - Authentication

## Purpose

Authentication, account security, session challenge behavior, and alerting.

## Current backend support

No auth-management endpoint is present in the current OpenAPI slice.

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Account email | text | yes | partial | `/api/profile.email` | separate account auth endpoint preferred | admin contact for event ops | account auth across product | avoid mixing with profile identity |
| Password state | text | yes | no | none | add read-only security summary | admin security awareness | cross-product security | derived field |
| Passkeys | text | yes | no | none | add passkey summaries | account security for event operators | cross-product security | future |
| Session challenge policy | text | yes | no | none | add `sessionChallengePolicy` | admin safety | cross-product safety | future |
| Two-factor authentication | toggle | yes | no | none | add `twoFactorEnabled` | stronger admin safety | cross-product security | future |
| Security alerts | toggle | yes | no | none | add `securityAlertsEnabled` | protects event operators | cross-product security | future |

## Recommended future endpoint

1. `GET /api/account/security`
2. `PUT /api/account/security`

Potential fields:

1. `accountEmail`
2. `passwordLastChangedAt`
3. `passkeysSummary`
4. `sessionChallengePolicy`
5. `twoFactorEnabled`
6. `securityAlertsEnabled`

## Design note

This page should look operational and trustworthy.
Do not place it under profile.
