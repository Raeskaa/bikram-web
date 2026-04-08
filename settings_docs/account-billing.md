# My Account - Billing

## Purpose

Global billing and subscription controls.

## Current backend support

No direct billing-settings endpoint exists in the current OpenAPI slice.

Related but not equivalent current APIs:

1. credits balance
2. credits history
3. credit packs
4. event ticket purchasing

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Current plan | text | yes | no | none | add billing account endpoint | not required for event tickets today | likely needed for tenant/community/course plans | future |
| Payment method | text | yes | no | none | add payment method summary | credits/tickets exist separately | broader monetization later | future |
| Billing email | text | yes | no | none | add `billingEmail` | receipt routing | tenant/course/community billing | future |
| Renewal date | text | yes | no | none | add `renewalDate` | subscription awareness | cross-product billing | future |
| Invoice delivery | textarea | yes | no | none | add invoice preferences | operations/finance routing | cross-product billing | future |

## Existing adjacent APIs

1. `GET /api/credits/balance`
2. `GET /api/credits/history`
3. `GET /api/credits/packs`

These support credits, not account billing management.

## Recommended future endpoint

1. `GET /api/account/billing`
2. `PUT /api/account/billing`

Later optional:

1. `GET /api/account/invoices`
2. `GET /api/account/payment-methods`
3. `POST /api/account/payment-methods`

## Design note

Billing should stay clearly separated from profile and LeapSpace Profile.
