# Global Profile Basics

## Purpose

Global default identity fields shared across LeapSpace unless a scoped profile overrides them.

## Current backend support

1. `GET /api/profile`
2. `PUT /api/profile`
3. `POST /api/media/image_upload`

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Full name | text | yes | yes | `/api/profile` -> `name` | keep in `/api/profile` or `/api/profile/identity` | organizer name, speaker name | instructor/member primary identity | already supported |
| Preferred name | text | yes | no | not in schema | add `preferredName` to profile identity model | friendlier event cards | community/course display preferences | should not overwrite legal/account name |
| Professional headline | text | yes | no | not in schema | add `headline` | host credibility, event discovery | course author/member expertise | high-value field missing now |
| Primary location | text | yes | no | not in schema | add `location` and later structured location object if needed | event organizer context | community directory / cohort matching | keep simple first |
| Short bio | textarea | yes | yes | `/api/profile` -> `bio` | keep in profile | event host and speaker summary | instructor/member intro | already supported |
| Personal website | text | yes | no | not in schema | add `websiteUrl` | event presenter credibility | portfolio/member trust | URL validation needed |
| Avatar | upload/action | yes | partial | `/api/profile.avatarId`, `/api/media/image_upload` -> `id`, `uploadUrl` | keep current upload flow | organizer/speaker avatar | instructor/member avatar | backend already sufficient |
| Banner / cover image | upload/action | yes | no | no banner field in profile | add `bannerImageId` | profile depth for event-facing profile | richer community/course profile | future field |

## Current request/response mapping

### Read profile
`GET /api/profile`

Response fields usable here now:

1. `id`
2. `name`
3. `bio`
4. `avatarId`
5. `profilePicUrl`
6. `email`
7. `phone`
8. `role`

### Update profile
`PUT /api/profile`

Current allowed request fields:

1. `name`
2. `bio`
3. `avatarId`
4. `email`
5. `phone`

Important:
Only `name`, `bio`, and `avatarId` from this page should use the current endpoint.
Do not send unsupported fields until backend adds them.

### Upload avatar
`POST /api/media/image_upload`

Request:

1. `fileName`

Response:

1. `id`
2. `uploadUrl`

Then store returned `id` into `avatarId` on `PUT /api/profile`.

## Future API recommendation

Recommended profile identity contract:

1. extend `GET /api/profile`
2. extend `PUT /api/profile`

Suggested future fields:

1. `preferredName`
2. `headline`
3. `location`
4. `websiteUrl`
5. `bannerImageId`

## Page design direction

1. Keep it editable and light
2. Do not include billing/security here
3. Show inheritance note that LeapSpace profiles may override selected fields
4. If backend is missing fields, show them in local/prototype state with explicit integration notes
