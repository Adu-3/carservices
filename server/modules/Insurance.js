const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: true,
    unique: true
  },
  provider: {
    type: String,
    required: true
  },
  insuranceType: {
    type: String,
    required: true
  },
  coverageLocation: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  policyStatus: {
    type: Boolean,
    default: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  }
});

module.exports = mongoose.model('Insurance', insuranceSchema);
