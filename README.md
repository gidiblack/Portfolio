# Portfolio (Express + MongoDB + EJS)

Modernized portfolio application with server-side rendering, MongoDB-backed content, and protected admin CMS routes.

## Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)

## Installation

1. Install dependencies:

   npm install

2. Create a local env file from the example:

   Copy `.env.example` to `.env` and update values.

3. Ensure required variables are set:

- `MONGODB_URI`
- `SESSION_SECRET`

## Available Scripts

- `npm start` - start server
- `npm run dev` - start server in watch mode
- `npm run seed` - seed default portfolio content
- `npm run create-admin` - create admin user in MongoDB

## Local Development Workflow

1. Run seed data:

   npm run seed

2. Create admin account:

   npm run create-admin

3. Start app:

   npm run dev

4. Open app:

- Public site: `http://localhost:3000/`
- Hire Me page: `http://localhost:3000/hireme`
- Admin login: `http://localhost:3000/admin/login`

## Admin & Security Notes

- Session cookie is `HttpOnly`, `SameSite` aware, and `Secure` in production.
- Login endpoint is rate limited.
- CSRF protection is enabled for `/admin/*` form submissions.
- Resume upload endpoint accepts PDF only and enforces max size via `RESUME_MAX_SIZE_BYTES`.

## Environment Variables

See `.env.example` for the complete list.

Important variables:

- `NODE_ENV`
- `PORT`
- `MONGODB_URI`
- `SESSION_SECRET`
- `TRUST_PROXY`
- `BCRYPT_SALT_ROUNDS`
- `LOGIN_RATE_LIMIT_WINDOW_MS`
- `LOGIN_RATE_LIMIT_MAX`
- `RESUME_MAX_SIZE_BYTES`

## Deployment (Render / Railway / Fly)

1. Set all environment variables from `.env.example`.
2. Provide a reachable MongoDB URI.
3. Run build/install step:

   npm install

4. Start command:

   npm start

5. Verify health endpoint:

   GET `/health` should return `{ "status": "ok" }`.

## Project Structure (Key Paths)

- `server.js` - HTTP bootstrap
- `src/app.js` - middleware and route registration
- `src/config/env.js` - env validation and typed runtime config
- `src/config/db.js` - MongoDB connection
- `src/routes` - public/admin/health routes
- `src/controllers` - request handlers
- `src/models` - mongoose schemas
- `views` - EJS templates
- `uploads/resume` - stored resume PDFs

## Notes

- Current public templates still need full DOM/class parity with original static pages for final migration completion.
