# LeapSpace Roles

## Purpose

List roles and permissions, create custom roles, and edit custom roles.

## Current backend support

Strong.

## Field Table

| Field / capability | Control | Web now | Current API support | Current API shape | Proposed future API shape | EVENTS now | COURSES / COMMUNITIES later | Notes |
|---|---|---|---|---|---|---|---|---|
| List roles | list | not specialized yet | yes | `GET /access-control` | keep current | event admin delegation source | parent-scope RBAC for communities/courses | supported now |
| View permission bundle | expandable list | not specialized yet | yes | each role has `permissions[]` | keep current | event governance source | future child-scope inheritance | supported now |
| Create custom role | form | no real UI yet | yes | `POST /access-control` with `roleName`, `permissions[]` | keep current | event admin delegation source | future child-scope RBAC | supported now |
| Edit custom role permissions | multi-select diff | no real UI yet | yes | `PUT /access-control` with `roleId`, `addedPermissions[]`, `removedPermissions[]` | keep current | event governance source | community/course inheritance | supported now |
| Rename role | form action | no separate flow yet | partial | no rename-only field; update endpoint changes perms only | add rename support if needed | governance clarity | governance clarity | likely missing now |
| Delete role | action | no | no | none | add delete role endpoint | governance cleanup | governance cleanup | missing now |
| Permission catalog | list | no dedicated UI yet | partial | permissions returned only through roles | add catalog endpoint if needed | event governance | cross-resource governance | may need backend help |

## Current endpoints

1. `GET /api/leapspaces/{leapspaceId}/access-control`
2. `POST /api/leapspaces/{leapspaceId}/access-control`
3. `PUT /api/leapspaces/{leapspaceId}/access-control`
4. `GET /api/leapspaces/{leapspaceId}/grants`

### GET response item

1. `role`
2. `roleDefinitionId`
3. `permissions[]`

### POST request

1. `roleName`
2. `permissions[]`

### PUT request

1. `roleId`
2. `addedPermissions[]`
3. `removedPermissions[]`

### Grants endpoint

`GET /api/leapspaces/{leapspaceId}/grants`

Use this to gate whether the user can open/create/edit roles.

## Immediate design requirement

This is explicitly required by backend/API team and should be designed against exact request/response schema.
