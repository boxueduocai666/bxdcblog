export const integrationConfig = {
  twikoo: {
    enabled: true,
    envId: 'https://kwitoo-bxdc.vercel.app',
    // If jsDelivr is unreachable in a user's region, host this file locally and update the URL.
    scriptUrl: 'https://cdn.jsdelivr.net/npm/twikoo@1.6.44/dist/twikoo.all.min.js',
  },
} as const;
