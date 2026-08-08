(() => {
  const VERSION='ui22';

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

  function installTimeStyles(){
    if(document.getElementById('ui22-time-style')) return;
    const s=document.createElement('style');
    s.id='ui22-time-style';
    s.textContent=`
      .schedule td:first-child .time-stack{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;gap:1px!important;margin:0!important;font-family:"Arial Narrow","Roboto Condensed",Arial,sans-serif!important;direction:ltr!important;text-align:center!important;line-height:1!important;color:var(--rail-ink)!important}
      .schedule td:first-child .time-stack .time-prefix{font-size:9px!important;line-height:1!important;font-weight:600!important;color:var(--muted)!important;margin:0 0 1px!important}
      .schedule td:first-child .time-stack .time-start{font-size:12px!important;line-height:1.05!important;font-weight:700!important;letter-spacing:-.01em!important;margin:0!important;color:var(--rail-ink)!important}
      .schedule td:first-child .time-stack .time-end{font-size:11px!important;line-height:1.05!important;font-weight:500!important;letter-spacing:-.01em!important;margin:2px 0 0!important;color:var(--muted)!important}
      .schedule td:first-child strong.time-text{font-family:"Arial Narrow","Roboto Condensed",Arial,sans-serif!important;font-size:10px!important;line-height:1.2!important;font-weight:600!important;white-space:normal!important;color:var(--muted)!important;text-align:center!important}
      @media(max-width:760px){.schedule tr{grid-template-columns:58px minmax(0,1fr)!important}.schedule td:first-child{width:58px!important;max-width:58px!important;padding:16px 8px 15px 2px!important}}
      @media(max-width:390px){.schedule tr{grid-template-columns:56px minmax(0,1fr)!important}.schedule td:first-child{width:56px!important;max-width:56px!important}}
    `;
    document.head.appendChild(s);
  }

  function formatTimes(){
    document.querySelectorAll('.schedule td:first-child strong').forEach(el=>{
      if(el.querySelector('.time-stack')) return;
      const raw=el.textContent.trim();
      const m=raw.match(/^(?:(עד|לפני|סביב)\s*)?(\d{1,2}:\d{2})(?:\s*[–-]\s*(?:סביב\s*)?(\d{1,2}:\d{2}))?$/);
      if(!m){el.classList.add('time-text');return;}
      const [,prefix,start,end]=m;
      el.classList.remove('time-text');
      el.innerHTML=`<span class="time-stack">${prefix?`<span class="time-prefix">${prefix}</span>`:''}<span class="time-start">${start}</span>${end?`<span class="time-end">${end}</span>`:''}</span>`;
    });
  }

  function stabilizeSiteInfo(){
    document.querySelectorAll('.schedule tbody tr').forEach(row=>{
      const title=mainTitle(row);
      const real=isRealVisit(title);
      const infos=[...row.querySelectorAll('td:last-child > .site-info')];

      if(!real){
        infos.forEach(el=>el.remove());
        row.dataset.siteInfo='1';
        return;
      }

      infos.slice(1).forEach(el=>el.remove());
      if(infos.length){
        row.dataset.siteInfo='1';
        return;
      }

      // ui17 owns the rich 300+ word content. If a real visit lost its panel,
      // unlock only that row and make a harmless child mutation so ui17's
      // observer can re-attach the panel. Non-visit rows stay locked above.
      delete row.dataset.siteInfo;
      if(row.dataset.ui22Requested!=='1'){
        row.dataset.ui22Requested='1';
        const ping=document.createElement('i');
        ping.hidden=true;
        ping.className='ui22-ping';
        row.querySelector('td:last-child')?.appendChild(ping);
        setTimeout(()=>ping.remove(),0);
        setTimeout(()=>{ delete row.dataset.ui22Requested; },250);
      }
    });
  }

  function run(){
    installTimeStyles();
    formatTimes();
    stabilizeSiteInfo();
  }

  run();
  let queued=false;
  const mo=new MutationObserver(()=>{
    if(queued) return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;run()});
  });
  mo.observe(document.body,{childList:true,subtree:true});
})();
