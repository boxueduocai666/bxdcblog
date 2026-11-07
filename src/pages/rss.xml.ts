import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/content';
import { withBase } from '../lib/urls';

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts();
  const origin = site?.toString().replace(/\/$/, '') ?? 'https://boxueduocai666.github.io';
  const items = posts.map((post) => `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${origin}${withBase(`/posts/${post.id}/`)}</link>
      <guid>${origin}${withBase(`/posts/${post.id}/`)}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.excerpt)}</description>
    </item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"><channel>
    <title>boxueduocai</title><link>${origin}${withBase('/')}</link>
    <description>记录技术、生活，以及一些值得留下的想法。</description>
    <language>zh-cn</language>${items}
  </channel></rss>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
