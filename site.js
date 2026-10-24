(() => {
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const btn = document.querySelector('.menu-btn');
  const drawer = document.querySelector('.drawer');
  if (btn && drawer) {
    const set = (open) => {
      drawer.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'CLOSE' : 'MENU';
    };
    btn.addEventListener('click', () => set(!drawer.classList.contains('is-open')));
    drawer.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const sibs = [...el.parentElement.children].filter((c) => c.classList.contains('rv'));
      el.style.setProperty('--rv-delay', `${sibs.indexOf(el) * 0.12}s`);
      el.classList.add('is-on');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.rv').forEach((el) => io.observe(el));

  const pxs = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--marquee-pxs')) || 40;
  const fit = () => document.querySelectorAll('.footer__marquee').forEach((m) => {
    m.style.setProperty('--marquee-dur', `${m.scrollWidth / 2 / pxs}s`);
  });
  document.fonts.ready.then(fit);
  window.addEventListener('resize', fit);
})();
