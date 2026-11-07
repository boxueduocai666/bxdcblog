# Architecture

## Runtime

Astro 5 static output. Content is compiled at build time from Markdown collections. Browser-side JavaScript is progressive enhancement only; the main article text, navigation and taxonomy pages remain ordinary HTML links.

## Boundaries

- `components`: presentational Astro components grouped by page responsibility.
- `config`: user-editable site, appearance, feature and integration settings.
- `content`: human-authored Markdown posts.
- `data`: small structured content such as the optional music playlist.
- `lib`: server/build-time content aggregation and base-aware URL helpers.
- `pages`: route definitions and static route generation.
- `scripts`: browser-side interactions; no page-transition router.
- `styles`: design tokens and scoped layers.

## Routing

`/posts/[...slug]/` renders a standalone article. Archives, categories and tags are generated as ordinary static pages. Browser history and native back navigation are used rather than an overlay pretending to be a route.

## State

Theme preference is stored in localStorage with a system preference fallback. Search is loaded from the generated `/search-index.json` endpoint on demand. Twikoo is initialized only when its container approaches the viewport.

## Rendering

No full-screen WebGL canvas. Glass effects are isolated in `.glass-*` surfaces. Article body and code blocks use opaque surfaces for stable contrast.
