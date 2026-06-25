// /api/reviews.js
// Runs on Vercel's servers — your API key stays hidden here.

// Simple in-memory cache so we don't call Google on every visit
let cache = { data: null, time: 0 };
const CACHE_MS = 1000 * 60 * 60 * 6; // 6 hours

export default async function handler(req, res) {
  // Serve from cache if still fresh
  if (cache.data && Date.now() - cache.time < CACHE_MS) {
    return res.status(200).json(cache.data);
  }

  const key = process.env.GOOGLE_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Places API (New) — fields we want: rating, total count, and reviews
  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews"
      }
    });

    const data = await response.json();

    // Trim down to only what the frontend needs
    const clean = {
      rating: data.rating || null,
      total: data.userRatingCount || 0,
      reviews: (data.reviews || []).map(r => ({
        author: r.authorAttribution?.displayName || "Anonymous",
        photo: r.authorAttribution?.photoUri || "",
        rating: r.rating,
        text: r.text?.text || "",
        time: r.relativePublishTimeDescription || ""
      }))
    };

    cache = { data: clean, time: Date.now() };
    res.status(200).json(clean);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}