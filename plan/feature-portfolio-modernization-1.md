---
goal: Express + Mongo Portfolio Modernization with Incremental SSR and Secure Admin CMS
version: 1.0
date_created: 2026-03-10
last_updated: 2026-03-10
owner: Portfolio Maintainer
status: Planned
tags: [feature, architecture, migration, security, deployment]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This plan defines a deterministic, low-regression migration from static HTML pages to an Express-rendered portfolio with MongoDB-backed editable content and a single-admin secure CMS. The implementation preserves current UI/CSS behavior, introduces backend capabilities in phases, and prepares one deployable Node service.

## 1. Requirements & Constraints

- **REQ-001**: Preserve visual/DOM parity for public routes `/` and `/hireme` against the current static implementation.
- **REQ-002**: Preserve all existing static asset paths and runtime behavior currently sourced from `assets/css/style.css` and `assets/js/app.js`.
- **REQ-003**: Implement server-side rendering for public pages using Express templates before introducing dynamic content editing.
- **REQ-004**: Persist editable content in MongoDB for domains: Hero, About, Services, Projects, SocialLinks, ResumeAsset.
- **REQ-005**: Implement single-admin authentication with secure cookie-based session and protected admin routes.
- **REQ-006**: Implement CMS operations for projects/services/social links and edit forms for hero/about.
- **REQ-007**: Implement resume upload with PDF-only acceptance, file-size limits, randomized file names, and safe storage.
- **REQ-008**: Add server-side validation and output-safe rendering for all admin-managed content.
- **REQ-009**: Add deployment readiness for one Node service with environment configuration and health endpoint.
- **REQ-010**: Update repository documentation with setup, environment, bootstrap, and deployment instructions.
- **SEC-001**: Hash admin password using a strong one-way algorithm (bcrypt) with configurable cost factor.
- **SEC-002**: Use `HttpOnly`, `Secure` (production), and `SameSite` cookie settings for session token transport.
- **SEC-003**: Enforce rate limiting on authentication endpoints.
- **SEC-004**: Enforce CSRF protection on all cookie-authenticated POST/PUT/PATCH/DELETE form submissions.
- **SEC-005**: Reject non-PDF uploads and files exceeding configured max size.
- **SEC-006**: Authorize every admin route with a middleware gate.
- **CON-001**: No redesign: existing CSS classes, layout structure, and section ordering must be preserved.
- **CON-002**: Migration sequence is mandatory: SSR parity first, then data hydration, then admin CRUD.
- **CON-003**: Existing public links and route paths must remain stable.
- **GUD-001**: Apply minimal, focused file changes and avoid unrelated refactors.
- **GUD-002**: Maintain deterministic seed defaults to ensure non-empty public pages on first boot.
- **PAT-001**: Follow layered architecture: routes → controllers/services → models → views.
- **PAT-002**: Use schema-driven validation and centralized error handling middleware.

## 2. Implementation Steps

### Implementation Phase 1

- **GOAL-001**: Establish backend foundation and SSR parity while preserving existing frontend behavior.

| Task     | Description                                                                                                                                                                                                                              | Completed | Date |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-001 | Initialize Node project with `express`, `mongoose`, `dotenv`, `helmet`, `morgan`, `cookie-parser`, and static file serving from existing `assets/` directory. Create `server.js`, `src/app.js`, `src/config/env.js`, `src/config/db.js`. |           |      |
| TASK-002 | Create view engine structure with `views/layouts/main`, `views/partials/{head,nav,footer,scripts}` and preserve classes/attributes from `index.html` and `hireme.html`.                                                                  |           |      |
| TASK-003 | Implement parity routes `GET /` and `GET /hireme` in `src/routes/public.routes.js` with SSR templates `views/pages/home` and `views/pages/hireme`.                                                                                       |           |      |
| TASK-004 | Keep JavaScript behavior parity by including existing `assets/js/app.js` and current vendor bundles in SSR templates without changing script order.                                                                                      |           |      |
| TASK-005 | Add baseline observability and health endpoint: `GET /health` returns `{status:"ok"}` in `src/routes/health.routes.js`.                                                                                                                  |           |      |
| TASK-006 | Validate parity by screenshot/manual diff checklist: desktop/mobile nav, AOS attributes, scroll-to-top behavior, and section rendering parity.                                                                                           |           |      |

### Implementation Phase 2

- **GOAL-002**: Introduce MongoDB content model and deterministic read-only hydration with fallback seed data.

