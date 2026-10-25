/* =====================================================================
   FOLLINCRAFT - script.js (desktop-only modals, mobile navigates)
   Expects: PROJECT_DATA, CAMP_DATA, GEAR_DATA
===================================================================== */
'use strict';

// =========================================================
// NO-MODALS MODE
// - Forces all modal behavior off by making FC_IS_DESKTOP() false.
// - Keeps normal navigation and tool links working.
// =========================================================
window.FC_DISABLE_MODALS = true;
window.FC_IS_DESKTOP = function(){ return false; };

// Safety: if anything left a modal open, close it.
window.addEventListener('load', () => {
  document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
  document.documentElement.classList.remove('lock-scroll');
  document.body.classList.remove('lock-scroll','modal-open');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.paddingRight = '';
}, { once:true });

document.addEventListener('DOMContentLoaded', () => {
  rewriteFileModeLinks(document);
  ['campCollectionsGrid', 'gearCollectionsGrid', 'howToGrid'].forEach((id) => {
    const lane = document.getElementById(id);
    if (lane) lane.scrollLeft = 0;
  });
  document.querySelectorAll('.carousel-arrow').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const dir = btn.dataset.dir === 'prev' ? -1 : 1;
      const grid = document.getElementById(targetId);
      if (!grid) return;
      const firstCard = grid.querySelector(':scope > *');
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 320;
      const gap = 18;
      grid.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' });
    });
  });
});

function enforceHomeMobileCarousels(){
  if (document.body?.dataset.pageId !== 'home') return;

  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  const isArticleTablet = window.matchMedia('(max-width: 860px)').matches;
  const laneIds = ['projectGrid', 'campGrid', 'gearGrid', 'campGuideGrid', 'gearGuideGrid'];
  const articleLaneIds = new Set(['campGuideGrid', 'gearGuideGrid']);

  laneIds.forEach((id) => {
    const grid = document.getElementById(id);
    if (!grid) return;
    const isArticleLane = articleLaneIds.has(id);

    if (!isMobile && isArticleLane){
      grid.style.setProperty('display', 'grid', 'important');
      grid.style.setProperty('grid-auto-flow', 'column', 'important');
      grid.style.setProperty('grid-template-columns', 'none', 'important');
      grid.style.setProperty('grid-auto-columns', isArticleTablet ? 'calc((100% - 14px) / 2)' : 'calc((100% - 28px) / 3)', 'important');
      grid.style.setProperty('gap', '14px', 'important');
      grid.style.setProperty('padding', '10px 10px 18px', 'important');
      grid.style.setProperty('overflow-x', 'auto', 'important');
      grid.style.setProperty('overflow-y', 'hidden', 'important');
      grid.style.setProperty('scroll-snap-type', 'x mandatory', 'important');
      grid.style.setProperty('scroll-padding-inline', '10px', 'important');

      Array.from(grid.children).forEach((child) => {
        child.style.setProperty('width', 'auto', 'important');
        child.style.setProperty('min-width', '0', 'important');
        child.style.setProperty('max-width', 'none', 'important');
        child.style.setProperty('margin', '0', 'important');
        child.style.setProperty('padding', '24px 28px 20px', 'important');
        child.style.setProperty('box-sizing', 'border-box', 'important');
        child.style.setProperty('scroll-snap-align', 'start', 'important');
      });
      return;
    }

    if (!isMobile){
      [
        'display','grid-auto-flow','grid-auto-columns','grid-template-columns','gap',
        'width','padding','overflow-x','overflow-y','scroll-snap-type','scroll-padding-inline'
      ].forEach((prop) => grid.style.removeProperty(prop));

      Array.from(grid.children).forEach((child) => {
        ['width','min-width','max-width','padding','margin','box-sizing','scroll-snap-align']
          .forEach((prop) => child.style.removeProperty(prop));
        const card = child.classList.contains('card') ? child : child.querySelector('.card');
        if (card) {
          card.style.removeProperty('width');
          card.style.removeProperty('min-width');
          card.style.removeProperty('max-width');
          card.style.removeProperty('padding');
        }
      });
      return;
    }

    grid.style.setProperty('display', 'grid', 'important');
    grid.style.setProperty('grid-auto-flow', 'column', 'important');
    grid.style.setProperty('grid-auto-columns', '100%', 'important');
    grid.style.setProperty('grid-template-columns', 'none', 'important');
    grid.style.setProperty('gap', '0', 'important');
    grid.style.setProperty('padding', isArticleLane ? '18px 0 22px' : '0 0 14px', 'important');
    grid.style.setProperty('overflow-x', 'auto', 'important');
    grid.style.setProperty('overflow-y', isArticleLane ? 'visible' : 'hidden', 'important');
    grid.style.setProperty('scroll-snap-type', 'x mandatory', 'important');
    grid.style.setProperty('scroll-padding-inline', '0', 'important');
    grid.scrollLeft = 0;

    Array.from(grid.children).forEach((child) => {
      child.style.setProperty('width', '100%', 'important');
      child.style.setProperty('min-width', '100%', 'important');
      child.style.setProperty('max-width', isArticleLane ? 'none' : '100%', 'important');
      child.style.setProperty('padding', isArticleLane ? '24px 28px 20px' : '0 12px', 'important');
      child.style.setProperty('box-sizing', 'border-box', 'important');
      child.style.setProperty('scroll-snap-align', 'start', 'important');

      const card = child.classList.contains('card') ? child : child.querySelector('.card');
      if (card) {
        card.style.setProperty('width', '100%', 'important');
        card.style.setProperty('max-width', 'none', 'important');
      }
    });
  });
}

function getStars(rating){
  if (!rating) return "";

  const rounded = Math.max(0, Math.min(5, Math.round(Number(rating))));
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}
// ---------- Helpers ----------
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const HOME_CARD_LIMIT = 12;
const isHomePage = () => document.body?.dataset.pageId === 'home';
const limitHomeCards = (items, limit = HOME_CARD_LIMIT) => (
  isHomePage() ? items.slice(0, limit) : items
);

// Desktop test: precise pointer + hover + width
window.FC_IS_DESKTOP = window.FC_IS_DESKTOP || function(){
  return window.matchMedia('(pointer:fine) and (hover:hover) and (min-width: 900px)').matches;
};

window.addEventListener('load', enforceHomeMobileCarousels);
window.addEventListener('resize', enforceHomeMobileCarousels, { passive:true });

