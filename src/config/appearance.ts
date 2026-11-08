export const appearanceConfig = {
  defaultTheme: 'system' as 'system' | 'light' | 'dark',
  accent: '#b96b3b',
  glass: {
    navigationBlur: 22,
    panelBlur: 20,
    navigationTint: '74%',
    panelTint: '72%',
  },
  motion: {
    microInteractionMs: 160,
    revealMs: 220,
  },
} as const;
