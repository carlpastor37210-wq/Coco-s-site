/* Events page: month calendar, "coming up" list, ticket pop-up with registration. */
(function () {
  const T = {
    en: {
      back: 'Back home', title: 'Events', doc: "Events | Coco's Café",
      intro: "Tastings, art evenings and gatherings at Coco's. Pick a date to see what's on.",
      upcoming: 'Coming up', loading: 'Loading events…',
      empty: "No upcoming events yet. Follow us on Instagram to hear about the next one.",
      error: 'Events could not be loaded. Refresh the page to try again.',
      prev: 'Previous month', next: 'Next month', close: 'Close',
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      monthsShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      weekdays: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      weekdaysLong: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      regNeeded: 'Registration needed', spots: n => `${n} spot${n === 1 ? '' : 's'} left`, full: 'Fully booked',
      past: 'This event has already happened.', noReg: 'No registration needed. Just come by.',
      register: 'Register', fullMsg: 'This event is fully booked.',
      name: 'Name', email: 'Email', phone: 'Phone (optional)', people: 'Guests', note: 'Note (optional)',
      notePh: 'Allergies, accessibility, anything we should know', cancel: 'Back',
      sending: 'Registering…', fail: 'Registration failed. Check your connection and try again.',
      doneTitle: "You're registered!", done: (email) => `We've sent the details to ${email}. See you there!`,
      doneBtn: 'Close', where: "Coco's Café, Daukšos g. 27"
    },
    lt: {
      back: 'Į pradžią', title: 'Renginiai', doc: "Renginiai | Coco's Café",
      intro: 'Degustacijos, meno vakarai ir susitikimai Coco\'s kavinėje. Pasirinkite datą ir sužinokite, kas vyksta.',
      upcoming: 'Artimiausi renginiai', loading: 'Kraunami renginiai…',
      empty: 'Artimiausių renginių kol kas nėra. Sekite mus Instagrame ir sužinosite pirmi.',
      error: 'Nepavyko įkelti renginių. Perkraukite puslapį.',
      prev: 'Ankstesnis mėnuo', next: 'Kitas mėnuo', close: 'Uždaryti',
      months: ['Sausis','Vasaris','Kovas','Balandis','Gegužė','Birželis','Liepa','Rugpjūtis','Rugsėjis','Spalis','Lapkritis','Gruodis'],
      monthsShort: ['saus.','vas.','kov.','bal.','geg.','birž.','liep.','rugpj.','rugs.','spal.','lapkr.','gruod.'],
      weekdays: ['Pr','An','Tr','Kt','Pn','Št','Sk'],
      weekdaysLong: ['Pirmadienis','Antradienis','Trečiadienis','Ketvirtadienis','Penktadienis','Šeštadienis','Sekmadienis'],
      regNeeded: 'Būtina registracija', spots: n => `Liko vietų: ${n}`, full: 'Vietų nebeliko',
      past: 'Šis renginys jau įvyko.', noReg: 'Registracija nebūtina, tiesiog užsukite.',
      register: 'Registruotis', fullMsg: 'Visos vietos į šį renginį užimtos.',
      name: 'Vardas ir pavardė', email: 'El. paštas', phone: 'Telefonas (nebūtina)', people: 'Svečių skaičius', note: 'Pastaba (nebūtina)',
      notePh: 'Alergijos, prieinamumas ar kita, ką turėtume žinoti', cancel: 'Atgal',
      sending: 'Registruojama…', fail: 'Nepavyko užregistruoti. Patikrinkite ryšį ir bandykite dar kartą.',
      doneTitle: 'Jūs užregistruoti!', done: (email) => `Informaciją išsiuntėme adresu ${email}. Iki pasimatymo!`,
      doneBtn: 'Uždaryti', where: "Coco's Café, Daukšos g. 27"
    }
  };

  let lang = 'en';
  try { lang = localStorage.getItem('coco_lang') === 'lt' ? 'lt' : 'en'; } catch (e) {}
  const t = k => T[lang][k];
  const pick = v => (v && (v[lang] || v.en || v.lt)) || '';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let events = [];
  let today = new Date().toISOString().slice(0, 10);
  let view = null;           // { y, m } month shown in the calendar
  let openId = null;         // event in the dialog
  let originEl = null;       // element the dialog grew out of
  let loadState = 'loading';

  const $ = id => document.getElementById(id);
  const parts = d => { const [y, m, day] = d.split('-').map(Number); return { y, m: m - 1, day }; };
  const pad = n => String(n).padStart(2, '0');
  const ymd = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
  const weekdayIdx = d => { const { y, m, day } = parts(d); return (new Date(y, m, day).getDay() + 6) % 7; };
  const timeText = e => e.start ? (e.end ? `${e.start}–${e.end}` : e.start) : '';
  const isPast = e => e.date < today;

  // ---------- static text ----------
  function applyText() {
    document.documentElement.lang = lang;
    document.title = t('doc');
    document.querySelectorAll('[data-ev]').forEach(el => { el.textContent = t(el.dataset.ev); });
    document.querySelectorAll('[data-ev-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.evAria)));
    $('langToggle').textContent = lang === 'en' ? 'LT' : 'EN';
    $('weekdays').innerHTML = t('weekdays').map(w => `<span>${w}</span>`).join('');
  }

  // ---------- calendar ----------
  function renderCalendar() {
    if (!view) return;
    const { y, m } = view;
    $('calMonth').textContent = `${t('months')[m]} ${y}`;
    const first = (new Date(y, m, 1).getDay() + 6) % 7;     // Monday = 0
    const daysIn = new Date(y, m + 1, 0).getDate();
    const prevDays = new Date(y, m, 0).getDate();
    const cells = Math.ceil((first + daysIn) / 7) * 7;
    const byDate = {};
    events.forEach(e => (byDate[e.date] = byDate[e.date] || []).push(e));

    let html = '';
    for (let i = 0; i < cells; i++) {
      const dayNum = i - first + 1;
      if (dayNum < 1 || dayNum > daysIn) {
        const shown = dayNum < 1 ? prevDays + dayNum : dayNum - daysIn;
        html += `<div class="ev-day ev-day--out" aria-hidden="true"><span class="ev-day__num">${shown}</span></div>`;
        continue;
      }
      const date = ymd(y, m, dayNum);
      const list = byDate[date] || [];
      const cls = ['ev-day', date === today ? 'ev-day--today' : '', list.length ? 'ev-day--has' : '', date < today ? 'ev-day--past' : ''].join(' ');
      if (!list.length) {
        html += `<div class="${cls}"><span class="ev-day__num">${dayNum}</span></div>`;
      } else {
        const label = `${dayNum} ${t('monthsShort')[m]}: ${list.map(e => pick(e.title)).join(', ')}`;
        const pills = list.map(e => `<span class="ev-pill ${isPast(e) ? 'ev-pill--past' : ''}" data-open="${esc(e.id)}">${esc(pick(e.title))}</span>`).join('');
        html += `<button type="button" class="${cls}" data-date="${date}" aria-label="${esc(label)}"><span class="ev-day__num">${dayNum}</span>${pills}</button>`;
      }
    }
    $('calGrid').innerHTML = html;
  }

  // ---------- coming up ----------
  function renderUpcoming() {
    const box = $('upcomingList');
    if (loadState === 'loading') { box.innerHTML = `<p class="ev-muted">${esc(t('loading'))}</p>`; return; }
    if (loadState === 'error') { box.innerHTML = `<p class="ev-muted">${esc(t('error'))}</p>`; return; }
    const upcoming = events.filter(e => !isPast(e));
    if (!upcoming.length) { box.innerHTML = `<p class="ev-muted">${esc(t('empty'))}</p>`; return; }
    box.innerHTML = upcoming.map(e => {
      const { m, day } = parts(e.date);
      const meta = [t('weekdaysLong')[weekdayIdx(e.date)], timeText(e)].filter(Boolean).join(', ');
      let tag = '';
      if (e.registration) {
        tag = e.spotsLeft === 0 ? `<span class="ev-tag ev-tag--full">${esc(t('full'))}</span>`
          : `<span class="ev-tag">${esc(e.spotsLeft != null ? t('spots')(e.spotsLeft) : t('regNeeded'))}</span>`;
      }
      return `
        <button type="button" class="ev-stub-card" data-open="${esc(e.id)}" id="card-${esc(e.id)}">
          <span class="ev-stub-card__date"><span class="ev-stub-card__day">${day}</span><span class="ev-stub-card__mon">${esc(t('monthsShort')[m])}</span></span>
          <span class="ev-stub-card__info">
            <span class="ev-stub-card__title" style="display:block">${esc(pick(e.title))}</span>
            <span class="ev-stub-card__meta" style="display:block">${esc(meta)}${pick(e.price) ? ', ' + esc(pick(e.price)) : ''}</span>
            ${tag}
          </span>
        </button>`;
    }).join('');
  }

  // ---------- ticket dialog ----------
  function stubHtml(e) {
    const { m, day } = parts(e.date);
    return `
      <span class="ev-stub__date"><span class="ev-stub__wd" style="display:block">${esc(t('weekdaysLong')[weekdayIdx(e.date)])}</span>
      <span class="ev-stub__day" style="display:block">${day}</span>
      <span class="ev-stub__mon" style="display:block">${esc(t('months')[m])}</span></span>
      ${timeText(e) ? `<span class="ev-stub__time">${esc(timeText(e))}</span>` : ''}`;
  }

  function factsHtml(e) {
    const facts = [];
    if (pick(e.price)) facts.push(`<li>${esc(pick(e.price))}</li>`);
    facts.push(`<li>${esc(t('where'))}</li>`);
    if (e.registration && !isPast(e)) {
      if (e.spotsLeft === 0) facts.push(`<li>${esc(t('full'))}</li>`);
      else if (e.spotsLeft != null) facts.push(`<li class="is-good">${esc(t('spots')(e.spotsLeft))}</li>`);
    }
    return `<ul class="ev-facts">${facts.join('')}</ul>`;
  }

  function detailsHtml(e) {
    let action;
    if (isPast(e)) action = `<p class="ev-note">${esc(t('past'))}</p>`;
    else if (!e.registration) action = `<p class="ev-note">${esc(t('noReg'))}</p>`;
    else if (e.spotsLeft === 0) action = `<p class="ev-note">${esc(t('fullMsg'))}</p>`;
    else action = `<button type="button" class="ev-btn" id="startReg">${esc(t('register'))}</button>`;
    return `
      ${e.image ? `<img class="ev-ticket__img" src="${esc(e.image)}" alt="">` : ''}
      <h2 id="dlgTitle">${esc(pick(e.title))}</h2>
      ${factsHtml(e)}
      ${pick(e.desc) ? `<p class="ev-desc">${esc(pick(e.desc))}</p>` : ''}
      <div id="ticketAction">${action}</div>`;
  }

  function formHtml(e) {
    const max = Math.min(10, e.spotsLeft != null ? e.spotsLeft : 10);
    const opts = Array.from({ length: max }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
    return `
      <form class="ev-form" id="regForm" novalidate>
        <div class="ev-field"><label for="rName">${esc(t('name'))}</label><input id="rName" name="name" autocomplete="name" required maxlength="80"></div>
        <div class="ev-field"><label for="rEmail">${esc(t('email'))}</label><input id="rEmail" name="email" type="email" autocomplete="email" required maxlength="120"></div>
        <div class="ev-field"><label for="rPhone">${esc(t('phone'))}</label><input id="rPhone" name="phone" type="tel" autocomplete="tel" maxlength="30"></div>
        <div class="ev-field"><label for="rPeople">${esc(t('people'))}</label><select id="rPeople" name="people">${opts}</select></div>
        <div class="ev-field ev-form__full"><label for="rNote">${esc(t('note'))}</label><textarea id="rNote" name="note" maxlength="300" placeholder="${esc(t('notePh'))}"></textarea></div>
        <div class="ev-hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <p class="ev-error" id="regError" role="alert" hidden></p>
        <div class="ev-form__actions">
          <button type="submit" class="ev-btn" id="regSubmit">${esc(t('register'))}</button>
          <button type="button" class="ev-btn ev-btn--ghost" id="regCancel">${esc(t('cancel'))}</button>
        </div>
      </form>`;
  }

  function fillDialog() {
    const e = events.find(x => x.id === openId);
    if (!e) return;
    $('ticketStub').innerHTML = stubHtml(e);
    $('ticketBody').innerHTML = detailsHtml(e);
  }

  function showForm() {
    const e = events.find(x => x.id === openId);
    $('ticketAction').innerHTML = formHtml(e);
    $('rName').focus();
  }

  async function submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const err = $('regError');
    const data = Object.fromEntries(new FormData(form));
    if (!data.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      err.textContent = lang === 'lt' ? 'Įveskite vardą ir teisingą el. pašto adresą.' : 'Please fill in your name and a valid email.';
      err.hidden = false;
      (!data.name.trim() ? $('rName') : $('rEmail')).focus();
      return;
    }
    const btn = $('regSubmit');
    btn.disabled = true; btn.textContent = t('sending'); err.hidden = true;
    try {
      const res = await fetch('/api/events', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', eventId: openId, lang, ...data })
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.success) {
        if (typeof out.spotsLeft === 'number') updateEvent(openId, { spotsLeft: out.spotsLeft });
        throw new Error(out.message || t('fail'));
      }
      if (out.event) updateEvent(openId, out.event);
      $('ticketAction').innerHTML = `
        <div class="ev-done" role="status">
          <div class="ev-done__mark" aria-hidden="true">&#10003;</div>
          <h3>${esc(t('doneTitle'))}</h3>
          <p>${esc(t('done')(data.email.trim()))}</p>
          <button type="button" class="ev-btn" id="doneClose">${esc(t('doneBtn'))}</button>
        </div>`;
      // refresh the facts row (spots left) without wiping the success message
      const facts = document.querySelector('#ticketBody .ev-facts');
      if (facts) facts.outerHTML = factsHtml(events.find(x => x.id === openId));
      $('doneClose').focus();
    } catch (e) {
      err.textContent = e.message || t('fail');
      err.hidden = false;
      btn.disabled = false; btn.textContent = t('register');
    }
  }

  function updateEvent(id, patch) {
    const i = events.findIndex(x => x.id === id);
    if (i >= 0) events[i] = { ...events[i], ...patch };
    renderUpcoming();
  }

  // The ticket grows out of whatever was clicked, and shrinks back into it on close.
  function flip(from, to, ticket, reverse) {
    const dx = from.left - to.left, dy = from.top - to.top;
    const sx = Math.max(from.width / to.width, 0.05), sy = Math.max(from.height / to.height, 0.05);
    const start = { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 0.4, borderRadius: '18px' };
    const end = { transform: 'none', opacity: 1, borderRadius: '26px' };
    return ticket.animate(reverse ? [end, start] : [start, end], {
      duration: reverse ? 260 : 420, easing: reverse ? 'cubic-bezier(.4,0,.7,.2)' : 'cubic-bezier(.2,.9,.25,1)', fill: 'both'
    });
  }

  function openEvent(id, fromEl) {
    openId = id; originEl = fromEl || null;
    fillDialog();
    const dlg = $('eventDialog'), ticket = $('ticket');
    dlg.classList.remove('is-fading');
    dlg.showModal();
    ticket.getAnimations().forEach(a => a.cancel());
    if (!reduceMotion && originEl && originEl.isConnected) {
      flip(originEl.getBoundingClientRect(), ticket.getBoundingClientRect(), ticket, false)
        .finished.then(() => ticket.getAnimations().forEach(x => x.cancel())).catch(() => {});
    } else if (!reduceMotion) {
      ticket.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 250, easing: 'ease-out' });
    }
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
  }

  async function closeEvent() {
    const dlg = $('eventDialog'), ticket = $('ticket');
    if (!dlg.open) return;
    const target = originEl && originEl.isConnected ? originEl : document.querySelector(`[data-open="${CSS.escape(openId)}"]`);
    if (!reduceMotion && target && target.getClientRects().length) {
      dlg.classList.add('is-fading');
      try { await flip(target.getBoundingClientRect(), ticket.getBoundingClientRect(), ticket, true).finished; } catch (e) {}
    }
    dlg.close();
    ticket.getAnimations().forEach(a => a.cancel());
    dlg.classList.remove('is-fading');
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    if (target && target.focus) target.focus({ preventScroll: true });
    openId = null; originEl = null;
  }

  // ---------- events wiring ----------
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open]');
    if (opener && !opener.closest('#eventDialog')) {
      e.stopPropagation();
      const card = opener.classList.contains('ev-pill') ? opener.closest('.ev-day') : opener;
      return openEvent(opener.dataset.open, card);
    }
    const day = e.target.closest('button.ev-day');
    if (day) {
      const list = events.filter(x => x.date === day.dataset.date);
      if (list.length === 1) return openEvent(list[0].id, day);
      // several events on one day: point at them in the list
      list.forEach(x => {
        const c = $('card-' + x.id);
        if (c) { c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash'); }
      });
      const firstCard = list.length && $('card-' + list[0].id);
      if (firstCard) firstCard.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      else if (list.length) openEvent(list[0].id, day);   // past events are not in the list
      return;
    }
    if (e.target.id === 'startReg') return showForm();
    if (e.target.id === 'regCancel') return fillDialog();
    if (e.target.id === 'doneClose' || e.target.closest('#closeDialog')) return closeEvent();
  });
  document.addEventListener('submit', e => { if (e.target.id === 'regForm') submitForm(e); });
  document.addEventListener('input', e => { if (e.target.closest('#regForm')) { const er = $('regError'); if (er) er.hidden = true; } });

  const dlg = $('eventDialog');
  dlg.addEventListener('cancel', e => { e.preventDefault(); closeEvent(); });             // Esc
  dlg.addEventListener('click', e => { if (e.target === dlg) closeEvent(); });              // click outside the ticket

  $('prevMonth').addEventListener('click', () => { view.m--; if (view.m < 0) { view.m = 11; view.y--; } renderCalendar(); });
  $('nextMonth').addEventListener('click', () => { view.m++; if (view.m > 11) { view.m = 0; view.y++; } renderCalendar(); });

  $('langToggle').addEventListener('click', () => {
    lang = lang === 'en' ? 'lt' : 'en';
    try { localStorage.setItem('coco_lang', lang); } catch (e) {}
    applyText(); renderCalendar(); renderUpcoming();
    if (dlg.open && !document.getElementById('regForm') && !document.querySelector('.ev-done')) fillDialog();
  });

  // ---------- start ----------
  async function load() {
    applyText();
    const now = parts(today); view = { y: now.y, m: now.m };
    renderCalendar(); renderUpcoming();
    try {
      const res = await fetch('/api/events', { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      events = data.events || [];
      if (data.today) today = data.today;
      loadState = 'ok';
      // open on the month of the next event, so the calendar isn't empty
      const next = events.find(e => !isPast(e));
      const start = parts(next ? next.date : today);
      view = { y: start.y, m: start.m };
    } catch (e) {
      console.error(e);
      loadState = 'error';
    }
    renderCalendar(); renderUpcoming();
    const fromHash = decodeURIComponent(location.hash.slice(1));
    if (fromHash && events.some(e => e.id === fromHash)) openEvent(fromHash, $('card-' + fromHash));
  }
  load();
})();