function initLazyHeroVideo(){
  const video = document.querySelector('.hero .bg-video');
  if (!video) return;

  const sources = Array.from(video.querySelectorAll('source[data-src]'));
  if (!sources.length) return;

  const shouldSkip = () => {
    const saveData = navigator.connection?.saveData;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    return Boolean(saveData || reducedMotion);
  };

  const loadAndPlay = () => {
    if (shouldSkip() || video.dataset.loaded === 'true') return;
    sources.forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
    });
    video.dataset.loaded = 'true';
    video.load();
    video.play().catch(() => {});
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      loadAndPlay();
    }, { rootMargin: '160px 0px' });
    observer.observe(video);
  } else if (!location.hash || location.hash === '#about') {
    window.addEventListener('load', loadAndPlay, { once:true });
  }
}

document.addEventListener('DOMContentLoaded', initLazyHeroVideo);

const slugify = (str='') => String(str)
  .toLowerCase().trim()
  .replace(/&/g,' and ')
  .replace(/[^a-z0-9]+/g,'-')
  .replace(/^-+|-+$/g,'');

const isFeaturedItem = (item = {}) => {
  const badge = (item.badge || item.status || item.flag || '').toString().trim().toLowerCase();
  if (badge === 'new' || badge === 'featured') return true;
  if (Array.isArray(item.tags)) {
    return item.tags.some(tag => {
      const value = String(tag).trim().toLowerCase();
      return value === 'new' || value === 'featured';
    });
  }
  return false;
};

const badgeLabel = (label) => {
  const text = String(label || '').trim();
  if (text.toLowerCase() === 'new') return 'New';
  if (text.toLowerCase() === 'featured') return 'Featured';
  return text;
};

const cardBadge = (label) => {
  const text = badgeLabel(label);
  return text ? `<div class="fc-card-badge camp-badge-new">${text}</div>` : '';
};

const featuredFirst = (entries) => (
  entries
    .map(([id, item], index) => ({ id, item, index }))
    .sort((a, b) => {
      const af = isFeaturedItem(a.item) ? 1 : 0;
      const bf = isFeaturedItem(b.item) ? 1 : 0;
      if (bf !== af) return bf - af;
      return a.index - b.index;
    })
    .map(({ id, item }) => [id, item])
);

function toSiteHref(href){
  if (!href) return href;
  if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) return href;
  if (!href.startsWith('/')) return href;
  if (location.protocol !== 'file:') return href;

  const marker = 'follincraft%20clean';
  const rawPath = location.pathname || '';
  const markerIdx = rawPath.toLowerCase().indexOf(marker);
  if (markerIdx === -1) return href;

  const siteRoot = `file://${rawPath.slice(0, markerIdx + marker.length)}`;
  if (href === '/') return `${siteRoot}/index.html`;
  if (href.startsWith('/#')) return `${siteRoot}/index.html${href.slice(1)}`;

  const [basePath, hash = ''] = href.split('#');
  const normalized = basePath.endsWith('/') ? `${basePath}index.html` : basePath;
  return `${siteRoot}${normalized}${hash ? `#${hash}` : ''}`;
}

function rewriteFileModeLinks(root = document){
  if (location.protocol !== 'file:') return;
  root.querySelectorAll('a[href^="/"]').forEach((link) => {
    const raw = link.getAttribute('href');
    const next = toSiteHref(raw);
    if (next) link.setAttribute('href', next);
  });
  root.querySelectorAll('img[src^="/"], source[src^="/"], video[src^="/"]').forEach((node) => {
    const attr = node.tagName.toLowerCase() === 'source' ? 'src' : 'src';
    const raw = node.getAttribute(attr);
    const next = toSiteHref(raw);
    if (next) node.setAttribute(attr, next);
  });
}

function homeThumbPath(value){
  if (!isHomePage() || !value) return value;
  const raw = String(value);
  if (/^(https?:)?\/\//i.test(raw) || /\.svg(?:$|[?#])/i.test(raw)) return raw;
  const clean = raw.replace(/^\/+/, '').split('#')[0].split('?')[0];
  if (!/\.(png|jpe?g)$/i.test(clean)) return raw;
  return `assets/home-thumbs/${clean.replace(/\.[^.]+$/, '.jpg')}`;
}


// ---------- URL resolver ----------
function resolveUrl(type, key, data){
  const prefer = data?.url || data?.page;
  if (prefer){
    if (/^https?:\/\//i.test(prefer)) return prefer;
    return toSiteHref(`/${String(prefer).replace(/^\.?\/*/, '')}`);
  }
  const slug = String(data?.slug || key || '')
    .toLowerCase().trim().replace(/\s+/g,'-')
    .replace(/[^a-z0-9\-._~/]/g,'');

  const rel = (p) => toSiteHref(`/${String(p).replace(/^\.?\/*/, '')}`);

  if (type === 'camp')    return slug ? rel(`camp/${slug}/index.html`)  : '';
  if (type === 'project') return slug ? rel(`projects/${slug}/index.html`) : '';
  if (type === 'gear')    return slug ? rel(`gear/${slug}/index.html`)   : ''; // ← add this
  return '';
}






// ---------- Mobile nav ----------
const MOBILE_BP = 900;
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function setMobileMenu(open){
  if (!menuBtn || !mobileMenu) return;
  const isOpen = !!open;
  mobileMenu.classList.toggle('open', isOpen);
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen); // lock background scroll
}

menuBtn?.addEventListener('click', () => {
  const isOpen = mobileMenu?.classList.contains('open');
  setMobileMenu(!isOpen);
});

// close on link tap
mobileMenu?.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMobileMenu(false);
});

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) setMobileMenu(false);
});

// auto-reset when viewport grows to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= MOBILE_BP) setMobileMenu(false);
}, { passive:true });




// ---------- Modals registry ----------
const modals = { project:null, camp:null, code:null, gear:null, tool:null };

// ---------- Close buttons (floating X) ----------
function ensureFloatingClose(modal){
  if (!modal) return;
  const card = modal.querySelector('.modal-card') || modal;
  if (!card.querySelector('.modal-close')) {
    const btn = document.createElement('button');
    btn.className = 'modal-close';
    btn.setAttribute('data-close','');
    btn.setAttribute('aria-label','Close');
    btn.textContent = '✕';
    btn.style.cssText = `
      position:absolute;top:10px;right:10px;width:40px;height:40px;
      display:grid;place-items:center;border-radius:10px;border:1px solid var(--line);
      background:rgba(0,0,0,.55);color:#fff;font-size:20px;line-height:1;cursor:pointer;z-index:10;
    `;
    card.style.position = 'relative';
    card.appendChild(btn);
  }
}

