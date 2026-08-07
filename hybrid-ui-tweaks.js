(() => {
  const ASSET_VERSION = 'ui14';
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

  const carBooking = {
    day:'8.8',
    name:'Budget Rent a Car — Hakodate Airport',
    platform:'Budget',
    number:'101847607',
    aliases:['איסוף רכב Budget','Budget Rent a Car']
  };

  const gmailSearchUrl = number => {
    const encodedNumber = encodeURIComponent(`"${number}"`);
    return `https://mail.google.com/mail/?authuser=${encodeURIComponent(GMAIL_ACCOUNT)}#search/${encodedNumber}`;
  };

  const bookingBubble = ({icon, title, name, platform, number}) => {
    const d = document.createElement('details');
    d.className = 'hotel-booking-bubble hotel-booking-inline';
    d.dataset.bookingNumber = number;
    d.innerHTML = `
      <summary><span class="hotel-icon">${icon}</span><span class="hotel-summary"><b>${title}</b><small>${name}</small></span><span class="hotel-chevron">⌄</span></summary>
      <div class="hotel-booking-body">
        <div class="hotel-booking-meta"><span>${platform}</span><button type="button" class="booking-number-copy" data-copy-number="${number}" aria-label="העתק מספר הזמנה ${number}"><span class="booking-number-value">${number}</span><span class="copy-hint">העתק</span></button></div>
        <a class="hotel-mail-cta" target="_blank" rel="noopener" href="${gmailSearchUrl(number)}">✉️ חפש את האישור ב-Gmail</a>
      </div>`;
    return d;
  };

  const findRowByAliases = aliases => {
    const rows = [...document.querySelectorAll('.schedule tbody tr')];
    for (const alias of aliases || []) {
      const row = rows.find(r => r.textContent.includes(alias));
      if (row) return row;
    }
    return null;
  };

  const placeBookingBubble = (booking, options) => {
    if (document.querySelector(`[data-booking-number="${booking.number}"]`)) return;
    const row = findRowByAliases(booking.aliases);
    const cell = row?.querySelector('td:last-child');
    if (!cell) return;
    cell.querySelectorAll('.inline-mails').forEach(el => el.remove());
    cell.appendChild(bookingBubble({...booking, ...options}));
  };

  const placeHotelBubbles = () => {
    document.querySelectorAll('.hotel-booking-group').forEach(el => el.remove());
    const hotels = hotelByDay[currentDay()];
    if (!hotels?.length) return;
    hotels.forEach(h => placeBookingBubble(h,{icon:'🏨',title:'פרטי המלון וההזמנה'}));
  };

  const placeCarBubble = () => {
    if (currentDay() !== carBooking.day) return;
    placeBookingBubble(carBooking,{icon:'🚗',title:'פרטי הרכב וההזמנה'});
  };

  const copyText = async text => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    ta.remove();
  };

  const enableBookingCopy = () => {
    if (document.body.dataset.bookingCopyReady === '1') return;
    document.body.dataset.bookingCopyReady = '1';
    document.addEventListener('click', async event => {
      const btn = event.target.closest('.booking-number-copy');
      if (!btn) return;
      event.preventDefault();
      event.stopPropagation();
      const number = btn.dataset.copyNumber;
      try {
        await copyText(number);
        const hint = btn.querySelector('.copy-hint');
        if (!hint) return;
        const old = hint.textContent;
        hint.textContent = 'הועתק ✓';
        setTimeout(() => { hint.textContent = old; }, 1400);
      } catch (_) {}
    });
  };

  const decorateDriveRows = () => {
    document.querySelectorAll('.schedule tbody tr').forEach(row => {
      const cell = row.querySelector('td:last-child');
      if (!cell) return;
      const candidates = [...cell.querySelectorAll(':scope > strong, :scope > .row-heading strong')];
      const title = candidates.find(el => !el.closest('.hotel-booking-bubble'));
      if (!title || title.dataset.driveIcon === '1') return;
      const text = title.textContent.trim();
      if (!/^(נסיעה\b|Drive\b)/i.test(text)) return;
      const icon = document.createElement('span');
      icon.className = 'drive-icon';
      icon.textContent = '🚗';
      icon.setAttribute('aria-hidden','true');
      title.prepend(icon);
      title.dataset.driveIcon = '1';
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
    placeCarBubble();
    enableBookingCopy();
    decorateDriveRows();
    normalizeOtherGmailLinks();
    versionDayLinks();
  };

  run();
  const observer = new MutationObserver(run);
  observer.observe(document.body,{childList:true,subtree:true});
})();
