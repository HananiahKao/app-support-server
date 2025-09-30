# app-support-server

Simple Node.js + Express server that serves a support page, a privacy policy page, and exposes a POST endpoint to receive support messages.

Quick start (macOS / zsh):

1. Install dependencies

```bash
npm install
```

2. Run in development (requires nodemon)

```bash
npm run dev
```

3. Run tests

```bash
npm test
```

Server endpoints:
- GET /support  -> HTML support page with a form
- GET /privacy  -> Privacy policy page
- POST /support-message -> Accepts JSON {name,email,message}

Messages are appended to `messages.json`.

Render deployment
-----------------
This project can be deployed to Render by connecting your Git repository and creating a new Web Service. A `render.yaml` is included for repo-based deploys.

Key Render settings:
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/support`

Important: `messages.json` is a local file store and is not durable on Render across deploys or multiple instances. Use a managed database or external storage for production.

GitHub Pages
------------
The `public/` folder contains static pages suitable for GitHub Pages. A workflow is included to publish `public/` to the `gh-pages` branch on push to `main`.

Notes about the static deployment:
- The support form will attempt a same-origin POST to `/support-message` when available.
- When the site is hosted statically (e.g., GitHub Pages), the form will fall back to a `mailto:` link unless you supply an API endpoint via the `?api=` query parameter (for example: `https://your-site.github.io/?api=https://your-server/support-message`).

