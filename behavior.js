(() => {
  const current = document.querySelector('.navlinks [aria-current="page"]');
  current?.scrollIntoView({block:'nearest', inline:'center'});

  const copyText = async text => {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    const ta = document.createElement('textarea');
    ta.className = 'clipboard-proxy';
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  };

  document.addEventListener('click', async event => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    event.preventDefault();
    try {
      await copyText(button.dataset.copy || '');
      const hint = button.querySelector('.copy-hint');
      if (!hint) return;
      const previous = hint.textContent;
      hint.textContent = 'הועתק ✓';
      setTimeout(() => { hint.textContent = previous; }, 1400);
    } catch (_) {}
  });

  const loadCommonsImages = async gallery => {
    if (!gallery || gallery.dataset.loaded === '1') return;
    gallery.dataset.loaded = '1';
    const query = gallery.dataset.commonsQuery;
    if (!query) return;
    gallery.innerHTML = '<div class="site-gallery-loading">טוען תמונות…</div>';
    try {
      const params = new URLSearchParams({
        action:'query', format:'json', origin:'*', generator:'search',
        gsrsearch:query, gsrnamespace:'6', gsrlimit:'8',
        prop:'imageinfo', iiprop:'url|mime', iiurlwidth:'900'
      });
      const response = await fetch('https://commons.wikimedia.org/w/api.php?' + params);
      const json = await response.json();
      const pages = Object.values(json?.query?.pages || {})
        .filter(page => page.imageinfo?.[0]?.thumburl && /^image\/(jpeg|png|webp)/.test(page.imageinfo[0].mime || ''))
        .slice(0, 3);
      if (!pages.length) throw new Error('no images');
      gallery.innerHTML = pages.map(page => {
        const info = page.imageinfo[0];
        const href = info.descriptionurl || info.url;
        return `<a target="_blank" rel="noopener noreferrer" href="${href}"><img loading="lazy" alt="" src="${info.thumburl}"></a>`;
      }).join('') + '<div class="site-gallery-note">תמונות: Wikimedia Commons · לחיצה פותחת את המקור</div>';
    } catch (_) {
      gallery.innerHTML = '<div class="site-gallery-loading">לא הצלחתי לטעון את התמונות כרגע.</div>';
    }
  };

  document.querySelectorAll('details.site-info').forEach(details => {
    details.addEventListener('toggle', () => {
      if (details.open) loadCommonsImages(details.querySelector('.site-gallery[data-commons-query]'));
    });
  });
})();