// ---------- Tool embed (kept) ----------
async function openTool(page){
  const modal = document.getElementById('toolModal') || document.getElementById('campModal');
  if (!modal) return;

  // Mobile: navigate instead of modal
  if (!window.FC_IS_DESKTOP()){
    window.location.href = page;
    return;
  }

  const card = modal.querySelector('.modal-card') || modal;
  let slot = modal.querySelector('#toolPageWrap');
  if (!slot){
    slot = document.createElement('div');
    slot.id = 'toolPageWrap';
    slot.style.cssText = 'position:relative;width:100%;height:min(86vh,900px);overflow:hidden;';
    card.appendChild(slot);
  }
  slot.innerHTML = '<div style="position:absolute;inset:0;display:grid;place-items:center;color:#9ca3af">Loading…</div>';
  const iframe = document.createElement('iframe');
  iframe.src = page + (page.includes('?')?'&':'?') + 'v=' + Date.now();
  iframe.title = 'Embedded tool';
  iframe.style.cssText = 'width:100%;height:100%;border:0;display:block;background:#0a0c0f;';
  iframe.onload = () => slot.firstChild?.remove();
  slot.appendChild(iframe);
  modal.classList.add('open');
}

// ---------- Visual helpers ----------
function chipRow(arr){
  const a = (arr || []).filter(Boolean);
  return a.length ? `<div class="card-tags">${a.map(t=>`<span class="pill">${t}</span>`).join('')}</div>` : '';
}
function setModalBg(modalEl, src){
  if (!modalEl) return;
  if (src) modalEl.style.setProperty('--modal-bg', `url("${src}")`);
  else modalEl.style.removeProperty('--modal-bg');
}
function tagModalForAspect(modalEl, imgEl){
  if (!modalEl || !imgEl) return;
  const apply = () => {
    const r = imgEl.naturalWidth / imgEl.naturalHeight || 0;
    modalEl.classList.remove('is-portrait','is-square','is-ultrawide');
    if (!isFinite(r) || r === 0) return;
    if (r < 0.95) modalEl.classList.add('is-portrait');
    else if (r > 2.0) modalEl.classList.add('is-ultrawide');
    else if (r > 0.95 && r < 1.15) modalEl.classList.add('is-square');
  };
  if (imgEl.complete && imgEl.naturalWidth) apply();
  else imgEl.addEventListener('load', apply, { once:true });
}

