# Design System

## Direction

Warm editorial minimalism + restrained Liquid Glass. The visual priority is content first, navigation second, ornamental effects last.

## Material tiers

1. Optical / high emphasis: only the compact primary navigation and search surface. Use layered highlights and restrained saturation; advanced refraction remains experimental and must be isolated.
2. Standard glass: menu popovers, chips and floating reading controls. CSS `backdrop-filter` with an opaque fallback.
3. Reading surface: article text, code, tables and comments. Solid theme-aware backgrounds; no transparent body copy.

## Motion

No FLIP, full-page morph, circular comment reveal or forced full-page scrolling. Keep only short opacity/color feedback. Honor `prefers-reduced-motion` and avoid animating large blurred layers.

## Color and typography

Cream paper background, ink text, muted stone metadata and warm amber accent. Use system fonts to avoid font CDN latency. Body line-height is generous and article line-length is capped.

## Accessibility

Keep focus rings visible, text selectable, buttons labeled, dialogs keyboard-operable and contrast sufficiently strong. Do not put essential text over busy imagery.
