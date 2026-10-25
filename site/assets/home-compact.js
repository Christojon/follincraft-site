(() => {
  const button = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    button.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  }
  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); button.focus(); } });
  document.getElementById('year').textContent = new Date().getFullYear();
  const video = document.querySelector('.compact-intro video');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData) {
    video.src = 'assets/forest-web.mp4';
    video.play().catch(() => {});
  }
  // Keep old homepage bookmarks useful after moving the showcases.
  const destinations = {camp:'camp/index.html',gear:'gear/index.html',tools:'repo/index.html',store:'store/index.html','how-to':'how-to/index.html'};
  const followOldAnchor = () => { const destination = destinations[location.hash.slice(1)]; if (destination) location.replace(destination); };
  window.addEventListener('hashchange', followOldAnchor);
  followOldAnchor();
})();
