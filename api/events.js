import crypto from 'node:crypto';

// Café events + registrations, stored in the same Upstash Redis as the products.
//   GET                          → public list of events (with spots left)
//   POST  { action:'register' }  → a guest registers for an event
//   PUT   (admin)                → save the whole events list
//   GET   ?registrations=1 (admin) → everyone who registered, per event
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const EVENTS_KEY = 'coco:events';
const COUNTS_KEY = 'coco:events:counts';
const regKey = id => `coco:events:reg:${id}`;
const CAFE_EMAIL = 'info@kavinecoco.com';

// Example events, shown until the first save from the admin page.
const DEFAULT_EVENTS = [
  { id: 'coffee-tasting', date: '2026-12-05', start: '18:00', end: '20:00',
    title: { en: 'Coffee tasting evening', lt: 'Kavos degustacijos vakaras' },
    desc: { en: 'Taste four single-origin coffees side by side and learn what makes each one different. Our baristas guide you through it.',
            lt: 'Paragaukite keturių skirtingų kilmės kavų ir sužinokite, kuo kiekviena išskirtinė. Degustaciją ves mūsų baristai.' },
    price: { en: '€15 per person', lt: '15 € asmeniui' }, image: '', registration: true, capacity: 12 },
  { id: 'local-artist', date: '2026-12-12', start: '17:00', end: '19:00',
    title: { en: 'Local artist session', lt: 'Vietinio menininko vakaras' },
    desc: { en: 'An evening with a Kaunas illustrator: live drawing, a small exhibition and conversation over coffee.',
            lt: 'Vakaras su Kauno iliustruotoja: piešimas gyvai, nedidelė paroda ir pokalbiai prie kavos.' },
    price: { en: 'Free entry', lt: 'Įėjimas nemokamas' }, image: '', registration: false, capacity: 0 },
  { id: 'weekend-brunch', date: '2026-12-19', start: '11:00', end: '13:00',
    title: { en: 'Weekend brunch gathering', lt: 'Savaitgalio pusryčių susitikimas' },
    desc: { en: 'A long shared table, seasonal brunch plates and good company. Bring a friend.',
            lt: 'Ilgas bendras stalas, sezoniniai pusryčiai ir gera kompanija. Atsiveskite draugą.' },
    price: { en: '€18 per person', lt: '18 € asmeniui' }, image: '', registration: true, capacity: 20 },
  { id: 'holiday-special', date: '2026-12-23', start: '16:00', end: '20:00',
    title: { en: 'Holiday special event', lt: 'Šventinis renginys' },
    desc: { en: 'Gingerbread decorating, mulled drinks and our holiday desserts before Christmas.',
            lt: 'Meduolių puošimas, šildantys gėrimai ir šventiniai desertai prieš Kalėdas.' },
    price: { en: 'Free entry', lt: 'Įėjimas nemokamas' }, image: '', registration: true, capacity: 30 }
];

async function redis(command) {
  const res = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command)
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error || `Redis error ${res.status}`);
  return data.result;
}

function passwordOk(given) {
  if (!ADMIN_PASSWORD || typeof given !== 'string') return false;
  const a = crypto.createHash('sha256').update(given).digest();
  const b = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
}

const str = (v, max = 600) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const pair = (v, max) => ({ en: str(v && v.en, max), lt: str(v && v.lt, max) });
// Lithuanian plural: 1 vieta, 2 vietos, 10 vietų, 21 vieta
function ltPlural(n, one, few, many) {
  const d = n % 10, dd = n % 100;
  if (d === 1 && dd !== 11) return one;
  if (d >= 2 && d <= 9 && !(dd >= 12 && dd <= 19)) return few;
  return many;
}
const isDate = v => /^\d{4}-\d{2}-\d{2}$/.test(v);
const isTime = v => /^\d{2}:\d{2}$/.test(v);

