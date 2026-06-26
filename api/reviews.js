export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // For now, return mock data
    // Later you'll integrate with Google Places API
    const reviews = [
      {
        author: 'John Doe',
        rating: 5,
        text: 'Amazing coffee!',
        date: '2024-06-20'
      }
    ];

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}