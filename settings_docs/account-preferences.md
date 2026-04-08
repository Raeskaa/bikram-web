# My Account - Preferences

## Purpose

Global app behavior and account-level defaults.

## Current backend support

No dedicated preferences endpoint exists today.

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Language | text/select | yes | partial metadata only | `GET /api/languages` returns available languages | add user preference endpoint storing `languageCode` | event language display/defaults | course/community locale defaults | split metadata from user preference |
| Region | select | yes | no | none | add `region` | event date/currency/market defaults | course/community locale defaults | future |
| Timezone | select | yes | partial | LeapSpace has timezone, user preference does not | add user `timezone` | event calendar, reminders | course deadlines/community scheduling | high priority |
| Theme preference | segmented | yes | no | none | add `themePreference` | event/admin UX consistency | cross-product theme | future |
| Default start page | select | yes | no | none | add `defaultStartPage` | events-first navigation now | future route to communities/courses | future |

## Backend dependencies

### Available metadata
`GET /api/languages`

Useful fields:

1. `id`
2. `name`
3. `code`
4. `native_name`
5. `leapspace_id`

This is metadata, not the user preference state itself.

## Recommended future endpoint

1. `GET /api/account/preferences`
2. `PUT /api/account/preferences`

Recommended request/response fields:

1. `languageCode`
2. `region`
3. `timezone`
4. `themePreference`
5. `defaultStartPage`

## Design note

This page should be easy to wire later.
Keep its state isolated from global profile identity.
