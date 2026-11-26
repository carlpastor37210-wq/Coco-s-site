import crypto from 'node:crypto';
import { put, del } from '@vercel/blob';

// Admin-only picture upload for products and events (stored in Vercel Blob).
//   POST   { full, thumb, w, h, folder }  → { url, thumb, w, h }
//   DELETE ?url=…&url=…                    → removes pictures that are no longer used
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const MAX_BYTES = 3 * 1024 * 1024;
const TYPES = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' };
const FOLDERS = ['products', 'events'];

function blobOptions() {
  const key = Object.keys(process.env).find(k => k === 'BLOB_READ_WRITE_TOKEN')
    || Object.keys(process.env).find(k => k.endsWith('BLOB_READ_WRITE_TOKEN'));
  return key ? { token: process.env[key] } : {};
}

function passwordOk(given) {
  if (!ADMIN_PASSWORD || typeof given !== 'string') return false;
  const a = crypto.createHash('sha256').update(given).digest();
  const b = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
  return crypto.timingSafeEqual(a, b);
}

function decodeImage(part) {
  if (!part || typeof part.data !== 'string' || !TYPES[part.type]) return null;
  const buf = Buffer.from(part.data, 'base64');
  if (!buf.length || buf.length > MAX_BYTES) return null;
  return { buf, type: part.type, ext: TYPES[part.type] };
}

// Only ever delete files that live in our own Blob storage
const isBlobUrl = u => typeof u === 'string' && /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i.test(u);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!passwordOk(req.headers['x-admin-password'])) {
    return res.status(401).json({ success: false, message: 'Wrong password.' });
  }

  try {
    if (req.method === 'POST') {
      const body = req.body || {};
      const folder = FOLDERS.includes(body.folder) ? body.folder : 'products';
      const full = decodeImage(body.full);
      const thumb = decodeImage(body.thumb);
      if (!full || !thumb) return res.status(400).json({ success: false, message: 'That file is not a supported picture (JPG, PNG or WebP).' });
      const id = crypto.randomUUID().slice(0, 12);
      let fullBlob, thumbBlob;
      try {
        [fullBlob, thumbBlob] = await Promise.all([
          put(`${folder}/${id}.${full.ext}`, full.buf, { access: 'public', addRandomSuffix: true, contentType: full.type, ...blobOptions() }),
          put(`${folder}/${id}-thumb.${thumb.ext}`, thumb.buf, { access: 'public', addRandomSuffix: true, contentType: thumb.type, ...blobOptions() })
        ]);
      } catch (e) {
        console.error('Blob upload failed:', e);
        return res.status(500).json({ success: false, message: 'Photo storage is not working. Use "Check photo storage" on the Gallery tab to see why.' });
      }
      return res.status(200).json({
        success: true,
        url: fullBlob.url,
        thumb: thumbBlob.url,
        w: Math.max(1, parseInt(body.w, 10) || 1),
        h: Math.max(1, parseInt(body.h, 10) || 1)
      });
    }

    if (req.method === 'DELETE') {
      const q = new URL(req.url, 'http://x').searchParams;
      const urls = q.getAll('url').filter(isBlobUrl).slice(0, 20);
      if (urls.length) {
        try { await del(urls, blobOptions()); } catch (e) { console.error('Blob delete failed:', e.message); }
      }
      return res.status(200).json({ success: true, deleted: urls.length });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Upload API error:', error);
    return res.status(500).json({ success: false, message: 'Upload failed. Try again.' });
  }
}
