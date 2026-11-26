/* Photo gallery under the events calendar, with a full-screen viewer. */
(function () {
  const PAGE = 12;                       // photos shown before "Show more"
  const $ = id => document.getElementById(id);
  const ev = window.cocoEvents || { t: k => k, lang: () => 'en' };
  const t = k => ev.t(k);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const caption = p => (p.caption && (p.caption[ev.lang()] || p.caption.en || p.caption.lt)) || '';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let photos = [];
  let shown = PAGE;
  let current = -1;

  function renderGrid() {
    const section = $('gallery');
    if (!photos.length) { section.hidden = true; return; }
    section.hidden = false;
    $('galGrid').innerHTML = photos.slice(0, shown).map((p, i) => `
      <button type="button" class="gal__item" data-i="${i}" aria-label="${esc(caption(p) || t('gallery') + ' ' + (i + 1))}">
        <img src="${esc(p.thumb)}" width="${p.w}" height="${p.h}" alt="${esc(caption(p))}" loading="lazy" decoding="async">
      </button>`).join('');
    const more = $('galMore');
    const left = photos.length - shown;
    more.hidden = left <= 0;
    if (left > 0) more.textContent = t('more')(left);
  }

  function show(i) {
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    const img = $('galImg');
    img.src = p.url;
    img.width = p.w; img.height = p.h;
    img.alt = caption(p);
    const cap = caption(p);
    $('galCap').innerHTML = `${cap ? `<span>${esc(cap)}</span>` : ''}<span class="gal-box__count">${current + 1} / ${photos.length}</span>`;
    const many = photos.length > 1;
    $('galPrev').hidden = !many; $('galNext').hidden = !many;
    // warm up the neighbours so arrows feel instant
    [current + 1, current - 1].forEach(j => { const n = photos[(j + photos.length) % photos.length]; if (n) new Image().src = n.url; });
  }

  function open(i, fromEl) {
    const box = $('galBox');
    show(i);
    box.showModal();
    if (!reduceMotion && fromEl) {
      const from = fromEl.getBoundingClientRect();
      const fig = box.querySelector('.gal-box__fig');
      const to = fig.getBoundingClientRect();
      if (to.width && to.height) {
        fig.animate([
          { transform: `translate(${from.left + from.width / 2 - (to.left + to.width / 2)}px, ${from.top + from.height / 2 - (to.top + to.height / 2)}px) scale(${from.width / to.width})`, opacity: 0.6 },
          { transform: 'none', opacity: 1 }
        ], { duration: 320, easing: 'cubic-bezier(.2,.9,.25,1)' });
      }
    }
  }

  function close() {
    const box = $('galBox');
    if (!box.open) return;
    box.close();
    const btn = document.querySelector(`.gal__item[data-i="${current}"]`);
    if (btn) btn.focus({ preventScroll: true });
  }

  // ---- wiring ----
  $('galGrid').addEventListener('click', e => {
    const item = e.target.closest('.gal__item');
    if (item) open(+item.dataset.i, item);
  });
  $('galMore').addEventListener('click', () => { shown += PAGE; renderGrid(); });
  $('galPrev').addEventListener('click', () => show(current - 1));
  $('galNext').addEventListener('click', () => show(current + 1));
  $('galClose').addEventListener('click', close);

  const box = $('galBox');
  box.addEventListener('cancel', e => { e.preventDefault(); close(); });
  box.addEventListener('click', e => { if (e.target === box || e.target.classList.contains('gal-box__fig')) close(); });
  box.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
  });

  // swipe left/right on phones
  let startX = null, startY = null;
  box.addEventListener('pointerdown', e => { startX = e.clientX; startY = e.clientY; });
  box.addEventListener('pointerup', e => {
    if (startX === null) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
  });

  document.addEventListener('coco:lang', () => { renderGrid(); if (box.open) show(current); });

  fetch('/api/gallery', { cache: 'no-store' })
    .then(r => (r.ok ? r.json() : { photos: [] }))
    .then(d => { photos = Array.isArray(d.photos) ? d.photos : []; renderGrid(); })
    .catch(() => {});
})();
