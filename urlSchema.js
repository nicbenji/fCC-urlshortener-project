const mongoose = require('mongoose');
require('dotenv');
const dns = require('dns');

mongoose.connect(process.env.MONGO_URI);

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    validate: {
      validator: (url) =>
        new Promise((resolve) => {
          dns.lookup(url, (err) => {
            if (err || !url) {
              resolve(false);
            } else {
              resolve();
            }
          });
        }),
      message: 'invalid url'
    },
  },
  short_url: {
    type: Number,
    unique: true
  }
});

urlSchema.pre('save', async function() {
  const autoIncrement = require('./autoincrement.js').autoIncrement;
  if (this.isNew) {
    this.short_url = await autoIncrement('short_url');
  }
});

const Url = mongoose.model('Url', urlSchema);

const createShortUrl = async (url) => {
  const shortUrl = new Url({
    original_url: url
  });
  await shortUrl.save();
  return {
    original_url: shortUrl.original_url,
    short_url: shortUrl.short_url
  };
}

const findUrlByShortUrl = async (shortUrl) => {
  const originalUrl = await Url.findOne({ short_url: shortUrl });
  return originalUrl.original_url;
}

exports.createShortUrl = createShortUrl;
exports.findUrlByShortUrl = findUrlByShortUrl;
