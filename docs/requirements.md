# Requirements Summary

## Functional Goals
- Build a single-page wedding announcement with three sections: Announcement, Details (Location/Time/Dress), and Gallery.
- Provide smooth scroll navigation with active section highlighting and URL hash updates.
- Use a Victorian Gothic art direction with layered overlays and parallax ornaments.
- Include animated transitions (bat swoosh overlay) between section jumps and respect `prefers-reduced-motion`.
- Present a responsive layout: sticky vertical nav on desktop, hamburger menu on mobile.
- Gallery uses placeholder thumbnails and a lightbox modal (keyboard dismiss + focus handling).

## Technical Constraints
- Stack: React + Vite + TypeScript with Tailwind CSS for styling and Framer Motion for animations.
- Content and copy sourced from `src/content/siteContent.ts` for easy updates.
- Assets stored under `frontend/public/images` and `frontend/public/ornaments` (placeholder JPEGs/SVGs provided).
- No backend dependencies for MVP.

## Infrastructure & Tooling
- Repo structure:
  - `frontend/` Vite app
  - `docs/` documentation
  - `Dockerfile` for production build (Node builder + nginx runtime)
  - `docker-compose.yml` with dev hot reload and production preview services
- Dev experience: `docker-compose up frontend-dev` mounts the project and runs Vite with hot reload.
- Production: `docker build` (or compose `frontend-prod`) creates a static bundle served by nginx with SPA routing.

## Implementation Notes
- IntersectionObserver drives active nav state and URL hash updates.
- `TransitionOverlay` exposes a `play()` method invoked before scroll-to-section navigation.
- Parallax overlays implemented via a reusable `ParallaxLayer` component using Framer Motion `useScroll` transforms.
- Theme tokens defined as CSS variables in `src/index.css` (colors + font stacks) for future customization.
