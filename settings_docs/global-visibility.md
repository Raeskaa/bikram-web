# Global Visibility

## Purpose

Global visibility defaults for the user profile.
These are not LeapSpace-specific anonymity controls.

## Current backend support

No dedicated visibility API exists today.

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Profile visibility | select | yes | no | none | add `profileVisibility` | event-facing profile visibility defaults | community/course directory defaults | options currently: members only, connections only, public |
| Show company on global profile | toggle | yes | no | none | add `showCompany` | host credibility | instructor/member trust | global default only |
| Show location on global profile | toggle | yes | no | none | add `showLocation` | event context | community/campus/local discovery | global default only |
| Show social links | toggle | yes | no | none | add `showSocialLinks` | event profile cards | course/community member cards | future |
| Allow member search discovery | toggle | yes | no | none | add `searchDiscoverability` | event matching and host discovery | community member search | future |
| Use profile for recommendations | toggle | yes | no | none | add `recommendationSignals` | event suggestions | course/community recommendations | future |

## Backend note

This page is entirely product-valid but backend-missing today.

## Recommended future endpoint

Either:

1. extend `PUT /api/profile`

or:

2. create `GET/PUT /api/profile/visibility`

Recommended fields:

1. `profileVisibility`
2. `showCompany`
3. `showLocation`
4. `showSocialLinks`
5. `searchDiscoverability`
6. `recommendationSignals`

## Design note

1. Keep explicit explainer: billing/security do not belong here
2. Keep explicit explainer: anonymity belongs to LeapSpace Profile, not global visibility
