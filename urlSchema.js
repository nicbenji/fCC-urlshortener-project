const mongoose = require('mongoose');
require('dotenv');

mongoose.connect(process.env.MONGO_URI);

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: {
    type: Number,
    unique: true
  }
});

urlSchema.pre('save', async function() {
  const autoIncrement = require('./autoincrement.js').autoIncrement;
  if (this.isNew) {
    this.short_url = await autoIncrement('short_url').catch(console.error);
  }
});

const Url = mongoose.model('Url', urlSchema);

const createShortUrl = async (url) => {
  const shortUrl = new Url({
    original_url: url
  });
  const result = await shortUrl.save();
  return {
    original_url: result.original_url,
    short_url: result.short_url
  };
}

exports.createShortUrl = createShortUrl;