| Task     | Description                                                                                                                                                              | Completed | Date |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ---- |
| TASK-007 | Create Mongoose schemas: `Hero`, `About`, `Service`, `Project`, `SocialLink`, `ResumeAsset` in `src/models/` with explicit required fields and display-order attributes. |           |      |
| TASK-008 | Create deterministic seed module `src/seeds/defaultContent.js` and bootstrap command to insert defaults when collections are empty.                                      |           |      |
| TASK-009 | Build read services `src/services/content.service.js` that hydrate domains in required order: hero → about → services → social/resume → projects.                        |           |      |
| TASK-010 | Wire hydration into public controllers `src/controllers/public.controller.js` and pass normalized view models to `home` and `hireme` templates.                          |           |      |
| TASK-011 | Implement fallback behavior: on missing DB records, render seed defaults; on DB errors, render safe static fallback with non-500 response where possible.                |           |      |
| TASK-012 | Verify data parity by comparing seeded output against existing static content sections and link targets.                                                                 |           |      |

### Implementation Phase 3

- **GOAL-003**: Implement secure single-admin authentication and protected CMS management routes.

| Task     | Description                                                                                                                                                                           | Completed | Date |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-013 | Create auth config and admin bootstrap command `src/scripts/createAdmin.js` to store one hashed admin credential in MongoDB.                                                          |           |      |
| TASK-014 | Implement auth routes/controllers: `GET /admin/login`, `POST /admin/login`, `POST /admin/logout` in `src/routes/admin.auth.routes.js` and `src/controllers/admin.auth.controller.js`. |           |      |
| TASK-015 | Implement cookie JWT session middleware in `src/middleware/auth.middleware.js` enforcing `HttpOnly`, `SameSite=Lax/Strict`, and `Secure` in production.                               |           |      |
| TASK-016 | Add rate limiting middleware to login endpoint using `express-rate-limit` with deterministic window/max values from env configuration.                                                |           |      |
| TASK-017 | Add CSRF middleware and hidden form token integration for all admin form templates.                                                                                                   |           |      |
| TASK-018 | Gate all `/admin/*` content routes with auth middleware and validate unauthenticated requests redirect to `/admin/login`.                                                             |           |      |

### Implementation Phase 4

- **GOAL-004**: Deliver admin CMS CRUD/edit workflows aligned to existing public markup requirements.

| Task     | Description                                                                                                                               | Completed | Date |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-019 | Create admin dashboard route `GET /admin` and section pages in `views/admin/` for hero/about/services/projects/social/resume.             |           |      |
| TASK-020 | Implement Hero/About singleton edit handlers (`GET` + `POST/PATCH`) with strict field validation and sanitized persistence.               |           |      |
| TASK-021 | Implement Services CRUD with deterministic ordering fields and publish flags in `src/routes/admin.services.routes.js`.                    |           |      |
| TASK-022 | Implement Projects CRUD with deterministic ordering, technology tags, links, and image metadata in `src/routes/admin.projects.routes.js`. |           |      |
| TASK-023 | Implement Social Links CRUD with allowed platform set validation and URL validation in `src/routes/admin.social.routes.js`.               |           |      |
| TASK-024 | Ensure all admin-managed values map directly to existing public template blocks to prevent CSS/DOM regressions.                           |           |      |

### Implementation Phase 5

- **GOAL-005**: Add secure resume upload pipeline and production deployment readiness.

| Task     | Description                                                                                                                                                           | Completed | Date |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---- |
| TASK-025 | Implement upload endpoint in `src/routes/admin.resume.routes.js` using `multer` memory/disk strategy with MIME+extension PDF enforcement and size limit env var.      |           |      |
| TASK-026 | Store uploaded file under deterministic storage root `uploads/resume/` with randomized filename and metadata persistence in `ResumeAsset`.                            |           |      |
| TASK-027 | Replace hardcoded resume URL rendering in hire-me page with DB-backed `ResumeAsset.currentUrl` fallback to seeded/default placeholder.                                |           |      |
| TASK-028 | Configure deployment scripts in `package.json`: `start`, `dev`, `seed`, `create-admin`; define required environment variables in `.env.example`.                      |           |      |
| TASK-029 | Add production readiness middleware and behavior checks: trust proxy (when required), secure cookies, health route, and startup failure on missing required env vars. |           |      |
| TASK-030 | Update `README.md` with complete local setup, admin bootstrap, seed workflow, and deployment steps for Render/Railway/Fly.                                            |           |      |

