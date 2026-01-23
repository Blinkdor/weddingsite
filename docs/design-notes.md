# Design Notes

## Theme Tokens
Tailwind is configured to read colors and fonts from CSS custom properties defined in `src/index.css`:

```css
:root {
  --color-midnight: #0d0b15;
  --color-ash: #1e1b2a;
  --color-bone: #f1ede4;
  --color-accent: #b8975b;
  --color-overlay: rgba(8, 6, 12, 0.7);
  --font-display: 'Cormorant Garamond', 'Playfair Display', serif;
  --font-body: 'Spectral', 'Libre Baskerville', serif;
}
```

Tailwind theme extensions map these variables to semantic names (`midnight`, `ash`, `bone`, etc.) so components can reference `bg-midnight`, `text-bone`, and `font-display` utilities.

### Updating Palette
1. Edit the color variables in `src/index.css` (e.g., adjust `--color-accent` to a new gold tone).
2. The Tailwind build automatically picks up the new values without touching component code.

### Updating Typography
1. Add your preferred font via `<link>` tag in `frontend/index.html` or by self-hosting.
2. Change `--font-display` and/or `--font-body` to the new font names. Tailwind helpers (`font-display`, `font-body`) will update globally.

## Layout System
- `LayoutShell` defines both desktop sticky nav (fixed left column) and mobile overlay nav.
- `Section` handles background imagery, gradient overlays, and ensures content sits inside a blurred glass panel.
- Parallax ornament layers (arches/tracery) add motion without overwhelming readability; opacity is intentionally low and uses `mix-blend-screen`.

## Motion & Accessibility
- All major transitions rely on Framer Motion for smooth interpolation.
- `TransitionOverlay` checks `prefers-reduced-motion` to switch from animated bat swoosh to a simple fade/monogram.
- Focus outlines are enabled globally via Tailwind focus utilities.
- Lightbox trap is handled by forcing focus on the close button and returning it to the previously focused element when closing.
