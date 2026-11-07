import { defineConfig } from 'astro/config';

const repository = process.env.GITHUB_REPOSITORY ?? '';
const repositoryName = repository.includes('/') ? repository.split('/')[1] : '';
const isUserSite = repositoryName.endsWith('.github.io');
const inferredBase = process.env.GITHUB_ACTIONS && repositoryName && !isUserSite
  ? `/${repositoryName}`
  : '';

const defaultSite = process.env.GITHUB_ACTIONS
  ? (isUserSite ? `https://${repositoryName}` : 'https://boxueduocai666.github.io')
  : 'https://bxdcblog.vercel.app';

export default defineConfig({
  site: process.env.SITE_URL || defaultSite,
  base: process.env.BASE_PATH || inferredBase,
  output: 'static',
});
