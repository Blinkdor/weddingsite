# Midnight Union Wedding Site

Victorian Gothic-inspired one-page wedding announcement built with React, Vite, TypeScript, and Tailwind CSS. Includes smooth scroll navigation, animated transitions, and responsive layouts.

## Project Structure

- `frontend/` – Vite React app (Tailwind, Framer Motion, content config, assets)
- `docs/` – Requirements summary and design/theme notes
- `Dockerfile` – Production build + nginx runtime
- `docker-compose.yml` – Dev hot-reload service and production preview service
- `nginx/` – Custom nginx config for SPA routing

## Local Development

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 (or whichever port Vite reports). Update `src/content/siteContent.ts` to adjust copy, backgrounds, or gallery items.

### Tests & Builds

```bash
npm run lint
npm run build
npm run preview
```

## Docker Workflows

### Dev (hot reload)

```bash
docker-compose up frontend-dev
```

This mounts the local `frontend/` directory and runs Vite in watch mode on http://localhost:4173.

### Production Image

```bash
docker-compose build frontend-prod
docker-compose up frontend-prod
```

or build directly:

```bash
docker build -t midnight-union .
docker run -p 8080:80 midnight-union
```

The production image builds the static assets and serves them via nginx using `nginx/default.conf`.

## Documentation

- `docs/requirements.md` – Project goals, constraints, and implementation notes
- `docs/design-notes.md` – Theme tokens (colors/typography) and how to customize them

## Assets

Place hero backgrounds in `frontend/public/images/`:

- `announcement.jpg`
- `details.jpg`
- `gallery.jpg`

Ornaments live in `frontend/public/ornaments/`. Placeholder assets are bundled for immediate use.
