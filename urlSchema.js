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
    required: true,
    unique: true
  }
});

urlSchema.pre('save', async function() {
  const plugin = require('./autoincrement.js');
  if (this.isNew) {
    this.short_url = await plugin.autoIncrement('short_url').catch(console.error);
  }
});

const Url = mongoose.model('Url', urlSchema);

const createShortUrl = (url) => {
  Url.create({
    original_url: url
  });
}

exports.createShortUrl = createShortUrl;
