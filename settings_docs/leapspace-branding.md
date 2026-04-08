# LeapSpace Branding

## Purpose

Tenant visual identity and base theming.

## Current backend support

Partial but real.

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Logo | upload | generic placeholder now | yes | `logoId` on LeapSpace settings + `/api/media/image_upload` | keep current | event headers can inherit | course/community branding inherit | supported now |
| Theme | color/style controls | generic placeholder now | partial | `theme` exists but untyped/opaque | type the `theme` object | event visual inheritance | course/community theming | backend shape needs definition |
| Name as brand label | text | generic placeholder now | yes | `name` | keep current | event tenant label | parent label for communities/courses | supported now |
| Hero / cover imagery | upload | no real backend yet | no | none | extend theme or add `coverImageId` | event landing inheritance | community/course branding | future |

## Current endpoints

1. `GET /api/leapspaces/{leapspaceId}`
2. `PUT /api/leapspaces/{leapspaceId}`
3. `POST /api/media/image_upload`

## Design note

Branding should be treated as the parent visual layer that Events use now and Communities/Courses will inherit later.
