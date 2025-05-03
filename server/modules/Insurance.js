const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
  insuranceType: {
    type: String,
    required: true
  },
  coverageLocation: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Insurance', insuranceSchema);
