const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
  userId: { type: String, required: true },  
  violationNumber: { type: String, unique: true, required: true },  
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  location: { type: String, required: true },
  plateNumber: { type: String, required: true },  
  paid: { type: Boolean, default: false },
});

module.exports = mongoose.model('Violation', violationSchema);