## 3. Alternatives

- **ALT-001**: Full SPA rewrite (React/Vue + API) was rejected due to higher migration risk and unnecessary UI regression exposure.
- **ALT-002**: Headless CMS integration (Sanity/Strapi) was rejected to keep scope focused on backend skill demonstration in one repository.
- **ALT-003**: Token storage in browser localStorage was rejected in favor of cookie transport to reduce XSS token exposure risk.
- **ALT-004**: Immediate dynamic-content-first migration was rejected; parity-first SSR is required to de-risk rollout.

## 4. Dependencies

- **DEP-001**: Node.js LTS runtime (>= 20).
- **DEP-002**: MongoDB database (Atlas or local instance).
- **DEP-003**: NPM packages: `express`, `mongoose`, `dotenv`, `helmet`, `morgan`, `cookie-parser`, `jsonwebtoken`, `bcrypt`, `express-rate-limit`, `csurf` (or maintained equivalent), `multer`, validation library (`zod` or `joi`).
- **DEP-004**: Existing frontend assets in `assets/` must remain available unchanged during migration.

## 5. Files

- **FILE-001**: `server.js` — process bootstrap and HTTP server start.
- **FILE-002**: `src/app.js` — middleware stack, routes, error handlers.
- **FILE-003**: `src/config/env.js` and `src/config/db.js` — env validation and DB connection.
- **FILE-004**: `src/models/*.js` — content and admin schemas.
- **FILE-005**: `src/routes/public.routes.js`, `src/routes/admin*.routes.js`, `src/routes/health.routes.js` — route registration.
- **FILE-006**: `src/controllers/*.js` and `src/services/content.service.js` — request logic and hydration orchestration.
- **FILE-007**: `src/middleware/{auth,csrf,validation,error}.js` — security and validation layers.
- **FILE-008**: `views/layouts/*.ejs`, `views/partials/*.ejs`, `views/pages/{home,hireme}.ejs`, `views/admin/*.ejs` — SSR and admin templates.
- **FILE-009**: `src/seeds/defaultContent.js` and `src/scripts/createAdmin.js` — initialization workflows.
- **FILE-010**: `.env.example`, `package.json`, `README.md` — runtime config and documentation.

## 6. Testing

- **TEST-001**: Public route parity test: verify `GET /` and `GET /hireme` return `200` and include all expected section anchors/classes.
- **TEST-002**: Content hydration test: empty DB triggers seed fallback rendering without runtime errors.
- **TEST-003**: Auth test: valid login sets secure cookie; invalid login throttles after configured attempts.
- **TEST-004**: Authorization test: unauthenticated access to `/admin` and child routes is denied/redirected.
- **TEST-005**: CSRF test: missing/invalid CSRF token on admin form POST is rejected.
- **TEST-006**: CRUD tests: create/update/delete for projects/services/social reflect on public page after persistence.
- **TEST-007**: Upload tests: accept valid PDF under size limit; reject non-PDF and oversized files.
- **TEST-008**: Deployment smoke test: app boots with production env vars, connects MongoDB, and returns healthy `GET /health`.

## 7. Risks & Assumptions

- **RISK-001**: SSR extraction may break selector-dependent JS behavior if DOM structure deviates from current static HTML.
- **RISK-002**: Managed host ephemeral storage may invalidate uploaded resume persistence if durable storage is not configured.
- **RISK-003**: CSRF integration can break forms if token propagation is incomplete across all admin templates.
- **RISK-004**: Dependency maintenance risk for CSRF package choice; use actively maintained implementation.
- **ASSUMPTION-001**: Single-admin use case remains valid; no role-based access control required in this phase.
- **ASSUMPTION-002**: Existing frontend asset files stay unchanged during backend migration.
- **ASSUMPTION-003**: MongoDB availability and credentials are provided in all environments.
- **ASSUMPTION-004**: Current content model scope (hero/about/services/projects/social/resume) is sufficient for phase-1 CMS.

## 8. Related Specifications / Further Reading

- Existing draft source: `.github/plans/portfolioModernization.plan.md`
- Current static pages: `index.html`, `hireme.html`
- Current frontend behavior: `assets/js/app.js`
- MongoDB + Mongoose docs: https://mongoosejs.com/docs/
- Express security best practices: https://expressjs.com/en/advanced/best-practice-security.html
