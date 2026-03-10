# Portfolio Modernization Verification Checklist (2026-03-10)

This checklist records implemented verification outcomes for remaining migration tasks.

## Public Parity & Routing

- [x] `GET /` returns `200` and renders SSR page using static-parity structure/classes.
- [x] `GET /hireme` returns `200` and renders SSR page using static-parity structure/classes.
- [x] Public assets load from `/assets/*` with expected vendor script order.
- [x] Footer social rendering uses icon markup consistent with static pages.

## Fallback Behavior

- [x] Public controller attempts DB hydration and seed fallback when records are missing.
- [x] On DB read failures, public pages render safe fallback content with non-500 response.
- [x] Legacy resume fallback URL normalization is applied for stale stored values.

## Auth / Security

- [x] Unauthenticated access to `/admin` redirects to `/admin/login`.
- [x] Login endpoint includes rate limiting.
- [x] CSRF token is required and included in admin POST forms.
- [x] Session cookie configured with `HttpOnly`, `SameSite`, and production `Secure` behavior.

## CMS CRUD & Validation

- [x] Hero/About update flows sanitize and validate input server-side.
- [x] Services create/update sanitize and validate title/description/order/published fields.
- [x] Projects create/update sanitize and validate text fields, order, technologies, and URLs.
- [x] Validation errors re-render admin forms with sanitized user input and error message.

## Resume Upload

- [x] `/admin/resume` route exists and is auth-protected.
- [x] Resume upload accepts PDF only (MIME + extension checks).
- [x] Upload size limit enforced via `RESUME_MAX_SIZE_BYTES`.
- [x] Uploaded file stored under `uploads/resume/` with randomized filename.
- [x] `ResumeAsset` metadata updated and used for download link rendering.

## Production Readiness

- [x] Required env validation enforces presence of `MONGODB_URI` and `SESSION_SECRET`.
- [x] Numeric env validation guards for rate-limit, bcrypt rounds, and upload size.
- [x] Optional strict proxy guard supported via `REQUIRE_TRUST_PROXY=true` in production.
- [x] Startup ensures `uploads/resume/` exists and is writable.
- [x] Health endpoint `/health` returns `{ "status": "ok" }`.
