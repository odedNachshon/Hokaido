(() => {
  const current = document.querySelector('.navlinks [aria-current="page"]')?.textContent?.trim();
  const statusClass = { fixed:'status-fixed', planned:'status-planned', flexible:'status-flexible', live:'status-live' };
  const statusLabel = { fixed:'קבוע', planned:'מתוכנן', flexible:'גמיש', live:'לבדוק היום' };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const maps = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  const replacementSchedules = {
    '10.8': [
      ['07:30–08:30','planned','ארוחת בוקר',''],
      ['08:30–09:00','planned','צ׳ק-אאוט + העמסת הרכב',''],
      ['09:00–10:10','planned','נסיעה ל-Lake Shikotsu','בערך שעה.','Lake Shikotsu'],
      ['10:10–12:10','planned','Lake Shikotsu','טיילת, קפה, Visitor Center; שיט קצר רק אם זמין בלי תור.','Lake Shikotsu'],
      ['12:10–12:50','flexible','ארוחת צהריים קלה',''],
      ['12:50–15:20','planned','נסיעה ל-Furano','להשאיר מרווח לעצירה.','La Vista Furano Hills'],
      ['15:20–15:40','planned','צ׳ק-אין La Vista Furano Hills','לילה 1/2.','La Vista Furano Hills'],
      ['15:40–17:00','flexible','מנוחה / אונסן',''],
      ['17:00–18:00','flexible','Furano Marche','אוכל מקומי / סיבוב.','Furano Marche'],
      ['18:00–19:30','flexible','ארוחת ערב','Furano.'],
      ['19:30–20:15','flexible','נסיעה ל-Ningle Terrace',''],
      ['20:15–21:15','flexible','Ningle Terrace','יפה במיוחד עם התאורה.','Ningle Terrace'],
      ['21:15–21:30','planned','חזרה למלון','']
    ],
    '11.8': [
      ['06:30–07:00','planned','קפה / התארגנות','לצאת מוקדם.'],
      ['07:00–08:00','planned','נסיעה ל-Blue Pond',''],
      ['08:00–08:45','planned','Shirogane Blue Pond','לפני העומס הגדול.','Shirogane Blue Pond'],
      ['08:45–09:00','planned','נסיעה קצרה',''],
      ['09:00–09:30','planned','Shirahige Falls','עצירת תצפית קצרה.','Shirahige Falls Biei'],
      ['09:30–10:10','planned','נסיעה ל-Shikisai no Oka',''],
      ['10:10–11:45','planned','Shikisai no Oka','גבעות פרחים.','Shikisai no Oka'],
      ['11:45–12:45','flexible','ארוחת צהריים','Biei / בדרך.'],
      ['12:45–13:20','planned','נסיעה ל-Farm Tomita',''],
      ['13:20–15:30','planned','Farm Tomita','פרחים, גלידה וחנויות.','Farm Tomita'],
      ['15:30–16:00','flexible','קפה / הפסקה',''],
      ['16:00–17:00','flexible','Patchwork Road','רק אם עדיין יש כוח.','Patchwork Road Biei'],
      ['17:00–18:00','planned','חזרה לפוראנו',''],
      ['18:00–19:30','flexible','ארוחת ערב',''],
      ['19:30–21:00','flexible','אונסן / ערב חופשי','לא להוסיף עוד יעד.']
    ],
    '12.8': [
      ['07:30–08:30','flexible','בוקר רגוע / ארוחת בוקר',''],
      ['08:30–09:30','flexible','פעילות קטנה בפוראנו','קפה / Furano Marche / מקום קטן שפספסנו.'],
      ['09:30–11:00','planned','נסיעה ל-Asahidake',''],
      ['11:00–11:30','planned','הגעה ל-La Vista Daisetsuzan','חניה / השארת ציוד.','La Vista Daisetsuzan'],
      ['11:30–12:15','flexible','ארוחת צהריים קלה',''],
      ['12:15–12:30','live','בדיקת מזג אוויר','עננות, ראות, רוח, גשם ומצב Ropeway.','Asahidake Ropeway'],
      ['12:30–15:30','flexible','Asahidake Ropeway + Sugatami','אם הראות טובה.','Asahidake Ropeway'],
      ['16:00–17:00','flexible','אונסן / מנוחה',''],
      ['17:30 או 20:00','live','ארוחת ערב','לפי הסבב שנבחר במלון.']
    ],
    '13.8': [
      ['07:00–08:00','planned','ארוחת בוקר','Plan A — אם ה-Ropeway כבר נעשה.'],
      ['08:00–08:30','planned','צ׳ק-אאוט',''],
      ['08:30–12:00','planned','נסיעה ל-Otaru','זמן תכנון בלבד; לבדוק עומסי כביש.','Otaru'],
      ['12:00–13:00','planned','סושי / דגים','Otaru ידועה בדגים, פירות ים וסושי.','Otaru'],
      ['13:00–13:40','planned','Otaru Canal','התעלה והמחסנים ההיסטוריים.','Otaru Canal'],
      ['13:40–14:35','planned','Sakaimachi Street','חנויות, ממתקים, קפה ומבנים ישנים.','Sakaimachi Street Otaru'],
      ['14:35–15:10','planned','Kitaichi Glass','זכוכית ומלאכת יד מקומית.','Kitaichi Glass Otaru'],
      ['15:10–15:40','flexible','קפה / קינוח',''],
      ['15:40–16:40','planned','נסיעה ל-Sapporo',''],
      ['16:40–17:15','planned','צ׳ק-אין Solaria','ארוחת בוקר כלולה.','Solaria Nishitetsu Hotel Sapporo'],
      ['18:30–20:00','flexible','ארוחת ערב בסאפורו',''],
      ['20:00–22:00','flexible','Susukino / Tanukikoji','ערב עירוני.','Susukino Sapporo']
    ]
  };

  const renderReplacement = day => {
    const rows = replacementSchedules[day];
    if (!rows) return;
    const tbody = document.querySelector('.schedule tbody');
    if (!tbody) return;
    tbody.innerHTML = rows.map(([time,status,title,text,mapq]) => `<tr><td><strong>${esc(time)}</strong></td><td><div class="row-heading"><strong>${esc(title)}</strong><span class="status-pill ${statusClass[status]}">${statusLabel[status]}</span></div>${text?`<span>${esc(text)}</span>`:''}${mapq?`<div class="inline-maps"><a class="inline-map" target="_blank" rel="noopener" href="${maps(mapq)}">${esc(title)}</a></div>`:''}</td></tr>`).join('');
  };

  const addPlans = day => {
    if (day !== '12.8' && day !== '13.8') return;
    const schedulePanel = document.querySelector('.schedule')?.closest('.panel');
    if (!schedulePanel || document.querySelector('.plan-panel')) return;
    const section = document.createElement('section');
    section.className='panel plan-panel';
    section.innerHTML=`<h2>⛅ החלטת Asahidake</h2><div class="plan-grid"><div class="plan-choice recommended"><b>Plan A — מומלץ</b><p>אם הראות טובה ב-12.8: עולים בצהריים ולא דוחים.</p></div><div class="plan-choice"><b>Plan B</b><p>אם מזג האוויר גרוע ב-12.8: Ropeway מוקדם ב-13.8 ואז Otaru מקוצר.</p></div><div class="plan-choice"><b>Plan C</b><p>אם גם 13.8 גרוע: מוותרים על הרכבל ושומרים על Otaru + Sapporo ועל יום הטיסה.</p></div></div>`;
    schedulePanel.insertAdjacentElement('afterend',section);
  };

  const collapsibleInfo = () => {
    document.querySelectorAll('.grid .panel.info').forEach(panel => {
      if (panel.closest('details')) return;
      const h = panel.querySelector('h2');
      if (!h) return;
      const det=document.createElement('details'); det.className='compact-details';
      const sum=document.createElement('summary'); sum.textContent=h.textContent; det.appendChild(sum);
      [...panel.childNodes].forEach(n=>{ if(n!==h) det.appendChild(n.cloneNode(true)); });
      panel.replaceWith(det);
    });
  };

  if (current) {
    renderReplacement(current);
    addPlans(current);
    collapsibleInfo();
  }

  document.querySelector('.navlinks [aria-current="page"]')?.scrollIntoView({block:'nearest',inline:'center'});
})();
