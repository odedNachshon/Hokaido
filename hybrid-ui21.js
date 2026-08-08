(() => {
  const VERSION='ui21';

  const exactVisitMatchers = [
    /^Onuma Quasi-National Park$/i,
    /^Lake Toya\s*[—-]/i,
    /^Silo Observatory$/i,
    /^(Mount Usu|Usuzan Ropeway|Mt\.? Usu)/i,
    /^(Noboribetsu )?Jigokudani$/i,
    /^Lake Shikotsu$/i,
    /^Ningle Terrace$/i,
    /^(Shirogane )?Blue Pond$/i,
    /^Shirahige Falls$/i,
    /^Shikisai no Oka$/i,
    /^Farm Tomita$/i,
    /^Asahidake Ropeway/i,
    /^Otaru Canal$/i,
    /^Sakaimachi Street$/i,
    /^Kitaichi Glass$/i
  ];

  const mainTitle = row => {
    const cell=row.querySelector('td:last-child');
    if(!cell) return '';
    const direct=[...cell.children].find(el=>el.tagName==='STRONG');
    if(direct) return direct.textContent.trim();
    const heading=cell.querySelector(':scope > .row-heading strong');
    return heading?.textContent.trim()||'';
  };

  const isRealVisit = title => exactVisitMatchers.some(re=>re.test(title));

  function enforceSingleSiteInfo(){
    document.querySelectorAll('.schedule tbody tr').forEach(row=>{
      const title=mainTitle(row);
      const infos=[...row.querySelectorAll(':scope td:last-child > .site-info')];

      if(!isRealVisit(title)){
        infos.forEach(el=>el.remove());
        // Important: ui17 checks this flag before trying to add the panel again.
        row.dataset.siteInfo='1';
        return;
      }

      infos.slice(1).forEach(el=>el.remove());
      if(infos.length) row.dataset.siteInfo='1';
    });
  }

  enforceSingleSiteInfo();
  let queued=false;
  const mo=new MutationObserver(()=>{
    if(queued) return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;enforceSingleSiteInfo()});
  });
  mo.observe(document.body,{childList:true,subtree:true});
})();
