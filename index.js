require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { findUrlByShortUrl, createShortUrl } = require('./urlSchema.js');

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
    res.status(422).json({ error: err.errors['original_url'].message });
    console.error(err);
  }
});

app.get('/api/shorturl/:shorturl', async (req, res) => {
  // Get request to get redirected from short URL
  try {
    const originalUrl = await findUrlByShortUrl(req.params.shorturl);
    res.redirect(originalUrl);
  } catch (err) {
    res.status(404).json({ error: 'short url not found' });
    console.error(err);
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
