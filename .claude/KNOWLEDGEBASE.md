# Midnight Union Wedding Site - Knowledge Base

## Overview

A Victorian-Gothic themed single-page wedding announcement website. Built with React, Vite, TypeScript, and Tailwind CSS. Deployed via Docker with nginx.

## Tech Stack

- **Frontend**: React 19, TypeScript 5.9, Vite 7
- **Styling**: Tailwind CSS 3.4, CSS custom properties
- **Animations**: Framer Motion 12
- **Server**: nginx 1.27-alpine
- **Containerization**: Docker, Docker Compose

## Project Structure

```
/var/www/weddingsite/
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── content/          # Content configuration
│   │   ├── utils/            # Utility functions
│   │   ├── assets/           # Source SVGs
│   │   ├── App.tsx           # Main app with section navigation
│   │   └── index.css         # Theme tokens and global styles
│   ├── public/
│   │   ├── images/           # Background and gallery photos
│   │   └── ornaments/        # Decorative SVGs
│   ├── vite.config.ts        # Build config
│   └── tailwind.config.js    # Theme extensions
├── nginx/default.conf        # SPA routing rules
├── Dockerfile                # Multi-stage build
├── docker-compose.yml        # Dev/prod orchestration
└── docs/                     # Requirements & design notes
```

## Key Files for Content Updates

| What to Change | File |
|----------------|------|
| Event details, titles, descriptions | `frontend/src/content/siteContent.ts` |
| Colors, fonts, theme | `frontend/src/index.css` (CSS variables) |
| Background images | `frontend/public/images/` |
| Gallery photos | `frontend/public/images/gallery/` |

## Theme Tokens (CSS Variables)

```css
--color-midnight: #0d0b15   /* Deep purple-black */
--color-ash: #1e1b2a        /* Medium dark purple */
--color-bone: #f1ede4       /* Off-white */
--color-accent: #b8975b     /* Gold/bronze */
--font-display: Cormorant Garamond, Playfair Display, serif
--font-body: Spectral, Libre Baskerville, serif
```

## Site Sections

1. **Announcement** - Hero with couple names, date, location
2. **Details** - Event info cards (Location, Time, Dress code)
3. **Gallery** - Image grid with lightbox modal

## Components

| Component | Purpose |
|-----------|---------|
| `LayoutShell.tsx` | Header/nav - desktop sidebar + mobile hamburger |
| `Section.tsx` | Section container with background and parallax |
| `GalleryGrid.tsx` | Image grid with click handlers |
| `LightboxModal.tsx` | Full-screen image viewer |
| `TransitionOverlay.tsx` | Bat swoosh animation between sections |
| `ParallaxLayer.tsx` | Scroll-driven parallax effects |

## Development Commands

```bash
# Local dev server (hot reload)
cd frontend && npm run dev

# Docker dev (port 4173)
docker-compose up frontend-dev

# Production build
npm run build

# Docker production (port 8080)
docker build -t midnight-union .
docker run -p 8080:80 midnight-union
```

## Deployment Notes

- **Base path**: `/wedding/` (configured in Vite and nginx)
- **nginx**: SPA routing sends all non-file requests to index.html
- **Asset caching**: 1-year max-age on `/wedding/assets/`
- **Redirects**: Root `/` redirects to `/wedding/`

## Accessibility Features

- Keyboard navigation (Tab, Escape to close modals)
- Focus management in lightbox
- Respects `prefers-reduced-motion`
- Semantic HTML with ARIA labels
- Screen reader friendly

## Adding Gallery Images

1. Add JPEGs to `frontend/public/images/gallery/`
2. Update `galleryItems` array in `frontend/src/content/siteContent.ts`

## Common Tasks

**Change event date/location**: Edit `siteContent.ts` announcement section

**Update color scheme**: Modify CSS variables in `index.css`

**Add new section**:
1. Add section data to `siteContent.ts`
2. Add section ID to nav items in `LayoutShell.tsx`
3. Render new `<Section>` in `App.tsx`

**Change fonts**: Update `--font-display` and `--font-body` in `index.css`, ensure fonts are loaded in `index.html`
