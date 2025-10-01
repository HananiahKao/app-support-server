# app-support-server

Simple static site (GitHub Pages) that provides a support form (mailto) and a privacy policy.

Quick start (macOS / zsh):

1. Publish to GitHub Pages

	- Push to `main`. The included GitHub Actions workflow will publish `public/` to the `gh-pages` branch.

2. Local preview

```bash
# Serve public/ with a simple static server (Python)
python3 -m http.server --directory public 8000
# then open http://localhost:8000/support
```

Notes
- The support form is static on GitHub Pages and opens the user's mail client to send to `viols-astral.0n@icloud.com`.
- There is no server storage in this static-only version.

