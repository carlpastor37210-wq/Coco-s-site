 const staticReviews = [
  {
    author: 'Agnė K.',
    rating: 5,
    text: 'Nuostabūs pyragaičiai! Labai jauki vieta, malonus aptarnavimas. Tikrai grįšime!',
    date: '2026-05-15'
  },
  {
    author: 'Tomas V.',
    rating: 5,
    text: 'Best coffee in Kaunas. The cakes are incredible, especially the chocolate raspberry one.',
    date: '2026-05-10'
  },
  {
    author: 'Laura S.',
    rating: 4,
    text: 'Labai skanūs desertai ir kava. Interjeras mielas, bet kartais sunku rasti vietą automobiliui.',
    date: '2026-04-28'
  }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID; // Set this in Vercel env vars

    if (!apiKey || !placeId) {
      console.log('Missing Google API key or Place ID, using fallback reviews');
      throw new Error('Missing credentials');
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`
    );

    const data = await response.json();

    if (!data.result || !data.result.reviews) {
      throw new Error('No reviews found');
    }

    const reviews = data.result.reviews.map(r => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      date: r.time ? new Date(r.time * 1000).toISOString().split('T')[0] : ''
    }));

    return res.status(200).json({
      reviews,
      summary: {
        total: data.result.user_ratings_total || reviews.length,
        average: data.result.rating || 0
      }
    });
  } catch (error) {
    console.log('Google Places API error, using fallback:', error.message);
    return res.status(200).json({
      reviews: staticReviews,
      summary: {
        total: staticReviews.length,
        average: 4.8
      }
    });
  }
}
