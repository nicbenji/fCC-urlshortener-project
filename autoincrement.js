const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: Number
});

CounterSchema.methods.increment = async function() {
  this.seq += 1;
  return this.save();
}

const Counter = mongoose.model('Counter', CounterSchema);

async function autoIncrement(idName) {
  const counter = await Counter.findOneAndUpdate(
    { _id: idName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .catch(console.error);
  return counter.seq;
}

exports.autoIncrement = autoIncrement();
