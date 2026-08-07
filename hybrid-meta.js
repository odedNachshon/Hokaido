(() => {
  const day=document.querySelector('.navlinks [aria-current="page"]')?.textContent?.trim();
  const meta={
    '8.8':['האקודטה → Lake Toya','רכב שכור, Goryokaku ונסיעה רגועה ל-Lake Toya. יום האקודטה בכוונה לא עמוס.'],
    '10.8':['נובוריבטסו → Lake Shikotsu → פוראנו','יום מעבר דרך Lake Shikotsu, ואז Furano Marche ו-Ningle Terrace בערב.'],
    '11.8':['Furano + Biei','יום הנופים המרכזי: Blue Pond, Shirahige Falls, Shikisai no Oka ו-Farm Tomita.'],
    '12.8':['Furano → Asahidake','יום הרים תלוי ראות: Plan A היום, Plan B לבוקר 13.8, ו-Plan C אם מזג האוויר נשאר גרוע.'],
    '13.8':['Asahidake → Otaru → Sapporo','Otaru בדרך לסאפורו: תעלה, Sakaimachi ו-Kitaichi Glass, עם גיבוי אם Asahidake נדחה לבוקר.']
  };
  if(day&&meta[day]){const h=document.querySelector('.day-title h1');const p=document.querySelector('.day-title p:not(:first-of-type)');if(h)h.textContent=meta[day][0];if(p)p.textContent=meta[day][1];}
  document.body.innerHTML=document.body.innerHTML.replace(/הזמנה E82137[^.<]*/g,'').replace(/E82137/g,'');
})();