import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// API routes
app.get('/api/reviews', async (req, res) => {
  const reviews = [
    {
      author: 'John Doe',
      rating: 5,
      text: 'Amazing coffee!',
      date: '2024-06-20'
    }
  ];
  res.json(reviews);
});

app.post('/api/shop', (req, res) => {
  const { items, customerInfo } = req.body;
  console.log('New Order:', { items, customerInfo });
  res.json({
    success: true,
    message: 'Order received!',
    orderId: Date.now()
  });
});

app.get('/api/shop', (req, res) => {
  res.json({
    menu: [
      { id: 1, name: 'Espresso', price: 2.50 },
      { id: 2, name: 'Cappuccino', price: 4.00 }
    ]
  });
});

// Serve HTML for all other routes (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});