# LeapSpace Integrations

## Purpose

Tenant-scoped provider setup and operational integrations.

## Current backend support

Strong for onboarding flow, partial for installed-state management.

## Field Table

| Field / capability | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Start provider onboarding | action | generic placeholder now | yes | `POST /api/integrations/onboarding` with `providerKey` | keep current | event ops tooling | community/course tooling | supported now |
| Start OAuth connect | action | generic placeholder now | yes | `POST /api/integrations/oauth/{provider}` with `redirectUrl` | keep current | Slack/event admin flow | community/course automations | supported now |
| OAuth callback completion | system flow | implicit | yes | `GET /api/integrations/oauth/callback/{provider}` | keep current | install completion | install completion | supported now |
| Slack channel picker | picker | no real UI yet | yes | `GET /api/integrations/{installationId}/slack-channels` | keep current + save mapping endpoint later | event operations | community/course notifications | supported now |
| Installed integrations list | list | no | no | none | add `GET /api/integrations/installations` | event admin operations | cross-resource operations | missing now |
| Disconnect integration | action | no | no | none | add `DELETE /api/integrations/{installationId}` | event ops hygiene | future resource hygiene | missing now |
| Language availability | selector metadata | no real UX yet | yes | `GET /api/languages`, `POST /api/languages` | keep current | event locale setup | course/community locale setup | tenant-scoped support exists |

## Current endpoints

1. `POST /api/integrations/onboarding`
2. `POST /api/integrations/oauth/{provider}`
3. `GET /api/integrations/oauth/callback/{provider}`
4. `GET /api/integrations/{installationId}/slack-channels`
5. `GET /api/languages`
6. `POST /api/languages`

## Design note

This page should be real, not placeholder, because the backend already supports important parts of it.
