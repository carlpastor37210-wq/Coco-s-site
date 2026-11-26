import crypto from 'node:crypto';
import defaultMenus from './_default-menus.js';

// Drinks, food and events pages. Stored in the same Upstash Redis as the products.
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const PAGES = ['drinks', 'food', 'events'];
const STYLES = ['list', 'highlight', 'gallery'];

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

const str = (v, max = 600) => (typeof v === 'string' ? v.slice(0, max) : '');
const pair = (v, max) => ({ en: str(v && v.en, max), lt: str(v && v.lt, max) });

// Keep only the fields we expect, so nothing odd can be stored.
function cleanMenu(menu) {
  if (!menu || !Array.isArray(menu.sections) || menu.sections.length > 30) return null;
  return {
    sections: menu.sections.map((s, i) => ({
      id: str(s.id, 40).replace(/[^a-z0-9-]/gi, '') || `section-${i + 1}`,
      style: STYLES.includes(s.style) ? s.style : 'list',
      title: pair(s.title, 120),
      text: pair(s.text, 400),
      items: (Array.isArray(s.items) ? s.items : []).slice(0, 80).map(it => ({
        name: pair(it.name, 120),
        desc: pair(it.desc, 400),
        price: str(it.price, 40),
        ...(it.from ? { from: true } : {})
      }))
    }))
  };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const page = String(req.query && req.query.page || new URL(req.url, 'http://x').searchParams.get('page') || '');
  if (!PAGES.includes(page)) {
    return res.status(400).json({ success: false, message: 'Unknown page. Use drinks, food or events.' });
  }
  const KEY = `coco:menu:${page}`;

  if (!REDIS_URL || !REDIS_TOKEN) {
    if (req.method === 'GET') return res.status(200).json({ menu: defaultMenus[page], source: 'default' });
    return res.status(500).json({ success: false, message: 'Database is not connected.' });
  }

  try {
    if (req.method === 'GET') {
      const stored = await redis(['GET', KEY]);
      if (stored) return res.status(200).json({ menu: JSON.parse(stored), source: 'saved' });
      return res.status(200).json({ menu: defaultMenus[page], source: 'default' });
    }

    if (req.method === 'PUT') {
      if (!passwordOk(req.headers['x-admin-password'])) {
        return res.status(401).json({ success: false, message: 'Wrong password.' });
      }
      const menu = cleanMenu(req.body && req.body.menu);
      if (!menu) return res.status(400).json({ success: false, message: 'Invalid menu.' });
      await redis(['SET', KEY, JSON.stringify(menu)]);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Menu API error:', error);
    return res.status(500).json({ success: false, message: 'Could not reach the database. Try again.' });
  }
}
