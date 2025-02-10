require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const createShortUrl = require('./urlSchema.js').createShortUrl;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(_req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', async (req, res) => {
  // Post request post url and get a JSON response with both URLs
  try {
    const result = await createShortUrl(req.body.url);
    res.json(result);
  } catch (err) {
    console.error;
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/shorturl/:shorturl', (req, res) => {
  // Validation of correct URL format for route param
  // Get request to get redirected from short URL
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
