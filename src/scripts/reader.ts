export function initReadingTools() {
  const progress = document.querySelector<HTMLElement>('#reading-progress-bar');
  const article = document.querySelector<HTMLElement>('.article-content');
  if (progress && article) {
    let ticking = false;
    const update = () => {
      const rect = article.getBoundingClientRect();
      const total = article.offsetHeight - window.innerHeight;
      const passed = Math.max(0, Math.min(total, -rect.top));
      const percent = total > 0 ? (passed / total) * 100 : 0;
      progress.style.width = `${percent}%`;
      ticking = false;
    };
    const schedule = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    document.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
  }

  document.querySelectorAll<HTMLAnchorElement>('.article-toc a').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelector('.article-toc a.is-active')?.classList.remove('is-active');
      link.classList.add('is-active');
    });
  });

  const copyLink = document.querySelector<HTMLButtonElement>('[data-copy-link]');
  copyLink?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyLink.textContent = '✓';
      window.setTimeout(() => { copyLink.textContent = '↗'; }, 1400);
    } catch { copyLink.textContent = '×'; }
  });
}

export function initCodeCopy() {
  document.querySelectorAll<HTMLElement>('.prose pre').forEach((pre) => {
    if (pre.querySelector('.code-copy')) return;
    const button = document.createElement('button');
    button.className = 'code-copy';
    button.type = 'button';
    button.textContent = '复制';
    button.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = '已复制';
        window.setTimeout(() => { button.textContent = '复制'; }, 1400);
      } catch { button.textContent = '复制失败'; }
    });
    pre.append(button);
  });
}
