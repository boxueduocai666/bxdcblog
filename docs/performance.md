# Performance Budget

- No always-running full-screen canvas, particle system or page morph animation.
- Apply blur only to small, bounded UI surfaces.
- On small viewports, reduce blur radius and remove decorative shadow layers.
- Defer Twikoo until its container approaches the viewport.
- Lazy-load non-critical images; prefer local AVIF/WebP/SVG assets.
- Avoid external font and icon CDNs.
- Respect `prefers-reduced-motion`.
- Verify built output and real-device scrolling before enabling any optional visual effects.
