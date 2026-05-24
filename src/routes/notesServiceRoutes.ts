import express from 'express';

const router = express.Router();

// Auth Service Route
router.get('/notes', async (req, res) => {
  try {
    // 1. Fetch the data from the Notes Service
    const response = await fetch('http://localhost:8080/api/posts');
    const posts = await response.json();
    // 2. Return the data to the client
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to communicate with Notes Service' });
  }
});

export default router;