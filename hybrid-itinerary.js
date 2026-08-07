(() => {
  const current = document.querySelector('.navlinks [aria-current="page"]')?.textContent?.trim();

  const statusClass = { fixed:'status-fixed', planned:'status-planned', flexible:'status-flexible', live:'status-live' };
  const statusLabel = { fixed:'קבוע', planned:'מתוכנן', flexible:'גמיש', live:'לבדוק היום' };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const maps = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  const details = {
    '7.8': {
      'ASPAM / אזור הנמל': {status:'flexible', duration:'60–75 דקות', effort:'קל', type:'עיר / הליכה', map:'ASPAM Aomori', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Aomori%20Prefecture%20Tourist%20Center%20ASPAM.jpg?width=1200', desc:'ASPAM הוא המבנה המשולש הבולט בנמל אאומורי. האזור סביבו פתוח ונוח לסיבוב קצר, והוא גם עוזר להבין את הגיאוגרפיה של אזור הנמל והזיקוקים לפני הערב.', tip:'להישאר קרוב לתחנה ולמלון ולא לבזבז אנרגיה על הליכה ארוכה.'},
      'Nebuta Day Parade': {status:'fixed', duration:'כשעתיים', effort:'קל', type:'פסטיבל', map:'Aomori Nebuta Festival', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Aomori%20Nebuta%20Festival-1.jpg?width=1200', desc:'המצעד האחרון של פסטיבל Nebuta מציג את הקרונות הענקיים באור יום יחד עם הרקדנים והקבוצות. דווקא באור יום רואים טוב יותר את הצביעה, המבנה והפרטים של הקרונות.', tip:'לבחור קטע ישר עם אפשרות לצאת אחורה בקלות, ולא להיתקע בקו הראשון.'},
      'Nebuta Maritime Parade + Fireworks': {status:'fixed', duration:'כל האירוע', effort:'קל', type:'פסטיבל', map:'Aomori Port', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Aomori%20Nebuta%20Festival%20fireworks.jpg?width=1200', desc:'אירוע הסיום הגדול: חלק מקרונות ה-Nebuta מוצגים על סירות בנמל ומעליהם מופע זיקוקים גדול. זה אחד מרגעי השיא של הטיול, אבל גם האירוע שבו חשוב במיוחד לחשוב על היציאה.', tip:'לא להיכנס עמוק לאזור צפוף אם זה מקשה על היציאה לכיוון Aomori Station.'}
    },
    '8.8': {
      'Goryokaku': {status:'planned', duration:'90 דקות', effort:'קל', type:'היסטוריה / תצפית', map:'Goryokaku Tower', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Goryokaku%20from%20Goryokaku%20Tower.jpg?width=1200', desc:'Goryokaku היא מצודה מהמאה ה-19 שנבנתה בצורת כוכב. המבנה הגיאומטרי שלה נראה בצורה הטובה ביותר ממגדל Goryokaku, ולכן מקבלים גם תצפית טובה וגם קצת היסטוריה בלי להקדיש חצי יום.', tip:'לא להוסיף גם Morning Market וגם Motomachi. היום הזה בכוונה לא עמוס.'},
      'Lake Toya': {status:'flexible', duration:'45–60 דקות', effort:'קל', type:'טבע', map:'Lake Toya', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Toya.JPG?width=1200', desc:'Lake Toya הוא אגם קלדרה גדול המוקף הרים, עם איים במרכזו. סוף היום מתאים במיוחד להליכה שקטה ליד המים בלי להוסיף עוד נסיעה.', tip:'אם יש עייפות, לקצר ולהשאיר כוח לערב.'},
      'Lake Toya Long Run Fireworks': {status:'live', duration:'כ-20 דקות', effort:'קל', type:'זיקוקים', map:'Lake Toya Onsen', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Toya.JPG?width=1200', desc:'מופע זיקוקים קצר יחסית מעל האגם. ההשתקפות על המים היא חלק גדול מהחוויה, ולכן הוא שווה גם אחרי יום נסיעה.', tip:'לבדוק באותו ערב שהמופע מתקיים; רוח או מזג אוויר עלולים להביא לביטול.'}
    },
    '9.8': {
      'Silo Observatory': {status:'planned', duration:'30–45 דקות', effort:'קל', type:'תצפית', map:'Silo Observatory Lake Toya', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Toya.JPG?width=1200', desc:'נקודת תצפית גבוהה מעל Lake Toya והאיים שבמרכזו. זו עצירה קצרה שנותנת פרספקטיבה מצוינת על הקלדרה לפני שממשיכים לאזור הוולקני.', tip:'לא להפוך אותה לעצירה ארוכה מדי.'},
      'Usuzan Ropeway': {status:'planned', duration:'90–105 דקות', effort:'קל–בינוני', type:'רכבל / טבע', map:'Usuzan Ropeway', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Showa-shinzan.jpg?width=1200', desc:'הרכבל עולה לאזור הר הגעש Usu עם תצפיות על Showa-Shinzan, Lake Toya והנוף הוולקני. הוא נותן הקשר טוב למה שרואים מאוחר יותר ב-Jigokudani.', tip:'אם יש עננות כבדה מאוד אפשר לקצר.'},
      'Jigokudani': {status:'planned', duration:'1.5–2 שעות', effort:'קל–בינוני', type:'טבע', map:'Jigokudani Noboribetsu', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Jigokudani%20Noboribetsu.jpg?width=1200', desc:'“עמק הגיהינום” הוא אזור גיאותרמי עם אדים, גופרית ובריכות געשיות. הנוף דרמטי ושונה מאוד מהאגמים של הימים הקודמים.', tip:'אם חם מאוד, אין צורך לעשות את כל המסלולים.'}
    },
    '10.8': {
      'Lake Shikotsu': {status:'planned', duration:'כשעתיים', effort:'קל', type:'טבע', map:'Lake Shikotsu', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Shikotsu.jpg?width=1200', desc:'Lake Shikotsu הוא אגם קלדרה עם מים צלולים מאוד, מוקף הרים ויער. המטרה כאן היא ליהנות מהטיילת, קפה או Visitor Center, ואולי שיט קצר אם אין תור — בלי לשרוף חצי יום.', tip:'לא להאריך מעבר לשעתיים כדי לא להגיע לפוראנו מאוחר.'},
      'Furano Marche': {status:'flexible', duration:'45–60 דקות', effort:'קל', type:'אוכל / קניות', map:'Furano Marche', image:null, desc:'מרכז קטן ונוח עם תוצרת מקומית, חנויות ומקומות אוכל. זו עצירה לא מחייבת שמתאימה במיוחד אחרי יום נהיגה.', tip:'אם עייפים, אפשר לקצר בלי לפגוע ביום.'},
      'Ningle Terrace': {status:'flexible', duration:'45–60 דקות', effort:'קל', type:'ערב / אווירה', map:'Ningle Terrace', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Ningle%20Terrace.jpg?width=1200', desc:'כפר קטן של בקתות עץ בתוך היער, עם חנויות אמנים ותאורה נעימה. המקום עובד טוב במיוחד בערב כשהאור הופך לחלק מהחוויה.', tip:'אין צורך להגיע מוקדם; דווקא החשיכה מוסיפה הרבה.'}
    },
    '11.8': {
      'Shirogane Blue Pond': {status:'planned', duration:'30–45 דקות', effort:'קל', type:'טבע', map:'Shirogane Blue Pond', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Blue%20Pond%20in%20Biei%2C%20Hokkaido.jpg?width=1200', desc:'בריכה מלאכותית בגוון כחול-טורקיז עם גזעי עצים שעולים מתוך המים. הצבע משתנה לפי האור, מזג האוויר ומצב המים, והביקור עצמו קצר יחסית.', tip:'להגיע מוקדם לפני האוטובוסים והקבוצות.'},
      'Shirahige Falls': {status:'planned', duration:'20–30 דקות', effort:'קל', type:'טבע', map:'Shirahige Falls Biei', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Shirahige%20Waterfall.jpg?width=1200', desc:'מפלים בהירים שנופלים אל נהר בגוון כחול-טורקיז. זו עצירת תצפית קצרה ופוטוגנית מאוד, לא יעד שדורש מסלול ארוך.', tip:'לשמור את זה כ-stop קצר ולהמשיך בזמן.'},
      'Shikisai no Oka': {status:'planned', duration:'כ-90 דקות', effort:'קל', type:'פרחים / נוף', map:'Shikisai no Oka', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Shikisai-no-oka.jpg?width=1200', desc:'שטחים גדולים של שדות פרחים צבעוניים על גבעות. זה אחד המקומות הפוטוגניים ביותר באזור Biei, ושווה להיכנס פנימה ולא להסתפק בנקודת הכניסה.', tip:'לתת למקום זמן ולא רק לעצור לצילום אחד.'},
      'Farm Tomita': {status:'planned', duration:'כשעתיים', effort:'קל', type:'פרחים / אוכל', map:'Farm Tomita', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Farm%20Tomita.jpg?width=1200', desc:'אחד האתרים המזוהים ביותר עם Furano: שדות פרחים, מוצרי לבנדר, חנויות, גלידה וקפה. באוגוסט חלק מהלבנדר עשוי להיות אחרי השיא, אבל עדיין יש הרבה שדות צבעוניים.', tip:'לא לבנות רק על לבנדר; יש במקום הרבה מעבר לזה.'},
      'Patchwork Road': {status:'flexible', duration:'עד שעה', effort:'קל', type:'נסיעה נופית', map:'Patchwork Road Biei', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Biei%20Hokkaido.jpg?width=1200', desc:'אזור של שדות רחבים, גבעות וכבישים כפריים. זה פחות “אתר” ויותר נסיעה נופית עם עצירות קטנות בדרך.', tip:'לעשות רק אם עדיין יש כוח וזמן.'}
    },
    '12.8': {
      'בדיקת מזג אוויר': {status:'live', duration:'10–15 דקות', effort:'קל', type:'החלטה', map:'Asahidake Ropeway', image:null, desc:'זה רגע ההחלטה של היום: עננות, ראות, רוח, גשם ומצב הרכבל יקבעו אם עולים עכשיו או דוחים לבוקר 13.8.', tip:'אם הראות טובה — עדיף לעלות היום ולא להמר על מחר.'},
      'Asahidake Ropeway + Sugatami': {status:'flexible', duration:'2.5–3 שעות', effort:'בינוני', type:'הר / טבע', map:'Asahidake Ropeway', image:'https://commons.wikimedia.org/wiki/Special:FilePath/140724%20Asahidake%20Ropeway%20Hokkaido%20Japan04s3.jpg?width=1200', desc:'Asahidake הוא ההר הגבוה ביותר בהוקאידו. הרכבל עולה לאזור אלפיני, ומשם אפשר לעשות מסלול קצר סביב Sugatami עם בריכות, אדים געשיים ונוף הררי.', tip:'אם הראות טובה — לעלות היום. אם לא, לא לעלות בכוח.'}
    },
    '13.8': {
      'Otaru Canal': {status:'planned', duration:'30–45 דקות', effort:'קל', type:'עיר', map:'Otaru Canal', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Otaru%20Canal.jpg?width=1200', desc:'התעלה ההיסטורית והמחסנים הישנים הם הסמל המזוהה ביותר עם Otaru. זו עצירה קצרה יחסית אבל נותנת מיד את האופי של עיר הנמל.', tip:'אין צורך להקדיש שעה וחצי לתעלה עצמה; לשמור זמן לרחוב ולזכוכית.'},
      'Sakaimachi Street': {status:'planned', duration:'45–60 דקות', effort:'קל', type:'עיר / קניות', map:'Sakaimachi Street Otaru', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Otaru%20Sakaimachi%20Street.jpg?width=1200', desc:'רחוב נעים עם מבנים ישנים, ממתקים, קפה, חנויות מלאכת יד וזכוכית. זה החלק שבו פשוט מסתובבים בקצב נוח וסופגים את העיר.', tip:'זה מקום טוב לקנות מזכרות איכותיות יותר.'},
      'Kitaichi Glass': {status:'planned', duration:'30–45 דקות', effort:'קל', type:'מלאכת יד / קניות', map:'Kitaichi Glass Otaru', image:null, desc:'Kitaichi Glass היא אחת מיצרניות הזכוכית המזוהות ביותר עם Otaru. הביקור משתלב טבעי ברחוב Sakaimachi ונותן משהו מקומי יותר מחנות מזכרות רגילה.', tip:'אם היום התקצר בגלל Asahidake, אפשר לקצר כאן אבל לא למחוק את Otaru כולו.'},
      'Susukino / Tanukikoji': {status:'flexible', duration:'1.5–2 שעות', effort:'קל', type:'עיר / ערב', map:'Susukino Sapporo', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Susukino%2C%20Sapporo%2C%20Hokkaido%2C%20Japan.jpg?width=1200', desc:'Susukino הוא אזור חיי הלילה המרכזי של סאפורו, עם אוכל, ברים ורחובות מוארים. Tanukikoji הוא רחוב קניות מקורה שמתאים גם במקרה של גשם.', tip:'לא לפגוע בלילה בסאפורו רק כדי להספיק עוד עצירה בדרך.'}
    },
    '14.8': {
      'New Chitose Airport': {status:'flexible', duration:'כשעתיים', effort:'קל', type:'שדה תעופה', map:'New Chitose Airport', image:'https://commons.wikimedia.org/wiki/Special:FilePath/New%20Chitose%20Airport%20Domestic%20Terminal.jpg?width=1200', desc:'New Chitose הוא שדה תעופה שקל להעביר בו זמן: אוכל, Royce, Shiroi Koibito ומזכרות מקומיות. הוא חלק נעים מהיום ולא רק מקום לחכות בו לטיסה.', tip:'אחרי 19:40 מפסיקים להסתובב ומתקדמים לגייט.'}
    },
    '15.8': {
      'סיבוב קצר בשיבויה': {status:'flexible', duration:'60–75 דקות', effort:'קל', type:'עיר', map:'Shibuya Station', image:'https://commons.wikimedia.org/wiki/Special:FilePath/Shibuya%20Crossing%20in%20Tokyo%2C%202019%20-%20774.jpg?width=1200', desc:'בוקר אחרון קל ליד המלון: קפה, הליכה או קנייה קטנה. הכוונה היא ליהנות מהשעות האחרונות בלי לפתוח יום טיול חדש.', tip:'לא להתרחק משיבויה ולא להסתכן באיחור לרכבת.'}
    }
  };

  const replacementSchedules = {
    '8.8': [
      ['07:15–08:00','planned','ארוחת בוקר','במלון / ליד התחנה.'],['08:00–08:15','planned','צ׳ק-אאוט','לצאת בזמן לשדה.'],['08:15–09:20','live','Shin-Hakodate-Hokuto → Hakodate Airport','לבחור רכבת / אוטובוס / מונית לפי הזמינות בפועל.'],['10:00','fixed','איסוף רכב Budget','Reservation 101847607. צילום הרכב, ETC, GPS, דלק ונזקים קודמים.','Budget Rent a Car Hakodate Airport'],['10:30–11:00','planned','נסיעה ל-Goryokaku','לא להיכנס למרכז העיר מעבר לזה.'],['11:00–12:30','planned','Goryokaku','מגדל תצפית + הליכה קצרה.','Goryokaku Tower'],['12:30–13:15','flexible','ארוחת צהריים','באזור Goryokaku.'],['13:15–16:00','planned','נסיעה ל-Lake Toya','כולל עצירת שירותים קצרה.','WE Hotel Toya'],['16:00–16:30','planned','צ׳ק-אין WE Hotel Toya','להחנות ולהתארגן.','WE Hotel Toya'],['16:30–18:00','flexible','מנוחה / אונסן / מרפסת','זמן לנוף.'],['18:00–19:15','flexible','ארוחת ערב','במלון או באזור.'],['19:15–20:20','flexible','Lake Toya — הליכה על שפת האגם','שקיעה / תמונות.','Lake Toya'],['20:45–21:05','live','Lake Toya Long Run Fireworks','לבדוק באותו יום שלא בוטל בגלל רוח.','Lake Toya Onsen'],['21:05–22:00','flexible','אונסן / שתייה / מנוחה','לסיים רגוע.']
    ],
    '10.8': [
      ['07:30–08:30','planned','ארוחת בוקר',''],['08:30–09:00','planned','צ׳ק-אאוט + העמסת הרכב',''],['09:00–10:10','planned','נסיעה ל-Lake Shikotsu','בערך שעה.','Lake Shikotsu'],['10:10–12:10','planned','Lake Shikotsu','טיילת, קפה, Visitor Center; שיט קצר רק אם זמין בלי תור.','Lake Shikotsu'],['12:10–12:50','flexible','ארוחת צהריים קלה',''],['12:50–15:20','planned','נסיעה ל-Furano','להשאיר מרווח לעצירה.','La Vista Furano Hills'],['15:20–15:40','planned','צ׳ק-אין La Vista Furano Hills','לילה 1/2.','La Vista Furano Hills'],['15:40–17:00','flexible','מנוחה / אונסן',''],['17:00–18:00','flexible','Furano Marche','אוכל מקומי / סיבוב.','Furano Marche'],['18:00–19:30','flexible','ארוחת ערב','Furano.'],['19:30–20:15','flexible','נסיעה ל-Ningle Terrace',''],['20:15–21:15','flexible','Ningle Terrace','יפה במיוחד עם התאורה.','Ningle Terrace'],['21:15–21:30','planned','חזרה למלון','']
    ],
    '11.8': [
      ['06:30–07:00','planned','קפה / התארגנות','לצאת מוקדם.'],['07:00–08:00','planned','נסיעה ל-Blue Pond',''],['08:00–08:45','planned','Shirogane Blue Pond','לפני העומס הגדול.','Shirogane Blue Pond'],['08:45–09:00','planned','נסיעה קצרה',''],['09:00–09:30','planned','Shirahige Falls','עצירת תצפית קצרה.','Shirahige Falls Biei'],['09:30–10:10','planned','נסיעה ל-Shikisai no Oka',''],['10:10–11:45','planned','Shikisai no Oka','גבעות פרחים.','Shikisai no Oka'],['11:45–12:45','flexible','ארוחת צהריים','Biei / בדרך.'],['12:45–13:20','planned','נסיעה ל-Farm Tomita',''],['13:20–15:30','planned','Farm Tomita','פרחים, גלידה וחנויות.','Farm Tomita'],['15:30–16:00','flexible','קפה / הפסקה',''],['16:00–17:00','flexible','Patchwork Road','רק אם עדיין יש כוח.','Patchwork Road Biei'],['17:00–18:00','planned','חזרה לפוראנו',''],['18:00–19:30','flexible','ארוחת ערב',''],['19:30–21:00','flexible','אונסן / ערב חופשי','לא להוסיף עוד יעד.']
    ],
    '12.8': [
      ['07:30–08:30','flexible','בוקר רגוע / ארוחת בוקר',''],['08:30–09:30','flexible','פעילות קטנה בפוראנו','קפה / Furano Marche / מקום קטן שפספסנו.'],['09:30–11:00','planned','נסיעה ל-Asahidake',''],['11:00–11:30','planned','הגעה ל-La Vista Daisetsuzan','חניה / השארת ציוד.','La Vista Daisetsuzan'],['11:30–12:15','flexible','ארוחת צהריים קלה',''],['12:15–12:30','live','בדיקת מזג אוויר','עננות, ראות, רוח, גשם ומצב Ropeway.','Asahidake Ropeway'],['12:30–15:30','flexible','Asahidake Ropeway + Sugatami','אם הראות טובה.','Asahidake Ropeway'],['16:00–17:00','flexible','אונסן / מנוחה',''],['17:30 או 20:00','live','ארוחת ערב','לפי הסבב שנבחר במלון.']
    ],
    '13.8': [
      ['07:00–08:00','planned','ארוחת בוקר','Plan A — אם ה-Ropeway כבר נעשה.'],['08:00–08:30','planned','צ׳ק-אאוט',''],['08:30–12:00','planned','נסיעה ל-Otaru','זמן תכנון בלבד; לבדוק עומסי כביש.','Otaru'],['12:00–13:00','planned','סושי / דגים','Otaru ידועה בדגים, פירות ים וסושי.','Otaru'],['13:00–13:40','planned','Otaru Canal','התעלה והמחסנים ההיסטוריים.','Otaru Canal'],['13:40–14:35','planned','Sakaimachi Street','חנויות, ממתקים, קפה ומבנים ישנים.','Sakaimachi Street Otaru'],['14:35–15:10','planned','Kitaichi Glass','זכוכית ומלאכת יד מקומית.','Kitaichi Glass Otaru'],['15:10–15:40','flexible','קפה / קינוח',''],['15:40–16:40','planned','נסיעה ל-Sapporo',''],['16:40–17:15','planned','צ׳ק-אין Solaria','ארוחת בוקר כלולה.','Solaria Nishitetsu Hotel Sapporo'],['18:30–20:00','flexible','ארוחת ערב בסאפורו',''],['20:00–22:00','flexible','Susukino / Tanukikoji','ערב עירוני.','Susukino Sapporo']
    ]
  };

  function renderReplacement(day){
    const rows = replacementSchedules[day]; if(!rows) return;
    const tbody = document.querySelector('.schedule tbody'); if(!tbody) return;
    tbody.innerHTML = rows.map(([time,status,title,text,mapq]) => `<tr><td><strong>${esc(time)}</strong></td><td><div class="row-heading"><strong>${esc(title)}</strong><span class="status-pill ${statusClass[status]}">${statusLabel[status]}</span></div>${text?`<span>${esc(text)}</span>`:''}${mapq?`<div class="inline-maps"><a class="inline-map" target="_blank" rel="noopener" href="${maps(mapq)}">${esc(title)}</a></div>`:''}</td></tr>`).join('');
  }

  function appendDetail(day, row){
    const titleEl = row.querySelector('td:last-child > strong, td:last-child .row-heading > strong');
    if(!titleEl) return;
    const title = titleEl.textContent.trim();
    const cfgSet = details[day] || {};
    const key = Object.keys(cfgSet).find(k => title.includes(k) || k.includes(title));
    if(!key) return;
    const d = cfgSet[key];
    if(!row.querySelector('.status-pill')){
      const pill = document.createElement('span'); pill.className=`status-pill ${statusClass[d.status]}`; pill.textContent=statusLabel[d.status];
      titleEl.insertAdjacentElement('afterend', pill);
    }
    const box = document.createElement('details'); box.className='activity-detail';
    box.innerHTML = `<summary>פרטים נוספים</summary><div class="activity-detail-body">${d.image?`<img loading="lazy" decoding="async" src="${d.image}" alt="${esc(key)}">`:''}<p>${esc(d.desc)}</p><div class="detail-meta"><span>⏱ ${esc(d.duration)}</span><span>🥾 ${esc(d.effort)}</span><span>• ${esc(d.type)}</span></div><div class="detail-tip"><strong>💡 טיפ:</strong> ${esc(d.tip)}</div><a class="big-map" target="_blank" rel="noopener" href="${maps(d.map)}">📍 פתח ב-Google Maps</a></div>`;
    row.querySelector('td:last-child').appendChild(box);
  }

  function addPlans(day){
    if(day !== '12.8' && day !== '13.8') return;
    const schedulePanel = document.querySelector('.schedule')?.closest('.panel'); if(!schedulePanel) return;
    const section = document.createElement('section'); section.className='panel plan-panel';
    section.innerHTML = `<h2>⛅ החלטת Asahidake</h2><div class="plan-grid"><div class="plan-choice recommended"><b>Plan A — מומלץ</b><p>אם הראות טובה ב-12.8: עולים בצהריים ולא דוחים.</p></div><div class="plan-choice"><b>Plan B</b><p>אם מזג האוויר גרוע ב-12.8: Ropeway מוקדם ב-13.8 ואז Otaru מקוצר.</p></div><div class="plan-choice"><b>Plan C</b><p>אם גם 13.8 גרוע: מוותרים על הרכבל ושומרים על Otaru + Sapporo ועל יום הטיסה.</p></div></div>`;
    schedulePanel.insertAdjacentElement('afterend', section);
  }

  function collapsibleInfo(){
    document.querySelectorAll('.grid .panel.info').forEach((panel, i) => {
      if(panel.closest('details')) return;
      const h = panel.querySelector('h2'); if(!h) return;
      const det = document.createElement('details'); det.className='compact-details';
      const sum = document.createElement('summary'); sum.textContent = h.textContent; det.appendChild(sum);
      [...panel.childNodes].forEach(n => { if(n !== h) det.appendChild(n.cloneNode(true)); });
      panel.replaceWith(det);
    });
  }

  if(current){
    renderReplacement(current);
    document.querySelectorAll('.schedule tbody tr').forEach(r => appendDetail(current, r));
    addPlans(current);
    collapsibleInfo();
  }

  const currentChip = document.querySelector('.navlinks [aria-current="page"]');
  if(currentChip) currentChip.scrollIntoView({block:'nearest', inline:'center'});
})();
