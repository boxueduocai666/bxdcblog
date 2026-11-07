import { withBase } from '../lib/urls';

type SearchEntry = { title: string; excerpt: string; category: string; tags: string[]; date: string; url: string; body: string };
let indexPromise: Promise<SearchEntry[]> | null = null;

function loadIndex(): Promise<SearchEntry[]> {
  if (!indexPromise) {
    indexPromise = fetch(withBase('/search-index.json'))
      .then((response) => { if (!response.ok) throw new Error('搜索索引加载失败'); return response.json() as Promise<SearchEntry[]>; })
      .catch((error) => { indexPromise = null; throw error; });
  }
  return indexPromise;
}

export function initSearch() {
  const dialog = document.querySelector<HTMLDialogElement>('#site-search');
  const input = document.querySelector<HTMLInputElement>('#site-search-input');
  const list = document.querySelector<HTMLUListElement>('#search-results');
  const hint = document.querySelector<HTMLElement>('#search-hint');
  if (!dialog || !input || !list || !hint) return;

  const open = () => {
    if (!dialog.open) dialog.showModal();
    window.setTimeout(() => input.focus(), 30);
  };
  const close = () => dialog.close();
  document.querySelectorAll<HTMLElement>('[data-search-open]').forEach((button) => button.addEventListener('click', open));
  dialog.querySelectorAll<HTMLElement>('[data-search-close]').forEach((button) => button.addEventListener('click', close));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });

  let requestId = 0;
  input.addEventListener('input', async () => {
    const query = input.value.trim().toLocaleLowerCase();
    const currentRequest = ++requestId;
    list.replaceChildren();
    if (!query) { hint.textContent = '输入关键词开始搜索。'; return; }
    hint.textContent = '正在搜索…';
    try {
      const entries = await loadIndex();
      if (currentRequest !== requestId) return;
      const terms = query.split(/\s+/).filter(Boolean);
      const results = entries.map((entry) => {
        const haystack = `${entry.title} ${entry.excerpt} ${entry.category} ${entry.tags.join(' ')} ${entry.body}`.toLocaleLowerCase();
        const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? (entry.title.toLocaleLowerCase().includes(term) ? 4 : 1) : -3), 0);
        return { entry, score };
      }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);
      hint.textContent = results.length ? `找到 ${results.length} 篇相关内容。` : '没有找到匹配文章，试试其他关键词。';
      for (const { entry } of results) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = withBase(entry.url);
        const title = document.createElement('strong');
        title.textContent = entry.title;
        const meta = document.createElement('span');
        meta.textContent = `${entry.category} · ${entry.tags.join(' / ')}`;
        link.append(title, meta);
        item.append(link);
        list.append(item);
      }
    } catch {
      hint.textContent = '搜索暂时不可用，请检查网络后重试。';
    }
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement | null;
    const typing = target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
    if ((event.key === '/' && !typing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault(); open();
    }
  });
}
