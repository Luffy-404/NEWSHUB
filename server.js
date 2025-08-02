// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = 3000;
const NEWS_API_KEY = 'pub_fdb0d24fec6a474a9ab63500ed1bf8a5';

// Serve static files from public folder
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Backend API route
app.get('/fetch-news', async (req, res) => {
  const query = req.query.q || '';
  const url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&language=en ${query ? `&q=${encodeURIComponent(query)}` : ''}`;
    

  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&language=en`
    );
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
