export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      // For now, return mock data
      // Later you'll integrate with Google Places API
      const reviews = [
        {
          author: 'John Doe',
          rating: 5,
          text: 'Amazing coffee!',
          date: '2024-06-20'
        },
        {
          author: 'Jane Smith',
          rating: 4.5,
          text: 'Great atmosphere!',
          date: '2024-06-19'
        }
      ];
      
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}