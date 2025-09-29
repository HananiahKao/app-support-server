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
