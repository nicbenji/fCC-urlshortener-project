require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(_req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  // Post request post url and get a JSON response with both URLs
});

app.get('/api/shorturl/:shorturl', (req, res) => {
  // Validation of correct URL format for route param
  // Get request to get redirected from short URL
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
