export const appearanceConfig = {
  // One bright, neutral liquid-glass material across the whole site.
  defaultTheme: 'light' as 'system' | 'light' | 'dark',
  accent: '#b96b3b',
  glass: {
    // Navigation and content panels intentionally share the same material.
    navigationBlur: 22,
    panelBlur: 22,
    navigationTint: '66%',
    panelTint: '66%',
  },
  motion: {
    microInteractionMs: 160,
    revealMs: 220,
  },
} as const;
