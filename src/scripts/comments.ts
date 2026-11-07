export function initComments() {
  const section = document.querySelector<HTMLElement>('[data-twikoo-env]');
  const container = document.querySelector<HTMLElement>('#twikoo-container');
  if (!section || !container) return;
  let initialized = false;
  const initialize = () => {
    if (initialized) return;
    initialized = true;
    const scriptUrl = section.dataset.twikooScript;
    const envId = section.dataset.twikooEnv;
    if (!scriptUrl || !envId) return;
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => {
      const api = (window as Window & { twikoo?: { init: (options: { envId: string; el: string }) => void } }).twikoo;
      if (api) api.init({ envId, el: '#twikoo-container' });
      else container.textContent = '评论组件加载失败，请稍后重试。';
    };
    script.onerror = () => { container.textContent = '评论服务暂时无法连接，但不影响阅读文章。'; };
    document.head.append(script);
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { initialize(); observer.disconnect(); }
    }, { rootMargin: '240px' });
    observer.observe(section);
  } else initialize();
}
