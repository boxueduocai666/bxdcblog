# Browser Compatibility

The baseline is semantic HTML, normal links, CSS layout and readable colors. `backdrop-filter` is an enhancement, not a dependency.

- Chrome / Edge / Safari: enable standard and WebKit-prefixed backdrop filters when available.
- UC / QQ / Huawei browsers: test actual installed versions and embedded WebViews; browser brand alone is not a reliable engine/version identifier.
- Unsupported filter: `.glass-surface` keeps a stronger solid translucent background and border.
- Reduced motion: disable ambient animations and smooth scrolling.
- Older engines: the site remains readable without glass blur or advanced CSS.

No IE compatibility work is planned. Before production, test keyboard navigation, text selection, image scaling, search, theme toggle, table overflow and comment loading on real devices.
