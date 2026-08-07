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
  splitTimes();
  const observer = new MutationObserver(splitTimes);
  observer.observe(document.body,{childList:true,subtree:true});
})();
