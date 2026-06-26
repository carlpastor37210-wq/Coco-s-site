import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // TODO: Fetch from Google Reviews API
  res.json({ 
    message: 'Reviews endpoint',
    reviews: []
  });
});

export default router;