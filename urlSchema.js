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
  const autoIncrement = require('./autoincrement.js').autoIncrement;
  if (this.isNew) {
    this.short_url = await autoIncrement('short_url').catch(console.error);
  }
});

const Url = mongoose.model('Url', urlSchema);

const createShortUrl = async (url) => {
  const result = await Url.create({
    original_url: url
  });
  return result;
}

exports.createShortUrl = createShortUrl;
