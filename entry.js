(() => {
  const VERSION = 'ui28';
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());
  const value = type => Number(parts.find(part => part.type === type)?.value);
  const year = value('year');
  const month = value('month');
  const day = value('day');
  const file = year === 2026 && month === 8 && day >= 4 && day <= 15
    ? `day-${String(day).padStart(2, '0')}.html`
    : 'day-07.html';
  location.replace(`${file}?v=${VERSION}`);
})();
