// ============================================================
//  Portfolio - small progressive-enhancement script
// ============================================================

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Theme toggle (persists in localStorage, respects OS default) ----
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));

  toggle.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// ---- Reveal-on-scroll ----
(function () {
  const targets = document.querySelectorAll('.hero, .stats, .section');
  targets.forEach(function (el) { el.classList.add('reveal'); });

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) { io.observe(el); });
})();

// ---- Nav scroll-spy: highlight the section you're reading ----
(function () {
  const links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = {};
  const sections = [];
  links.forEach(function (link) {
    const id = link.getAttribute('href').replace('#', '');
    const section = document.getElementById(id);
    if (section) { byId[id] = link; sections.push(section); }
  });

  const spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove('is-active'); });
      const active = byId[entry.target.id];
      if (active) active.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (s) { spy.observe(s); });
})();
