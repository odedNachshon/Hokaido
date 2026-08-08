(() => {
  const VERSION = 'ui18';

  const nonVisitTitle = /^(נסיעה\b|Drive\b)|Late lunch|snack|ארוחת|צ[׳']ק|איסוף|הגעה ל|מנוחה|אונסן|Fireworks|שקיעה/i;

  const sourceConfigs = [
    {re:/Onuma|大沼/i, links:[['האתר הרשמי – Onuma Park','https://www.onuma-guide.com/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10299.html']]},
    {re:/Lake Toya|洞爺湖/i, links:[['האתר הרשמי – Lake Toya Tourism','https://www.laketoya.com/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10057.html']]},
    {re:/Silo Observatory|サイロ展望台/i, links:[['האתר הרשמי – Silo Observatory','https://toyako.biz/'],['Lake Toya Tourism','https://www.laketoya.com/']]},
    {re:/Usuzan|Mt\.? Usu|有珠山/i, links:[['האתר הרשמי – Usuzan Ropeway','https://usuzan.hokkaido.jp/en/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10064.html']]},
    {re:/Jigokudani|地獄谷/i, links:[['האתר הרשמי – Noboribetsu Tourism','https://noboribetsu-spa.jp/en/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10025.html']]},
    {re:/Lake Shikotsu|支笏湖/i, links:[['האתר הרשמי – Lake Shikotsu','https://lake-shikotsu.jp/en/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10049.html']]},
    {re:/Ningle Terrace|ニングルテラス/i, links:[['האתר הרשמי – Shin Furano Prince Hotel','https://www.princehotels.com/shinfurano/experience/ningle-terrace/'],['Furano Tourism','https://www.furanotourism.com/en/']]},
    {re:/Blue Pond|青い池/i, links:[['האתר הרשמי – Biei Tourism','https://www.biei-hokkaido.jp/en/facility/shirogane-blue-pond/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10527.html']]},
    {re:/Shirahige|白ひげ/i, links:[['האתר הרשמי – Biei Tourism','https://www.biei-hokkaido.jp/en/facility/shirahige-waterfalls/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10528.html']]},
    {re:/Shikisai|四季彩/i, links:[['האתר הרשמי – Shikisai no Oka','https://www.shikisainooka.jp/en/'],['Biei Tourism','https://www.biei-hokkaido.jp/en/']]},
    {re:/Farm Tomita|ファーム富田/i, links:[['האתר הרשמי – Farm Tomita','https://www.farm-tomita.co.jp/en/'],['Furano Tourism','https://www.furanotourism.com/en/']]},
    {re:/Asahidake|旭岳/i, links:[['האתר הרשמי – Asahidake Ropeway','https://asahidake.hokkaido.jp/en/'],['Daisetsuzan National Park','https://www.env.go.jp/park/daisetsu/']]},
    {re:/Otaru Canal|小樽運河/i, links:[['האתר הרשמי – Otaru Tourism','https://otaru.gr.jp/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10040.html']]},
    {re:/Sakaimachi|堺町/i, links:[['האתר הרשמי – Otaru Tourism','https://otaru.gr.jp/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/']]},
    {re:/Kitaichi|北一硝子/i, links:[['האתר הרשמי – Kitaichi Glass','https://kitaichiglass.co.jp/'],['Otaru Tourism','https://otaru.gr.jp/']]}
  ];

  const mainTitle = row => {
    const cell = row.querySelector('td:last-child');
    if (!cell) return '';
    const direct = [...cell.children].find(el => el.tagName === 'STRONG');
    if (direct) return direct.textContent.trim();
    const heading = cell.querySelector(':scope > .row-heading strong');
    return heading?.textContent.trim() || '';
  };

  const infoDetails = row => [...row.querySelectorAll('details')].filter(d => /פרטים על|תמונות/i.test(d.querySelector('summary')?.textContent || ''));

  function pruneDuplicateInfo(){
    document.querySelectorAll('.schedule tbody tr').forEach(row => {
      const title = mainTitle(row);
      const details = infoDetails(row);
      if (!details.length) return;
      if (!title || nonVisitTitle.test(title)) {
        details.forEach(d => d.remove());
        return;
      }
      details.slice(1).forEach(d => d.remove());
    });
  }

  function addSources(){
    document.querySelectorAll('.schedule tbody tr').forEach(row => {
      const title = mainTitle(row);
      if (!title || nonVisitTitle.test(title)) return;
      const detail = infoDetails(row)[0];
      if (!detail || detail.querySelector('.site-sources-ui18')) return;
      const summaryText = detail.querySelector('summary')?.textContent || '';
      const cfg = sourceConfigs.find(c => c.re.test(title) || c.re.test(summaryText));
      if (!cfg) return;
      const target = detail.querySelector('.activity-detail-body') || detail.lastElementChild || detail;
      const wrap = document.createElement('div');
      wrap.className = 'site-sources-ui18';
      wrap.innerHTML = `<div class="site-sources-title">🔗 קישורים ומקורות</div><div class="site-sources-links">${cfg.links.map(([label,url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join('')}</div>`;
      target.appendChild(wrap);
    });
  }

  function installStyles(){
    if (document.getElementById('ui18-source-styles')) return;
    const style = document.createElement('style');
    style.id = 'ui18-source-styles';
    style.textContent = `
      .site-sources-ui18{margin-top:18px;padding-top:14px;border-top:1px solid var(--line,#d8e1dc)}
      .site-sources-title{font-weight:800;margin-bottom:9px;color:var(--rail,#155c48)}
      .site-sources-links{display:flex;flex-wrap:wrap;gap:8px}
      .site-sources-links a{display:inline-flex;align-items:center;min-height:36px;padding:7px 10px;border-radius:10px;background:var(--surface-2,#f4f7f5);border:1px solid var(--line,#d8e1dc);color:var(--rail,#155c48)!important;text-decoration:none;font-size:.8rem;font-weight:700}
    `;
    document.head.appendChild(style);
  }

  function run(){
    installStyles();
    pruneDuplicateInfo();
    addSources();
  }

  run();
  document.addEventListener('ui17planready', () => setTimeout(run, 20));
  const observer = new MutationObserver(() => requestAnimationFrame(run));
  observer.observe(document.body,{childList:true,subtree:true});
})();
