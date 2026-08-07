(() => {
  const splitTimes = () => {
    document.querySelectorAll('.schedule td:first-child strong').forEach(el => {
      if (el.querySelector('.time-stack')) return;
      const raw = el.textContent.trim();
      const m = raw.match(/^(\d{1,2}:\d{2})\s*[–-]\s*(?:סביב\s*)?(\d{1,2}:\d{2})$/);
      if (!m) return;
      el.innerHTML = `<span class="time-stack"><span class="time-start">${m[1]}</span><span class="time-end">${m[2]}</span></span>`;
    });
  };

  const hotelByDay = {
    '5.8': [
      {name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5837788989', note:'לינה 5–6.8'}
    ],
    '6.8': [
      {name:'ReLabo -Medical Spa & Stay-', platform:'Booking.com', number:'6654249708', note:'לינה 6–7.8'}
    ],
    '7.8': [
      {name:'ReLabo -Medical Spa & Stay-', platform:'Booking.com', number:'6654249708', note:'מלון הבוקר / צ׳ק־אאוט'},
      {name:"La’gent Plaza Hakodate Hokuto", platform:'Agoda', number:'1755948686', note:'לינה 7–8.8'}
    ],
    '8.8': [
      {name:'WE Hotel Toya - Dusit Collection', platform:'Booking.com', number:'5090390400', note:'לינה 8–9.8'}
    ],
    '9.8': [
      {name:'Hotel Mahoroba', platform:'Booking.com', number:'6550170726', note:'לינה 9–10.8'}
    ],
    '10.8': [
      {name:'La Vista Furano Hills', platform:'Booking.com', number:'5675536037', note:'לינה 10–12.8'}
    ],
    '11.8': [
      {name:'La Vista Furano Hills', platform:'Booking.com', number:'5675536037', note:'לילה שני · 10–12.8'}
    ],
    '12.8': [
      {name:'La Vista Daisetsuzan', platform:'Agoda', number:'1755974229', note:'לינה 12–13.8'}
    ],
    '13.8': [
      {name:'Solaria Nishitetsu Hotel Sapporo', platform:'Booking.com', number:'6515535616', note:'לינה 13–14.8'}
    ],
    '14.8': [
      {name:'Solaria Nishitetsu Hotel Sapporo', platform:'Booking.com', number:'6515535616', note:'מלון הבוקר / צ׳ק־אאוט'},
      {name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5466329081', note:'לינה 14–15.8'}
    ],
    '15.8': [
      {name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5466329081', note:'מלון הבוקר / צ׳ק־אאוט'}
    ]
  };

  const gmailSearch = hotel => {
    const q = `"${hotel.number}" OR "${hotel.name}"`;
    return `https://mail.google.com/mail/?authuser=odedn72@gmail.com#search/${encodeURIComponent(q)}`;
  };

  const currentDay = () => document.querySelector('.navlinks [aria-current="page"]')?.textContent?.trim();

  const addHotelBubbles = () => {
    if (document.querySelector('.hotel-booking-group')) return;
    const day = currentDay();
    const hotels = hotelByDay[day];
    if (!hotels?.length) return;
    const anchor = document.querySelector('.day-nav') || document.querySelector('main .panel');
    if (!anchor) return;
    const group = document.createElement('section');
    group.className = 'hotel-booking-group';
    group.setAttribute('aria-label','פרטי מלונות');
    group.innerHTML = hotels.map(h => `
      <details class="hotel-booking-bubble">
        <summary><span class="hotel-icon">🏨</span><span class="hotel-summary"><b>${h.name}</b><small>${h.note}</small></span><span class="hotel-chevron">⌄</span></summary>
        <div class="hotel-booking-body">
          <div class="hotel-booking-meta"><span>${h.platform}</span><strong>${h.number}</strong></div>
          <a class="hotel-mail-cta" target="_blank" rel="noopener" href="${gmailSearch(h)}">✉️ פתח אישור ב-Gmail</a>
        </div>
      </details>`).join('');
    anchor.insertAdjacentElement('afterend', group);
  };

  const forceCorrectGmailUser = () => {
    document.querySelectorAll('a[href*="mail.google.com/mail/"]').forEach(a => {
      a.href = a.href.replace(/authuser=[^#&]+/i,'authuser=odedn72@gmail.com');
    });
  };

  const run = () => {
    splitTimes();
    addHotelBubbles();
    forceCorrectGmailUser();
  };

  run();
  const observer = new MutationObserver(run);
  observer.observe(document.body,{childList:true,subtree:true});
})();