// ---------- Scroll lock ----------
let __scrollLockY = 0;
function lockPageScroll(){
  if (!window.FC_IS_DESKTOP()) return; // desktop-only
  if (document.body.classList.contains('lock-scroll')) return;
  __scrollLockY = window.scrollY || window.pageYOffset || 0;
  const sw = window.innerWidth - document.documentElement.clientWidth;
  if (sw > 0) document.body.style.paddingRight = `${sw}px`;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${__scrollLockY}px`;
  document.body.style.width = '100%';
  document.documentElement.classList.add('lock-scroll');
  document.body.classList.add('lock-scroll');
}
function unlockPageScroll(){
  const y = __scrollLockY || 0;
  document.documentElement.classList.add('no-smooth');
  document.documentElement.classList.remove('lock-scroll');
  document.body.classList.remove('lock-scroll');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.paddingRight = '';
  requestAnimationFrame(() => {
    window.scrollTo(0, y);
    requestAnimationFrame(() => { document.documentElement.classList.remove('no-smooth'); });
  });
}
function openModal(m){
  if (!m) return;
  if (!window.FC_IS_DESKTOP()){
    // safety: do not open modals on mobile
    return;
  }
  const card = m.querySelector('.modal-card');
  if (card){
    card.style.margin = '5vh auto';
    card.style.left = 'unset';
    card.style.top = 'unset';
    card.style.transform = 'none';
    card.style.maxHeight = '90vh';
  }
  m.classList.add('open'); 
  lockPageScroll();
}
function closeModal(m){ if (!m) return; m.classList.remove('open'); m.style.removeProperty('--modal-bg'); unlockPageScroll(); }

// ---------- URL resolver ----------
function resolveUrl(type, key, data){
  const prefer = data?.url || data?.page;
  if (prefer){
    if (/^https?:\/\//i.test(prefer)) return prefer;        // absolute
    return toSiteHref(`/${String(prefer).replace(/^\.?\/*/, '')}`);
  }

  // slug for URLs, folder for your on-disk names
  const rawSlug = String(data?.slug || key || '').toLowerCase().trim();
  const slug = rawSlug.replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const folder = rawSlug.replace(/[^a-z0-9]+/g,'');          // e.g. wise-owl-stakes → wiseowlstakes

  const rel = (p) => toSiteHref(`/${String(p).replace(/^\.?\/*/, '')}`);
  if (type === 'camp')    return rel(`camp/${slug}/index.html`);
  if (type === 'project') return rel(`projects/${slug}/index.html`);
  if (type === 'gear')    return rel(`gear/${folder}/index.html`);  // 👈 NEW
  return '';
}

// ---------- Generic iframe modal loader (desktop only) ----------
function loadPageIntoModal(modal, titleEl, pageUrl){
  if (!window.FC_IS_DESKTOP()) return; // guard
  if (!modal) return;
  const card = modal.querySelector('.modal-card');
  if (!card) return;

  if (!window.__fcZoomInstalled){
    window.__fcZoomInstalled = true;
    const ov = document.createElement('div');
    ov.id = 'fc-parent-zoom';
    Object.assign(ov.style, {
      position:'fixed', inset:'0', display:'none', placeItems:'center',
      background:'rgba(0,0,0,.92)', zIndex:'2147483600', cursor:'zoom-out'
    });
    const img = document.createElement('img');
    Object.assign(img.style, { maxWidth:'92vw', maxHeight:'92vh', objectFit:'contain', display:'block' });
    ov.appendChild(img);
    ov.addEventListener('click', ()=>{ ov.style.display='none'; img.src=''; });
    document.body.appendChild(ov);
    window.addEventListener('message', (ev)=>{
      const d = ev.data || {};
      if (d && d.type === 'FC_ZOOM' && d.src) { img.src = d.src; ov.style.display = 'grid'; }
    });
  }

  modal.style.setProperty('overflow', 'hidden', 'important');
  card .style.setProperty('overflow', 'hidden', 'important');
  card .style.setProperty('max-height', 'none', 'important');

  let slot = card.querySelector('.fc-embed-slot');
  if (!slot){
    slot = document.createElement('div');
    slot.className = 'fc-embed-slot';
    Object.assign(slot.style, {
  display:'block', padding:0, margin:'0',
  width:'100%', minHeight:'560px',
  overflow:'hidden', borderRadius:'12px', background:'#0b0c0f',
  willChange:'transform, opacity'
});

    const old = card.querySelector('.modal-body');
    if (old) old.replaceWith(slot); else card.appendChild(slot);
  }

  const setSlotHeight = () => {
    const vh = (window.visualViewport?.height || window.innerHeight || 800);
    slot.style.height = Math.max(420, Math.round(vh * 0.88)) + 'px';
  };
  setSlotHeight();
  window.addEventListener('resize', setSlotHeight, { passive:true });
  window.addEventListener('orientationchange', setSlotHeight, { passive:true });

  slot.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--muted);font-size:14px">Loading…</div>`;

  const iframe = document.createElement('iframe');
  iframe.src = pageUrl;
  iframe.title = titleEl?.textContent || 'Details';
  iframe.loading = 'eager';
  iframe.allow = 'fullscreen';
  iframe.style.cssText = 'display:block;width:100%;height:100%;border:0;background:#0b0c0f;opacity:0;transition:opacity .12s;';
  iframe.style.visibility = 'hidden';
  iframe.style.pointerEvents = 'none';

  const failTimer = setTimeout(() => {
    slot.innerHTML = `
      <div style="padding:16px">
        <h4 style="margin:0 0 8px">Sorry - could not load this page.</h4>
        <p class="lead" style="margin:0 0 8px;word-break:break-all">Tried: ${pageUrl}</p>
      </div>`;
  }, 8000);

iframe.addEventListener('load', () => {
  clearTimeout(failTimer);
  try {
    const win = iframe.contentWindow;
    const doc = iframe.contentDocument || win?.document;
    if (!doc) return;
    
    doc.documentElement.classList.add('is-embed');

    const style = doc.createElement('style');
    style.textContent = `
      /* Hide site chrome INSIDE the iframe */
      header, #header, .header, .site-header, [role="banner"],
      nav#topNav, .navbar, .topbar, .mobile-menu, .fc-cart,
      footer, #footer, .footer, .site-footer, [role="contentinfo"] {
        display: none !important;
      }

      /* Hard reset so content starts at the very top */
      html, body {
        background: #0b0c0f !important;
        margin: 0 !important;
        padding: 0 !important;
        height: auto !important;
        min-height: 0 !important;
        overflow: auto !important;
        scroll-behavior: auto !important;
      }
      :root { scroll-padding-top: 0 !important; }
      body { --navh: 0 !important; }

      /* Kill common header spacers / sticky shims that add top gap */
      .site-header-space, .site-header-spacer, .header-spacer,
      .sticky-spacer, .admin-bar-spacer, .toolbar-spacer,
      .proj-wrap, .code-wrap {
        margin-top: 0 !important;
        padding-top: 0 !important;
        height: auto !important;
      }

      /* Make wrappers stop imposing top margins */
      body, #page, .site, .site-container, .site-wrap,
      .page-wrap, .container, .content-wrap, .wrapper,
      .site-inner, .content-area,
      main, #main, .site-main, .content, .page-content, #content {
        margin-top: 0 !important;
        padding-top: 0 !important;
        min-height: 0 !important;
        height: auto !important;
        overflow: visible !important;
        display: block !important;
      }

      /* Remove first-child top margin so first section hugs the top */
      main > :first-child,
      .site-main > :first-child,
      .page-content > :first-child,
      #content > :first-child {
        margin-top: 0 !important;
      }

/* Neutralize sticky/fixed that can create phantom space
   NOTE: don't touch inline position:fixed - lightboxes rely on it */
.sticky, .is-sticky, [data-sticky], [class*="sticky"], [class*="Sticky"],
.fixed, .is-fixed, [class*="fixed"], [class*="Fixed"] {
  position: static !important;
  top: auto !important;
  bottom: auto !important;
}


      /* External navs should pop a new tab if they navigate away */
      a[href]:not([href^="#"]) { target-new: tab !important; }
    `;
    doc.head.appendChild(style);
  } finally {
    requestAnimationFrame(() => { iframe.style.opacity = '1'; });
  }
});


  slot.innerHTML = '';
  slot.appendChild(iframe);

  const unfreeze = () => { iframe.style.visibility = 'visible'; iframe.style.pointerEvents = 'auto'; };
  const onOpened = (ev) => {
    if (ev.target !== modal || !modal.classList.contains('open')) return;
    unfreeze();
    modal.removeEventListener('transitionend', onOpened);
    modal.removeEventListener('animationend', onOpened);
  };
  modal.addEventListener('transitionend', onOpened, { passive:true });
  modal.addEventListener('animationend', onOpened, { passive:true });
  requestAnimationFrame(unfreeze);
  setTimeout(unfreeze, 220);
  setTimeout(unfreeze, 800);

  const freezeBeforeClose = () => { iframe.style.visibility = 'hidden'; iframe.style.pointerEvents = 'none'; };
  modal.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', freezeBeforeClose, { capture:true }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') freezeBeforeClose(); });
}

// ---------- Fallback chain (kept for CODE) ----------
function loadPageIntoModalWithFallback(modal, titleEl, candidates){
  const tryNext = (idx=0) => {
    const url = candidates[idx];
    if (!url) return;
    loadPageIntoModal(modal, titleEl, url);
    const card = modal.querySelector('.modal-card');
    const slot = card?.querySelector('.fc-embed-slot');
    const iframe = slot?.querySelector('iframe');
    if (!iframe) return;
    iframe.addEventListener('load', () => {
      try {
        const doc = iframe.contentDocument;
        const bodyText = (doc?.body?.innerText || '').toLowerCase();
        const titleTxt = (doc?.title || '').toLowerCase();
        const looks404 =
          titleTxt.includes('404') ||
          bodyText.includes('requested url was not found') ||
          bodyText.startsWith('not found') ||
          bodyText.includes('error 404');
        if (looks404 && idx < candidates.length - 1) {
          loadPageIntoModalWithFallback(modal, titleEl, candidates.slice(idx+1));
        }
      } catch {}
    }, { once:true });
  };
  tryNext(0);
}

