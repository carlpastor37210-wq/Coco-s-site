// Returns the 3 most recent Google reviews plus the real overall rating and review count.
// Needs GOOGLE_API_KEY and GOOGLE_PLACE_ID in Vercel → Settings → Environment Variables.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(200).json({ reviews: [], summary: null, error: 'Missing GOOGLE_API_KEY or GOOGLE_PLACE_ID' });
  }

  try {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json'
      + `?place_id=${encodeURIComponent(placeId)}`
      + '&fields=reviews,rating,user_ratings_total,url'
      + '&reviews_sort=newest&reviews_no_translations=true'
      + `&key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || !data.result) {
      throw new Error(data.error_message || data.status || 'No result');
    }

    const r = data.result;
    const reviews = (r.reviews || [])
      .filter(x => x.text && x.text.trim())
      .sort((a, b) => (b.time || 0) - (a.time || 0))
      .slice(0, 3)
      .map(x => ({
        author: x.author_name,
        rating: x.rating,
        text: x.text,
        date: x.time ? new Date(x.time * 1000).toISOString().split('T')[0] : ''
      }));

    // Cache on Vercel's edge for an hour so we don't call Google on every visit
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({
      reviews,
      summary: {
        average: r.rating || 0,
        total: r.user_ratings_total || 0,
        url: r.url || null
      }
    });
  } catch (error) {
    console.error('Google Places API error:', error.message);
    return res.status(200).json({ reviews: [], summary: null, error: error.message });
  }
}
