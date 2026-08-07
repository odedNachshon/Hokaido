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

  const forceGmailUser = () => {
    document.querySelectorAll('a[href*="mail.google.com/mail/"]').forEach(a => {
      try {
        const u = new URL(a.href);
        const path = u.pathname.replace(/^\/mail\/u\/\d+\/?/, '/mail/');
        u.pathname = path;
        u.searchParams.set('authuser', 'odedn72@gmail.com');
        a.href = u.toString();
      } catch (_) {
        a.href = a.href
          .replace(/authuser=[^&#]*/i, 'authuser=odedn72%40gmail.com')
          .replace(/\/mail\/u\/\d+\//, '/mail/');
      }
    });
  };

  const apply = () => { splitTimes(); forceGmailUser(); };
  apply();
  const observer = new MutationObserver(apply);
  observer.observe(document.body,{childList:true,subtree:true});
})();