// ---------- Data getters ----------
function entriesFromData(objOrArr){
  if (!objOrArr) return [];
  if (Array.isArray(objOrArr)) {
    return objOrArr.map((it, i) => [String(it.key || it.slug || it.title || `item-${i}`).toLowerCase().replace(/\s+/g,'-'), it]);
  }
  return Object.entries(objOrArr);
}
function getItemByKey(dataset, key){
  if (!dataset) return null;
  if (Array.isArray(dataset)) {
    return dataset.find(it => (it.key || it.slug) === key) ||
           dataset.find(it => (String(it.title||'').toLowerCase().replace(/\s+/g,'-')) === key) ||
           null;
  }
  return dataset[key] || null;
}

// =====================================================================
// CART (unchanged)
// =====================================================================
const CART_KEY = 'fc_cart_v1';
function readCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch{ return []; } }
function writeCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); }
function addItemToCart({sku,name,price,kind}){
  const items = readCart();
  const idx = items.findIndex(i => i.sku === sku);
  if (idx >= 0) items[idx].qty += 1;
  else items.push({ sku, name, price: Number(price||0), qty: 1, kind: (kind||'item').toLowerCase() });
  writeCart(items);
  renderCart();
}
function removeItem(sku){
  let items = readCart().filter(i => i.sku !== sku);
  writeCart(items);
  renderCart();
}
function clearCart(){ writeCart([]); renderCart(); }

function calcCart(){
  const items = readCart();
  const subtotal = items.reduce((s,i)=> s + i.price*i.qty, 0);
  const hasHat = items.some(i => (i.kind||'').toLowerCase() === 'hat');
  const hasSticker = items.some(i => (i.kind||'').toLowerCase() === 'sticker');
  const shipping = hasHat ? 6.00 : (hasSticker ? 1.00 : 0.00);
  const tax = null;
  const total = subtotal + shipping + (tax || 0);
  return { items, subtotal, shipping, tax, total };
}
function money(n){ return '$' + (Number(n||0)).toFixed(2); }

function syncCartVisibility(){
  const cart = document.getElementById('fc-cart');
  const items = readCart();
  const panel = document.getElementById('fc-cart-panel');
  const toggle = document.getElementById('fc-cart-toggle');

  if (!cart) return;

  if (!items.length){
    cart.classList.add('is-empty');
    if (panel) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      panel.style.display = 'none';
    }
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  } else {
    cart.classList.remove('is-empty');
  }
}
function renderCart(){
  const { items, subtotal, shipping, tax, total } = calcCart();

  $('#fc-cart-count') && ($('#fc-cart-count').textContent = String(items.reduce((s,i)=>s+i.qty,0)));

  const itemsEl = $('#fc-cart-items');
  const subEl   = $('#fc-subtotal');
  const shipEl  = $('#fc-shipping');
  const taxEl   = $('#fc-tax');
  const totEl   = $('#fc-total');

  if (itemsEl){
    if (!items.length){
      itemsEl.innerHTML = `<div class="muted" style="padding:10px">Your cart is empty.</div>`;
    } else {
      itemsEl.innerHTML = items.map(i => `
        <div class="fc-item">
          <div class="fc-line">
            <strong>${i.name}</strong>
            <span>${money(i.price)} × ${i.qty}</span>
          </div>
          <div class="fc-line">
            <small class="muted">${i.sku}</small>
            <button class="btn" data-remove="${i.sku}" style="padding:2px 8px">Remove</button>
          </div>
        </div>
      `).join('');
      itemsEl.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', ()=> removeItem(btn.dataset.remove)));
    }
  }
  if (subEl) subEl.textContent = money(subtotal);
  if (shipEl) shipEl.textContent = money(shipping);
  if (taxEl)  taxEl.textContent  = (tax == null ? '—' : money(tax));
  if (totEl)  totEl.textContent  = money(total);

  const ppWrap = $('#paypal-checkout');
  if (items.length && ppWrap && !window.paypal) {
    loadPayPalSdk().then(() => renderCart()).catch((err) => console.error('PayPal SDK failed:', err));
  }

  const pp = window.paypal;
  if (items.length && pp && ppWrap){
    ppWrap.innerHTML = '';
    pp.Buttons({
      style: { layout:'vertical' },
      createOrder: (data, actions) => {
        const { items, subtotal, shipping, total } = calcCart();
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: total.toFixed(2),
              breakdown: {
                item_total: { currency_code:'USD', value: subtotal.toFixed(2) },
                shipping:   { currency_code:'USD', value: shipping.toFixed(2) }
              }
            },
            items: items.map(i => ({
              name: i.name,
              unit_amount: { currency_code:'USD', value: i.price.toFixed(2) },
              quantity: String(i.qty),
              sku: i.sku
            }))
          }]
        });
      },
      onApprove: (data, actions) => actions.order.capture().then(() => { clearCart(); alert('Thanks! Your order was completed.'); }),
      onError: (err) => { console.error('PayPal error:', err); alert('Checkout error. Please try again.'); }
    }).render(ppWrap);
  }
  syncCartVisibility();
}

let paypalSdkPromise = null;
function loadPayPalSdk(){
  if (window.paypal) return Promise.resolve(window.paypal);
  if (paypalSdkPromise) return paypalSdkPromise;

  paypalSdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=ASOWBncHA04CKD9XsJU53L-zwIhrN5rEDDp1rB-q8hTIAQFBcQnen4ApfzqVK6t1zPjal-kheY1Pi8ru&currency=USD&intent=capture';
    script.async = true;
    script.onload = () => resolve(window.paypal);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return paypalSdkPromise;
}
function toggleCartPanel(open){
  const panel = $('#fc-cart-panel');
  const toggle= $('#fc-cart-toggle');
  if (!panel || !toggle) return;
  if (!readCart().length){
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    panel.style.display = 'none';
    toggle.setAttribute('aria-expanded', 'false');
    return;
  }
  const shouldOpen = open != null ? open : panel.getAttribute('aria-hidden') === 'true';
  panel.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
  toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  panel.classList.toggle('open', shouldOpen);
  panel.style.display = shouldOpen ? 'block' : 'none';
}

