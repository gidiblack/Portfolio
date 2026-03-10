## Plan: Express + Mongo Portfolio Modernization (DRAFT)

You’ll modernize in an incremental, low-regression way: keep your current design/CSS and migrate the static pages into Express-rendered templates first, then move editable content into MongoDB, and finally add a secure admin for the exact sections you selected (projects, hero/about/services, social links, resume upload). This path gives you production-ready backend skills (Node, Express, Mongo, auth, uploads) without risking a full redesign. It also keeps your portfolio online quickly while you add capabilities in phases. Key decision fit: server-rendered pages + single-admin auth + single deploy target.

**Steps**

1. Bootstrap backend foundation with Express, Mongo connection, environment config, logging, security middleware, and static asset serving that preserves current paths from [index.html](../../index.html), [hireme.html](../../hireme.html), and [assets](../../assets).
2. Create template architecture in views by extracting shared structure from [index.html](../../index.html#L1-L41) and [hireme.html](../../hireme.html#L1-L40) into layout/partials while preserving DOM classes used by [assets/css/style.css](../../assets/css/style.css) and [assets/js/app.js](../../assets/js/app.js).
3. Migrate pages to server-rendered routes (`/` and `/hireme`) with parity-first rendering of existing sections from [index.html](../../index.html#L43-L247) and [hireme.html](../../hireme.html#L42-L143), including existing AOS attributes and nav behavior.
4. Define Mongo models for singleton and collection content domains: Hero, About, Services, Projects, SocialLinks, ResumeAsset, based on blocks in [index.html](../../index.html#L22-L260) and [hireme.html](../../hireme.html#L31-L154).
5. Implement read-only data hydration into public templates in this order: hero → about → services → social/resume → projects, with graceful fallbacks to seeded defaults.
6. Build admin auth (single-account login) with hashed password, secure cookie-based JWT session, rate limiting, and protected admin routes for all selected domains.
7. Build admin CRUD pages for projects/services/social and edit forms for hero/about; keep form outputs aligned to existing public markup to avoid CSS regressions.
8. Add resume upload workflow (PDF-only, size-limited, randomized filename, safe storage), replacing hardcoded resume link from [hireme.html](../../hireme.html#L31) with DB-backed URL.
9. Add input validation and output safety (server-side validation + escaping) for all admin-managed fields; include CSRF protection for cookie-authenticated form posts.
10. Replace deprecated/unused frontend behavior only after parity is stable (for example, remove unused validator include in [hireme.html](../../hireme.html#L161) if no longer needed).
11. Prepare deployment for single Node service (Render/Railway/Fly): env vars, Mongo URI, upload persistence strategy, health route, and production startup scripts.
12. Update project documentation in [README.md](../../README.md) with setup, env variables, admin bootstrap, local run steps, and deploy instructions.

**Verification**

- Visual parity checks on `/` and `/hireme` against current static output (desktop + mobile nav + scroll-top + AOS behaviors from [assets/js/app.js](../../assets/js/app.js)).
- CRUD smoke tests for each admin section: create/edit/delete/publish ordering and immediate public-page reflection.
- Security checks: invalid login throttling, protected route access without auth, CSRF form rejection, and upload rejection for non-PDF/oversized files.
- Deployment dry run with production env values and Mongo connectivity.

**Decisions**

- Chose incremental SSR migration over full rewrite to minimize breakage while adding backend credibility.
- Chose cookie-based JWT session for single-admin simplicity with stronger browser-side security than localStorage tokens.
- Chose phase-1 CMS scope limited to high-impact portfolio content to keep delivery focused and resume-worthy.
