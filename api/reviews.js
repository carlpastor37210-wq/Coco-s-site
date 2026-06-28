// ============================================
// REVIEWS API — Static fallback
// ============================================
// When you're ready to restore the live Google Places API:
// 1. Get your API key from https://console.cloud.google.com
// 2. Add GOOGLE_PLACES_API_KEY to Vercel env vars
// 3. Uncomment the live fetch block at the bottom
// 4. Delete the staticReviews array

const staticReviews = [
  {
    author: 'Agnė K.',
    rating: 5,
    text: 'Jaukiausia kavinė Kaune! Pyragaičiai neapsakomai skanūs, o kava — tiesiog tobula. Visada grįžtu su šypsena.',
    date: '2025-03-15'
  },
  {
    author: 'Tomas K.',
    rating: 5,
    text: 'Best Basque cheesecake I\'ve ever had. The atmosphere is so warm and inviting. A true hidden gem in Kaunas.',
    date: '2025-03-10'
  },
  {
    author: 'Gabija S.',
    rating: 4.5,
    text: 'Nuostabi vieta ramiai popietei. Personalas labai draugiškas, o interjeras — jaukus ir stilingas. Rekomenduoju!',
    date: '2025-02-28'
  },
  {
    author: 'Martynas L.',
    rating: 5,
    text: 'The pistachio cheesecake is to die for! And the coffee is consistently excellent. My new regular spot.',
    date: '2025-02-20'
  },
  {
    author: 'Eglė R.',
    rating: 5,
    text: 'Gražiausia kavinė, kokioje esu buvusi. Kiekviena detalė apgalvota, o desertai — meno kūriniai. 10/10!',
    date: '2025-02-12'
  },
  {
    author: 'Jonas V.',
    rating: 4.5,
    text: 'Great place to work remotely. Fast WiFi, amazing pastries, and the staff doesn\'t rush you. Highly recommended.',
    date: '2025-01-28'
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ---- Static fallback ----
  try {
    const avgRating = staticReviews.reduce((sum, r) => sum + r.rating, 0) / staticReviews.length;
    return res.status(200).json({
      reviews: staticReviews,
      summary: {
        total: staticReviews.length,
        average: Math.round(avgRating * 10) / 10
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load reviews' });
  }

  // ---- Live Google Places API fetch ----
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = 'GOOGLE_PLACE_ID'; // Replace with your actual Place ID
  
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
    console.error('Google Places API error:', error);
    return res.status(200).json({
      reviews: staticReviews,
      summary: {
        total: staticReviews.length,
        average: 4.8
      }
    });
  }
}
