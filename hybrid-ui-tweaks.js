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
      {name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5837788989', aliases:['Hotel Indigo','המלון']}
    ],
    '6.8': [
      {name:'ReLabo -Medical Spa & Stay-', platform:'Booking.com', number:'6654249708', aliases:['צ׳ק־אין ב־ReLabo','ReLabo']}
    ],
    '7.8': [
      {name:"La’gent Plaza Hakodate Hokuto", platform:'Agoda', number:'1755948686', aliases:["צ׳ק־אין ב־La’gent Plaza","La’gent Plaza","La'gent Plaza"]}
    ],
    '8.8': [
      {name:'WE Hotel Toya - Dusit Collection', platform:'Booking.com', number:'5090390400', aliases:['צ׳ק־אין WE Hotel Toya','WE Hotel Toya']}
    ],
    '9.8': [
      {name:'Hotel Mahoroba', platform:'Booking.com', number:'6550170726', aliases:['צ׳ק־אין Hotel Mahoroba','Hotel Mahoroba']}
    ],
    '10.8': [
      {name:'La Vista Furano Hills', platform:'Booking.com', number:'5675536037', aliases:['צ׳ק־אין La Vista Furano Hills','La Vista Furano Hills']}
    ],
    '11.8': [
      {name:'La Vista Furano Hills', platform:'Booking.com', number:'5675536037', aliases:['חזרה למלון','La Vista Furano Hills']}
    ],
    '12.8': [
      {name:'La Vista Daisetsuzan', platform:'Agoda', number:'1755974229', aliases:['צ׳ק־אין La Vista Daisetsuzan','La Vista Daisetsuzan']}
    ],
    '13.8': [
      {name:'Solaria Nishitetsu Hotel Sapporo', platform:'Booking.com', number:'6515535616', aliases:['צ׳ק־אין Solaria Nishitetsu','Solaria Nishitetsu']}
    ],
    '14.8': [
      {name:'Hotel Indigo Tokyo Shibuya', platform:'Booking.com', number:'5466329081', aliases:['Hotel Indigo שיבויה','Hotel Indigo']}
    ]
  };

  const gmailSearch = hotel => {
    const q = `"${hotel.number}" OR "${hotel.name}"`;
    return `https://mail.google.com/mail/u/?authuser=odedn72@gmail.com#search/${encodeURIComponent(q)}`;
  };

  const currentDay = () => document.querySelector('.navlinks [aria-current="page"]')?.textContent?.trim();

  const hotelBubble = h => {
    const d = document.createElement('details');
    d.className = 'hotel-booking-bubble hotel-booking-inline';
    d.dataset.bookingNumber = h.number;
    d.innerHTML = `
      <summary><span class="hotel-icon">🏨</span><span class="hotel-summary"><b>פרטי המלון וההזמנה</b><small>${h.name}</small></span><span class="hotel-chevron">⌄</span></summary>
      <div class="hotel-booking-body">
        <div class="hotel-booking-meta"><span>${h.platform}</span><strong>${h.number}</strong></div>
        <a class="hotel-mail-cta" target="_blank" rel="noopener" href="${gmailSearch(h)}">✉️ פתח אישור ב-Gmail</a>
      </div>`;
    return d;
  };

  const isCheckoutRow = row => /צ[׳']?ק[־-]?אאוט|check\s*-?\s*out/i.test(row.textContent);

  const findHotelRow = hotel => {
    const rows = [...document.querySelectorAll('.schedule tbody tr')].filter(r => !isCheckoutRow(r));
    for (const alias of hotel.aliases || []) {
      const row = rows.find(r => r.textContent.includes(alias) && !r.querySelector(`[data-booking-number="${hotel.number}"]`));
      if (row) return row;
    }
    const nameBits = hotel.name.split(/\s+/).filter(x => x.length > 4);
    return rows.find(r => nameBits.some(bit => r.textContent.includes(bit)) && !r.querySelector(`[data-booking-number="${hotel.number}"]`)) || null;
  };

  const removeLegacyHotelMailBubble = cell => {
    cell.querySelectorAll('.inline-mails').forEach(group => {
      const text = group.textContent || '';
      if (/מלון|hotel|La.?gent|ReLabo|Mahoroba|Vista|Solaria|Indigo|WE Hotel/i.test(text)) group.remove();
    });
  };

  const placeHotelBubbles = () => {
    document.querySelectorAll('.hotel-booking-group').forEach(el => el.remove());
    document.querySelectorAll('.hotel-booking-inline').forEach(el => el.remove());
    const day = currentDay();
    const hotels = hotelByDay[day];
    if (!hotels?.length) return;
    hotels.forEach(h => {
      const row = findHotelRow(h);
      const cell = row?.querySelector('td:last-child');
      if (!cell) return;
      removeLegacyHotelMailBubble(cell);
      cell.appendChild(hotelBubble(h));
    });
  };

  const forceCorrectGmailUser = () => {
    document.querySelectorAll('a[href*="mail.google.com/mail/"]').forEach(a => {
      let href = a.getAttribute('href') || '';
      const hashIndex = href.indexOf('#');
      const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
      a.setAttribute('href', `https://mail.google.com/mail/u/?authuser=odedn72@gmail.com${hash}`);
    });
  };

  const run = () => {
    splitTimes();
    placeHotelBubbles();
    forceCorrectGmailUser();
  };

  run();
  const observer = new MutationObserver(run);
  observer.observe(document.body,{childList:true,subtree:true});
})();
