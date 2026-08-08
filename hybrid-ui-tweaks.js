(() => {
  const ASSET_VERSION = 'ui19';
  const GMAIL_ACCOUNT = 'odedn72@gmail.com';

  const currentDay = () => document.querySelector('.navlinks [aria-current="page"]')?.textContent?.trim();

  const makeRow = (time, title, desc, mapLabel, mapQuery) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><strong>${time}</strong></td><td><strong>${title}</strong><br><span>${desc || ''}</span>${mapLabel ? `<div class="inline-maps"><a class="inline-map" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}">${mapLabel}</a></div>` : ''}</td>`;
    return tr;
  };

  const patchDay8Plan = () => {
    if (currentDay() !== '8.8') return;
    const tbody = document.querySelector('.schedule tbody');
    if (!tbody) return;

    const text = tbody.textContent || '';
    const alreadyCorrect = text.includes('Kikuchi') && text.includes('Onuma Quasi-National Park') && text.includes('WE Hotel Toya') && !/Morning Market|Goryokaku/i.test(text);
    if (alreadyCorrect) {
      tbody.dataset.ui19Plan = '1';
      return;
    }

    const rows = [
      ['08:00–08:35','בוקר רגוע + צ׳ק־אאוט','בלי ארוחת בוקר גדולה במלון — משאירים את הארוחה לאחר איסוף הרכב.'],
      ['08:45–09:45','נסיעה לשדה התעופה · כ־60 דק׳','מונית ישירות מ־Shin-Hakodate-Hokuto ל־Hakodate Airport / Budget, עם מרווח לפני האיסוף.','Hakodate Airport','Hakodate Airport'],
      ['09:45–10:00','הגעה ל־Budget והתארגנות','זמן לשאטל/דלפק ולמסמכים לפני שעת האיסוף.','Budget','Budget Rent a Car Hakodate Airport'],
      ['10:00','איסוף רכב Budget','Reservation 101847607. צילום הרכב, ETC, GPS, דלק ונזקים קודמים.','Budget','Budget Rent a Car Hakodate Airport'],
      ['10:05–10:20','נסיעה ל־Kikuchi · כ־15 דק׳','עצירה ראשונה קצרה אחרי האיסוף, באזור Yunokawa.','Kikuchi','Coffee Room Kikuchi Hakodate'],
      ['10:20–11:00','Kikuchi — ארוחת בוקר / בראנץ׳','קפה, סנדוויצ׳ים ומנות קלות. לא למשוך יותר מדי זמן כדי להשאיר מקום לארוחת הערב במלון.','Kikuchi','Coffee Room Kikuchi Hakodate'],
      ['11:00–11:45','נסיעה ל־Onuma Quasi-National Park · כ־45 דק׳','מדלגים על Goryōkaku ונוסעים ישר צפונה ל־Onuma.','Onuma Park','Onuma Quasi-National Park Hokkaido'],
      ['11:45–13:20','Onuma Quasi-National Park','כשעה וחצי לטיול בין האגם, האיים והגשרים. אם מזג האוויר יפה אפשר לבחור מסלול הליכה ארוך יותר; אם רעבים, משלבים משהו קל בסוף.','Onuma Park','Onuma Quasi-National Park Hokkaido'],
      ['13:20–13:50','Late lunch / snack אופציונלי — Onuma','רק אם רעבים: משהו קל ומהיר. ארוחת הערב במלון כלולה ומתחילה ב־17:30.','Onuma Park','Onuma Quasi-National Park Hokkaido'],
      ['13:50–16:00','נסיעה ל־WE Hotel Toya · כ־2 ש׳ 10 דק׳','להשאיר מרווח קטן לעצירת שירותים/קפה לפי הצורך.','WE Hotel Toya','WE Hotel Toya'],
      ['16:00–16:25','צ׳ק־אין WE Hotel Toya','צ׳ק־אין מ־15:00. ארוחת ערב וארוחת בוקר כלולות בהזמנה.','WE Hotel Toya','WE Hotel Toya'],
      ['16:25–17:30','מנוחה / אונסן / מרפסת','זמן להתארגן וליהנות מהנוף לפני ארוחת הערב.'],
      ['17:30–19:00','ארוחת ערב במלון — כלולה','EZO Cuisine. חלון ארוחת הערב 17:30–21:00; הזמנה אחרונה ב־20:00.'],
      ['19:15–20:20','Lake Toya — הליכה על שפת האגם','הליכה רגועה, שקיעה ותמונות.','Lake Toya','Lake Toya Hokkaido'],
      ['20:45–21:05','Lake Toya Long Run Fireworks','לבדוק באותו יום שלא בוטל בגלל רוח או מזג אוויר.','Lake Toya Onsen','Lake Toya Onsen Hokkaido'],
      ['21:05–22:00','אונסן / שתייה / מנוחה','לסיים את היום רגוע.']
    ];

    tbody.replaceChildren(...rows.map(r => makeRow(...r)));
    tbody.dataset.ui19Plan = '1';
    setTimeout(() => document.dispatchEvent(new Event('ui17planready')), 0);
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

  const driveDurationByTitle = [
    [/Lake Shikotsu/i,'כ־1 ש׳ 10 דק׳'],
    [/Furano/i,'כ־2 ש׳ 30 דק׳'],
    [/Ningle Terrace/i,'כ־45 דק׳'],
    [/Shirogane Blue Pond/i,'כ־45 דק׳'],
    [/Shirahige/i,'כ־10 דק׳'],
    [/Shikisai/i,'כ־35 דק׳'],
    [/Farm Tomita/i,'כ־25 דק׳'],
    [/Asahidake/i,'כ־1 ש׳ 30 דק׳'],
    [/Otaru/i,'כ־2 ש׳ 30 דק׳'],
    [/Sapporo/i,'כ־45–60 דק׳']
  ];

  const decorateDriveRows = () => {
    document.querySelectorAll('.schedule tbody tr').forEach(row => {
      const cell = row.querySelector('td:last-child');
      if (!cell) return;
      const candidates = [...cell.querySelectorAll(':scope > strong, :scope > .row-heading strong')];
      const title = candidates.find(el => !el.closest('.hotel-booking-bubble'));
      if (!title || title.dataset.driveIcon === '1') return;
      const text = title.textContent.trim();
      if (!/^(נסיעה\b|Drive\b)/i.test(text)) return;

      if (!/כ־/.test(text)) {
        const match = driveDurationByTitle.find(([re]) => re.test(text));
        if (match) title.append(` · ${match[1]}`);
      }

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
    patchDay8Plan();
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
