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

  document.querySelectorAll('[data-split]').forEach((el) => {
    let i = 0;
    const walk = (node) => [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        [...c.textContent].forEach((t) => {
          if (!t.trim()) { frag.append(t); return; }
          const s = document.createElement('span');
          s.className = 'ch'; s.textContent = t; s.style.setProperty('--i', i++);
          frag.append(s);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && c.tagName !== 'svg') walk(c);
    });
    walk(el);
  });

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

  document.querySelectorAll('main > .sec .sec-head__en').forEach((head) => {
    const h = document.createElement('span');
    h.className = 'hanko'; h.setAttribute('aria-hidden', 'true'); h.textContent = '喜江';
    head.append(h);
  });
  const ioHanko = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-on'); ioHanko.unobserve(e.target); }
  }), { rootMargin: '0px 0px -15% 0px' });
  document.querySelectorAll('.hanko').forEach((el) => ioHanko.observe(el));
})();
