(() => {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const sites = [
    {
      titles:[/^Onuma Quasi-National Park$/i], name:'Onuma Quasi-National Park', query:'Onuma Quasi-National Park Hokkaido',
      sources:[['האתר הרשמי – Onuma Park','https://www.onuma-guide.com/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10299.html']],
      intro:'Onuma Quasi-National Park הוא אחד מאזורי הטבע היפים והנגישים בדרום הוקאידו. הליבה שלו היא מערכת אגמים ואיים קטנים שנוצרה בהשפעת הפעילות הגעשית של הר Komagatake. במקום אטרקציה אחת מרכזית, החוויה כאן בנויה משבילים, גשרים, מים, יער ונקודות מבט שמשתנות תוך כדי הליכה. זה בדיוק סוג המקום שבו שעה וחצי יכולה להרגיש עשירה מאוד בלי מאמץ גדול.',
      visit:'למסלול שלנו כדאי להתחיל באזור Onuma Park Square ולבחור לולאת הליכה בין האיים והגשרים. אין צורך לעשות את כל השבילים. אם מזג האוויר בהיר, שווה לחפש נקודות שבהן Komagatake משתקף במים; אם מעונן, עדיין יש הרבה ערך ליער, לגשרים ולשקט. אפשר לשלב בסוף קפה או אוכל קל באזור הכניסה. שיט ואופניים קיימים כאפשרויות, אבל הם פחות מתאימים ליום הזה כי הם מכניסים לוח זמנים נוסף.',
      tips:'הפארק מתאים מאוד לעצירה גמישה: אם נהנים נשארים עוד עשרים דקות, ואם מזג האוויר פחות טוב מקצרים בלי תחושת החמצה. מומלץ לבדוק חניה ונקודת התחלה לפני שיוצאים מהרכב, לקחת מים ושכבה קלה, ולתת עדיפות להליכה עצמה על פני ניסיון “לסמן” כמה שיותר נקודות.'
    },
    {
      titles:[/^Lake Toya\s*[—-]/i], name:'Lake Toya', query:'Lake Toya Hokkaido',
      sources:[['Lake Toya Tourism','https://www.laketoya.com/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10057.html']],
      intro:'Lake Toya הוא אגם קלדרה גדול וכמעט עגול, מוקף הרים געשיים ובמרכזו קבוצת האיים Nakajima. הוא אחד הנופים המזוהים עם דרום-מערב הוקאידו, אבל בניגוד לאתר שבו מגיעים, מצלמים ויוצאים, כאן הערך הוא דווקא בקצב האיטי. קו המים רחב, האופק פתוח, והאור משתנה מאוד בין אחר הצהריים לערב.',
      visit:'אנחנו ישנים על האגם ולכן אין צורך “למצות” אותו בשעה אחת. אחרי הצ׳ק־אין אפשר לנוח, ליהנות מהאונסן והמרפסת, לאכול את ארוחת הערב הכלולה ואז לצאת להליכה רגועה על קו המים. באזור Toyako Onsen יש טיילת, פסלים, נקודות ישיבה ותצפיות אל האיים. בעונה מתקיים Lake Toya Long Run Fireworks, שבו הירי נע לאורך האגם ולכן אפשר לראות אותו ממספר נקודות ולא חייבים להידחק למקום אחד.',
      tips:'בערב יכולה להיות רוח גם אם במהלך היום חם, אז שווה לקחת שכבה דקה. למחרת יש לנו תצפיות גבוהות יותר כמו Silo Observatory ו־Usuzan, ולכן הערב הראשון מיועד בעיקר לאווירה, מים וזיקוקים ולא לעוד מרדף אחרי תצפיות.'
    },
    {
      titles:[/^Silo Observatory$/i], name:'Silo Observatory', query:'Silo Observatory Lake Toya',
      sources:[['האתר הרשמי – Silo Observatory','https://toyako.biz/'],['Lake Toya Tourism','https://www.laketoya.com/']],
      intro:'Silo Observatory היא אחת התצפיות הקלות והיעילות ביותר על Lake Toya. מגיעים ברכב, חונים, ותוך דקות מקבלים זווית גבוהה ורחבה על הקלדרה, Nakajima וההרים שמסביב. זו נקודה טובה במיוחד אחרי שכבר ראינו את האגם מגובה המים בערב הקודם, כי היא מסדרת בראש את הגיאוגרפיה של כל האזור.',
      visit:'אין צורך להקדיש כאן זמן רב. עשרים עד ארבעים דקות בדרך כלל מספיקות לצילום, להבנת הנוף, לשירותים או קפה ולחזרה לרכב. ביום צלול אפשר לראות רחוק מאוד; בעננות נמוכה עדיין רואים את האגם אבל האפקט פחות דרמטי. אם מגיע אוטובוס תיירים בדיוק איתנו, עדיף להמתין כמה דקות או להתרחק מעט מנקודת הצילום המרכזית.',
      tips:'לצילום כדאי לנסות גם פריים רחב שמראה את צורת האגם וגם זום לכיוון האיים או Mount Usu. זו תחנה עם יחס מצוין בין זמן לתמורה, ולכן כדאי לשמור אותה קצרה ולא לתת לה לגלוש על חשבון Usuzan או Noboribetsu.'
    },
    {
      titles:[/^(Mount Usu|Usuzan Ropeway|Mt\.? Usu)/i], name:'Mount Usu / Usuzan Ropeway', query:'Usuzan Ropeway Mount Usu Hokkaido',
      sources:[['האתר הרשמי – Usuzan Ropeway','https://usuzan.hokkaido.jp/en/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10064.html']],
      intro:'Mount Usu הוא הר געש פעיל שממחיש מצוין עד כמה הנוף של אזור Toya עדיין חי ומשתנה. ההתפרצויות שלו שינו את האזור כמה פעמים במאות האחרונות, ובסמוך נמצא Showa-Shinzan, הר צעיר שנוצר רק בשנות ה־40. הרכבל מאפשר להגיע במהירות לנקודות תצפית גבוהות בלי טרק ארוך.',
      visit:'אם הראות טובה והרכבל פועל, זו אחת התחנות ששווה להשקיע בהן. למעלה מקבלים תצפיות על Lake Toya, Showa-Shinzan והנוף הוולקני. יש מרפסות ושבילים, וחלקם דורשים יותר מדרגות והליכה. אין חובה לעשות את כולם: עדיף להגיע קודם לנקודת התצפית העיקרית ורק אם מזג האוויר טוב והאנרגיה גבוהה להוסיף את המסלול הארוך יותר.',
      tips:'כדאי לבדוק שעות פעילות, רוח וראות באותו בוקר. בגובה יכול להיות קריר ורוחני גם באוגוסט. אם העננים יושבים על הפסגה, הערך של העלייה יורד מאוד ואז עדיף לקצר ולהעביר זמן ל־Noboribetsu.'
    },
    {
      titles:[/^(Noboribetsu )?Jigokudani$/i], name:'Noboribetsu Jigokudani', query:'Noboribetsu Jigokudani Hokkaido',
      sources:[['Noboribetsu Tourism','https://noboribetsu-spa.jp/en/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10025.html']],
      intro:'Jigokudani, “עמק הגיהינום”, הוא הלב הגאותרמי של Noboribetsu. זהו אזור פתוח של קרקע געשית, אדים, מים חמים, מינרלים וריח גופרית, והוא מרגיש שונה מאוד מהאגמים הירוקים והרגועים של הימים הקודמים. המים החמים שנוצרים כאן מזינים חלק גדול ממעיינות האונסן של העיירה.',
      visit:'הביקור העיקרי נוח יחסית: יוצאים מאזור החניה או העיירה לשבילים מסודרים ונקודות תצפית. אפשר לקבל חוויה טובה גם בפחות משעה, אבל אם מזג האוויר נעים ויש כוח אפשר להוסיף הליכה לכיוון Oyunuma או שבילים אחרים באזור. היתרון הוא שהפעילות הגאותרמית נמצאת ממש בגובה העיניים ולא רק כנוף מרוחק.',
      tips:'לא יורדים מהשבילים המסומנים — קרקע גאותרמית יכולה להיות דקה וחמה גם כשהיא נראית יציבה. גשם קל לא בהכרח הורס את המקום; ערפל ואדים אפילו יכולים להוסיף לאווירה. אחרי ההליכה, האונסן במלון מרגיש הרבה יותר מחובר למקום.'
    },
    {
      titles:[/^Lake Shikotsu$/i], name:'Lake Shikotsu', query:'Lake Shikotsu Hokkaido',
      sources:[['האתר הרשמי – Lake Shikotsu','https://lake-shikotsu.jp/en/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10049.html']],
      intro:'Lake Shikotsu הוא אגם קלדרה עמוק מאוד בתוך Shikotsu-Toya National Park, מפורסם במים הצלולים שלו ובהרים שמקיפים אותו. לעומת Lake Toya הפתוח והרחב, Shikotsu מרגיש ירוק, סגור ופראי יותר. מרכז הביקור הנוח נמצא סביב Shikotsu Kohan, עם טיילת, גשרים, מרכז מבקרים, בתי קפה ומסעדות.',
      visit:'בשבילנו זו תחנת דרך ולא יום שלם. שעה עד שעה וחצי מספיקה להליכה לאורך החוף, מעבר על הגשר האדום, עצירה במרכז המבקרים אם פתוח וקפה או אוכל קל. במזג אוויר טוב צבע המים וההשתקפויות יפים במיוחד. אין צורך להקיף את האגם או להיכנס לפעילות ארוכה אלא אם כל היום משתנה.',
      tips:'המטרה היא לשבור את הנהיגה ל־Furano וליהנות מהנוף בלי לשרוף חצי יום. אם יש גשם חזק או ראות גרועה, אפשר לקצר למרכז המבקרים ותצפית קצרה מהחוף.'
    },
    {
      titles:[/^Ningle Terrace$/i], name:'Ningle Terrace', query:'Ningle Terrace Furano Hokkaido',
      sources:[['Shin Furano Prince Hotel','https://www.princehotels.com/shinfurano/experience/ningle-terrace/'],['Furano Tourism','https://www.furanotourism.com/en/']],
      intro:'Ningle Terrace הוא מתחם קטן של בקתות עץ בתוך יער ליד New Furano Prince Hotel. הוא בנוי ככפר מלאכות יד עם שבילי עץ, תאורה חמה וחנויות קטנות של אמנים מקומיים. הקסם של המקום הוא האווירה, במיוחד אחרי שהחשיכה מתחילה והתאורה הופכת לחלק מהנוף.',
      visit:'המקום קומפקטי ולכן 30–60 דקות בדרך כלל מספיקות. אפשר לעבור בין הבקתות, להציץ בחנויות, לשתות משהו ולצלם את האורות בין העצים. דווקא אין צורך להגיע מוקדם; הערב עובד לטובתו. אם עמוס ליד הכניסה, כמה דקות של הליכה פנימה בדרך כלל מפזרות את הקהל.',
      tips:'שבילי העץ יכולים להיות חלקים בגשם, ולחלק מהחנויות יש מגבלות צילום בפנים. זו עצירת ערב נעימה ולא יעד שצריך להקריב עבורו אתר טבע משמעותי במהלך היום.'
    },
    {
      titles:[/^(Shirogane )?Blue Pond$/i], name:'Shirogane Blue Pond', query:'Shirogane Blue Pond Biei Hokkaido',
      sources:[['Biei Tourism','https://www.biei-hokkaido.jp/en/facility/shirogane-blue-pond/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10527.html']],
      intro:'Shirogane Blue Pond, או Aoiike, הוא אחד האתרים המצולמים ביותר באזור Biei. גוון המים הכחול-טורקיז נוצר מהאופן שבו חלקיקים ומינרלים במים מפזרים אור, והוא משתנה לפי שמש, עננות, גשם ועונה. גזעי העצים המתים שעולים מתוך המים נותנים למקום את המראה הסוריאליסטי שלו.',
      visit:'מהחניה ההליכה קצרה ועל שביל מסודר, ולכן הביקור עצמו אינו מאמץ. כדאי להתקדם לאורך השביל ולא להיתקע בנקודת הצילום הראשונה, שם הקבוצות מצטופפות. 30–45 דקות הן בדרך כלל מספיקות. חשוב להגיע בלי ציפייה לגוון “אינסטגרם” קבוע — הצבע משתנה וזה חלק מהעניין.',
      tips:'החיבור הטבעי הוא ל־Shirahige Falls הקרוב. עדיף לראות את שני המקומות ברצף, מוקדם יחסית ביום, ולשמור את הזמן הארוך יותר לשדות הפרחים.'
    },
    {
      titles:[/^Shirahige Falls$/i], name:'Shirahige Falls', query:'Shirahige Falls Biei Hokkaido',
      sources:[['Biei Tourism','https://www.biei-hokkaido.jp/en/facility/shirahige-waterfalls/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10528.html']],
      intro:'Shirahige Falls הוא מפל ייחודי באזור Shirogane Onsen. במקום נהר אחד שנופל מנקודה ברורה, מים תת-קרקעיים יוצאים דרך שכבות הסלע במספר זרמים דקים ונשפכים לנהר Biei. המראה הזכיר למקומיים “זקן לבן”, ומכאן השם. מתחת למפל הנהר מקבל לעיתים גוון כחול עמוק.',
      visit:'נקודת התצפית המרכזית נמצאת מגשר, ולכן זה אתר חזק אבל קצר. אין צורך ביותר מ־20–30 דקות: להגיע, לצלם כמה זוויות, להקשיב למים ולהמשיך. הוא משלים יפה את Blue Pond כי שם הכול שקט וסטטי וכאן יש תנועה וקול.',
      tips:'אפשר לצלם גם רחב וגם בזום על הזרמים הדקים. יום מעונן עובד כאן מצוין כי אין קונטרסט קיצוני. זו עצירה טובה לשמור קצרה כדי לא לפגוע בזמן של Shikisai no Oka.'
    },
    {
      titles:[/^Shikisai no Oka$/i], name:'Shikisai no Oka', query:'Shikisai no Oka Biei Hokkaido',
      sources:[['האתר הרשמי – Shikisai no Oka','https://www.shikisainooka.jp/en/'],['Biei Tourism','https://www.biei-hokkaido.jp/en/']],
      intro:'Shikisai no Oka הוא פארק פרחים גדול על גבעות Biei, עם רצועות צבע שמתעקלות לפי הטופוגרפיה ונוף פתוח לרכסי ההרים. זה אינו טבע פראי אלא נוף חקלאי מתוכנן, אבל בקיץ הוא אחד המקומות הפוטוגניים ביותר באזור.',
      visit:'אם מזג האוויר נעים, כדאי ללכת ברגל לפחות 45–60 דקות ולהתרחק מאזור הכניסה. התמונות הטובות יותר הן לא רק קלוז־אפ של פרחים אלא כאלה שמכניסות את קווי השדות, הגבעות וההרים יחד. קיימות גם אפשרויות תחבורה פנימיות בתשלום, אבל הן לא הכרחיות למסלול שלנו.',
      tips:'השדות חשופים לשמש ולכן מים וכובע חשובים. אם היום אפור מאוד או הפריחה חלשה, אפשר לקצר ולהעביר זמן ל־Farm Tomita או לנסיעה נופית באזור Biei.'
    },
    {
      titles:[/^Farm Tomita$/i], name:'Farm Tomita', query:'Farm Tomita Furano Hokkaido',
      sources:[['האתר הרשמי – Farm Tomita','https://www.farm-tomita.co.jp/en/'],['Furano Tourism','https://www.furanotourism.com/en/']],
      intro:'Farm Tomita הוא המקום המזוהה ביותר עם הלבנדר של Furano. החווה התחילה כמשק חקלאי, ובהמשך הפכה ליעד תיירותי עם מספר שדות וגנים, חנויות, בתי קפה ומוצרים המבוססים על לבנדר. באוגוסט חלק משיא הלבנדר עשוי כבר לחלוף, אבל עדיין יש פרחים ונוף חקלאי צבעוני.',
      visit:'כדאי להתחיל בשדות כאשר האור טוב, ורק אחר כך לעבור לחנויות ולאוכל. שעה עד שעה ורבע מספיקה לרוב הביקור שלנו. גלידת לבנדר היא הבחירה הקלאסית, אבל אין צורך להפוך את הביקור למסע קניות. האזור יכול להיות עמוס בקיץ, ולכן כדאי לזכור שיש כמה חלקים והקהל מתפזר.',
      tips:'להגיע עם ציפייה לחווה יפה ומגוונת, לא ל“ים סגול” מושלם. אם חם מאוד, לעשות את הסיבוב החיצוני יעיל ואז לנצל את המבנים הממוזגים.'
    },
    {
      titles:[/^Asahidake Ropeway/i], name:'Asahidake Ropeway', query:'Asahidake Ropeway Hokkaido',
      sources:[['האתר הרשמי – Asahidake Ropeway','https://asahidake.hokkaido.jp/en/'],['Daisetsuzan National Park','https://www.env.go.jp/park/daisetsu/']],
      intro:'Asahidake הוא ההר הגבוה ביותר בהוקאידו וחלק מרכס Daisetsuzan. הרכבל מעלה את המבקרים מאזור Asahidake Onsen לתחנת Sugatami, ומשם יוצאים למסלולים קצרים בין בריכות אלפיניות, צמחייה נמוכה ונקודות שבהן רואים אדים געשיים. זו אחת התחנות המרשימות ביותר במסלול, וגם אחת התלויות ביותר במזג האוויר.',
      visit:'המסלול הקלאסי סביב Sugatami אינו טיפוס לפסגה אלא לולאה נגישה יחסית שנותנת חוויה אלפינית מלאה. בתנאים טובים רואים את ההר משתקף בבריכות. אם המצלמות והתחזית מראות ראות טובה והרכבל פועל, שווה לתת למקום כמה שעות. אם הכול מכוסה בענן, אין טעם לעלות רק כדי לראות לבן.',
      tips:'גם באוגוסט בגובה יכול להיות קר ורוחני. צריך שכבה חמה, מים ונעליים טובות. זה אתר שבו החלטה של הרגע האחרון לפי הראות עדיפה על היצמדות עיוורת ללוח הזמנים.'
    },
    {
      titles:[/^Otaru Canal$/i], name:'Otaru Canal', query:'Otaru Canal Hokkaido',
      sources:[['Otaru Tourism','https://otaru.gr.jp/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/spot/detail_10040.html']],
      intro:'Otaru Canal היא הסמל המוכר ביותר של עיר הנמל Otaru. בעבר התעלה והמחסנים שימשו לפריקה ואחסון סחורות, והיום הם הפכו לטיילת היסטורית עם מבני אבן ולבנים, בתי קפה וגלריות. זה מקום שמכניס מיד לאווירה של העיר.',
      visit:'אין צורך להקדיש לתעלה עצמה זמן רב. 30–45 דקות של הליכה וצילום מספיקות, ואז כדאי להמשיך ברגל ל־Sakaimachi. אם יש עומס ליד נקודת הצילום המרכזית, הליכה של כמה דקות לאורך המים בדרך כלל נותנת זווית רגועה יותר.',
      tips:'Otaru עובדת כחיבור בין כמה דברים — התעלה, הרחובות, זכוכית, מוזיקה, מתוקים ואוכל ים. לכן עדיף לא “למצות” את התעלה אלא להשתמש בה כפתיחה לעיר.'
    },
    {
      titles:[/^Sakaimachi Street$/i], name:'Sakaimachi Street', query:'Sakaimachi Street Otaru Hokkaido',
      sources:[['Otaru Tourism','https://otaru.gr.jp/'],['Visit Hokkaido','https://www.visit-hokkaido.jp/en/']],
      intro:'Sakaimachi Street הוא הרחוב שבו Otaru עוברת מנמל היסטורי לעיר של חנויות קטנות, זכוכית, תיבות נגינה ומתוקים. הרבה מהמבנים המסחריים הישנים נשמרו, ובתוכם פועלים היום בתי קפה, קונדיטוריות וחנויות מלאכת יד.',
      visit:'זה אזור שמתאים לשיטוט ולא ל“אטרקציה” אחת. אפשר להיכנס למה שמושך אותנו באותו רגע, לבחור שתיים־שלוש חנויות מעניינות ולעצור לקפה או קינוח. שעה עד שעה וחצי עוברת כאן בקלות, ובדרך כלל שווה לתת לרחוב יותר זמן מאשר לתעלה עצמה.',
      tips:'גם בגשם המקום עובד לא רע כי רוב העניין בתוך החנויות. כדאי להסתכל גם על האדריכלות ולא רק על חלונות הראווה, ולשמור מקום במזוודה אם קונים זכוכית.'
    },
    {
      titles:[/^Kitaichi Glass$/i], name:'Kitaichi Glass', query:'Kitaichi Glass Otaru Hokkaido',
      sources:[['האתר הרשמי – Kitaichi Glass','https://kitaichiglass.co.jp/'],['Otaru Tourism','https://otaru.gr.jp/']],
      intro:'Kitaichi Glass הוא אחד השמות המזוהים ביותר עם מסורת הזכוכית של Otaru. תעשיית הזכוכית המקומית שירתה בעבר את צי הדיג ובהמשך הפכה למלאכת יד ולעיצוב. כיום יש מספר חללים באזור Sakaimachi עם כלי זכוכית, פריטי נוי ותאורה.',
      visit:'אחד המקומות המוכרים הוא Kitaichi Hall, עם תאורה חשוכה ומנורות שמן רבות. גם בלי לקנות דבר, שווה להיכנס בשביל האווירה. אם רוצים לקנות כלי או מתנה, 30–45 דקות הן מסגרת טובה; אחרת אפשר להסתפק בביקור קצר כחלק מהשיטוט ברחוב.',
      tips:'אם קונים זכוכית, לבקש אריזה שמתאימה לטיסה ולחשוב מראש איפה היא נכנסת במזוודה. זו עצירה טובה במיוחד אם מזג האוויר פחות נעים בחוץ.'
    }
  ];

  const titleOf = row => {
    const cell = row.querySelector('td:last-child');
    if (!cell) return '';
    const direct = [...cell.children].find(el => el.tagName === 'STRONG');
    if (direct) return direct.textContent.trim();
    return cell.querySelector(':scope > .row-heading strong')?.textContent.trim() || '';
  };

  const siteForTitle = title => sites.find(site => site.titles.some(re => re.test(title)));

  const style = document.createElement('style');
  style.textContent = `
    .site-info{margin-top:9px;border:1px solid var(--line);border-radius:13px;background:var(--surface-2);overflow:hidden}
    .site-info>summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:42px;padding:8px 11px;font-size:.8rem;font-weight:850;color:var(--rail)}
    .site-info>summary::-webkit-details-marker{display:none}.site-info>summary::after{content:'＋';font-size:1rem}.site-info[open]>summary::after{content:'−'}
    .site-info-body{padding:0 11px 12px}.site-info-body p{line-height:1.62!important;font-size:.88rem!important;color:var(--ink)!important;margin:8px 0 12px!important}
    .site-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0 12px}.site-gallery img{width:100%;height:96px;object-fit:cover;border-radius:9px;background:#dde5e1}
    .site-gallery-note,.site-gallery-loading{font-size:.68rem;color:var(--muted);margin-top:5px}.site-gallery-note{grid-column:1/-1}
    .site-info-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.site-info-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:8px 10px;border-radius:9px;background:var(--surface-2,#f4f7f5);border:1px solid var(--line,#d8e1dc);color:var(--rail,#155c48)!important;text-decoration:none;font-size:.78rem;font-weight:800}
    .site-info-actions .site-map{background:var(--rail,#155c48);color:#fff!important;border-color:transparent}
    @media(max-width:520px){.site-gallery{grid-template-columns:1fr 1fr}.site-gallery img{height:120px}.site-gallery img:nth-child(3){grid-column:1/-1;height:150px}.site-info-body p{font-size:.84rem!important}}
  `;
  document.head.appendChild(style);

  async function loadImages(box, site){
    if (box.dataset.loaded) return;
    box.dataset.loaded='1';
    box.innerHTML='<div class="site-gallery-loading">טוען תמונות…</div>';
    try {
      const params = new URLSearchParams({action:'query',format:'json',origin:'*',generator:'search',gsrsearch:site.query,gsrnamespace:'6',gsrlimit:'8',prop:'imageinfo',iiprop:'url|mime',iiurlwidth:'900'});
      const res = await fetch('https://commons.wikimedia.org/w/api.php?'+params);
      const json = await res.json();
      const pages = Object.values(json?.query?.pages||{}).filter(p=>p.imageinfo?.[0]?.thumburl && /^image\/(jpeg|png|webp)/.test(p.imageinfo[0].mime||'')).slice(0,3);
      if (!pages.length) throw new Error('no images');
      box.innerHTML = pages.map(p=>`<a target="_blank" rel="noopener" href="${p.imageinfo[0].descriptionurl||p.imageinfo[0].url}"><img loading="lazy" alt="${esc(site.name)}" src="${p.imageinfo[0].thumburl}"></a>`).join('') + '<div class="site-gallery-note">תמונות: Wikimedia Commons · לחיצה פותחת את המקור</div>';
    } catch (_) {
      box.innerHTML='<div class="site-gallery-loading">לא הצלחתי לטעון את התמונות כרגע.</div>';
    }
  }

  document.querySelectorAll('.schedule tbody tr').forEach(row => {
    const site = siteForTitle(titleOf(row));
    if (!site) return;
    const cell = row.querySelector('td:last-child');
    if (!cell || cell.querySelector(':scope > .site-info')) return;
    const detail = document.createElement('details');
    detail.className='site-info';
    const text = `${site.intro} ${site.visit} ${site.tips}`;
    const actions = [['📍 Google Maps',`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.query)}`,'site-map'],...site.sources.map(([label,url])=>[label+' ↗',url,''])];
    detail.innerHTML=`<summary>ℹ️ פרטים על ${esc(site.name)} · תמונות</summary><div class="site-info-body"><div class="site-gallery"></div><p>${esc(text)}</p><div class="site-info-actions">${actions.map(([label,url,cls])=>`<a class="${cls}" target="_blank" rel="noopener noreferrer" href="${url}">${esc(label)}</a>`).join('')}</div></div>`;
    detail.addEventListener('toggle',()=>{ if(detail.open) loadImages(detail.querySelector('.site-gallery'),site); });
    cell.appendChild(detail);
  });
})();
