/* Drinks and food pages: content comes from /api/menu (editable in the admin page). */
(function () {
  const page = document.body.dataset.menuPage;

  const text = {
    en: {
      back: 'Back home', visit: 'Visit the café', from: 'From', jump: 'Jump to menu sections',
      loading: 'Loading menu…', error: 'The menu could not be loaded. Please refresh the page.',
      'drinks.eyebrow': 'Drinks menu', 'drinks.title': 'Drinks that feel as warm as the room.',
      'drinks.intro': 'From high-quality and locally sourced ingredients, explore our menu from OG classics to signature drinks and discover something that invites you to stay a little longer.',
      'drinks.doc': "Drinks Menu | Coco's Café",
      'food.eyebrow': 'Food menu', 'food.title': 'Food made for leisurely mornings and shared afternoons.',
      'food.intro': 'Pastries, special breakfasts and tasty bites for your moments of rest.',
      'food.doc': "Food Menu | Coco's Café",
    },
    lt: {
      back: 'Į pradžią', visit: 'Mus rasite', from: 'Nuo', jump: 'Meniu skyriai',
      loading: 'Kraunamas meniu…', error: 'Nepavyko įkelti meniu. Perkraukite puslapį.',
      'drinks.eyebrow': 'Gėrimų meniu', 'drinks.title': 'Gėrimai, šilti kaip mūsų kavinė.',
      'drinks.intro': 'Iš kokybiškų, vietinių ingredientų – nuo klasikinių kavos gėrimų iki firminių kūrinių. Atraskite tai, kas pakvies užsibūti ilgiau.',
      'drinks.doc': "Gėrimų meniu | Coco's Café",
      'food.eyebrow': 'Maisto meniu', 'food.title': 'Maistas neskubiems rytams ir jaukioms popietėms.',
      'food.intro': 'Pyragaičiai, ypatingi pusryčiai ir gardūs kąsneliai poilsio akimirkoms.',
      'food.doc': "Maisto meniu | Coco's Café",
    }
  };

  let lang = 'en';
  try { lang = localStorage.getItem('coco_lang') === 'lt' ? 'lt' : 'en'; } catch (e) {}
  let menu = null;

  const t = key => (text[lang][key] ?? text.en[key] ?? key);
  const pick = v => (v && (v[lang] || v.en || v.lt)) || '';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function priceHtml(item) {
    if (!item.price) return '';
    return `<span class="price">${item.from ? esc(t('from')) + ' ' : ''}${esc(item.price)}</span>`;
  }

  function sectionHtml(s) {
    const title = pick(s.title), intro = pick(s.text);
    const heading = (title || intro) ? `
      <div class="section-heading">
        ${title ? `<h2>${esc(title)}</h2>` : ''}
        ${intro ? `<p>${esc(intro)}</p>` : ''}
      </div>` : '';

    if (s.style === 'highlight' || s.style === 'gallery') {
      const cards = s.items.map(it => `
        <article class="highlight-card">
          <h3>${esc(pick(it.name))}</h3>
          ${pick(it.desc) ? `<p>${esc(pick(it.desc))}</p>` : ''}
          ${it.price ? `<p class="highlight-card__meta">${it.from ? esc(t('from')) + ' ' : ''}${esc(it.price)}</p>` : ''}
        </article>`).join('');
      return `<section class="menu-section menu-section--highlight" id="${esc(s.id)}">${heading}<div class="highlight-grid">${cards}</div></section>`;
    }

    const rows = s.items.map(it => `
      <article class="menu-item">
        <div class="menu-item__copy">
          <h3>${esc(pick(it.name))}</h3>
          ${pick(it.desc) ? `<p>${esc(pick(it.desc))}</p>` : ''}
        </div>
        ${priceHtml(it)}
      </article>`).join('');
    return `<section class="menu-section" id="${esc(s.id)}">${heading}<div class="menu-list">${rows}</div></section>`;
  }

  function render() {
    document.documentElement.lang = lang;
    document.title = t(`${page}.doc`);
    document.querySelectorAll('[data-mi18n]').forEach(el => {
      el.textContent = t(el.dataset.mi18n);
    });
    const toggle = document.getElementById('menuLangToggle');
    if (toggle) toggle.textContent = lang === 'en' ? 'LT' : 'EN';

    const root = document.getElementById('menuRoot');
    const nav = document.getElementById('sectionNav');
    if (!menu) return;

    root.innerHTML = menu.sections.filter(s => s.items.length).map(sectionHtml).join('');

    // Jump links when a page has several regular sections (e.g. drinks)
    const listSections = menu.sections.filter(s => s.style === 'list' && s.items.length && pick(s.title));
    if (nav) {
      if (listSections.length >= 3) {
        nav.setAttribute('aria-label', t('jump'));
        nav.innerHTML = listSections.map(s => `<a href="#${esc(s.id)}" class="section-nav__link">${esc(pick(s.title))}</a>`).join('');
        nav.hidden = false;
        // Put the jump links just before the first regular section
        const first = document.getElementById(listSections[0].id);
        if (first) first.before(nav);
      } else {
        nav.hidden = true;
      }
    }
  }

  async function load() {
    const root = document.getElementById('menuRoot');
    root.innerHTML = `<p class="menu-status">${esc(t('loading'))}</p>`;
    try {
      const res = await fetch(`/api/menu?page=${encodeURIComponent(page)}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      menu = (await res.json()).menu;
      render();
    } catch (e) {
      console.error(e);
      root.innerHTML = `<p class="menu-status">${esc(t('error'))}</p>`;
    }
  }

  document.getElementById('menuLangToggle')?.addEventListener('click', () => {
    lang = lang === 'en' ? 'lt' : 'en';
    try { localStorage.setItem('coco_lang', lang); } catch (e) {}
    render();
  });

  render();
  load();
})();