// =====================================================================
// BOOT
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Cache modal refs
  modals.project = $('#projectModal');
  modals.camp    = $('#campModal');
  modals.code    = $('#codeModal');
  modals.gear    = $('#gearModal');
  modals.tool    = $('#toolModal');
  
  

  // Close behaviors
  [modals.project, modals.camp, modals.code, modals.gear, modals.tool].forEach(m => {
    if (!m) return;
    ensureFloatingClose(m);
    m.addEventListener('click', (e) => { if (e.target === m) closeModal(m); });
  });
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-close]');
    if (!btn) return;
    const modal = btn.closest('.modal');
    if (modal) closeModal(modal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') [modals.project, modals.camp, modals.code, modals.gear, modals.tool].forEach(closeModal);
  });

  // Icons (Lucide)
  try { window.lucide?.createIcons?.(); } catch {}

  // Top nav highlight (kept)
  try {
    const navLinks = $$('#topNav a');
    const getHash = (href) => {
      if (!href) return '';
      const u = href.startsWith('/') ? new URL(href, location.origin) : new URL(href, location.href);
      return u.hash || '';
    };
    const sectionIds = [...new Set(
      navLinks.map(a => getHash(a.getAttribute('href')))
              .filter(h => h && h.startsWith('#'))
              .map(h => h.slice(1))
    )];
    const sections = sectionIds.map(id => ({ id, el: document.getElementById(id) })).filter(x => x.el);

    const highlight = () => {
      const headerOffset = 90;
      const top = window.pageYOffset + headerOffset;
      let current = sections[0]?.id || '';
      for (const s of sections) {
        const ot = s.el.offsetTop, ob = ot + s.el.offsetHeight;
        if (top >= ot && top < ob) { current = s.id; break; }
      }
      navLinks.forEach(a => {
        const h = getHash(a.getAttribute('href'));
        a.classList.toggle('active', h === `#${current}`);
      });
    };
    window.addEventListener('scroll', () => requestAnimationFrame(highlight), { passive:true });
    window.addEventListener('load', highlight);
    highlight();
  } catch {}

  // ---------- PROJECTS ----------
  try {
    const grid = $('#projectGrid');
    if (grid && window.PROJECT_DATA){
      const projectEntries = limitHomeCards(featuredFirst(
        entriesFromData(window.PROJECT_DATA)
      ));
      const html = projectEntries.map(([id, it]) => {
        const thumbSrc = toSiteHref(homeThumbPath(it.thumb || it.images?.[0] || ''));
        const href = resolveUrl('project', id, it);
      return `
  <a href="${href}" data-modal="project" data-project-id="${id}" style="text-decoration:none;color:inherit;">
    <article class="card clickable project-card" data-id="${id}">
      <div class="thumb" style="position:relative;">
        ${cardBadge(it.badge)}
        ${thumbSrc ? `<img src="${thumbSrc}" alt="${it.title || id}" loading="lazy">` : ''}
      </div>
      <div class="card-body">
        <h4>${it.title || id}</h4>
        ${it.rating?.overall ? `
          <div class="camp-rating">
            <span class="stars">${getStars(it.rating.overall)}</span>
            <span class="score">${it.rating.overall.toFixed(1)}</span>
          </div>
        ` : ""}
        ${it.desc ? `<p class="desc">${it.desc}</p>` : ''}
        ${chipRow(it.meta)}
      </div>
    </article>
  </a>
`;}).join('');
      grid.innerHTML = html;
      if (document.body.dataset.pageId === 'home') {
        requestAnimationFrame(() => { grid.scrollLeft = 0; });
        requestAnimationFrame(enforceHomeMobileCarousels);
      }

      grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card'); if (!card) return;
        const id   = card.dataset.id;
        const data = getItemByKey(window.PROJECT_DATA, id) || {};
        const url  = resolveUrl('project', id, data);

        // Mobile: navigate
        if (!window.FC_IS_DESKTOP()){
          window.location.href = url;
          return;
        }

        const titleEl = $('#projectTitle'); if (titleEl) titleEl.textContent = data.title || 'Project';
        const thumbImg = card.querySelector('.thumb img');
        const bgSrc = (thumbImg && (thumbImg.currentSrc || thumbImg.src)) || data.thumb || (Array.isArray(data.images) ? data.images[0] : '');
        if (bgSrc) setModalBg(modals.project, bgSrc);
        loadPageIntoModal(modals.project, titleEl, url);
        openModal(modals.project);
      });
    }
  } catch (e) { console.error('Projects init failed:', e); }

 // ---------- CAMP ----------
