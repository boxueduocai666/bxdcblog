import type { APIRoute } from 'astro';
import { getPublishedPosts, getCategories, getTags } from '../lib/content';
import { slugify, withBase } from '../lib/urls';

const xml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts();
  const categories = getCategories(posts);
  const tags = getTags(posts);
  const paths = [
    '/', '/archives/', '/categories/', '/tags/', '/about/',
    ...posts.map((post) => `/posts/${post.id}/`),
    ...categories.map((item) => `/categories/${encodeURIComponent(slugify(item.name))}/`),
    ...tags.map((item) => `/tags/${encodeURIComponent(slugify(item.name))}/`),
  ];
  const origin = site?.toString().replace(/\/$/, '') ?? 'https://boxueduocai666.github.io';
  const urls = paths.map((path) => `<url><loc>${xml(`${origin}${withBase(path)}`)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
