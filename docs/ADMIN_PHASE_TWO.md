# Phase Two admin handoff

The admin interface lives at `/admin` and is deliberately provider-agnostic. The current public site is deployed to GitHub Pages as static files, so the secure API, user sessions, database, media storage, and rebuild hook must be hosted separately in Phase Two.

## What is ready

- A responsive dashboard for parish news, celebrations, blog stories, and photographs.
- Bilingual Amharic/English fields and multi-photo selection.
- Browser-only draft saving while the API is disconnected.
- A secure sign-in screen and session check that activate automatically when `PUBLIC_ADMIN_API_URL` is present.
- Typed content, media, and session contracts in `src/lib/admin/types.ts`.
- One API client in `src/lib/admin/client.ts`; the UI does not depend on a particular database or cloud vendor.
- Existing public news is already driven by the `parishUpdates` Astro content collection.

## Environment

Set this public build variable to the origin of the deployed API:

```env
PUBLIC_ADMIN_API_URL=https://admin-api.example.org
```

This value is visible in browser JavaScript. Never place a database password, storage secret, private API token, or signing key in a `PUBLIC_*` variable.

The API must allow credentialed requests from the public website origin and use secure, `HttpOnly`, `SameSite` cookies for sessions. Authorization must be enforced on every write route; hiding `/admin` is not security.

## API contract

All successful responses are JSON except a successful sign-out, which may return `204 No Content`. Errors use `{ "message": "Human-readable message" }`.

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/v1/admin/session` | Sign in with `{ email, password }`; set the session cookie; return `AdminSession`. |
| `GET` | `/v1/admin/session` | Return the current `AdminSession`; return `401` when signed out. |
| `DELETE` | `/v1/admin/session` | Revoke the current session. |
| `GET` | `/v1/admin/content` | Return `{ items, total }` using `AdminContentRecord`. |
| `POST` | `/v1/admin/content` | Create a draft or published item from `AdminContentInput` plus `status`. |
| `PATCH` | `/v1/admin/content/:id` | Update an existing item and its status. |
| `DELETE` | `/v1/admin/content/:id` | Archive an item; avoid permanent deletion by default. |
| `POST` | `/v1/admin/media` | Accept multipart fields `files`, `altEnglish`, and `altAmharic`; return an array of `AdminMediaAsset`. |

When an item is published, the API should persist it and then trigger the site’s GitHub Actions deployment. The build-time content loader can then read the records from the chosen CMS/database adapter. Until that adapter is added, the existing Markdown collection remains the public source of truth.

## Phase Two activation checklist

1. Choose the API/database/media host and create separate production and staging environments.
2. Add admin accounts with strong passwords and password reset; prefer MFA for administrators.
3. Implement the routes above, role checks, rate limits, CSRF protection, audit logging, image validation, and backups.
4. Add the CMS/database loader beside the existing Markdown loader and map its records to the same public content shape.
5. Configure `PUBLIC_ADMIN_API_URL`, allowed origins, the GitHub Actions rebuild webhook, and media CDN domain.
6. Test draft, publish, update, archive, session expiry, image upload, Amharic text, and rollback before enabling the dashboard for parish staff.
