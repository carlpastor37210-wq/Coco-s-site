import crypto from 'node:crypto';
import { put, del } from '@vercel/blob';

// Photo gallery on the events page.
// Pictures live in Vercel Blob (BLOB_READ_WRITE_TOKEN); the list, order and captions live in Upstash Redis.
//   GET                          → public list of photos
//   POST { action:'upload' }     → admin uploads one photo (already resized in the browser)
//   PUT  { photos }              → admin saves order + captions
//   DELETE ?id=…                 → admin deletes a photo
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const KEY = 'coco:gallery';
const MAX_PHOTOS = 300;
const MAX_BYTES = 3 * 1024 * 1024;   // per image, after resizing in the browser
const TYPES = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' };

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

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const pair = (v, max) => ({ en: str(v && v.en, max), lt: str(v && v.lt, max) });

async function loadPhotos() {
  const stored = await redis(['GET', KEY]);
  return stored ? JSON.parse(stored) : [];
}

function decodeImage(part) {
  if (!part || typeof part.data !== 'string' || !TYPES[part.type]) return null;
  const buf = Buffer.from(part.data, 'base64');
  if (!buf.length || buf.length > MAX_BYTES) return null;
  return { buf, type: part.type, ext: TYPES[part.type] };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const query = req.query || Object.fromEntries(new URL(req.url, 'http://x').searchParams);

  if (!REDIS_URL || !REDIS_TOKEN) {
    if (req.method === 'GET') return res.status(200).json({ photos: [] });
    return res.status(500).json({ success: false, message: 'Database is not connected.' });
  }

  try {
    if (req.method === 'GET') {
      return res.status(200).json({ photos: await loadPhotos() });
    }

    if (!passwordOk(req.headers['x-admin-password'])) {
      return res.status(401).json({ success: false, message: 'Wrong password.' });
    }

    if (req.method === 'POST' && req.body && req.body.action === 'upload') {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return res.status(500).json({ success: false, message: 'Photo storage is not connected. In Vercel go to Storage → Create → Blob (public) and connect it to this project.' });
      }
      const photos = await loadPhotos();
      if (photos.length >= MAX_PHOTOS) {
        return res.status(400).json({ success: false, message: `The gallery is full (${MAX_PHOTOS} photos). Delete some old ones first.` });
      }
      const full = decodeImage(req.body.full);
      const thumb = decodeImage(req.body.thumb);
      if (!full || !thumb) return res.status(400).json({ success: false, message: 'That file is not a supported picture (JPG, PNG or WebP).' });

      const id = crypto.randomUUID().slice(0, 12);
      const [fullBlob, thumbBlob] = await Promise.all([
        put(`gallery/${id}.${full.ext}`, full.buf, { access: 'public', addRandomSuffix: true, contentType: full.type }),
        put(`gallery/${id}-thumb.${thumb.ext}`, thumb.buf, { access: 'public', addRandomSuffix: true, contentType: thumb.type })
      ]);
      const photo = {
        id,
        url: fullBlob.url,
        thumb: thumbBlob.url,
        w: Math.max(1, parseInt(req.body.w, 10) || 1),
        h: Math.max(1, parseInt(req.body.h, 10) || 1),
        caption: pair(req.body.caption, 200),
        added: new Date().toISOString()
      };
      // Re-read right before saving so two uploads at once don't overwrite each other
      const latest = await loadPhotos();
      latest.unshift(photo);
      await redis(['SET', KEY, JSON.stringify(latest)]);
      return res.status(200).json({ success: true, photo });
    }

    if (req.method === 'PUT') {
      // Only reorder / re-caption photos that already exist; URLs can't be changed from outside
      const incoming = Array.isArray(req.body && req.body.photos) ? req.body.photos : null;
      if (!incoming) return res.status(400).json({ success: false, message: 'Invalid photo list.' });
      const current = await loadPhotos();
      const byId = new Map(current.map(p => [p.id, p]));
      const next = [];
      for (const p of incoming) {
        const existing = byId.get(p && p.id);
        if (!existing) continue;
        byId.delete(p.id);
        next.push({ ...existing, caption: pair(p.caption, 200) });
      }
      // photos uploaded meanwhile (not in the admin's list yet) stay, at the top
      const added = [...byId.values()];
      const saved = [...added, ...next];
      await redis(['SET', KEY, JSON.stringify(saved)]);
      return res.status(200).json({ success: true, photos: saved });
    }

    if (req.method === 'DELETE' && query.id) {
      const photos = await loadPhotos();
      const photo = photos.find(p => p.id === query.id);
      if (!photo) return res.status(404).json({ success: false, message: 'Photo not found.' });
      await redis(['SET', KEY, JSON.stringify(photos.filter(p => p.id !== query.id))]);
      try { await del([photo.url, photo.thumb]); } catch (e) { console.error('Blob delete failed:', e.message); }
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Gallery API error:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong saving the gallery. Try again.' });
  }
}
