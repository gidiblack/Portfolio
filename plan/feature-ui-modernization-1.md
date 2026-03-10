---
goal: Frontend-Only UI Modernization for Portfolio Public and Admin Interfaces
version: 1.0
date_created: 2026-03-10
last_updated: 2026-03-10
owner: Portfolio Maintainer
status: Planned
tags: [feature, ui, ux, frontend, accessibility, animation]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This plan defines a deterministic, frontend-only modernization of the admin UI and public pages to improve visual quality, consistency, and interaction while preserving the existing color scheme, logo assets, routes, and backend behavior.

## 1. Requirements & Constraints

- **REQ-001**: Apply a light gradient background to all admin pages using only existing palette values already present in the project styles.
- **REQ-002**: Redesign all admin forms and data tables to use consistent modern styling (spacing, radius, subtle shadows, hover/focus states).
- **REQ-003**: Keep admin pages cohesive across `login`, `dashboard`, `hero`, `about`, `services`, `service-form`, `projects`, `project-form`, `social`, `social-form`, and `resume`.
- **REQ-004**: Implement typing animation for homepage hero heading element `h1` inside `.home-header .hero` in `views/pages/home.ejs`.
- **REQ-005**: Add smooth hover animations to service and project cards in homepage sections `#services .service` and `#latest-works .project`.
- **REQ-006**: Preserve existing logo references and image assets (no file replacements under `assets/img/` or `assets/favicon/`).
- **SEC-001**: Do not modify any server-side code or logic in `server.js` and all files under `src/`.
- **SEC-002**: Do not change admin auth flow, route paths, CSRF fields, form actions, or input names.
- **CON-001**: Changes are limited to frontend assets and templates: `assets/sass/**`, `assets/css/style.css`, `assets/js/app.js`, and `views/**/*.ejs`.
- **CON-002**: No new third-party UI/animation library may be added; use CSS transitions/keyframes and vanilla JS/jQuery already loaded.
- **CON-003**: UI must be responsive for desktop and mobile breakpoints already used in current SASS files.
- **GUD-001**: Keep modifications minimal and stylistically consistent with existing SASS architecture (`helpers`, `basics`, `layout`, `pages`).
- **GUD-002**: Preserve accessibility by adding visible focus states, sufficient contrast, and motion-safe fallbacks.
- **PAT-001**: Use a reusable admin wrapper class pattern (`.admin-page`, `.admin-card`, `.admin-form`, `.admin-table`) across all admin templates.
- **PAT-002**: Implement animation behavior progressively; content remains fully readable when animation is disabled.

## 2. Implementation Steps

### Implementation Phase 1

- **GOAL-001**: Establish admin UI foundation and shared structure across all admin templates.

| Task     | Description                                                                                                                                                                                                                                                                                                                 | Completed | Date       |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- |
| TASK-001 | Create `assets/sass/4-pages/_page-admin.sass` and define shared admin styles: light gradient page background, card container, typography spacing, button variants, form controls, table container, and responsive behavior using existing color variables or existing hex colors already present in project styles.         | ✅        | 2026-03-10 |
| TASK-002 | Update `assets/sass/main.sass` to import `4-pages/page-admin` after existing page imports to ensure admin styles compile into `assets/css/style.css`.                                                                                                                                                                       | ✅        | 2026-03-10 |
| TASK-003 | Refactor admin templates to use consistent structural classes without changing backend bindings: add top-level `.admin-page` and `.admin-card` wrappers in `views/admin/login.ejs`, `views/admin/dashboard.ejs`, `views/admin/hero.ejs`, `views/admin/about.ejs`, and `views/admin/resume.ejs`.                             | ✅        | 2026-03-10 |
| TASK-004 | Refactor list and form admin templates to use reusable classes: `views/admin/services.ejs`, `views/admin/projects.ejs`, `views/admin/social.ejs`, `views/admin/service-form.ejs`, `views/admin/project-form.ejs`, `views/admin/social-form.ejs`; preserve all `action`, `method`, `_csrf`, and field `name` values exactly. | ✅        | 2026-03-10 |
| TASK-005 | Remove legacy presentation attributes such as `border="1"` and inline `style="display:inline"` from admin tables/forms; replace with semantic class-based styling and CSS utility selectors in `_page-admin.sass`.                                                                                                          | ✅        | 2026-03-10 |

### Implementation Phase 2

- **GOAL-002**: Modernize admin forms and tables for visual consistency, usability, and accessibility.

