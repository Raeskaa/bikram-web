# LeapSpace Overview

## Purpose

Core tenant identity and baseline workspace information.

## Current backend support

Strong.

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| LeapSpace name | text | generic placeholder now | yes | `/api/leapspaces/{leapspaceId}` -> `name` | keep current | event tenant identity | parent identity for community/course | supported now |
| Description | textarea | generic placeholder now | yes | `/api/leapspaces/{leapspaceId}` -> `description` | keep current | event tenant context | parent description | supported now |
| Language | select | not explicit in UI yet | yes | `languageCode` on settings response/update | keep current | event default locale | future community/course locale | supported now |
| Timezone | select | not explicit in UI yet | yes | `timezone` on settings response/update | keep current | event scheduling baseline | course/community scheduling | supported now |
| Is default | read-only | implicit | yes | `isDefault` on response | keep read-only | tenant switching | tenant switching | supported now |

## Current endpoints

### Read settings
`GET /api/leapspaces/{leapspaceId}`

Response:

1. `id`
2. `name`
3. `description`
4. `languageCode`
5. `timezone`
6. `logoId`
7. `theme`
8. `isDefault`

### Update settings
`PUT /api/leapspaces/{leapspaceId}`

Allowed request fields:

1. `name`
2. `description`
3. `languageCode`
4. `timezone`
5. `logoId`
6. `theme`

## Design note

This should be one of the first real admin screens wired to backend because the contract already exists.
