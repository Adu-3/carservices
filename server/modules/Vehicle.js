// models/Vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  nickname: { 
    type: String, 
    required: true 
  },
  ownerName: { 
    type: String, 
    required: true 
  },
  color: { 
    type: String, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },
  make: { // e.g., Toyota
    type: String, 
    required: true 
  },
  model: { // e.g., Camry
    type: String, 
    required: true 
  },
  country: { // e.g., Saudi Arabia
    type: String, 
    required: true 
  },
  plateNumber: {
    type: String,
    required: true,
    unique: true // to prevent duplicates
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);