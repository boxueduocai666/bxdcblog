import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/content';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const index = posts.map((post) => ({
    title: post.data.title,
    excerpt: post.data.excerpt,
    category: post.data.category,
    tags: post.data.tags,
    date: post.data.date.toISOString(),
    url: `/posts/${post.id}/`,
    body: post.body.replace(/[`*_>#\[\]()!]/g, ' ').replace(/\s+/g, ' ').slice(0, 6000),
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
};
