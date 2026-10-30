import crypto from 'node:crypto';
import defaultProducts from './_default-products.js';

// Products are stored in Upstash Redis (Vercel → Storage → Upstash for Redis).
// Connecting the database to the project adds these env vars automatically.
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const KEY = 'coco:products';

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

function isValidProduct(p) {
  return p && typeof p === 'object'
    && Number.isFinite(Number(p.id))
    && Number.isFinite(Number(p.price))
    && typeof p.category === 'string';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!REDIS_URL || !REDIS_TOKEN) {
    if (req.method === 'GET') {
      return res.status(200).json({ products: defaultProducts, source: 'default', storage: false });
    }
    return res.status(500).json({ success: false, message: 'Database is not connected. Add Upstash Redis in Vercel → Storage.' });
  }

  try {
    if (req.method === 'GET') {
      const stored = await redis(['GET', KEY]);
      if (stored) {
        return res.status(200).json({ products: JSON.parse(stored), source: 'saved', storage: true });
      }
      return res.status(200).json({ products: defaultProducts, source: 'default', storage: true });
    }

    if (!ADMIN_PASSWORD) {
      return res.status(500).json({ success: false, message: 'ADMIN_PASSWORD is not set in Vercel environment variables.' });
    }

    const password = req.headers['x-admin-password'];
    if (!passwordOk(password)) {
      return res.status(401).json({ success: false, message: 'Wrong password.' });
    }

    // POST = just check the password (used by the login screen)
    if (req.method === 'POST') {
      return res.status(200).json({ success: true });
    }

    if (req.method === 'PUT') {
      const products = req.body && req.body.products;
      if (!Array.isArray(products) || !products.every(isValidProduct)) {
        return res.status(400).json({ success: false, message: 'Invalid product list.' });
      }
      await redis(['SET', KEY, JSON.stringify(products)]);
      return res.status(200).json({ success: true, count: products.length });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Products API error:', error);
    return res.status(500).json({ success: false, message: 'Could not reach the database. Try again.' });
  }
}
