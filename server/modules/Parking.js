const mongoose = require('mongoose');

const parkingLocationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  parkingLocations: { type: [String], required: true },
});

const Parking = mongoose.model('Parking', parkingLocationSchema, 'parkings'); // Explicitly set collection name to 'parkings'

module.exports = Parking;
