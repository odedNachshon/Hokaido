(() => {
  const ASSET_VERSION = 'ui12';
  const GMAIL_ACCOUNT = 'odedn72@gmail.com';

  const currentDay = () => document.querySelector('.navlinks [aria-current="page"]')?.textContent?.trim();

  const patchDay8Morning = () => {
    if (currentDay() !== '8.8') return;
    const rows = [...document.querySelectorAll('.schedule tbody tr')];
    if (rows.length < 3) return;
    if (rows[0].textContent.includes('Hakodate Morning Market')) return;

    const setRow = (row, time, title, desc, mapLabel, mapQuery) => {
      const timeCell = row.querySelector('td:first-child');
      const contentCell = row.querySelector('td:last-child');
      if (!timeCell || !contentCell) return;
      timeCell.innerHTML = `<strong>${time}</strong>`;
      contentCell.innerHTML = `<strong>${title}</strong><br><span>${desc}</span>${mapLabel ? `<div class="inline-maps"><a class="inline-map" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}">${mapLabel}</a></div>` : ''}`;
    };

    setRow(rows[0], '07:30–08:30', 'Hakodate Morning Market + ארוחת בוקר', 'ללכת לשוק לפני איסוף הרכב, כשהוא פעיל ונוח להגיע אליו ברגל מאזור התחנה. לאכול כאן ארוחת בוקר/פירות ים.', 'שוק הבוקר', 'Hakodate Morning Market');
    setRow(rows[1], '08:30–08:45', 'חזרה למלון וצ׳ק־אאוט', 'איסוף מזוודות ויציאה לשדה התעופה.');
    setRow(rows[2], '09:00–09:45', 'נסיעה לשדה התעופה', 'להשאיר זמן להגיע לסניף ההשכרה בנחת.', 'Hakodate Airport', 'Hakodate Airport');
  };

  const formatTimes = () => {
    document.querySelectorAll('.schedule td:first-child strong').forEach(el => {
      if (el.querySelector('.time-stack')) return;
      const raw = el.textContent.trim();
      const m = raw.match(/^(?:(עד|לפני|סביב)\s*)?(\d{1,2}:\d{2})(?:\s*[–-]\s*(?:סביב\s*)?(\d{1,2}:\d{2}))?$/);
      if (!m) {
        el.classList.add('time-text');
        return;
      }
      const [, prefix, start, end] = m;
      el.innerHTML = `<span class="time-stack">${prefix ? `<span class="time-prefix">${prefix}</span>` : ''}<span class="time-start">${start}</span>${end ? `<span class="time-end">${end}</span>` : ''}</span>`;
    });
  };

  const hotelByDay = {
    '5.8': [{name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5837788989', aliases:['Hotel Indigo','המלון']}],
    '6.8': [{name:'ReLabo -Medical Spa & Stay-', platform:'Booking.com', number:'6654249708', aliases:['ReLabo']}],
    '7.8': [{name:"La’gent Plaza Hakodate Hokuto", platform:'Agoda', number:'1755948686', aliases:["צ׳ק־אין ב־La’gent Plaza","La’gent Plaza","La'gent Plaza"]}],
    '8.8': [{name:'WE Hotel Toya - Dusit Collection', platform:'Booking.com', number:'5090390400', aliases:['צ׳ק־אין WE Hotel Toya','WE Hotel Toya']}],
    '9.8': [{name:'Hotel Mahoroba', platform:'Booking.com', number:'6550170726', aliases:['צ׳ק־אין Hotel Mahoroba','Hotel Mahoroba']}],
    '10.8': [{name:'La Vista Furano Hills', platform:'Booking.com', number:'5675536037', aliases:['צ׳ק־אין La Vista Furano Hills','La Vista Furano Hills']}],
    '12.8': [{name:'La Vista Daisetsuzan', platform:'Agoda', number:'1755974229', aliases:['צ׳ק־אין La Vista Daisetsuzan','La Vista Daisetsuzan']}],
    '13.8': [{name:'Solaria Nishitetsu Hotel Sapporo', platform:'Booking.com', number:'6515535616', aliases:['צ׳ק־אין Solaria Nishitetsu','Solaria Nishitetsu']}],
    '14.8': [{name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5466329081', aliases:['Hotel Indigo שיבויה','Hotel Indigo']}]
  };

  const gmailSearchUrl = (number, name) => {
    const query = `"${number}" OR "${name}"`;
    return `https://mail.google.com/mail/?authuser=${encodeURIComponent(GMAIL_ACCOUNT)}#search/${encodeURIComponent(query)}`;
  };

  const hotelBubble = h => {
    const d = document.createElement('details');
    d.className = 'hotel-booking-bubble hotel-booking-inline';
    d.dataset.bookingNumber = h.number;
    d.innerHTML = `
      <summary><span class="hotel-icon">🏨</span><span class="hotel-summary"><b>פרטי המלון וההזמנה</b><small>${h.name}</small></span><span class="hotel-chevron">⌄</span></summary>
      <div class="hotel-booking-body">
        <div class="hotel-booking-meta"><span>${h.platform}</span><strong>${h.number}</strong></div>
        <a class="hotel-mail-cta" target="_blank" rel="noopener" href="${gmailSearchUrl(h.number, h.name)}">✉️ פתח את מייל האישור</a>
      </div>`;
    return d;
  };

  const findHotelRow = hotel => {
    const rows = [...document.querySelectorAll('.schedule tbody tr')];
    for (const alias of hotel.aliases || []) {
      const row = rows.find(r => r.textContent.includes(alias));
      if (row) return row;
    }
    return null;
  };

  const placeHotelBubbles = () => {
    document.querySelectorAll('.hotel-booking-group').forEach(el => el.remove());
    const hotels = hotelByDay[currentDay()];
    if (!hotels?.length) return;
    hotels.forEach(h => {
      if (document.querySelector(`[data-booking-number="${h.number}"]`)) return;
      const row = findHotelRow(h);
      const cell = row?.querySelector('td:last-child');
      if (!cell) return;
      cell.querySelectorAll('.inline-mails').forEach(el => el.remove());
      cell.appendChild(hotelBubble(h));
    });
  };

  const normalizeOtherGmailLinks = () => {
    document.querySelectorAll('a[href*="mail.google.com/mail/"]').forEach(a => {
      if (a.classList.contains('hotel-mail-cta') || a.dataset.gmailNormalized === '1') return;
      try {
        const old = new URL(a.href);
        const hash = old.hash || '#inbox';
        a.href = `https://mail.google.com/mail/?authuser=${encodeURIComponent(GMAIL_ACCOUNT)}${hash}`;
        a.dataset.gmailNormalized = '1';
      } catch (_) {}
    });
  };

  const versionDayLinks = () => {
    document.querySelectorAll('a[href^="day-"]').forEach(a => {
      try {
        const u = new URL(a.getAttribute('href'), location.href);
        u.searchParams.set('v', ASSET_VERSION);
        a.setAttribute('href', `${u.pathname.split('/').pop()}?${u.searchParams.toString()}`);
      } catch (_) {}
    });
  };

  const run = () => {
    patchDay8Morning();
    formatTimes();
    placeHotelBubbles();
    normalizeOtherGmailLinks();
    versionDayLinks();
  };

  run();
  const observer = new MutationObserver(run);
  observer.observe(document.body,{childList:true,subtree:true});
})();
