import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from './urls';

export type BlogPost = CollectionEntry<'posts'>;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getCategories(posts: BlogPost[]) {
  const counts = new Map<string, number>();
  for (const post of posts) counts.set(post.data.category, (counts.get(post.data.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, slug: slugify(name) }))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

export function getTags(posts: BlogPost[]) {
  const counts = new Map<string, number>();
  for (const post of posts) for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, slug: slugify(name) }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}
