# Global Professional Identity

## Purpose

Richer professional context for discovery, trust, matching, mentorship, and collaboration.

## Current backend support

Current API support is weak here.
Only a partial global profile object exists through `/api/profile`.

## Field Table

| Field | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| Current role / title | text | yes | partial | `role` is returned on `/api/profile` but not updateable as profile field | add `professionalTitle` | host/speaker positioning | instructor/member role label | distinguish app role vs profile title |
| Company / organization | text | yes | no | not in schema | add `company` | event trust signal | community/company identity | future |
| Industry | text | yes | no | not in schema | add `industry` | event matching/discovery | cohort and community discovery | future |
| Primary expertise | text | yes | no | not in schema | add `expertisePrimary` | event speaker tagging | course/community expertise graph | future |
| Skills and strengths | textarea | yes | no | not in schema | add `skills[]` or text first | event matching | course/community profile graph | array preferred eventually |
| Work experience summary | textarea | yes | no | not in schema | add `experienceSummary` then `experienceEntries[]` later | speaker authority | instructor authority | future |
| Education summary | textarea | yes | no | not in schema | add `educationSummary` then `educationEntries[]` later | credibility | instructor/member trust | future |
| Featured links | textarea | yes | no | not in schema | add `featuredLinks[]` | external proof for event hosts | portfolio trust in communities/courses | array preferred |

## Current backend reality

The current backend does not expose a real professional identity model.
Do not pretend these are supported by `/api/profile` today.

## Proposed future API shape

Recommended additions to profile domain:

1. `professionalTitle`
2. `company`
3. `industry`
4. `expertisePrimary`
5. `skills`
6. `experienceSummary`
7. `educationSummary`
8. `featuredLinks`

Recommended longer-term structured objects:

1. `experienceEntries[]`
2. `educationEntries[]`
3. `certifications[]`
4. `awards[]`

## Page design direction

1. This page should feel like a real professional profile editor, not account settings
2. This page should feed event host/speaker trust surfaces first
3. Later it should become the canonical source for course instructor and community member expertise display