| Task     | Description                                                                                                                                                                                                                           | Completed | Date       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- |
| TASK-006 | Implement form styling rules in `assets/sass/4-pages/_page-admin.sass` for `input`, `textarea`, `select`, checkbox rows, labels, helper/error text, and primary/secondary action buttons with consistent spacing and rounded corners. |           |            |
| TASK-007 | Implement table styling rules in `assets/sass/4-pages/_page-admin.sass` for header background, row striping/hover, compact cell spacing, and mobile-safe horizontal scrolling via `.admin-table-wrap`.                                |           |            |
| TASK-008 | Add keyboard-accessible focus-visible styles for links, buttons, inputs, selects, and textareas on admin pages; ensure focus ring color derives from existing palette values.                                                         |           |            |
| TASK-009 | Add responsive breakpoints for admin actions and forms so controls stack correctly below `768px` and preserve readable tap targets on mobile.                                                                                         |           |            |
| TASK-010 | Ensure visual consistency of error/success message blocks in all admin templates by applying shared classes (for example `.admin-alert` variants) without changing server-rendered message logic.                                     |           |            |
| TASK-006 | Implement form styling rules in `assets/sass/4-pages/_page-admin.sass` for `input`, `textarea`, `select`, checkbox rows, labels, helper/error text, and primary/secondary action buttons with consistent spacing and rounded corners. | ✅        | 2026-03-10 |
| TASK-007 | Implement table styling rules in `assets/sass/4-pages/_page-admin.sass` for header background, row striping/hover, compact cell spacing, and mobile-safe horizontal scrolling via `.admin-table-wrap`.                                | ✅        | 2026-03-10 |
| TASK-008 | Add keyboard-accessible focus-visible styles for links, buttons, inputs, selects, and textareas on admin pages; ensure focus ring color derives from existing palette values.                                                         | ✅        | 2026-03-10 |
| TASK-009 | Add responsive breakpoints for admin actions and forms so controls stack correctly below `768px` and preserve readable tap targets on mobile.                                                                                         | ✅        | 2026-03-10 |
| TASK-010 | Ensure visual consistency of error/success message blocks in all admin templates by applying shared classes (for example `.admin-alert` variants) without changing server-rendered message logic.                                     | ✅        | 2026-03-10 |

### Implementation Phase 3

- **GOAL-003**: Add homepage interaction enhancements (typing + hover animations) aligned with current branding.

| Task     | Description                                                                                                                                                                                                                                 | Completed | Date       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------- |
| TASK-011 | Update `views/pages/home.ejs` hero heading to support typing animation by adding deterministic attributes: `id="hero-typing"`, `data-typing-text`, and optional `aria-live="polite"` while preserving existing fallback EJS text rendering. |           |            |
| TASK-012 | Extend `assets/js/app.js` with a scoped typing animation initializer that targets `#hero-typing`, reads `data-typing-text`, types once on page load, and exits safely when element is absent.                                               |           |            |
| TASK-013 | Add reduced-motion safeguard in `assets/js/app.js`: if `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true, render full hero text instantly and skip animation loop.                                                    |           |            |
| TASK-014 | Enhance `assets/sass/4-pages/_page-home.sass` for `#services .service` with smooth transform/shadow transitions, subtle elevation on hover/focus-within, and non-jarring duration/easing values.                                            |           |            |
| TASK-015 | Enhance `assets/sass/4-pages/_page-home.sass` for `#latest-works .project` and `.project-desc` with modern hover treatment (lift, overlay clarity, button reveal stability) while keeping content hierarchy readable.                       |           |            |
| TASK-011 | Update `views/pages/home.ejs` hero heading to support typing animation by adding deterministic attributes: `id="hero-typing"`, `data-typing-text`, and optional `aria-live="polite"` while preserving existing fallback EJS text rendering. | ✅        | 2026-03-10 |
| TASK-012 | Extend `assets/js/app.js` with a scoped typing animation initializer that targets `#hero-typing`, reads `data-typing-text`, types once on page load, and exits safely when element is absent.                                               | ✅        | 2026-03-10 |
| TASK-013 | Add reduced-motion safeguard in `assets/js/app.js`: if `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true, render full hero text instantly and skip animation loop.                                                    | ✅        | 2026-03-10 |
| TASK-014 | Enhance `assets/sass/4-pages/_page-home.sass` for `#services .service` with smooth transform/shadow transitions, subtle elevation on hover/focus-within, and non-jarring duration/easing values.                                            | ✅        | 2026-03-10 |
| TASK-015 | Enhance `assets/sass/4-pages/_page-home.sass` for `#latest-works .project` and `.project-desc` with modern hover treatment (lift, overlay clarity, button reveal stability) while keeping content hierarchy readable.                       | ✅        | 2026-03-10 |

### Implementation Phase 4

- **GOAL-004**: Align Hire Me page polish and final responsive consistency with modernization scope.

| Task     | Description                                                                                                                                                                    | Completed | Date |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ---- |
| TASK-016 | Refine `assets/sass/4-pages/_page-hireme.sass` spacing/containers to visually align with upgraded home/admin rhythm without introducing new color tokens or layout structures. |           |      |
| TASK-017 | Validate hover/focus behavior and mobile spacing for Hire Me navigation CTA and form iframe container (`#form-section`) to maintain consistent modern feel.                    |           |      |
| TASK-018 | Confirm no structural/content changes to questionnaire text, iframe source, or resume download logic in `views/pages/hireme.ejs`.                                              |           |      |

### Implementation Phase 5

- **GOAL-005**: Compile, verify, and produce deliverable mapping in required output format.

