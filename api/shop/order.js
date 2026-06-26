import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  const { items, customer } = req.body;
  
  // Store order (in-memory for now)
  console.log('Order received:', { items, customer });
  
  res.json({ 
    success: true, 
    message: 'Order received!',
    orderId: Math.random().toString(36).substr(2, 9)
  });
});

router.get('/', (req, res) => {
  res.json({ message: 'Shop API is working' });
});

export default router;