function cleanEvents(list) {
  if (!Array.isArray(list) || list.length > 200) return null;
  const seen = new Set();
  const out = [];
  for (const e of list) {
    const date = str(e.date, 10);
    if (!isDate(date)) return null;
    let id = str(e.id, 60).toLowerCase().replace(/[^a-z0-9-]/g, '') || crypto.randomUUID().slice(0, 8);
    while (seen.has(id)) id += '-2';
    seen.add(id);
    out.push({
      id, date,
      start: isTime(e.start) ? e.start : '',
      end: isTime(e.end) ? e.end : '',
      title: pair(e.title, 120),
      desc: pair(e.desc, 1500),
      price: pair(e.price, 80),
      image: /^https:\/\//.test(str(e.image, 500)) ? str(e.image, 500) : '',
      registration: !!e.registration,
      capacity: Math.max(0, Math.min(1000, parseInt(e.capacity, 10) || 0))
    });
  }
  return out.sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
}

// Today's date in Lithuania, so "past" means the same thing for everyone
function todayVilnius() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vilnius' }).format(new Date());
}

async function loadEvents() {
  const stored = await redis(['GET', EVENTS_KEY]);
  return stored ? JSON.parse(stored) : DEFAULT_EVENTS;
}

async function loadCounts() {
  const flat = (await redis(['HGETALL', COUNTS_KEY])) || [];
  const counts = {};
  for (let i = 0; i < flat.length; i += 2) counts[flat[i]] = parseInt(flat[i + 1], 10) || 0;
  return counts;
}

function publicEvent(e, counts) {
  const taken = counts[e.id] || 0;
  return { ...e, spotsLeft: e.registration && e.capacity ? Math.max(0, e.capacity - taken) : null };
}

async function sendEmail({ to, subject, text, replyTo }) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: "Coco's Café <noreply@kavinecoco.com>", to, subject, text, ...(replyTo ? { reply_to: replyTo } : {}) })
    });
  } catch (e) {
    console.error('Email failed:', e.message);
  }
}