| Task     | Description                                                                                                                                                                          | Completed | Date |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ---- |
| TASK-019 | Compile SASS to CSS so all updates are reflected in `assets/css/style.css` and confirm no accidental edits outside allowed frontend files.                                           |           |      |
| TASK-020 | Execute manual viewport checks for `360px`, `768px`, `1024px`, and `1440px` widths on: home hero typing, services/projects hover states, all admin forms/tables, and hire-me layout. |           |      |
| TASK-021 | Produce implementation summary grouped by file changed with one-line description per file, covering only CSS/SASS, HTML (EJS), and frontend JavaScript changes.                      |           |      |
| TASK-022 | Verify excluded scope by confirming no diffs in `server.js` and `src/**`; if any exist, revert before final handoff.                                                                 |           |      |

## 3. Alternatives

- **ALT-001**: Introduce a new CSS framework for admin pages; rejected to avoid visual inconsistency and dependency bloat.
- **ALT-002**: Use GSAP/Anime.js for typing and hover animations; rejected because existing CSS/JS stack is sufficient and requirement limits scope.
- **ALT-003**: Rework admin pages into componentized partial system; rejected for this iteration because scope is visual modernization, not template architecture refactor.

## 4. Dependencies

- **DEP-001**: Existing SASS compilation workflow that generates `assets/css/style.css` from `assets/sass/main.sass`.
- **DEP-002**: Existing frontend runtime scripts in `assets/js/app.js` and `assets/js/vendors/jquery.min.js`.
- **DEP-003**: Existing color definitions in `assets/sass/1-helpers/_variables.sass` and currently used project palette values in page SASS files.

## 5. Files

- **FILE-001**: `assets/sass/main.sass` — add admin page import.
- **FILE-002**: `assets/sass/4-pages/_page-admin.sass` — new shared admin gradient/form/table system.
- **FILE-003**: `assets/sass/4-pages/_page-home.sass` — service/project hover interaction enhancements.
- **FILE-004**: `assets/sass/4-pages/_page-hireme.sass` — spacing and interaction consistency updates.
- **FILE-005**: `assets/css/style.css` — compiled output reflecting SASS changes.
- **FILE-006**: `assets/js/app.js` — hero typing animation and reduced-motion fallback.
- **FILE-007**: `views/pages/home.ejs` — hero `<h1>` typing attributes/hooks.
- **FILE-008**: `views/admin/login.ejs` — admin layout and form classes.
- **FILE-009**: `views/admin/dashboard.ejs` — admin layout, nav list, action classes.
- **FILE-010**: `views/admin/hero.ejs` — shared form structure/classes.
- **FILE-011**: `views/admin/about.ejs` — shared form structure/classes.
- **FILE-012**: `views/admin/services.ejs` — modern table/action markup classes.
- **FILE-013**: `views/admin/service-form.ejs` — modern form markup classes.
- **FILE-014**: `views/admin/projects.ejs` — modern table/action markup classes.
- **FILE-015**: `views/admin/project-form.ejs` — modern form markup classes.
- **FILE-016**: `views/admin/social.ejs` — modern table/action markup classes.
- **FILE-017**: `views/admin/social-form.ejs` — modern form/select markup classes.
- **FILE-018**: `views/admin/resume.ejs` — consistent card/form/alert classes.

## 6. Testing

- **TEST-001**: Admin visual consistency test — every admin page renders gradient background, card container, and uniform typography/spacing.
- **TEST-002**: Admin form usability test — labels, inputs, select, textarea, checkbox, and submit controls are visually consistent and keyboard-accessible.
- **TEST-003**: Admin table usability test — services/projects/social tables are readable, responsive, and actionable on mobile and desktop.
- **TEST-004**: Homepage typing test — `#hero-typing` animates on load, does not break EJS fallback text, and does not throw JS errors on other pages.
- **TEST-005**: Reduced-motion test — with `prefers-reduced-motion: reduce`, hero text appears immediately and hover animations are minimized.
- **TEST-006**: Hover animation test — `#services .service` and `#latest-works .project` transitions are smooth, performant, and non-distracting.
- **TEST-007**: Responsiveness test — no overlap or clipping at `360px`, `768px`, `1024px`, `1440px` on home, hireme, and all admin pages.
- **TEST-008**: Scope-guard test — no modified files in backend scope (`server.js`, `src/**`, models/routes/controllers/middleware/scripts).

## 7. Risks & Assumptions

- **RISK-001**: Over-aggressive animation can reduce readability or perceived professionalism.
- **RISK-002**: Admin markup refactor may unintentionally alter form submission behavior if field names are changed.
- **RISK-003**: If SASS is not recompiled after edits, `assets/css/style.css` can diverge from source and hide changes.
- **ASSUMPTION-001**: Existing color palette values in current SASS files are sufficient to create the required light gradient and modern admin visuals.
- **ASSUMPTION-002**: Current templates remain server-rendered EJS and allow class-wrapper additions without backend changes.
- **ASSUMPTION-003**: Existing browser support baseline accepts CSS transitions and `matchMedia` usage.

## 8. Related Specifications / Further Reading

- `plan/feature-portfolio-modernization-1.md`
- `plan/implementation-audit-2026-03-10.md`
- `plan/verification-checklist-2026-03-10.md`
