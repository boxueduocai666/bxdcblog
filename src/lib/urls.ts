const base = import.meta.env.BASE_URL || '/';

export function withBase(path: string): string {
  const cleanPath = path.replace(/^\/+/, '');
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export function taxonomyUrl(kind: 'categories' | 'tags', value: string): string {
  return withBase(`/${kind}/${encodeURIComponent(slugify(value))}/`);
}