try {
  const grid = $('#campGrid');
  const filtersEl = $('#campFilters');

  if (grid && window.CAMP_DATA){
    const regionLabel = (key='') => {
      const map = {
        flagstaff: 'Flagstaff',
        payson: 'Mogollon Rim',
        prescott: 'Prescott',
        'white-mountains': 'White Mountains',
        'southern-az': 'Southern AZ',
        'southern-california': 'Southern California',
        'new-mexico': 'New Mexico',
        oahu: 'Oahu',
        hawaii: 'Hawaii',
        utah: 'Utah'
      };
      return map[key] || key || '';
    };

    const html = limitHomeCards(entriesFromData(window.CAMP_DATA)).map(([id, it]) => {
      const tags = (it.tags && it.tags.length) ? it.tags : [it.season, it.wind, it.pack].filter(Boolean);
      const regionSlug = it.regionSlug || slugify(it.region || 'all');
      const meta = regionLabel(it.region).toUpperCase();
      const isNew = Array.isArray(it.tags) && it.tags.some(t => String(t).toUpperCase() === 'NEW');

      const thumbSrc = toSiteHref(homeThumbPath(it.thumb || ''));
      return `
        <article class="card clickable camp-card" data-id="${id}" data-region="${regionSlug}">
        <div class="thumb">
            ${isNew ? cardBadge('New') : ''}
            ${thumbSrc ? `<img src="${thumbSrc}" alt="${it.title || id}" loading="lazy">` : ''}
          </div>
          <div class="card-body">
  ${meta ? `<div class="card-meta">${meta}</div>` : ''}
  <h4>${it.title || id}</h4>
  ${it.rating?.overall ? `
    <div class="camp-rating">
      <span class="stars">${getStars(it.rating.overall)}</span>
      <span class="score">${it.rating.overall.toFixed(1)}</span>
    </div>
  ` : ''}
  ${it.notes ? `<p class="desc">${it.notes}</p>` : ''}
  ${chipRow(tags)}
</div>
        </article>
      `;
    }).join('');

    grid.innerHTML = html;
    if (document.body.dataset.pageId === 'home') {
      requestAnimationFrame(enforceHomeMobileCarousels);
    }

    filtersEl?.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip[data-region]'); if (!btn) return;
      $$('#campFilters .chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const region = btn.dataset.region;
      $$('.camp-card').forEach(card => {
        card.style.display = (region === 'all' || card.dataset.region === region) ? '' : 'none';
      });
    });

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.camp-card'); if (!card) return;
      const id   = card.dataset.id;
      const data = getItemByKey(window.CAMP_DATA, id) || {};
      const url  = resolveUrl('camp', id, data);

      if (!window.FC_IS_DESKTOP()){
        window.location.href = url;
        return;
      }

      const titleEl = $('#campTitle'); if (titleEl) titleEl.textContent = data.title || 'Camp';
      const hero = card.querySelector('.thumb img');
      const bgSrc = (hero && (hero.currentSrc || hero.src)) || data.thumb || (Array.isArray(data.images) ? data.images[0] : '');
      if (bgSrc) setModalBg(modals.camp, bgSrc);
      loadPageIntoModal(modals.camp, titleEl, url);
      openModal(modals.camp);
    });
  }
} catch (e) { console.error('Camp init failed:', e); }
// ---------- GEAR (cards → page on mobile / modal on desktop, fallback to gallery) ----------
try {
  const grid = $('#gearGrid');
  if (grid && window.GEAR_DATA){
    const card = (id, it, index = 0) => `
      <article class="card clickable gear-card" data-id="${id}" data-cat="${it.category || 'other'}">
        <div class="thumb">
          ${cardBadge(it.badge || it.status || (index < 3 ? 'Featured' : ''))}
          <img src="${homeThumbPath(it.thumb || it.images?.[0] || '')}" alt="${it.title || id}" loading="lazy">
        </div>
        <div class="card-body">
          <h4>${it.title || id}</h4>
          <p class="lead">${it.review || ''}</p>
          ${chipRow([it.category, ...(it.meta || [])].filter(Boolean))}
        </div>
      </article>`;

    const render = (filter='all') => {
      const items = limitHomeCards(
        entriesFromData(window.GEAR_DATA).filter(([_, it]) => filter === 'all' || it.category === filter)
      );
      grid.innerHTML = items.map(([id, it], index) => card(id, it, index)).join('');
      if (document.body.dataset.pageId === 'home') {
        requestAnimationFrame(() => { grid.scrollLeft = 0; });
        requestAnimationFrame(enforceHomeMobileCarousels);
      }
    };
    render('all');

    $('#gearFilters')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip[data-cat]'); if (!btn) return;
      $$('#gearFilters .chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.cat);
    });

    let photos = [], idx = 0;
    const img = $('#gearImg');
    const thumbs = $('#gearThumbs');

    function setPhoto(i){
      if (!photos.length || !img) return;
      idx = (i + photos.length) % photos.length;
      const src = photos[idx];
      img.src = src;
      setModalBg(modals.gear, src);
      tagModalForAspect(modals.gear, img);
      $$('#gearThumbs img').forEach((im,n)=> im.style.outline = n===idx ? '2px solid var(--accent)' : '1px solid var(--line)');
    }
    $('#prevGearPhoto')?.addEventListener('click', ()=>setPhoto(idx-1));
    $('#nextGearPhoto')?.addEventListener('click', ()=>setPhoto(idx+1));

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.gear-card'); if (!card) return;
      const id   = card.dataset.id;
      const data = getItemByKey(window.GEAR_DATA, id) || {};

      // Prefer a real page when present
      const url = resolveUrl('gear', id, data); // requires gear support in resolveUrl
      const hasPage = !!url && (data.page || data.url || data.slug);
      const isSelf  = hasPage && (new URL(url, location.href).pathname === location.pathname);

      if (hasPage && !isSelf){
        if (!window.FC_IS_DESKTOP()){
          window.location.href = url; // mobile → navigate
          return;
        }
        // desktop → embed page
        const titleEl = $('#gearTitle'); if (titleEl) titleEl.textContent = data.title || 'Gear';
        setModalBg(modals.gear, data.thumb || data.images?.[0] || '');
        loadPageIntoModal(modals.gear, titleEl, url);
        openModal(modals.gear);
        return;
      }

      // ---- Legacy gallery fallback (items without pages) ----
      const cardEl = modals.gear?.querySelector('.modal-card');
      if (cardEl){ cardEl.style.margin='5vh auto'; cardEl.style.maxHeight='90vh'; }

      $('#gearTitle').textContent  = data.title || 'Gear';
      $('#gearReview').textContent = data.review || '';

      const tags = [data.category, ...(data.meta || [])].filter(Boolean);
      $('#gearMeta').innerHTML = tags.length
        ? `<div class="meta-block">${tags.map(t => `<span class="pill">${t}</span>`).join('')}</div>`
        : '';

      const section  = (label, html) => html ? `<div class="kv"><div class="k">${label}</div><div class="v">${html}</div></div>` : '';
      const ulist    = (arr) => Array.isArray(arr) && arr.length ? `<ul>${arr.map(li => `<li>${li}</li>`).join('')}</ul>` : '';
      const chiplist = (arr) => Array.isArray(arr) && arr.length ? `<div class="chip-row">${arr.map(x => `<span class="chip">${x}</span>`).join('')}</div>` : '';

      const retailerUrl = data.buy || data.link || '';
      const detailsHTML = `
        ${data.description ? section('Description', data.description) : ''}
        ${data.myTake ? `<div class="callout"><strong>My take:</strong> ${data.myTake}</div>` : ''}
        ${data.note ? `<p class="muted">${data.note}</p>` : ''}

        ${(data.pros || data.cons) ? `
          <div class="procon">
            ${section('Pros', ulist(data.pros))}
            ${section('Cons', ulist(data.cons))}
          </div>` : ''}

        ${data.bestFor ? section('Best For', chiplist(data.bestFor)) : ''}

        ${data.tip ? `
          <div class="tip-box">
            <span class="tip-label">Tip</span>
            <div class="tip-body">${data.tip}</div>
          </div>` : ''}

        ${data.specs ? section('Specs', ulist(data.specs)) : ''}

        ${retailerUrl ? `
          <div class="btn-row">
            <a class="btn solid" href="${retailerUrl}" target="_blank" rel="noopener">
              View on ${data.retailer || 'Retailer'} ↗
            </a>
          </div>` : ''}
      `;
      $('#gearSpecs').innerHTML = detailsHTML;

      photos = data.images || [];
      thumbs.innerHTML = photos
        .map(src => `<img src="${src}" alt="Thumb"
              style="height:60px;width:90px;object-fit:cover;border-radius:8px;border:1px solid var(--line);cursor:pointer">`)
        .join('');
      $$('#gearThumbs img').forEach((t,i)=> t.addEventListener('click', ()=>setPhoto(i)));
      if (photos.length) setPhoto(0);

      openModal(modals.gear);
    });
  }
} catch (e) { console.error('Gear init failed:', e); }


  // ---------- Tool modal (desktop only) ----------
  try {
    modals.tool = $('#toolModal');
    const toolFrame = $('#toolFrame');
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.open-tool'); if (!btn) return;
      const url = btn.dataset.url;
      const title = btn.dataset.title || 'Tool';
      if (!url) return;

      // Mobile: navigate to the tool page instead of opening a modal
      if (!window.FC_IS_DESKTOP()){
        e.preventDefault();
        window.location.href = url;
        return;
      }

      e.preventDefault();
      $('#toolTitle').textContent = title;
      $('#toolNewTab').href = url;
      const card = modals.tool?.querySelector('.modal-card');
      if (card){ card.style.margin='5vh auto'; card.style.maxHeight='90vh'; }
      toolFrame.src = new URL(String(url).replace(/^\.?\/*/, ''), location.href).toString();
      openModal(modals.tool);
    });
    toolFrame?.addEventListener('load', () => {
      try {
        const doc = toolFrame.contentDocument || toolFrame.contentWindow?.document;
        if (!doc) return;
        const style = doc.createElement('style');
        style.textContent = `
          html{scrollbar-width:thin;scrollbar-color:#ff6600 #0b0c0f;}
          ::-webkit-scrollbar{width:8px}
          ::-webkit-scrollbar-track{background:#0b0c0f}
          ::-webkit-scrollbar-thumb{background:#ff6600;border-radius:4px}
          ::-webkit-scrollbar-thumb:hover{background:#ff884d}
        `;
        doc.head.appendChild(style);
      } catch {}
    });
  } catch (e) { console.error('Tool modal init failed:', e); }

  // ---------- Gentle scroll reveal (kept) ----------
  try {
    const revealSelectors = ['#projects', '#camp', '#gear', '#contact', '#projectGrid', '#campGrid', '#gearGrid'];
    revealSelectors.forEach(sel => { const el = document.querySelector(sel); if (!el) return; el.classList.add(/(Grid)$/i.test(sel)?'reveal-stagger':'reveal'); });
    document.querySelectorAll('.project-card, .camp-card, .gear-card').forEach(card => card.classList.add('reveal'));
    const targets = [...document.querySelectorAll('.reveal'), ...document.querySelectorAll('.reveal-stagger')];
    const revealIfOnScreen = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      targets.forEach(t => {
        if (t.classList.contains('in-view')) return;
        const r = t.getBoundingClientRect();
        if (r.top < vh * 0.95) t.classList.add('in-view');
      });
    };
    const io = ('IntersectionObserver' in window)
      ? new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add('in-view');
            if (el.classList.contains('reveal-stagger')) el.classList.add('in-view');
            obs.unobserve(el);
          });
        }, { root:null, threshold:0.01, rootMargin:'0px 0px -2% 0px' })
      : null;
    if (io) targets.forEach(t => io.observe(t)); else setTimeout(() => targets.forEach(t => t.classList.add('in-view')), 0);
    window.addEventListener('load', () => setTimeout(revealIfOnScreen, 50));
    window.addEventListener('scroll', revealIfOnScreen, { passive:true });
    window.addEventListener('resize', revealIfOnScreen);
  } catch (e) { console.error('Reveal init failed:', e); }

  // ---------- Store wiring (kept) ----------
  try {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.add-to-cart'); if (!btn) return;
      const sku = btn.dataset.sku;
      const name = btn.dataset.name || sku || 'Item';
      const price = parseFloat(btn.dataset.price || '0');
      const kind = btn.dataset.kind || 'item';
      addItemToCart({ sku, name, price, kind });
      toggleCartPanel(true);
    });

    $('#fc-cart-toggle')?.addEventListener('click', () => toggleCartPanel());
    $('#fc-cart-close') ?.addEventListener('click', () => toggleCartPanel(false));
    $('#fc-clear')      ?.addEventListener('click', clearCart);

    renderCart();
  } catch (e) { console.error('Cart init failed:', e); }

  // ---------- Small tweaks ----------
  try {
    const store = document.getElementById('store');
    if (store) store.querySelectorAll('.thumb img').forEach(img => {
      img.loading = 'lazy'; img.style.width='100%'; img.style.height='100%'; img.style.objectFit='contain'; img.style.display='block';
    });
  } catch {}

}); // DOMContentLoaded

  if ("serviceWorker" in navigator && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(()=>{});
    });
  } else if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations?.().then((regs) => {
      regs.forEach((reg) => reg.unregister());
    }).catch(() => {});
  }

document.body.classList.add('boot-ready');
document.documentElement.classList.remove('booting');

function syncCartVisibility(){
  const cartWrap = document.getElementById('fc-cart');
  const countEl = document.getElementById('fc-cart-count');
  const panel = document.getElementById('fc-cart-panel');
  const toggle = document.getElementById('fc-cart-toggle');

  if (!cartWrap || !countEl) return;

  const count = parseInt(countEl.textContent || '0', 10) || 0;

  if (count <= 0){
    cartWrap.classList.add('is-empty');
    if (panel) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      panel.style.display = 'none';
    }
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  } else {
    cartWrap.classList.remove('is-empty');
  }
}
function syncCartVisibility(){
  const cart = document.getElementById('fc-cart');
  const countEl = document.getElementById('fc-cart-count');
  const panel = document.getElementById('fc-cart-panel');
  const toggle = document.getElementById('fc-cart-toggle');

  if (!cart || !countEl) return;

  const count = parseInt(countEl.textContent || '0', 10) || 0;

  if (count > 0){
    cart.classList.remove('is-empty');
  } else {
    cart.classList.add('is-empty');
    if (panel) {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      panel.style.display = 'none';
    }
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
}
