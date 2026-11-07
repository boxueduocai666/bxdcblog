export const appearanceConfig = {
  defaultTheme: 'system' as 'system' | 'light' | 'dark',
  accent: '#b96b3b',
  glass: {
    navigationBlur: 18,
    panelBlur: 12,
    navigationTint: '66%',
    panelTint: '76%',
  },
  motion: {
    microInteractionMs: 160,
    revealMs: 220,
  },
} as const;
