(() => {
  const ASSET_VERSION = 'ui23';
  const GMAIL_ACCOUNT = 'odedn72@gmail.com';

  const currentDay = () => document.querySelector('.navlinks [aria-current="page"]')?.textContent?.trim();
  const rowTitle = row => {
    const cell = row.querySelector('td:last-child');
    if (!cell) return '';
    const direct = [...cell.children].find(el => el.tagName === 'STRONG');
    if (direct) return direct.textContent.trim();
    return cell.querySelector(':scope > .row-heading strong')?.textContent.trim() || '';
  };

  const hotelByDay = {
    '5.8': [{name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5837788989', aliases:['Hotel Indigo','המלון']}],
    '6.8': [{name:'ReLabo -Medical Spa & Stay-', platform:'Booking.com', number:'6654249708', aliases:['ReLabo']}],
    '7.8': [{name:"La’gent Plaza Hakodate Hokuto", platform:'Agoda', number:'1755948686', aliases:["La’gent Plaza","La'gent Plaza"]}],
    '8.8': [{name:'WE Hotel Toya - Dusit Collection', platform:'Booking.com', number:'5090390400', aliases:['WE Hotel Toya']}],
    '9.8': [{name:'Hotel Mahoroba', platform:'Booking.com', number:'6550170726', aliases:['Hotel Mahoroba']}],
    '10.8': [{name:'La Vista Furano Hills', platform:'Booking.com', number:'5675536037', aliases:['La Vista Furano Hills']}],
    '12.8': [{name:'La Vista Daisetsuzan', platform:'Agoda', number:'1755974229', aliases:['La Vista Daisetsuzan']}],
    '13.8': [{name:'Solaria Nishitetsu Hotel Sapporo', platform:'Booking.com', number:'6515535616', aliases:['Solaria Nishitetsu','Solaria']}],
    '14.8': [{name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5466329081', aliases:['Hotel Indigo']}]
  };

  const carBooking = {
    day:'8.8', name:'Budget Rent a Car — Hakodate Airport', platform:'Budget', number:'101847607', aliases:['איסוף רכב Budget']
  };

  const gmailSearchUrl = number => `https://mail.google.com/mail/?authuser=${encodeURIComponent(GMAIL_ACCOUNT)}#search/${encodeURIComponent(`"${number}"`)}`;

  const bookingBubble = ({icon,title,name,platform,number}) => {
    const d = document.createElement('details');
    d.className = 'hotel-booking-bubble hotel-booking-inline';
    d.dataset.bookingNumber = number;
    d.innerHTML = `<summary><span class="hotel-icon">${icon}</span><span class="hotel-summary"><b>${title}</b><small>${name}</small></span><span class="hotel-chevron">⌄</span></summary><div class="hotel-booking-body"><div class="hotel-booking-meta"><span>${platform}</span><button type="button" class="booking-number-copy" data-copy-number="${number}" aria-label="העתק מספר הזמנה ${number}"><span class="booking-number-value">${number}</span><span class="copy-hint">העתק</span></button></div><a class="hotel-mail-cta" target="_blank" rel="noopener" href="${gmailSearchUrl(number)}">✉️ חפש את האישור ב-Gmail</a></div>`;
    return d;
  };

  const rows = () => [...document.querySelectorAll('.schedule tbody tr')];

  const findCheckinRow = aliases => rows().find(row => {
    const title = rowTitle(row);
    return /צ[׳']ק.?אין|check.?in/i.test(title) && aliases.some(alias => title.includes(alias));
  });

  const findExactActivityRow = aliases => rows().find(row => {
    const title = rowTitle(row);
    return aliases.some(alias => title === alias || title.includes(alias));
  });

  const placeHotelBubbles = () => {
    const hotels = hotelByDay[currentDay()] || [];
    hotels.forEach(h => {
      if (document.querySelector(`[data-booking-number="${h.number}"]`)) return;
      const row = findCheckinRow(h.aliases);
      const cell = row?.querySelector('td:last-child');
      if (!cell) return;
      cell.querySelectorAll('.inline-mails').forEach(el => el.remove());
      cell.appendChild(bookingBubble({...h,icon:'🏨',title:'פרטי המלון וההזמנה'}));
    });
  };

  const placeCarBubble = () => {
    if (currentDay() !== carBooking.day || document.querySelector(`[data-booking-number="${carBooking.number}"]`)) return;
    const row = findExactActivityRow(carBooking.aliases);
    const cell = row?.querySelector('td:last-child');
    if (!cell) return;
    cell.querySelectorAll('.inline-mails').forEach(el => el.remove());
    cell.appendChild(bookingBubble({...carBooking,icon:'🚗',title:'פרטי הרכב וההזמנה'}));
  };

  const formatTimes = () => {
    document.querySelectorAll('.schedule td:first-child strong').forEach(el => {
      if (el.querySelector('.time-stack')) return;
      const raw = el.textContent.trim();
      const m = raw.match(/^(?:(עד|לפני|סביב)\s*)?(\d{1,2}:\d{2})(?:\s*[–-]\s*(?:סביב\s*)?(\d{1,2}:\d{2}))?$/);
      if (!m) { el.classList.add('time-text'); return; }
      const [,prefix,start,end] = m;
      el.innerHTML = `<span class="time-stack">${prefix?`<span class="time-prefix">${prefix}</span>`:''}<span class="time-start">${start}</span>${end?`<span class="time-end">${end}</span>`:''}</span>`;
    });
  };

  const driveDurationByTitle = [
    [/שדה התעופה|Hakodate Airport/i,'כ־60 דק׳'],
    [/Kikuchi/i,'כ־15 דק׳'],
    [/Onuma/i,'כ־45 דק׳'],
    [/WE Hotel Toya|Lake Toya/i,'כ־2 ש׳ 10 דק׳'],
    [/Lake Shikotsu/i,'כ־1 ש׳ 10 דק׳'],
    [/Furano/i,'כ־2 ש׳ 30 דק׳'],
    [/Ningle Terrace/i,'כ־45 דק׳'],
    [/Shirogane Blue Pond|Blue Pond/i,'כ־45 דק׳'],
    [/Shirahige/i,'כ־10 דק׳'],
    [/Shikisai/i,'כ־35 דק׳'],
    [/Farm Tomita/i,'כ־25 דק׳'],
    [/Asahidake/i,'כ־1 ש׳ 30 דק׳'],
    [/Otaru/i,'כ־2 ש׳ 30 דק׳'],
    [/Sapporo/i,'כ־45–60 דק׳']
  ];

  const decorateDriveRows = () => {
    rows().forEach(row => {
      const cell = row.querySelector('td:last-child');
      const titleEl = [...(cell?.querySelectorAll(':scope > strong, :scope > .row-heading strong') || [])][0];
      if (!titleEl) return;
      const text = titleEl.textContent.trim();
      if (!/^(נסיעה\b|Drive\b)/i.test(text)) return;
      if (!/כ־/.test(text)) {
        const match = driveDurationByTitle.find(([re]) => re.test(text));
        if (match) titleEl.append(` · ${match[1]}`);
      }
      if (!titleEl.querySelector('.drive-icon')) {
        const icon = document.createElement('span');
        icon.className='drive-icon'; icon.textContent='🚗'; icon.setAttribute('aria-hidden','true');
        titleEl.prepend(icon);
      }
    });
  };

  const copyText = async text => {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    const ta=document.createElement('textarea'); ta.value=text; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
  };

  document.addEventListener('click', async event => {
    const btn = event.target.closest('.booking-number-copy');
    if (!btn) return;
    event.preventDefault(); event.stopPropagation();
    try {
      await copyText(btn.dataset.copyNumber);
      const hint=btn.querySelector('.copy-hint'); if (!hint) return;
      const old=hint.textContent; hint.textContent='הועתק ✓'; setTimeout(()=>{hint.textContent=old},1400);
    } catch (_) {}
  });

  document.querySelectorAll('a[href*="mail.google.com/mail/"]').forEach(a => {
    if (a.classList.contains('hotel-mail-cta')) return;
    try { const old=new URL(a.href); a.href=`https://mail.google.com/mail/?authuser=${encodeURIComponent(GMAIL_ACCOUNT)}${old.hash||'#inbox'}`; } catch (_) {}
  });

  document.querySelectorAll('a[href^="day-"]').forEach(a => {
    try {
      const u=new URL(a.getAttribute('href'),location.href); u.searchParams.set('v',ASSET_VERSION);
      a.setAttribute('href',`${u.pathname.split('/').pop()}?${u.searchParams.toString()}`);
    } catch (_) {}
  });

  formatTimes();
  placeHotelBubbles();
  placeCarBubble();
  decorateDriveRows();
})();
