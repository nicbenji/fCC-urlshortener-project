const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: Number
});

const Counter = mongoose.model('Counter', CounterSchema);

async function autoIncrement(idName) {
  const counter = await Counter.findOneAndUpdate(
    { _id: idName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

exports.autoIncrement = autoIncrement;
