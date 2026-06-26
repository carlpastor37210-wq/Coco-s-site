export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { items, customerInfo } = req.body;
    
    // Store order (you'll need a database later)
    console.log('New Order:', { items, customerInfo });
    
    res.status(200).json({
      success: true,
      message: 'Order received!',
      orderId: Date.now()
    });
  } else if (req.method === 'GET') {
    res.status(200).json({
      menu: [
        { id: 1, name: 'Espresso', price: 2.50 },
        { id: 2, name: 'Cappuccino', price: 4.00 }
      ]
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}