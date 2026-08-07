(() => {
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
    '5.8': [{name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5837788989', messageId:'19fb78f70ae73b9f', aliases:['Hotel Indigo','המלון']}],
    '6.8': [{name:'ReLabo -Medical Spa & Stay-', platform:'Booking.com', number:'6654249708', messageId:'19fcc7b2e34e2151', aliases:['ReLabo']}],
    '7.8': [{name:"La’gent Plaza Hakodate Hokuto", platform:'Agoda', number:'1755948686', messageId:'19fb8f963efcca44', aliases:["צ׳ק־אין ב־La’gent Plaza","La’gent Plaza","La'gent Plaza"]}],
    '8.8': [{name:'WE Hotel Toya - Dusit Collection', platform:'Booking.com', number:'5090390400', messageId:'19fb94e3568e722d', aliases:['צ׳ק־אין WE Hotel Toya','WE Hotel Toya']}],
    '9.8': [{name:'Hotel Mahoroba', platform:'Booking.com', number:'6550170726', messageId:'19fb95f286b4fc8a', aliases:['צ׳ק־אין Hotel Mahoroba','Hotel Mahoroba']}],
    '10.8': [{name:'La Vista Furano Hills', platform:'Booking.com', number:'5675536037', messageId:'19fb9675cdd05536', aliases:['צ׳ק־אין La Vista Furano Hills','La Vista Furano Hills']}],
    '12.8': [{name:'La Vista Daisetsuzan', platform:'Agoda', number:'1755974229', messageId:'19fb96cbd82ace2a', aliases:['צ׳ק־אין La Vista Daisetsuzan','La Vista Daisetsuzan']}],
    '13.8': [{name:'Solaria Nishitetsu Hotel Sapporo', platform:'Booking.com', number:'6515535616', messageId:'19fb97036b54782c', aliases:['צ׳ק־אין Solaria Nishitetsu','Solaria Nishitetsu']}],
    '14.8': [{name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5466329081', messageId:'19fd1d80fb756f17', aliases:['Hotel Indigo שיבויה','Hotel Indigo']}]
  };

  const gmailMessageUrl = hotel => `https://mail.google.com/mail/u/odedn72@gmail.com/#all/${hotel.messageId}`;
  const currentDay = () => document.querySelector('.navlinks [aria-current="page"]')?.textContent?.trim();

  const hotelBubble = h => {
    const d = document.createElement('details');
    d.className = 'hotel-booking-bubble hotel-booking-inline';
    d.dataset.bookingNumber = h.number;
    d.innerHTML = `
      <summary><span class="hotel-icon">🏨</span><span class="hotel-summary"><b>פרטי המלון וההזמנה</b><small>${h.name}</small></span><span class="hotel-chevron">⌄</span></summary>
      <div class="hotel-booking-body">
        <div class="hotel-booking-meta"><span>${h.platform}</span><strong>${h.number}</strong></div>
        <a class="hotel-mail-cta" target="_blank" rel="noopener" href="${gmailMessageUrl(h)}">✉️ פתח את מייל האישור</a>
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
      if (a.classList.contains('hotel-mail-cta')) return;
      try {
        const hash = new URL(a.href).hash;
        a.href = `https://mail.google.com/mail/u/odedn72@gmail.com/${hash}`;
      } catch (_) {}
    });
  };

  const run = () => {
    formatTimes();
    placeHotelBubbles();
    normalizeOtherGmailLinks();
  };

  run();
  const observer = new MutationObserver(run);
  observer.observe(document.body,{childList:true,subtree:true});
})();
