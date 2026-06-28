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
