<!-- Use this file to provide workspace-specific custom instructions to Copilot. -->
<!-- Copilot / AI agent instructions for app-support-server -->

## Quick checklist
- [x] Understand the app shape: small Express server, static pages, and a single POST endpoint that stores messages in `messages.json`.
- [x] Use `npm install`, `npm run dev`, `npm test` for install/dev/test flows described in `README.md`.

## Big picture
This repo is a minimal Node/Express support server:
- `src/index.js` — Express app. Note: the server only calls `app.listen()` when run directly (so tests can require the app without starting an HTTP listener).
- `public/` — static HTML pages: `support.html` (client form) and `privacy.html`.
- `POST /support-message` — accepts JSON {name,email,message}, validates presence, appends an entry to top-level `messages.json`.

Why this matters: there is no external DB; persistence is file-based, so changes to message handling should consider race conditions and file locking.

## Important files to inspect (in order)
- `src/index.js` — request handlers, validation, file storage logic. Tests import this file directly.
- `messages.json` — message store (JSON array). Tests reset it (see `test/support.test.js`).
- `test/support.test.js` — shows expected behavior: happy path writes one entry; missing fields return 400.
- `public/support.html` — client-side example of how the API is used (POST to `/support-message`).
- `README.md` — canonical developer commands to run the project.

## Developer workflows & commands
- Install dependencies: `npm install`
- Start in dev: `npm run dev` (uses nodemon)
- Run tests: `npm test` (Jest + supertest). Note: tests import the app and rely on `require.main` guard in `src/index.js`.

When editing `src/index.js`, preserve the `if (require.main === module)` pattern so tests don't leave a running server.

## Patterns & conventions specific to this project
- Persistence: local filesystem JSON store (`messages.json`). Avoid refactoring to asynchronous DB semantics without updating tests and concurrency handling.
- Logging: `morgan('dev')` is used for request logging; keep it when adding middleware.
- Static assets served from `/static` mapping to `public/` and direct routes for `/support` and `/privacy`.
- Tests assume a synchronous reset of `messages.json` in `beforeEach()` — maintain that pattern or update tests accordingly.

## Integration points / external deps
- No external services or env-based secrets. All dependencies are local NPM packages (see `package.json`).
- If adding email or external storage, update README and tests to mock or stub external calls.

## Small examples from repo
- Validation in `src/index.js`: returns 400 when `name`, `email`, or `message` are missing.
- Test example: `test/support.test.js` uses `supertest` to POST and then reads `messages.json` to assert.

## Changes to avoid
- Do not start a server on import (breaks tests). See `require.main` guard.
- Do not assume a DB — any refactor to a database requires updating `messages.json` usage and tests.

## If you need more context
- Read `src/index.js` and `test/support.test.js` together to understand expected behaviors.
- If a proposed change touches storage semantics, update tests to demonstrate the new behavior.

Please review this draft and tell me if you'd like more instructions (for CI, linting, or deploying), or if you'd like the file to include actionable checkboxes for common PR tasks.
