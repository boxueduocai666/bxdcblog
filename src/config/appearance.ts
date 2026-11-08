export const appearanceConfig = {
  // Use the bright, neutral glass style as the first-load appearance.
  defaultTheme: 'light' as 'system' | 'light' | 'dark',
  accent: '#b96b3b',
  glass: {
    navigationBlur: 24,
    panelBlur: 20,
    // Lower tint values let the wallpaper show through the frosted glass.
    navigationTint: '48%',
    panelTint: '38%',
  },
  motion: {
    microInteractionMs: 160,
    revealMs: 220,
  },
} as const;
