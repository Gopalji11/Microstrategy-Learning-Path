# AI Agent Guidelines (Maintenance & Expansion)

## Adding New Slides
1. **HTML**: Append a `<section class="slide" id="slide-N">` block in `index.html`.
2. **Content**: Ensure you follow the structure:
   - `<div class="slide-header">` (Use a `.tag` and `<h1>`)
   - `<div class="slide-content">` or `.content-grid`.
3. **JS**: The script dynamically counts slides; no JS update is needed for the logic, but you should run `initMosaic()` if content changes outside of page load.

## Style Modifications
- Adjust `--accent` variables in `style.css` to change the theme system-wide.
- To add a specific background to a new slide, use a CSS selector like `#slide-N { background: ... }`.

## Iconography
- Always use `i[data-lucide="icon-name"]`.
- When adding icons dynamically via JS, call `lucide.createIcons()` after injection to ensure they render.

## State Management
- `currentSlideIndex` is 0-indexed.
- `goToSlide(index)` is the primary method for navigation.

## Known Gotchas
- Backdrop-filter (blur) might be heavy on low-end mobile devices; monitor performance if adding too many layers.
- The Mosaic overlay uses a fixed 5x5 grid in some views; if slides > 25, update the CSS grid layout for `#mosaic-overlay`.
