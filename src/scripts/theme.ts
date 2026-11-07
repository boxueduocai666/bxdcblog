const STORAGE_KEY = 'bxdc-theme';

export function initTheme() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  const apply = (theme: 'light' | 'dark') => {
    document.documentElement.dataset.theme = theme;
    toggle?.setAttribute('aria-label', theme === 'dark' ? '切换到浅色主题' : '切换到深色主题');
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    meta?.setAttribute('content', theme === 'dark' ? '#171916' : '#f5f1e9');
  };
  const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  apply(current);
  toggle?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage may be unavailable */ }
  });
}
