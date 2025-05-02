const mongoose = require('mongoose');

const tollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Toll', tollSchema);