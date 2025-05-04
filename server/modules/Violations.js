const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  date: { type: Date, required: true, default: Date.now },
  amount: { type: Number, required: true },
  location: { type: String, required: true },
  car: { type: String, required: true },
  paid: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Violation', violationSchema);