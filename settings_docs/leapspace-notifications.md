# LeapSpace Notifications

## Purpose

Per-LeapSpace notification overrides layered on top of global defaults.

## Current backend support

Only mobile push token registration exists today through `POST /api/users/fcm-tokens`.
No LeapSpace notification preference API exists yet.

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Mute LeapSpace | toggle | yes | no | none | `GET/PUT /api/leapspaces/{leapspaceId}/my-notification-settings` | event-related tenant noise control | community/course notifications | future |
| Mentions and replies | toggle | yes | no | none | add `mentions` | event/admin interactions | community/course activity | future |
| Direct messages from members | toggle | yes | no | none | add `directMessages` | event networking | community/course messaging | future |
| Mobile push notifications | toggle | yes | partial | `/api/users/fcm-tokens` stores token only | add actual notification preference state | event reminders | course/community push | token + preference are separate |
| Suppress @everyone and announcements | toggle | yes | no | none | add `suppressAnnouncements` | tenant-wide event noise | community broadcast control | future |
| Suppress role mentions | toggle | yes | no | none | add `suppressRoleMentions` | event staffing noise reduction | team/course/community roles later | future |
| Mute new event notifications | toggle | yes | no | none | add `muteEvents` | immediate event use case | later split by course/community objects | future |
| Inherit global defaults when no override exists | toggle | yes | no | none | add `inheritGlobalDefaults` | keeps event flows aligned | keeps future child scopes aligned | future |
| Digest frequency | select | yes | no | none | add `digestFrequency` | event digest | community/course digest | future |

## Existing support

### Register FCM token
`POST /api/users/fcm-tokens`

Request:

1. `fcmToken`

Response:

1. `success`

This is infrastructure support only, not settings state.

## Recommended future endpoint

1. `GET /api/leapspaces/{leapspaceId}/my-notification-settings`
2. `PUT /api/leapspaces/{leapspaceId}/my-notification-settings`

## Design note

This page should become a major downstream control surface for event reminders first, then community/course notifications.