async function register(body, res) {
  const lang = body.lang === 'lt' ? 'lt' : 'en';
  const msg = {
    en: { missing: 'Please fill in your name and a valid email.', closed: 'Registration for this event is closed.',
          full: 'Sorry, this event is full.', few: n => `Only ${n} spot${n === 1 ? '' : 's'} left. Please choose fewer guests.` },
    lt: { missing: 'Įveskite vardą ir teisingą el. pašto adresą.', closed: 'Registracija į šį renginį uždaryta.',
          full: 'Deja, vietų nebeliko.', few: n => `Liko tik ${n} ${ltPlural(n, 'vieta', 'vietos', 'vietų')}. Pasirinkite mažiau svečių.` }
  }[lang];

  // Bots fill every field, including this hidden one
  if (str(body.website)) return res.status(200).json({ success: true });

  const name = str(body.name, 80);
  const email = str(body.email, 120);
  const phone = str(body.phone, 30);
  const note = str(body.note, 300);
  const people = Math.max(1, Math.min(10, parseInt(body.people, 10) || 1));
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: msg.missing });
  }

  const events = await loadEvents();
  const ev = events.find(e => e.id === body.eventId);
  if (!ev || !ev.registration || ev.date < todayVilnius()) {
    return res.status(400).json({ success: false, message: msg.closed });
  }

  if (ev.capacity) {
    const after = await redis(['HINCRBY', COUNTS_KEY, ev.id, people]);
    if (after > ev.capacity) {
      await redis(['HINCRBY', COUNTS_KEY, ev.id, -people]);
      const left = ev.capacity - (after - people);
      return res.status(409).json({ success: false, message: left > 0 ? msg.few(left) : msg.full, spotsLeft: Math.max(0, left) });
    }
  } else {
    await redis(['HINCRBY', COUNTS_KEY, ev.id, people]);
  }

  const entry = { name, email, phone, people, note, lang, at: new Date().toISOString() };
  await redis(['RPUSH', regKey(ev.id), JSON.stringify(entry)]);

  const when = `${ev.date}${ev.start ? ' ' + ev.start : ''}${ev.end ? '–' + ev.end : ''}`;
  await Promise.all([
    sendEmail({
      to: CAFE_EMAIL, replyTo: email,
      subject: `New registration: ${ev.title.en || ev.title.lt} (${people})`,
      text: `Event: ${ev.title.en || ev.title.lt}\nWhen: ${when}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nGuests: ${people}\nNote: ${note || '-'}`
    }),
    sendEmail({
      to: email,
      subject: lang === 'lt' ? `Registracija patvirtinta: ${ev.title.lt || ev.title.en}` : `You're registered: ${ev.title.en || ev.title.lt}`,
      text: lang === 'lt'
        ? `Sveiki, ${name}!\n\nJūs užregistruoti į renginį „${ev.title.lt || ev.title.en}“.\nKada: ${when}\nSvečių: ${people}\nKur: Coco's Café, Daukšos g. 27, Kaunas\n\nJei planai pasikeis, tiesiog atsakykite į šį laišką.\n\nIki pasimatymo!\nCoco's Café`
        : `Hi ${name},\n\nYou're registered for "${ev.title.en || ev.title.lt}".\nWhen: ${when}\nGuests: ${people}\nWhere: Coco's Café, Daukšos g. 27, Kaunas\n\nIf your plans change, just reply to this email.\n\nSee you there!\nCoco's Café`,
      replyTo: CAFE_EMAIL
    })
  ]);

  const counts = await loadCounts();
  return res.status(200).json({ success: true, event: publicEvent(ev, counts) });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const query = req.query || Object.fromEntries(new URL(req.url, 'http://x').searchParams);

  if (!REDIS_URL || !REDIS_TOKEN) {
    if (req.method === 'GET' && !query.registrations) {
      return res.status(200).json({ events: DEFAULT_EVENTS.map(e => publicEvent(e, {})), today: todayVilnius(), source: 'default' });
    }
    return res.status(500).json({ success: false, message: 'Database is not connected.' });
  }

  try {
    if (req.method === 'GET' && !query.registrations) {
      const [events, counts] = await Promise.all([loadEvents(), loadCounts()]);
      return res.status(200).json({ events: events.map(e => publicEvent(e, counts)), today: todayVilnius() });
    }

    if (req.method === 'POST' && req.body && req.body.action === 'register') {
      return await register(req.body, res);
    }

    // Everything below is admin-only
    if (!passwordOk(req.headers['x-admin-password'])) {
      return res.status(401).json({ success: false, message: 'Wrong password.' });
    }

    if (req.method === 'GET' && query.registrations) {
      const events = await loadEvents();
      const out = {};
      for (const e of events) {
        const rows = (await redis(['LRANGE', regKey(e.id), 0, -1])) || [];
        out[e.id] = rows.map(r => { try { return JSON.parse(r); } catch { return null; } }).filter(Boolean);
      }
      return res.status(200).json({ registrations: out });
    }

    if (req.method === 'PUT') {
      const events = cleanEvents(req.body && req.body.events);
      if (!events) return res.status(400).json({ success: false, message: 'Invalid events. Every event needs a date.' });
      await redis(['SET', EVENTS_KEY, JSON.stringify(events)]);
      return res.status(200).json({ success: true, events });
    }

    if (req.method === 'DELETE' && query.event && query.at) {
      // Remove one registration (e.g. a cancellation) and give the spots back
      const key = regKey(String(query.event));
      const rows = (await redis(['LRANGE', key, 0, -1])) || [];
      const raw = rows.find(r => { try { const x = JSON.parse(r); return x.at === query.at && x.email === query.email; } catch { return false; } });
      if (!raw) return res.status(404).json({ success: false, message: 'Registration not found.' });
      const entry = JSON.parse(raw);
      await redis(['LREM', key, 1, raw]);
      await redis(['HINCRBY', COUNTS_KEY, String(query.event), -(entry.people || 1)]);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Events API error:', error);
    return res.status(500).json({ success: false, message: 'Could not reach the database. Try again.' });
  }
}
