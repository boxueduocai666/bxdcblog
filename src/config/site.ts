export const siteConfig = {
  title: 'boxueduocai · 后来烟雨皆散尽，无人撑伞一人行',
  shortTitle: 'boxueduocai',
  description: '记录技术、生活，以及一些值得留下的想法。',
  language: 'zh-CN',
  author: {
    name: 'boxueduocai',
    avatar: '/assets/images/avatar.svg',
    bio: '后来烟雨皆散尽，无人撑伞一人行',
    github: 'https://github.com/boxueduocai666',
    email: 'mailto:boxueduocai66@gmail.com',
  },
  footer: '© 2026 boxueduocai. 保留部分权利。',
  hero: {
    eyebrow: 'PERSONAL BLOG · NOTES & EXPERIMENTS',
    title: '后来烟雨皆散尽，',
    subtitle: '无人撑伞一人行。',
    intro: '记录技术、生活，以及一些值得留下的想法。',
  },
  navigation: [
    { label: '首页', href: '/' },
    { label: '归档', href: '/archives/' },
    { label: '分类', href: '/categories/' },
    { label: '标签', href: '/tags/' },
    { label: '关于', href: '/about/' },
  ],
} as const;
