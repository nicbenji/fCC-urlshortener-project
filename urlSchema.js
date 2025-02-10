const mongoose = require('mongoose');
require('dotenv');
const dns = require('dns');

mongoose.connect(process.env.MONGO_URI);

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
    validate: {
      validator: async (url) => {
        try {
          await dns.lookup(url);
          return true;
        } catch (err) {
          console.error(err);
          return false;
        }
      }
    },
    message: 'invalid url'
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

exports.createShortUrl = createShortUrl;
