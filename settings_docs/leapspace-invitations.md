# LeapSpace Invitations

## Purpose

Invite members, view invitations, and cancel invitations.

## Current backend support

Strong.

## Field Table

| Field / capability | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Search invitations | search input | not specialized yet | yes | query `search` | keep current | event staffing pipelines | course/community onboarding | supported now |
| Invitation list | list | not specialized yet | yes | `GET /invitations` | keep current | event-related tenant onboarding | child-scope onboarding | supported now |
| Invite by email | form input | no real UI yet | yes | `POST /invitations.email` | keep current | event staffing source pool | course/community onboarding | supported now |
| Invite by phone | form input | no real UI yet | yes | `POST /invitations.phone` | keep current | onboarding flexibility | onboarding flexibility | supported now |
| Invitee name | form input | no real UI yet | yes | `POST /invitations.inviteeName` | keep current | clearer invite UX | clearer invite UX | supported now |
| Role definition id | picker | no real UI yet | yes | `POST /invitations.roleDefinitionId` | keep current | role-aware access into tenant | parent-scope access seeding | supported now |
| View status | status badge | no real UI yet | yes | list item `status` | keep current | invitation monitoring | onboarding monitoring | supported now |
| Cancel invitation | action | no real UI yet | yes | `PUT /invitations/{invitationId}` body `{ action: cancel }` | keep current | invite cleanup | onboarding cleanup | supported now |
| Resend invitation | action | no | no | none | add resend endpoint | admin efficiency | admin efficiency | missing now |
| Edit invitation role | action | no | no | none | add update invitation endpoint | admin efficiency | admin efficiency | missing now |

## Current endpoints

1. `GET /api/leapspaces/{leapspaceId}/invitations`
2. `POST /api/leapspaces/{leapspaceId}/invitations`
3. `PUT /api/leapspaces/{leapspaceId}/invitations/{invitationId}`

### Create request fields

1. `email`
2. `phone`
3. `roleDefinitionId`
4. `inviteeName`

### Create response fields

1. `invitationId`
2. `status`
3. `token`

### List item fields

1. `id`
2. `name`
3. `avatarId`
4. `email`
5. `phone`
6. `role`
7. `status`

## Immediate design requirement

This is explicitly requested by backend/API team and should be first-class.
