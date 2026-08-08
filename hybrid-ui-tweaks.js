(() => {
  const ASSET_VERSION = 'ui25';
  const GMAIL_ACCOUNT = 'odedn72@gmail.com';
  const currentDay = () => document.querySelector('.navlinks [aria-current="page"]')?.textContent?.trim();
  const rows = () => [...document.querySelectorAll('.schedule tbody tr')];

  const titleEl = row => row.querySelector('td:last-child > .row-heading > strong, td:last-child > strong');
  const rowTitle = row => titleEl(row)?.textContent.trim() || '';

  const statusFor = title => {
    if (/Fireworks|בדיקת מזג|לבדוק היום/i.test(title)) return ['live','לבדוק היום'];
    if (/רכבת|טיסה|איסוף רכב|Budget/i.test(title)) return ['fixed','קבוע'];
    if (/ארוחת|קפה|מנוחה|אונסן|חופשי|אופציונלי|סיבוב/i.test(title)) return ['flexible','גמיש'];
    return ['planned','מתוכנן'];
  };

  const normalizeRows = () => {
    rows().forEach(row => {
      const cell = row.querySelector('td:last-child');
      let strong = titleEl(row);
      if (!cell || !strong) return;
      let heading = strong.closest('.row-heading');
      if (!heading) {
        heading = document.createElement('div');
        heading.className = 'row-heading';
        cell.insertBefore(heading, strong);
        heading.appendChild(strong);
        const br = [...cell.children].find(el => el.tagName === 'BR');
        if (br) br.remove();
      }
      if (!heading.querySelector('.status-pill')) {
        const [kind,label] = statusFor(strong.textContent.trim());
        const pill = document.createElement('span');
        pill.className = `status-pill status-${kind}`;
        pill.textContent = label;
        heading.appendChild(pill);
      }
    });
  };

  const parseRange = raw => {
    const m = raw.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(?:סביב\s*)?(\d{1,2}):(\d{2})/);
    if (!m) return null;
    let start = Number(m[1])*60 + Number(m[2]);
    let end = Number(m[3])*60 + Number(m[4]);
    if (end < start) end += 24*60;
    return end-start;
  };
  const durationText = mins => {
    if (!mins || mins < 1) return '';
    if (mins < 60) return `כ־${mins} דק׳`;
    const h = Math.floor(mins/60), m = mins%60;
    return m ? `כ־${h} ש׳ ${m} דק׳` : `כ־${h} ש׳`;
  };
  const decorateDriveRows = () => {
    rows().forEach(row => {
      const strong = titleEl(row);
      if (!strong) return;
      const text = strong.textContent.trim();
      if (!/^(נסיעה\b|Drive\b|חזרה\b)/i.test(text)) return;
      if (!/כ־\s*\d/.test(text)) {
        const rawTime = row.querySelector('td:first-child strong')?.textContent.trim() || '';
        const duration = durationText(parseRange(rawTime));
        if (duration) strong.append(` · ${duration}`);
      }
      if (!strong.querySelector('.drive-icon')) {
        const icon=document.createElement('span'); icon.className='drive-icon'; icon.textContent='🚗'; icon.setAttribute('aria-hidden','true'); strong.prepend(icon);
      }
    });
  };

  const formatTimes = () => {
    document.querySelectorAll('.schedule td:first-child strong').forEach(el => {
      if (el.querySelector('.time-stack')) return;
      const raw=el.textContent.trim();
      const m=raw.match(/^(?:(עד|לפני|סביב)\s*)?(\d{1,2}:\d{2})(?:\s*[–-]\s*(?:סביב\s*)?(\d{1,2}:\d{2}))?$/);
      if (!m) { el.classList.add('time-text'); return; }
      const [,prefix,start,end]=m;
      el.innerHTML=`<span class="time-stack">${prefix?`<span class="time-prefix">${prefix}</span>`:''}<span class="time-start">${start}</span>${end?`<span class="time-end">${end}</span>`:''}</span>`;
    });
  };

  const hotelByDay = {
    '5.8': [{name:'Hotel Indigo Tokyo Shibuya',platform:'Booking.com',number:'5837788989',aliases:['Hotel Indigo','המלון']}],
    '6.8': [{name:'ReLabo -Medical Spa & Stay-',platform:'Booking.com',number:'6654249708',aliases:['ReLabo']}],
    '7.8': [{name:"La’gent Plaza Hakodate Hokuto",platform:'Agoda',number:'1755948686',aliases:["La’gent Plaza","La'gent Plaza"]}],
    '8.8': [{name:'WE Hotel Toya - Dusit Collection',platform:'Booking.com',number:'5090390400',aliases:['WE Hotel Toya']}],
    '9.8': [{name:'Hotel Mahoroba',platform:'Booking.com',number:'6550170726',aliases:['Hotel Mahoroba']}],
    '10.8': [{name:'La Vista Furano Hills',platform:'Booking.com',number:'5675536037',aliases:['La Vista Furano Hills']}],
    '12.8': [{name:'La Vista Daisetsuzan',platform:'Agoda',number:'1755974229',aliases:['La Vista Daisetsuzan']}],
    '13.8': [{name:'Solaria Nishitetsu Hotel Sapporo',platform:'Booking.com',number:'6515535616',aliases:['Solaria Nishitetsu','Solaria']}],
    '14.8': [{name:'Hotel Indigo Tokyo Shibuya',platform:'Booking.com',number:'5466329081',aliases:['Hotel Indigo']}]
  };
  const carBooking={day:'8.8',name:'Budget Rent a Car — Hakodate Airport',platform:'Budget',number:'101847607',aliases:['איסוף רכב Budget']};
  const gmailSearchUrl = number => `https://mail.google.com/mail/?authuser=${encodeURIComponent(GMAIL_ACCOUNT)}#search/${encodeURIComponent(`"${number}"`)}`;
  const bookingBubble = ({icon,title,name,platform,number}) => {
    const d=document.createElement('details'); d.className='hotel-booking-bubble hotel-booking-inline'; d.dataset.bookingNumber=number;
    d.innerHTML=`<summary><span class="hotel-icon">${icon}</span><span class="hotel-summary"><b>${title}</b><small>${name}</small></span><span class="hotel-chevron">⌄</span></summary><div class="hotel-booking-body"><div class="hotel-booking-meta"><span>${platform}</span><button type="button" class="booking-number-copy" data-copy-number="${number}"><span class="booking-number-value">${number}</span><span class="copy-hint">העתק</span></button></div><a class="hotel-mail-cta" target="_blank" rel="noopener" href="${gmailSearchUrl(number)}">✉️ חפש את האישור ב-Gmail</a></div>`;
    return d;
  };
  const findCheckinRow = aliases => rows().find(row => /צ[׳']ק.?אין|check.?in/i.test(rowTitle(row)) && aliases.some(a=>rowTitle(row).includes(a)));
  const placeHotelBubbles = () => (hotelByDay[currentDay()]||[]).forEach(h=>{
    if(document.querySelector(`[data-booking-number="${h.number}"]`))return;
    const cell=findCheckinRow(h.aliases)?.querySelector('td:last-child'); if(!cell)return;
    cell.querySelectorAll('.inline-mails').forEach(el=>el.remove()); cell.appendChild(bookingBubble({...h,icon:'🏨',title:'פרטי המלון וההזמנה'}));
  });
  const placeCarBubble = () => {
    if(currentDay()!==carBooking.day||document.querySelector(`[data-booking-number="${carBooking.number}"]`))return;
    const row=rows().find(r=>carBooking.aliases.some(a=>rowTitle(r).includes(a))); const cell=row?.querySelector('td:last-child'); if(!cell)return;
    cell.querySelectorAll('.inline-mails').forEach(el=>el.remove()); cell.appendChild(bookingBubble({...carBooking,icon:'🚗',title:'פרטי הרכב וההזמנה'}));
  };

  const copyText=async text=>{if(navigator.clipboard?.writeText)return navigator.clipboard.writeText(text);const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()};
  document.addEventListener('click',async e=>{const btn=e.target.closest('.booking-number-copy');if(!btn)return;e.preventDefault();e.stopPropagation();try{await copyText(btn.dataset.copyNumber);const h=btn.querySelector('.copy-hint');if(h){const old=h.textContent;h.textContent='הועתק ✓';setTimeout(()=>h.textContent=old,1400)}}catch(_){}});

  document.querySelectorAll('a[href*="mail.google.com/mail/"]').forEach(a=>{if(a.classList.contains('hotel-mail-cta'))return;try{const old=new URL(a.href);a.href=`https://mail.google.com/mail/?authuser=${encodeURIComponent(GMAIL_ACCOUNT)}${old.hash||'#inbox'}`}catch(_){}});
  document.querySelectorAll('a[href^="day-"]').forEach(a=>{try{const u=new URL(a.getAttribute('href'),location.href);u.searchParams.set('v',ASSET_VERSION);a.setAttribute('href',`${u.pathname.split('/').pop()}?${u.searchParams.toString()}`)}catch(_){}});

  normalizeRows();
  decorateDriveRows();
  formatTimes();
  placeHotelBubbles();
  placeCarBubble();
})();
