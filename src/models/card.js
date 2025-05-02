const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
  balance: { type: Number, required: true }
});

module.exports = mongoose.model('Card', cardSchema);